'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import AnimeReveal from '../../effects/AnimeReveal';

const AboutHero = () => {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-white pt-24 md:pt-28">
      <div className="max-w-[1440px] w-full mx-auto px-6 text-center flex flex-col items-center relative z-10">
        <div className="mb-10 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#74C044] font-bold tracking-[0.25em] text-xs md:text-sm mb-6 block font-iic"
          >
            Experience the extraordinary
          </motion.span>

          <RevealText
            text="Leading"
            className="text-2xl md:text-3xl font-bold text-[#21409A] mb-4 font-iic tracking-tight justify-center"
          />

          <AnimeReveal
            text="Global Education"
            as="h1"
            className="text-5xl md:text-7xl lg:text-[100px] font-black text-[#21409A] leading-none mb-6 font-iic tracking-tighter justify-center uppercase"
            delay={0.2}
            staggerFrom="center"
          />

          <RevealText
            text="In Eastern Nepal"
            className="text-2xl md:text-3xl font-bold text-[#21409A] font-iic tracking-tight justify-center"
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
            <Link href="/admissions" className="inline-flex px-10 py-4 bg-[#21409A] text-white rounded-md font-bold text-sm hover:bg-[#21409A] transition-all shadow-[0_10px_20px_rgba(33,64,154,0.3)]">
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
              Schedule a College Visit
            </Link>
          </motion.div>
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative -mt-30 w-full bg-white md:-mt-40 lg:-mt-48"
      >
        <Image
          src="/images/about/about-hero.JPG"
          alt="Students at Itahari International College"
          width={6000}
          height={4000}
          priority
          className="h-auto w-full"
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
};

export default AboutHero;
