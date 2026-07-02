import type { Material, NoteBlock, StudentClassDto } from '@eyb/shared';

// Prisma row → API DTO. `topics`, `notes` and `materials` are JSON-stringified
// (same pattern as BlogPost.body).
export type ClassRow = {
  id: string;
  num: number;
  date: Date;
  title: string;
  topics: string;
  notes: string;
  materials: string;
  summary: string | null;
};

function safeParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Hydrate a StudentClass row into the DTO clients consume. */
export function hydrateClass(row: ClassRow): StudentClassDto {
  return {
    id: row.id,
    num: row.num,
    date: row.date.toISOString().slice(0, 10),
    title: row.title,
    topics: safeParse<string[]>(row.topics, []),
    notes: safeParse<NoteBlock[]>(row.notes, []),
    materials: safeParse<Material[]>(row.materials, []),
    summary: row.summary,
  };
}

/** Serialize a class input for storage (JSON-stringify the nested arrays). */
export function serializeClass(input: {
  date: string;
  title: string;
  topics: string[];
  notes: NoteBlock[];
  materials: Material[];
  summary?: string;
}) {
  return {
    date: new Date(input.date),
    title: input.title.trim(),
    topics: JSON.stringify(input.topics ?? []),
    notes: JSON.stringify(input.notes ?? []),
    materials: JSON.stringify(input.materials ?? []),
    summary: input.summary?.trim() || null,
  };
}
