# Your English Buddy

A modern, interactive English learning website built with React and TypeScript. Deployed on Vercel.

## Tech Stack

- **React 19** with TypeScript
- **React Router v7** for client-side routing
- **Vite 7** for build tooling
- **Tailwind CSS v4** (via `@tailwindcss/vite`) + **SCSS Modules** for styling
- **Lucide React** for supplementary icons
- **ESLint 9** (flat config) for code quality

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production (tsc + vite build)
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── assets/         # Static images (character.png, phrase-image.jpg, tech-human.jpg)
├── components/     # Reusable UI components (Navbar, Footer, Icons, sections)
├── data/           # Static data (blogPosts.ts)
├── hooks/          # Custom hooks (useInView.ts)
├── pages/          # Route-level page components
├── styles/         # SCSS module stylesheets + global.scss
├── types/          # TypeScript declarations (images.d.ts, scss.d.ts)
├── App.tsx         # Root component with route definitions
└── main.tsx        # Entry point (wraps App in BrowserRouter)
```

## Routing

Five routes defined in `App.tsx`:

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | HeroBanner, WhyChooseUs, TestimonialsSection, NewsletterSection, Footer |
| `/about` | AboutPage | Team profiles, mission, pillars, team member modals |
| `/blog` | BlogPage | Blog listing with category filters |
| `/blog/:slug` | BlogDetailPage | Individual article with sidebar and related posts |
| `/courses` | CoursesPage | Course grid, level guide, perks, diagnostic CTA |

Vercel SPA rewrite configured in `vercel.json` to support client-side routing.

## Key Components

**Pages** (`src/pages/`):
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
- **Footer** - Social links (TikTok, YouTube, Buy Me Coffee), copyright
- **Icons** - Custom SVG icon components (BookStackLogo, SelfPacedIcon, etc.)

## Custom Hooks

- **useInView** (`src/hooks/useInView.ts`) - IntersectionObserver wrapper returning `ref` and `ready` state. Options: `threshold`, `rootMargin`, `once`, `delay`. Used throughout for scroll-triggered entrance animations.

## Data

- **blogPosts** (`src/data/blogPosts.ts`) - Blog post definitions with `BlogPost` interface. Fields: id, slug, category, title, excerpt, readTime, level, variant, hasBanner, body (intro, sections, tip, closing). Variants: `teal`, `lime`, `dark`, `plain`.

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
