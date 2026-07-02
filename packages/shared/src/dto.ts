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
  /** Display name; UIs fall back to the email when null. */
  name?: string | null;
  /** Profile picture URL; initials are rendered when null. */
  avatarUrl?: string | null;
  /** Start of the previous session ("tu último acceso"); null on first login. */
  lastLoginAt?: string | null;
}

/** Request body for PATCH /auth/me (own profile). */
export interface UpdateProfileInput {
  name?: string;
  /** Empty string clears the picture. */
  avatarUrl?: string;
}

// ── Activity log ─────────────────────────────────────────────────────────────
export interface ActivityLogDto {
  id: number;
  userEmail: string;
  action: string;
  entity: string;
  entityId?: string | null;
  summary: string;
  createdAt: string;
}

/** GET /admin/activity — newest first; `nextCursor` feeds ?before= for more. */
export interface ActivityListDto {
  items: ActivityLogDto[];
  nextCursor: number | null;
}

// ── Admin user management ────────────────────────────────────────────────────
/** Row of GET /admin/users. */
export interface AdminUserDto {
  id: string;
  email: string;
  /** Display name; UIs fall back to the email when null. */
  name: string | null;
  avatarUrl: string | null;
  role: string;
  createdAt: string;
  /** Start of the user's latest session; null if they never logged in. */
  lastLoginAt: string | null;
  /** Account created by invite and not activated yet. */
  invitePending: boolean;
  /** Pending and every invite link has expired (offer a resend). */
  inviteExpired: boolean;
  /** When the most recent invite email was sent (pending accounts). */
  inviteSentAt: string | null;
}

/** Request body for POST /admin/users. */
export interface InviteUserInput {
  email: string;
  name?: string;
}

/** Request body for PATCH /admin/users/:id. */
export interface UpdateUserInput {
  name?: string;
  email?: string;
}

/** Request body for POST /auth/set-password (invite + reset redemption). */
export interface SetPasswordInput {
  token: string;
  password: string;
}
