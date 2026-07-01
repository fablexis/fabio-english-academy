// Generates prisma/blog-seed.json from the frontend's canonical blog data
// (src/data/blogPosts.ts). The frontend imports the 12 blog images as Vite ES
// modules; Node/Prisma cannot resolve those, so this script bundles the data
// with esbuild and rewrites each image import to a stable public path string
// (/blog-images/<filename>). Re-run whenever the blog data changes:
//
//   npm run seed:generate -w @eyb/api
//
import { build } from 'esbuild';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '../../..');
// Canonical authored blog content lives alongside the seed. (The legacy repo
// root copy is used as a fallback only while it still exists.)
const CANDIDATES = [
  resolve(__dirname, 'seed-data/blogPosts.ts'),
  resolve(REPO_ROOT, 'src/data/blogPosts.ts'),
];

const imageToPublicPath = {
  name: 'image-to-public-path',
  setup(b) {
    const filter = /\.(jpe?g|png|svg|webp|avif)$/;
    b.onResolve({ filter }, (args) => ({ path: args.path, namespace: 'img' }));
    b.onLoad({ filter: /.*/, namespace: 'img' }, (args) => ({
      contents: `export default ${JSON.stringify('/blog-images/' + basename(args.path))}`,
      loader: 'js',
    }));
  },
};

async function firstExisting(paths) {
  for (const p of paths) {
    try {
      await readFile(p);
      return p;
    } catch {
      /* keep looking */
    }
  }
  throw new Error(`blogPosts.ts not found in any of:\n  ${paths.join('\n  ')}`);
}

async function main() {
  const entry = await firstExisting(CANDIDATES);
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    write: false,
    plugins: [imageToPublicPath],
  });

  const tmp = await mkdtemp(join(tmpdir(), 'eyb-seed-'));
  const modPath = join(tmp, 'blogPosts.mjs');
  await writeFile(modPath, result.outputFiles[0].text);
  const mod = await import(pathToFileURL(modPath).href);
  await rm(tmp, { recursive: true, force: true });

  const posts = mod.blogPosts ?? mod.default;
  if (!Array.isArray(posts)) throw new Error('blogPosts export not found / not an array');

  const rows = posts.map((p, i) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    readTime: p.readTime,
    level: p.level,
    variant: p.variant,
    image: p.image,
    body: p.body,
    published: true,
    sortOrder: i,
  }));

  const out = resolve(__dirname, 'blog-seed.json');
  await writeFile(out, JSON.stringify(rows, null, 2) + '\n');
  console.log(`Wrote ${rows.length} posts → ${out}`);
  console.log('Images:', [...new Set(rows.map((r) => r.image))].join(', '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
