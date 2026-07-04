'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import GlassSurprise from '../../effects/GlassSurprise';

const ContactHero = () => {
  return (
    <section 
      className="relative w-full min-h-[52svh] md:min-h-[60vh] flex flex-col items-center justify-center pt-20 pb-10 md:pt-24 md:pb-12 overflow-hidden bg-black"
    >
      {/* Background Image (Static) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/common/tower_block.JPG"
          alt="Itahari International College Tower Block"
          fill
          className="object-cover brightness-50 md:scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      {/* Visually Surprising Glass System */}
      <div className="relative z-10 w-full">
        <GlassSurprise>
          <div className="flex flex-col items-center">
            <h1 className="mb-5 flex flex-col items-center text-center font-iic text-4xl font-bold leading-tight text-white drop-shadow-md md:mb-6 md:text-6xl">
              <span className="md:hidden">
                Connect with<br />
                Itahari International College
              </span>
              <span className="hidden flex-col items-center md:flex">
                <RevealText
                  as="span"
                  text="Connect with"
                  className="mb-2 justify-center md:mb-3"
                />
                <RevealText
                  as="span"
                  text="Itahari International College"
                  className="justify-center"
                />
              </span>
            </h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed font-medium mb-12">
                Whether you&apos;re planning your application, exploring a partnership, or visiting the college, our team is ready to guide you with clear and friendly support.
              </p>
              
              {/* Interactive Surprise Indicator */}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 2 }}
                className="hidden flex-col items-center gap-2 md:flex"
              >
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                <span className="text-[10px] tracking-[0.3em] text-white/40 font-bold">Reach IIC</span>
              </motion.div>
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
          className="absolute top-1/4 left-1/4 hidden w-96 h-96 bg-[#21409A]/10 blur-[120px] rounded-full md:block" 
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 hidden w-[500px] h-[500px] bg-[#74C044]/10 blur-[150px] rounded-full md:block" 
        />
      </div>
    </section>
  );
};

export default ContactHero;
