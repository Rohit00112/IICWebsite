'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCTA = () => {
  return (
    <section className="py-24 bg-[#004225] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-7xl font-bold font-sora tracking-tight">
            Experience it yourself.
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed font-sora">
            Experience the IIC difference firsthand. Whether you're ready to
            apply or just want to explore our campus, we're here to guide you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-[#004225] font-bold rounded-xl shadow-xl transition-all duration-300 font-sora w-full sm:w-auto"
            >
              Schedule a Campus Tour
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 font-sora w-full sm:w-auto"
            >
              Start Your Application
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceCTA;
