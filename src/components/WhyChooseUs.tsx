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
  image?: boolean; // which card shows the image when expanded
}

const features: FeatureCard[] = [
  {
    id: 1,
    icon: <MonitorSmartphone size={36} color="#C8E47C" />,
    title: 'Flexible, On-Demand Learning',
    description:
      'Access courses anytime, anywhere, on any device, and learn at your own pace.',
    image: true,
  },
  {
    id: 2,
    icon: <GraduationCap size={36} color="#C8E47C" />,
    title: 'Expert Instructors',
    description:
      'Learn from industry leaders and professionals who provide real-world knowledge to enhance your skills.',
  },
  {
    id: 3,
    icon: <BadgeDollarSign size={36} color="#C8E47C" />,
    title: 'Affordable and Accessible Education',
    description:
      'Enjoy affordable, high-quality courses with no hidden fees & certificates to boost your career.',
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
          Why choose <span className={s.why__headingAccent}>Your English Journey</span>
        </h2>
        <p className={anim(ready, 'anim-slide-up', 'delay-100', s.why__subtitle)}>
          We provide expert-designed courses, flexible learning, exceptional support,
          innovative tools, and a quality learning experience.
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
                        <p className={s.why__cardChipDesc}>{feat.description}</p>
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
