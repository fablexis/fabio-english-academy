import { Injectable, Logger, UnauthorizedException, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { createHash } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
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
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (!existing) {
      await this.prisma.user.create({
        data: { email, passwordHash: await bcrypt.hash(password, 10), role: 'ADMIN' },
      });
      this.logger.log(`Seeded admin user ${email}`);
    } else if (reset) {
      await this.prisma.user.update({
        where: { email },
        data: { passwordHash: await bcrypt.hash(password, 10) },
      });
      this.logger.log(`Reset admin password for ${email}`);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return { id: user.id, email: user.email, role: user.role };
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
    const refreshToken = await this.jwt.signAsync(payload, refreshOpts);
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
