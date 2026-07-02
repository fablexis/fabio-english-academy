import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  defaultAbout,
  defaultSite,
  type AboutContent,
  type SiteContent,
  type TeamMemberContent,
} from '@eyb/shared';
import s from '../styles/AboutPage.module.scss';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlurImage from '../components/BlurImage';
import { waUrl } from '../lib/whatsapp';
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

type TeamMember = TeamMemberContent;

// ─── Pillar icons ─────────────────────────────────────────────────────────────
// Structural SVGs assigned by card position; the copy comes from the CMS.

const PILLAR_ICONS = [
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <circle cx="13" cy="13" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 13.5C9 13.5 10.5 16 13 16s4-2.5 4-2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="10" cy="10.5" r="1" fill="currentColor" />
    <circle cx="16" cy="10.5" r="1" fill="currentColor" />
  </svg>,
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <path d="M13 3L4 7v6.5C4 19 8.5 22.5 13 24c4.5-1.5 9-5 9-10.5V7L13 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 13l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <circle cx="8.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="17.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3 21c0-3 2.5-5 5-5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M16 16h2c2.5 0 5 2 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M13 14v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="13" cy="12" r="2" stroke="currentColor" strokeWidth="1.7" />
  </svg>,
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
        <button className={s.tm__close} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className={s.tm__left}>
          <BlurImage className={s.tm__photo} src={member.imageUrl} alt={member.name} />
        </div>

        <div className={s.tm__right}>
          <p className={s.tm__rightEyebrow}>{member.role}</p>
          <h3 className={s.tm__rightHeading}>
            Conoce a <span>{firstName}</span>
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

          {member.functions.length > 0 && (
            <div className={s.tm__functionsWrap}>
              <p className={s.tm__functionsTitle}>Rol dentro de la academia</p>
              <ul className={s.tm__functions}>
                {member.functions.map((fn, i) => (
                  <li key={i} className={s.tm__functionItem}>{fn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═════════════════════════════════════════════════════════════════════════════

interface AboutPageProps {
  content?: AboutContent;
  site?: SiteContent;
}

const AboutPage: React.FC<AboutPageProps> = ({
  content = defaultAbout,
  site = defaultSite,
}) => {
  const { ref: heroRef, ready: heroReady } = useInView({ threshold: 0.1 });
  const { ref: missionRef, ready: missionReady } = useInView({ threshold: 0.1 });
  const { ref: pillarsRef, ready: pillarsReady } = useInView({ threshold: 0.1 });
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

  return (
    <div className={s.page}>
      <Navbar site={site} />

      <main className={s.main}>

        {/* ─── Hero Section ─── */}
        <section
          className={s.heroSection}
          ref={heroRef as React.RefObject<HTMLElement>}
        >
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <h1 className={anim(heroReady, 'anim-slide-right', 'delay-0', s.heroTitle)}>
                {content.hero.title}{' '}
                <span className={s.heroTitleItalic}>{content.hero.titleItalic}</span>
              </h1>
              <p className={anim(heroReady, 'anim-slide-up', 'delay-100', s.heroSubtitle)}>
                {content.hero.subtitle}
              </p>
              <div className={anim(heroReady, 'anim-slide-up', 'delay-200', s.heroCtas)}>
                <a
                  href={waUrl(site)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.heroCta} btn-shine`}
                >
                  {content.hero.ctaLabel}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={anim(heroReady, 'anim-fade-scale', 'delay-100', s.heroRight)}>
              <div className={s.heroImgWrap}>
                <BlurImage
                  className={s.heroImg}
                  src={content.hero.image}
                  alt="Ambiente de aprendizaje de inglés"
                />
              </div>
              <div className={s.heroFloatCard}>
                <p className={s.heroFloatCardQuote}>{content.hero.cardQuote}</p>
                <p className={s.heroFloatCardCite}>{content.hero.cardCite}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Mission Section ─── */}
        <section
          className={s.missionSection}
          ref={missionRef as React.RefObject<HTMLElement>}
        >
          <div className={s.missionInner}>
            <div className={s.missionGrid}>
              <div className={anim(missionReady, 'anim-fade-scale', 'delay-0', s.missionImgCol)}>
                <div className={s.missionImgBg} />
                <BlurImage
                  className={s.missionImg}
                  src={content.mission.image}
                  alt="Conexión humana en el aprendizaje"
                />
              </div>

              <div className={s.missionTextCol}>
                <span className={anim(missionReady, 'anim-slide-up', 'delay-100', s.missionEyebrow)}>
                  {content.mission.eyebrow}
                </span>
                <h2 className={anim(missionReady, 'anim-slide-up', 'delay-200', s.missionTitle)}>
                  {content.mission.title}
                </h2>
                <div className={anim(missionReady, 'anim-slide-up', 'delay-300', s.missionTextBlock)}>
                  {content.mission.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pillars Section ─── */}
        <section
          className={s.pillarsSection}
          ref={pillarsRef as React.RefObject<HTMLElement>}
        >
          <div className={s.pillarsInner}>
            {/* Header — split two-column */}
            <div className={anim(pillarsReady, 'anim-slide-up', 'delay-0', s.pillarsHeader)}>
              <div className={s.pillarsHeaderLeft}>
                <span className={s.pillarsEyebrow}>{content.pillars.eyebrow}</span>
                <h2 className={s.pillarsTitle}>
                  {content.pillars.title}{' '}
                  <br />
                  <span className={s.pillarsTitleItalic}>{content.pillars.titleItalic}</span>
                </h2>
              </div>
              <div className={s.pillarsHeaderRight}>
                <div className={s.pillarsHeaderDivider} />
                <p className={s.pillarsHeaderDesc}>{content.pillars.headerDesc}</p>
              </div>
            </div>

            {/* Cards — asymmetric 4/5/3 bento; per-slot styling cycles by position */}
            <div className={s.pillarsGrid}>
              {content.pillars.cards.map((card, i) => {
                const slot = i % 3;
                const cardClass =
                  slot === 1
                    ? `${s.pillarCard} ${s.pillarCard__accent}`
                    : slot === 2
                      ? `${s.pillarCard} ${s.pillarCard__light}`
                      : s.pillarCard;
                const iconClass = [s.pillarIconOrg1, s.pillarIconOrg2, s.pillarIconOrg3][slot];
                return (
                  <div
                    key={i}
                    className={anim(pillarsReady, 'anim-fade-scale', `delay-${(i + 1) * 100}`, cardClass)}
                  >
                    <span
                      className={slot === 1 ? `${s.pillarBgNumber} ${s.pillarBgNumber__accent}` : s.pillarBgNumber}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={iconClass}>{PILLAR_ICONS[slot]}</div>
                    <h3 className={slot === 1 ? `${s.pillarCardTitle} ${s.pillarCardTitle__accent}` : s.pillarCardTitle}>
                      {card.titleTop}{' '}
                      <span className={s.pillarCardTitleItalic}>{card.titleItalic}</span>
                    </h3>
                    <p className={slot === 1 ? `${s.pillarDesc} ${s.pillarDesc__accent}` : s.pillarDesc}>
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Quote Section ─── */}
        <section
          className={s.quoteSection}
          ref={quoteRef as React.RefObject<HTMLElement>}
        >
          <div className={anim(quoteReady, 'anim-fade-scale', 'delay-0', s.quoteWrapper)}>
            <span className={s.quoteIcon} aria-hidden="true">"</span>
            <blockquote className={s.quoteBlockquote}>
              {content.quote.pre}{' '}
              <span className={s.quoteHighlight}>{content.quote.highlight}</span>{' '}
              {content.quote.post}
            </blockquote>
            <cite className={s.quoteCite}>{content.quote.cite}</cite>
          </div>
        </section>

        {/* ─── Team section ─── */}
        <div className={s.teamSection}>
          <div className={s.inner}>
            <h2 className={anim(gridReady, 'anim-slide-up', 'delay-0', s.teamHeading)}>
              {content.team.headingPre}{' '}
              <span>{content.team.headingAccent}</span>
            </h2>

            <div
              className={s.grid}
              ref={gridRef as React.RefObject<HTMLDivElement>}
            >
              {content.team.members.map((member, i) => (
                <div
                  key={member.name}
                  className={anim(gridReady, 'anim-fade-scale', `delay-${(i + 1) * 100}`)}
                >
                  <div
                    className={s.card}
                    onClick={() => openModal(member)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Conocer más sobre ${member.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(member);
                      }
                    }}
                  >
                    <div className={s.card__glow} />
                    <div className={s.card__avatarWrap}>
                      <BlurImage className={s.card__avatar} src={member.imageUrl} alt={member.name} />
                    </div>
                    <div className={s.card__overlay}>
                      <h3 className={s.card__name}>{member.name}</h3>
                      <p className={s.card__role}>{member.role}</p>
                      <p className={s.card__bio}>{member.bio}</p>
                      <div className={s.card__cta}>
                        <span>Ver perfil</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer site={site} />

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
