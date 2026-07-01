import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Hybrid rendering: pages are prerendered (SSG) by default; blog + admin pages
// opt into on-demand SSR with `export const prerender = false`. Tailwind v4 is
// wired as a Vite plugin (NOT the legacy @astrojs/tailwind integration).
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
