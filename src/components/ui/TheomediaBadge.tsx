'use client';

import { useEffect, useState } from 'react';

export function TheomediaBadge() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show badge after scrolling past the hero (roughly 400px)
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case they start further down
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a 
      href="mailto:contact@theomedia.co.uk?subject=Website%20Design%20Enquiry%20(Lupa%20Noir%20Concept)"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex items-center gap-4 overflow-hidden rounded-full border border-charcoal/10 bg-ivory/95 backdrop-blur-md px-5 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-700 hover:border-copper group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
      aria-label="Contact Theomedia UK"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-copper"></span>
      </span>
      <div className="flex flex-col">
        <span className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal group-hover:text-copper transition-colors">
          Theomedia UK
        </span>
        <span className="font-sans text-[7px] md:text-[8px] uppercase tracking-widest text-charcoal/50">
          Available for hire
        </span>
      </div>
    </a>
  );
}
