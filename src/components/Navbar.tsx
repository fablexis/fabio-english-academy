import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from '../styles/Navbar.module.scss';
import { BookStackLogo } from './Icons';

const anim = (
  ready: boolean,
  animClass: string,
  delayClass: string,
  ...extra: string[]
): string => {
  const base = extra.filter(Boolean).join(' ');
  return ready
    ? `${base} ${animClass} ${delayClass}`.trim()
    : `${base} anim-hidden`.trim();
};

const Navbar: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    if (!menuOpen) return;
    const handleResize = () => { if (window.innerWidth >= 900) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const navLinks = (
    <>
      <NavLink
        to="/"
        end
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `${s.navbar__link} ${isActive ? s['navbar__link--active'] : ''}`
        }
      >
        Inicio
      </NavLink>
      <NavLink
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `${s.navbar__link} ${isActive ? s['navbar__link--active'] : ''}`
        }
      >
        Nosotros
      </NavLink>
      <NavLink
        to="/blog"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `${s.navbar__link} ${isActive ? s['navbar__link--active'] : ''}`
        }
      >
        Blog
      </NavLink>
      <NavLink
        to="/courses"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `${s.navbar__link} ${isActive ? s['navbar__link--active'] : ''}`
        }
      >
        Cursos
      </NavLink>
      <a
        href="https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias"
        target="_blank"
        rel="noopener noreferrer"
        className={s.navbar__link}
        onClick={() => setMenuOpen(false)}
      >Contacto</a>
    </>
  );

  return (
    <nav className={anim(ready, 'anim-slide-down', 'delay-0', s.navbar)}>
      <NavLink to="/" className={s.navbar__logo}>
        <BookStackLogo />
        <span className={s.navbar__brand}>Your English Buddy</span>
      </NavLink>

      {/* Desktop links */}
      <div className={s.navbar__links}>
        {navLinks}
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className={`${s.navbar__hamburger} ${menuOpen ? s['navbar__hamburger--open'] : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={s.navbar__drawer}>
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
