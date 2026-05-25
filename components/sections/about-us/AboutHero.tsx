'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const AboutHero = () => {
  return (
    <section className="relative pt-32 md:pt-40 bg-[#EDF2F7] overflow-hidden flex flex-col items-center">
      <div className="max-w-[1440px] w-full mx-auto px-6 text-center flex flex-col items-center relative z-10">
        <div className="mb-10 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#007a5e] font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-6 block font-sora"
          >
            EXPERIENCE THE EXTRAORDINARY
          </motion.span>

          <RevealText
            text="Leading"
            className="text-2xl md:text-3xl font-bold text-[#1a237e] mb-4 font-sora tracking-tight justify-center"
          />

          <AnimeReveal
            text="GLOBAL EDUCATION"
            as="h1"
            className="text-5xl md:text-7xl lg:text-[100px] font-black text-[#21409A] leading-none mb-6 font-sora tracking-tighter justify-center uppercase"
            delay={0.2}
            staggerFrom="center"
          />

          <RevealText
            text="In Eastern Nepal"
            className="text-2xl md:text-3xl font-bold text-[#1a237e] font-sora tracking-tight justify-center"
            delay={0.6}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/admissions" className="inline-flex px-10 py-4 bg-[#21409A] text-white rounded-md font-bold text-sm hover:bg-[#1a337e] transition-all shadow-[0_10px_20px_rgba(33,64,154,0.3)]">
              Apply for Admissions
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact" className="inline-flex px-10 py-4 bg-white/50 text-[#21409A] border border-[#CBD5E0] rounded-md font-bold text-sm hover:bg-white transition-all">
              Schedule a Campus Visit
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1200px] h-[350px] md:h-[600px] mt-4"
        >
          <Image
            src="/images/about/about-hero.png"
            alt="Students at Itahari International College"
            fill
            priority
            className="object-contain object-bottom scale-110"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
