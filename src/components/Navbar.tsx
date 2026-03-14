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
        Home
      </NavLink>
      <NavLink
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `${s.navbar__link} ${isActive ? s['navbar__link--active'] : ''}`
        }
      >
        About
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
        Courses
      </NavLink>
      <a href="#" className={s.navbar__link} onClick={() => setMenuOpen(false)}>Contact</a>
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
