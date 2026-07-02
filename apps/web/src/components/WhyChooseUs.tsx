import React, { useState } from 'react';
import { MonitorSmartphone, GraduationCap, BadgeDollarSign } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { defaultHome, type HomeContent } from '@eyb/shared';
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
}

// Icons stay structural (assigned by card position); copy comes from the CMS.
const CARD_ICONS = [
  <MonitorSmartphone size={36} color="#C8E47C" />,
  <GraduationCap size={36} color="#C8E47C" />,
  <BadgeDollarSign size={36} color="#C8E47C" />,
];

// ═════════════════════════════════════════════════════════════════════════════
// WHY CHOOSE US SECTION
// ═════════════════════════════════════════════════════════════════════════════

const WhyChooseUs: React.FC<{ content?: HomeContent['why'] }> = ({
  content = defaultHome.why,
}) => {
  const [activeId, setActiveId] = useState<number>(1);
  const { ref, ready } = useInView({ threshold: 0.15 });

  const features: FeatureCard[] = content.cards.map((card, i) => ({
    id: i + 1,
    icon: CARD_ICONS[i % CARD_ICONS.length],
    title: card.title,
    description: card.description,
    hoverItems: card.details.length > 0 ? card.details : undefined,
  }));

  return (
    <section className={s.why} ref={ref as React.RefObject<HTMLElement>}>
      <div className={s.why__inner}>
        {/* Header */}
        <h2 className={anim(ready, 'anim-slide-up', 'delay-0', s.why__heading)}>
          {content.headingPre}{' '}
          <span className={s.why__headingAccent}>{content.headingAccent}</span>
          {content.headingPost}
        </h2>
        <p className={anim(ready, 'anim-slide-up', 'delay-100', s.why__subtitle)}>
          {content.subtitle}
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
                onFocus={() => setActiveId(feat.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
              >
                {/* Content area */}
                <div className={s.why__cardContent}>
                  <AnimatePresence mode="wait" initial={false}>
                    {isActive ? (
                      <motion.div
                        key="chip"
                        className={s.why__cardChip}
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 14 }}
                        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      >
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
                      </motion.div>
                    ) : (
                      <motion.div
                        key="info"
                        className={s.why__cardFill}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className={s.why__cardIcon}>{feat.icon}</div>
                        <h3 className={s.why__cardTitle}>{feat.title}</h3>
                        <p className={s.why__cardDesc}>{feat.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
