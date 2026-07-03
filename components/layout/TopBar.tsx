'use client';

import React from 'react';
import { ObfuscatedEmailLink } from '@/components/common/ObfuscatedEmail';
import { COLLEGE_PHONE_DISPLAY, COLLEGE_PHONE_TEL } from '@/lib/seo-schema';

const TopBar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-2 hidden md:block z-[110] relative">
      <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 text-[13px] text-gray-600 font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[#21409A]">📞</span>
          <a href={`tel:${COLLEGE_PHONE_TEL}`} className="hover:text-[#21409A] transition-colors tracking-tight">{COLLEGE_PHONE_DISPLAY}</a>
        </div>
        <div className="flex items-center gap-2 border-l border-gray-200 pl-8">
          <span className="text-[#21409A]">📧</span>
          <ObfuscatedEmailLink mailbox="admissions" className="hover:text-[#21409A] transition-colors tracking-tight" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
