import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
  type OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { createHash, randomUUID } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ActivityService } from '../activity/activity.service';
import {
  adminBaseUrl,
  hashToken,
  issueUserToken,
  RESET_TTL_MINUTES,
} from '../common/tokens';
import type { JwtPayload } from './types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
    private readonly activity: ActivityService,
  ) {}

  /** Seed / reset the single admin user from env on boot. */
  async onModuleInit(): Promise<void> {
    const email = this.config.get<string>('ADMIN_EMAIL');
    const password = this.config.get<string>('ADMIN_PASSWORD');
    if (!email || !password) {
      this.logger.warn('ADMIN_EMAIL / ADMIN_PASSWORD not set — no admin seeded');
      return;
    }
    const reset = this.config.get<string>('ADMIN_RESET') === '1';
    const name = this.config.get<string>('ADMIN_NAME')?.trim() || null;
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (!existing) {
      await this.prisma.user.create({
        data: { email, name, passwordHash: await bcrypt.hash(password, 10), role: 'ADMIN' },
      });
      this.logger.log(`Seeded admin user ${email}`);
    } else if (reset) {
      await this.prisma.user.update({
        where: { email },
        data: { passwordHash: await bcrypt.hash(password, 10), ...(name ? { name } : {}) },
      });
      this.logger.log(`Reset admin password for ${email}`);
    } else if (name && !existing.name) {
      // Backfill the display name for an already-seeded admin.
      await this.prisma.user.update({ where: { email }, data: { name } });
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Email o contraseña incorrectos.');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Email o contraseña incorrectos.');
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
  }

  async issueTokens(user: { id: string; email: string; role: string }): Promise<AuthTokens> {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    type ExpiresIn = JwtSignOptions['expiresIn'];
    const accessOpts: JwtSignOptions = {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES', '15m') as ExpiresIn,
    };
    const refreshOpts: JwtSignOptions = {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES', '7d') as ExpiresIn,
    };
    const accessToken = await this.jwt.signAsync(payload, accessOpts);
    // `jti` makes each refresh token unique even for logins within the same
    // second (identical payload/iat/exp would otherwise collide on tokenHash).
    const refreshToken = await this.jwt.signAsync({ ...payload, jti: randomUUID() }, refreshOpts);
    await this.persistRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async rotateRefresh(token: string): Promise<AuthTokens> {
    let payload: JwtPayload;
    try {
      payload = await this.jwt.verifyAsync<JwtPayload>(token, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const tokenHash = this.hash(token);
    const stored = await this.prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }
    await this.prisma.refreshToken.update({
      where: { tokenHash },
      data: { revokedAt: new Date() },
    });
    return this.issueTokens({ id: payload.sub, email: payload.email, role: payload.role });
  }

  async revokeRefresh(token: string | undefined): Promise<void> {
    if (!token) return;
    await this.prisma.refreshToken
      .updateMany({ where: { tokenHash: this.hash(token) }, data: { revokedAt: new Date() } })
      .catch(() => undefined);
  }

  /**
   * Stamp the new session start and return the previous one — shown on the
   * dashboard as "tu último acceso". Also records the login in the audit log.
   */
  async recordLogin(user: { id: string; email: string }): Promise<string | null> {
    const row = await this.prisma.user.findUnique({ where: { id: user.id } });
    const prev = row?.lastLoginAt ?? null;
    await this.prisma.user.update({
      where: { id: user.id },
      data: { prevLoginAt: prev, lastLoginAt: new Date() },
    });
    this.activity.log(user, {
      action: 'login',
      entity: 'auth',
      summary: 'Inició sesión en el panel',
    });
    return prev?.toISOString() ?? null;
  }

  /** Current user profile for GET /auth/me, including the previous login. */
  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatarUrl: user.avatarUrl,
      lastLoginAt: user.prevLoginAt?.toISOString() ?? null,
    };
  }

  /** Update the caller's own profile (name and/or picture). */
  async updateProfile(
    id: string,
    input: { name?: string; avatarUrl?: string },
  ): Promise<void> {
    const data: { name?: string | null; avatarUrl?: string | null } = {};
    if (input.name !== undefined) data.name = input.name.trim() || null;
    if (input.avatarUrl !== undefined) data.avatarUrl = input.avatarUrl.trim() || null;
    if (Object.keys(data).length === 0) return;
    const user = await this.prisma.user.update({ where: { id }, data });
    this.activity.log(
      { id: user.id, email: user.email },
      { action: 'update', entity: 'user', entityId: user.email, summary: 'Actualizó su perfil' },
    );
  }

  /**
   * Email a single-use reset link. Always resolves without revealing whether
   * the address exists (no user enumeration).
   */
  async requestPasswordReset(emailRaw: string): Promise<void> {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      this.logger.log(`Password reset requested for unknown email ${email}`);
      return;
    }
    const raw = await issueUserToken(
      this.prisma,
      user.id,
      'RESET',
      RESET_TTL_MINUTES * 60_000,
    );
    await this.mail.sendPasswordReset({
      email: user.email,
      resetUrl: `${adminBaseUrl(this.config)}/set-password?token=${raw}`,
      expiresMinutes: RESET_TTL_MINUTES,
    });
  }

  /**
   * Redeem an INVITE or RESET token: set the new password, burn the token,
   * drop any other outstanding tokens and revoke all sessions.
   */
  async setPasswordWithToken(rawToken: string, password: string): Promise<{ email: string }> {
    const row = await this.prisma.userToken.findUnique({
      where: { tokenHash: hashToken(rawToken) },
      include: { user: true },
    });
    if (!row || row.usedAt || row.expiresAt < new Date()) {
      throw new BadRequestException(
        'El enlace no es válido o ha caducado. Vuelve a reiniciar la contraseña.',
      );
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: row.userId }, data: { passwordHash } }),
      this.prisma.userToken.update({ where: { id: row.id }, data: { usedAt: new Date() } }),
      this.prisma.userToken.deleteMany({
        where: { userId: row.userId, usedAt: null, id: { not: row.id } },
      }),
      this.prisma.refreshToken.updateMany({
        where: { userId: row.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
    this.activity.log(
      { id: row.userId, email: row.user.email },
      {
        action: 'update',
        entity: 'auth',
        summary:
          row.type === 'INVITE'
            ? 'Activó su cuenta creando su contraseña'
            : 'Restableció su contraseña',
      },
    );
    return { email: row.user.email };
  }

  private async persistRefreshToken(userId: string, token: string): Promise<void> {
    const decoded = this.jwt.decode(token) as { exp?: number } | null;
    const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 864e5);
    await this.prisma.refreshToken.create({
      data: { userId, tokenHash: this.hash(token), expiresAt },
    });
  }

  private hash(token: string): string {
    // Deterministic hash so the stored value can be looked up on rotation.
    return createHash('sha256').update(token).digest('hex');
  }
}
