'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import GlassSurprise from '../../effects/GlassSurprise';

const LifeHero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityProgress = useTransform(scrollY, [0, 200, 400], [1, 1, 0]);
  const yTranslate = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section ref={containerRef} className="relative min-h-[85svh] w-full overflow-hidden bg-white flex items-center justify-center pt-24 pb-12 px-4 md:px-8">
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

      {/* Glassmorphism Card with Surprise Effect */}
      <motion.div 
        style={{ 
          opacity: opacityProgress,
          y: yTranslate
        }}
        className="relative z-10 w-full max-w-[1100px] mt-12 md:mt-0"
      >
        <GlassSurprise>
          {/* Top Badge */}
          <div className="inline-block mb-6 md:mb-8 px-6 py-2 rounded-full bg-[#007a5e] text-white">
            <span className="text-xs md:text-sm font-semibold tracking-wide">
              Experience IIC
            </span>
          </div>

          {/* Main Title */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 mb-8">
            <RevealText
              text="Life At"
              className="text-4xl md:text-6xl lg:text-[80px] font-black leading-[1.1] tracking-tight font-sora text-[#1a1a1a]"
            />
            <div className="text-[#21409A] relative inline-block">
              <RevealText
                text="IIC"
                className="text-4xl md:text-6xl lg:text-[80px] font-black leading-[1.1] tracking-tight font-sora"
                delay={0.4}
              />
              {/* Green SVG Underline */}
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                className="absolute -bottom-1 md:-bottom-2 left-0 w-full origin-left"
                viewBox="0 0 200 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 5 10 Q 100 25 195 10" stroke="#74C044" strokeWidth="10" strokeLinecap="round" />
              </motion.svg>
            </div>
          </div>

          {/* Paragraph text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-[750px] mx-auto text-[#333333] text-base md:text-lg font-medium leading-relaxed mb-8 font-sora"
          >
            Beyond the classroom, IIC offers a dynamic ecosystem designed to foster personal growth, leadership, and lifelong friendships. Discover your place in our thriving community.
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Magnetic strength={0.2}>
              <button className="w-full sm:w-auto px-8 py-4 bg-[#21409A] text-white rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-[#1a3279] transition-all">
                Schedule a Campus Tour
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md border border-white/70 text-[#21409A] rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-white/80 transition-all shadow-sm">
                Watch Campus Video
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </button>
            </Magnetic>
          </div>
        </GlassSurprise>
      </motion.div>
    </section>
  );
};

export default LifeHero;
