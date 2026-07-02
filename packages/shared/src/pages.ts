// Page-content domain types shared between the Astro frontend (@eyb/web) and
// the NestJS API (@eyb/api). Every editable public page stores one JSON
// document in the `PageContent` table, keyed by `PageKey`. Keep this file free
// of React/DOM and Node-only imports.
//
// Headings that mix plain + accent styling are split into explicit fields
// (`titlePre` / `titleAccent` / …) so the frontend keeps its styled markup
// while every word stays editable.

export const PAGE_KEYS = ['home', 'about', 'courses', 'blog', 'site'] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

// ── Site-wide chrome (navbar CTA, footer, WhatsApp) ─────────────────────────

export interface SocialLink {
  label: string; // matched (case-insensitive) to a known icon; unknown → generic
  href: string;
}

export interface SiteContent {
  /** Digits only, international format — e.g. "5491123310113". */
  whatsappNumber: string;
  /** Plain-text default greeting; URL-encoded when building wa.me links. */
  whatsappMessage: string;
  navCtaLabel: string;
  floatLabel: string; // label on the floating WhatsApp FAB
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    contactText: string;
    ctaLabel: string;
    copyrightName: string;
    socials: SocialLink[];
  };
}

// ── Home ────────────────────────────────────────────────────────────────────

export interface BilingualPhrase {
  en: string;
  es: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export interface HomeContent {
  hero: {
    chip: string;
    titlePre: string; // "Bienvenido a"
    titleAccent: string; // "Your English Buddy"
    paragraph: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge1Title: string;
    badge1Sub: string;
    badge2Number: string;
    badge2Text: string;
    /** Speech-bubble phrases the character "says" out loud. */
    phrases: BilingualPhrase[];
    /** EN ⇄ ES flashcard words. */
    words: BilingualPhrase[];
  };
  why: {
    headingPre: string; // "¿Por qué elegir"
    headingAccent: string; // "Your English Buddy"
    headingPost: string; // "?"
    subtitle: string;
    cards: { title: string; description: string; details: string[] }[];
  };
  testimonials: {
    badge: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    /** Two static cards (large left + top right). */
    featured: TestimonialItem[];
    /** Rotating bottom-left slot. */
    rotatingA: TestimonialItem[];
    /** Rotating bottom-right (dark) slot. */
    rotatingB: TestimonialItem[];
  };
  cta: {
    heading: string; // "\n" → line breaks
    subtitle: string;
    buttonLabel: string;
  };
}

// ── About ───────────────────────────────────────────────────────────────────

export interface TeamMemberContent {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  /** "\n\n" separates paragraphs in the modal. */
  fullBio: string;
  highlights: { label: string; value: string }[];
  functions: string[];
}

export interface AboutContent {
  hero: {
    title: string;
    titleItalic: string;
    subtitle: string;
    ctaLabel: string;
    image: string;
    cardQuote: string;
    cardCite: string;
  };
  mission: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    headerDesc: string;
    /** Card styling (default / accent / light) cycles by position. */
    cards: { titleTop: string; titleItalic: string; desc: string }[];
  };
  quote: {
    pre: string;
    highlight: string;
    post: string;
    cite: string;
  };
  team: {
    headingPre: string;
    headingAccent: string;
    members: TeamMemberContent[];
  };
}

// ── Courses ─────────────────────────────────────────────────────────────────

export interface CourseItem {
  category: string;
  title: string;
  description: string;
  priceLabel: string;
  priceUnit: string;
  popular: boolean;
  image: string;
  features: string[];
}

export interface CoursesContent {
  hero: {
    titlePre: string;
    titleAccent: string;
    subtitle: string;
    levels: { label: string; name: string; desc: string }[];
  };
  section: {
    headingPre: string; // "Comienza Tu"
    headingAccent: string; // "English Journey Today!"
  };
  /** First course renders as the featured card; the rest fill the grid. */
  courses: CourseItem[];
  perks: {
    kicker: string;
    titlePre: string;
    titleAccent: string;
    /** Icons cycle by position. `badge` renders the "Próximamente" pill. */
    cards: { title: string; desc: string; badge?: string }[];
  };
  cta: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    buttonLabel: string;
    trust: string;
  };
}

// ── Blog landing header ─────────────────────────────────────────────────────

export interface BlogPageContent {
  header: {
    titlePre: string;
    titleAccent: string;
    subtitle: string;
  };
}

// ── Aggregate map + DTOs ────────────────────────────────────────────────────

export interface PageContentMap {
  home: HomeContent;
  about: AboutContent;
  courses: CoursesContent;
  blog: BlogPageContent;
  site: SiteContent;
}

/** GET /pages/:key and GET /admin/pages/:key. `data` is null until first save. */
export interface PageContentDto {
  key: PageKey;
  data: unknown | null;
  updatedAt: string | null;
}

/** Row of GET /admin/pages — only keys that have saved overrides. */
export interface PageContentMetaDto {
  key: PageKey;
  updatedAt: string;
}

/** Request body for PUT /admin/pages/:key. */
export interface SavePageContentInput {
  data: Record<string, unknown>;
}

/**
 * Overlay a saved (possibly partial / outdated) document on top of the
 * canonical defaults: plain objects merge recursively, arrays and primitives
 * replace wholesale. Keeps old saves working when new fields ship.
 */
export function mergePageContent<T>(defaults: T, saved: unknown): T {
  if (!isPlainObject(defaults) || !isPlainObject(saved)) {
    return (saved === undefined || saved === null ? defaults : saved) as T;
  }
  const out: Record<string, unknown> = { ...defaults };
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined || value === null) continue;
    const base = (defaults as Record<string, unknown>)[key];
    out[key] =
      isPlainObject(base) && isPlainObject(value)
        ? mergePageContent(base, value)
        : value;
  }
  return out as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
