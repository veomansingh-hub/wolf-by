import { HeroScene } from '@/components/hero/HeroScene';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HeroScene />
      
      {/* SECTION 2 — INTRODUCTION */}
      <section className="bg-ivory px-6 py-20 md:py-32 md:px-12 md:py-32 text-charcoal">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div>
            <h2 
              className="font-serif leading-[1.1] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              THE WILD,<br />
              <span className="italic text-charcoal/70">ON YOUR TERMS.</span>
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed mb-10">
              No fixed circuits. No crowded schedules. We design private wildlife journeys around what you want to see, how you want to travel and how much time you want to spend in the landscape.
            </p>
            <Link 
              href="/about" 
              className="inline-flex h-12 items-center justify-center border border-charcoal px-8 font-sans text-xs uppercase tracking-widest text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
            >
              Our Approach
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3 — DESTINATIONS */}
      <section className="bg-stone px-6 py-20 md:py-32 md:px-12 text-charcoal">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-serif text-3xl md:text-5xl mb-16 max-w-2xl">
            PLACES THAT <span className="italic">STILL FEEL WILD.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Destination 1 */}
            <Link href="/destinations" className="group relative block aspect-[4/5] overflow-hidden bg-void/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547471080-7fc2caa6f17f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-multiply grayscale hover:grayscale-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-ivory">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] mb-2 text-ivory/70">25.1021° N, 73.3181° E</p>
                <h3 className="font-serif text-3xl mb-2">Jawai, India</h3>
                <p className="font-sans text-sm text-ivory/80">Leopards among ancient granite hills</p>
              </div>
            </Link>

            {/* Destination 2 */}
            <Link href="/destinations" className="group relative block aspect-[4/5] overflow-hidden bg-void/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-multiply grayscale hover:grayscale-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-ivory">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] mb-2 text-ivory/70">1.4061° S, 34.9556° E</p>
                <h3 className="font-serif text-3xl mb-2">Maasai Mara</h3>
                <p className="font-sans text-sm text-ivory/80">Predators, migration and open savannah</p>
              </div>
            </Link>

            {/* Destination 3 */}
            <Link href="/destinations" className="group relative block aspect-[4/5] overflow-hidden bg-void/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579298418047-920f3ee824c0?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-multiply grayscale hover:grayscale-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-ivory">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] mb-2 text-ivory/70">19.2796° S, 22.8228° E</p>
                <h3 className="font-serif text-3xl mb-2">Okavango Delta</h3>
                <p className="font-sans text-sm text-ivory/80">Water, wilderness and extraordinary wildlife</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SAFARI TYPES */}
      <section className="bg-ivory px-6 py-20 md:py-32 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-serif text-3xl md:text-5xl mb-16 text-charcoal">
            HOW DO YOU <span className="italic">WANT TO GO WILD?</span>
          </h2>
          <div className="flex flex-col border-t border-charcoal/20">
            {[
              { title: "PRIVATE SAFARIS", desc: "Your vehicle, your guide, your pace." },
              { title: "PHOTOGRAPHY SAFARIS", desc: "Built around light, positioning and patience." },
              { title: "FAMILY SAFARIS", desc: "Thoughtfully paced wildlife journeys for families." },
              { title: "CONSERVATION JOURNEYS", desc: "Travel deeper into landscapes and their stories." },
              { title: "LUXURY EXPEDITIONS", desc: "Exceptional camps, private guiding and seamless logistics." }
            ].map((safari, i) => (
              <Link 
                key={i} 
                href="/safaris" 
                className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-charcoal/20 hover:bg-stone/50 transition-colors px-4 -mx-4"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 md:mb-0 group-hover:text-copper transition-colors">{safari.title}</h3>
                <p className="font-sans text-charcoal/70 text-lg md:text-right max-w-md">{safari.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEATURED EXPERIENCE */}
      <section className="bg-void text-ivory py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1502472581566-8a9d18b2c451?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-transparent"></div>
        <div className="mx-auto max-w-[1600px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-7xl leading-none mb-8">
              AT DAWN,<br />
              <span className="italic text-fog">THE LANDSCAPE CHANGES.</span>
            </h2>
            <p className="font-sans text-lg text-fog/90 max-w-lg leading-relaxed mb-10">
              A private morning safari begins before first light. Your guide reads tracks, alarm calls and movement across the landscape while the world slowly wakes.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 font-sans text-[10px] tracking-[0.2em] uppercase text-copper">
              <span>Private Vehicle</span>
              <span>Expert Naturalist</span>
              <span>Sunrise Departure</span>
              <span>3–4 Hours</span>
            </div>
            <Link 
              href="/experiences" 
              className="inline-flex h-12 items-center justify-center border border-ivory/30 px-8 font-sans text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-ivory hover:text-void"
            >
              Explore The Experience
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7 — WHY LUPA NOIR / TRUST */}
      <section className="bg-ivory px-6 py-20 md:py-32 md:px-12">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-5xl mb-12 text-charcoal leading-tight">
              LESS TOUR.<br />
              <span className="italic">MORE WILDERNESS.</span>
            </h2>
            <div className="grid grid-cols-2 gap-12 font-serif text-charcoal">
              <div>
                <span className="block text-3xl md:text-5xl mb-2">100%</span>
                <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60">Private Safaris</span>
              </div>
              <div>
                <span className="block text-3xl md:text-5xl mb-2">LOCAL</span>
                <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60">Expert Guides</span>
              </div>
              <div>
                <span className="block text-3xl md:text-5xl mb-2">TAILORED</span>
                <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60">Every Journey</span>
              </div>
              <div>
                <span className="block text-3xl md:text-5xl mb-2">24/7</span>
                <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60">Trip Support</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-12">
            {[
              { title: "Private by design", desc: "Every safari is built around you rather than a fixed group itinerary." },
              { title: "Local expertise", desc: "Guides who understand the landscape, wildlife behaviour and seasons." },
              { title: "Thoughtful luxury", desc: "Comfort where it matters, without separating you from the environment." },
              { title: "Clear planning", desc: "Transparent itineraries, expectations and costs before you travel." }
            ].map((point, i) => (
              <div key={i}>
                <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3">{point.title}</h3>
                <p className="font-sans text-charcoal/70">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — RESPONSIBLE WILDLIFE */}
      <section className="bg-stone px-6 py-20 md:py-32 md:px-12 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-10">
            THE SIGHTING IS NEVER WORTH<br />
            <span className="italic">DISTURBING THE ANIMAL.</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
            Wildlife is unpredictable. That is part of what makes it extraordinary. Our guides prioritise respectful distances, responsible positioning and the welfare of wildlife over getting a photograph at any cost.
          </p>
        </div>
      </section>

      {/* SECTION 11 — JOURNAL */}
      <section className="bg-ivory px-6 py-20 md:py-32 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal">
              FIELD NOTES
            </h2>
            <Link href="/journal" className="hidden md:inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-copper hover:text-charcoal transition-colors">
              Read All Articles &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "When is the best time for a wildlife safari?", cat: "Guide" },
              { title: "Why private safaris change the experience", cat: "Opinion" },
              { title: "Understanding wildlife behaviour without disturbing it", cat: "Conservation" }
            ].map((article, i) => (
              <Link href="/journal" key={i} className="group block">
                <div className="aspect-[4/3] bg-charcoal/10 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-void/5 transition-transform duration-700 group-hover:scale-105"></div>
                </div>
                <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-copper mb-3">{article.cat}</span>
                <h3 className="font-serif text-2xl text-charcoal group-hover:text-copper transition-colors leading-snug">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 — PLAN YOUR SAFARI */}
      <section className="bg-charcoal text-ivory px-6 py-20 md:py-32 md:px-12 border-b border-ivory/10">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-4xl md:text-7xl leading-[1.1] mb-8">
              WHERE DO YOU<br />
              <span className="italic text-copper">WANT TO GO?</span>
            </h2>
            <p className="font-sans text-lg text-ivory/70 max-w-md mb-12">
              No obligation. No automated itinerary. A real person will reply to discuss your ultimate wildlife journey.
            </p>
            <div className="flex flex-col gap-4 font-sans text-sm text-ivory/50">
              <p>Email: enquiries@lupanoir.com</p>
              <p>WhatsApp: +44 (0) 7700 900077</p>
            </div>
          </div>
          
          <div className="bg-ivory/5 p-8 md:p-12">
            <form className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans rounded-none" />
                <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans rounded-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="tel" placeholder="WhatsApp / Phone" className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans rounded-none" />
                <input type="text" placeholder="Country" className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans rounded-none" />
              </div>
              <input type="text" placeholder="Destination Interest" className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans rounded-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Approximate Dates" className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans rounded-none" />
                <input type="number" placeholder="Travellers" className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans rounded-none" />
              </div>
              <textarea placeholder="Tell us about your ideal safari..." rows={4} className="w-full bg-transparent border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-copper font-sans resize-none rounded-none"></textarea>
              <button type="button" className="inline-flex h-12 w-full md:w-auto items-center justify-center bg-copper px-8 font-sans text-xs uppercase tracking-widest text-void transition-colors hover:bg-ivory mt-4">
                Start Planning
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
