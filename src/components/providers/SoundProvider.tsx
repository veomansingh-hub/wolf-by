'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleSound: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // We only create the audio object on the client
    const audio = new Audio('/audio/ambient.ogg');
    audio.loop = true;
    audio.volume = 0; // start silent
    audioRef.current = audio;

    // Check previous preference
    const saved = localStorage.getItem('lupa-sound-muted');
    if (saved === 'false') {
      // NOTE: Browsers often block autoplay with sound unless there was interaction.
      // We start muted in UI by default to be safe and let user explicitly click if it's their first time,
      // but if we are returning and it was false, we could try playing. To be totally safe and luxury:
      // We will require explicit interaction to start sound on every visit to avoid jarring the user,
      // or we can attempt to play and if it fails, fallback to muted. 
      // A premium site never blasts audio.
      setIsMuted(true); 
    }
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('lupa-sound-muted', String(newMuted));

    if (!newMuted) {
      audioRef.current.play().catch((e) => {
        console.warn('Audio play failed (browser restriction):', e);
        setIsMuted(true);
      });
      // Fade in (0 to 0.25 over 1.5s)
      let vol = 0;
      const targetVol = 0.25;
      const step = targetVol / 15; // 15 steps of 100ms
      const fade = setInterval(() => {
        vol = Math.min(targetVol, vol + step);
        if (audioRef.current) audioRef.current.volume = vol;
        if (vol >= targetVol) clearInterval(fade);
      }, 100);
    } else {
      // Fade out (current vol to 0 over 1s)
      let vol = audioRef.current.volume;
      const step = vol / 10;
      const fade = setInterval(() => {
        vol = Math.max(0, vol - step);
        if (audioRef.current) audioRef.current.volume = vol;
        if (vol <= 0) {
          clearInterval(fade);
          audioRef.current?.pause();
        }
      }, 100);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
