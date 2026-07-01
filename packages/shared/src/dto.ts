import type { BlogBody, BlogPost, BlogVariant } from './blog.js';

/**
 * Lightweight card shape returned by list endpoints (GET /blog, GET /admin/blog).
 * The heavy `body` is omitted from list payloads.
 */
export type BlogListItemDto = Omit<BlogPost, 'body'>;

/** Full post returned by GET /blog/:slug and GET /admin/blog/:id. */
export type BlogPostDto = BlogPost;

/** Request body for POST /admin/blog. */
export interface CreateBlogPostInput {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: BlogVariant;
  image: string;
  body: BlogBody;
  published?: boolean;
  sortOrder?: number;
}

/** Request body for PATCH /admin/blog/:id. */
export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;

// ── Auth ─────────────────────────────────────────────────────────────────────
export interface LoginInput {
  email: string;
  password: string;
}
export interface AuthUserDto {
  id: string;
  email: string;
  role: string;
}
