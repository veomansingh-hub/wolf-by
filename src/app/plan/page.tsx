export default function Plan() {
  return (
    <main className="bg-ivory text-charcoal min-h-screen pt-32 md:pt-48 pb-32 px-6 md:px-12">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8">
            START YOUR<br />
            <span className="italic text-copper">JOURNEY.</span>
          </h1>
          <p className="font-sans text-lg text-charcoal/70 max-w-md mb-12">
            Share a few details about what you're looking for, and one of our specialists will be in touch to begin designing your private expedition.
          </p>
          <div className="flex flex-col gap-4 font-sans text-sm text-charcoal/50">
            <p>Email: enquiries@lupanoir.com</p>
            <p>WhatsApp: +44 (0) 7700 900077</p>
          </div>
        </div>
        
        <div className="bg-stone p-8 md:p-12">
          <form className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-charcoal/30 pb-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-copper font-sans rounded-none" />
              <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-charcoal/30 pb-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-copper font-sans rounded-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="tel" placeholder="WhatsApp / Phone" className="w-full bg-transparent border-b border-charcoal/30 pb-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-copper font-sans rounded-none" />
              <input type="text" placeholder="Country" className="w-full bg-transparent border-b border-charcoal/30 pb-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-copper font-sans rounded-none" />
            </div>
            <textarea placeholder="Tell us about your ideal safari..." rows={4} className="w-full bg-transparent border-b border-charcoal/30 pb-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-copper font-sans resize-none rounded-none"></textarea>
            <button type="button" className="inline-flex h-12 w-full md:w-auto items-center justify-center bg-charcoal px-8 font-sans text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-copper mt-4">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
