import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { ActivityService, type Actor } from '../activity/activity.service';
import { diskStorage } from 'multer';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { extname } from 'node:path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UPLOAD_DIR } from './uploads.constants';

// SVG intentionally excluded (can embed scripts when opened directly).
// PDF is allowed so tutors can attach class material (see student portal).
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'application/pdf',
]);
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB (PDFs run larger than images)

/** "Fotos Equipo (1).PNG" → "fotos-equipo-1" */
function slugifyBase(original: string): string {
  const base = original
    .replace(extname(original), '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return base || 'imagen';
}

@Controller()
export class UploadsController {
  constructor(
    private readonly config: ConfigService,
    private readonly activity: ActivityService,
  ) {}

  @Post('admin/uploads')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
          cb(null, UPLOAD_DIR);
        },
        filename: (_req, file, cb) => {
          const suffix = randomBytes(4).toString('hex');
          const ext = extname(file.originalname).toLowerCase() || '.jpg';
          cb(null, `${slugifyBase(file.originalname)}-${suffix}${ext}`);
        },
      }),
      limits: { fileSize: MAX_SIZE },
      // Rejected files simply don't arrive; the handler turns that into a 400.
      fileFilter: (_req, file, cb) => cb(null, ALLOWED_TYPES.has(file.mimetype)),
    }),
  )
  upload(@Req() req: Request, @UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        'Formato no soportado. Usa JPG, PNG, WebP, GIF, AVIF o PDF (máx. 10 MB).',
      );
    }
    const isPdf = file.mimetype === 'application/pdf';
    this.activity.log(req.user as Actor, {
      action: 'create',
      entity: 'upload',
      entityId: file.filename,
      summary: `Subió ${isPdf ? 'el archivo' : 'la imagen'} «${file.filename}»`,
    });
    // Absolute URL so <img src> works from the web origin without rewriting.
    const base =
      this.config.get<string>('API_PUBLIC_URL') ??
      `http://localhost:${this.config.get<string>('PORT') ?? '3001'}`;
    return {
      url: `${base.replace(/\/+$/, '')}/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size,
    };
  }
}
