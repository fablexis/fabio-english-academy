import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityService, type Actor } from '../activity/activity.service';
import { adminBaseUrl } from '../common/tokens';
import { SettingsService } from './settings.service';
import { BookingService } from './booking.service';
import { GoogleCalendarService } from './google-calendar.service';
import { UpdateSettingsDto } from './dto';

const OAUTH_STATE = { typ: 'gcal' };

@Controller('admin/booking')
export class AdminBookingController {
  constructor(
    private readonly settings: SettingsService,
    private readonly booking: BookingService,
    private readonly google: GoogleCalendarService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly activity: ActivityService,
  ) {}

  @Get('settings')
  @UseGuards(JwtAuthGuard)
  getSettings() {
    return this.settings.getDto();
  }

  @Put('settings')
  @UseGuards(JwtAuthGuard)
  async updateSettings(@Body() dto: UpdateSettingsDto, @Req() req: Request) {
    const result = await this.settings.update(dto);
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'booking',
      summary: 'Actualizó la agenda del portal',
    });
    return result;
  }

  // ── Google OAuth ─────────────────────────────────────────────────────────
  /** Returns the consent URL; the SPA redirects the browser to it. */
  @Get('google/connect')
  @UseGuards(JwtAuthGuard)
  async connect() {
    const state = await this.jwt.signAsync(OAUTH_STATE, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '10m',
    });
    return { url: this.google.getAuthUrl(state) };
  }

  /**
   * OAuth redirect target (hit by Google, unguarded). The signed `state` proves
   * the flow started from our /connect endpoint; we then persist the tokens.
   */
  @Get('google/callback')
  async callback(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Res() res: Response,
  ) {
    const back = `${adminBaseUrl(this.config)}/agenda`;
    try {
      if (!code || !state) throw new Error('missing code/state');
      await this.jwt.verifyAsync(state, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      });
      const { tokens, email } = await this.google.exchangeCode(code);
      await this.settings.saveTokens(tokens, email);
      res.redirect(`${back}?google=connected`);
    } catch {
      res.redirect(`${back}?google=error`);
    }
  }

  @Post('google/disconnect')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async disconnect(@Req() req: Request) {
    const tokens = await this.settings.getTokens();
    if (tokens) await this.google.revoke(tokens);
    await this.settings.clearTokens();
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'booking',
      summary: 'Desconectó Google Calendar',
    });
    return { ok: true };
  }
}
