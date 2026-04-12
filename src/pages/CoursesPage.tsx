import React from 'react';
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
    title: 'Clases personalizadas',
    desc: 'Cada clase está adaptada a tus objetivos, nivel y estilo de aprendizaje, sin un programa genérico.',
  },
  {
    icon: <BookOpen size={26} />,
    title: 'Material de estudio especial',
    desc: 'Recursos hechos a medida y adaptados especialmente para ti, para que estudies de forma más inteligente.',
  },
  {
    icon: <MessageCircle size={26} />,
    title: 'Acceso a la comunidad',
    desc: 'Únete a grupos exclusivos de WhatsApp donde comparto tips diarios, vocabulario y expresiones reales.',
  },
  {
    icon: <Smartphone size={26} />,
    title: 'App móvil — Próximamente',
    desc: 'Estamos desarrollando una app para iOS y Android para que puedas practicar y aprender desde cualquier lugar.',
    badge: 'Próximamente',
  },
];

// ── Levels guide ─────────────────────────────────────────────────────────────

const levels = [
  { label: 'A1 – A2', name: 'Principiante', desc: 'Sin experiencia previa. Construye tus bases desde el primer día.' },
  { label: 'B1 – B2', name: 'Intermedio', desc: 'Entiendes lo básico y quieres hablar con verdadera confianza.' },
  { label: 'C1 – C2', name: 'Avanzado', desc: 'Perfecciona tu fluidez, domina los matices y prepárate para exámenes de alto nivel.' },
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
                Encuentra el curso ideal para{' '}
                <span className={s.hero__titleAccent}>tu camino con el inglés</span>
              </h1>
              <p className={s.hero__subtitle}>
                Desde conversaciones cotidianas hasta situaciones profesionales,
                nuestros cursos están diseñados para ofrecerte una experiencia
                práctica, personalizada y enfocada en ayudarte a comunicarte con
                más claridad, seguridad y confianza.
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
            <p className={s.perks__kicker}>Cada curso incluye</p>
            <h2 id="perks-title" className={s.perks__title}>
              Todo lo que necesitas para{' '}
              <span className={s.perks__titleAccent}>lograrlo</span>
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
              Llamada diagnóstica de 15 minutos
            </span>
            <h2 id="cta-title" className={s.cta__title}>
              ¿Listo para empezar a hablar inglés<br />
              <span className={s.cta__titleAccent}>con confianza?</span>
            </h2>
            <p className={s.cta__subtitle}>
              Evaluaré tu nivel, entenderé tus objetivos y te diré exactamente
              qué curso se adapta mejor a ti.
            </p>
            <div className={s.cta__actions}>
              <a href="https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias" target="_blank" rel="noopener noreferrer" className={s.cta__btnPrimary}>
                <CalendarCheck size={17} />
                Reserva tu clase ahora
                <span className={s.cta__btnIcon}>
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </div>
            <p className={s.cta__trust}>
              Sin compromiso &nbsp;·&nbsp; Resultados en semanas
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CoursesPage;
