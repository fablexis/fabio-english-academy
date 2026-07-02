# Your English Buddy

A modern, interactive English learning website. **npm-workspaces monorepo**: an
**Astro** frontend (React islands) and a **NestJS + Prisma** content API. All public
pages are CMS-driven through the API: the blog via `BlogPost` rows, and the
marketing pages (home/about/courses/blog header) + site chrome via per-page
`PageContent` JSON documents edited in the admin panel and merged over canonical
defaults from `@eyb/shared`.

## Monorepo layout

```
english-website/                 # npm workspaces root
├── apps/
│   ├── web/                     # @eyb/web — Astro frontend (Railway, Docker)
│   └── api/                     # @eyb/api — NestJS + Prisma content API (Railway, Docker)
├── packages/
│   └── shared/                  # @eyb/shared — blog + page-content types, DTOs, page defaults
├── tsconfig.base.json           # shared TS options (web/shared)
└── DEPLOY.md                    # deployment guide (Vercel + Node host)
```

## Tech Stack

- **apps/web** — **Astro 5** (`output: 'static'` + `@astrojs/node` adapter, standalone → hybrid
  SSG/SSR), **@astrojs/react** islands, **React 19**, **Tailwind v4** (via `@tailwindcss/vite`,
  NOT `@astrojs/tailwind`) + **SCSS Modules**, **Motion** (`motion/react`), **Lucide React**.
  Astro **View Transitions** (`<ClientRouter/>`) replace React Router. Admin SPA uses
  `react-router-dom` + `@tanstack/react-query` (client-only).
- **apps/api** — **NestJS 11**, **Prisma 6** (**PostgreSQL** everywhere; local via
  `docker compose up -d`), JWT auth (access+refresh, httpOnly cookies), `class-validator`, helmet.
- **packages/shared** — plain TS types/DTOs (no React/DOM), consumed by both. Also
  `pages.ts` (`PageContentMap` types, `PAGE_KEYS`, `mergePageContent`) and
  `page-defaults.ts` (canonical default copy for every public page — frontend
  fallback, merge base, and admin editor starting draft).

## Commands (run from repo root)

```bash
# First-time / DB setup (needs Docker):
docker compose up -d                   # local Postgres (see docker-compose.yml)
npm run -w @eyb/api prisma:migrate     # apply migrations
npm run seed                           # seed 12 blog posts

npm run dev          # api (:3001) + web (:4321) in parallel
npm run dev:web      # Astro dev only
npm run dev:api      # NestJS watch only
npm run build        # build @eyb/shared then @eyb/web (Astro)
npm run build:api    # build @eyb/shared then @eyb/api (nest)
npm run seed:generate# regenerate blog-seed.json from prisma/seed-data/blogPosts.ts
npm run lint         # ESLint (root flat config)

# apps/api one-offs:
npm run -w @eyb/api prisma:deploy      # prisma migrate deploy (prod)
```

Web env: `apps/web/.env.local` → `PUBLIC_API_URL` (default `http://localhost:3001`).
API env: `apps/api/.env` (see `.env.example`).

## Frontend structure (`apps/web/src`)

```
components/   # React island components (Navbar, HeroBanner, sections, Footer, ...)
views/        # Larger page-level React components (AboutPage, CoursesPage, BlogDetailPage)
pages/        # Astro routes (.astro) — see Routing
layouts/      # BaseLayout.astro (global.scss, fonts, <ClientRouter/>, persistent chrome)
admin/        # Client-only React admin SPA (login + blog CRUD + page editors)
lib/          # api.ts (blog reads) · pages.ts (page content + merge/fallback) · whatsapp.ts (waUrl)
hooks/        # useInView.ts
styles/       # SCSS modules + global.scss (design tokens, animation utilities)
public/       # img/ (decorative images), blog-images/ (blog jpgs), favicon.svg
```

Images used inside React islands are served from `public/` as URL strings
(`/img/...`, `/blog-images/...`) — Astro turns `src/` image imports into
`ImageMetadata` objects, which would break `<img src>` in islands.

## Routing (Astro file-based)

| Path | File | Render | Notes |
|------|------|--------|-------|
| `/` | `pages/index.astro` | **SSR** | `getPageContent('home'/'site')` → section islands |
| `/about` | `pages/about.astro` | **SSR** | `views/AboutPage` island, fed `about` + `site` content |
| `/courses` | `pages/courses.astro` | **SSR** | `views/CoursesPage` island, fed `courses` + `site` content |
| `/blog` | `pages/blog/index.astro` | **SSR** (`prerender=false`) | fetches `GET /blog` + `blog`/`site` content |
| `/blog/[slug]` | `pages/blog/[slug].astro` | **SSR** | `getPost(slug)`; redirects to `/blog` on 404 |
| `/admin/*` | `pages/admin/[...slug].astro` | **SSR shell** | mounts admin SPA `client:only="react"` |

All public pages are SSR so CMS edits publish without a rebuild. `lib/pages.ts`
`getPageContent(key)` fetches `GET /pages/:key`, deep-merges saved data over
`PAGE_DEFAULTS[key]`, and returns plain defaults when the API is down (the site
never breaks). Components take optional `content`/`site` props defaulting to the
shared defaults; structural bits (icons, layout, nav routes) stay in code.

Islands: `SplashLoader`/`WhatsAppFloat` live in `BaseLayout` with `transition:persist`;
below-the-fold sections use `client:visible`; `HeroBanner`/`Navbar` use `client:load`;
`Footer` has no interactivity → static HTML (no directive).

## Backend / API (`apps/api`)

NestJS + Prisma. `BlogModule`: public `GET /blog` (published), `GET /blog/:slug`;
JWT-guarded admin CRUD `GET/POST/PATCH/DELETE /admin/blog[/:id]`. `PagesModule`:
public `GET /pages/:key` (`data: null` until first save); guarded `GET /admin/pages`
(saved overrides + updatedAt), `PUT /admin/pages/:key` (upsert `{ data }`),
`DELETE /admin/pages/:key` (reset to defaults). Page keys are whitelisted
(`home|about|courses|blog|site`, kept in sync with `PAGE_KEYS` in shared — the API
avoids value imports from the ESM-only shared package). `AuthModule`:
`POST /auth/login|refresh|logout`, `GET /auth/me`, plus `POST /auth/forgot-password`
(always 200; emails a 60-min single-use reset link) and `POST /auth/set-password`
(redeems INVITE/RESET tokens; revokes all sessions). Cookie-based JWT; the first
admin is seeded from `ADMIN_EMAIL`/`ADMIN_PASSWORD` on boot. `UsersModule`:
guarded `GET/POST/DELETE /admin/users[/:id]` + `POST /admin/users/:id/invite`
(resend) — invited accounts get a random placeholder hash and a 48h invite link;
can't delete yourself or the last admin. `MailModule`: nodemailer via `SMTP_*`
env; without `SMTP_HOST` emails are logged (with the action link) instead of
sent. Branded HTML templates live in `src/mail/templates.ts`; links point at
`ADMIN_URL` (default: first `WEB_ORIGIN` + `/admin`). Tokens are sha256-hashed
in the `UserToken` table (single-use + expiring). `UploadsModule`: guarded
`POST /admin/uploads` (multipart image → disk at `UPLOAD_DIR`, default
`apps/api/uploads/`, gitignored) served statically at `/uploads/*` with
immutable caching + cross-origin CORP; returns an absolute URL built from
`API_PUBLIC_URL` (set it in prod). `body`/`data` are stored JSON-stringified
and hydrated at the boundary. `ActivityModule` (global): `ActivityService.log()`
records every admin action (fire-and-forget) from each controller into the
`ActivityLog` table (denormalized `userEmail`, Spanish `summary`); guarded
`GET /admin/activity?entity=&action=&before=&take=` paginates newest-first.
Logins stamp `User.lastLoginAt`/`prevLoginAt`; `/auth/me` and login responses
expose `lastLoginAt` (the previous session) for the dashboard greeting.
Prisma models: `BlogPost`, `PageContent`, `User`, `RefreshToken`, `UserToken`,
`ActivityLog`.

## Admin panel (`apps/web/src/admin`)

Client-only React SPA at `/admin` (react-router `basename="/admin"` + TanStack Query).
Vuexy-style dashboard shell (brand teal, **Public Sans** loaded in `pages/admin/[...slug].astro`):
fixed white sidebar (mobile drawer <1100px), detached top bar with breadcrumbs +
avatar dropdown (Ver sitio / logout). Routes: **Panel** (`/`, content overview),
**Páginas** (page-content CMS) and **Blog** (post CRUD with search + thumbnails).
Pages CMS: `pages/PagesList` (card per public page with edited/original status) →
`pages/PageEditor` — schema-driven forms defined in `pageSchemas.ts` and rendered
generically by `components/ContentFields.tsx` (text/textarea/image/toggle/stringList
+ collapsible `repeater` cards with add/move/remove, recursion for nested lists).
Image fields use `components/ImageField.tsx`: live preview + click or drag & drop
upload through `POST /admin/uploads`, with a manual path input for existing
`/img` + `/blog-images` assets (also used for the blog post image).
**Usuarios** (`pages/Users.tsx`): invite admins by email (+optional name), inline
row-edit of name/email (`PATCH /admin/users/:id`), invite status with sent date,
resend pending/expired invites, delete (never self). **Mi cuenta**
(`pages/Profile.tsx`, via the avatar dropdown): own name + profile picture
(`PATCH /auth/me`; picture uploads reuse `/admin/uploads`; `User.avatarUrl`).
`components/Avatar.tsx` renders picture-or-initials everywhere. **Actividad** (`pages/Activity.tsx`): audit table
with entity/action filters + cursor "Cargar más" (useInfiniteQuery); friendly
timestamps via `lib/dates.ts` (`formatRelative`, `greeting` — also used by the
dashboard greeting + last-login line and its "Actividad reciente" card).
Public routes: `/forgot` (request reset) and `/set-password?token=…` (landing
page for both invite and reset emails).
Editor draft = `mergePageContent(PAGE_DEFAULTS[key], saved)`; dirty state drives a
sticky save bar; extras: JSON escape hatch, "Restaurar original", "Ver página".
Talks to the guarded `/admin/*` + `/auth` endpoints with `credentials: 'include'`.

## Key Components

**Pages** (`apps/web/src/views/` + `pages/*.astro`):
- **HomePage** - Composes homepage sections
- **AboutPage** - Mission, pillars, team members with modal bios
- **BlogPage** - Blog listing wrapper
- **BlogDetailPage** - Full article view with sidebar
- **CoursesPage** - Course catalog with perks and CTA

**Sections** (`src/components/`):
- **Navbar** - Site navigation with mobile hamburger menu and active link states
- **HeroBanner** - Hero section with character image, floating badges, animated entrance
- **WhyChooseUs** - Interactive cards with hover/click expansion
- **CoursesSection** - Course cards with modal timeline curriculum
- **TestimonialsSection** - Bento grid with rotating flip-animation cards
- **BlogSection** - Category-filtered blog post grid
- **NewsletterSection** - WhatsApp CTA with decorative SVG envelope
- **Footer** - Three-column footer: brand + tagline, site nav, WhatsApp CTA, social links
- **Icons** - Custom SVG icon components (BookStackLogo, SelfPacedIcon, etc.)

**Motion infrastructure** (`src/components/`):
- **SplashLoader** - Branded first-load splash (once per session via sessionStorage, skipped under reduced motion). `splashTiming.ts` exports `splashDelay` so the hero choreography starts as the splash lifts.
- **PageTransition** - Route-level enter/exit wrapper used with `AnimatePresence` in `App.tsx`
- **ScrollToTop** - Resets scroll on route change
- **WhatsAppFloat** - Floating WhatsApp FAB with pulse ring, appears after 420px of scroll
- **Reveal** - Generic `whileInView` entrance wrapper (used on CoursesPage)
- **BlurImage** - Shared progressive blur-up image component

The app is wrapped in `MotionConfig reducedMotion="user"`; `global.scss` also has a `prefers-reduced-motion` kill switch, `:focus-visible` styles, and `.btn-shine` / `.btn-arrow` button utilities.

## Custom Hooks

- **useInView** (`src/hooks/useInView.ts`) - IntersectionObserver wrapper returning `ref` and `ready` state. Options: `threshold`, `rootMargin`, `once`, `delay`. Used throughout for scroll-triggered entrance animations.

## Data

- **Blog** — served by the API from the `BlogPost` Prisma table. Types live in
  `packages/shared` (`BlogPost`, `BlogListItemDto`, `BlogPostDto`, `Callout`, `BlogBody`).
  Body shape: `hook`, `sections[]`, `tip`, `closing`, `commonMistakes[]`, `exercise`,
  `closingQuote`. Variants: `teal`, `lime`, `dark`, `plain`.
- **Seed** — `apps/api/prisma/blog-seed.json`, generated from the canonical authored
  content at `apps/api/prisma/seed-data/blogPosts.ts` via `npm run seed:generate`
  (an esbuild transform that rewrites the 12 image imports to `/blog-images/<file>`).
- **Pages** — marketing content (home/about/courses/blog header, testimonials, team,
  site chrome) lives in the `PageContent` Prisma table as one JSON document per
  `PageKey`, edited in the admin "Páginas" section. No seeding needed: a page with
  no saved row renders the defaults from `@eyb/shared/page-defaults.ts`, and saved
  documents are deep-merged over those defaults (old saves keep working when new
  fields ship).

> Note: component paths below predate the monorepo — they now live under
> `apps/web/src/components`, `apps/web/src/views`, `apps/web/src/hooks`, etc.

## Styling Conventions

- Use CSS Modules (`.module.scss`) for component-specific styles
- Use Tailwind utilities for layout and spacing
- Global styles and design tokens in `global.scss`
- **Design tokens**: Teal primary (#185C60), Lime accent (#C8E47C), Green CTA (#5CF890)
- **Fonts**: Poppins (headings), Plus Jakarta Sans (body) — imported via Google Fonts
- **Entrance animations**: `anim-slide-down`, `anim-slide-up`, `anim-slide-right`, `anim-slide-left`, `anim-fade-scale`, `anim-arc-reveal`, `anim-fade-in`
- **Continuous animations**: `float-a`, `float-b`, `pulse`, `spin-slow`
- **Delay utilities**: `delay-0` through `delay-1600`
- Animation helper pattern: `anim(inView, animClass, delayClass, ...extra)` toggles between animation classes and `anim-hidden`

## Common UI Patterns

- **Modals** - Used in AboutPage (team bios) and CoursesSection (curriculum). Support ESC close, scroll lock, animated transitions.
- **BlurImage** - Progressive image loading component with blur(16px) → blur(0px) transition on load.
- **Category filters** - Blog section uses `useMemo`-optimized category filtering.

## TypeScript

- Strict mode enabled
- ES2022 target
- Custom type declarations in `src/types/` for images and SCSS modules
- Key interfaces: `BlogPost`, `Course`, `TeamMember`

## Code Style

- Functional React components with TypeScript
- `useState` for UI state, `useCallback` for memoized handlers, `useEffect` for side effects
- Custom SVG icons as React components (avoid external icon libraries where possible)
- Semantic HTML elements with accessibility attributes (aria-labels, aria-pressed, aria-modal, keyboard navigation)
