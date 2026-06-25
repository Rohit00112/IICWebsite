'use client';

import React from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import { motion } from 'framer-motion';

const IngSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center mb-10 md:mb-16 text-center">
          <div className="relative w-56 h-24 md:w-72 md:h-32">
            <Image src="/images/about/ing.png" alt="ING Logo" fill sizes="(max-width: 768px) 224px, 288px" className="object-contain" />
          </div>
        </div>

        {/* Main Green Card */}
        <motion.div
          initial={{ y: 48, opacity: 0, scale: 0.98 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px", amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#4B8F30] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch p-6 md:p-16 max-w-7xl mx-auto gap-8 lg:gap-12"
        >
          {/* Left Content */}
          <div className="lg:w-[50%] flex flex-col text-white">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#346D22] rounded-xl flex items-center justify-center mb-6 md:mb-10 shadow-lg">
              <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>

            <AnimeReveal
              as="h3"
              text="Powered by Innovate Nepal Group"
              className="text-2xl md:text-4xl font-black mb-5 md:mb-8 font-iic leading-[1.15] tracking-tight"
              staggerFrom="first"
            />

            <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed mb-6 md:mb-10 font-iic">
              Itahari International College is proud to be a part of the Innovate Nepal Group (ING), a pioneering organization that has revolutionized higher education in Nepal. This affiliation ensures our students benefit from a vast network of industry connections, shared resources, and a legacy of academic excellence.
            </p>

            <div className="space-y-3 md:space-y-4">
              {[
                "Extensive Alumni Network",
                "Shared Placement Opportunities",
                "Standardized Quality Assurance"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 md:gap-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/15 border border-white/40 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-xs md:text-sm tracking-wide font-iic">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-[50%] flex flex-col gap-5 md:gap-8">
            <div className="text-white">
              <p className="text-[10px] font-bold tracking-[0.2em] mb-4 md:mb-6 opacity-80">ACADEMIC PARTNERS &amp; ACCREDITATIONS</p>

              <div className="rounded-2xl md:rounded-[1.5rem] border-2 border-dashed border-white/85 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-5">
                {/* Left — Degree Awarded By + LMU */}
                <div className="flex-1 min-w-0 w-full text-center md:text-left">
                  <h4 className="text-white text-base md:text-lg font-black font-iic mb-0.5 leading-tight">
                    Degree Awarded By
                  </h4>
                  <div className="relative mx-auto mt-3 h-20 w-[230px] overflow-hidden md:mx-0 md:h-24 md:w-[280px]">
                    <Image
                      src="/images/home/lmu brand 2.png"
                      alt="London Metropolitan University"
                      fill
                      sizes="(max-width: 768px) 230px, 280px"
                      className="object-cover object-[50%_34%] brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Right — MoE badge */}
                <div className="bg-white rounded-md shadow-xl overflow-hidden shrink-0 w-full md:w-auto md:max-w-[55%]">
                  <div className="px-2.5 pt-1.5 pb-0.5">
                    <p className="text-black text-[9px] md:text-[10px] font-semibold font-iic">Approved by</p>
                  </div>
                  <div className="bg-[#ED1C24] px-2.5 py-1">
                    <p className="text-white text-[11px] md:text-[13px] font-black font-iic leading-tight">
                      Ministry of Education, Nepal
                    </p>
                  </div>
                  <div className="px-2.5 pt-0.5 pb-1.5">
                    <p className="text-black text-[8px] md:text-[9px] font-medium font-iic">
                      Equivalence by Tribhuvan University
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recognition Box */}
            <div className="bg-[#3A7528] rounded-2xl md:rounded-[2rem] p-5 md:p-10 flex items-start gap-4 md:gap-8 border-l-4 md:border-l-[6px] border-[#9CE83B] shadow-2xl relative overflow-hidden">
              <div className="shrink-0 mt-0.5 text-[#9CE83B]">
                <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <p className="text-white text-sm md:text-lg font-medium leading-relaxed font-iic">
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
