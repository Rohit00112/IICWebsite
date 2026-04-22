'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center bg-[#f4f7fa] overflow-hidden">
      {/* Reusable Navigation Component */}
      <Navbar />

      {/* Hero Content Area */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-12 md:pt-16 pb-0 text-center flex flex-col items-center z-10 flex-grow justify-center">
        <h1 className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed mb-10 max-w-2xl px-4">
          UK-Affiliated Degrees In IT & Business. Partnered With London Metropolitan University To Bring World-Class Education To Eastern Nepal.
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#"
            className="px-8 py-3 bg-[#1e3a8a] text-white rounded-md font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1a337e] transition-all shadow-md active:scale-95"
          >
            <span>Schedule A Visit</span>
            <span className="text-base text-white/80">📞</span>
          </a>
          <a
            href="#"
            className="px-8 py-3 bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] rounded-md font-semibold text-sm flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            Explore Programmes
          </a>
        </div>

        <div className="relative w-full h-[350px] md:h-[500px] mt-auto">
          <Image
            src="/images/hero.png"
            alt="IIC ING Block Building"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
