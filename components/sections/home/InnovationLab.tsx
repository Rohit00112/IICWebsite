'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import TechGrid from '../../effects/TechGrid';

const InnovationLab = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="innovation-lab" ref={containerRef} className="relative w-full bg-[#f4f7fa] pt-8 pb-14 overflow-hidden sm:pt-10 sm:pb-20 md:pt-10 md:pb-24">
      <TechGrid />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <Magnetic strength={0.1}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-xl sm:text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-2 font-iic"
            >
              Life beyond the<span className="sr-only"> Classroom</span>
            </motion.h2>
          </Magnetic>
          <div className="overflow-hidden px-12 py-8">
            <Magnetic strength={0.2}>
              <motion.div
                aria-hidden="true"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[44px] sm:text-6xl md:text-8xl font-black text-[#74C044] leading-[0.95] md:leading-[0.9] tracking-tight md:tracking-tighter font-iic"
              >
                Classroom
              </motion.div>
            </Magnetic>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-end mb-10 md:mb-12 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <Magnetic strength={0.1}>
              <h3 className="text-3xl sm:text-4xl md:text-[56px] font-bold text-[#21409A] mb-4 md:mb-6 font-iic">
                Innovation Lab
              </h3>
            </Magnetic>
            <RevealText
              text="Beyond academics, Innovation Lab at Itahari International
College offers a dynamic environment fostering creativity, leadership, and personal
growth."
              className="text-gray-500 text-base md:text-xl font-medium leading-relaxed"
            />
          </div>
          <Magnetic strength={0.25}>
            <motion.a
              href="https://innovation.iic.edu.np"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full justify-center md:w-auto bg-[#74C044] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center gap-3 hover:opacity-90 transition-all shadow-lg hover:shadow-xl shrink-0"
            >
              Explore Innovation Lab
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group aspect-[4/3] md:aspect-auto h-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl"
          >
            <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <Image
                src="/images/home/student-led.jpg"
                alt="Active Student Clubs and Societies at Itahari International College"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <RevealText
                text="Student Led Communities"
                className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 font-iic [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]"
              />
              
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group aspect-[4/3] sm:aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl"
              >
                <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
                  <Image
                    src="/images/home/entrepreneurship-and-research-support.JPG"
                    alt="Modern State-of-the-Art Library and Research Centre at Itahari International College Nepal"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-white font-iic [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
                    Entrepreneurship & Research Support
                  </h4>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group aspect-[4/3] sm:aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl"
              >
                <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
                  <Image
                    src="/images/home/tech-and-innovation-lab.jpeg"
                    alt="Tech Events and Hackathons at Innovation Lab"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-white font-iic [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
                    Tech Events & Hackathons
                  </h4>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group aspect-[16/9] sm:aspect-[21/9] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl"
            >
              <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                  src="/images/home/learning-zone.JPG"
                  alt="Learning Zones at Innovation Lab"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 font-iic [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
                  Learning Zones
                </h4>
              
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
