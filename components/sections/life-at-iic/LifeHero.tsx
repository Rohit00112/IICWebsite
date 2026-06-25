'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import RevealText from '../../effects/RevealText';
import GlassSurprise from '../../effects/GlassSurprise';

const LifeHero = () => {
  return (
    <section className="relative flex min-h-[85svh] w-full items-center justify-center overflow-hidden bg-white px-4 pb-12 pt-24 md:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/lifestyle/lifestyle-hero.JPG"
          alt="Life at IIC"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Glassmorphism Card with Surprise Effect */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1100px]"
      >
        <GlassSurprise>
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 md:mb-8 px-6 py-2 rounded-full bg-[#21409A] text-white"
          >
            <span className="text-xs md:text-sm font-semibold tracking-wide">
              #LifeAtIIC
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 mb-8">
            <RevealText
              text="Life At"
              className="text-4xl md:text-6xl lg:text-[80px] font-black leading-[1.1] tracking-tight font-iic text-[#1a1a1a]"
            />
            <div className="text-[#21409A] relative inline-block">
              <RevealText
                text="IIC"
                className="text-4xl md:text-6xl lg:text-[80px] font-black leading-[1.1] tracking-tight font-iic"
                delay={0.4}
              />
              {/* Green SVG Underline */}
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[750px] mx-auto text-[#333333] text-sm md:text-base font-medium leading-relaxed mb-8 font-iic opacity-80"
          >
            Beyond the classroom, IIC creates a supportive campus culture where students build confidence, leadership, creativity, and friendships that last.
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[#21409A] text-white rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-[#21409A] transition-all"
              >
                Schedule a Campus Tour
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/life-at-iic#campus-gallery"
                className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md border border-white/70 text-[#21409A] rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-white/80 transition-all shadow-sm"
              >
                Watch Campus Video
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </Link>
            </motion.div>
          </div>
        </GlassSurprise>
      </motion.div>
    </section>
  );
};

export default LifeHero;
