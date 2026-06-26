'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import AnimeReveal from '../../effects/AnimeReveal';

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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center pt-20 md:pt-28 pb-4">
        <div className="text-center flex flex-col items-center">
          <RevealText 
            text="Learn locally"
            className="text-[#333333] text-xl md:text-[32px] font-bold mb-2 block tracking-tight justify-center"
          />

          <AnimeReveal
            as="h1"
            text="Compete globally"
            className="text-4xl md:text-6xl lg:text-[100px] font-black text-[#21409A] mb-8 leading-[1] tracking-tight justify-center"
            staggerFrom="center"
            delay={0.2}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm text-[#444444] max-w-2xl mx-auto leading-relaxed font-medium tracking-widest opacity-70"
          >
            Explore UK-awarded IT and Business programmes designed with practical learning, global standards, and career readiness at the centre.
          </motion.p>
        </div>
      </div>

      {/* Hero Image Section - Bleed to edges */}
      <motion.div 
        initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative h-[350px] md:h-[600px] mt-8 md:mt-12 overflow-hidden"
      >
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image
            src="/images/courses/course-hero.JPG"
            alt="Itahari International College Campus Life"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center grayscale-[20%] brightness-105"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoursesHero;
