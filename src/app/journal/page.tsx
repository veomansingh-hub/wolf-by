import Link from 'next/link';

export default function Journal() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen pt-32 md:pt-48 pb-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-24">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-copper mb-4">Journal</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">FIELD NOTES</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { title: "When is the best time for a wildlife safari?", cat: "Guide" },
            { title: "Why private safaris change the experience", cat: "Opinion" },
            { title: "Understanding wildlife behaviour without disturbing it", cat: "Conservation" },
            { title: "What to pack for a photography expedition", cat: "Gear" },
            { title: "The landscapes behind the animals", cat: "Editorial" },
            { title: "A morning with the leopards of Jawai", cat: "Field Report" }
          ].map((article, i) => (
            <Link href="#" key={i} className="group block cursor-pointer">
              <div className="aspect-[4/3] bg-charcoal/5 mb-6 overflow-hidden">
                 <div className="w-full h-full bg-void/5 transition-transform duration-700 group-hover:scale-105"></div>
              </div>
              <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-copper mb-3">{article.cat}</span>
              <h3 className="font-serif text-2xl text-charcoal group-hover:text-copper transition-colors leading-snug">{article.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
