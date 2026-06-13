import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react';
import s from '../styles/HeroBanner.module.scss';
import { SelfPacedIcon, OfflineContentIcon } from './Icons';
import Navbar from './Navbar';
import { splashDelay } from './splashTiming';
import characterImg from '../assets/character.png';

const WA_URL =
  'https://wa.me/5491123310113?text=Hola%2C%20quisiera%20obtener%20informacion%20para%20agendar%20una%20clase%20para%20Your%20English%20Buddy%2C%20gracias';

// ─── Motion variants ─────────────────────────────────────────────────────────

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: splashDelay + 0.15 },
  },
};

const wordRise: Variants = {
  hidden: { opacity: 0, y: 30, rotate: 3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const fadeRise = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo, delay: splashDelay + delay },
  },
});

const popIn = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.55 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: splashDelay + delay,
      type: 'spring',
      stiffness: 260,
      damping: 18,
    },
  },
});

// ═════════════════════════════════════════════════════════════════════════════
// HERO BANNER COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

const HeroBanner: React.FC = () => {
  // Mouse-driven parallax, smoothed by springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16 });
  const sy = useSpring(my, { stiffness: 55, damping: 16 });

  const portraitX = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const portraitY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const badgesX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const badgesY = useTransform(sy, [-0.5, 0.5], [11, -11]);
  const blobsX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const blobsY = useTransform(sy, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <div className="w-full">
      <Navbar />

      <section
        className={s.hero}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background blobs drift opposite the cursor */}
        <motion.div
          aria-hidden="true"
          style={{ x: blobsX, y: blobsY }}
          className={s.hero__bgLayer}
        >
          <div className={`${s.hero__bgBlob} ${s['hero__bgBlob--topLeft']}`} />
          <div className={`${s.hero__bgBlob} ${s['hero__bgBlob--bottomRight']}`} />
        </motion.div>

        <div className={s.hero__inner}>
          {/* ─── Left Content ─── */}
          <div className={s.hero__content}>
            <motion.div
              className={s.hero__chip}
              variants={popIn(0.05)}
              initial="hidden"
              animate="visible"
            >
              <span className={s.hero__chipDot} aria-hidden="true" />
              Clase diagnóstica personalizada
            </motion.div>

            <motion.h1
              className={s.hero__heading}
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.span className={s.hero__word} variants={wordRise}>
                Bienvenido
              </motion.span>{' '}
              <motion.span className={s.hero__word} variants={wordRise}>
                a
              </motion.span>{' '}
              <span className={s.hero__accentWrap}>
                {['Your', 'English', 'Buddy'].map((w) => (
                  <motion.span
                    key={w}
                    className={`${s.hero__word} ${s.hero__headingAccent}`}
                    variants={wordRise}
                  >
                    {w}
                  </motion.span>
                ))}
                <svg
                  className={s.hero__underline}
                  viewBox="0 0 220 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M4 9 C 60 1.5, 165 1.5, 216 7.5"
                    stroke="#C8E47C"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: splashDelay + 0.85,
                      duration: 0.65,
                      ease: 'easeOut',
                    }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className={s.hero__paragraph}
              variants={fadeRise(0.5)}
              initial="hidden"
              animate="visible"
            >
              En Your English Buddy ayudamos a personas hispanohablantes a mejorar su
              inglés con explicaciones simples, acompañamiento real y clases pensadas
              para la vida diaria. Nuestro propósito es que ganes confianza al hablar,
              entender, escribir y usar el inglés en situaciones reales.
            </motion.p>

            <motion.div
              className={s.hero__buttons}
              variants={fadeRise(0.65)}
              initial="hidden"
              animate="visible"
            >
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.hero__btnPrimary} btn-shine`}
              >
                Empieza mi viaje <span className="btn-arrow">→</span>
              </a>
              <Link to="/courses" className={s.hero__btnSecondary}>
                Ver cursos
              </Link>
            </motion.div>
          </div>

          {/* ─── Right Visual ─── */}
          <div className={s.hero__visual}>
            {/* Decorative shapes */}
            <motion.div
              className={s.hero__glowCircle}
              variants={popIn(0.2)}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              aria-hidden="true"
              className={s.hero__decoLayer}
              style={{ x: blobsX, y: blobsY }}
            >
              <div className={s.hero__blobWarm} />
              <div className={s.hero__blobCool} />
              <div className={`${s.hero__dotWrap} float-a`}>
                <div className={s.hero__dotRed1} />
              </div>
              <div className={`${s.hero__dotWrap2} float-b`}>
                <div className={s.hero__dotRed2} />
              </div>
              <div className={`${s.hero__dotWrap3} float-a`}>
                <div className={s.hero__dotNavy} />
              </div>
            </motion.div>
            <motion.div
              className={s.hero__softRing}
              variants={popIn(0.35)}
              initial="hidden"
              animate="visible"
            />

            {/* Character Image */}
            <motion.div
              className={s.hero__portrait}
              style={{ x: portraitX, y: portraitY }}
              initial={{ opacity: 0, x: 70, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay: splashDelay + 0.3,
                duration: 0.9,
                ease: easeOutExpo,
              }}
            >
              <img
                src={characterImg}
                alt="Estudiante aprendiendo inglés en su escritorio"
                className={s.hero__portraitImg}
              />
            </motion.div>

            {/* Floating badges follow the cursor slightly */}
            <motion.div
              className={s.hero__badgeLayer}
              style={{ x: badgesX, y: badgesY }}
            >
              <div className={`${s.hero__floatWrapTop} float-a`}>
                <motion.div
                  className={s.hero__badgeInstructors}
                  variants={popIn(0.75)}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.06, rotate: -1.5 }}
                >
                  <div className={s.hero__badgeIconSmall}>
                    <SelfPacedIcon size={40} />
                  </div>
                  <div>
                    <div className={s.hero__badgeLabel}>Clases Personalizadas</div>
                    <div className={s.hero__badgeSub}>A Tu Ritmo</div>
                  </div>
                </motion.div>
              </div>

              <div className={`${s.hero__floatWrapBottom} float-b`}>
                <motion.div
                  className={s.hero__badgeCourses}
                  variants={popIn(0.95)}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.06, rotate: 1.5 }}
                >
                  <div className={s.hero__badgeIconLarge}>
                    <OfflineContentIcon size={36} />
                  </div>
                  <div>
                    <div className={s.hero__badgeNumber}>24/7</div>
                    <div className={s.hero__badgeText}>Contenido Offline</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className={s.hero__scrollCue}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: splashDelay + 1.7, duration: 0.8 }}
        >
          <div className={s.hero__scrollCueMouse}>
            <div className={s.hero__scrollCueWheel} />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroBanner;
