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

// ─── Decorative WhatsApp SVG (right side) ────────────────────────────────────

const WhatsAppDecoration: React.FC<{ ready: boolean }> = ({ ready }) => (
  <div className={anim(ready, 'anim-fade-scale', 'delay-300', s.newsletter__decoration)}>
    {/* Glow backdrop */}
    <div className={s.newsletter__glow} />
    {/* WhatsApp icon — official path scaled inside a 300×300 canvas */}
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      className={s.newsletter__envelope}
    >
      <defs>
        <radialGradient id="waGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5CF890" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#5CF890" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Ambient glow */}
      <circle cx="150" cy="150" r="148" fill="url(#waGlow)" />
      {/*
        Speech bubble background: main circle (r=124) + tail triangle rendered
        as a group so their union composites at a single opacity level (no seam).
        Coordinates derived from the WhatsApp path scaled ×10.5 + translate(24,24):
          tail-left  A = (42, 211)  — sits exactly on the circle edge
          tail-tip   B = (25, 276)
          tail-right C = (91, 259)  — also exactly on the circle edge
      */}
      <g opacity="0.55">
        <circle cx="150" cy="150" r="124" fill="#185C60" />
        <polygon points="42,211 25,276 91,259" fill="#185C60" />
      </g>
      {/*
        Official WhatsApp SVG logo (SimpleIcons / brand kit).
        Original viewBox 0 0 24 24 → scaled ×10.4 and translated to centre at (150,150).
        translate(-125,-125) puts (0,0) at top-left of the 24×24 grid within 300×300.
      */}
      <g transform="translate(24, 24) scale(10.5)">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
          fill="rgba(92, 248, 144, 0.9)"
        />
      </g>
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
        <WhatsAppDecoration ready={ready} />
      </div>
    </section>
  );
};

export default NewsletterSection;
