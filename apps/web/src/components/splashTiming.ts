export const SPLASH_KEY = 'yeb-splash-seen';

/**
 * Seconds the hero should wait before its entrance so the choreography
 * runs while the splash curtain lifts. Computed at module load, before
 * SplashLoader marks the session as seen.
 */
export const splashDelay = (() => {
  if (typeof window === 'undefined') return 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || sessionStorage.getItem(SPLASH_KEY)) return 0;
  return 1.55;
})();
