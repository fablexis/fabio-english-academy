import React, { useState, useEffect, useCallback } from 'react';
import { Quote } from 'lucide-react';
import { defaultHome, type HomeContent, type TestimonialItem } from '@eyb/shared';
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

// ─── Data helpers ────────────────────────────────────────────────────────────

/** "Yodarvis Medina" → "YM" (avatar placeholder initials). */
function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// ─── Rotating Card Component ─────────────────────────────────────────────────

const RotatingCard: React.FC<{
  items: TestimonialItem[];
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
          <AvatarPlaceholder initials={initialsOf(current.name)} dark={dark} />
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

const TestimonialsSection: React.FC<{ content?: HomeContent['testimonials'] }> = ({
  content = defaultHome.testimonials,
}) => {
  const { ref, ready } = useInView({ threshold: 0.1 });
  const staticCards = content.featured;

  return (
    <section className={s.testimonials} ref={ref as React.RefObject<HTMLElement>}>
      <div className={s.testimonials__inner}>
        {/* ─── Header ─── */}
        <div className={s.testimonials__header}>
          <span className={anim(ready, 'anim-slide-down', 'delay-0', s.testimonials__badge)}>
            <span className={s.testimonials__badgeBracket}>&#x2E22;</span>
            {content.badge}
            <span className={s.testimonials__badgeBracket}>&#x2E23;</span>
          </span>
          <h2 className={anim(ready, 'anim-slide-up', 'delay-100', s.testimonials__heading)}>
            {content.heading}
            <br />
            <span className={s.testimonials__headingAccent}>
              {content.headingAccent}
            </span>
          </h2>
          <p className={anim(ready, 'anim-slide-up', 'delay-200', s.testimonials__subtitle)}>
            {content.subtitle}
          </p>
        </div>

        {/* ─── Bento Grid ─── */}
        <div className={s.testimonials__grid}>
          {/* Card 1 — Large left (static) */}
          {staticCards[0] && (
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
                <AvatarPlaceholder initials={initialsOf(staticCards[0].name)} />
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
          )}

          {/* Right column */}
          <div className={s.testimonials__rightCol}>
            {/* Card 2 — Top right (static) */}
            {staticCards[1] && (
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
                  <AvatarPlaceholder initials={initialsOf(staticCards[1].name)} />
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
            )}

            {/* Bottom row: 2 rotating cards */}
            <div className={anim(ready, 'anim-fade-scale', 'delay-500', s.testimonials__bottomRow)}>
              {content.rotatingA.length > 0 && (
                <RotatingCard items={content.rotatingA} intervalMs={4000} />
              )}
              {content.rotatingB.length > 0 && (
                <RotatingCard items={content.rotatingB} dark intervalMs={5000} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
