'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#74C044]/10 text-[#74C044] text-[12px] font-bold tracking-widest uppercase mb-8"
        >
          Who We Are
        </motion.span>
        
        <Magnetic strength={0.2}>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold text-[#1a1a1a] tracking-tight leading-[1.1] mb-12">
            Shape Your <br />
            <div className="overflow-hidden inline-block align-bottom">
              <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#74C044] block"
              >
                FUTURE
              </motion.span>
            </div>
            <br /> In Nepal
          </h2>
        </Magnetic>

        <div className="max-w-3xl">
          <RevealText 
            text="IIC is a flagship institution of Innovate Nepal Group. We offer BSc (Hons) Computing and BA (Hons) Business Administration directly delivered in partnership with London Metropolitan University — right here in Itahari."
            className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed justify-center"
            delay={0.3}
          />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 mx-auto w-24 h-[3px] bg-[#74C044]/30 rounded-full origin-center" 
          />
        </div>
      </div>

      <div className="w-full mt-20 md:mt-32 relative h-[400px] md:h-[700px] overflow-hidden">
        <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/home/tower_block.png"
            alt="Tower Block"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
    </section>
  );
};



export default AboutSection;
