export default function Destinations() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen pt-32 md:pt-48 pb-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-24">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-copper mb-4">Explore</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">DESTINATIONS</h1>
          <p className="font-sans text-xl text-charcoal/70 max-w-2xl leading-relaxed">
            From the endless plains of the Serengeti to the leopard-inhabited granite hills of Jawai. We design journeys to places that still feel wild.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Destination 1 */}
          <div className="group relative block aspect-[4/3] overflow-hidden bg-void/5 cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547471080-7fc2caa6f17f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-ivory">
              <h3 className="font-serif text-3xl mb-2">Jawai, India</h3>
              <p className="font-sans text-sm text-ivory/80">Leopards among ancient granite hills</p>
            </div>
          </div>
          
          {/* Destination 2 */}
          <div className="group relative block aspect-[4/3] overflow-hidden bg-void/5 cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-ivory">
              <h3 className="font-serif text-3xl mb-2">Maasai Mara, Kenya</h3>
              <p className="font-sans text-sm text-ivory/80">Predators, migration and open savannah</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
