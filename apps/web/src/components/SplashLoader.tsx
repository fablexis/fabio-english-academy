import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import s from '../styles/SplashLoader.module.scss';

import { SPLASH_KEY } from './splashTiming';

const WORDS = ['Your', 'English', 'Buddy'];

/**
 * Branded first-load splash. Shows once per session and is skipped
 * entirely for users who prefer reduced motion.
 */
const SplashLoader: React.FC = () => {
  // Start hidden so the server render and the first client render agree
  // (no hydration mismatch). The once-per-session decision happens in the
  // effect below, on the client only.
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || sessionStorage.getItem(SPLASH_KEY)) return;

    setShow(true);
    sessionStorage.setItem(SPLASH_KEY, '1');
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 1500);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={s.splash}
          aria-hidden="true"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className={s.splash__center}>
            <div className={s.splash__words}>
              {WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  className={word === 'English' ? s['splash__word--accent'] : s.splash__word}
                  initial={{ opacity: 0, y: 38, rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.14,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.div
              className={s.splash__bar}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
