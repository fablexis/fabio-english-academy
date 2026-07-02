import type { DayAvailability, SlotDto, WeeklyAvailability } from '@eyb/shared';

const DAY_ABBR = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
const MESES_ABBR = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

/** Midnight of the Monday of the week containing `date` (local time). */
export function mondayOf(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0=Sun..6=Sat
  const offset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + offset);
  return d;
}

function hhmm(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function toMinutes(hhmmStr: string): number {
  const [h, m] = hhmmStr.split(':').map((n) => parseInt(n, 10));
  return (h || 0) * 60 + (m || 0);
}

export interface RawSlot {
  start: Date;
  end: Date;
  label: string;
}

/** Hourly slots for one day, from that weekday's configured ranges. */
export function slotsForDay(day: Date, avail: DayAvailability | undefined): RawSlot[] {
  if (!avail || !avail.on) return [];
  const out: RawSlot[] = [];
  for (const range of avail.ranges) {
    const startM = toMinutes(range.start);
    const endM = toMinutes(range.end);
    for (let m = startM; m + 60 <= endM; m += 60) {
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
      start.setMinutes(m);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      out.push({ start, end, label: hhmm(m) });
    }
  }
  return out;
}

export interface WeekDay {
  /** e.g. "Lun 6". */
  name: string;
  /** YYYY-MM-DD. */
  date: string;
  jsDate: Date;
  raw: RawSlot[];
}

/** The Mon–Sat working week starting at `monday`, with each day's raw slots. */
export function buildWeek(monday: Date, weekly: WeeklyAvailability): WeekDay[] {
  const byDay = new Map<number, DayAvailability>();
  for (const d of weekly) byDay.set(d.day, d);
  const days: WeekDay[] = [];
  for (let i = 0; i < 6; i++) {
    const dt = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    days.push({
      name: `${DAY_ABBR[dt.getDay()]} ${dt.getDate()}`,
      date: isoDate(dt),
      jsDate: dt,
      raw: slotsForDay(dt, byDay.get(dt.getDay())),
    });
  }
  return days;
}

export function weekLabel(monday: Date): string {
  const sat = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 5);
  const monthPart = MESES[sat.getMonth()];
  return `semana del ${monday.getDate()} al ${sat.getDate()} de ${monthPart}`;
}

/** "Lun 6 jul · 10:00" — used for the next-class label + selection bar. */
export function slotLabel(start: Date): string {
  const abbr = DAY_ABBR[start.getDay()];
  const time = hhmm(start.getHours() * 60 + start.getMinutes());
  return `${abbr} ${start.getDate()} ${MESES_ABBR[start.getMonth()]} · ${time}`;
}

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/** Whether [start,end) overlaps any of the intervals. */
export function overlapsAny(
  start: Date,
  end: Date,
  intervals: { start: Date; end: Date }[],
): boolean {
  return intervals.some((iv) => start < iv.end && end > iv.start);
}

export function toSlotDto(raw: RawSlot, free: boolean): SlotDto {
  return { start: raw.start.toISOString(), label: raw.label, free };
}
