'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import StatsStrip from './StatsStrip';
import RevealText from '../../effects/RevealText';
import CloudBackground from '../../effects/CloudBackground';
import { ObfuscatedEmailLink } from '@/components/common/ObfuscatedEmail';

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
          <ObfuscatedEmailLink
            mailbox="info"
            className="group flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] rounded sm:text-xs"
          >
            {({ label }) => (
              <>
                <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-[#74C044]">
                  <path d="M3 6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span suppressHydrationWarning>{label}</span>
              </>
            )}
          </ObfuscatedEmailLink>
        </div>
      </div>

      <CloudBackground className="absolute inset-x-0 top-0 z-0 h-[760px] overflow-hidden pointer-events-none select-none opacity-75 sm:h-[100svh] sm:opacity-100" />

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
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-6">
        {/* Centered Logo - Specifically for Home Page Hero */}
        <div className="relative z-40 flex w-full items-center justify-center pb-2 pt-10 sm:pb-3 sm:pt-16 md:pb-4 md:pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[64px] w-[min(292px,calc(100vw-3rem))] overflow-hidden sm:h-[102px] sm:w-[420px] md:h-[112px] md:w-[460px]"
          >
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College Logo"
              fill
              sizes="(max-width: 640px) 360px, (max-width: 768px) 420px, 460px"
              className="object-contain sm:object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        <div className="flex w-full flex-col items-center pt-4 text-center sm:pt-2 md:pt-4">
          <RevealText
            as="h1"
            text="UK Degrees in Itahari"
            className="mb-4 w-full max-w-[340px] text-center font-iic text-[38px] font-black uppercase leading-[1.04] tracking-normal text-[#21409A] sm:mb-5 sm:max-w-[1180px] sm:text-[68px] sm:leading-[1.02] md:mb-8 md:text-[88px] lg:text-[104px] xl:text-[112px] justify-center"
            delay={0.4}
          />
          <RevealText
            as="p"
            text="Launch your global career with IT and Business programmes from London Metropolitan University."
            className="mb-6 max-w-[320px] px-1 font-iic text-[15px] font-semibold leading-[1.55] text-gray-500 sm:mb-8 sm:max-w-4xl sm:px-4 sm:text-lg sm:font-medium md:mb-12 md:text-[24px] md:leading-[1.6] lg:text-[28px] justify-center"
            delay={0.7}
          />

          <div className="relative z-20 mb-8 flex w-full max-w-[320px] flex-col gap-3 sm:mb-20 sm:w-auto sm:max-w-none sm:flex-row sm:gap-6 md:mb-44 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                aria-label="Schedule a college visit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#21409A] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_36px_-20px_rgba(33,64,154,0.95)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] sm:w-auto sm:rounded-xl sm:px-10 sm:py-4 sm:text-[16px] sm:shadow-2xl"
              >
                <CalendarCheck className="h-4 w-4 sm:hidden" aria-hidden />
                <span>Schedule a Visit</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/courses"
                aria-label="Browse our degree programmes"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#BED5FF] bg-white/95 px-6 py-3 text-sm font-bold text-[#21409A] shadow-[0_14px_34px_-24px_rgba(33,64,154,0.8)] transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21409A] sm:w-auto sm:rounded-xl sm:border-2 sm:border-[#dbeafe] sm:px-10 sm:py-4 sm:text-[16px] sm:shadow-lg sm:hover:bg-gray-50"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="h-4 w-4 sm:hidden" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Building Image Layer — Pinned to bottom, separate from content flow */}
      <div className="relative z-0 mt-auto h-[260px] w-full -mt-6 overflow-visible sm:h-[400px] sm:-mt-12 md:h-[650px] md:-mt-24">
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-x-[-22%] bottom-0 h-full sm:inset-x-0"
        >
          <Image
            src="/images/home/hero.webp"
            alt="Itahari International College ING Block Building"
            fill
            sizes="(max-width: 1536px) 100vw, 1536px"
            className="object-cover object-top"
            priority
          />
        </motion.div>
      </div>

      {/* Stats Bar — Naturally follows the building */}
      <div className="relative z-20 mt-0 w-full bg-white sm:mt-6 md:-mt-16">
        <StatsStrip />
      </div>
    </section >
  );
};

export default HeroSection;
