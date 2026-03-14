import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  imageUrl: string;
  bio: string;
  fullBio: string;
  highlights: { label: string; value: string }[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Fabio Pernía',
    role: 'Founder & CEO',
    initials: 'FP',
    imageUrl: 'https://i.pravatar.cc/640?img=12',
    bio: 'Fabio founded Your English Buddy with a vision to make English learning accessible and effective. He leads with passion and a commitment to student success.',
    fullBio:
      'Fabio is a passionate English educator and entrepreneur who turned years of teaching experience into a thriving learning community. He started Your English Buddy to break down the barriers that prevent people from reaching fluency — combining proven methodology with genuine human connection.\n\nHis teaching philosophy centers on empathy: understanding that every learner comes with unique goals, fears, and strengths. Outside the classroom, Fabio is an avid reader, language enthusiast, and firm believer that learning never stops.',
    highlights: [
      { label: 'Experience', value: '10+ years teaching' },
      { label: 'Students', value: '500+ taught' },
      { label: 'Specialty', value: 'Business & Conversational English' },
    ],
  },
  {
    name: 'Andreína Gómez',
    role: 'Project Manager',
    initials: 'AG',
    imageUrl: 'https://i.pravatar.cc/640?img=5',
    bio: 'Andreína keeps every project on track, coordinating schedules, resources, and goals to ensure the best experience for students and instructors alike.',
    fullBio:
      'Andreína is the organizational backbone of Your English Buddy. With a background in education management and a meticulous eye for detail, she ensures that every course, workshop, and student interaction runs smoothly from start to finish.\n\nShe thrives on building systems that scale — making it possible for the team to focus on what matters most: delivering exceptional learning outcomes. When she\'s not planning the next big initiative, Andreína loves traveling and discovering new cultures.',
    highlights: [
      { label: 'Background', value: 'Education Management' },
      { label: 'Focus', value: 'Operations & Student Experience' },
      { label: 'Languages', value: 'Spanish & English' },
    ],
  },
  {
    name: 'Fabián Pernía',
    role: 'Web & Mobile Developer',
    initials: 'FP',
    imageUrl: 'https://i.pravatar.cc/640?img=13',
    bio: 'Fabián builds and maintains the digital platforms that power Your English Buddy, crafting seamless experiences for learners everywhere.',
    fullBio:
      'Fabián is the engineer who transforms ideas into polished digital products. He designs and develops the web and mobile platforms that connect students with their learning goals — focusing on performance, accessibility, and intuitive design at every step.\n\nWith a deep love for clean code and great UX, Fabián constantly explores the latest technologies to keep the platform modern and reliable. When not coding, he enjoys photography, music, and finding creative solutions to everyday problems.',
    highlights: [
      { label: 'Stack', value: 'React, TypeScript, Node.js' },
      { label: 'Platforms', value: 'Web & Mobile' },
      { label: 'Focus', value: 'Performance & UX' },
    ],
  },
];

// ─── Team Member Modal ───────────────────────────────────────────────────────

interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
  isVisible: boolean;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose, isVisible }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const paragraphs = member.fullBio.split('\n\n');
  const firstName = member.name.split(' ')[0];

  return (
    <div
      ref={overlayRef}
      className={`${s.tm__overlay} ${isVisible ? s['tm__overlay--visible'] : ''}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`${s.tm__container} ${isVisible ? s['tm__container--visible'] : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button className={s.tm__close} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ── Left panel (photo) ── */}
        <div className={s.tm__left}>
          <img className={s.tm__photo} src={member.imageUrl} alt={member.name} />
        </div>

        {/* ── Right panel (person info) ── */}
        <div className={s.tm__right}>
          <p className={s.tm__rightEyebrow}>{member.role}</p>
          <h3 className={s.tm__rightHeading}>
            Meet <span>{firstName}</span>
          </h3>
          <p className={s.tm__rightName}>{member.name}</p>

          <div className={s.tm__highlights}>
            {member.highlights.map((h) => (
              <div key={h.label} className={s.tm__highlight}>
                <span className={s.tm__highlightLabel}>{h.label}</span>
                <span className={s.tm__highlightValue}>{h.value}</span>
              </div>
            ))}
          </div>

          <div className={s.tm__bio}>
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const INSPIRING_TEXT =
  '"One of my favorite activities in life is sharing what I know about English and seeing how people progress in their learning journey — because I was also there… and in fact, I\'m still there, since learning a language is a process that never ends."';

// ═════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═════════════════════════════════════════════════════════════════════════════

const AboutPage: React.FC = () => {
  const { ref: headerRef, ready: headerReady } = useInView({ threshold: 0.1 });
  const { ref: quoteRef, ready: quoteReady } = useInView({ threshold: 0.2 });
  const { ref: gridRef, ready: gridReady } = useInView({ threshold: 0.1 });

  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback((member: TeamMember) => {
    setActiveMember(member);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => setActiveMember(null), 350);
  }, []);

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
                <div
                  className={s.card}
                  onClick={() => openModal(member)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${member.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(member);
                    }
                  }}
                >
                  {/* Radial glow behind avatar */}
                  <div className={s.card__glow} />

                  {/* Avatar */}
                  <div className={s.card__avatarWrap}>
                    <img className={s.card__avatar} src={member.imageUrl} alt={member.name} />
                  </div>

                  {/* Glass overlay */}
                  <div className={s.card__overlay}>
                    <h3 className={s.card__name}>{member.name}</h3>
                    <p className={s.card__role}>{member.role}</p>
                    <p className={s.card__bio}>{member.bio}</p>
                    <div className={s.card__cta}>
                      <span>View profile</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />

      {/* ─── Team member modal ─── */}
      {activeMember && (
        <TeamMemberModal
          member={activeMember}
          onClose={closeModal}
          isVisible={modalVisible}
        />
      )}
    </div>
  );
};

export default AboutPage;
