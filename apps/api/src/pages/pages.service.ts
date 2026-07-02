import { Injectable } from '@nestjs/common';
import type { PageContentDto, PageContentMetaDto, PageKey } from '@eyb/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) {}

  /** `data` is null while the page has no saved override (frontend uses defaults). */
  async get(key: PageKey): Promise<PageContentDto> {
    const row = await this.prisma.pageContent.findUnique({ where: { key } });
    return {
      key,
      data: row ? (JSON.parse(row.data) as unknown) : null,
      updatedAt: row ? row.updatedAt.toISOString() : null,
    };
  }

  async list(): Promise<PageContentMetaDto[]> {
    const rows = await this.prisma.pageContent.findMany({
      orderBy: { key: 'asc' },
    });
    return rows.map((r) => ({
      key: r.key as PageKey,
      updatedAt: r.updatedAt.toISOString(),
    }));
  }

  async save(key: PageKey, data: Record<string, unknown>): Promise<PageContentDto> {
    const payload = JSON.stringify(data);
    const row = await this.prisma.pageContent.upsert({
      where: { key },
      create: { key, data: payload },
      update: { data: payload },
    });
    return {
      key,
      data: JSON.parse(row.data) as unknown,
      updatedAt: row.updatedAt.toISOString(),
    };
  }

  /** Drop the override so the page falls back to the shipped defaults. */
  async reset(key: PageKey): Promise<void> {
    await this.prisma.pageContent.deleteMany({ where: { key } });
  }
}
