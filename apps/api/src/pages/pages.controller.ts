import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { PageKey } from '@eyb/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityService, type Actor } from '../activity/activity.service';
import { PagesService } from './pages.service';
import { SavePageContentDto } from './dto';

// Kept in sync with PAGE_KEYS in @eyb/shared (value imports from the ESM-only
// shared package are avoided in the API — same pattern as blog VARIANTS).
const PAGE_KEYS = ['home', 'about', 'courses', 'blog', 'site'] as const;

// Human names for the audit log (mirrors the admin page titles).
const PAGE_TITLES: Record<PageKey, string> = {
  home: 'Inicio',
  about: 'Nosotros',
  courses: 'Cursos',
  blog: 'Blog (portada)',
  site: 'Sitio (general)',
};

function parseKey(key: string): PageKey {
  if (!(PAGE_KEYS as readonly string[]).includes(key)) {
    throw new NotFoundException(`Unknown page key "${key}"`);
  }
  return key as PageKey;
}

@Controller()
export class PagesController {
  constructor(
    private readonly pages: PagesService,
    private readonly activity: ActivityService,
  ) {}

  // ── Public read (used by the Astro SSR pages) ───────────────────────────
  @Get('pages/:key')
  get(@Param('key') key: string) {
    return this.pages.get(parseKey(key));
  }

  // ── Admin (JWT-guarded) ─────────────────────────────────────────────────
  @Get('admin/pages')
  @UseGuards(JwtAuthGuard)
  list() {
    return this.pages.list();
  }

  @Put('admin/pages/:key')
  @UseGuards(JwtAuthGuard)
  async save(
    @Param('key') key: string,
    @Body() dto: SavePageContentDto,
    @Req() req: Request,
  ) {
    const pageKey = parseKey(key);
    const saved = await this.pages.save(pageKey, dto.data);
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'page',
      entityId: pageKey,
      summary: `Actualizó la página «${PAGE_TITLES[pageKey]}»`,
    });
    return saved;
  }

  @Delete('admin/pages/:key')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async reset(@Param('key') key: string, @Req() req: Request) {
    const pageKey = parseKey(key);
    await this.pages.reset(pageKey);
    this.activity.log(req.user as Actor, {
      action: 'delete',
      entity: 'page',
      entityId: pageKey,
      summary: `Restauró la página «${PAGE_TITLES[pageKey]}» al contenido original`,
    });
  }
}
