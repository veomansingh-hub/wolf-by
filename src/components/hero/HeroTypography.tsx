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

    const elements = containerRef.current.children;
    gsap.from(elements, { 
      opacity: 0, 
      y: 20, 
      duration: 1.2, 
      stagger: 0.15, 
      delay: 0.6, 
      ease: 'power2.out',
      clearProps: 'all'
    });
  }, [prefersReducedMotion]);

  return (
    <>
      <div
        ref={containerRef}
        className="absolute inset-0 z-40 flex flex-col justify-end pb-24 md:pb-0 md:justify-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-none"
      >
        {/* Small intro label */}
        <div className="mb-4 md:mb-6 font-sans text-[9px] md:text-[10px] sm:text-xs tracking-[0.2em] uppercase text-charcoal/80 pointer-events-auto font-semibold">
          Private Wildlife Journeys
        </div>

        {/* Main Headline - Scaled for mobile, huge on desktop */}
        <h1 className="mb-6 md:mb-10 leading-[0.85] flex flex-col">
          <span 
            className="font-sans font-black tracking-tighter text-charcoal uppercase"
            style={{ fontSize: 'clamp(3.25rem, 11vw, 9rem)' }}
          >
            WILD BY
          </span>
          <span 
            className="font-serif italic text-copper tracking-tight"
            style={{ fontSize: 'clamp(4rem, 13vw, 11rem)', transform: 'translateY(-0.05em)' }}
          >
            NATURE
          </span>
        </h1>

        {/* Description */}
        <p 
          className="mb-8 md:mb-12 max-w-sm md:max-w-md font-sans text-charcoal/90 leading-relaxed pointer-events-auto font-medium"
          style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)' }}
        >
          Private safaris designed around wildlife, landscape and the freedom to explore slowly.
        </p>

        {/* CTAs */}
        <div className="mb-10 md:mb-16 flex flex-col sm:flex-row gap-4 md:gap-6 pointer-events-auto">
          <Link 
            href="/plan" 
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center bg-charcoal px-8 font-sans text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-charcoal/80"
          >
            Plan Your Safari
          </Link>
          <Link 
            href="/destinations" 
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center border border-charcoal/30 px-8 font-sans text-xs uppercase tracking-widest text-charcoal transition-colors hover:bg-charcoal/5"
          >
            Explore Destinations
          </Link>
        </div>

        {/* Trust Line */}
        <div className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-charcoal/70 pointer-events-auto font-semibold">
          Private Safaris &nbsp;&middot;&nbsp; Expert Guides &nbsp;&middot;&nbsp; Tailored Journeys
        </div>
      </div>

      {/* Design Concept Credit (Bottom Left) */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-40 pointer-events-auto">
        <a 
          href="mailto:contact@theomedia.co.uk?subject=Website%20Design%20Enquiry"
          className="font-sans text-[9px] tracking-[0.2em] uppercase text-charcoal/60 hover:text-charcoal font-semibold transition-colors"
        >
          Design concept by Theomedia UK
        </a>
      </div>
    </>
  );
}
