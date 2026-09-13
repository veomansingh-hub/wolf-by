'use client';

import { useRef, useEffect, useMemo } from 'react';
import { gsap } from '@/lib/gsap-register';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * HeroTypography
 *
 * Large editorial title + subtitle with scroll-driven clip-path reveals.
 * Each word is wrapped in a span for individual animation control.
 * The title reads "WILD BY NATURE" — positioned center screen.
 * As the user scrolls, words reveal left-to-right with stagger.
 * Later in the scroll, text fades and shifts upward as wolf approaches.
 */

const TITLE_WORDS = ['WILD', 'BY', 'NATURE'];
const SUBTITLE = 'Some things were never meant to be tamed.';

function SplitWord({
  word,
  className = '',
}: {
  word: string;
  className?: string;
}) {
  return (
    <span
      className={`hero-word inline-block overflow-hidden ${className}`}
    >
      <span className="hero-word-inner inline-block translate-y-full opacity-0">
        {word}
      </span>
    </span>
  );
}

export function HeroTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Split subtitle into words
  const subtitleWords = useMemo(() => SUBTITLE.split(' '), []);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show everything immediately without animation
      const container = containerRef.current;
      if (!container) return;
      const words = container.querySelectorAll('.hero-word-inner');
      words.forEach((word) => {
        (word as HTMLElement).style.transform = 'translateY(0)';
        (word as HTMLElement).style.opacity = '1';
      });
      return;
    }

    // Initial entrance animation (not scroll-driven, plays on load)
    const ctx = gsap.context(() => {
      const titleWords = containerRef.current?.querySelectorAll(
        '.title-word .hero-word-inner'
      );
      const subtitleWordsEls = containerRef.current?.querySelectorAll(
        '.subtitle-word .hero-word-inner'
      );

      if (!titleWords || !subtitleWordsEls) return;

      const tl = gsap.timeline({
        delay: 0.8,
        defaults: { ease: 'power3.out' },
      });

      // Reveal title words with stagger
      tl.to(titleWords, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
      });

      // Reveal subtitle words
      tl.to(
        subtitleWordsEls,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
        },
        '-=0.6'
      );

      // Decorative line
      tl.to(
        '.hero-line',
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.5'
      );

      // Scroll indicator
      tl.to(
        '.scroll-indicator',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="hero-typography pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center"
    >
      {/* Main title */}
      <h1 className="hero-title mb-6 text-center md:mb-8">
        <div className="flex flex-wrap items-center justify-center gap-x-[0.25em]">
          {TITLE_WORDS.map((word, i) => (
            <SplitWord
              key={word}
              word={word}
              className={`title-word ${
                i === 2 ? 'text-ember/90' : ''
              }`}
            />
          ))}
        </div>
        <div
          className="hero-title-size"
          style={{
            fontSize: 'clamp(3rem, 10vw, 9rem)',
          }}
        />
      </h1>

      {/* Decorative line */}
      <div
        className="hero-line mx-auto mb-6 h-px origin-left scale-x-0 opacity-0 md:mb-8"
        style={{
          width: 'clamp(60px, 15vw, 200px)',
          background:
            'linear-gradient(90deg, transparent, rgba(232,224,212,0.4), transparent)',
        }}
      />

      {/* Subtitle */}
      <p
        className="hero-subtitle text-center text-fog/80"
        style={{
          fontSize: 'clamp(0.875rem, 2vw, 1.375rem)',
        }}
      >
        <span className="flex flex-wrap items-center justify-center gap-x-[0.3em]">
          {subtitleWords.map((word, i) => (
            <SplitWord key={`${word}-${i}`} word={word} className="subtitle-word" />
          ))}
        </span>
      </p>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-[8%] left-1/2 flex -translate-x-1/2 translate-y-4 flex-col items-center gap-3 opacity-0 md:bottom-[10%]">
        <span
          className="font-sans text-[10px] uppercase tracking-[0.3em] text-fog/40"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Scroll
        </span>
        <div className="relative h-8 w-px overflow-hidden bg-fog/10">
          <div
            className="scroll-line absolute left-0 top-0 h-full w-full bg-fog/40"
            style={{
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Inline keyframe for scroll indicator */}
      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }

        .hero-title-size ~ * {
          display: none;
        }

        .hero-title {
          font-size: clamp(3rem, 10vw, 9rem);
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-line {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
