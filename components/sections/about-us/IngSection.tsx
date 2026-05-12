'use client';

import React from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)', y: 100, opacity: 0 }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#568E33] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch p-8 md:p-16 max-w-7xl mx-auto gap-12"
        >
          {/* Left Content */}
          <div className="lg:w-[50%] flex flex-col text-white">
            <div className="w-14 h-14 bg-[#3E6B24] rounded-xl flex items-center justify-center mb-10 shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>

            <AnimeReveal
              as="h3"
              text="Powered by Innovate Nepal Group"
              className="text-3xl md:text-4xl font-black mb-8 font-sora leading-[1.1] tracking-tight"
              staggerFrom="first"
            />

            <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed mb-10 font-sora">
              Itahari International College is proud to be a part of the Innovate Nepal Group (ING), a pioneering organization that has revolutionized higher education in Nepal. This affiliation ensures our students benefit from a vast network of industry connections, shared resources, and a legacy of academic excellence.
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
                  <span className="text-white font-bold text-xs md:text-sm tracking-wide font-sora">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-[50%] flex flex-col gap-8">
            <div className="text-white">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-6 opacity-80">ACADEMIC PARTNERS & ACCREDITATIONS</p>

              <div className="rounded-[1.5rem] border-2 border-dashed border-white/85 p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-5">
                {/* Left — Degree Awarded By + LMU */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-base md:text-lg font-black font-sora mb-0.5 leading-tight">
                    Degree Awarded By
                  </h4>
                  <p className="text-white/80 text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase mb-2 font-sora">
                    University Partner
                  </p>
                  <div className="relative h-7 md:h-9 w-full max-w-[160px]">
                    <Image
                      src="/images/home/lmu brand 2.png"
                      alt="London Metropolitan University"
                      fill
                      sizes="160px"
                      className="object-contain object-left brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Right — MoE badge */}
                <div className="bg-white rounded-md shadow-xl overflow-hidden shrink-0 w-full md:w-auto md:max-w-[55%]">
                  <div className="px-2.5 pt-1.5 pb-0.5">
                    <p className="text-black text-[9px] md:text-[10px] font-semibold font-sora">Approved by</p>
                  </div>
                  <div className="bg-[#C8102E] px-2.5 py-1">
                    <p className="text-white text-[11px] md:text-[13px] font-black font-sora leading-tight">
                      Ministry of Education, Nepal
                    </p>
                  </div>
                  <div className="px-2.5 pt-0.5 pb-1.5">
                    <p className="text-black text-[8px] md:text-[9px] font-medium font-sora">
                      Equivalence by Tribhuvan University
                    </p>
                  </div>
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
              <p className="text-white text-sm md:text-lg font-medium leading-relaxed font-sora">
                All our programs are fully approved by the Government of Nepal and recognized by Tribhuvan University as equivalent to their respective degrees.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IngSection;
