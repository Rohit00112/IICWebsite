import React from 'react';
import Image from 'next/image';

const InnovationLab = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#f4f7fa] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Main Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-2 font-sora">
            Life Beyond The
          </h2>
          <h2 className="text-[90px] md:text-[200px] font-black text-[#007a5e] leading-[0.8] tracking-[-0.04em] font-sora">
            CLASSROOM
          </h2>
        </div>

        {/* Innovation Lab Sub-Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-[56px] font-bold text-[#0a3285] mb-6 font-sora">
              Innovation Lab
            </h3>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
              Beyond academics, IIC offers a dynamic environment fostering creativity, leadership, and lifelong friendships.
            </p>
          </div>
          <button className="bg-[#007a5e] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-[#005a49] transition-all shadow-lg hover:shadow-xl shrink-0">
            Explore Innovation Lab
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Large Card */}
          <div className="relative group aspect-[4/3] md:aspect-auto h-full rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="/images/ivlab1.png"
              alt="Clubs & Societies"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 font-sora">
                Clubs & Societies
              </h4>
              <p className="text-white/80 text-base md:text-lg">
                Join over 20 active student-led organizations.
              </p>
            </div>
          </div>

          {/* Right Column Layout */}
          <div className="flex flex-col gap-8">
            {/* Top Row: Two Equal Cards */}
            <div className="grid grid-cols-2 gap-8">
              <div className="relative group aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl">
                <Image
                  src="/images/ivlab2.png"
                  alt="State-of-art Library"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-lg md:text-xl font-bold text-white font-sora">
                    State-of-art Library
                  </h4>
                </div>
              </div>
              <div className="relative group aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl">
                <Image
                  src="/images/ivlab3.png"
                  alt="Tech Events"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-lg md:text-xl font-bold text-white font-sora">
                    Tech Events & Hackathons
                  </h4>
                </div>
              </div>
            </div>

            {/* Bottom Row: Full Width Card */}
            <div className="relative group aspect-[21/9] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl">
              <Image
                src="/images/ivlab4.png"
                alt="Cafeteria & Social Hub"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-sora">
                  Cafeteria & Social Hub
                </h4>
                <p className="text-white/70 text-sm md:text-base">
                  The perfect place to unwind and network between classes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
