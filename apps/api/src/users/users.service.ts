import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import type { AdminUserDto } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { adminBaseUrl, INVITE_TTL_HOURS, issueUserToken } from '../common/tokens';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
  ) {}

  async list(): Promise<AdminUserDto[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        tokens: {
          where: { type: 'INVITE', usedAt: null },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    const now = new Date();
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      avatarUrl: u.avatarUrl,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
      lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
      invitePending: u.tokens.length > 0,
      inviteExpired: u.tokens.length > 0 && u.tokens.every((t) => t.expiresAt < now),
      inviteSentAt: u.tokens[0]?.createdAt.toISOString() ?? null,
    }));
  }

  /** Create the account (unusable placeholder password) and email the invite. */
  async invite(emailRaw: string, invitedBy?: string, nameRaw?: string): Promise<AdminUserDto> {
    const email = emailRaw.trim().toLowerCase();
    const name = nameRaw?.trim() || null;
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Ya existe un usuario con ese email.');
    }
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        // Random placeholder: the account can't log in until the invite link
        // sets a real password.
        passwordHash: await bcrypt.hash(randomBytes(32).toString('hex'), 10),
        role: 'ADMIN',
      },
    });
    await this.sendInvite(user.id, email, invitedBy, name ?? undefined);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: null,
      invitePending: true,
      inviteExpired: false,
      inviteSentAt: new Date().toISOString(),
    };
  }

  /** Edit a user's account data (name / email). Returns the updated email. */
  async update(
    id: string,
    input: { name?: string; email?: string },
  ): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');

    const data: { name?: string | null; email?: string } = {};
    if (input.name !== undefined) data.name = input.name.trim() || null;
    if (input.email !== undefined) {
      const email = input.email.trim().toLowerCase();
      if (email !== user.email) {
        const taken = await this.prisma.user.findUnique({ where: { email } });
        if (taken) throw new ConflictException('Ya existe un usuario con ese email.');
        data.email = email;
      }
    }
    const updated = await this.prisma.user.update({ where: { id }, data });
    return updated.email;
  }

  /** Re-send (and re-issue) the invite for an account that never activated. */
  async resendInvite(id: string, invitedBy?: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tokens: { where: { type: 'INVITE', usedAt: null } } },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    if (user.tokens.length === 0) {
      throw new BadRequestException('Esta cuenta ya está activa.');
    }
    await this.sendInvite(user.id, user.email, invitedBy, user.name ?? undefined);
  }

  /** Returns the deleted account's email (for the audit log). */
  async remove(id: string, selfId: string): Promise<string> {
    if (id === selfId) {
      throw new BadRequestException('No puedes eliminar tu propia cuenta.');
    }
    const total = await this.prisma.user.count();
    if (total <= 1) {
      throw new BadRequestException('No puedes eliminar al único administrador.');
    }
    try {
      const deleted = await this.prisma.user.delete({ where: { id } });
      return deleted.email;
    } catch {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

  private async sendInvite(
    userId: string,
    email: string,
    invitedBy?: string,
    name?: string,
  ): Promise<void> {
    const raw = await issueUserToken(
      this.prisma,
      userId,
      'INVITE',
      INVITE_TTL_HOURS * 3_600_000,
    );
    await this.mail.sendAdminInvite({
      email,
      name,
      inviteUrl: `${adminBaseUrl(this.config)}/set-password?token=${raw}`,
      invitedBy,
      expiresHours: INVITE_TTL_HOURS,
    });
  }
}
