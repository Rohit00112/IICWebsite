'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import StatsStrip from '@/components/sections/StatsStrip';

const HeroSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center bg-[#f4f7fa]">
      <Navbar />

      {/* Hero Text + Buttons */}
      <div className="w-full max-w-[1440px] mx-auto px-6 pt-12 md:pt-20 text-center flex flex-col items-center z-10">
        <h1 className="text-xl md:text-[26px] font-medium text-gray-700 leading-[1.6] mb-8 max-w-3xl px-4 font-sora">
          UK-Affiliated Degrees In IT & Business. Partnered With London Metropolitan
          University To Bring World-Class Education To Eastern Nepal.
        </h1>

        <div className="flex flex-col sm:flex-row gap-5 mb-10">

          <a href="#"
            className="px-10 py-4 bg-[#243c8b] text-white rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#1e3274] transition-all shadow-xl active:scale-95"
          >
            <span>Schedule A Visit</span>
            <span className="text-lg text-white/90">📞</span>
          </a>

          <a href="#"
            className="px-10 py-4 bg-white text-[#243c8b] border-2 border-[#dbeafe] rounded-lg font-bold text-[15px] flex items-center justify-center hover:bg-[#f8fbff] transition-all active:scale-95 shadow-md"
          >
            Explore Programmes
          </a>
        </div>
      </div >

      {/* Building Image — natural aspect ratio, no crop, no extra whitespace */}
      < div className="w-full overflow-hidden leading-[0]" >
        <Image
          src="/images/hero.png"
          alt="IIC ING Block Building"
          width={1440}
          height={700}
          className="w-full h-auto object-cover object-center block"
          priority
        />
      </div >

      {/* Stats Bar — pushed up to touch the ground of the building */}
      <div className="relative z-20 w-full -mt-16 md:-mt-24">
        <StatsStrip />
      </div>
    </section >
  );
};

export default HeroSection;