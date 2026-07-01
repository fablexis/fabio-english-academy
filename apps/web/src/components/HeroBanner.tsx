import React, { useCallback, useEffect, useState } from 'react';
import {
  AnimatePresence,
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
// Served from public/ as a plain URL string (Astro turns src/ image imports
// into ImageMetadata objects, which would break <img src>).
const characterImg = '/img/character.png';

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

// ─── Speech bubble: the character practices real English out loud ───────────

const PHRASES = [
  { en: "Hello! How's it going?", es: '¡Hola! ¿Cómo va todo?' },
  { en: "I'm learning English!", es: '¡Estoy aprendiendo inglés!' },
  { en: 'Could I get a coffee, please?', es: 'Un café, por favor.' },
  { en: 'I got the job!', es: '¡Conseguí el trabajo!' },
  { en: 'Practice makes perfect.', es: 'La práctica hace al maestro.' },
];

const TYPING_MS = 950;
const PHRASE_MS = 4300;

const SpeechBubble: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const typingTimer = setTimeout(() => setTyping(false), TYPING_MS);
    const cycleTimer = setTimeout(() => {
      setTyping(true);
      setIdx((i) => (i + 1) % PHRASES.length);
    }, PHRASE_MS);
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(cycleTimer);
    };
  }, [idx]);

  return (
    <div className={s.hero__bubble} aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        {typing ? (
          <motion.div
            key="dots"
            className={s.hero__bubbleDots}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <span />
            <span />
            <span />
          </motion.div>
        ) : (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: easeOutExpo }}
          >
            <p className={s.hero__bubbleEn}>{PHRASES[idx].en}</p>
            <p className={s.hero__bubbleEs}>{PHRASES[idx].es}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Flashcard: EN word flips to its ES translation ─────────────────────────

const WORDS = [
  { en: 'confidence', es: 'confianza' },
  { en: 'achieve', es: 'lograr' },
  { en: 'fluently', es: 'con fluidez' },
  { en: 'improve', es: 'mejorar' },
];

const FlashCard: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const flipTimer = setTimeout(() => setFlipped(true), 2300);
    const nextTimer = setTimeout(() => {
      setFlipped(false);
      setIdx((i) => (i + 1) % WORDS.length);
    }, 4600);
    return () => {
      clearTimeout(flipTimer);
      clearTimeout(nextTimer);
    };
  }, [idx]);

  return (
    <div className={s.hero__flashScene} aria-hidden="true">
      <motion.div
        className={s.hero__flashCard}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
      >
        <div className={s.hero__flashFace}>
          <span className={s.hero__flashTag}>EN</span>
          {WORDS[idx].en}
        </div>
        <div className={`${s.hero__flashFace} ${s['hero__flashFace--back']}`}>
          <span className={`${s.hero__flashTag} ${s['hero__flashTag--es']}`}>ES</span>
          {WORDS[idx].es}
        </div>
      </motion.div>
    </div>
  );
};

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
              Primera clase diagnóstica gratis
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
              <a href="/courses" className={s.hero__btnSecondary}>
                Ver cursos
              </a>
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

              {/* The character practices English out loud */}
              <div className={`${s.hero__floatWrapBubble} float-b`}>
                <motion.div
                  variants={popIn(1.15)}
                  initial="hidden"
                  animate="visible"
                >
                  <SpeechBubble />
                </motion.div>
              </div>

              {/* EN ⇄ ES flashcard */}
              <div className={`${s.hero__floatWrapCard} float-a`}>
                <motion.div
                  variants={popIn(1.35)}
                  initial="hidden"
                  animate="visible"
                >
                  <FlashCard />
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
