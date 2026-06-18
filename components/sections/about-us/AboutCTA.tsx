'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutCTA = () => {
  return (
    <section className="py-24 bg-[#21409A]">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white font-iic leading-tight mb-8">
            Experience it yourself.
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-medium mb-12 max-w-2xl font-iic">
            Join a community that&apos;s shaping the future. Apply now or visit our campus to see innovation in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/admissions" className="px-10 py-5 bg-white text-[#21409A] font-black rounded-xl hover:bg-gray-100 transition-colors tracking-widest text-sm">
              Apply Now
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-white text-white font-black rounded-xl hover:bg-white/10 transition-colors tracking-widest text-sm">
              Visit Campus
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
