'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import StatsStrip from './StatsStrip';
import RevealText from '../../effects/RevealText';

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Floating elements parallax
  const yBlob1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={containerRef} className="relative w-full flex flex-col items-center overflow-hidden min-h-[100svh] bg-white">
      {/* Decorative Floating Blobs */}
      <motion.div
        style={{ y: yBlob1 }}
        className="absolute top-20 -left-20 hidden w-64 h-64 bg-[#21409A]/10 rounded-full blur-3xl z-0 md:block"
      />
      <motion.div
        style={{ y: yBlob2 }}
        className="absolute bottom-40 -right-20 hidden w-96 h-96 bg-[#007a5e]/10 rounded-full blur-3xl z-0 md:block"
      />

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Centered Logo - Specifically for Home Page Hero */}
        <div className="w-full pt-6 sm:pt-8 md:pt-12 pb-3 md:pb-4 flex items-center justify-center relative z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-10 w-[230px] sm:h-12 sm:w-[260px] md:h-16 md:w-[440px]"
          >
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College Logo"
              fill
              sizes="(max-width: 768px) 260px, 440px"
              className="object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        <div className="pt-2 md:pt-4 text-center flex flex-col items-center">
          <RevealText
            as="h1"
            text="UK Degrees in Itahari"
            className="text-[32px] sm:text-[42px] md:text-[84px] font-black text-[#21409A] leading-[1.05] sm:leading-[1.1] mb-4 md:mb-6 tracking-tight md:tracking-tighter uppercase font-sora justify-center"
            delay={0.4}
          />
          <RevealText
            as="p"
            text="Launch your global career with IT and Business programmes from London Metropolitan University."
            className="text-base sm:text-lg md:text-[24px] font-medium text-gray-500 leading-[1.55] md:leading-[1.6] mb-8 md:mb-12 max-w-3xl px-2 sm:px-4 font-sora justify-center"
            delay={0.7}
          />

          <div className="flex w-full max-w-sm flex-col sm:max-w-none sm:w-auto sm:flex-row gap-4 sm:gap-6 md:gap-8 mb-14 sm:mb-20 md:mb-44 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                aria-label="Schedule a campus visit"
                className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-[#21409A] text-white rounded-xl font-bold text-sm sm:text-[16px] flex items-center justify-center gap-3 shadow-2xl hover:brightness-110 transition-all focus-visible:ring-2 focus-visible:ring-[#74C044] focus-visible:outline-none"
              >
                <span>Schedule A Visit</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/courses"
                aria-label="Explore our academic programmes"
                className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-white text-[#21409A] border-2 border-[#dbeafe] rounded-xl font-bold text-sm sm:text-[16px] flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all focus-visible:ring-2 focus-visible:ring-[#21409A] focus-visible:outline-none"
              >
                Browse degrees
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Building Image Layer — Pinned to bottom, separate from content flow */}
      <div className="w-full relative h-[320px] sm:h-[400px] md:h-[650px] mt-auto -mt-8 sm:-mt-12 md:-mt-24 overflow-visible z-0">
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-x-0 bottom-0 w-full h-full"
        >
          <Image
            src="/images/home/hero.png"
            alt="Itahari International College ING Block Building"
            fill
            sizes="(max-width: 1536px) 100vw, 1536px"
            className="object-cover object-top"
            priority
          />
        </motion.div>
      </div>

      {/* Stats Bar — Naturally follows the building */}
      <div className="relative z-20 w-full bg-white mt-6 md:-mt-16">
        <StatsStrip />
      </div>
    </section >
  );
};

export default HeroSection;
