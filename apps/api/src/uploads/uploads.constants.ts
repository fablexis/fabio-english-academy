import { join } from 'node:path';

/**
 * Where uploaded admin images live on disk. Served statically at /uploads/*
 * (see main.ts). Defaults to <api cwd>/uploads; override with UPLOAD_DIR in
 * production so files land on a persistent volume.
 */
export const UPLOAD_DIR = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
