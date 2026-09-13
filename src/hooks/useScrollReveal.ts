'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap-register';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useScrollReveal() {
  useEffect(() => {
    // Only run on desktop/larger screens where we can ensure smooth performance
    // or run everywhere but keep it subtle.
    const elements = document.querySelectorAll('.reveal-up');
    
    elements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    const lines = document.querySelectorAll('.reveal-line');
    lines.forEach((el) => {
      gsap.fromTo(el, 
        { scaleX: 0, transformOrigin: 'left' },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
