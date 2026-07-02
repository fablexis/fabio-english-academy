import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { AvailabilityDto, BookingDto, DaySlotsDto } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import { SettingsService } from './settings.service';
import { GoogleCalendarService } from './google-calendar.service';
import {
  buildWeek,
  mondayOf,
  overlapsAny,
  slotLabel,
  toSlotDto,
  weekLabel,
  type RawSlot,
} from './week.util';

const SLOT_MS = 60 * 60 * 1000;

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: SettingsService,
    private readonly google: GoogleCalendarService,
  ) {}

  /** The Mon–Sat working week to display (this week; next week once it's over). */
  private visibleMonday(now: Date): Date {
    const monday = mondayOf(now);
    const weekEnd = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    if (now >= weekEnd) monday.setDate(monday.getDate() + 7);
    return monday;
  }

  /** Busy intervals from existing bookings + (if connected) Google free/busy. */
  private async busyIntervals(from: Date, to: Date): Promise<{ start: Date; end: Date }[]> {
    const bookings = await this.prisma.booking.findMany({
      where: { status: 'confirmed', start: { gte: from, lt: to } },
      select: { start: true, end: true },
    });
    const intervals = bookings.map((b) => ({ start: b.start, end: b.end }));

    const tokens = await this.settings.getTokens();
    if (tokens && this.google.configured) {
      try {
        const { busy, tokens: refreshed } = await this.google.freeBusy(tokens, from, to);
        if (refreshed) await this.settings.refreshTokens(refreshed);
        for (const b of busy) intervals.push({ start: new Date(b.start), end: new Date(b.end) });
      } catch (err) {
        this.logger.warn(`Google free/busy failed, showing DB availability only: ${String(err)}`);
      }
    }
    return intervals;
  }

  async availability(now = new Date()): Promise<AvailabilityDto> {
    const enabled = await this.settings.bookingEnabled();
    const zoomLink = await this.settings.zoomLink();
    if (!enabled) {
      return { enabled: false, weekLabel: '', days: [], zoomLink };
    }
    const weekly = await this.settings.weekly();
    const monday = this.visibleMonday(now);
    const week = buildWeek(monday, weekly);
    const weekEnd = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    const busy = await this.busyIntervals(monday, weekEnd);

    const days: DaySlotsDto[] = week.map((d) => ({
      name: d.name,
      date: d.date,
      slots: d.raw.map((raw) =>
        toSlotDto(raw, this.isFree(raw, now, busy)),
      ),
    }));
    return { enabled: true, weekLabel: weekLabel(monday), days, zoomLink };
  }

  private isFree(raw: RawSlot, now: Date, busy: { start: Date; end: Date }[]): boolean {
    if (raw.start <= now) return false;
    return !overlapsAny(raw.start, raw.end, busy);
  }

  async createBooking(studentId: string, startIso: string, now = new Date()): Promise<BookingDto> {
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException();
    if (!(await this.settings.bookingEnabled())) {
      throw new BadRequestException('Las reservas están deshabilitadas.');
    }
    const start = new Date(startIso);
    if (Number.isNaN(start.getTime())) throw new BadRequestException('Horario inválido.');

    // Re-validate the slot is currently offered and free.
    const availability = await this.availability(now);
    const match = availability.days
      .flatMap((d) => d.slots)
      .find((s) => s.start === start.toISOString());
    if (!match || !match.free) {
      throw new BadRequestException('Ese horario ya no está disponible. Elige otro.');
    }

    const end = new Date(start.getTime() + SLOT_MS);
    const booking = await this.prisma.booking.create({
      data: { studentId, start, end, status: 'confirmed' },
    });

    // Mirror to Google Calendar with the Zoom link, best-effort.
    const tokens = await this.settings.getTokens();
    const zoomLink = await this.settings.zoomLink();
    if (tokens && this.google.configured) {
      try {
        const { eventId, tokens: refreshed } = await this.google.createEvent(tokens, {
          summary: `Clase de inglés — ${student.name}`,
          description:
            `Clase con ${student.name} (nivel ${student.level}), por videollamada.` +
            (zoomLink ? `\n\nZoom: ${zoomLink}` : ''),
          location: zoomLink ?? undefined,
          start,
          end,
        });
        if (refreshed) await this.settings.refreshTokens(refreshed);
        if (eventId) {
          await this.prisma.booking.update({ where: { id: booking.id }, data: { googleEventId: eventId } });
        }
      } catch (err) {
        this.logger.warn(`Google event creation failed (booking still saved): ${String(err)}`);
      }
    }

    return this.toDto(booking);
  }

  /** Label of the student's next upcoming class, or null. */
  async nextClassLabel(studentId: string, now = new Date()): Promise<string | null> {
    const next = await this.prisma.booking.findFirst({
      where: { studentId, status: 'confirmed', start: { gte: now } },
      orderBy: { start: 'asc' },
    });
    return next ? slotLabel(next.start) : null;
  }

  private toDto(b: { id: string; start: Date; end: Date; status: string }): BookingDto {
    return {
      id: b.id,
      start: b.start.toISOString(),
      end: b.end.toISOString(),
      status: b.status,
      label: slotLabel(b.start),
    };
  }
}
