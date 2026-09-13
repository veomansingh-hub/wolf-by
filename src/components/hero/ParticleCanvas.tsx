'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: [number, number, number]; // RGB tuple
  phase: number; // current sine phase (radians)
  phaseSpeed: number; // radians per frame
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PARTICLE_COUNT = 60;

/** Palette weighted toward bone tones with occasional ember & warm white */
const COLORS: [number, number, number][] = [
  [232, 224, 212], // bone
  [232, 224, 212], // bone (doubled for higher probability)
  [196, 113, 59], // ember
  [255, 245, 230], // warm white
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function createParticle(width: number, height: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: -(Math.random() * 0.3 + 0.1), // gentle upward drift
    radius: Math.random() * 2 + 0.5, // 0.5 – 2.5 px
    opacity: Math.random() * 0.35 + 0.1, // 0.1 – 0.45
    color,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: Math.random() * 0.01 + 0.005,
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  /* ---------- initialise / reinitialise particles on resize -------- */
  const initParticles = useCallback((width: number, height: number) => {
    // If particles already exist, re-clamp positions to new viewport
    if (particlesRef.current.length === PARTICLE_COUNT) {
      particlesRef.current.forEach((p) => {
        p.x = p.x % width;
        p.y = p.y % height;
      });
      return;
    }

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(width, height),
    );
  }, []);

  /* ---------- draw a single soft-glow particle --------------------- */
  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, p: Particle) => {
      const [r, g, b] = p.color;

      // Radial gradient: bright centre → transparent edge
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius * 2.5,
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    },
    [],
  );

  /* ---------- main animation loop --------------------------------- */
  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Sine oscillation on horizontal velocity
        p.phase += p.phaseSpeed;
        const sineOffset = Math.sin(p.phase) * 0.25;

        p.x += p.vx + sineOffset;
        p.y += p.vy;

        // Wrap-around: particles exiting one edge re-enter from the opposite
        if (p.y < -p.radius * 3) p.y = height + p.radius * 3;
        if (p.y > height + p.radius * 3) p.y = -p.radius * 3;
        if (p.x < -p.radius * 3) p.x = width + p.radius * 3;
        if (p.x > width + p.radius * 3) p.x = -p.radius * 3;

        drawParticle(ctx, p);
      });

      animFrameRef.current = requestAnimationFrame(() =>
        animate(ctx, width, height),
      );
    },
    [drawParticle],
  );

  /* ---------- lifecycle ------------------------------------------- */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    /* --- sizing helper ----------------------------------------------- */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles(w, h);
    };

    resize();

    /* --- start animation --------------------------------------------- */
    const startLoop = () => {
      cancelAnimationFrame(animFrameRef.current);
      animate(ctx, window.innerWidth, window.innerHeight);
    };

    startLoop();

    /* --- pause / resume on visibility change ------------------------- */
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
      } else {
        startLoop();
      }
    };

    /* --- resize handler ---------------------------------------------- */
    const handleResize = () => {
      resize();
      // Restart loop with new dimensions
      if (!document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
        animate(ctx, window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    /* --- cleanup ----------------------------------------------------- */
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [prefersReducedMotion, initParticles, animate]);

  // Render nothing when the user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    />
  );
}
