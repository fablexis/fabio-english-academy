import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { defaultSite, type SiteContent } from '@eyb/shared';
import s from '../styles/Navbar.module.scss';
import { waUrl } from '../lib/whatsapp';
import { BookStackLogo } from './Icons';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/about', label: 'Nosotros' },
  { to: '/blog', label: 'Blog' },
  { to: '/courses', label: 'Cursos' },
];

const Navbar: React.FC<{ site?: SiteContent }> = ({ site = defaultSite }) => {
  const WA_URL = waUrl(site);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState('/');

  // Active-link state comes from the URL. This island always hydrates, and it
  // re-mounts on each Astro View Transition navigation, so reading on mount is
  // enough; astro:after-swap covers persisted-island cases.
  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    sync();
    document.addEventListener('astro:after-swap', sync);
    return () => document.removeEventListener('astro:after-swap', sync);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when resizing up to desktop
  useEffect(() => {
    if (!menuOpen) return;
    const handleResize = () => { if (window.innerWidth >= 900) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const isActive = (to: string, end?: boolean) =>
    end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
  const linkClass = (to: string, end?: boolean) =>
    `${s.navbar__link} ${isActive(to, end) ? s['navbar__link--active'] : ''}`;

  return (
    <nav className={`${s.navbar} ${scrolled ? s['navbar--scrolled'] : ''}`}>
      <a href="/" className={s.navbar__logo}>
        <BookStackLogo />
        <span className={s.navbar__brand}>Your English Buddy</span>
      </a>

      {/* Desktop links */}
      <div className={s.navbar__links}>
        {NAV_ITEMS.map((item) => (
          <a key={item.to} href={item.to} className={linkClass(item.to, item.end)}>
            {item.label}
          </a>
        ))}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.navbar__cta} btn-shine`}
        >
          {site.navCtaLabel}
        </a>
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className={`${s.navbar__hamburger} ${menuOpen ? s['navbar__hamburger--open'] : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Abrir menú de navegación"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={s.navbar__drawer}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={s.navbar__drawerInner}>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={linkClass(item.to, item.end)}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + NAV_ITEMS.length * 0.05, duration: 0.3 }}
              >
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.navbar__drawerCta}
                  onClick={() => setMenuOpen(false)}
                >
                  {site.footer.ctaLabel}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
