import React, { useState, useEffect } from 'react';
import s from '../styles/HeroBanner.module.scss';
import {
  SelfPacedIcon,
  OfflineContentIcon,
} from './Icons';
import Navbar from './Navbar';
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
    <div className="w-full">
      {/* ═══════ NAVBAR ═══════ */}
      <Navbar />

      {/* ═══════ HERO SECTION ═══════ */}
      <section className={s.hero}>
        {/* Background blobs */}
        <div className={`${s.hero__bgBlob} ${s['hero__bgBlob--topLeft']}`} />
        <div className={`${s.hero__bgBlob} ${s['hero__bgBlob--bottomRight']}`} />

        <div className={s.hero__inner}>
          {/* ─── Left Content ─── */}
          <div className={s.hero__content}>
            <h1 className={anim(ready, 'anim-slide-up', 'delay-200', s.hero__heading)}>
              Bienvenido a{' '}
              <span className={s.hero__headingAccent}>Your English Buddy</span>
            </h1>

            <p className={anim(ready, 'anim-slide-up', 'delay-400', s.hero__paragraph)}>
              En Your English Buddy ayudamos a personas hispanohablantes a mejorar su
              inglés con explicaciones simples, acompañamiento real y clases pensadas
              para la vida diaria. Nuestro propósito es que ganes confianza al hablar,
              entender, escribir y usar el inglés en situaciones reales.
            </p>

            <div className={anim(ready, 'anim-slide-up', 'delay-600', s.hero__buttons)}>
              <a
                href="https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias"
                target="_blank"
                rel="noopener noreferrer"
                className={s.hero__btnPrimary}
              >
                Empieza mi viaje →
              </a>
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
