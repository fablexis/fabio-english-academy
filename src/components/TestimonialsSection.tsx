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
    stat: '95%',
    statLabel: 'Improvement in fluency',
    quote:
      '"I went from barely ordering coffee in English to giving full presentations at work. The personalized approach and patient instructors made all the difference. I improved my fluency in just three months!"',
    name: 'María García',
    role: 'Marketing Manager, Bogotá',
    initials: 'MG',
  },
  {
    id: 2,
    stat: '3X',
    statLabel: 'Faster learning progress',
    quote:
      '"The teaching methodology is outstanding. Every class felt tailored to my needs, and the offline content let me practice anytime. My IELTS score jumped from 5.5 to 7.5!"',
    name: 'Carlos Mendoza',
    role: 'Software Engineer, Lima',
    initials: 'CM',
  },
];

// ─── Rotating cards (bottom) — multiple testimonials per slot ────────────────

const rotatingSlotA: Testimonial[] = [
  {
    id: 10,
    quote:
      '"My kids love the classes! The instructors make learning fun and engaging. Their confidence speaking English has grown tremendously."',
    name: 'Ana Rodríguez',
    role: 'Parent, México City',
    initials: 'AR',
  },
  {
    id: 11,
    quote:
      '"The speaking practice sessions are incredible. I used to freeze in conversations, now I feel natural and confident communicating in English."',
    name: 'Pedro Salazar',
    role: 'Architect, Medellín',
    initials: 'PS',
  },
  {
    id: 12,
    quote:
      '"Their exam prep course was a game-changer. The structured approach and practice tests gave me the confidence to ace my TOEFL exam."',
    name: 'Valentina Torres',
    role: 'Student, Buenos Aires',
    initials: 'VT',
  },
];

const rotatingSlotB: Testimonial[] = [
  {
    id: 20,
    quote:
      '"The business English program transformed how I communicate with international clients. Professional, practical, and results-driven."',
    name: 'Luis Fernández',
    role: 'CEO, Santiago',
    initials: 'LF',
  },
  {
    id: 21,
    quote:
      '"I needed English for my new job abroad. In 4 months, I went from intermediate to advanced. The personalized plan was exactly what I needed."',
    name: 'Camila Restrepo',
    role: 'Data Analyst, São Paulo',
    initials: 'CR',
  },
  {
    id: 22,
    quote:
      '"What I love most is the flexibility. The 24/7 offline content means I can learn during my commute. My progress has been incredible."',
    name: 'Diego Morales',
    role: 'Entrepreneur, Quito',
    initials: 'DM',
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
            Student Reviews
            <span className={s.testimonials__badgeBracket}>&#x2E23;</span>
          </span>
          <h2 className={anim(ready, 'anim-slide-up', 'delay-100', s.testimonials__heading)}>
            Results that speak volumes
            <br />
            <span className={s.testimonials__headingAccent}>
              Read success stories
            </span>
          </h2>
          <p className={anim(ready, 'anim-slide-up', 'delay-200', s.testimonials__subtitle)}>
            Find out how our students are transforming their English skills.
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
            <div className={s.testimonials__stat}>
              <span className={s.testimonials__statNumber}>
                {staticCards[0].stat}
              </span>
              <span className={s.testimonials__statLabel}>
                {staticCards[0].statLabel}
              </span>
            </div>
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
            {/* Card 2 — Top right (static, with stat) */}
            <div
              className={anim(
                ready,
                'anim-fade-scale',
                'delay-400',
                s.testimonials__card,
                s['testimonials__card--topRight']
              )}
            >
              <div className={s.testimonials__statInline}>
                <span className={s.testimonials__statNumber}>
                  {staticCards[1].stat}
                </span>
                <span className={s.testimonials__statLabel}>
                  {staticCards[1].statLabel}
                </span>
              </div>
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
