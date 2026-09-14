'use client';

import { useState, useEffect, useRef } from 'react';

export function TheoMediaContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Show badge after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
      if (window.scrollY <= 100 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={menuRef}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      {/* Interactive Popover Menu */}
      <div 
        className={`absolute bottom-full right-0 mb-4 flex flex-col gap-1 overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory/95 backdrop-blur-xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-400 origin-bottom-right w-[220px] ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <span className="font-sans text-[8px] uppercase tracking-widest text-charcoal/40 mb-3 border-b border-charcoal/5 pb-3">
          Contact Studio
        </span>
        <a 
          href="https://www.theomedia.co.uk" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal hover:text-copper transition-colors py-2 flex items-center justify-between group"
        >
          Visit Website <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
        </a>
        <a 
          href="https://wa.me/353852258004" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal hover:text-copper transition-colors py-2 flex items-center justify-between group"
        >
          WhatsApp <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
        </a>
        <a 
          href="tel:+353852258004" 
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal hover:text-copper transition-colors py-2 flex items-center justify-between group"
        >
          Call Studio <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">&rarr;</span>
        </a>
      </div>

      {/* Floating Pill Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-4 overflow-hidden rounded-full border px-6 py-3.5 shadow-xl transition-all duration-400 group ${
          isOpen 
            ? 'bg-charcoal text-ivory border-charcoal' 
            : 'bg-ivory/95 text-charcoal border-charcoal/10 hover:border-copper backdrop-blur-md'
        }`}
        aria-label="Contact TheoMedia"
        aria-expanded={isOpen}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isOpen ? 'bg-ivory' : 'bg-copper'}`}></span>
          <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? 'bg-ivory' : 'bg-copper'}`}></span>
        </span>
        <div className="flex flex-col items-start text-left">
          <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isOpen ? 'text-ivory' : 'text-charcoal group-hover:text-copper'}`}>
            Built by TheoMedia
          </span>
          <span className={`font-sans text-[7px] uppercase tracking-widest transition-colors ${isOpen ? 'text-ivory/60' : 'text-charcoal/40'}`}>
            {isOpen ? 'Close Menu' : 'Contact Studio'}
          </span>
        </div>
      </button>
    </div>
  );
}
