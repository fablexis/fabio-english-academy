import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { ChatMessageDto, ChatRole, StudentClassDto } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';
import { ClassesService } from '../students/classes.service';
import { AiService, type AiTurn } from './ai.service';

type MessageRow = { id: string; from: string; text: string; createdAt: Date };

function toDto(row: MessageRow): ChatMessageDto {
  return {
    id: row.id,
    from: row.from as ChatRole,
    text: row.text,
    createdAt: row.createdAt.toISOString(),
  };
}

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function spanishDate(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  return `${d} de ${MESES[(m || 1) - 1]} de ${y}`;
}

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly classes: ClassesService,
    private readonly ai: AiService,
  ) {}

  /** Tutor display name for the AI persona + teacher bubbles. */
  private async tutorName(): Promise<string> {
    const admin = await this.prisma.user.findFirst({
      where: { role: 'ADMIN' },
      orderBy: { createdAt: 'asc' },
      select: { name: true, email: true },
    });
    return admin?.name?.trim() || 'tu profe';
  }

  private buildSystem(
    student: { name: string; level: string },
    classes: StudentClassDto[],
    tutor: string,
  ): string {
    const firstName = student.name.split(' ')[0];
    const clasesTxt = classes
      .slice()
      .reverse() // oldest → newest
      .map(
        (c) =>
          `- Clase ${String(c.num).padStart(2, '0')} (${spanishDate(c.date)}): "${c.title}". ` +
          `Temas: ${c.topics.join(', ')}.` +
          (c.summary ? ` Resumen: ${c.summary}` : ''),
      )
      .join('\n');

    return (
      `Eres "Buddy", el asistente de estudio del portal de estudiantes de "Your English Buddy", ` +
      `un servicio personal de tutorías de inglés. Hablas con ${student.name}, estudiante de nivel ${student.level}. ` +
      `Su profesor es ${tutor}, quien puede leer esta conversación para dar seguimiento.\n\n` +
      `Clases que ${firstName} ha tenido:\n${clasesTxt || '- (todavía no tiene clases registradas)'}\n\n` +
      `Reglas estrictas:\n` +
      `1. SOLO respondes preguntas relacionadas con el inglés y los temas cubiertos en esas clases (o dudas de inglés directamente conectadas a ellos).\n` +
      `2. Si la pregunta NO está relacionada con esos temas, recházala con amabilidad y humor ligero, y sugiere preguntárselo a ${tutor} en la próxima clase o por WhatsApp. No respondas el contenido fuera de tema, ni siquiera parcialmente.\n` +
      `3. Respondes en español, con los ejemplos en inglés (con su traducción al español entre paréntesis o en línea aparte).\n` +
      `4. Tono: cálido, cercano y motivador, como un buddy, nunca académico ni acartonado. Tutea a ${firstName}.\n` +
      `5. Respuestas cortas y prácticas: máximo 3-4 oraciones más 1-3 ejemplos. Nada de listas largas.\n` +
      `6. Texto plano, sin markdown, sin asteriscos, sin encabezados. Puedes usar saltos de línea.`
    );
  }

  /** Map stored messages to Gemini turns; teacher replies read as the model. */
  private toTurns(rows: MessageRow[], tutor: string): AiTurn[] {
    const turns: AiTurn[] = rows.map((m) => {
      if (m.from === 'student') return { role: 'user', text: m.text };
      if (m.from === 'teacher') return { role: 'model', text: `(${tutor}): ${m.text}` };
      return { role: 'model', text: m.text };
    });
    // Gemini expects the conversation to open with a user turn.
    while (turns.length && turns[0].role === 'model') turns.shift();
    return turns;
  }

  private seedGreeting(name: string, classes: StudentClassDto[], tutor: string): string {
    const firstName = name.split(' ')[0];
    if (!classes.length) {
      return (
        `¡Hola ${firstName}! Soy tu Buddy 🙂 Todavía no tienes clases registradas, pero en cuanto ` +
        `${tutor} suba la primera, podré ayudarte a repasar lo que veas. ¡Nos vemos pronto!`
      );
    }
    const temas = classes
      .slice()
      .reverse()
      .map((c) => c.title.toLowerCase())
      .slice(0, 6)
      .join(', ');
    return (
      `¡Hola ${firstName}! Soy tu Buddy 🙂 Conozco todo lo que viste en tus ${classes.length} ` +
      `clases: ${temas}.\n\nPregúntame lo que quieras sobre esos temas. Ojo: si me preguntas algo ` +
      `que no vimos en clase, te voy a sugerir que lo hables con ${tutor}.`
    );
  }

  // ── Portal (student) ─────────────────────────────────────────────────────
  /** History for the student; lazily seeds Buddy's greeting on first open. */
  async historyForStudent(studentId: string): Promise<ChatMessageDto[]> {
    const existing = await this.prisma.chatMessage.findMany({
      where: { studentId },
      orderBy: { createdAt: 'asc' },
    });
    if (existing.length) return existing.map(toDto);

    const [student, classes, tutor] = await Promise.all([
      this.prisma.student.findUnique({ where: { id: studentId } }),
      this.classes.listForStudent(studentId),
      this.tutorName(),
    ]);
    if (!student) throw new NotFoundException();
    const seeded = await this.prisma.chatMessage.create({
      data: {
        studentId,
        from: 'ai',
        text: this.seedGreeting(student.name, classes, tutor),
        readByTeacher: true,
      },
    });
    return [toDto(seeded)];
  }

  /** Persist a student message, ask Gemini, persist + return the reply. */
  async sendStudentMessage(
    studentId: string,
    text: string,
  ): Promise<{ student: ChatMessageDto; reply: ChatMessageDto }> {
    const clean = text.trim();
    if (!clean) throw new BadRequestException('El mensaje no puede estar vacío.');
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException();

    const [classes, tutor] = await Promise.all([
      this.classes.listForStudent(studentId),
      this.tutorName(),
    ]);

    const studentMsg = await this.prisma.chatMessage.create({
      data: { studentId, from: 'student', text: clean, readByTeacher: false },
    });

    const history = await this.prisma.chatMessage.findMany({
      where: { studentId },
      orderBy: { createdAt: 'asc' },
    });
    const system = this.buildSystem(student, classes, tutor);
    const replyText = await this.ai.generateReply(system, this.toTurns(history, tutor));

    const aiMsg = await this.prisma.chatMessage.create({
      data: { studentId, from: 'ai', text: replyText, readByTeacher: true },
    });
    return { student: toDto(studentMsg), reply: toDto(aiMsg) };
  }

  // ── Admin (tutor) ────────────────────────────────────────────────────────
  /** Thread for the tutor; marks the student's messages as read. */
  async threadForAdmin(studentId: string): Promise<ChatMessageDto[]> {
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Estudiante no encontrado');
    await this.prisma.chatMessage.updateMany({
      where: { studentId, from: 'student', readByTeacher: false },
      data: { readByTeacher: true },
    });
    const rows = await this.prisma.chatMessage.findMany({
      where: { studentId },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map(toDto);
  }

  async teacherReply(studentId: string, text: string): Promise<ChatMessageDto> {
    const clean = text.trim();
    if (!clean) throw new BadRequestException('La respuesta no puede estar vacía.');
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      select: { name: true },
    });
    if (!student) throw new NotFoundException('Estudiante no encontrado');
    const msg = await this.prisma.chatMessage.create({
      data: { studentId, from: 'teacher', text: clean, readByTeacher: true },
    });
    return toDto(msg);
  }

  /** Owning student name (for activity summaries). */
  async studentName(studentId: string): Promise<string> {
    const s = await this.prisma.student.findUnique({
      where: { id: studentId },
      select: { name: true },
    });
    return s?.name ?? 'estudiante';
  }
}
