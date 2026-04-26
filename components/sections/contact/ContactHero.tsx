'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import GlassSurprise from '../../effects/GlassSurprise';

const ContactHero = () => {
  return (
    <section 
      className="relative w-full min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-black"
    >
      {/* Background Image (Static) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/tower_block.png"
          alt="IIC Tower Block"
          fill
          className="object-cover brightness-50 scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      {/* Visually Surprising Glass System */}
      <div className="relative z-10 w-full">
        <GlassSurprise>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <RevealText
                as="h1"
                text="Let's Start a Conversation"
                className="text-4xl md:text-6xl font-bold text-[#ffffff] mb-6 font-sora justify-center drop-shadow-md"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed font-medium"
            >
              Whether you're a prospective student, a potential industry partner, or just have a general question, our team is here to help you navigate your journey with us.
            </motion.p>
            
            {/* Interactive Surprise Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 2 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Interact to Explore</span>
            </motion.div>
          </div>
        </GlassSurprise>
      </div>

      {/* Floating Ambient Orbs for Extra Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#21409A]/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#74C044]/10 blur-[150px] rounded-full" 
        />
      </div>
    </section>
  );
};

export default ContactHero;
