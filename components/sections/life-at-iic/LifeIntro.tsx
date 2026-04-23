'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LifeIntro = () => {
  return (
    <section className="py-24 md:py-32 bg-white flex items-center justify-center text-center px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] leading-[1.1] tracking-tight mb-10 font-sora"
        >
          More Than Just A Degree. <br />
          A Place To <span className="text-[#007a5e]">Grow</span>, <span className="text-[#007a5e]">Connect</span>, <br />
          And <span className="text-[#007a5e]">Thrive</span>.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg lg:text-xl font-medium leading-relaxed font-sora"
        >
          At Itahari International College, we believe that education extends far beyond the walls of the lecture theatre. Our campus is designed to be a dynamic ecosystem that nurtures your passions, builds lifelong friendships, and prepares you for the global stage.
        </motion.p>
      </div>
    </section>
  );
};

export default LifeIntro;
