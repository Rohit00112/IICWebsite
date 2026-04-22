'use client';

import React from 'react';
import Image from 'next/image';

const PartnerSection = () => {
  const rankingCards = [
    '/images/lmu rank 1.png',
    '/images/lmu rank 2.png',
    '/images/lmu rank 3.png',
    '/images/lmu rank 4.png',
    '/images/lmu rank 5.png',
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="w-full flex flex-col items-center">
        {/* Top Titles - Focused Width */}
        <div className="text-center mb-8 px-6 max-w-[1200px]">
          <span className="text-[#1a1a1a] text-xl md:text-[32px] font-bold font-sora block mb-3">
            Partner
          </span>
          <h2 className="text-6xl md:text-[160px] font-black text-[#007a5e] tracking-[-0.08em] leading-none font-sora">
            UNIVERSITY
          </h2>
        </div>

        {/* Brand Logos / Badges - Focused Width */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 mb-14 px-6 max-w-[1200px]">
          <div className="relative h-10 md:h-12 w-64 md:w-[280px]">
            <Image
              src="/images/lmu brand 2.png"
              alt="Times Higher Education Ranking"
              fill
              sizes="(max-width: 768px) 256px, 280px"
              className="object-contain"
            />
          </div>
          <div className="h-8 w-[1.5px] bg-gray-300 hidden md:block mx-4"></div>
          <div className="relative h-14 md:h-16 w-80 md:w-[380px]">
            <Image
              src="/images/lmu brand 1.png"
              alt="London Metropolitan University"
              fill
              sizes="(max-width: 768px) 320px, 380px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Main Building Image - Sharp Edge-to-Edge Canvas */}
        <div className="relative w-full mb-16">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/6] overflow-hidden">
            <Image
              src="/images/lmu building.png"
              alt="London Metropolitan University Building"
              fill
              sizes="100vw"
              className="object-cover"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-20"></div>
          </div>

          {/* Floating Badge - Aligned with the 25% ranking card below */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-[1300px] mx-auto h-full relative px-6">
              <div className="absolute bottom-[-4px] right-20 w-36 md:w-[240px] h-36 md:h-[240px] drop-shadow-3xl z-30">
                <Image
                  src="/images/lmu student favourate.png"
                  alt="Student Favourite UK 2022"
                  fill
                  sizes="(max-width: 768px) 144px, 240px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ranking Cards Row - Focused Width */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 w-full mb-14 px-6 max-w-[1300px]">
          {rankingCards.map((card, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <Image
                src={card}
                alt={`LMU Rank ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Bottom Mission Text - Focused Width */}
        <div className="max-w-4xl text-center px-6">
          <p className="text-gray-500 text-sm md:text-[16px] font-medium leading-relaxed mb-4">
            London Metropolitan University's Mission Is To Transform Lives Through The Power Of Education – And It Does That By Welcoming Students From All Kinds Of Backgrounds And Supporting Them To Achieve Success. Each And Every One Of Them Belongs There And Uniquely Contributes To The University And The City Around Them.
          </p>
          <a
            href="#"
            className="text-[#007a5e] font-bold text-base md:text-lg underline underline-offset-8 decoration-2 hover:text-[#005a49] transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
