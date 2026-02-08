import React, { useState } from 'react';
import s from '../styles/WhyChooseUs.module.scss';

// ─── Icon components ─────────────────────────────────────────────────────────

const FlexibleIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#C8E47C" strokeWidth="1.8">
    <rect x="4" y="6" width="18" height="14" rx="2" />
    <path d="M8 24h20a4 4 0 004-4V12" />
    <path d="M10 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InstructorsIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#C8E47C" strokeWidth="1.8">
    <circle cx="14" cy="10" r="4" />
    <path d="M6 28c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
    <circle cx="26" cy="12" r="3" opacity="0.6" />
    <path d="M22 28c0-3.3 1.8-6 4-6s4 2.7 4 6" opacity="0.6" strokeLinecap="round" />
  </svg>
);

const AffordableIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#C8E47C" strokeWidth="1.8">
    <path d="M18 4L4 12v12l14 8 14-8V12L18 4z" />
    <path d="M18 14v8M15 18h6" strokeLinecap="round" />
    <path d="M4 12l14 8 14-8" opacity="0.4" />
  </svg>
);

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
    icon: <FlexibleIcon />,
    title: 'Flexible, On-Demand Learning',
    description:
      'Access courses anytime, anywhere, on any device, and learn at your own pace.',
    image: true,
  },
  {
    id: 2,
    icon: <InstructorsIcon />,
    title: 'Expert Instructors',
    description:
      'Learn from industry leaders and professionals who provide real-world knowledge to enhance your skills.',
  },
  {
    id: 3,
    icon: <AffordableIcon />,
    title: 'Affordable and Accessible Education',
    description:
      'Enjoy affordable, high-quality courses with no hidden fees & certificates to boost your career.',
  },
];

// ─── Placeholder image for expanded state ────────────────────────────────────

const CardImage: React.FC = () => (
  <div className={s.why__cardImage}>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.3">
      <rect x="4" y="10" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="21" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 34l10-8 8 5 10-9 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// WHY CHOOSE US SECTION
// ═════════════════════════════════════════════════════════════════════════════

const WhyChooseUs: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className={s.why}>
      <div className={s.why__inner}>
        {/* Header */}
        <h2 className={s.why__heading}>
          Why choose <span className={s.why__headingAccent}>Your English Journey</span>
        </h2>
        <p className={s.why__subtitle}>
          We provide expert-designed courses, flexible learning, exceptional support,
          innovative tools, and a quality learning experience.
        </p>

        {/* Cards row */}
        <div className={s.why__cards}>
          {features.map((feat) => {
            const isActive = activeId === feat.id;
            return (
              <div
                key={feat.id}
                className={`${s.why__card} ${isActive ? s['why__card--active'] : ''}`}
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
