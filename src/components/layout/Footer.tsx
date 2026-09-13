import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-charcoal text-bone px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-stone/20 pb-20">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl tracking-widest uppercase mb-2">
              Lupa Noir
            </h2>
            <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-70 mb-8">
              Wildlife Expeditions
            </h3>
            <p className="font-serif italic text-fog/80 max-w-sm" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              Private journeys into the world's untamed places.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-8">Explore</h4>
            <nav className="flex flex-col gap-4 font-sans text-sm text-fog hover:[&>a]:text-bone [&>a]:transition-colors">
              <Link href="/destinations">Destinations</Link>
              <Link href="/safaris">Safaris</Link>
              <Link href="/experiences">Experiences</Link>
              <Link href="/about">About</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-8">Information</h4>
            <nav className="flex flex-col gap-4 font-sans text-sm text-fog hover:[&>a]:text-bone [&>a]:transition-colors mb-12">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/cookies">Cookies</Link>
            </nav>

            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-8">Connect</h4>
            <div className="flex flex-col gap-4 font-sans text-sm text-fog">
              <a href="mailto:enquiries@lupanoir.com" className="hover:text-bone transition-colors">email</a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">WhatsApp</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-xs text-fog/50">
            &copy; {new Date().getFullYear()} Lupa Noir. All rights reserved.
          </p>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ember/90">
            Wild by Nature.
          </p>
        </div>
      </div>
    </footer>
  );
}
