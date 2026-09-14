'use client';

import { HeroScene } from '@/components/hero/HeroScene';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <HeroScene />
      
      {/* SECTION 2 — INTRODUCTION */}
      <section className="bg-ivory px-6 py-24 md:px-12 md:py-40 text-charcoal relative overflow-hidden" aria-labelledby="intro-heading">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-stone mix-blend-multiply opacity-50 pointer-events-none -skew-x-12 translate-x-32" aria-hidden="true" />
        
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
          <div className="lg:col-span-7 reveal-up">
            <h2 id="intro-heading" className="font-serif leading-[0.9] tracking-tight">
              <span className="block text-[clamp(3rem,8vw,6rem)] text-charcoal">THE WILD,</span>
              <span className="block text-[clamp(3rem,8vw,6rem)] italic text-copper md:ml-12">ON YOUR TERMS.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 reveal-up">
            <div className="h-[1px] w-12 bg-copper mb-8 reveal-line" aria-hidden="true" />
            <p className="font-sans text-lg md:text-xl text-charcoal/80 leading-relaxed mb-10 font-light">
              No fixed circuits. No crowded schedules. We design private wildlife journeys around what you want to see, how you want to travel and how much time you want to spend in the landscape.
            </p>
            <Link 
              href="/about" 
              className="group inline-flex items-center gap-4 font-sans text-xs uppercase tracking-widest text-charcoal transition-colors hover:text-copper"
              aria-label="Read more about our approach"
            >
              <span className="border-b border-charcoal/30 pb-1 group-hover:border-copper transition-colors">Our Approach</span>
              <span className="text-lg leading-none" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3 — DESTINATIONS (Asymmetric Layout) */}
      <section className="bg-stone px-6 py-24 md:px-12 text-charcoal" aria-labelledby="destinations-heading">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 reveal-up">
            <h2 id="destinations-heading" className="font-serif text-4xl md:text-6xl max-w-2xl leading-[0.95] tracking-tight">
              PLACES THAT <br className="hidden md:block"/>
              <span className="italic text-copper">STILL FEEL WILD.</span>
            </h2>
            <Link href="/destinations" className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] hover:text-copper transition-colors">
              Explore All <span className="text-lg leading-none" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Destination 1 - Large Left */}
            <Link href="/destinations" className="lg:col-span-7 group relative block aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-void/5 reveal-up" aria-label="Explore Jawai, India">
              <Image 
                src="https://images.unsplash.com/photo-1544985361-b420d7a77043?q=80&w=2000&auto=format&fit=crop" 
                alt="Leopard resting in Jawai, India" 
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-[2s] group-hover:scale-110 opacity-90 mix-blend-multiply grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-ivory z-10 pointer-events-none">
                <div className="overflow-hidden">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] mb-3 text-copper translate-y-full group-hover:translate-y-0 transition-transform duration-500">25.1021&deg; N, 73.3181&deg; E</p>
                </div>
                <h3 className="font-serif text-4xl md:text-5xl mb-3">Jawai, India</h3>
                <p className="font-sans text-sm md:text-base text-ivory/80 font-light max-w-sm">Leopards among ancient granite hills.</p>
              </div>
            </Link>

            {/* Right Stack */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12">
              {/* Destination 2 */}
              <Link href="/destinations" className="group relative block flex-1 overflow-hidden bg-void/5 min-h-[400px] reveal-up" aria-label="Explore Maasai Mara">
                <Image 
                  src="https://images.unsplash.com/photo-1551802230-22c087b11df2?q=80&w=1500&auto=format&fit=crop" 
                  alt="Cheetahs in the Maasai Mara savannah" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-[2s] group-hover:scale-110 opacity-90 mix-blend-multiply grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 p-8 text-ivory z-10 pointer-events-none">
                  <h3 className="font-serif text-3xl mb-2">Maasai Mara</h3>
                  <p className="font-sans text-sm text-ivory/80 font-light">Predators, migration and open savannah.</p>
                </div>
              </Link>

              {/* Destination 3 */}
              <Link href="/destinations" className="group relative block flex-1 overflow-hidden bg-void/5 min-h-[400px] reveal-up" aria-label="Explore Okavango Delta">
                <Image 
                  src="https://images.unsplash.com/photo-1531208853003-c1ec1b8a81d7?q=80&w=1500&auto=format&fit=crop" 
                  alt="Elephant in the Okavango Delta" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-[2s] group-hover:scale-110 opacity-90 mix-blend-multiply grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 p-8 text-ivory z-10 pointer-events-none">
                  <h3 className="font-serif text-3xl mb-2">Okavango Delta</h3>
                  <p className="font-sans text-sm text-ivory/80 font-light">Water, wilderness and extraordinary wildlife.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SAFARI TYPES (Minimal Accordion Style List) */}
      <section className="bg-ivory px-6 py-24 md:px-12" aria-labelledby="safari-types-heading">
        <div className="mx-auto max-w-[1600px]">
          <h2 id="safari-types-heading" className="font-serif text-4xl md:text-5xl mb-16 text-charcoal reveal-up">
            HOW DO YOU <span className="italic text-copper">WANT TO GO WILD?</span>
          </h2>
          <div className="flex flex-col border-t border-charcoal/10" role="list">
            {[
              { title: "PRIVATE SAFARIS", desc: "Your vehicle, your guide, your pace." },
              { title: "PHOTOGRAPHY SAFARIS", desc: "Built around light, positioning and patience." },
              { title: "FAMILY SAFARIS", desc: "Thoughtfully paced wildlife journeys for families." },
              { title: "CONSERVATION", desc: "Travel deeper into landscapes and their stories." },
              { title: "LUXURY EXPEDITIONS", desc: "Exceptional camps, private guiding and seamless logistics." }
            ].map((safari, i) => (
              <Link 
                key={i} 
                href="/safaris" 
                role="listitem"
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-charcoal/10 hover:bg-stone/30 transition-colors px-4 -mx-4 overflow-hidden reveal-up focus:outline-none focus:ring-2 focus:ring-copper"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-copper scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" aria-hidden="true" />
                <div className="flex items-center gap-8 md:gap-16 mb-4 md:mb-0">
                  <span className="font-sans text-xs tracking-widest text-charcoal/30" aria-hidden="true">0{i + 1}</span>
                  <h3 className="font-serif text-2xl md:text-4xl text-charcoal group-hover:text-copper transition-colors tracking-tight">{safari.title}</h3>
                </div>
                <p className="font-sans text-charcoal/60 text-base md:text-lg md:text-right max-w-sm md:max-w-md font-light ml-12 md:ml-0 group-hover:text-charcoal transition-colors">{safari.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEATURED EXPERIENCE (Full Bleed Cinematic) */}
      <section className="bg-charcoal text-ivory py-32 md:py-48 px-6 md:px-12 relative overflow-hidden" aria-labelledby="experience-heading">
        <Image 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2500&auto=format&fit=crop"
          alt="Lions resting in the tall grass during a morning safari"
          fill
          sizes="100vw"
          className="object-cover object-center mix-blend-luminosity scale-105 opacity-40 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent pointer-events-none"></div>
        <div className="mx-auto max-w-[1600px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-copper mb-6 font-semibold">The Experience</p>
            <h2 id="experience-heading" className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-8">
              AT DAWN,<br />
              <span className="italic text-ivory/70">THE LANDSCAPE CHANGES.</span>
            </h2>
            <p className="font-sans text-base md:text-lg text-ivory/70 max-w-md leading-relaxed mb-12 font-light">
              A private morning safari begins before first light. Your guide reads tracks, alarm calls and movement across the landscape while the world slowly wakes.
            </p>
            
            <ul className="grid grid-cols-2 gap-y-6 gap-x-8 mb-12 font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-copper" role="list">
              <li className="border-l border-copper/30 pl-4">Private Vehicle</li>
              <li className="border-l border-copper/30 pl-4">Expert Naturalist</li>
              <li className="border-l border-copper/30 pl-4">Sunrise Departure</li>
              <li className="border-l border-copper/30 pl-4">3–4 Hours</li>
            </ul>

            <Link 
              href="/experiences" 
              className="group inline-flex h-12 items-center justify-center border border-ivory/20 px-8 font-sans text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-ivory hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-ivory"
            >
              Explore The Experience
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7 — WHY LUPA NOIR / TRUST (Editorial Layout) */}
      <section className="bg-ivory px-6 py-24 md:py-40 md:px-12 relative" aria-labelledby="trust-heading">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5 relative reveal-up">
            <h2 id="trust-heading" className="font-serif text-4xl md:text-6xl mb-16 text-charcoal leading-[0.95] tracking-tight">
              LESS TOUR.<br />
              <span className="italic text-copper">MORE WILDERNESS.</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-y-16 gap-x-8 font-serif text-charcoal">
              {[
                { val: "100%", lbl: "Private Safaris" },
                { val: "LOCAL", lbl: "Expert Guides" },
                { val: "TAILORED", lbl: "Every Journey" },
                { val: "24/7", lbl: "Trip Support" }
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-2 h-12 w-[1px] bg-copper/30 reveal-line" aria-hidden="true" />
                  <span className="block text-4xl md:text-5xl mb-2 text-charcoal">{stat.val}</span>
                  <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-charcoal/50">{stat.lbl}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-12 lg:gap-16 pt-8 lg:pt-0">
            {[
              { title: "Private by design", desc: "Every safari is built around you rather than a fixed group itinerary. Absolute freedom to explore." },
              { title: "Local expertise", desc: "Guides who understand the landscape, wildlife behaviour and seasons on an intimate, local level." },
              { title: "Thoughtful luxury", desc: "Comfort where it matters, providing exceptional service without separating you from the environment." },
              { title: "Clear planning", desc: "Transparent itineraries, expectations and costs before you travel. No surprises." }
            ].map((point, i) => (
              <div key={i} className="reveal-up">
                <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-4 flex items-center gap-4">
                  <span className="text-copper text-sm" aria-hidden="true">0{i+1}</span> {point.title}
                </h3>
                <p className="font-sans text-charcoal/70 font-light leading-relaxed pl-8 md:pl-10">{point.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9 — RESPONSIBLE WILDLIFE (Statement) */}
      <section className="bg-stone px-6 py-32 md:py-48 md:px-12 text-center relative overflow-hidden" aria-labelledby="responsible-heading">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none" aria-hidden="true">
          <span className="font-serif text-[18vw] leading-none whitespace-nowrap text-charcoal tracking-tight">THEOMEDIA UK</span>
        </div>
        <div className="mx-auto max-w-4xl relative z-10 reveal-up">
          <div className="w-px h-16 bg-copper mx-auto mb-12 reveal-line" aria-hidden="true" />
          <h2 id="responsible-heading" className="font-serif text-3xl md:text-5xl text-charcoal leading-[1.1] mb-12 tracking-tight">
            THE SIGHTING IS NEVER WORTH<br />
            <span className="italic text-copper">DISTURBING THE ANIMAL.</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto font-light">
            Wildlife is unpredictable. That is part of what makes it extraordinary. Our guides prioritise respectful distances, responsible positioning and the welfare of wildlife over getting a photograph at any cost.
          </p>
        </div>
      </section>

      {/* SECTION 11 — JOURNAL */}
      <section className="bg-ivory px-6 py-24 md:py-40 md:px-12" aria-labelledby="journal-heading">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-end justify-between mb-16 md:mb-24 reveal-up">
            <h2 id="journal-heading" className="font-serif text-4xl md:text-6xl text-charcoal tracking-tight">
              FIELD <span className="italic text-copper">NOTES</span>
            </h2>
            <Link href="/journal" className="hidden md:inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 hover:text-copper transition-colors pb-2 border-b border-transparent hover:border-copper">
              Read All Articles <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: "When is the best time for a wildlife safari?", cat: "Guide" },
              { title: "Why private safaris change the experience", cat: "Opinion" },
              { title: "Understanding wildlife behaviour without disturbing it", cat: "Conservation" }
            ].map((article, i) => (
              <Link href="/journal" key={i} className="group block reveal-up" aria-label={`Read article: ${article.title}`}>
                <div className="aspect-[4/3] bg-stone mb-8 overflow-hidden relative">
                  <div className="w-full h-full bg-charcoal/5 transition-transform duration-[2s] group-hover:scale-105 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/10 transition-colors duration-500 pointer-events-none"></div>
                </div>
                <div className="flex flex-col">
                  <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-copper mb-4 font-semibold">{article.cat}</span>
                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-copper transition-colors leading-snug">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 — PLAN YOUR SAFARI (Luxury Form - Accessible) */}
      <section className="bg-charcoal text-ivory px-6 py-24 md:py-40 md:px-12 border-b border-ivory/5" aria-labelledby="plan-heading" id="plan-safari">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5 reveal-up">
            <h2 id="plan-heading" className="font-serif text-4xl md:text-6xl leading-[0.9] tracking-tight mb-8">
              WHERE DO YOU<br />
              <span className="italic text-copper">WANT TO GO?</span>
            </h2>
            <p className="font-sans text-base md:text-lg text-ivory/60 max-w-sm mb-16 font-light">
              No obligation. No automated itinerary. A real person will reply to discuss your ultimate wildlife journey.
            </p>
            <div className="flex flex-col gap-6 font-sans text-xs tracking-widest uppercase text-ivory/40">
              <a href="mailto:enquiries@lupanoir.com" className="hover:text-copper transition-colors w-fit focus:outline-none focus:text-copper">enquiries@lupanoir.com</a>
              <a href="tel:+447700900077" className="hover:text-copper transition-colors w-fit focus:outline-none focus:text-copper">+44 (0) 7700 900077</a>
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-ivory/5 p-8 md:p-16 reveal-up">
            <form className="flex flex-col gap-10" aria-label="Safari Enquiry Form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group flex flex-col">
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input id="name" type="text" name="name" placeholder="Name" required className="w-full bg-transparent border-b border-ivory/20 pb-4 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-copper font-sans text-sm rounded-none transition-colors" />
                </div>
                <div className="relative group flex flex-col">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input id="email" type="email" name="email" placeholder="Email" required className="w-full bg-transparent border-b border-ivory/20 pb-4 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-copper font-sans text-sm rounded-none transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group flex flex-col">
                  <label htmlFor="phone" className="sr-only">Phone or WhatsApp</label>
                  <input id="phone" type="tel" name="phone" placeholder="Phone / WhatsApp" className="w-full bg-transparent border-b border-ivory/20 pb-4 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-copper font-sans text-sm rounded-none transition-colors" />
                </div>
                <div className="relative group flex flex-col">
                  <label htmlFor="country" className="sr-only">Country of Residence</label>
                  <input id="country" type="text" name="country" placeholder="Country" className="w-full bg-transparent border-b border-ivory/20 pb-4 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-copper font-sans text-sm rounded-none transition-colors" />
                </div>
              </div>
              
              <div className="relative group flex flex-col">
                <label htmlFor="destination" className="sr-only">Destination Interest</label>
                <input id="destination" type="text" name="destination" placeholder="Destination Interest (e.g. Jawai, Serengeti)" className="w-full bg-transparent border-b border-ivory/20 pb-4 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-copper font-sans text-sm rounded-none transition-colors" />
              </div>
              
              <div className="relative group flex flex-col">
                <label htmlFor="message" className="sr-only">Tell us about your ideal safari</label>
                <textarea id="message" name="message" placeholder="Tell us about your ideal safari... (Travel dates, number of people, specific interests)" rows={3} required className="w-full bg-transparent border-b border-ivory/20 pb-4 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-copper font-sans text-sm resize-none rounded-none transition-colors"></textarea>
              </div>
              
              <div className="pt-4">
                <button type="submit" className="inline-flex h-14 w-full md:w-auto items-center justify-center bg-copper px-10 font-sans text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-ivory hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-ivory focus:ring-offset-2 focus:ring-offset-charcoal">
                  Start Planning
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </section>
    </>
  );
}
