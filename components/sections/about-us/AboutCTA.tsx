'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutCTA = () => {
  return (
    <section className="py-24 bg-[#0A2520]">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white font-sora leading-tight mb-8">
            Experience it yourself.
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-medium mb-12 max-w-2xl font-sora">
            Join a community that's shaping the future. Apply now or visit our campus to see innovation in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-5 bg-white text-[#0A2520] font-black rounded-xl hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm">
              Apply Now
            </button>
            <button className="px-10 py-5 border border-white text-white font-black rounded-xl hover:bg-white/10 transition-colors uppercase tracking-widest text-sm">
              Visit Campus
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
