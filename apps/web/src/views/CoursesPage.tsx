import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  MessageCircle,
  Smartphone,
  UserRound,
} from 'lucide-react';
import {
  defaultCourses,
  defaultSite,
  type CoursesContent,
  type SiteContent,
} from '@eyb/shared';
import Navbar from '../components/Navbar';
import CoursesSection from '../components/CoursesSection';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { waUrl } from '../lib/whatsapp';
import s from '../styles/CoursesPage.module.scss';

// Structural perk icons, assigned by card position; copy comes from the CMS.
const PERK_ICONS = [
  <UserRound size={26} />,
  <BookOpen size={26} />,
  <MessageCircle size={26} />,
  <Smartphone size={26} />,
];

// ═════════════════════════════════════════════════════════════════════════════

interface CoursesPageProps {
  content?: CoursesContent;
  site?: SiteContent;
}

const CoursesPage: React.FC<CoursesPageProps> = ({
  content = defaultCourses,
  site = defaultSite,
}) => {
  return (
    <>
      <Navbar site={site} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className={s.hero} aria-labelledby="courses-hero-title">
          <div className={s.hero__inner}>
            <div className={s.hero__content}>
              <Reveal>
                <h1 id="courses-hero-title" className={s.hero__title}>
                  {content.hero.titlePre}{' '}
                  <span className={s.hero__titleAccent}>{content.hero.titleAccent}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className={s.hero__subtitle}>{content.hero.subtitle}</p>
              </Reveal>
            </div>

            {/* Decorative level pills */}
            <div className={s.hero__visual} aria-hidden="true">
              {content.hero.levels.map((lvl, i) => (
                <Reveal
                  key={lvl.name}
                  delay={0.15 + i * 0.12}
                  y={36}
                  className={s.hero__levelPill}
                >
                  <span className={s.hero__levelLabel}>{lvl.label}</span>
                  <div>
                    <p className={s.hero__levelName}>{lvl.name}</p>
                    <p className={s.hero__levelDesc}>{lvl.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Courses list ─────────────────────────────────────────────────── */}
        <div id="courses-list">
          <CoursesSection
            section={content.section}
            courses={content.courses}
            site={site}
          />
        </div>

        {/* ── What's included ──────────────────────────────────────────────── */}
        <section className={s.perks} aria-labelledby="perks-title">
          <div className={s.perks__inner}>
            <Reveal>
              <p className={s.perks__kicker}>{content.perks.kicker}</p>
              <h2 id="perks-title" className={s.perks__title}>
                {content.perks.titlePre}{' '}
                <span className={s.perks__titleAccent}>{content.perks.titleAccent}</span>
              </h2>
            </Reveal>
            <div className={s.perks__grid}>
              {content.perks.cards.map((perk, i) => (
                <Reveal
                  key={perk.title || i}
                  delay={i * 0.1}
                  y={34}
                  className={`${s.perks__card}${perk.badge ? ` ${s['perks__card--soon']}` : ''}`}
                >
                  <span className={s.perks__icon} aria-hidden="true">
                    {PERK_ICONS[i % PERK_ICONS.length]}
                  </span>
                  <h3 className={s.perks__cardTitle}>{perk.title}</h3>
                  <p className={s.perks__cardDesc}>{perk.desc}</p>
                  {perk.badge && <span className={s.perks__badge}>{perk.badge}</span>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ───────────────────────────────────────────────────── */}
        <section className={s.cta} aria-labelledby="cta-title">
          <div className={s.cta__orb1} aria-hidden="true" />
          <div className={s.cta__orb2} aria-hidden="true" />
          <div className={s.cta__inner}>
            <Reveal>
              <span className={s.cta__badge} aria-hidden="true">
                <CalendarCheck size={15} />
                {content.cta.badge}
              </span>
              <h2 id="cta-title" className={s.cta__title}>
                {content.cta.title}<br />
                <span className={s.cta__titleAccent}>{content.cta.titleAccent}</span>
              </h2>
              <p className={s.cta__subtitle}>{content.cta.subtitle}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={s.cta__actions}>
                <a href={waUrl(site)} target="_blank" rel="noopener noreferrer" className={`${s.cta__btnPrimary} btn-shine`}>
                  <CalendarCheck size={17} />
                  {content.cta.buttonLabel}
                  <span className={s.cta__btnIcon}>
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              </div>
              <p className={s.cta__trust}>{content.cta.trust}</p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer site={site} />
    </>
  );
};

export default CoursesPage;
