import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { UPLOAD_DIR } from './uploads/uploads.constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: false,
  });
  const config = app.get(ConfigService);

  // cross-origin CORP so the web origin can embed /uploads images via <img>.
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cookieParser());

  // Admin-uploaded images (see UploadsModule). Filenames carry a random
  // suffix, so long-lived immutable caching is safe.
  app.useStaticAssets(UPLOAD_DIR, {
    prefix: '/uploads/',
    maxAge: '30d',
    immutable: true,
  });

  // WEB_ORIGIN may be a comma-separated list (prod + preview domains). In
  // development we also allow any localhost/127.0.0.1 port, so the Astro dev
  // server landing on a shifted port (4322, 4323, …) doesn't break auth.
  const allowList = (config.get<string>('WEB_ORIGIN') ?? 'http://localhost:4321')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const isProd = config.get<string>('NODE_ENV') === 'production';
  const localhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // non-browser clients (curl, SSR)
      if (allowList.includes(origin)) return cb(null, true);
      if (!isProd && localhost.test(origin)) return cb(null, true);
      return cb(null, false); // disallowed → no CORS header, browser blocks
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }),
  );

  const port = config.get<number>('PORT', 3001);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}

void bootstrap();
