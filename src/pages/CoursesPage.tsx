import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  MessageCircle,
  Smartphone,
  UserRound,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import CoursesSection from '../components/CoursesSection';
import Footer from '../components/Footer';
import s from '../styles/CoursesPage.module.scss';

// ── What's included perks ────────────────────────────────────────────────────

const perks = [
  {
    icon: <UserRound size={26} />,
    title: 'Personalized Classes',
    desc: 'Every lesson is tailored to your goals, level, and learning style — no cookie-cutter curriculum.',
  },
  {
    icon: <BookOpen size={26} />,
    title: 'Special Study Material',
    desc: 'Custom-made resources adapted specifically for you, so you study smarter, not harder.',
  },
  {
    icon: <MessageCircle size={26} />,
    title: 'Community Access',
    desc: 'Join exclusive WhatsApp groups where I share daily tips, vocabulary, and real-life expressions.',
  },
  {
    icon: <Smartphone size={26} />,
    title: 'Mobile App — Coming Soon',
    desc: 'We\'re building a dedicated app for iOS & Android so you can practice and learn anywhere, anytime.',
    badge: 'Coming Soon',
  },
];

// ── Levels guide ─────────────────────────────────────────────────────────────

const levels = [
  { label: 'A1 – A2', name: 'Beginner', desc: 'No prior English needed. Build your foundation from day one.' },
  { label: 'B1 – B2', name: 'Intermediate', desc: 'You understand basics and want to speak with real confidence.' },
  { label: 'C1 – C2', name: 'Advanced', desc: 'Polish your fluency, master nuance, and prepare for top-tier exams.' },
];

// ═════════════════════════════════════════════════════════════════════════════

const CoursesPage: React.FC = () => {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className={s.hero} aria-labelledby="courses-hero-title">
          <div className={s.hero__inner}>
            <div className={s.hero__content}>
              <h1 id="courses-hero-title" className={s.hero__title}>
                Find the course that fits{' '}
                <span className={s.hero__titleAccent}>your English goal</span>
              </h1>
              <p className={s.hero__subtitle}>
                From everyday conversation to professional business English and
                exam preparation — structured courses taught by experts, designed
                to get you results fast.
              </p>
            </div>

            {/* Decorative level pills */}
            <div className={s.hero__visual} aria-hidden="true">
              {levels.map((lvl) => (
                <div key={lvl.name} className={s.hero__levelPill}>
                  <span className={s.hero__levelLabel}>{lvl.label}</span>
                  <div>
                    <p className={s.hero__levelName}>{lvl.name}</p>
                    <p className={s.hero__levelDesc}>{lvl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Courses list ─────────────────────────────────────────────────── */}
        <div id="courses-list">
          <CoursesSection />
        </div>

        {/* ── What's included ──────────────────────────────────────────────── */}
        <section className={s.perks} aria-labelledby="perks-title">
          <div className={s.perks__inner}>
            <p className={s.perks__kicker}>Every course includes</p>
            <h2 id="perks-title" className={s.perks__title}>
              Everything you need to{' '}
              <span className={s.perks__titleAccent}>succeed</span>
            </h2>
            <div className={s.perks__grid}>
              {perks.map((perk) => (
                <div key={perk.title} className={`${s.perks__card}${perk.badge ? ` ${s['perks__card--soon']}` : ''}`}>
                  <span className={s.perks__icon} aria-hidden="true">
                    {perk.icon}
                  </span>
                  <h3 className={s.perks__cardTitle}>{perk.title}</h3>
                  <p className={s.perks__cardDesc}>{perk.desc}</p>
                  {perk.badge && <span className={s.perks__badge}>{perk.badge}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ───────────────────────────────────────────────────── */}
        <section className={s.cta} aria-labelledby="cta-title">
          <div className={s.cta__orb1} aria-hidden="true" />
          <div className={s.cta__orb2} aria-hidden="true" />
          <div className={s.cta__inner}>
            <span className={s.cta__badge} aria-hidden="true">
              <CalendarCheck size={15} />
              15-minute diagnostic call
            </span>
            <h2 id="cta-title" className={s.cta__title}>
              Ready to start speaking English<br />
              <span className={s.cta__titleAccent}>with confidence?</span>
            </h2>
            <p className={s.cta__subtitle}>
              I'll assess your level, understand your goals, and tell you exactly
              which course fits you best.
            </p>
            <div className={s.cta__actions}>
              <a href="mailto:hello@yourenglishbuddy.com" className={s.cta__btnPrimary}>
                <CalendarCheck size={17} />
                Book your free call
                <span className={s.cta__btnIcon}>
                  <ArrowUpRight size={14} />
                </span>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={s.cta__btnSecondary}
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </a>
            </div>
            <p className={s.cta__trust}>
              No commitment &nbsp;·&nbsp; Results in weeks
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CoursesPage;
