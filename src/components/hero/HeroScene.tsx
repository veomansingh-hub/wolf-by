'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HeroTypography } from './HeroTypography';
import { FogOverlay } from './FogOverlay';
import { FilmGrain } from './FilmGrain';

// Dynamic import for ParticleCanvas — no SSR needed for canvas
const ParticleCanvas = dynamic(
  () => import('./ParticleCanvas').then((mod) => ({ default: mod.ParticleCanvas })),
  { ssr: false }
);

/**
 * HeroScene - Video First Architecture
 *
 * A clean, premium fullscreen video hero.
 * Removed all scroll-narrative pinning and CSS placeholder dependencies.
 * The focus is 100% on presenting the cinematic wolf video perfectly.
 */
export function HeroScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      className="relative h-[100svh] w-full overflow-hidden bg-void"
      aria-label="Hero: Wild by Nature"
    >
      {/* 
        Background Video 
        - playsInline is critical for iOS mobile to prevent native player takeover
        - object-cover ensures no awkward cropping
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/video/wolf-hero-poster.webp"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/wolf-hero.mp4" type="video/mp4" />
        <source src="/video/wolf-hero.webm" type="video/webm" />
      </video>

      {/* ─── Visual Support Overlays ─── */}
      
      {/* 1. Dark overlay for baseline contrast */}
      <div className="pointer-events-none absolute inset-0 bg-void/40" />

      {/* 2. Soft vignette to draw focus to the center subject */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,10,5,0.85)_100%)]" />

      {/* 3. Subtle atmospheric effects */}
      <FogOverlay />
      <ParticleCanvas />
      <FilmGrain />

      {/* ─── Minimal Text Overlay ─── */}
      <HeroTypography />
    </section>
  );
}
