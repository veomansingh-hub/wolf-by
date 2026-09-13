import { HeroScene } from '@/components/hero/HeroScene';

/**
 * Home page — Phase 1
 * 
 * Currently only the hero scene.
 * After the hero, a spacer section provides visual breathing room
 * and confirms the scroll-driven animations release properly.
 */
export default function Home() {
  return (
    <main>
      <HeroScene />
      
      {/* Spacer section — confirms pin releases cleanly */}
      <section className="relative flex min-h-screen items-center justify-center bg-void">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p
            className="hero-subtitle text-fog/30"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            The journey continues...
          </p>
        </div>
      </section>
    </main>
  );
}
