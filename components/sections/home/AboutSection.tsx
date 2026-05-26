'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import AnimeReveal from '../../effects/AnimeReveal';

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative w-full py-16 sm:py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#74C044]/10 text-[#74C044] text-[11px] sm:text-[12px] font-bold tracking-[0.18em] sm:tracking-widest uppercase mb-6 md:mb-8"
        >
          Who We Are
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[34px] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a1a1a] tracking-tight leading-[1.08] md:leading-[1.1] mb-8 md:mb-12"
        >
          Shape Your <br />
          <div className="inline-block align-bottom">
            <AnimeReveal
              text="FUTURE"
              as="span"
              className="text-[#74C044]"
              staggerFrom="center"
              delay={0.3}
            />
          </div>
          <br /> In Nepal
        </motion.h2>

        <div className="max-w-3xl">
          <RevealText
            text="Itahari International College is a flagship institution of Innovate Nepal Group. We offer BSc (Hons) Computing and BA (Hons) Business Administration directly delivered in partnership with London Metropolitan University — right here in Itahari."
            className="text-gray-500 text-base sm:text-lg md:text-xl font-medium leading-relaxed justify-center"
            delay={0.3}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 md:mt-12 mx-auto w-24 h-[3px] bg-[#74C044]/30 rounded-full origin-center"
          />
        </div>
      </div>

    </section>
  );
};



export default AboutSection;
