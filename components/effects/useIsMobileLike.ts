'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(hover: none), (pointer: coarse), (max-width: 767px)';

const getSnapshot = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return true;

  return window.matchMedia(QUERY).matches;
};

const getServerSnapshot = () => true;

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};

  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener('change', callback);

  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
};

export default function useIsMobileLike() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
