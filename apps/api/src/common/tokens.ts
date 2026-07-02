import { createHash, randomBytes } from 'node:crypto';
import type { ConfigService } from '@nestjs/config';
import type { PrismaService } from '../prisma/prisma.service';

export const INVITE_TTL_HOURS = 48;
export const RESET_TTL_MINUTES = 60;

export type UserTokenType = 'INVITE' | 'RESET';

export function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

/**
 * Issue a fresh single-use token for a user, replacing any unused ones of the
 * same type. Returns the raw value (only ever transmitted inside the email).
 */
export async function issueUserToken(
  prisma: PrismaService,
  userId: string,
  type: UserTokenType,
  ttlMs: number,
): Promise<string> {
  await prisma.userToken.deleteMany({ where: { userId, type, usedAt: null } });
  const raw = randomBytes(32).toString('hex');
  await prisma.userToken.create({
    data: {
      userId,
      type,
      tokenHash: hashToken(raw),
      expiresAt: new Date(Date.now() + ttlMs),
    },
  });
  return raw;
}

/** Base URL of the admin panel for emailed links (ADMIN_URL > WEB_ORIGIN[0]/admin). */
export function adminBaseUrl(config: ConfigService): string {
  const explicit = config.get<string>('ADMIN_URL');
  if (explicit) return explicit.replace(/\/+$/, '');
  const origin = (config.get<string>('WEB_ORIGIN') ?? 'http://localhost:4321')
    .split(',')[0]
    .trim();
  return `${origin.replace(/\/+$/, '')}/admin`;
}
