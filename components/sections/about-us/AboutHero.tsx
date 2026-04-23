'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative pt-32 md:pt-40 bg-[#EDF2F7] overflow-hidden flex flex-col items-center">
      <div className="max-w-[1440px] w-full mx-auto px-6 text-center flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-[#007a5e] font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-6 block font-sora">
            EXPERIENCE THE EXTRAORDINARY
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4 font-sora tracking-tight">
            Pioneering
          </h2>
          
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black text-[#21409A] leading-none mb-6 font-sora tracking-tighter">
            GLOBAL EDUCATION
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] font-sora tracking-tight">
            In Nepal
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button className="px-10 py-4 bg-[#21409A] text-white rounded-md font-bold text-sm hover:bg-[#1a337e] transition-all shadow-[0_10px_20px_rgba(33,64,154,0.3)] active:scale-95">
            Apply for Admissions
          </button>
          <button className="px-10 py-4 bg-[#E2E8F0]/50 text-[#21409A] border border-[#CBD5E0] rounded-md font-bold text-sm hover:bg-white transition-all active:scale-95">
            Schedule a Campus Visit
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1200px] h-[350px] md:h-[600px] mt-4"
        >
          <Image
            src="/images/about/about-hero.png"
            alt="Students at IIC"
            fill
            priority
            className="object-contain object-bottom scale-110"
            sizes="100vw"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
