import React, { useState, useEffect, useCallback } from 'react';
import { Quote } from 'lucide-react';
import s from '../styles/TestimonialsSection.module.scss';
import { useInView } from '../hooks/useInView';

// ─── Animation helper ────────────────────────────────────────────────────────

const anim = (
  inView: boolean,
  animClass: string,
  delayClass: string,
  ...extra: string[]
): string => {
  const base = extra.filter(Boolean).join(' ');
  return inView
    ? `${base} ${animClass} ${delayClass}`.trim()
    : `${base} anim-hidden`.trim();
};

// ─── Quote icon ──────────────────────────────────────────────────────────────

const QuoteIcon: React.FC<{ color?: string }> = ({ color = '#185C60' }) => (
  <Quote size={28} color={color} opacity={0.7} fill={color} />
);

// ─── Avatar placeholder ──────────────────────────────────────────────────────

const AvatarPlaceholder: React.FC<{ initials: string; dark?: boolean }> = ({
  initials,
  dark,
}) => (
  <div className={`${s.avatar} ${dark ? s['avatar--dark'] : ''}`}>
    {initials}
  </div>
);

// ─── Data types ──────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  stat?: string;
  statLabel?: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

// ─── Static cards (top) ──────────────────────────────────────────────────────

const staticCards: Testimonial[] = [
  {
    id: 1,
    quote:
      '"Antes me daba vergüenza hablar inglés, incluso con algunos profesores, porque sentía que me estaban juzgando. En Your English Buddy aprendí desde el primer día una frase que me cambió por completo la mentalidad: speak first and fix later. Gracias a eso, empecé a soltarme, gané confianza al hablar y comencé a ver el inglés más cercano y divertido. Hoy siento que me enamoré de un idioma que antes odiaba."',
    name: 'Yodarvis Medina',
    role: 'Indianapolis, Estados Unidos',
    initials: 'YM',
  },
  {
    id: 2,
    quote:
      '"Your English Buddy me ha ayudado a organizar mejor mi aprendizaje. Hoy entiendo y uso expresiones como circle back, jump on a call y revisit, que realmente se utilizan en el entorno laboral. Gracias a eso, me siento mucho más segura en mi trabajo remoto, he dejado atrás el pánico y ahora tengo más confianza en mis reuniones y al redactar correos."',
    name: 'Francis Jiménez',
    role: 'Florida, Estados Unidos',
    initials: 'FJ',
  },
];

// ─── Rotating cards (bottom) — multiple testimonials per slot ────────────────

const rotatingSlotA: Testimonial[] = [
  {
    id: 10,
    quote:
      '"En Your English Buddy encontré clases dinámicas y cero aburridas. Hoy puedo usar con amigos nativos frases como feeling like some beers?, are you up for that?, fancy a coffee? o let\'s grab a bite, lo que me ha permitido ampliar mi círculo social y sentirme más integrada a la cultura americana."',
    name: 'Antonieta Gómez',
    role: 'Virginia, Estados Unidos',
    initials: 'AG',
  },
];

const rotatingSlotB: Testimonial[] = [
  {
    id: 20,
    quote:
      '"Your English Buddy me ha ayudado a organizar mejor mi aprendizaje. Hoy entiendo y uso expresiones como circle back, jump on a call y revisit, que realmente se utilizan en el entorno laboral. Gracias a eso, me siento mucho más segura en mi trabajo remoto, he dejado atrás el pánico y ahora tengo más confianza en mis reuniones y al redactar correos."',
    name: 'Coromoto Godoy',
    role: 'Texas, Estados Unidos',
    initials: 'CG',
  },
];

// ─── Rotating Card Component ─────────────────────────────────────────────────

const RotatingCard: React.FC<{
  items: Testimonial[];
  dark?: boolean;
  intervalMs?: number;
}> = ({ items, dark = false, intervalMs = 4000 }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);

  const nextTestimonial = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setDisplayIdx((prev) => (prev + 1) % items.length);
      setIsFlipping(false);
    }, 400); // halfway through animation — swap content
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, intervalMs);
    return () => clearInterval(timer);
  }, [nextTestimonial, intervalMs]);

  const current = items[displayIdx];
  const quoteColor = dark ? '#C8E47C' : '#C8E47C';

  return (
    <div className={`${s.testimonials__card} ${dark ? s['testimonials__card--dark'] : ''}`}>
      <div
        className={`${s.testimonials__flipInner} ${
          isFlipping ? s['testimonials__flipInner--flipping'] : ''
        }`}
      >
        <QuoteIcon color={quoteColor} />
        <p className={s.testimonials__quote}>{current.quote}</p>
        <div className={s.testimonials__author}>
          <AvatarPlaceholder initials={current.initials} dark={dark} />
          <div>
            <div className={s.testimonials__authorName}>{current.name}</div>
            <div className={s.testimonials__authorRole}>{current.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═════════════════════════════════════════════════════════════════════════════

const TestimonialsSection: React.FC = () => {
  const { ref, ready } = useInView({ threshold: 0.1 });

  return (
    <section className={s.testimonials} ref={ref as React.RefObject<HTMLElement>}>
      <div className={s.testimonials__inner}>
        {/* ─── Header ─── */}
        <div className={s.testimonials__header}>
          <span className={anim(ready, 'anim-slide-down', 'delay-0', s.testimonials__badge)}>
            <span className={s.testimonials__badgeBracket}>&#x2E22;</span>
            Reseñas de estudiantes
            <span className={s.testimonials__badgeBracket}>&#x2E23;</span>
          </span>
          <h2 className={anim(ready, 'anim-slide-up', 'delay-100', s.testimonials__heading)}>
            Resultados que hablan por sí solos
            <br />
            <span className={s.testimonials__headingAccent}>
              Historias de éxito reales
            </span>
          </h2>
          <p className={anim(ready, 'anim-slide-up', 'delay-200', s.testimonials__subtitle)}>
            Descubre cómo Your English Buddy ha acompañado a personas como tú a llevar su inglés a otro nivel.
          </p>
        </div>

        {/* ─── Bento Grid ─── */}
        <div className={s.testimonials__grid}>
          {/* Card 1 — Large left (static) */}
          <div
            className={anim(
              ready,
              'anim-fade-scale',
              'delay-300',
              s.testimonials__card,
              s['testimonials__card--large']
            )}
          >
            <QuoteIcon />
            <p className={s.testimonials__quote}>{staticCards[0].quote}</p>
            <div className={s.testimonials__author}>
              <AvatarPlaceholder initials={staticCards[0].initials} />
              <div>
                <div className={s.testimonials__authorName}>
                  {staticCards[0].name}
                </div>
                <div className={s.testimonials__authorRole}>
                  {staticCards[0].role}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className={s.testimonials__rightCol}>
            {/* Card 2 — Top right (static) */}
            <div
              className={anim(
                ready,
                'anim-fade-scale',
                'delay-400',
                s.testimonials__card,
                s['testimonials__card--topRight']
              )}
            >
              <QuoteIcon />
              <p className={s.testimonials__quote}>{staticCards[1].quote}</p>
              <div className={s.testimonials__author}>
                <AvatarPlaceholder initials={staticCards[1].initials} />
                <div>
                  <div className={s.testimonials__authorName}>
                    {staticCards[1].name}
                  </div>
                  <div className={s.testimonials__authorRole}>
                    {staticCards[1].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: 2 rotating cards */}
            <div className={anim(ready, 'anim-fade-scale', 'delay-500', s.testimonials__bottomRow)}>
              <RotatingCard items={rotatingSlotA} intervalMs={4000} />
              <RotatingCard items={rotatingSlotB} dark intervalMs={5000} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
