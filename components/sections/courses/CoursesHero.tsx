'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import RevealText from '../../effects/RevealText';

const CoursesHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={containerRef} className="relative w-full flex flex-col items-center bg-[#f3f6fb] overflow-hidden min-h-[85vh] md:min-h-[90vh]">
      {/* Decorative Blobs for Consistency */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#21409A]/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center pt-20 md:pt-32 pb-4">
        <div className="text-center flex flex-col items-center">
          <RevealText 
            text="Discover Our"
            className="text-[#333333] text-2xl md:text-[42px] font-bold mb-2 block tracking-tight justify-center"
          />

          <RevealText 
            text="Academic Programs"
            className="text-4xl md:text-[96px] font-black text-[#21409A] mb-8 leading-[1] tracking-tight uppercase justify-center"
            delay={0.3}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[13px] md:text-[16px] text-[#444444] max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Expand your horizons with our diverse educational options designed to meet industry demands.
          </motion.p>
        </div>
      </div>

      {/* Hero Image Section - Bleed to edges */}
      <div className="w-full relative h-[350px] md:h-[600px] mt-8 md:mt-12 overflow-hidden">
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image
            src="/images/courses/course-hero.png"
            alt="IIC Campus Life"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale-[20%] brightness-105"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesHero;
