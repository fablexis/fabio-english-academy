# Your English Buddy

A modern, interactive English-learning website. It's an **npm-workspaces monorepo**:
an **Astro** frontend (with React islands) and a **NestJS + Prisma** content API. The
blog is CMS-driven through the API; the rest of the site is static marketing content.

- **Frontend** — Astro 5, React 19 islands, Tailwind v4 + SCSS Modules, Motion, deployed to Vercel.
- **Backend** — NestJS 11 + Prisma 6 (PostgreSQL), JWT admin auth, deployed to any Node host.
- **Shared** — a types-only package consumed by both.

> Deep-dive docs: [CLAUDE.md](CLAUDE.md) (architecture reference) · [DEPLOY.md](DEPLOY.md) (production).

---

## Architecture

```
english-website/                 # npm workspaces root
├── apps/
│   ├── web/     @eyb/web         # Astro frontend (Vercel)
│   └── api/     @eyb/api         # NestJS + Prisma content API (Node host)
└── packages/
    └── shared/  @eyb/shared      # BlogPost types + DTOs (no React/DOM)
```

**Rendering model** — Astro hybrid (`output: 'static'` + Vercel adapter):

| Route | File | Render | Data |
|-------|------|--------|------|
| `/` | `apps/web/src/pages/index.astro` | **SSG** (static) | hardcoded |
| `/about` | `pages/about.astro` | **SSG** | hardcoded |
| `/courses` | `pages/courses.astro` | **SSG** | hardcoded |
| `/blog` | `pages/blog/index.astro` | **SSR** | `GET /blog` |
| `/blog/[slug]` | `pages/blog/[slug].astro` | **SSR** | `GET /blog/:slug` |
| `/admin/*` | `pages/admin/[...slug].astro` | client-only SPA | `/admin/blog` + `/auth` |

Interactive components are **React islands**: `HeroBanner`/`Navbar` hydrate on load,
below-the-fold sections on scroll (`client:visible`), `SplashLoader`/`WhatsAppFloat`
persist across navigations. React Router is replaced by Astro file routing + View Transitions.

**Data flow** — the Astro blog pages fetch the NestJS API server-side and pass the results
into islands as props. Content types live once in `@eyb/shared` so the frontend and API
never drift.

---

## Prerequisites

- **Node 22** (see `.nvmrc`; Vercel functions don't support Node 24).
- **PostgreSQL** — via Docker or a native install (see below).
- **npm** (workspaces; ships with Node).

---

## Getting started

```bash
# 1. Install all workspace dependencies (from the repo root)
npm install

# 2. Configure env
cp apps/api/.env.example apps/api/.env      # then edit secrets/admin creds
# apps/web/.env.local already sets PUBLIC_API_URL=http://localhost:3001

# 3. Start Postgres (pick ONE — see "Database" below)
docker compose up -d                        # option A: Docker
# option B: native Postgres — see below

# 4. Apply migrations + seed the 12 blog posts
npm run -w @eyb/api prisma:migrate
npm run seed

# 5. Run the API (:3001) + web (:4321) together
npm run dev
```

Open **http://localhost:4321**. The admin panel is at **http://localhost:4321/admin**
(log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `apps/api/.env`).

### Database

The API uses PostgreSQL in every environment. `DATABASE_URL` defaults to
`postgresql://eyb:eyb@localhost:5432/eyb?schema=public`.

**Option A — Docker** (matches `docker-compose.yml`):
```bash
docker compose up -d
```

**Option B — native Postgres** (Homebrew, no Docker):
```bash
brew install postgresql@16 && brew services start postgresql@16
createuser -s eyb 2>/dev/null; psql -d postgres -c "ALTER USER eyb WITH PASSWORD 'eyb';"
createdb -O eyb eyb
```

Either way, then run `prisma:migrate` + `seed` (steps 4 above).

---

## Commands (run from the repo root)

```bash
npm run dev            # API (:3001) + Astro (:4321) in parallel
npm run dev:web        # Astro dev server only
npm run dev:api        # NestJS watch mode only
npm run build          # build @eyb/shared then @eyb/web (Astro → Vercel output)
npm run build:api      # build @eyb/shared then @eyb/api (nest build)
npm run seed           # seed the blog DB from apps/api/prisma/blog-seed.json
npm run seed:generate  # regenerate blog-seed.json from prisma/seed-data/blogPosts.ts
npm run lint           # ESLint (root flat config)
npm run typecheck      # tsc -b (shared)

# apps/api one-offs
npm run -w @eyb/api prisma:migrate   # prisma migrate dev
npm run -w @eyb/api prisma:deploy    # prisma migrate deploy (production)
```

---

## API endpoints (NestJS, default `:3001`)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/blog` | public | published posts (list cards) |
| GET | `/blog/:slug` | public | one published post (full body) |
| GET | `/admin/blog` | JWT | all posts incl. drafts |
| GET | `/admin/blog/:id` | JWT | one post by id |
| POST | `/admin/blog` | JWT | create |
| PATCH | `/admin/blog/:id` | JWT | update |
| DELETE | `/admin/blog/:id` | JWT | delete |
| POST | `/auth/login` \| `/auth/refresh` \| `/auth/logout` | cookie | session |
| GET | `/auth/me` | JWT | current admin |

Auth is JWT (access + refresh) in **httpOnly cookies**. A single admin is seeded on boot
from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

---

## Environment variables

**`apps/web/.env.local`**
- `PUBLIC_API_URL` — base URL of the API (default `http://localhost:3001`).

**`apps/api/.env`** (copy from `.env.example`)
- `DATABASE_URL`, `PORT` (3001), `WEB_ORIGIN` (CORS; comma-separated),
  `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES`, `JWT_REFRESH_EXPIRES`,
  `COOKIE_DOMAIN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

`.env` files are git-ignored. Use strong secrets in production (see [DEPLOY.md](DEPLOY.md)).

---

## Admin panel

A client-only React SPA at `/admin` (react-router + TanStack Query). Log in, then manage
blog posts: list, create, edit, delete. The editor is **structured** — sections with
paragraphs/examples/callouts (all 6 callout types), common mistakes, an exercise, and a
closing quote — with a raw-JSON toggle as an escape hatch. It talks to the guarded
`/admin/blog` + `/auth` endpoints with cookie auth.

---

## Deployment

Frontend → Vercel (root dir `apps/web`), API → any Node host with managed Postgres.
Full guide in **[DEPLOY.md](DEPLOY.md)**.
