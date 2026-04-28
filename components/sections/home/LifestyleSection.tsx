'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';
import Tilt from '../../effects/Tilt';

const LifestyleSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[#74C044] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 font-sora">
            Discover
          </span>
          <Magnetic strength={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-2 font-sora">
              Lifestyle At
            </h2>
          </Magnetic>
          <Magnetic strength={0.2}>
            <AnimeReveal
              text="IIC"
              as="h2"
              className="text-6xl md:text-8xl font-black text-[#74C044] leading-[0.8] tracking-tight mb-10 font-sora justify-center"
              staggerFrom="center"
              delay={0.2}
            />
          </Magnetic>
          <RevealText
            text="Beyond Academics. A Vibrant Campus, Diverse Student Community, And State-Of-The-Art Facilities Designed For Holistic Growth."
            className="max-w-3xl text-gray-500 text-base md:text-lg font-medium leading-relaxed justify-center"
          />
        </div>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[800px]">
          {/* Main Large Image (Left) */}
          <div className="md:col-span-2 relative h-full">
            <Tilt className="h-full">
              <div className="relative h-[400px] md:h-full group rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl cursor-pointer">
                <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                  <Image
                    src="/images/home/iic-lifestyle 3.png"
                    alt="Lifestyle at IIC"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </motion.div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                {/* Label */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-3">
                  <span className="text-white text-lg md:text-2xl font-bold font-sora">
                    Library
                  </span>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Right Column (Stacked) */}
          <div className="flex flex-col gap-6">
            {/* Top Stacked Image */}
            <Tilt className="flex-1">
              <div className="relative h-[300px] md:h-full group rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl cursor-pointer">
                <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                  <Image
                    src="/images/home/iic-lifestyle 1.png"
                    alt="Lecture Theater"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-8 left-8 flex items-center gap-2">
                  <span className="text-white text-base md:text-lg font-bold font-sora">
                    Lecture Theater
                  </span>
                </div>
              </div>
            </Tilt>

            {/* Bottom Stacked Image */}
            <Tilt className="flex-1">
              <div className="relative h-[300px] md:h-full group rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl cursor-pointer">
                <motion.div style={{ y: y3 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                  <Image
                    src="/images/home/iic-lifestyle 2.png"
                    alt="Advanced Labs"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-8 left-8 flex items-center gap-2">
                  <span className="text-white text-base md:text-lg font-bold font-sora">
                    Advanced Labs
                  </span>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;

