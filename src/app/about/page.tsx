export default function About() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen pt-32 md:pt-48 pb-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-copper mb-4">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">WILD BY NATURE.</h1>
          <div className="space-y-6 font-sans text-lg text-charcoal/70 max-w-xl leading-relaxed">
            <p>Lupa Noir was founded on a simple principle: the best wildlife encounters happen when you are completely on your own schedule.</p>
            <p>We reject the rigid itineraries of traditional group tours. Instead, we design private expeditions for those who want to immerse themselves in the wilderness without feeling rushed, crowded, or managed.</p>
            <p>Our guides are local experts—trackers and naturalists who read the landscape like a book. We partner with small, sustainable lodges that prioritize the environment over volume.</p>
          </div>
        </div>
        <div className="aspect-square bg-stone relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547471080-7fc2caa6f17f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-80 grayscale"></div>
        </div>
      </div>
    </main>
  );
}
