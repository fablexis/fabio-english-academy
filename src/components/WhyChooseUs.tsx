import React, { useState } from 'react';
import { MonitorSmartphone, GraduationCap, BadgeDollarSign, Image } from 'lucide-react';
import s from '../styles/WhyChooseUs.module.scss';
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

// ─── Card data ───────────────────────────────────────────────────────────────

interface FeatureCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  hoverItems?: string[];
  image?: boolean;
}

const features: FeatureCard[] = [
  {
    id: 1,
    icon: <MonitorSmartphone size={36} color="#C8E47C" />,
    title: 'Clases en línea y personalizadas.',
    description: 'Aprende en línea con clases dinámicas y personalizadas.',
    hoverItems: [
      'Clases en vivo a través de Zoom.',
      'Adaptadas a tu nivel, tus objetivos y tu ritmo de aprendizaje.',
      'Accede desde cualquier lugar, en cualquier momento y desde cualquier dispositivo.',
      'Aprende de forma práctica, cómoda y enfocada en tus necesidades reales.',
      'Tus 8 clases incluyen una sesión adicional de 40 minutos sin costo extra.',
      'Esa sesión está dedicada exclusivamente a resolver dudas de gramática y vocabulario.',
    ],
    image: true,
  },
  {
    id: 2,
    icon: <GraduationCap size={36} color="#C8E47C" />,
    title: 'Material de apoyo a tu disposición.',
    description: 'Accede a guías y recursos para seguir practicando fuera de clase.',
    hoverItems: [
      'Tendrás acceso a guías, materiales y recursos de apoyo.',
      'Todo está pensado para reforzar lo aprendido en cada sesión.',
      'Podrás repasar y practicar fuera del horario de clases.',
      'Te ayudará a ganar más seguridad y claridad con el inglés.',
      'Mantendrás un progreso más constante, organizado y estructurado.',
    ],
  },
  {
    id: 3,
    icon: <BadgeDollarSign size={36} color="#C8E47C" />,
    title: 'Forma parte de una comunidad activa.',
    description: 'Forma parte de un espacio donde seguirás en contacto con el inglés cada día.',
    hoverItems: [
      'Tendrás acceso a una comunidad de WhatsApp exclusiva para estudiantes.',
      'Comparto tips, ejercicios, explicaciones y material extra de apoyo.',
      'También recibirás información sobre fechas de clubes de conversación.',
      'Formarás parte de un grupo especialmente diseñado para practicar tu writing.',
      'Es un espacio dinámico, cercano y hasta divertido, donde incluso compartimos memes.',
      'Así, el inglés se convierte en parte de tu rutina diaria.',
    ],
  },
];

// ─── Placeholder image for expanded state ────────────────────────────────────

const CardImage: React.FC = () => (
  <div className={s.why__cardImage}>
    <Image size={48} opacity={0.3} color="currentColor" />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// WHY CHOOSE US SECTION
// ═════════════════════════════════════════════════════════════════════════════

const WhyChooseUs: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const { ref, ready } = useInView({ threshold: 0.15 });

  return (
    <section className={s.why} ref={ref as React.RefObject<HTMLElement>}>
      <div className={s.why__inner}>
        {/* Header */}
        <h2 className={anim(ready, 'anim-slide-up', 'delay-0', s.why__heading)}>
          ¿Por qué elegir <span className={s.why__headingAccent}>Your English Buddy</span>?
        </h2>
        <p className={anim(ready, 'anim-slide-up', 'delay-100', s.why__subtitle)}>
          Aprenderás a desenvolverte con frases y estructuras que muchas academias y libros
          tradicionales no suelen enseñar, convirtiendo tu inglés en un espacio seguro desde
          el cual puedas expresarte y proyectarte con confianza en todos los ámbitos de tu vida.
        </p>

        {/* Cards row */}
        <div className={s.why__cards}>
          {features.map((feat, index) => {
            const isActive = activeId === feat.id;
            const cardDelay = `delay-${200 + index * 200}`;
            return (
              <div
                key={feat.id}
                className={anim(
                  ready,
                  'anim-fade-scale',
                  cardDelay,
                  s.why__card,
                  isActive ? s['why__card--active'] : ''
                )}
                onMouseEnter={() => setActiveId(feat.id)}
                onClick={() => setActiveId(feat.id)}
              >
                {/* Image area — only visible when active and card has image flag */}
                {isActive && (
                  <div className={s.why__cardImageWrap}>
                    <CardImage />
                  </div>
                )}

                {/* Content area */}
                <div className={s.why__cardContent}>
                  {/* Floating label (lime chip) — visible when active */}
                  {isActive ? (
                    <div className={s.why__cardChip}>
                      <span className={s.why__cardChipIcon}>{feat.icon}</span>
                      <div>
                        <h3 className={s.why__cardChipTitle}>{feat.title}</h3>
                        {feat.hoverItems ? (
                          <ul className={s.why__cardChipList}>
                            {feat.hoverItems.map((item, i) => (
                              <li key={i} className={s.why__cardChipListItem}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className={s.why__cardChipDesc}>{feat.description}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={s.why__cardIcon}>{feat.icon}</div>
                      <h3 className={s.why__cardTitle}>{feat.title}</h3>
                      <p className={s.why__cardDesc}>{feat.description}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
