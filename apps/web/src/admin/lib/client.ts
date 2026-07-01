import type {
  AuthUserDto,
  BlogListItemDto,
  BlogPostDto,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from '@eyb/shared';

const BASE = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// All admin calls send the httpOnly auth cookie (credentials: 'include').
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    ...init,
  });
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  const data = text ? JSON.parse(text) : undefined;
  if (!res.ok) {
    throw new ApiError(res.status, data?.message ?? `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  // ── Auth ──
  me: () => request<{ user: AuthUserDto }>('/auth/me'),
  login: (email: string, password: string) =>
    request<{ user: AuthUserDto }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ ok: boolean }>('/auth/logout', { method: 'POST' }),

  // ── Blog admin CRUD ──
  listPosts: () => request<BlogListItemDto[]>('/admin/blog'),
  getPost: (id: number) => request<BlogPostDto>(`/admin/blog/${id}`),
  createPost: (input: CreateBlogPostInput) =>
    request<BlogPostDto>('/admin/blog', { method: 'POST', body: JSON.stringify(input) }),
  updatePost: (id: number, input: UpdateBlogPostInput) =>
    request<BlogPostDto>(`/admin/blog/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),
  deletePost: (id: number) => request<void>(`/admin/blog/${id}`, { method: 'DELETE' }),
};
