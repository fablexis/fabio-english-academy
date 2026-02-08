import React, { useState, useEffect } from 'react';
import s from '../styles/HeroBanner.module.scss';
import {
  BookStackLogo,
  SearchIcon,
  UserIcon,
  CartIcon,
  MailIcon,
  PhoneIcon,
  PeopleAddIcon,
  SelfPacedIcon,
  OfflineContentIcon,
} from './Icons';
import characterImg from '../assets/character.png';

// ─── Helper: build class string with animation ───────────────────────────────

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

// ─── Avatar placeholder ──────────────────────────────────────────────────────

interface AvatarProps {
  color: string;
  initials: string;
}

const Avatar: React.FC<AvatarProps> = ({ color, initials }) => (
  <div className={s.hero__avatar} style={{ backgroundColor: color }}>
    {initials}
  </div>
);

// ─── Nav links config ────────────────────────────────────────────────────────

const navLinks = [
  { label: 'Home', active: true },
  { label: 'About' },
  { label: 'Blog' },
  { label: 'Courses +' },
  { label: 'Instructors' },
  { label: 'Contact' },
];


// ═════════════════════════════════════════════════════════════════════════════
// HERO BANNER COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

const HeroBanner: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* ═══════ TOP BAR ═══════ */}
      <div className={anim(ready, 'anim-slide-down', 'delay-0', s.topBar)}>
        <div className={s.topBar__left}>
          <a href="#" className={s.topBar__link}>
            <MailIcon />
            <span>info@yourenglishjourney.com</span>
          </a>
          <span className={s.topBar__divider}>|</span>
          <a href="#" className={s.topBar__link}>
            <PhoneIcon />
            <span>(800) 555‑0XX5</span>
          </a>
        </div>
        <a href="#" className={s.topBar__link}>
          <PeopleAddIcon />
          <span>Become An Instructor</span>
        </a>
      </div>

      {/* ═══════ NAVBAR ═══════ */}
      <nav className={anim(ready, 'anim-slide-down', 'delay-100', s.navbar)}>
        <div className={s.navbar__logo}>
          <BookStackLogo />
          <span className={s.navbar__brand}>Your English Journey</span>
        </div>

        <div className={s.navbar__links}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`${s.navbar__link} ${link.active ? s['navbar__link--active'] : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className={s.navbar__icons}>
          <button className={s.navbar__iconBtn}>
            <SearchIcon />
          </button>
          <button className={s.navbar__iconBtn}>
            <UserIcon />
          </button>
          <button className={s.navbar__iconBtn}>
            <CartIcon />
            <span className={s.navbar__cartCount}>0</span>
          </button>
        </div>
      </nav>

      {/* ═══════ HERO SECTION ═══════ */}
      <section className={s.hero}>
        {/* Background blobs */}
        <div className={`${s.hero__bgBlob} ${s['hero__bgBlob--topLeft']}`} />
        <div className={`${s.hero__bgBlob} ${s['hero__bgBlob--bottomRight']}`} />

        <div className={s.hero__inner}>
          {/* ─── Left Content ─── */}
          <div className={s.hero__content}>
            <h1 className={anim(ready, 'anim-slide-up', 'delay-200', s.hero__heading)}>
              Welcome to{' '}
              <span className={s.hero__headingAccent}>Your English Journey</span>
              <br />
              Empowering Your Learning Path
            </h1>

            <p className={anim(ready, 'anim-slide-up', 'delay-400', s.hero__paragraph)}>
              Your English Journey is dedicated to providing top-tier English education
              to learners worldwide. Our mission is to make high-quality learning
              accessible and engaging, with courses taught by expert instructors.
            </p>

            <div className={anim(ready, 'anim-slide-up', 'delay-600', s.hero__buttons)}>
              <button className={s.hero__btnPrimary}>Contact Now</button>
              <button className={s.hero__btnSecondary}>Start Learning</button>
            </div>
          </div>

          {/* ─── Right Visual ─── */}
          <div className={s.hero__visual}>
            {/* Decorative shapes */}
            <div className={anim(ready, 'anim-fade-scale', 'delay-200', s.hero__glowCircle)} />
            <div className={anim(ready, 'anim-fade-scale', 'delay-400', s.hero__blobWarm)} />
            <div className={anim(ready, 'anim-fade-scale', 'delay-600', s.hero__blobCool)} />
            <div className={s.hero__dotWrap + ' float-a'}>
              <div className={anim(ready, 'anim-fade-scale', 'delay-700', s.hero__dotRed1)} />
            </div>
            <div className={s.hero__dotWrap2 + ' float-b'}>
              <div className={anim(ready, 'anim-fade-scale', 'delay-800', s.hero__dotRed2)} />
            </div>
            <div className={s.hero__dotWrap3 + ' float-a'}>
              <div className={anim(ready, 'anim-fade-scale', 'delay-900', s.hero__dotNavy)} />
            </div>
            <div className={anim(ready, 'anim-fade-scale', 'delay-500', s.hero__softRing)} />

            {/* Character Image */}
            <div className={anim(ready, 'anim-slide-right', 'delay-300', s.hero__portrait)}>
              <img
                src={characterImg}
                alt="Student studying at desk"
                className={s.hero__portraitImg}
              />
            </div>

            {/* Clases personalizadas Badge — wrapper handles float, inner handles entrance */}
            <div className={`${s.hero__floatWrapTop} float-a`}>
              <div
                className={anim(
                  ready,
                  'anim-fade-scale',
                  'delay-800',
                  s.hero__badgeInstructors
                )}
              >
                <div className={s.hero__badgeIconSmall}>
                  <SelfPacedIcon size={40} />
                </div>
                <div>
                  <div className={s.hero__badgeLabel}>Personalized Classes</div>
                  <div className={s.hero__badgeSub}>At Your Own Pace</div>
                </div>
              </div>
            </div>

            {/* 24/7 Offline Content Badge — wrapper handles float, inner handles entrance */}
            <div className={`${s.hero__floatWrapBottom} float-b`}>
              <div
                className={anim(
                  ready,
                  'anim-fade-scale',
                  'delay-1000',
                  s.hero__badgeCourses
                )}
              >
                <div className={s.hero__badgeIconLarge}>
                  <OfflineContentIcon size={36} />
                </div>
                <div>
                  <div className={s.hero__badgeNumber}>24/7</div>
                  <div className={s.hero__badgeText}>Offline Content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HeroBanner;
