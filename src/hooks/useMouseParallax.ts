'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MouseParallax {
  /** Horizontal offset: -1 (left edge) → 0 (center) → 1 (right edge) */
  x: number;
  /** Vertical offset: -1 (top edge) → 0 (center) → 1 (bottom edge) */
  y: number;
}

/** Linear interpolation helper */
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/** Detect touch-primary devices */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
}

const LERP_FACTOR = 0.08;
/** Skip state updates for deltas smaller than this to avoid re-renders */
const EPSILON = 0.001;

/**
 * Tracks mouse position relative to viewport center and returns a smoothly
 * interpolated value in the range [-1, 1].
 *
 * Automatically disabled on touch devices and when the user prefers
 * reduced motion. Cleans up all event listeners and rAF on unmount.
 */
export function useMouseParallax(): MouseParallax {
  const prefersReduced = useReducedMotion();

  const [smoothed, setSmoothed] = useState<MouseParallax>({ x: 0, y: 0 });

  // Raw (target) mouse position — updated on every mousemove
  const targetRef = useRef<MouseParallax>({ x: 0, y: 0 });
  // Current lerped position — mutated each rAF frame
  const currentRef = useRef<MouseParallax>({ x: 0, y: 0 });
  // rAF handle for cleanup
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize to [-1, 1] relative to viewport center
    targetRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    };
  }, []);

  useEffect(() => {
    // Bail out when disabled
    const disabled = prefersReduced || isTouchDevice();
    if (disabled) {
      // Reset to origin when disabled
      targetRef.current = { x: 0, y: 0 };
      currentRef.current = { x: 0, y: 0 };
      setSmoothed({ x: 0, y: 0 });
      return;
    }

    // --- Mouse listener ---
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- rAF loop ---
    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;

      const nextX = lerp(cur.x, tgt.x, LERP_FACTOR);
      const nextY = lerp(cur.y, tgt.y, LERP_FACTOR);

      currentRef.current = { x: nextX, y: nextY };

      // Only push to React state when the delta is perceptible
      if (
        Math.abs(nextX - cur.x) > EPSILON ||
        Math.abs(nextY - cur.y) > EPSILON
      ) {
        setSmoothed({ x: nextX, y: nextY });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced, handleMouseMove]);

  return smoothed;
}
