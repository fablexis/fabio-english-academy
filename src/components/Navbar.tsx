import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import s from '../styles/Navbar.module.scss';
import { BookStackLogo } from './Icons';

const WA_URL =
  'https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/about', label: 'Nosotros' },
  { to: '/blog', label: 'Blog' },
  { to: '/courses', label: 'Cursos' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${s.navbar__link} ${isActive ? s['navbar__link--active'] : ''}`;

  return (
    <nav className={`${s.navbar} ${scrolled ? s['navbar--scrolled'] : ''}`}>
      <NavLink to="/" className={s.navbar__logo}>
        <BookStackLogo />
        <span className={s.navbar__brand}>Your English Buddy</span>
      </NavLink>

      {/* Desktop links */}
      <div className={s.navbar__links}>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.navbar__cta} btn-shine`}
        >
          Contacto
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
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                  >
                    {item.label}
                  </NavLink>
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
                  Escríbenos por WhatsApp
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
