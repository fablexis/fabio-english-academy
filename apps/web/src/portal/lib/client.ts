import type {
  AvailabilityDto,
  BookingDto,
  ChatMessageDto,
  ChatReplyDto,
  PortalDashboardDto,
  StudentClassDto,
  StudentProfileDto,
} from '@eyb/shared';

const BASE = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

// Every portal call carries the httpOnly student session cookie.
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

export const portalApi = {
  // ── Auth ──
  me: () => request<{ student: StudentProfileDto }>('/portal/auth/me'),
  login: (username: string, password: string) =>
    request<{ student: StudentProfileDto }>('/portal/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<{ ok: boolean }>('/portal/auth/logout', { method: 'POST' }),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ ok: boolean }>('/portal/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // ── Dashboard + classes ──
  dashboard: () => request<PortalDashboardDto>('/portal/profile'),
  listClasses: () => request<StudentClassDto[]>('/portal/classes'),
  getClass: (id: string) => request<StudentClassDto>(`/portal/classes/${id}`),

  // ── Chat ──
  chatHistory: () => request<ChatMessageDto[]>('/portal/chat'),
  sendChat: (text: string) =>
    request<ChatReplyDto>('/portal/chat', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),

  // ── Booking ──
  availability: () => request<AvailabilityDto>('/portal/availability'),
  createBooking: (start: string) =>
    request<BookingDto>('/portal/bookings', {
      method: 'POST',
      body: JSON.stringify({ start }),
    }),
};
