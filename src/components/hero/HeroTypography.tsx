'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-register';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Link from 'next/link';

export function HeroTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Use gsap.from to ensure it's visible even if JS fails or delays
    const elements = containerRef.current.children;
    gsap.from(elements, { 
      opacity: 0, 
      y: 15, 
      duration: 1.2, 
      stagger: 0.15, 
      delay: 0.6, 
      ease: 'power2.out',
      clearProps: 'all' // cleans up inline styles after animation
    });
  }, [prefersReducedMotion]);

  return (
    <>
      <div
        ref={containerRef}
        className="absolute inset-0 z-40 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-none"
      >
        {/* Small intro label */}
        <div className="mb-6 font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-bone/80 pointer-events-auto">
          Private Wildlife Journeys
        </div>

        {/* Main Headline */}
        <h1 
          className="mb-8 font-serif text-bone leading-[0.95]"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
        >
          WILD BY <br />
          <span className="text-ember italic">NATURE</span>
        </h1>

        {/* Description */}
        <p 
          className="mb-10 max-w-md font-sans text-bone/90 leading-relaxed pointer-events-auto"
          style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)' }}
        >
          Private safaris designed around wildlife, landscape and the freedom to explore slowly.
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-col sm:flex-row gap-6 pointer-events-auto">
          <Link 
            href="/plan" 
            className="inline-flex h-12 items-center justify-center bg-bone px-8 font-sans text-xs uppercase tracking-widest text-charcoal transition-colors hover:bg-bone/80"
          >
            Plan Your Safari
          </Link>
          <Link 
            href="/destinations" 
            className="inline-flex h-12 items-center justify-center border border-bone/30 px-8 font-sans text-xs uppercase tracking-widest text-bone transition-colors hover:bg-bone/10"
          >
            Explore Destinations
          </Link>
        </div>

        {/* Trust Line */}
        <div className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-bone/60 pointer-events-auto">
          Private Safaris &nbsp;&middot;&nbsp; Expert Guides &nbsp;&middot;&nbsp; Tailored Journeys
        </div>
      </div>

      {/* Design Concept Credit (Bottom Left) */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-40 pointer-events-none">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-bone/50">
          Design concept by Theomedia UK
        </p>
      </div>
    </>
  );
}
