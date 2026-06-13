import React from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/Footer.module.scss';

// ─── Brand SVG icons (not available in lucide) ─────────────────────────────

const TikTokIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
  </svg>
);

const YouTubeIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19 31.68 31.68 0 000 12a31.68 31.68 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.68 31.68 0 0024 12a31.68 31.68 0 00-.5-5.81zM9.75 15.56V8.44L15.82 12 9.75 15.56z" />
  </svg>
);

const BuyMeCoffeeIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 9h14v1a7 7 0 01-7 7H10a7 7 0 01-7-7V9z" fill="currentColor" />
    <path d="M17 9h1.5a2.5 2.5 0 010 5H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6 20h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7.5 3v3M12.5 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ═════════════════════════════════════════════════════════════════════════════

const socialLinks = [
  { label: 'TikTok', icon: <TikTokIcon />, href: '#' },
  { label: 'YouTube', icon: <YouTubeIcon />, href: '#' },
  { label: 'Buy Me a Coffee', icon: <BuyMeCoffeeIcon />, href: '#' },
];

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Cursos', to: '/courses' },
];

const WA_URL =
  'https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias';

const Footer: React.FC = () => (
  <footer className={s.footer}>
    <div className={s.footer__grid}>
      <div className={s.footer__brandCol}>
        <p className={s.footer__brand}>Your English Buddy</p>
        <p className={s.footer__tagline}>
          Clases de inglés personalizadas para hispanohablantes. Habla con
          confianza en situaciones reales.
        </p>
        <div className={s.footer__socials}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={s.footer__socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <nav className={s.footer__nav} aria-label="Navegación del pie de página">
        <p className={s.footer__colTitle}>Explora</p>
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} className={s.footer__navLink}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={s.footer__contactCol}>
        <p className={s.footer__colTitle}>¿Listo para empezar?</p>
        <p className={s.footer__contactText}>
          Empieza con una clase diagnóstica personalizada. Escríbenos y
          encuentra la modalidad ideal para ti.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.footer__cta} btn-shine`}
        >
          Escríbenos por WhatsApp <span className="btn-arrow">→</span>
        </a>
      </div>
    </div>

    <div className={s.footer__divider} />
    <p className={s.footer__copy}>
      © {new Date().getFullYear()} Fabio Pernía. All rights reserved.
    </p>
  </footer>
);

export default Footer;
