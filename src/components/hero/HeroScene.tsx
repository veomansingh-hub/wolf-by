'use client';

import { HeroTypography } from './HeroTypography';
import { FilmGrain } from './FilmGrain';

/**
 * HeroScene - Premium Video Hero
 *
 * Integrated with the final real wolf video.
 * Kept strictly minimal to let the footage breathe.
 * Removed artificial CSS fog and particles as they clash with real footage.
 * Retained film grain for cinematic texture and banding reduction.
 */
export function HeroScene() {
  return (
    <section 
      className="relative h-[100svh] w-full overflow-hidden bg-void"
      aria-label="Hero: Wild by Nature"
    >
      {/* 
        Background Video 
        - playsInline: Prevents iOS fullscreen takeover
        - object-cover: Ensures fullscreen without squishing
        - object-center: Keeps the wolf centered on both desktop and mobile
        - opacity transition: Prevents black flash while loading
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
      >
        <source src="/video/wolf-hero.mp4" type="video/mp4" />
      </video>

      {/* ─── Visual Support Overlays ─── */}
      
      {/* Film grain retained for cinematic texture and compression artifact masking */}
      <FilmGrain />

      {/* ─── Minimal Text Overlay ─── */}
      <HeroTypography />
    </section>
  );
}
