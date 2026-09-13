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

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 text-charcoal ${
          scrolled
            ? 'bg-ivory/80 backdrop-blur-md border-b border-charcoal/5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
          
          {/* LEFT: Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-lg tracking-widest uppercase">
              Lupa Noir
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity">
              Wildlife Expeditions
            </span>
          </Link>

          {/* CENTER: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 font-sans text-xs uppercase tracking-widest">
            <Link href="/destinations" className="hover:opacity-70 transition-opacity">Destinations</Link>
            <Link href="/safaris" className="hover:opacity-70 transition-opacity">Safaris</Link>
            <Link href="/experiences" className="hover:opacity-70 transition-opacity">Experiences</Link>
            <Link href="/about" className="hover:opacity-70 transition-opacity">Our Story</Link>
            <Link href="/journal" className="hover:opacity-70 transition-opacity">Journal</Link>
          </nav>

          {/* RIGHT: CTAs & Sound & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleSound}
              className="hidden md:block font-sans text-[10px] uppercase tracking-widest hover:opacity-70 transition-opacity"
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
              Sound {isMuted ? 'Off' : 'On'}
            </button>
            <Link
              href="/plan"
              className={`hidden md:block border px-5 py-2.5 font-sans text-xs uppercase tracking-widest transition-colors ${
                scrolled
                  ? 'border-charcoal hover:bg-charcoal hover:text-ivory'
                  : 'border-bone hover:bg-bone hover:text-void'
              }`}
            >
              Plan Your Safari
            </Link>

            {/* Mobile controls */}
            <button
              onClick={toggleSound}
              className="md:hidden font-sans text-[10px] uppercase tracking-widest"
              aria-label="Toggle Sound"
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="font-sans text-xs uppercase tracking-widest lg:hidden"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-charcoal text-bone transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-8 font-serif text-3xl">
          <Link href="/destinations" onClick={() => setMenuOpen(false)}>Destinations</Link>
          <Link href="/safaris" onClick={() => setMenuOpen(false)}>Safaris</Link>
          <Link href="/experiences" onClick={() => setMenuOpen(false)}>Experiences</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>Our Story</Link>
          <Link href="/journal" onClick={() => setMenuOpen(false)}>Journal</Link>
          <Link href="/plan" onClick={() => setMenuOpen(false)} className="text-copper mt-8">
            Plan Your Safari
          </Link>
        </div>
      </div>
    </>
  );
}
