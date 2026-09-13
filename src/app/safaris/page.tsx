import Link from 'next/link';

export default function Safaris() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen pt-32 md:pt-48 pb-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-24">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-copper mb-4">Safaris</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">SAFARI TYPES</h1>
          <p className="font-sans text-xl text-charcoal/70 max-w-2xl leading-relaxed">
            Every journey we create is entirely bespoke, but they generally fall into five core styles of travel.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-16 border-t border-charcoal/10 pt-16">
          {[
            { title: "PRIVATE SAFARIS", desc: "The ultimate freedom. Your own vehicle, your own guide, and absolute control over the pace of your day. Stay out all day or return for lunch—it's entirely up to you." },
            { title: "PHOTOGRAPHY SAFARIS", desc: "Guided by specialist photographic guides who understand light, positioning, and animal behaviour to help you capture extraordinary images." },
            { title: "FAMILY SAFARIS", desc: "Thoughtfully paced journeys designed to engage younger travellers while providing an unforgettable experience for adults, using exclusive-use properties." },
            { title: "CONSERVATION JOURNEYS", desc: "Travel deeper into the landscapes and the stories of the people protecting them, with exclusive access to research projects." },
            { title: "LUXURY EXPEDITIONS", desc: "Exceptional remote camps, seamless logistics, and the highest standards of guiding, delivering absolute comfort in the deep wilderness." }
          ].map((type, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <h2 className="font-serif text-3xl md:text-4xl md:w-1/3">{type.title}</h2>
              <div className="md:w-2/3">
                <p className="font-sans text-lg text-charcoal/70 leading-relaxed mb-6 max-w-2xl">{type.desc}</p>
                <Link href="/plan" className="font-sans text-[10px] tracking-[0.2em] uppercase text-copper hover:text-charcoal transition-colors">Enquire About This Safari &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
