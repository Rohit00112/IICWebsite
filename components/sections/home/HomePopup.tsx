'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toSafeImageSrc } from '@/lib/image-source';
import type { HomePopupSettings } from '@/lib/home-popup';

interface HomePopupProps {
  settings: HomePopupSettings;
}

const SHOW_DELAY_MS = 700;
const HOME_POPUP_LINK = '/courses';

export default function HomePopup({ settings }: HomePopupProps) {
  const imageSrc = useMemo(() => toSafeImageSrc(settings.image), [settings.image]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const closePopup = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!settings.enabled || !imageSrc) return;

    const timer = window.setTimeout(() => {
      setReady(true);
      setOpen(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [imageSrc, settings.enabled]);

  useEffect(() => {
    if (!open || !imageSrc) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [closePopup, imageSrc, open]);

  if (!settings.enabled || !imageSrc || !ready || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-[#061126]/70 px-4 py-6 backdrop-blur-sm sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label={settings.alt || 'College announcement'}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <div className="relative mx-auto w-fit max-w-[min(92vw,620px)] animate-[home-popup-in_220ms_ease-out]">
        <button
          type="button"
          onClick={closePopup}
          className="absolute -right-2 -top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-[#1A2B56] shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/40"
          aria-label="Close popup"
        >
          <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <Link
          href={HOME_POPUP_LINK}
          aria-label="View courses"
          className="block w-fit overflow-hidden rounded-[28px] bg-white shadow-[0_32px_90px_rgba(0,0,0,0.38)] ring-1 ring-white/30 transition-transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-white/40"
        >
          <Image
            src={imageSrc}
            alt={settings.alt || 'College announcement'}
            width={1920}
            height={1920}
            sizes="(max-width: 768px) 92vw, 620px"
            priority
            className="h-auto max-h-[82svh] w-auto max-w-full object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
