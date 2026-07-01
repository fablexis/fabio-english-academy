import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useInView({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  delay = 80,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  // Add delay before triggering animations (like HeroBanner pattern)
  useEffect(() => {
    if (!inView) {
      if (!once) {
        const timer = setTimeout(() => setReady(false), 0);
        return () => clearTimeout(timer);
      }
      return;
    }

    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [inView, delay, once]);

  return { ref, ready };
}
