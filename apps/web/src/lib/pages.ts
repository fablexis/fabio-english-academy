import {
  PAGE_DEFAULTS,
  mergePageContent,
  type PageContentDto,
  type PageContentMap,
  type PageKey,
} from '@eyb/shared';

// Base URL of the NestJS content API (same convention as lib/api.ts).
const BASE = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3001';

// Tiny per-process cache: a single SSR request resolves 'site' in both the
// layout and the page, and repeated visits shouldn't hammer the API. Kept
// short so admin edits show up almost immediately.
const TTL_MS = 5_000;
const cache = new Map<PageKey, { at: number; value: unknown }>();

/**
 * GET /pages/:key merged over the canonical defaults from @eyb/shared.
 * Always resolves to a complete document — on API errors or when no override
 * has been saved yet, the defaults are returned as-is.
 */
export async function getPageContent<K extends PageKey>(
  key: K,
): Promise<PageContentMap[K]> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value as PageContentMap[K];

  let content: PageContentMap[K] = PAGE_DEFAULTS[key];
  try {
    const res = await fetch(`${BASE}/pages/${key}`);
    if (res.ok) {
      const dto = (await res.json()) as PageContentDto;
      if (dto.data) content = mergePageContent(PAGE_DEFAULTS[key], dto.data);
    }
  } catch (err) {
    console.error(`[pages] using defaults for "${key}" (API unreachable):`, err);
  }
  cache.set(key, { at: Date.now(), value: content });
  return content;
}
