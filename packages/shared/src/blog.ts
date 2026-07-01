// Canonical blog domain types shared between the Astro frontend (@eyb/web)
// and the NestJS API (@eyb/api). Keep this file free of any React/DOM or
// Node-only imports so both a browser bundle and a Node process can consume it.

export type BlogVariant = 'teal' | 'lime' | 'dark' | 'plain';

// ── Callout types ──────────────────────────────────────────────────────────
export interface FormulaCallout {
  type: 'formula';
  title: string;
  formula: string;
  examples?: string[];
}
export interface CountryNoteCallout {
  type: 'countryNote';
  topic: string;
  british: string;
  american: string;
  note?: string;
}
export interface NerdyModeCallout {
  type: 'nerdyMode';
  term: string;
  definition: string;
  example?: string;
}
export interface WatchOutCallout {
  type: 'watchOut';
  wrong: string;
  correct: string;
  explanation: string;
}
export interface KeyQuestionCallout {
  type: 'keyQuestion';
  questions: { question: string; answer: string }[];
}
export interface QuickMapCallout {
  type: 'quickMap';
  columns: { header: string; items: string[] }[];
}
export type Callout =
  | FormulaCallout
  | CountryNoteCallout
  | NerdyModeCallout
  | WatchOutCallout
  | KeyQuestionCallout
  | QuickMapCallout;

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  examples?: string[];
  callouts?: Callout[];
}

export interface CommonMistake {
  wrong: string;
  correct: string;
  why: string;
}

export interface Exercise {
  instructions: string;
  questions: string[];
  answers: { answer: string; explanation?: string }[];
}

export interface ClosingQuote {
  quote: string;
  translation: string;
}

export interface BlogBody {
  hook: string;
  sections: BlogSection[];
  tip: string;
  closing: string;
  commonMistakes: CommonMistake[];
  exercise: Exercise;
  closingQuote: ClosingQuote;
}

/** A full blog post, body included — returned by GET /blog/:slug. */
export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  level: string;
  variant: BlogVariant;
  image: string;
  body: BlogBody;
  published: boolean;
  sortOrder: number;
}
