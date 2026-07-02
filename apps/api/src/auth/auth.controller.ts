import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';
import { AuthService, type AuthTokens } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto, SetPasswordDto } from './dto/password.dto';
import { UpdateProfileDto } from './dto/profile.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ACCESS_COOKIE, REFRESH_COOKIE } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.auth.validateUser(dto.email, dto.password);
    const tokens = await this.auth.issueTokens(user);
    this.setCookies(res, tokens);
    const lastLoginAt = await this.auth.recordLogin(user);
    return { user: { ...user, lastLoginAt } };
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (!token) throw new UnauthorizedException('No refresh token');
    const tokens = await this.auth.rotateRefresh(token);
    this.setCookies(res, tokens);
    return { ok: true };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.auth.revokeRefresh(req.cookies?.[REFRESH_COOKIE]);
    res.clearCookie(ACCESS_COOKIE, this.cookieBase());
    res.clearCookie(REFRESH_COOKIE, this.cookieBase());
    return { ok: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request) {
    const { id } = req.user as { id: string };
    return { user: await this.auth.getProfile(id) };
  }

  /** Own profile: display name + picture. */
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Body() dto: UpdateProfileDto, @Req() req: Request) {
    const { id } = req.user as { id: string };
    await this.auth.updateProfile(id, dto);
    return { user: await this.auth.getProfile(id) };
  }

  // ── password recovery / invite activation ────────────────────────────────

  /** Always 200 — never reveals whether the email exists. */
  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.auth.requestPasswordReset(dto.email);
    return { ok: true };
  }

  /** Redeems an emailed INVITE or RESET token and sets the new password. */
  @Post('set-password')
  @HttpCode(200)
  async setPassword(@Body() dto: SetPasswordDto) {
    const { email } = await this.auth.setPasswordWithToken(dto.token, dto.password);
    return { ok: true, email };
  }

  // ── cookie helpers ────────────────────────────────────────────────────────
  private cookieBase(): CookieOptions {
    const domain = this.config.get<string>('COOKIE_DOMAIN') || undefined;
    const isProd = this.config.get<string>('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
      domain,
      path: '/',
    };
  }

  private setCookies(res: Response, tokens: AuthTokens): void {
    res.cookie(ACCESS_COOKIE, tokens.accessToken, {
      ...this.cookieBase(),
      maxAge: 15 * 60 * 1000,
    });
    res.cookie(REFRESH_COOKIE, tokens.refreshToken, {
      ...this.cookieBase(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
