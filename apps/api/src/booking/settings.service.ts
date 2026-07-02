import { Injectable } from '@nestjs/common';
import type { PortalSettingsDto, WeeklyAvailability } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import type { GoogleTokens } from './google-calendar.service';

const SINGLETON = 'singleton';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Fetch (or lazily create) the singleton settings row. */
  private async row() {
    const existing = await this.prisma.portalSettings.findUnique({ where: { id: SINGLETON } });
    if (existing) return existing;
    return this.prisma.portalSettings.create({ data: { id: SINGLETON } });
  }

  private parseWeekly(json: string): WeeklyAvailability {
    try {
      const arr = JSON.parse(json) as WeeklyAvailability;
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  async getDto(): Promise<PortalSettingsDto> {
    const s = await this.row();
    return {
      bookingEnabled: s.bookingEnabled,
      zoomLink: s.zoomLink,
      weeklyAvailability: this.parseWeekly(s.weeklyAvailability),
      googleConnected: s.googleConnected,
      googleEmail: s.googleEmail,
      updatedAt: s.updatedAt.toISOString(),
    };
  }

  async weekly(): Promise<WeeklyAvailability> {
    const s = await this.row();
    return this.parseWeekly(s.weeklyAvailability);
  }

  async bookingEnabled(): Promise<boolean> {
    return (await this.row()).bookingEnabled;
  }

  async zoomLink(): Promise<string | null> {
    return (await this.row()).zoomLink;
  }

  async update(input: {
    bookingEnabled?: boolean;
    zoomLink?: string;
    weeklyAvailability?: WeeklyAvailability;
  }): Promise<PortalSettingsDto> {
    await this.row(); // ensure exists
    const data: Record<string, unknown> = {};
    if (input.bookingEnabled !== undefined) data.bookingEnabled = input.bookingEnabled;
    if (input.zoomLink !== undefined) data.zoomLink = input.zoomLink.trim() || null;
    if (input.weeklyAvailability !== undefined) {
      data.weeklyAvailability = JSON.stringify(input.weeklyAvailability);
    }
    await this.prisma.portalSettings.update({ where: { id: SINGLETON }, data });
    return this.getDto();
  }

  // ── Google OAuth token storage ───────────────────────────────────────────
  async getTokens(): Promise<GoogleTokens | null> {
    const s = await this.row();
    if (!s.googleConnected || !s.googleTokens) return null;
    try {
      return JSON.parse(s.googleTokens) as GoogleTokens;
    } catch {
      return null;
    }
  }

  async saveTokens(tokens: GoogleTokens, email: string | null): Promise<void> {
    await this.row();
    await this.prisma.portalSettings.update({
      where: { id: SINGLETON },
      data: {
        googleConnected: true,
        googleEmail: email,
        googleTokens: JSON.stringify(tokens),
      },
    });
  }

  /** Persist refreshed credentials (keeps the refresh_token if the new set omits it). */
  async refreshTokens(tokens: GoogleTokens): Promise<void> {
    const s = await this.row();
    if (!s.googleTokens) return;
    let current: GoogleTokens = {};
    try {
      current = JSON.parse(s.googleTokens) as GoogleTokens;
    } catch {
      current = {};
    }
    const merged = { ...current, ...tokens };
    if (!merged.refresh_token && current.refresh_token) {
      merged.refresh_token = current.refresh_token;
    }
    await this.prisma.portalSettings.update({
      where: { id: SINGLETON },
      data: { googleTokens: JSON.stringify(merged) },
    });
  }

  async clearTokens(): Promise<void> {
    await this.row();
    await this.prisma.portalSettings.update({
      where: { id: SINGLETON },
      data: { googleConnected: false, googleEmail: null, googleTokens: null },
    });
  }
}
