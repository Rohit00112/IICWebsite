'use client';

import React from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const IngSection = () => {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Top Header */}
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">

          <div className="relative w-72 h-32">
            <Image src="/images/about/ing.png" alt="ING Logo" fill sizes="288px" className="object-contain" />
          </div>
        </div>

        {/* Main Green Card */}
        <AnimeStagger
          className="bg-[#568E33] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch p-8 md:p-16 max-w-6xl mx-auto gap-12"
          selector=".about-ing-panel"
          staggerDelay={140}
          translateY={36}
          duration={850}
        >
          {/* Left Content */}
          <div className="about-ing-panel lg:w-[55%] flex flex-col text-white" style={{ willChange: 'transform, opacity' }}>
            <div className="w-14 h-14 bg-[#3E6B24] rounded-xl flex items-center justify-center mb-10 shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>

            <AnimeReveal
              as="h3"
              text="Powered by Innovate Nepal Group"
              className="text-4xl md:text-5xl font-black mb-8 font-sora leading-[1.1] tracking-tight"
              staggerFrom="first"
            />

            <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed mb-10 font-sora">
              IIC is proud to be a part of the Innovate Nepal Group (ING), a pioneering organization that has revolutionized higher education in Nepal. This affiliation ensures our students benefit from a vast network of industry connections, shared resources, and a legacy of academic excellence.
            </p>

            <div className="space-y-4">
              {[
                "Extensive Alumni Network",
                "Shared Placement Opportunities",
                "Standardized Quality Assurance"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-sm md:text-base tracking-wide font-sora">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="about-ing-panel lg:w-[45%] flex flex-col gap-8" style={{ willChange: 'transform, opacity' }}>
            <div className="text-white">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-80">ACADEMIC PARTNERS & ACCREDITATIONS</p>
              <div className="grid grid-cols-2 gap-4">
                {/* Partner 1 */}
                <div className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center gap-4 aspect-square">
                  <div className="w-12 h-12 rounded-full border-2 border-[#568E33]/20 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#568E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <p className="text-[#1A2B6D] font-bold text-xs md:text-sm leading-tight font-sora">
                    London <br /> Metropolitan <br /> University
                  </p>
                </div>

                {/* Partner 2 */}
                <div className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center gap-4 aspect-square">
                  <div className="w-12 h-12 rounded-full border-2 border-[#568E33]/20 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#568E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <p className="text-[#1A2B6D] font-bold text-xs md:text-sm leading-tight font-sora">
                    Ministry of <br /> Education, Nepal
                  </p>
                </div>
              </div>
            </div>

            {/* Recognition Box */}
            <div className="bg-[#467528] rounded-[2rem] p-8 md:p-10 flex items-start gap-8 border-l-[6px] border-[#A3E635] shadow-2xl relative overflow-hidden">
              <div className="shrink-0 mt-1 text-[#A3E635]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <p className="text-white text-base md:text-xl font-medium leading-relaxed font-sora">
                All our programs are fully approved by the Government of Nepal and recognized by Tribhuvan University as equivalent to their respective degrees.
              </p>
            </div>
          </div>
        </AnimeStagger>
      </div>
    </section>
  );
};

export default IngSection;
