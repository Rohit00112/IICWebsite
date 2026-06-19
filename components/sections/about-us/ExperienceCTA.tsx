'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const ExperienceCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-[#21409A] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <AnimeReveal
            as="h2"
            text="Experience it yourself."
            className="text-4xl md:text-7xl font-bold font-iic tracking-tight justify-center"
            staggerFrom="center"
          />
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed font-iic">
            Experience the Itahari International College difference yourself. Don&apos;t miss your chance whether you are ready to
            apply or just starting to explore, step in and discover a place you will naturally want to be part of.
          </p>

          <AnimeStagger
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
            selector=":scope > *"
            staggerDelay={120}
            translateY={24}
            duration={700}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="inline-flex justify-center px-10 py-5 bg-white text-[#21409A] font-bold rounded-xl shadow-xl transition-all duration-300 font-iic w-full sm:w-auto">
                Schedule a Campus Tour
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/admissions" className="inline-flex justify-center px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 font-iic w-full sm:w-auto">
                Start Your Application
              </Link>
            </motion.div>
          </AnimeStagger>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceCTA;
