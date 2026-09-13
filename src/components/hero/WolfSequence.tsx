'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { gsap } from '@/lib/gsap-register';

/**
 * WolfSequence
 *
 * Scroll-controlled image sequence renderer for the wolf.
 * Designed for ~120–240 optimized WebP/AVIF frames.
 *
 * HOW IT WORKS:
 *   - Parent (HeroScene) passes a normalized scroll progress (0–1)
 *     via a data attribute or callback.
 *   - This component maps progress → frame index → draws to <canvas>.
 *   - Frames are preloaded in batches for performance.
 *
 * ASSET STRUCTURE:
 *   /public/wolf/hero/frame-001.webp
 *   /public/wolf/hero/frame-002.webp
 *   ...
 *   /public/wolf/hero/frame-240.webp
 *
 *   Frame naming: zero-padded 3-digit index (001–240).
 *   Recommended size: 800×600 to 1200×900 WebP, ~30–60KB each.
 *
 * FALLBACK:
 *   When no frames are available (HAS_REAL_FRAMES = false),
 *   renders the CSS wolf silhouette placeholder.
 *   The GSAP animation system in HeroScene targets `.wolf-asset`
 *   regardless of whether it's the canvas or the placeholder.
 */

/* ─── Configuration ─── */
const HAS_REAL_FRAMES = false;
const FRAME_COUNT = 240;
const FRAME_PATH = '/wolf/hero/frame-';
const FRAME_EXT = '.webp';
const FRAME_PAD = 3; // zero-pad width: 001, 002, ...

/** Build the frame URL for a given index (1-based) */
function frameSrc(index: number): string {
  return `${FRAME_PATH}${String(index).padStart(FRAME_PAD, '0')}${FRAME_EXT}`;
}

/* ─── Sequence Canvas (used when real frames are available) ─── */

function SequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const loadedCountRef = useRef(0);

  // Preload frames in batches
  const preloadFrames = useCallback(() => {
    const batchSize = 20;
    let loaded = 0;

    const loadBatch = (start: number) => {
      const end = Math.min(start + batchSize, FRAME_COUNT);
      for (let i = start; i < end; i++) {
        const img = new window.Image();
        img.src = frameSrc(i + 1); // 1-based
        img.onload = () => {
          loaded++;
          loadedCountRef.current = loaded;
          // Draw first frame once it's ready
          if (i === 0 && canvasRef.current) {
            drawFrame(0);
          }
        };
        framesRef.current[i] = img;
      }
      // Load next batch after a tick
      if (end < FRAME_COUNT) {
        requestAnimationFrame(() => loadBatch(end));
      }
    };

    loadBatch(0);
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const frame = framesRef.current[index];
    if (!canvas || !ctx || !frame || !frame.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Draw frame centered / cover
    const imgAspect = frame.naturalWidth / frame.naturalHeight;
    const canvasAspect = w / h;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgAspect > canvasAspect) {
      drawH = h;
      drawW = h * imgAspect;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgAspect;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(frame, drawX, drawY, drawW, drawH);
  }, []);

  // Expose a way for the parent to set the current frame via data attribute
  useEffect(() => {
    preloadFrames();

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Observe data-frame changes from GSAP
    const observer = new MutationObserver(() => {
      const frameAttr = canvas.dataset.frame;
      if (frameAttr != null) {
        const idx = Math.round(parseFloat(frameAttr));
        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
        if (clamped !== currentFrameRef.current) {
          currentFrameRef.current = clamped;
          drawFrame(clamped);
        }
      }
    });

    observer.observe(canvas, { attributes: true, attributeFilter: ['data-frame'] });

    return () => observer.disconnect();
  }, [preloadFrames, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      data-frame="0"
      aria-hidden="true"
    />
  );
}

/* ─── CSS Placeholder Wolf (fallback) ─── */

function PlaceholderWolf() {
  return (
    <div className="absolute inset-0">
      {/* Main body */}
      <div
        className="absolute bottom-[15%] left-[15%] right-[10%] top-[30%]"
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, #2a2a2a 0%, #1a1a1a 60%, transparent 100%)',
          borderRadius: '30% 25% 20% 25%',
        }}
      />
      {/* Head */}
      <div
        className="absolute left-[0%] top-[15%] h-[40%] w-[35%]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #2d2d2d 0%, #1c1c1c 70%, transparent 100%)',
          borderRadius: '40% 50% 40% 30%',
        }}
      />
      {/* Ears */}
      <div
        className="absolute left-[8%] top-[2%] h-[20%] w-[10%]"
        style={{
          background: 'linear-gradient(180deg, #333 0%, #222 100%)',
          borderRadius: '50% 50% 20% 20%',
          transform: 'rotate(-10deg)',
        }}
      />
      <div
        className="absolute left-[20%] top-[0%] h-[22%] w-[10%]"
        style={{
          background: 'linear-gradient(180deg, #303030 0%, #202020 100%)',
          borderRadius: '50% 50% 20% 20%',
          transform: 'rotate(5deg)',
        }}
      />
      {/* Legs */}
      <div className="absolute bottom-0 left-[22%] h-[30%] w-[8%]" style={{ background: 'linear-gradient(180deg, #222 0%, #1a1a1a 100%)', borderRadius: '2px 2px 3px 3px' }} />
      <div className="absolute bottom-0 left-[38%] h-[28%] w-[8%]" style={{ background: 'linear-gradient(180deg, #222 0%, #1a1a1a 100%)', borderRadius: '2px 2px 3px 3px' }} />
      <div className="absolute bottom-0 right-[25%] h-[27%] w-[8%]" style={{ background: 'linear-gradient(180deg, #222 0%, #1a1a1a 100%)', borderRadius: '2px 2px 3px 3px' }} />
      <div className="absolute bottom-0 right-[12%] h-[29%] w-[8%]" style={{ background: 'linear-gradient(180deg, #222 0%, #1a1a1a 100%)', borderRadius: '2px 2px 3px 3px' }} />
      {/* Tail */}
      <div
        className="absolute right-[0%] top-[25%] h-[25%] w-[20%]"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, #282828 0%, transparent 100%)',
          borderRadius: '50%',
          transform: 'rotate(-20deg)',
        }}
      />
      {/* Eye glint */}
      <div
        className="wolf-eye absolute left-[12%] top-[28%] h-[5%] w-[4%] rounded-full"
        style={{
          background: 'radial-gradient(circle, #c4a050 0%, #8a6a20 60%, transparent 100%)',
          boxShadow: '0 0 6px 1px rgba(196, 160, 80, 0.3)',
        }}
      />
    </div>
  );
}

/* ─── Main exported component ─── */

export function WolfSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax();
  const prefersReducedMotion = useReducedMotion();

  // Mouse-driven subtle shift on the wolf layer
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.to(containerRef.current, {
      x: mouse.x * 12,
      y: mouse.y * 6,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [mouse.x, mouse.y, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      data-parallax="wolf"
      className="gpu-layer absolute inset-0 z-[15] flex items-end justify-center"
    >
      <div
        className="wolf-asset relative mb-[8%] opacity-0"
        style={{
          width: 'clamp(120px, 18vw, 280px)',
          height: 'clamp(100px, 14vw, 220px)',
        }}
      >
        {HAS_REAL_FRAMES ? <SequenceCanvas /> : <PlaceholderWolf />}
      </div>
    </div>
  );
}
