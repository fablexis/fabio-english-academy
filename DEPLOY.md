# Deployment

Monorepo with two independently deployed apps:

| App | What | Host |
|-----|------|------|
| `apps/web` | Astro frontend (SSG marketing + SSR blog + `/admin` SPA) | **Vercel** |
| `apps/api` | NestJS + Prisma content API | **Node host** (Railway / Render / Fly) |

`packages/shared` is built as part of both.

---

## Frontend → Vercel

1. **New Project** → import this repo.
2. **Root Directory:** `apps/web`.
3. **Build Command:** `npm run build` (the repo-root build compiles `@eyb/shared` first, then Astro). Vercel runs it from the repo root because workspaces are detected.
4. **Install Command:** `npm install` (root).
5. **Node version:** 22 (see `apps/web/.nvmrc`; Vercel serverless functions don't support Node 24).
6. **Environment variables:**
   - `PUBLIC_API_URL` = `https://<your-api-host>` (the deployed API base URL).
7. The `@astrojs/vercel` adapter emits static assets for `/`, `/about`, `/courses` and a serverless function for the SSR routes (`/blog`, `/blog/[slug]`, `/admin/*`).

> The old SPA `vercel.json` rewrite has been removed — Astro handles routing.

## Backend → Node host (Railway / Render / Fly)

Build from the repo root so the workspace + `@eyb/shared` resolve.

- **Install:** `npm install`
- **Build:** `npm run build:api` (builds `@eyb/shared`, generates Prisma client, `nest build`)
- **Start:** `node apps/api/dist/main.js` (or `npm run start -w @eyb/api`)
- **Pre-deploy / release:** `npm run -w @eyb/api prisma:deploy` (applies migrations), then optionally `npm run seed` once.
- **Environment variables** (see `apps/api/.env.example`):
  - `DATABASE_URL` (Postgres connection string), `PORT`, `WEB_ORIGIN` (comma-separated:
    Vercel prod + preview domains), `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`,
    `JWT_ACCESS_EXPIRES`, `JWT_REFRESH_EXPIRES`, `COOKIE_DOMAIN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
- A `apps/api/Dockerfile` is provided (build context = repo root) for container hosts; its
  `CMD` runs `prisma migrate deploy` then boots the server.

### Database (PostgreSQL)

Postgres is used in **every environment** (no more ephemeral SQLite).

- **Production:** provision a managed Postgres (Neon, Supabase, Railway, RDS…), set
  `DATABASE_URL`, and the release step runs `prisma migrate deploy`. Seed once with `npm run seed`.
- **Local dev:** `docker compose up -d` starts a Postgres matching the default
  `DATABASE_URL`, then `npm run -w @eyb/api prisma:migrate` + `npm run seed`.
- `body` is a JSON-serialized `TEXT` column; promote to `Json`/`jsonb` later if you want
  in-DB JSON querying (the service already serializes at the boundary, so it's a drop-in).

### Cross-site cookies (prod)

The admin uses httpOnly cookies. In production the API sets `SameSite=None; Secure`, so:
- The API **must** be served over HTTPS.
- `WEB_ORIGIN` must list the exact frontend origin(s) — CORS runs with `credentials: true`.
- If frontend and API share an apex domain, set `COOKIE_DOMAIN=.yourdomain.com`.
