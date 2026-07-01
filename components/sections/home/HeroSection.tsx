'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import StatsStrip from './StatsStrip';
import RevealText from '../../effects/RevealText';
import CloudBackground from '../../effects/CloudBackground';

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
      {/* Top utility strip: phone + email */}
      <div className="relative z-40 w-full border-b border-white/20 bg-[#21409A]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-5 px-4 py-2 sm:gap-7 sm:px-6">
          <a
            href="tel:+9779801003030"
            className="group flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] rounded sm:text-xs"
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-[#74C044]">
              <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.58 3.6 1 1 0 01-.24 1l-2.24 2.2z" fill="currentColor" />
            </svg>
            <span className="hidden sm:inline">+977 9801003030</span>
            <span className="sm:hidden">Call</span>
          </a>
          <span aria-hidden className="h-3 w-px bg-white/25" />
          <a
            href="mailto:info@iic.edu.np"
            className="group flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] rounded sm:text-xs"
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-[#74C044]">
              <path d="M3 6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>info@iic.edu.np</span>
          </a>
        </div>
      </div>

      <CloudBackground className="absolute inset-x-0 top-0 z-0 h-[100svh] overflow-hidden pointer-events-none select-none" />

      {/* Decorative Floating Blobs */}
      <motion.div
        style={{ y: yBlob1 }}
        className="absolute top-20 -left-20 hidden w-64 h-64 bg-[#21409A]/10 rounded-full blur-3xl z-0 md:block"
      />
      <motion.div
        style={{ y: yBlob2 }}
        className="absolute bottom-40 -right-20 hidden w-96 h-96 bg-[#74C044]/10 rounded-full blur-3xl z-0 md:block"
      />

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Centered Logo - Specifically for Home Page Hero */}
        <div className="w-full pt-14 sm:pt-16 md:pt-20 pb-3 md:pb-4 flex items-center justify-center relative z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[87px] w-[min(360px,calc(100vw-2rem))] overflow-hidden sm:h-[102px] sm:w-[420px] md:h-[112px] md:w-[460px]"
          >
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College Logo"
              fill
              sizes="(max-width: 640px) 360px, (max-width: 768px) 420px, 460px"
              className="object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        <div className="pt-2 md:pt-4 text-center flex flex-col items-center">
          <RevealText
            as="h1"
            text="UK Degrees in Itahari"
            className="w-full max-w-[1180px] text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] xl:text-[112px] font-black uppercase text-[#21409A] leading-[0.98] sm:leading-[1.02] mb-5 md:mb-8 tracking-normal font-iic justify-center text-center"
            delay={0.4}
          />
          <RevealText
            as="p"
            text="Launch your global career with IT and Business programmes from London Metropolitan University."
            className="text-base sm:text-lg md:text-[24px] lg:text-[28px] font-medium text-gray-500 leading-[1.55] md:leading-[1.6] mb-8 md:mb-12 max-w-4xl px-2 sm:px-4 font-iic justify-center"
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
                aria-label="Schedule a college visit"
                className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-[#21409A] text-white rounded-xl font-bold text-sm sm:text-[16px] flex items-center justify-center gap-3 shadow-2xl hover:brightness-110 transition-all focus-visible:ring-2 focus-visible:ring-[#74C044] focus-visible:outline-none"
              >
                <span>Schedule a Visit</span>
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
                aria-label="Browse our degree programmes"
                className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-white text-[#21409A] border-2 border-[#dbeafe] rounded-xl font-bold text-sm sm:text-[16px] flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all focus-visible:ring-2 focus-visible:ring-[#21409A] focus-visible:outline-none"
              >
                Explore Programmes
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
