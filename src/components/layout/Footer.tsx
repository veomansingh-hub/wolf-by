import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-24 pb-12 px-6 md:px-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-[1600px]">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-block mb-8 focus:outline-none focus:ring-2 focus:ring-copper" aria-label="Lupa Noir Home">
              <span className="font-serif text-3xl tracking-widest text-ivory">LUPA NOIR</span>
              <span className="block font-sans text-[8px] uppercase tracking-[0.3em] text-copper mt-2">Wildlife Expeditions</span>
            </Link>
            <p className="font-sans text-sm text-ivory/60 max-w-sm leading-relaxed font-light mb-8">
              Private journeys into the world's untamed places. We design exceptional wildlife encounters for those who seek the extraordinary.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4" aria-label="Footer Navigation - Explore">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-copper mb-4 font-semibold">Explore</h3>
            <Link href="/destinations" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Destinations</Link>
            <Link href="/safaris" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Safari Types</Link>
            <Link href="/experiences" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Experiences</Link>
            <Link href="/journal" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Journal</Link>
          </nav>

          <nav className="lg:col-span-2 flex flex-col gap-4" aria-label="Footer Navigation - Company">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-copper mb-4 font-semibold">Company</h3>
            <Link href="/about" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Our Story</Link>
            <Link href="/contact" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Contact</Link>
            <Link href="/terms" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Terms & Conditions</Link>
            <Link href="/privacy" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">Privacy Policy</Link>
          </nav>

          <address className="lg:col-span-2 flex flex-col gap-4 not-italic">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-copper mb-4 font-semibold">Enquiries</h3>
            <a href="mailto:enquiries@lupanoir.com" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">enquiries@lupanoir.com</a>
            <a href="tel:+447700900077" className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors w-fit focus:outline-none focus:text-ivory">+44 (0) 7700 900077</a>
            <span className="font-sans text-sm text-ivory/50 mt-4 block leading-relaxed">
              London, United Kingdom<br />
              Available 24/7 Worldwide
            </span>
          </address>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-ivory/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8">
            <p className="font-sans text-[10px] text-ivory/40 tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Lupa Noir.
            </p>
            <a href="mailto:contact@theomedia.co.uk?subject=Website%20Design%20Enquiry%20(Lupa%20Noir%20Concept)" className="font-sans text-[10px] text-ivory/40 hover:text-copper transition-colors tracking-widest uppercase focus:outline-none focus:text-copper">
              Design concept by Theomedia UK
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/50 hover:text-copper transition-colors focus:outline-none focus:text-copper" aria-label="Instagram">Instagram</a>
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/50 hover:text-copper transition-colors focus:outline-none focus:text-copper" aria-label="Journal">Journal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
