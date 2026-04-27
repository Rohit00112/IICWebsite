'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';

const NewsHero = () => {
  return (
    <section className="pt-32 pb-16 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-6 py-2 bg-[#00B2A9] text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 shadow-lg shadow-[#00B2A9]/20"
        >
          Discover What&apos;s Happening
        </motion.div>
        
        <div className="flex flex-col items-center">
          <AnimeReveal
            as="h1"
            text="News & Events"
            className="text-6xl md:text-8xl font-black font-sora text-[#1a1a1a] mb-8 justify-center"
            staggerFrom="center"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-gray-500 text-lg md:text-xl max-w-3xl leading-relaxed font-medium"
          >
            Stay updated with the latest campus news, upcoming events, academic announcements, and student achievements.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
