'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const IngSection = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full py-16 sm:py-24 md:py-32 bg-[#f4f7fa] overflow-hidden border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a1a1a] mb-2 font-iic">
            Be a part of
          </h3>
          <AnimeReveal
            as="h2"
            text="Something bigger"
            className="text-[34px] sm:text-4xl md:text-7xl font-black text-[#74C044] leading-[1] tracking-tight font-iic justify-center"
            staggerFrom="center"
          />
        </div>

        {/* Content Section */}
        <AnimeStagger
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
          selector=".ing-panel"
          staggerDelay={140}
          translateY={36}
          duration={850}
        >
          {/* Left: ING Logo */}
          <div className="ing-panel w-full md:w-1/2 flex justify-center md:justify-end" style={{ willChange: 'transform, opacity' }}>
            <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[1.6/1]">
              <Image
                src="/images/home/ing.png"
                alt="ING Group Logo"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: Description */}
          <div className="ing-panel w-full md:w-1/2 flex flex-col items-start text-left" style={{ willChange: 'transform, opacity' }}>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-6 md:mb-8 max-w-xl">
              As part of the ING network, IIC connects students in Itahari with practical teaching, modern learning environments, and opportunities shaped by education, technology, and enterprise. The shared goal is clear: prepare graduates who can contribute confidently in Nepal and compete globally.
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
