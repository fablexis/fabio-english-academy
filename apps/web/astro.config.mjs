import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// Hybrid rendering: pages are prerendered (SSG) by default; blog + admin pages
// opt into on-demand SSR with `export const prerender = false`. Tailwind v4 is
// wired as a Vite plugin (NOT the legacy @astrojs/tailwind integration).
// The Node adapter (standalone) serves both the prerendered assets and the SSR
// routes from `dist/server/entry.mjs` — HOST/PORT come from the environment.
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
