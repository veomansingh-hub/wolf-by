'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap, ScrollTrigger } from '@/lib/gsap-register';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ParallaxLayers } from './ParallaxLayers';
import { WolfSequence } from './WolfSequence';
import { HeroTypography } from './HeroTypography';
import { FogOverlay } from './FogOverlay';
import { FilmGrain } from './FilmGrain';

// Dynamic import for ParticleCanvas — no SSR needed for canvas
const ParticleCanvas = dynamic(
  () => import('./ParticleCanvas').then((mod) => ({ default: mod.ParticleCanvas })),
  { ssr: false }
);

/**
 * HeroScene
 *
 * The master orchestrator for the hero section.
 * Creates a pinned full-viewport experience driven by scroll.
 *
 * Scroll narrative (over 300vh of scroll runway):
 *   0% – 25%:   Scene fades in. Typography reveals. Fog drifts.
 *   25% – 50%:  Parallax layers separate. Wolf fades in at distance.
 *   50% – 80%:  Wolf grows larger, foreground layers part, depth intensifies.
 *   80% – 100%: Typography fades out. Wolf reaches close-up. Scene dims.
 *
 * The section itself is 400vh tall; the visible viewport is pinned for 300vh.
 *
 * ANIMATION TARGETS:
 *   [data-parallax="back"]  — background forest layer
 *   [data-parallax="mid"]   — midground trees layer
 *   [data-parallax="wolf"]  — wolf sequence layer (WolfSequence)
 *   [data-parallax="front"] — foreground vignette layer
 *   .wolf-asset             — wolf element (CSS placeholder or canvas)
 *   .wolf-eye               — wolf eye glint (CSS placeholder only)
 *   .hero-typography        — typography container
 *   .scroll-indicator       — scroll cue
 *
 *   These selectors work regardless of whether placeholders or
 *   production assets are active. Do not rename them without updating
 *   the timeline below.
 */
export function HeroScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const pin = pinRef.current!;

      // Query layers
      const backLayer = pin.querySelector('[data-parallax="back"]') as HTMLElement;
      const midLayer = pin.querySelector('[data-parallax="mid"]') as HTMLElement;
      const wolfLayer = pin.querySelector('[data-parallax="wolf"]') as HTMLElement;
      const frontLayer = pin.querySelector('[data-parallax="front"]') as HTMLElement;
      const wolfAsset = pin.querySelector('.wolf-asset') as HTMLElement;
      const wolfEye = pin.querySelector('.wolf-eye') as HTMLElement;
      const wolfCanvas = wolfAsset?.querySelector('canvas') as HTMLCanvasElement | null;
      const typography = pin.querySelector('.hero-typography') as HTMLElement;
      const scrollIndicator = pin.querySelector('.scroll-indicator') as HTMLElement;

      if (!backLayer || !midLayer || !wolfLayer || !frontLayer) return;

      // Master timeline scrubbed to scroll
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: pin,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      // ─── Phase 1: Scene breathes, subtle initial parallax (0% – 25%) ───
      masterTl.to(
        backLayer,
        { yPercent: -3, scale: 1.12, duration: 25, ease: 'none' },
        0
      );
      masterTl.to(
        midLayer,
        { yPercent: -6, scale: 1.08, duration: 25, ease: 'none' },
        0
      );
      masterTl.to(
        frontLayer,
        { yPercent: -10, duration: 25, ease: 'none' },
        0
      );

      // Hide scroll indicator as user starts scrolling
      if (scrollIndicator) {
        masterTl.to(
          scrollIndicator,
          { opacity: 0, y: -20, duration: 8, ease: 'power2.in' },
          0
        );
      }

      // ─── Phase 2: Wolf fades in at distance (25% – 50%) ───
      if (wolfAsset) {
        masterTl.to(
          wolfAsset,
          { opacity: 0.7, duration: 15, ease: 'power2.out' },
          15
        );
      }

      // If image sequence canvas exists, scrub frames across the full timeline
      if (wolfCanvas) {
        masterTl.to(
          wolfCanvas,
          {
            attr: { 'data-frame': 239 }, // 0-based last frame
            duration: 95, // spans most of the timeline
            ease: 'none',
            snap: { attr: { 'data-frame': 1 } }, // snap to integer frames
          },
          0
        );
      }

      // Continue parallax separation
      masterTl.to(
        backLayer,
        { yPercent: -8, scale: 1.15, duration: 25, ease: 'none' },
        25
      );
      masterTl.to(
        midLayer,
        { yPercent: -15, scale: 1.06, duration: 25, ease: 'none' },
        25
      );
      masterTl.to(
        frontLayer,
        { yPercent: -25, scale: 1.18, duration: 25, ease: 'none' },
        25
      );

      // ─── Phase 3: Wolf grows, approaches viewer (50% – 80%) ───
      if (wolfAsset) {
        masterTl.to(
          wolfAsset,
          { scale: 2.2, opacity: 1, y: '-10%', duration: 30, ease: 'power1.inOut' },
          40
        );
      }

      // Wolf layer moves forward
      masterTl.to(
        wolfLayer,
        { yPercent: -5, scale: 1.1, duration: 30, ease: 'none' },
        40
      );

      // Foreground parts further
      masterTl.to(
        frontLayer,
        { yPercent: -40, scale: 1.25, opacity: 0.6, duration: 30, ease: 'none' },
        40
      );

      // Wolf eye glows (placeholder-only; harmless no-op if element absent)
      if (wolfEye) {
        masterTl.to(
          wolfEye,
          {
            boxShadow: '0 0 12px 3px rgba(196, 160, 80, 0.6)',
            scale: 1.3,
            duration: 20,
            ease: 'power2.inOut',
          },
          50
        );
      }

      // ─── Phase 4: Typography fades, scene concludes (80% – 100%) ───
      if (typography) {
        masterTl.to(
          typography,
          { opacity: 0, y: -60, scale: 0.97, duration: 20, ease: 'power2.in' },
          60
        );
      }

      // Final dramatic zoom
      if (wolfAsset) {
        masterTl.to(
          wolfAsset,
          { scale: 4, y: '-20%', duration: 25, ease: 'power2.in' },
          70
        );
      }

      // Vignette intensifies
      masterTl.to(
        frontLayer,
        { opacity: 0.3, duration: 20, ease: 'none' },
        75
      );

      // Overall scene darkening at end
      masterTl.to(
        pin,
        { '--scene-darkness': 0.7, duration: 15, ease: 'power2.in' },
        80
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      {/* Scroll runway — the section height drives the scroll progress */}
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: '400vh' }}
        aria-label="Hero: Wild by Nature"
      >
        {/* Pinned viewport — stays fixed while section scrolls through */}
        <div
          ref={pinRef}
          className="relative h-screen w-full overflow-hidden"
          style={
            {
              '--scene-darkness': 0,
            } as React.CSSProperties
          }
        >
          {/* Dark overlay driven by CSS custom property */}
          <div
            className="pointer-events-none absolute inset-0 z-50 bg-void transition-none"
            style={{ opacity: 'var(--scene-darkness)' }}
            aria-hidden="true"
          />

          {/* Scene layers — ordered by z-index, not DOM order */}
          <ParallaxLayers />
          <WolfSequence />
          <FogOverlay />
          <ParticleCanvas />
          <HeroTypography />
          <FilmGrain />
        </div>
      </section>
    </>
  );
}
