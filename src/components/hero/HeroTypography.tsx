'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-register';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * HeroTypography - Minimal Version
 *
 * Reduced to extreme simplicity so it doesn't distract from the video hero.
 * No scroll-scrubbing, no individual word clips.
 * Just a clean, elegant fade-in at the bottom center.
 */
export function HeroTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Simple elegant fade-in after a short delay
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: 'power2.out' }
    );
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute bottom-[10%] left-0 right-0 z-40 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: prefersReducedMotion ? 1 : 0 }}
    >
      <h1 
        className="hero-title mb-4 font-serif text-bone"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
      >
        WILD BY <span className="text-ember/90">NATURE</span>
      </h1>
      <p 
        className="hero-subtitle mx-auto max-w-md text-fog/80"
        style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
      >
        Some things were never meant to be tamed.
      </p>
    </div>
  );
}
