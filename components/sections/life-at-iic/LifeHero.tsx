'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const LifeHero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] w-full overflow-hidden bg-white flex items-center justify-center pt-24 pb-12 px-4 md:px-8">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[110%] -top-[5%]"
      >
        <Image
          src="/images/lifestyle/lifestyle-hero.png"
          alt="Life at IIC"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Glassmorphism Card */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1000px] bg-white/40 backdrop-blur-[32px] border border-white/60 rounded-[32px] md:rounded-[40px] p-8 md:p-16 lg:p-20 shadow-2xl flex flex-col items-center text-center mt-12 md:mt-0"
      >
        {/* Top Badge */}
        <div className="inline-block mb-6 md:mb-8 px-6 py-2 rounded-full bg-[#007a5e] text-white">
          <span className="text-xs md:text-sm font-semibold tracking-wide">
            Experience IIC
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[1.1] tracking-tight mb-8 font-sora">
          <span className="text-[#1a1a1a]">Life At </span>
          <span className="text-[#21409A] relative inline-block">
            IIC
            {/* Green SVG Underline */}
            <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 5 10 Q 100 25 195 10" stroke="#74C044" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        
        {/* Paragraph text */}
        <p className="max-w-[750px] mx-auto text-[#333333] text-base md:text-xl font-medium leading-relaxed mb-12 font-sora">
          Beyond the classroom, IIC offers a dynamic ecosystem designed to foster personal growth, leadership, and lifelong friendships. Discover your place in our thriving community.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-8 py-4 bg-[#21409A] text-white rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-[#1a3279] transition-colors">
            Schedule a Campus Tour
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md border border-white/70 text-[#21409A] rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-white/80 transition-colors shadow-sm">
            Watch Campus Video
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default LifeHero;
