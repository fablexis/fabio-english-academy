import React from 'react';
import { defaultSite, type SiteContent } from '@eyb/shared';
import s from '../styles/Footer.module.scss';
import { waUrl } from '../lib/whatsapp';

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

// Generic fallback for social labels without a dedicated brand icon.
const GlobeIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3z" />
  </svg>
);

// ═════════════════════════════════════════════════════════════════════════════

function socialIcon(label: string): React.ReactNode {
  const key = label.toLowerCase();
  if (key.includes('tiktok')) return <TikTokIcon />;
  if (key.includes('youtube')) return <YouTubeIcon />;
  if (key.includes('coffee')) return <BuyMeCoffeeIcon />;
  return <GlobeIcon />;
}

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Cursos', to: '/courses' },
];

const Footer: React.FC<{ site?: SiteContent }> = ({ site = defaultSite }) => (
  <footer className={s.footer}>
    <div className={s.footer__grid}>
      <div className={s.footer__brandCol}>
        <p className={s.footer__brand}>Your English Buddy</p>
        <p className={s.footer__tagline}>{site.footer.tagline}</p>
        <div className={s.footer__socials}>
          {site.footer.socials.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={s.footer__socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {socialIcon(link.label)}
            </a>
          ))}
        </div>
      </div>

      <nav className={s.footer__nav} aria-label="Navegación del pie de página">
        <p className={s.footer__colTitle}>{site.footer.navTitle}</p>
        {navLinks.map((link) => (
          <a key={link.to} href={link.to} className={s.footer__navLink}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className={s.footer__contactCol}>
        <p className={s.footer__colTitle}>{site.footer.contactTitle}</p>
        <p className={s.footer__contactText}>{site.footer.contactText}</p>
        <a
          href={waUrl(site)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.footer__cta} btn-shine`}
        >
          {site.footer.ctaLabel} <span className="btn-arrow">→</span>
        </a>
      </div>
    </div>

    <div className={s.footer__divider} />
    <p className={s.footer__copy}>
      © {new Date().getFullYear()} {site.footer.copyrightName}. All rights reserved.
    </p>
  </footer>
);

export default Footer;
