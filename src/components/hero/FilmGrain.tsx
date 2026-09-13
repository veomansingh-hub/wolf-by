'use client';

import { useEffect, useRef } from 'react';

export function FilmGrain() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grain = grainRef.current;
    if (!grain) return;

    // Check reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let animId: number;
    let lastTime = 0;

    // Run at reduced framerate (~12fps) for performance
    const animateThrottled = (time: number) => {
      if (time - lastTime > 83) {
        // Randomly shift background position for organic noise
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        grain.style.transform = `translate(${x - 128}px, ${y - 128}px)`;
        lastTime = time;
      }
      animId = requestAnimationFrame(animateThrottled);
    };
    animId = requestAnimationFrame(animateThrottled);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={grainRef}
        className="absolute -inset-[256px] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
