'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const NewsLoader = () => {
  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#21409A] via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative mb-8 h-12 w-56 overflow-hidden md:h-16 md:w-72"
        >
          <Image
            src="/images/common/iic_logo.png"
            alt="Itahari International College Logo"
            fill
            sizes="(max-width: 768px) 224px, 288px"
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="w-56 md:w-72">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[#21409A] text-[10px] font-black tracking-widest opacity-50">
              Fetching News
            </span>
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#21409A] text-[10px] font-black tracking-widest"
            >
              Loading
            </motion.span>
          </div>
          
          {/* Indeterminate Progress Bar */}
          <div className="h-1.5 w-full bg-blue-50 rounded-full overflow-hidden relative">
            <motion.div
              animate={{ 
                x: ["-100%", "200%"],
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute inset-y-0 w-1/3 bg-[#21409A] rounded-full"
            />
          </div>
        </div>

        {/* Subtle Text below */}
        <p className="mt-6 text-[#21409A]/40 text-[9px] font-bold tracking-[0.3em]">
          Itahari International College
        </p>
      </motion.div>
    </div>
  );
};

export default NewsLoader;
