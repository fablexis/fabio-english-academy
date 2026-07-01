import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SeedRow {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: string;
  image: string;
  body: unknown;
  published: boolean;
  sortOrder: number;
}

async function main() {
  const file = join(__dirname, 'blog-seed.json');
  const rows = JSON.parse(readFileSync(file, 'utf8')) as SeedRow[];

  for (const row of rows) {
    const data = {
      slug: row.slug,
      category: row.category,
      title: row.title,
      excerpt: row.excerpt,
      readTime: row.readTime,
      level: row.level,
      variant: row.variant,
      image: row.image,
      body: JSON.stringify(row.body),
      published: row.published,
      sortOrder: row.sortOrder,
    };
    await prisma.blogPost.upsert({
      where: { slug: row.slug },
      create: data,
      update: data,
    });
  }
  console.log(`Seeded ${rows.length} blog posts`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
