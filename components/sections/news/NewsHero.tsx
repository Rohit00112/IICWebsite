'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';

const NewsHero = () => {
  return (
    <section className="pt-28 pb-10 md:pt-32 md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-[11px] font-bold uppercase tracking-[0.28em] text-[#21409A] mb-6"
        >
          Newsroom
        </motion.span>

        <AnimeReveal
          as="h1"
          text="News & Events"
          className="text-5xl md:text-7xl font-black font-iic text-[#1a1a1a] mb-6 justify-center"
          staggerFrom="center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          College stories, student achievements, academic updates, and events from Itahari International College.
        </motion.p>
      </div>
    </section>
  );
};

export default NewsHero;
