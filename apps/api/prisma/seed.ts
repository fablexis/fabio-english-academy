import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { DEMO_AVAILABILITY, DEMO_PASSWORD, DEMO_STUDENTS } from './seed-data/students';

const prisma = new PrismaClient();

interface SeedRow {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: string;
  image: string;
  body: unknown;
  published: boolean;
  sortOrder: number;
}

async function main() {
  const file = join(__dirname, 'blog-seed.json');
  const rows = JSON.parse(readFileSync(file, 'utf8')) as SeedRow[];

  for (const row of rows) {
    const data = {
      slug: row.slug,
      category: row.category,
      title: row.title,
      excerpt: row.excerpt,
      readTime: row.readTime,
      level: row.level,
      variant: row.variant,
      image: row.image,
      body: JSON.stringify(row.body),
      published: row.published,
      sortOrder: row.sortOrder,
    };
    await prisma.blogPost.upsert({
      where: { slug: row.slug },
      create: data,
      update: data,
    });
  }
  console.log(`Seeded ${rows.length} blog posts`);

  await seedStudents();
  await seedPortalSettings();
}

/** Demo students + their classes and Buddy conversations (idempotent). */
async function seedStudents() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  for (const st of DEMO_STUDENTS) {
    const student = await prisma.student.upsert({
      where: { username: st.username },
      create: {
        name: st.name,
        username: st.username,
        level: st.level,
        streakWeeks: st.streakWeeks,
        mustChangePassword: false,
        passwordHash,
      },
      update: { name: st.name, level: st.level, streakWeeks: st.streakWeeks },
    });

    // Rebuild classes + messages so re-seeding stays clean.
    await prisma.studentClass.deleteMany({ where: { studentId: student.id } });
    await prisma.chatMessage.deleteMany({ where: { studentId: student.id } });

    for (const cl of st.classes) {
      await prisma.studentClass.create({
        data: {
          studentId: student.id,
          num: cl.num,
          date: new Date(cl.date),
          title: cl.title,
          topics: JSON.stringify(cl.topics),
          notes: JSON.stringify(cl.notes),
          materials: JSON.stringify(cl.materials),
          summary: cl.summary ?? null,
        },
      });
    }

    // Space messages a second apart so ordering is deterministic.
    let t = Date.now() - st.chat.length * 1000;
    for (const m of st.chat) {
      await prisma.chatMessage.create({
        data: {
          studentId: student.id,
          from: m.from,
          text: m.text,
          // A student message is unread only when this student has a pending count.
          readByTeacher: m.from === 'student' ? st.unread === 0 : true,
          createdAt: new Date(t),
        },
      });
      t += 1000;
    }
  }
  console.log(`Seeded ${DEMO_STUDENTS.length} demo students`);
  console.log(`  Demo logins — password "${DEMO_PASSWORD}": ${DEMO_STUDENTS.map((s) => s.username).join(', ')}`);
}

/** Portal booking settings singleton (booking on, weekly availability). */
async function seedPortalSettings() {
  const data = {
    bookingEnabled: true,
    weeklyAvailability: JSON.stringify(DEMO_AVAILABILITY),
    zoomLink: 'https://zoom.us/j/0000000000',
  };
  await prisma.portalSettings.upsert({
    where: { id: 'singleton' },
    create: { id: 'singleton', ...data },
    update: data,
  });
  console.log('Seeded portal settings (booking enabled)');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
