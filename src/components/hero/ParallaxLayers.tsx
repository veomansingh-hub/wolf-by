'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap-register';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * ParallaxLayers
 *
 * Creates convincing depth with three forest layers.
 * Each layer moves at a different rate driven by ScrollTrigger scrub
 * (scrub timeline is defined in the parent HeroScene).
 * Mouse position adds subtle reactive shift on desktop.
 *
 * Layer stack (bottom to top):
 *   z-0  : forest-back  — distant sky + treeline
 *   z-10 : forest-mid   — mid-ground trees
 *   z-20 : forest-front  — close foreground branches + vignette
 *
 * NOTE: The wolf layer (z-15) is now handled by WolfSequence,
 * rendered as a sibling in HeroScene.
 *
 * ASSET REPLACEMENT:
 *   To replace CSS placeholders with real images, swap the inner
 *   content of each layer div while keeping the outer wrapper
 *   (ref, data-parallax, z-index, gpu-layer classes) untouched.
 *   Expected assets:
 *     /public/scenes/forest-back.webp   — 2560×1440, opaque
 *     /public/scenes/forest-mid.webp    — 2560×1440, alpha transparency
 *     /public/scenes/forest-front.webp  — 2560×1440, alpha transparency
 *     /public/scenes/fog-01.webp        — 1920×1080, alpha transparency
 */

/* ─── Asset detection ─── */
/* Set these to `true` once real assets are placed in /public/scenes/ */
const HAS_REAL_BACK = false;
const HAS_REAL_MID = false;
const HAS_REAL_FRONT = false;

/* ─── Placeholder sub-components ─── */
/* These exist ONLY as development stand-ins. They will be deleted
   once real photographic assets are available. */

function PlaceholderBack() {
  return (
    <>
      {/* Dark forest sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #050a05 0%, #0a1a0a 25%, #0d1f0d 50%, #0a150a 75%, #050a05 100%
          )`,
        }}
      />
      {/* Treeline silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%]"
        style={{
          background: `
            radial-gradient(ellipse 15% 40% at 10% 100%, #0a120a 0%, transparent 100%),
            radial-gradient(ellipse 12% 55% at 25% 100%, #080f08 0%, transparent 100%),
            radial-gradient(ellipse 10% 45% at 38% 100%, #0a130a 0%, transparent 100%),
            radial-gradient(ellipse 18% 60% at 55% 100%, #070e07 0%, transparent 100%),
            radial-gradient(ellipse 14% 50% at 70% 100%, #0a120a 0%, transparent 100%),
            radial-gradient(ellipse 16% 52% at 85% 100%, #080f08 0%, transparent 100%),
            radial-gradient(ellipse 11% 42% at 95% 100%, #0a140a 0%, transparent 100%)
          `,
        }}
      />
      {/* Distant sky specks */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 12 }, (_, i) => {
          // Deterministic pseudo-random for SSR consistency
          const seed = i * 7.3 + 1.1;
          const size = 1 + ((seed * 13.7) % 1.5);
          const top = 5 + ((seed * 17.3) % 30);
          const left = ((seed * 31.7) % 100);
          return (
            <div
              key={i}
              className="absolute rounded-full bg-bone/30"
              style={{ width: `${size}px`, height: `${size}px`, top: `${top}%`, left: `${left}%` }}
            />
          );
        })}
      </div>
    </>
  );
}

function PlaceholderMid() {
  return (
    <>
      {/* Tree trunk silhouettes */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-[5%] h-[85%] w-[4%]" style={{ background: 'linear-gradient(180deg, transparent 0%, #0a0f0a 15%, #080d08 100%)', borderRadius: '2px 3px 0 0' }} />
        <div className="absolute bottom-0 left-[8%] h-[75%] w-[3%]" style={{ background: 'linear-gradient(180deg, transparent 0%, #0c110c 20%, #090e09 100%)', borderRadius: '1px 2px 0 0' }} />
        <div className="absolute bottom-0 left-[20%] h-[90%] w-[5%]" style={{ background: 'linear-gradient(180deg, transparent 0%, #0b100b 10%, #070c07 100%)', borderRadius: '3px 2px 0 0' }} />
        <div className="absolute bottom-0 right-[22%] h-[80%] w-[4%]" style={{ background: 'linear-gradient(180deg, transparent 0%, #0a0f0a 15%, #080d08 100%)', borderRadius: '2px 3px 0 0' }} />
        <div className="absolute bottom-0 right-[8%] h-[88%] w-[5%]" style={{ background: 'linear-gradient(180deg, transparent 0%, #090e09 12%, #070c07 100%)', borderRadius: '3px 4px 0 0' }} />
        <div className="absolute bottom-0 right-[4%] h-[70%] w-[3%]" style={{ background: 'linear-gradient(180deg, transparent 0%, #0c120c 20%, #0a0f0a 100%)', borderRadius: '1px 2px 0 0' }} />
      </div>
      {/* Ground plane */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20%]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #0a0f0a 40%, #080d08 100%)' }}
      />
    </>
  );
}

function PlaceholderFront() {
  return (
    <>
      {/* Dark vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.4) 70%, rgba(5,5,5,0.9) 100%)',
        }}
      />
      {/* Left foreground branch */}
      <div
        className="absolute -left-[5%] bottom-[10%] top-0 w-[15%]"
        style={{ background: 'linear-gradient(90deg, #050505 0%, #080808 60%, transparent 100%)' }}
      />
      {/* Right foreground branch */}
      <div
        className="absolute -right-[5%] bottom-[15%] top-0 w-[12%]"
        style={{ background: 'linear-gradient(270deg, #050505 0%, #070707 60%, transparent 100%)' }}
      />
      {/* Bottom ground darkness */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[15%]"
        style={{ background: 'linear-gradient(0deg, #050505 0%, transparent 100%)' }}
      />
      {/* Top canopy darkness */}
      <div
        className="absolute left-0 right-0 top-0 h-[25%]"
        style={{ background: 'linear-gradient(180deg, #050505 0%, transparent 100%)' }}
      />
    </>
  );
}

/* ─── Production image layer ─── */
function ImageLayer({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      className="object-cover"
      priority={false}
      quality={85}
    />
  );
}

/* ─── Main component ─── */
export function ParallaxLayers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax();
  const prefersReducedMotion = useReducedMotion();

  // Mouse-driven subtle shift
  useEffect(() => {
    if (prefersReducedMotion) return;

    const layers = [
      { el: backRef.current, factor: 5 },
      { el: midRef.current, factor: 10 },
      { el: frontRef.current, factor: 18 },
    ];

    layers.forEach(({ el, factor }) => {
      if (!el) return;
      gsap.to(el, {
        x: mouse.x * factor,
        y: mouse.y * factor * 0.5,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  }, [mouse.x, mouse.y, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* ─── Background layer ─── */}
      <div
        ref={backRef}
        data-parallax="back"
        className="gpu-layer absolute inset-0 z-0 scale-110"
      >
        {HAS_REAL_BACK ? (
          <ImageLayer src="/scenes/forest-back.webp" alt="Distant forest treeline" />
        ) : (
          <PlaceholderBack />
        )}
      </div>

      {/* ─── Midground layer ─── */}
      <div
        ref={midRef}
        data-parallax="mid"
        className="gpu-layer absolute inset-0 z-10 scale-110"
      >
        {HAS_REAL_MID ? (
          <ImageLayer src="/scenes/forest-mid.webp" alt="Mid-ground forest trees" />
        ) : (
          <PlaceholderMid />
        )}
      </div>

      {/* ─── Foreground layer ─── */}
      <div
        ref={frontRef}
        data-parallax="front"
        className="gpu-layer absolute inset-0 z-20 scale-115"
      >
        {HAS_REAL_FRONT ? (
          <ImageLayer src="/scenes/forest-front.webp" alt="Foreground branches" />
        ) : (
          <PlaceholderFront />
        )}
      </div>
    </div>
  );
}
