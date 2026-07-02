import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import type { CEFRLevel, StudentProfileDto } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import type { StudentJwtPayload } from './types';

type StudentRow = {
  id: string;
  name: string;
  username: string;
  level: string;
  streakWeeks: number;
  mustChangePassword: boolean;
};

export function toStudentProfile(row: StudentRow): StudentProfileDto {
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    level: row.level as CEFRLevel,
    streakWeeks: row.streakWeeks,
    mustChangePassword: row.mustChangePassword,
  };
}

@Injectable()
export class StudentAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /** Validate username + password; returns the student profile. */
  async validate(username: string, password: string): Promise<StudentProfileDto> {
    const student = await this.prisma.student.findUnique({
      where: { username: username.trim().toLowerCase() },
    });
    if (!student) throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    const ok = await bcrypt.compare(password, student.passwordHash);
    if (!ok) throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    return toStudentProfile(student);
  }

  /** A single long-lived access token in an httpOnly cookie (no refresh flow). */
  async issueToken(student: { id: string; username: string }): Promise<string> {
    const payload: StudentJwtPayload = {
      sub: student.id,
      username: student.username,
      typ: 'student',
    };
    const opts: JwtSignOptions = {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '7d',
    };
    return this.jwt.signAsync(payload, opts);
  }

  async getProfile(id: string): Promise<StudentProfileDto> {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new UnauthorizedException();
    return toStudentProfile(student);
  }

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new UnauthorizedException();
    const ok = await bcrypt.compare(currentPassword, student.passwordHash);
    if (!ok) throw new BadRequestException('La contraseña actual no es correcta.');
    if (newPassword.trim().length < 6) {
      throw new BadRequestException('La nueva contraseña debe tener al menos 6 caracteres.');
    }
    await this.prisma.student.update({
      where: { id },
      data: {
        passwordHash: await bcrypt.hash(newPassword, 10),
        mustChangePassword: false,
      },
    });
  }
}
