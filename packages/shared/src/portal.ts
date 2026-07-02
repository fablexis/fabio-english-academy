// Student portal + admin-side types and DTOs. Plain TS (no React/DOM), consumed
// by both the web app and the API (type-only in the API — value imports from
// this ESM-only package are avoided there, mirroring blog VARIANTS / PAGE_KEYS).

/** CEFR levels a tutor can assign to a student. */
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export const CEFR_LEVELS: readonly CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

// ── Class content blocks ─────────────────────────────────────────────────────
/** An ordered block inside a class's notes. */
export type NoteBlock =
  | { kind: 'p'; text: string }
  | { kind: 'tip'; text: string }
  | { kind: 'ex'; en: string; es: string };

export const NOTE_KINDS = ['p', 'ex', 'tip'] as const;
export type NoteKind = (typeof NOTE_KINDS)[number];

/** A downloadable/linked resource attached to a class. */
export interface Material {
  type: 'pdf' | 'blog';
  title: string;
  /** PDF → uploaded file URL; blog → link to a blog article (path or URL). */
  url: string;
}
export const MATERIAL_TYPES = ['pdf', 'blog'] as const;
export type MaterialType = (typeof MATERIAL_TYPES)[number];

// ── Classes ──────────────────────────────────────────────────────────────────
/** A registered class as the student sees it and the tutor edits it. */
export interface StudentClassDto {
  id: string;
  /** Sequence number within the student's history (1-based). */
  num: number;
  /** ISO date (YYYY-MM-DD granularity is enough, stored as a DateTime). */
  date: string;
  title: string;
  topics: string[];
  notes: NoteBlock[];
  materials: Material[];
  /** Short recap used as the AI's allowed knowledge scope. */
  summary?: string | null;
}

/** Request body for creating/updating a class. */
export interface ClassInput {
  date: string;
  title: string;
  topics: string[];
  notes: NoteBlock[];
  materials: Material[];
  summary?: string;
}

// ── Students (admin) ─────────────────────────────────────────────────────────
/** Row of GET /admin/students. */
export interface StudentListItemDto {
  id: string;
  name: string;
  username: string;
  level: CEFRLevel;
  streakWeeks: number;
  classesCount: number;
  /** ISO date of the most recent class, or null when none. */
  lastClassDate: string | null;
  /** Unread student messages awaiting the tutor. */
  unread: number;
  /** Last message in the conversation (single-line), or null if none. */
  lastMessagePreview: string | null;
  createdAt: string;
}

/** GET /admin/students/:id — the full ficha. */
export interface StudentDetailDto {
  id: string;
  name: string;
  username: string;
  level: CEFRLevel;
  streakWeeks: number;
  classesCount: number;
  topicsCount: number;
  unread: number;
  createdAt: string;
  classes: StudentClassDto[];
}

/** Request body for POST /admin/students. */
export interface CreateStudentInput {
  name: string;
  username: string;
  level: CEFRLevel;
  /** Temporary password the tutor shares; student changes it on first login. */
  password: string;
}

/** Request body for PATCH /admin/students/:id. */
export interface UpdateStudentInput {
  name?: string;
  username?: string;
  level?: CEFRLevel;
  streakWeeks?: number;
}

/** Response of POST /admin/students/:id/reset-password. */
export interface ResetPasswordResultDto {
  password: string;
}

// ── Portal (student-facing) ──────────────────────────────────────────────────
/** The authenticated student (GET /portal/auth/me, login response). */
export interface StudentProfileDto {
  id: string;
  name: string;
  username: string;
  level: CEFRLevel;
  streakWeeks: number;
  mustChangePassword: boolean;
}

/** GET /portal/profile — dashboard stats + booking state. */
export interface PortalDashboardDto {
  student: StudentProfileDto;
  classesCount: number;
  topicsCount: number;
  /** Whether the tutor enabled the booking feature. */
  bookingEnabled: boolean;
  /** Human label of the next confirmed class, or null. */
  nextClassLabel: string | null;
}

export interface StudentLoginInput {
  username: string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

// ── Chat ─────────────────────────────────────────────────────────────────────
export type ChatRole = 'student' | 'ai' | 'teacher';
export const CHAT_ROLES = ['student', 'ai', 'teacher'] as const;

export interface ChatMessageDto {
  id: string;
  from: ChatRole;
  text: string;
  createdAt: string;
}

/** POST /portal/chat request. */
export interface SendChatInput {
  text: string;
}

/** POST /portal/chat response — the persisted student + AI messages. */
export interface ChatReplyDto {
  student: ChatMessageDto;
  reply: ChatMessageDto;
}

/** POST /admin/students/:id/chat request (tutor reply). */
export interface TeacherReplyInput {
  text: string;
}

// ── Booking / availability ───────────────────────────────────────────────────
export interface TimeRange {
  /** "HH:MM" 24h. */
  start: string;
  end: string;
}

/** One weekday's availability. `day` is 0=Sunday … 6=Saturday. */
export interface DayAvailability {
  day: number;
  on: boolean;
  ranges: TimeRange[];
}
export type WeeklyAvailability = DayAvailability[];

/** Admin booking config (GET/PUT /admin/booking/settings). */
export interface PortalSettingsDto {
  bookingEnabled: boolean;
  zoomLink: string | null;
  weeklyAvailability: WeeklyAvailability;
  googleConnected: boolean;
  googleEmail: string | null;
  /** ISO timestamp of the last settings save (proxy for last sync). */
  updatedAt: string | null;
}

export interface UpdateSettingsInput {
  bookingEnabled?: boolean;
  zoomLink?: string;
  weeklyAvailability?: WeeklyAvailability;
}

/** A bookable slot the student sees. */
export interface SlotDto {
  /** ISO datetime of the slot start. */
  start: string;
  /** "HH:MM" label. */
  label: string;
  free: boolean;
}

/** A day column in the portal booking grid. */
export interface DaySlotsDto {
  /** e.g. "Lun 6". */
  name: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  slots: SlotDto[];
}

/** GET /portal/availability. */
export interface AvailabilityDto {
  enabled: boolean;
  /** Human label of the week, e.g. "semana del 6 al 11 de julio". */
  weekLabel: string;
  days: DaySlotsDto[];
  zoomLink: string | null;
}

/** POST /portal/bookings request. */
export interface CreateBookingInput {
  /** ISO datetime of the chosen slot start. */
  start: string;
}

export interface BookingDto {
  id: string;
  start: string;
  end: string;
  status: string;
  /** Human label like "Lun 6 jul · 10:00". */
  label: string;
}
