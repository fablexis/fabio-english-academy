import type { BlogListItemDto, BlogPostDto } from '@eyb/shared';

// Base URL of the NestJS content API. Read from PUBLIC_API_URL so the same
// value works during build-time (SSG) and per-request (SSR) fetches.
const BASE = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3001';

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

/** GET /blog — published posts (list cards, no body). */
export function getPosts(): Promise<BlogListItemDto[]> {
  return getJson<BlogListItemDto[]>('/blog');
}

/** GET /blog/:slug — full post, or null on 404. */
export async function getPost(slug: string): Promise<BlogPostDto | null> {
  const res = await fetch(`${BASE}/blog/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API /blog/${slug} → ${res.status}`);
  return res.json() as Promise<BlogPostDto>;
}

/**
 * Related posts for a detail page: same category first, then fill from other
 * categories, capped at `limit`. Mirrors the previous client-side logic.
 */
export function pickRelated(
  all: BlogListItemDto[],
  current: BlogPostDto,
  limit = 2,
): BlogListItemDto[] {
  const sameCat = all.filter((p) => p.id !== current.id && p.category === current.category);
  const otherCat = all.filter((p) => p.id !== current.id && p.category !== current.category);
  return [...sameCat, ...otherCat].slice(0, limit);
}
