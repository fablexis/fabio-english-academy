import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import type {
  CEFRLevel,
  StudentDetailDto,
  StudentListItemDto,
} from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import { hydrateClass, type ClassRow } from './class.serialize';
import type { CreateStudentDto, UpdateStudentDto } from './dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<StudentListItemDto[]> {
    const rows = await this.prisma.student.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        _count: {
          select: {
            classes: true,
            messages: { where: { from: 'student', readByTeacher: false } },
          },
        },
        classes: { orderBy: { num: 'desc' }, take: 1, select: { date: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { text: true } },
      },
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      username: r.username,
      level: r.level as CEFRLevel,
      streakWeeks: r.streakWeeks,
      classesCount: r._count.classes,
      lastClassDate: r.classes[0]?.date.toISOString().slice(0, 10) ?? null,
      unread: r._count.messages,
      lastMessagePreview: r.messages[0]?.text.replace(/\s+/g, ' ').trim() ?? null,
      createdAt: r.createdAt.toISOString(),
    }));
  }

  async create(input: CreateStudentDto): Promise<StudentListItemDto> {
    const username = input.username.trim().toLowerCase();
    const exists = await this.prisma.student.findUnique({ where: { username } });
    if (exists) throw new ConflictException('Ya existe un estudiante con ese usuario.');
    const student = await this.prisma.student.create({
      data: {
        name: input.name.trim(),
        username,
        level: input.level,
        passwordHash: await bcrypt.hash(input.password, 10),
        mustChangePassword: true,
      },
    });
    return {
      id: student.id,
      name: student.name,
      username: student.username,
      level: student.level as CEFRLevel,
      streakWeeks: student.streakWeeks,
      classesCount: 0,
      lastClassDate: null,
      unread: 0,
      lastMessagePreview: null,
      createdAt: student.createdAt.toISOString(),
    };
  }

  async detail(id: string): Promise<StudentDetailDto> {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        classes: { orderBy: { num: 'desc' } },
        _count: {
          select: { messages: { where: { from: 'student', readByTeacher: false } } },
        },
      },
    });
    if (!student) throw new NotFoundException('Estudiante no encontrado');
    const classes = student.classes.map((c) => hydrateClass(c as ClassRow));
    return {
      id: student.id,
      name: student.name,
      username: student.username,
      level: student.level as CEFRLevel,
      streakWeeks: student.streakWeeks,
      classesCount: classes.length,
      topicsCount: classes.reduce((n, c) => n + c.topics.length, 0),
      unread: student._count.messages,
      createdAt: student.createdAt.toISOString(),
      classes,
    };
  }

  async update(id: string, input: UpdateStudentDto): Promise<void> {
    const data: Record<string, unknown> = {};
    if (input.name !== undefined) data.name = input.name.trim();
    if (input.level !== undefined) data.level = input.level;
    if (input.streakWeeks !== undefined) data.streakWeeks = input.streakWeeks;
    if (input.username !== undefined) {
      const username = input.username.trim().toLowerCase();
      const clash = await this.prisma.student.findUnique({ where: { username } });
      if (clash && clash.id !== id) {
        throw new ConflictException('Ya existe un estudiante con ese usuario.');
      }
      data.username = username;
    }
    if (Object.keys(data).length === 0) return;
    try {
      await this.prisma.student.update({ where: { id }, data });
    } catch {
      throw new NotFoundException('Estudiante no encontrado');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.student.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Estudiante no encontrado');
    }
  }

  /** Regenerate a temporary password (students have no email to reset via). */
  async resetPassword(id: string): Promise<{ password: string; name: string }> {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Estudiante no encontrado');
    const password = randomTempPassword();
    await this.prisma.student.update({
      where: { id },
      data: {
        passwordHash: await bcrypt.hash(password, 10),
        mustChangePassword: true,
      },
    });
    return { password, name: student.name };
  }

  /** Ensures a student exists; returns its name (for activity summaries). */
  async requireName(id: string): Promise<string> {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: { name: true },
    });
    if (!student) throw new BadRequestException('Estudiante no encontrado');
    return student.name;
  }
}

/** Human-friendly temp password, e.g. "buddy-3f8a1c". */
function randomTempPassword(): string {
  return `buddy-${randomBytes(3).toString('hex')}`;
}
