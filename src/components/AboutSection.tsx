import React, { useState } from 'react';
import { RotateCw, Undo2 } from 'lucide-react';
import s from '../styles/AboutSection.module.scss';
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

// ─── Data ────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Fabio Pernía',
    role: 'Founder & CEO',
    initials: 'FP',
    bio: 'Fabio founded Your English Buddy with a vision to make English learning accessible and effective. He leads the team with passion and a commitment to student success.',
  },
  {
    name: 'Andreína Gómez',
    role: 'Project Manager',
    initials: 'AG',
    bio: 'Andreína keeps every project running smoothly, coordinating schedules, resources, and goals to ensure students and instructors have the best experience possible.',
  },
  {
    name: 'Fabián Pernía',
    role: 'Web & Mobile Developer',
    initials: 'FP',
    bio: 'Fabián builds and maintains the digital platforms that power Your English Buddy, creating seamless web and mobile experiences for learners everywhere.',
  },
];

// ─── FlipCard ────────────────────────────────────────────────────────────────

const FlipCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={s.card} onClick={() => setFlipped((f) => !f)}>
      <div className={`${s.card__inner} ${flipped ? s['card__inner--flipped'] : ''}`}>
        {/* Front */}
        <div className={s.card__front}>
          <div className={s.card__avatar}>{member.initials}</div>
          <h3 className={s.card__name}>{member.name}</h3>
          <p className={s.card__role}>{member.role}</p>
          <span className={s.card__hint}><RotateCw size={14} /> Click to learn more</span>
        </div>
        {/* Back */}
        <div className={s.card__back}>
          <p className={s.card__bio}>{member.bio}</p>
          <span className={s.card__hint}><Undo2 size={14} /> Click to go back</span>
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═════════════════════════════════════════════════════════════════════════════

const AboutSection: React.FC = () => {
  const { ref, ready } = useInView({ threshold: 0.1 });

  return (
    <section className={s.about} ref={ref as React.RefObject<HTMLElement>}>
      <div className={s.about__inner}>
        {/* Header */}
        <div className={s.about__header}>
          <span className={anim(ready, 'anim-slide-down', 'delay-0', s.about__badge)}>
            <span className={s.about__badgeBracket}>&#x2E22;</span>
            About Us
            <span className={s.about__badgeBracket}>&#x2E23;</span>
          </span>
          <h2 className={anim(ready, 'anim-slide-up', 'delay-100', s.about__heading)}>
            Meet our{' '}
            <span className={s.about__headingAccent}>team</span>
          </h2>
          <p className={anim(ready, 'anim-slide-up', 'delay-200', s.about__subtitle)}>
            The people behind Your English Buddy who make it all possible.
          </p>
        </div>

        {/* Card Grid */}
        <div className={s.about__grid}>
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className={anim(ready, 'anim-fade-scale', `delay-${(i + 3) * 100}`)}
            >
              <FlipCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
