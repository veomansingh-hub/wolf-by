'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap-register';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis RAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker gives time in seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerCallback);

    // Disable GSAP's built-in lag smoothing to sync with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
