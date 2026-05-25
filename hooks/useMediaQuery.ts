'use client';

import { useCallback, useSyncExternalStore } from 'react';

const mediaQueryServerSnapshot = () => false;

export function useMediaQuery(query: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (typeof window === 'undefined') return () => {};

    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', onStoreChange);

    return () => mediaQuery.removeEventListener('change', onStoreChange);
  }, [query]);

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, mediaQueryServerSnapshot);
}
