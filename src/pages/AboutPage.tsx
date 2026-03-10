import React, { useState, useEffect } from 'react';
import s from '../styles/AboutPage.module.scss';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

// ─── Typewriter hook ─────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 28, active = false) {
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!active) return;

    const id = setInterval(() => {
      setCharIndex((prev) => Math.min(prev + 1, text.length));
    }, speed);

    return () => {
      clearInterval(id);
      setCharIndex(0);
    };
  }, [active, text, speed]);

  return {
    displayedText: text.slice(0, charIndex),
    isComplete: charIndex >= text.length && active,
  };
}

// ─── Team data ────────────────────────────────────────────────────────────────

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
    bio: 'Fabio founded Your English Buddy with a vision to make English learning accessible and effective. He leads with passion and a commitment to student success.',
  },
  {
    name: 'Andreína Gómez',
    role: 'Project Manager',
    initials: 'AG',
    bio: 'Andreína keeps every project on track, coordinating schedules, resources, and goals to ensure the best experience for students and instructors alike.',
  },
  {
    name: 'Fabián Pernía',
    role: 'Web & Mobile Developer',
    initials: 'FP',
    bio: 'Fabián builds and maintains the digital platforms that power Your English Buddy, crafting seamless experiences for learners everywhere.',
  },
];

const INSPIRING_TEXT =
  '"One of my favorite activities in life is sharing what I know about English and seeing how people progress in their learning journey — because I was also there… and in fact, I\'m still there, since learning a language is a process that never ends."';

// ═════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═════════════════════════════════════════════════════════════════════════════

const AboutPage: React.FC = () => {
  const { ref: headerRef, ready: headerReady } = useInView({ threshold: 0.1 });
  const { ref: quoteRef, ready: quoteReady } = useInView({ threshold: 0.2 });
  const { ref: gridRef, ready: gridReady } = useInView({ threshold: 0.1 });

  const { displayedText, isComplete } = useTypewriter(
    INSPIRING_TEXT,
    22,
    quoteReady
  );

  return (
    <div className={s.page}>
      <Navbar />

      <main className={s.main}>
        <div className={s.inner}>

          {/* ─── Section header ─── */}
          <div
            className={s.header}
            ref={headerRef as React.RefObject<HTMLDivElement>}
          >
            <h1 className={anim(headerReady, 'anim-slide-up', 'delay-100', s.heading)}>
              Meet our{' '}
              <span className={s.headingAccent}>team</span>
            </h1>
            <p className={anim(headerReady, 'anim-slide-up', 'delay-200', s.subtitle)}>
              The people behind Your English Buddy who make it all possible.
            </p>
          </div>

          {/* ─── Inspiring quote with typewriter ─── */}
          <div
            className={s.quoteSection}
            ref={quoteRef as React.RefObject<HTMLDivElement>}
          >
            <div className={anim(quoteReady, 'anim-fade-scale', 'delay-0', s.quoteCard)}>
              <p className={s.quoteText}>
                {displayedText}
                <span
                  className={`${s.cursor} ${isComplete ? s['cursor--hidden'] : ''}`}
                  aria-hidden="true"
                />
              </p>
              <div className={s.quoteAuthor}>
                <span className={s.quoteAuthorLine} />
                <span className={s.quoteAuthorName}>Fabio Pernía</span>
                <span className={s.quoteAuthorRole}>· Founder & CEO</span>
              </div>
            </div>
          </div>

          {/* ─── Team cards ─── */}
          <h2 className={anim(gridReady, 'anim-slide-up', 'delay-0', s.teamHeading)}>
            The people behind the{' '}
            <span>mission</span>
          </h2>

          <div
            className={s.grid}
            ref={gridRef as React.RefObject<HTMLDivElement>}
          >
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className={anim(gridReady, 'anim-fade-scale', `delay-${(i + 1) * 100}`)}
              >
                <div className={s.card}>
                  {/* Radial glow behind avatar */}
                  <div className={s.card__glow} />

                  {/* Avatar */}
                  <div className={s.card__avatarWrap}>
                    <div className={s.card__avatar}>{member.initials}</div>
                  </div>

                  {/* Glass overlay */}
                  <div className={s.card__overlay}>
                    <h3 className={s.card__name}>{member.name}</h3>
                    <p className={s.card__role}>{member.role}</p>
                    <p className={s.card__bio}>{member.bio}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
