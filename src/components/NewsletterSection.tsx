import React from 'react';
import s from '../styles/NewsletterSection.module.scss';
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

// ─── Decorative envelope SVG (right side) ────────────────────────────────────

const EnvelopeDecoration: React.FC<{ ready: boolean }> = ({ ready }) => (
  <div className={anim(ready, 'anim-fade-scale', 'delay-300', s.newsletter__decoration)}>
    {/* Glow backdrop */}
    <div className={s.newsletter__glow} />
    {/* Envelope shape */}
    <svg
      width="340"
      height="280"
      viewBox="0 0 340 280"
      fill="none"
      className={s.newsletter__envelope}
    >
      {/* Envelope body */}
      <rect
        x="30"
        y="60"
        width="280"
        height="190"
        rx="12"
        fill="rgba(24, 92, 96, 0.6)"
        stroke="rgba(200, 228, 124, 0.25)"
        strokeWidth="1.5"
      />
      {/* Flap */}
      <path
        d="M30 72L170 170L310 72"
        stroke="rgba(200, 228, 124, 0.35)"
        strokeWidth="1.5"
        fill="rgba(24, 92, 96, 0.8)"
      />
      {/* Inner glow from flap opening */}
      <path
        d="M80 60L170 130L260 60"
        fill="url(#flapGlow)"
        opacity="0.9"
      />
      {/* Light rays from opening */}
      <path d="M170 130L140 10" stroke="url(#ray1)" strokeWidth="2" opacity="0.4" />
      <path d="M170 130L200 5" stroke="url(#ray2)" strokeWidth="2" opacity="0.3" />
      <path d="M170 130L120 25" stroke="url(#ray3)" strokeWidth="1.5" opacity="0.25" />
      <path d="M170 130L220 20" stroke="url(#ray4)" strokeWidth="1.5" opacity="0.2" />
      <defs>
        <linearGradient id="flapGlow" x1="170" y1="130" x2="170" y2="40">
          <stop offset="0%" stopColor="#C8E47C" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#5CF890" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ray1" x1="170" y1="130" x2="140" y2="10">
          <stop offset="0%" stopColor="#C8E47C" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C8E47C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ray2" x1="170" y1="130" x2="200" y2="5">
          <stop offset="0%" stopColor="#5CF890" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5CF890" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ray3" x1="170" y1="130" x2="120" y2="25">
          <stop offset="0%" stopColor="#C8E47C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C8E47C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ray4" x1="170" y1="130" x2="220" y2="20">
          <stop offset="0%" stopColor="#5CF890" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5CF890" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// NEWSLETTER SECTION
// ═════════════════════════════════════════════════════════════════════════════

const NewsletterSection: React.FC = () => {
  const { ref, ready } = useInView({ threshold: 0.15 });

  return (
    <section className={s.newsletter} ref={ref as React.RefObject<HTMLElement>}>
      <div className={s.newsletter__inner}>
        {/* Left content */}
        <div className={s.newsletter__content}>
          <h2 className={anim(ready, 'anim-slide-up', 'delay-0', s.newsletter__heading)}>
            Conversemos y encuentra
            <br />
            la modalidad ideal
            <br />
            para ti.
          </h2>

          <p className={anim(ready, 'anim-slide-up', 'delay-100', s.newsletter__subtitle)}>
            Si quieres mejorar tu inglés de forma práctica, clara y personalizada,
            estamos aquí para ayudarte. Escríbenos directamente por WhatsApp y te
            orientamos según tu nivel, tus objetivos y la modalidad que mejor se
            adapte a ti.
          </p>

          <div className={anim(ready, 'anim-slide-up', 'delay-200', s.newsletter__form)}>
            <a
              href="https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias"
              target="_blank"
              rel="noopener noreferrer"
              className={s.newsletter__btn}
            >
              Escríbenos por WhatsApp →
            </a>
          </div>
        </div>

        {/* Right decoration */}
        <EnvelopeDecoration ready={ready} />
      </div>
    </section>
  );
};

export default NewsletterSection;
