'use client';

import React from 'react';
import { ObfuscatedEmailLink } from '@/components/common/ObfuscatedEmail';
import { COLLEGE_PHONE_DISPLAY, COLLEGE_PHONE_TEL } from '@/lib/seo-schema';

const TopBar = () => {
  return (
    <div className="relative z-[120] w-full border-b border-white/15 bg-[#21409A]">
      <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-center gap-6 px-4 text-[11px] font-bold tracking-wide text-white/88 sm:gap-8 sm:text-xs">
        <a
          href={`tel:${COLLEGE_PHONE_TEL}`}
          className="group inline-flex items-center gap-2 rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
        >
          <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-[#74C044]">
            <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.58 3.6 1 1 0 01-.24 1l-2.24 2.2z" fill="currentColor" />
          </svg>
          <span className="hidden sm:inline">{COLLEGE_PHONE_DISPLAY}</span>
          <span className="sm:hidden">Call</span>
        </a>
        <span aria-hidden className="h-4 w-px bg-white/22" />
        <ObfuscatedEmailLink
          mailbox="info"
          className="group inline-flex items-center gap-2 rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
        >
          {({ label }) => (
            <>
              <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-[#74C044]">
                <path d="M3 6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span suppressHydrationWarning>{label}</span>
            </>
          )}
        </ObfuscatedEmailLink>
      </div>
    </div>
  );
};

export default TopBar;
