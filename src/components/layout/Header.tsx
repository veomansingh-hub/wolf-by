'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSound } from '@/components/providers/SoundProvider';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMuted, toggleSound } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  // Determine header styles based on scroll state and menu state
  const isDarkBg = menuOpen || (!scrolled && false /* If hero is dark, but hero is light video here */);
  
  return (
    <>
      <header
        className={`fixed top-0 z-[60] w-full transition-all duration-500 ${
          menuOpen 
            ? 'bg-transparent text-ivory py-6 md:py-8' 
            : scrolled
              ? 'bg-ivory/80 backdrop-blur-md border-b border-charcoal/5 py-4 text-charcoal'
              : 'bg-transparent py-6 md:py-8 text-charcoal'
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
          
          {/* LEFT: Logo */}
          <Link href="/" className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-copper" onClick={() => setMenuOpen(false)}>
            <span className="font-serif text-xl md:text-2xl tracking-widest uppercase leading-none">
              Lupa Noir
            </span>
            <span className={`font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase mt-1 transition-opacity ${menuOpen ? 'text-copper' : 'text-charcoal/50 group-hover:text-copper'}`}>
              Wildlife Expeditions
            </span>
          </Link>

          {/* CENTER: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 font-sans text-[10px] uppercase tracking-[0.2em]" aria-label="Main Navigation">
            {['Destinations', 'Safaris', 'Experiences', 'About', 'Journal'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`} 
                className="relative overflow-hidden group py-2 focus:outline-none focus:text-copper"
              >
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                <span className="absolute inset-0 flex items-center transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-copper">{item}</span>
              </Link>
            ))}
          </nav>

          {/* RIGHT: CTAs & Sound & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleSound}
              className={`hidden md:flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors focus:outline-none ${menuOpen ? 'hover:text-copper' : 'hover:text-copper'}`}
              aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
            >
              Sound <span className="w-8">{isMuted ? 'Off' : 'On'}</span>
            </button>
            <Link
              href="/plan"
              className={`hidden md:flex items-center justify-center border px-6 h-12 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                menuOpen
                  ? 'border-ivory/30 hover:bg-ivory hover:text-charcoal'
                  : scrolled
                    ? 'border-charcoal/20 hover:bg-charcoal hover:text-ivory'
                    : 'border-charcoal hover:bg-charcoal hover:text-ivory'
              }`}
            >
              Plan Your Safari
            </Link>

            {/* Mobile controls */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-[1px] transition-all duration-300 ${menuOpen ? 'bg-ivory rotate-45 translate-y-[1px]' : 'bg-current -translate-y-1'}`} />
              <span className={`block w-6 h-[1px] transition-all duration-300 ${menuOpen ? 'bg-ivory -rotate-45 -translate-y-[0px]' : 'bg-current translate-y-1'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-charcoal text-ivory transition-transform duration-700 ease-in-out lg:hidden ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-8 font-serif text-4xl">
          {['Destinations', 'Safaris', 'Experiences', 'About', 'Journal'].map((item, i) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              onClick={() => setMenuOpen(false)}
              className={`transform transition-all duration-500 delay-${i * 100} ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} hover:text-copper focus:outline-none focus:text-copper`}
            >
              {item}
            </Link>
          ))}
          <Link 
            href="/plan" 
            onClick={() => setMenuOpen(false)} 
            className={`font-sans text-[10px] uppercase tracking-[0.3em] text-copper mt-8 border-b border-copper/30 pb-2 transform transition-all duration-500 delay-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} focus:outline-none`}
          >
            Start Planning &rarr;
          </Link>
        </nav>
        
        <div className={`p-8 flex justify-between items-end border-t border-ivory/10 transform transition-all duration-700 delay-700 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex flex-col gap-2 font-sans text-[10px] uppercase tracking-widest text-ivory/50">
            <a href="mailto:enquiries@lupanoir.com" className="hover:text-copper">enquiries@lupanoir.com</a>
          </div>
          <button
            onClick={toggleSound}
            className="font-sans text-[10px] uppercase tracking-widest text-copper"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            Sound {isMuted ? 'Off' : 'On'}
          </button>
        </div>
      </div>
    </>
  );
}
