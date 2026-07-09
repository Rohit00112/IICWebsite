'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const IngSection = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full py-12 sm:py-16 md:py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-center text-center md:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a1a1a] mb-2 font-iic">
            Be a part of<span className="sr-only"> Something bigger</span>
          </h2>
          <AnimeReveal
            as="div"
            text="Something bigger"
            className="text-[40px] sm:text-6xl md:text-8xl font-black text-[#74C044] leading-[1] tracking-tight font-iic justify-center"
            staggerFrom="center"
          />
        </div>

        {/* Content Section */}
        <AnimeStagger
          className="flex flex-col items-center gap-7 md:flex-row md:gap-16"
          selector=".ing-panel"
          staggerDelay={140}
          translateY={36}
          duration={850}
        >
          {/* Left: ING Logo */}
          <div className="ing-panel w-full md:w-1/2 flex justify-center md:justify-end" style={{ willChange: 'transform, opacity' }}>
            <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[1.6/1]">
              <Image
                src="/images/common/ing.png"
                alt="ING Group Logo"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: Description */}
          <div className="ing-panel w-full md:w-1/2 flex flex-col items-start text-left" style={{ willChange: 'transform, opacity' }}>
            <p className="mb-5 max-w-xl text-sm font-medium leading-relaxed text-gray-500 sm:text-base md:mb-8 md:text-lg">
              Transforming Lives Through Innovation & Education with ingenuity at the forefront of all our decisions, we strive to become a contributive factor in the betterment of Nepal and society in general by providing practical career centric education and innovations in technology. ING houses state-of-the-art organizations in a variety of industries which include Tech, Education and More.
            </p>
            <a
              href="https://ing.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#74C044] text-base md:text-lg font-bold border-b-2 border-[#74C044] pb-1 hover:text-[#74C044] hover:border-[#74C044] transition-colors font-iic"
            >
              Learn More
            </a>
          </div>
        </AnimeStagger>
      </div>
    </section>
  );
};

export default IngSection;
