'use client';

import { useState, useEffect } from 'react';

/**
 * Reactively tracks the user's `prefers-reduced-motion` OS setting.
 *
 * - Returns `false` during SSR (animations enabled by default).
 * - Listens for runtime changes (e.g. user toggles the setting while the
 *   page is open) and re-renders accordingly.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Sync initial value on mount
    setPrefersReduced(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mql.addEventListener('change', handleChange);

    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReduced;
}
