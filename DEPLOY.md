# Deployment

Monorepo with two independently deployed apps:

| App | What | Host |
|-----|------|------|
| `apps/web` | Astro frontend (SSG marketing + SSR blog + `/admin` SPA) | **Railway** (Docker, `apps/web/Dockerfile`) |
| `apps/api` | NestJS + Prisma content API | **Railway** (Docker, `apps/api/Dockerfile`) |

`packages/shared` is built as part of both.

---

## Frontend → Railway (Docker)

Uses the `@astrojs/node` adapter in standalone mode: one Node process serves the
prerendered assets and the SSR routes (`/blog`, `/blog/[slug]`, `/admin/*`).

1. Service from this repo, **Dockerfile path** `apps/web/Dockerfile` (build context = repo root so the workspace + `@eyb/shared` resolve).
2. **Environment variables:**
   - `PUBLIC_API_URL` = `https://<your-api-host>` (the deployed API base URL). It is
     inlined into the bundles at **build** time (the Dockerfile declares it as `ARG`),
     so changing it requires a rebuild, not just a restart.
3. The container listens on `PORT` (default 4321), `HOST=0.0.0.0`.

> The site also deploys fine to any other Docker host; only the old `@astrojs/vercel`
> setup is gone.

## Backend → Railway / any Node host

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
