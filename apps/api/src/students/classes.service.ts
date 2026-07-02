import { Injectable, NotFoundException } from '@nestjs/common';
import type { Material, NoteBlock, StudentClassDto } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import { hydrateClass, serializeClass, type ClassRow } from './class.serialize';
import type { ClassDto } from './dto';

/** Keep only well-formed note blocks (defends the stored JSON shape). */
function cleanNotes(notes: unknown): NoteBlock[] {
  if (!Array.isArray(notes)) return [];
  const out: NoteBlock[] = [];
  for (const n of notes) {
    if (!n || typeof n !== 'object') continue;
    const kind = (n as { kind?: string }).kind;
    if (kind === 'p' || kind === 'tip') {
      out.push({ kind, text: String((n as { text?: string }).text ?? '') });
    } else if (kind === 'ex') {
      out.push({
        kind: 'ex',
        en: String((n as { en?: string }).en ?? ''),
        es: String((n as { es?: string }).es ?? ''),
      });
    }
  }
  return out;
}

function cleanMaterials(materials: unknown): Material[] {
  if (!Array.isArray(materials)) return [];
  const out: Material[] = [];
  for (const m of materials) {
    if (!m || typeof m !== 'object') continue;
    const type = (m as { type?: string }).type;
    if (type !== 'pdf' && type !== 'blog') continue;
    out.push({
      type,
      title: String((m as { title?: string }).title ?? '').trim(),
      url: String((m as { url?: string }).url ?? '').trim(),
    });
  }
  return out;
}

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(studentId: string, input: ClassDto): Promise<StudentClassDto> {
    const last = await this.prisma.studentClass.findFirst({
      where: { studentId },
      orderBy: { num: 'desc' },
      select: { num: true },
    });
    const num = (last?.num ?? 0) + 1;
    const row = await this.prisma.studentClass.create({
      data: {
        studentId,
        num,
        ...serializeClass({
          ...input,
          notes: cleanNotes(input.notes),
          materials: cleanMaterials(input.materials),
        }),
      },
    });
    return hydrateClass(row as ClassRow);
  }

  async update(id: string, input: ClassDto): Promise<StudentClassDto> {
    try {
      const row = await this.prisma.studentClass.update({
        where: { id },
        data: serializeClass({
          ...input,
          notes: cleanNotes(input.notes),
          materials: cleanMaterials(input.materials),
        }),
      });
      return hydrateClass(row as ClassRow);
    } catch {
      throw new NotFoundException('Clase no encontrada');
    }
  }

  async remove(id: string): Promise<{ studentId: string; num: number }> {
    try {
      const row = await this.prisma.studentClass.delete({ where: { id } });
      return { studentId: row.studentId, num: row.num };
    } catch {
      throw new NotFoundException('Clase no encontrada');
    }
  }

  // ── Portal reads (scoped to the authed student) ──────────────────────────
  async listForStudent(studentId: string): Promise<StudentClassDto[]> {
    const rows = await this.prisma.studentClass.findMany({
      where: { studentId },
      orderBy: { num: 'desc' },
    });
    return rows.map((r) => hydrateClass(r as ClassRow));
  }

  async getForStudent(studentId: string, id: string): Promise<StudentClassDto> {
    const row = await this.prisma.studentClass.findFirst({ where: { id, studentId } });
    if (!row) throw new NotFoundException('Clase no encontrada');
    return hydrateClass(row as ClassRow);
  }

  /** Owning student id for a class (used to build activity summaries). */
  async ownerOf(id: string): Promise<string | null> {
    const row = await this.prisma.studentClass.findUnique({
      where: { id },
      select: { studentId: true },
    });
    return row?.studentId ?? null;
  }
}
