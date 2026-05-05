'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Percentage counter logic
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Auto-hide after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const tagline = 'Unleashing Your Potential';
  const words = tagline.split(' ');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }} // Longer delay to let curtains finish
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Curtains */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white z-10 border-r border-blue-50/50 shadow-[20px_0_40px_rgba(0,0,0,0.03)]"
          />
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white z-10 border-l border-blue-50/50 shadow-[-20px_0_40px_rgba(0,0,0,0.03)]"
          />

          {/* Central Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-64 md:w-80 h-24 mb-12"
            >
              <Image
                src="/images/common/iic_logo.png"
                alt="IIC Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Progress Wrapper */}
            <div className="w-full max-w-[240px] md:max-w-[320px]">
              {/* Thin Progress Bar with Percentage Inside */}
              <div className="relative h-6 w-full bg-blue-50/50 rounded-full overflow-hidden border border-blue-100/10">
                
                {/* Background Text (Blue) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#21409A] text-[10px] md:text-xs font-black font-sora tabular-nums uppercase tracking-widest">
                    {percentage}%
                  </span>
                </div>

                {/* Progress Bar (Blue) */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: percentage / 100 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  className="absolute inset-0 bg-[#21409A] origin-left z-10"
                >
                  {/* Foreground Text (White) - Only visible where bar exists */}
                  <div className="absolute inset-0 w-[240px] md:w-[320px] flex items-center justify-center">
                    <span className="text-white text-[10px] md:text-xs font-black font-sora tabular-nums uppercase tracking-widest">
                      {percentage}%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Tagline below the bar */}
              <div className="flex justify-center gap-1.5 mt-6 overflow-hidden">
                {words.map((word, wIdx) => (
                  <div key={wIdx} className="flex overflow-hidden">
                    {word.split('').map((char, cIdx) => (
                      <motion.span
                        key={cIdx}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 1 + (wIdx * 0.1) + (cIdx * 0.03),
                          ease: "easeOut"
                        }}
                        className="text-[#21409A] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase"
                      >
                        {char}
                      </motion.span>
                    ))}
                    <span className="w-1" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
