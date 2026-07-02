import type {
  ActivityListDto,
  AdminUserDto,
  AuthUserDto,
  UpdateProfileInput,
  UpdateUserInput,
  BlogListItemDto,
  BlogPostDto,
  CreateBlogPostInput,
  PageContentDto,
  PageContentMetaDto,
  PageKey,
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
  updateProfile: (input: UpdateProfileInput) =>
    request<{ user: AuthUserDto }>('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(input),
    }),
  forgotPassword: (email: string) =>
    request<{ ok: boolean }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  setPassword: (token: string, password: string) =>
    request<{ ok: boolean; email: string }>('/auth/set-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),

  // ── Admin users (invitations) ──
  listUsers: () => request<AdminUserDto[]>('/admin/users'),
  inviteUser: (email: string, name?: string) =>
    request<AdminUserDto>('/admin/users', {
      method: 'POST',
      body: JSON.stringify({ email, ...(name ? { name } : {}) }),
    }),
  updateUser: (id: string, input: UpdateUserInput) =>
    request<{ ok: boolean }>(`/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    }),
  resendInvite: (id: string) =>
    request<{ ok: boolean }>(`/admin/users/${id}/invite`, { method: 'POST' }),
  deleteUser: (id: string) => request<void>(`/admin/users/${id}`, { method: 'DELETE' }),

  // ── Activity log ──
  getActivity: (params: { entity?: string; action?: string; before?: number; take?: number } = {}) => {
    const qs = new URLSearchParams();
    if (params.entity) qs.set('entity', params.entity);
    if (params.action) qs.set('action', params.action);
    if (params.before) qs.set('before', String(params.before));
    if (params.take) qs.set('take', String(params.take));
    const suffix = qs.toString() ? `?${qs}` : '';
    return request<ActivityListDto>(`/admin/activity${suffix}`);
  },

  // ── Blog admin CRUD ──
  listPosts: () => request<BlogListItemDto[]>('/admin/blog'),
  getPost: (id: number) => request<BlogPostDto>(`/admin/blog/${id}`),
  createPost: (input: CreateBlogPostInput) =>
    request<BlogPostDto>('/admin/blog', { method: 'POST', body: JSON.stringify(input) }),
  updatePost: (id: number, input: UpdateBlogPostInput) =>
    request<BlogPostDto>(`/admin/blog/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),
  deletePost: (id: number) => request<void>(`/admin/blog/${id}`, { method: 'DELETE' }),

  // ── Image uploads ──
  // Multipart, so it bypasses request()'s JSON Content-Type header.
  uploadImage: async (file: File): Promise<{ url: string; filename: string; size: number }> => {
    const body = new FormData();
    body.append('file', file);
    const res = await fetch(`${BASE}/admin/uploads`, {
      method: 'POST',
      credentials: 'include',
      body,
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : undefined;
    if (!res.ok) {
      throw new ApiError(res.status, data?.message ?? `No se pudo subir la imagen (${res.status})`);
    }
    return data as { url: string; filename: string; size: number };
  },

  // ── Page content (site pages CMS) ──
  listPages: () => request<PageContentMetaDto[]>('/admin/pages'),
  getPage: (key: PageKey) => request<PageContentDto>(`/pages/${key}`),
  savePage: (key: PageKey, data: Record<string, unknown>) =>
    request<PageContentDto>(`/admin/pages/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    }),
  resetPage: (key: PageKey) =>
    request<void>(`/admin/pages/${key}`, { method: 'DELETE' }),
};
