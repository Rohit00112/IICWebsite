'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StatsStrip = () => {
  const stats = [
    { label: 'Students Enrolled', value: '2000+' },
    { label: 'Industry Partners', value: '100+' },
    { label: 'Years Of Excellence', value: '8+' },
  ];

  return (
    <div className="bg-[#007a5e] py-10 md:py-14 relative z-10 w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center text-white py-6 md:py-0 px-4"
          >
            <span className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-1 font-sora">
              {stat.value}
            </span>
            <span className="text-base md:text-lg font-medium opacity-80 text-center uppercase tracking-widest">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsStrip;
