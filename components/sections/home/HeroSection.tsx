'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import StatsStrip from './StatsStrip';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';

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
    <section ref={containerRef} className="relative w-full flex flex-col items-center bg-white overflow-hidden min-h-screen">
      {/* Decorative Floating Blobs */}
      <motion.div
        style={{ y: yBlob1 }}
        className="absolute top-20 -left-20 w-64 h-64 bg-[#21409A]/10 rounded-full blur-3xl z-0"
      />
      <motion.div
        style={{ y: yBlob2 }}
        className="absolute bottom-40 -right-20 w-96 h-96 bg-[#007a5e]/10 rounded-full blur-3xl z-0"
      />

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 flex flex-col items-center">
        {/* Centered Logo - Specifically for Home Page Hero */}
        <div className="w-full pt-16 md:pt-28 pb-6 flex items-center justify-center relative z-40">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-14 md:h-20 w-64 md:w-[450px]"
          >
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College Logo"
              fill
              sizes="(max-width: 768px) 256px, 450px"
              className="object-contain"
              priority
              loading="eager"
            />
          </motion.div>
        </div>

        <div className="pt-4 md:pt-8 text-center flex flex-col items-center">
          <RevealText 
            as="h1"
            text="UK-Affiliated Degrees In IT & Business. Partnered With London Metropolitan University To Bring World-Class Education To Eastern Nepal."
            className="text-xl md:text-[28px] font-medium text-[#1a1a1a] leading-[1.6] mb-12 max-w-4xl px-4 font-sora justify-center"
            delay={0.5}
          />

          <div className="flex flex-col sm:flex-row gap-5 mb-24 md:mb-44">
            <Magnetic strength={0.3}>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                aria-label="Schedule a campus visit"
                className="px-10 py-4 bg-[#21409A] text-white rounded-xl font-bold text-[16px] flex items-center justify-center gap-3 shadow-2xl hover:opacity-90 transition-all focus-visible:ring-2 focus-visible:ring-[#74C044] focus-visible:outline-none"
              >
                <span>Schedule A Visit</span>
                <span className="text-xl" role="img" aria-label="telephone icon">📞</span>
              </motion.a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/courses"
                aria-label="Explore our academic programmes"
                className="px-10 py-4 bg-white text-[#21409A] border-2 border-[#dbeafe] rounded-xl font-bold text-[16px] flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all focus-visible:ring-2 focus-visible:ring-[#21409A] focus-visible:outline-none"
              >
                Explore Programmes
              </motion.a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Building Image Layer — Pinned to bottom, separate from content flow */}
      <div className="w-full relative h-[400px] md:h-[650px] mt-auto overflow-hidden z-0">
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-0 w-full h-[120%] -top-[5%]"
        >
          <Image
            src="/images/home/hero.png"
            alt="IIC ING Block Building"
            fill
            sizes="(max-width: 1536px) 100vw, 1536px"
            className="object-cover object-center"
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