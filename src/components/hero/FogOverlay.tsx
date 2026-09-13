'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-register';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ------------------------------------------------------------------ */
/*  Shared fog gradient strings                                        */
/* ------------------------------------------------------------------ */

/**
 * Multiple radial-gradient layers simulate patchy, organic fog.
 * Each gradient is a soft circle with transparent edges.
 * Fog base colour: rgb(180, 175, 165) — a neutral warm grey.
 */
const FOG_GRADIENT_1 = [
  'radial-gradient(ellipse 60% 50% at 15% 60%, rgba(180,175,165,0.45) 0%, transparent 70%)',
  'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(180,175,165,0.35) 0%, transparent 65%)',
  'radial-gradient(ellipse 70% 45% at 80% 55%, rgba(180,175,165,0.40) 0%, transparent 70%)',
  'radial-gradient(ellipse 40% 55% at 35% 70%, rgba(190,185,175,0.30) 0%, transparent 60%)',
  'radial-gradient(ellipse 55% 35% at 70% 40%, rgba(180,175,165,0.25) 0%, transparent 65%)',
].join(', ');

const FOG_GRADIENT_2 = [
  'radial-gradient(ellipse 55% 60% at 25% 45%, rgba(180,175,165,0.35) 0%, transparent 65%)',
  'radial-gradient(ellipse 65% 40% at 65% 60%, rgba(180,175,165,0.30) 0%, transparent 70%)',
  'radial-gradient(ellipse 45% 50% at 85% 50%, rgba(190,185,175,0.28) 0%, transparent 60%)',
  'radial-gradient(ellipse 50% 45% at 45% 35%, rgba(180,175,165,0.22) 0%, transparent 65%)',
  'radial-gradient(ellipse 60% 50% at 10% 55%, rgba(180,175,165,0.32) 0%, transparent 70%)',
].join(', ');

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function FogOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Layer 1: slow rightward drift, opacity oscillates 0.3 → 0.6
      gsap.to('.fog-layer-1', {
        x: '8%',
        opacity: 0.6,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Layer 2: slow leftward drift, opacity oscillates 0.2 → 0.4
      gsap.to('.fog-layer-2', {
        x: '-6%',
        opacity: 0.4,
        scale: 1.05,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  /* ---- static reduced-motion styles -------------------------------- */
  const reducedStyle = prefersReducedMotion
    ? { opacity: 0.2 }
    : undefined;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={reducedStyle}
    >
      {/* Fog layer 1 — drifts right, wider than viewport for drift room */}
      <div
        className="fog-layer-1 absolute inset-0 will-change-transform"
        style={{
          width: '140%',
          height: '100%',
          left: '-20%',
          opacity: 0.3, // starting opacity — GSAP oscillates to 0.6
          mixBlendMode: 'screen',
          backgroundImage: FOG_GRADIENT_1,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Fog layer 2 — drifts left, slightly different scale */}
      <div
        className="fog-layer-2 absolute inset-0 will-change-transform"
        style={{
          width: '150%',
          height: '100%',
          left: '-25%',
          opacity: 0.2, // starting opacity — GSAP oscillates to 0.4
          mixBlendMode: 'screen',
          backgroundImage: FOG_GRADIENT_2,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}
