'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const InnovationLab = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xClassroom = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const words = "CLASSROOM".split("");

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-[#f4f7fa] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-2 font-sora"
          >
            Life Beyond The
          </motion.h2>
          <div className="overflow-hidden py-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-black text-[#74C044] leading-[0.9] tracking-tighter font-sora"
            >
              CLASSROOM
            </motion.h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="max-w-2xl"
          >
            <h3 className="text-4xl md:text-[56px] font-bold text-[#21409A] mb-6 font-sora">
              Innovation Lab
            </h3>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
              Beyond academics, IIC offers a dynamic environment fostering creativity, leadership, and lifelong friendships.
            </p>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#74C044] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 hover:opacity-90 transition-all shadow-lg hover:shadow-xl shrink-0"
          >
            Explore Innovation Lab
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group aspect-[4/3] md:aspect-auto h-full rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl"
          >
            <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <Image
                src="/images/ivlab1.png"
                alt="Clubs & Societies"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 font-sora">
                Clubs & Societies
              </h4>
              <p className="text-white/80 text-base md:text-lg">
                Join over 20 active student-led organizations.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl"
              >
                <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
                  <Image
                    src="/images/ivlab2.png"
                    alt="State-of-art Library"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-lg md:text-xl font-bold text-white font-sora">
                    State-of-art Library
                  </h4>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative group aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl"
              >
                <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
                  <Image
                    src="/images/ivlab3.png"
                    alt="Tech Events"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-lg md:text-xl font-bold text-white font-sora">
                    Tech Events & Hackathons
                  </h4>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative group aspect-[21/9] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl"
            >
              <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                  src="/images/ivlab4.png"
                  alt="Cafeteria & Social Hub"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-sora">
                  Cafeteria & Social Hub
                </h4>
                <p className="text-white/70 text-sm md:text-base">
                  The perfect place to unwind and network between classes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
