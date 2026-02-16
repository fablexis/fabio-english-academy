# Your English Buddy

A modern, interactive English learning website built with React and TypeScript.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** + **SCSS Modules** for styling
- **ESLint** for code quality

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
├── components/     # React components (HeroBanner, CoursesSection, etc.)
├── styles/         # SCSS module stylesheets
├── assets/         # Static images
├── types/          # TypeScript declarations (images.d.ts, scss.d.ts)
├── App.tsx         # Root component
└── main.tsx        # Entry point
```

## Key Components

- **HeroBanner** - Navigation, hero section with animations and floating badges
- **WhyChooseUs** - Value proposition section
- **CoursesSection** - Course categories with modal timeline
- **TestimonialsSection** - 3D rotating testimonial cards
- **NewsletterSection** - Email subscription form
- **Footer** - Site footer
- **Icons** - Custom SVG icon components

## Styling Conventions

- Use CSS Modules (`.module.scss`) for component-specific styles
- Use Tailwind utilities for layout and spacing
- Global animations defined in `global.scss`: `anim-slide-down`, `anim-slide-up`, `anim-fade-scale`, `anim-slide-right`
- Delay utilities: `delay-0`, `delay-100`, `delay-200`, etc.

## TypeScript

- Strict mode enabled
- ES2022 target
- Custom type declarations in `src/types/` for images and SCSS modules

## Code Style

- Functional React components
- Custom SVG icons as React components (avoid external icon libraries)
- Semantic HTML elements (nav, section, footer)
