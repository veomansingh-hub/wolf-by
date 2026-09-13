import { HeroScene } from '@/components/hero/HeroScene';

export default function Home() {
  return (
    <>
      <HeroScene />
      
      {/* 
        Temporary spacer to demonstrate the transition from 
        the cinematic dark hero to the luxury ivory editorial site.
        Will be replaced by Section 2 (Introduction).
      */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-ivory">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-serif italic text-charcoal/50 text-xl">
            Section 2 (Introduction) will begin here...
          </p>
        </div>
      </section>
    </>
  );
}
