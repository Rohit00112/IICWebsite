'use client';

import React, { useEffect, useState } from 'react';
import { animate, motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const ctrl = animate(0, 100, {
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setPercentage(Math.round(v)),
    });

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1600);

    return () => {
      ctrl.stop();
      clearTimeout(timer);
    };
  }, []);

  const tagline = 'Developing Impactful Graduates';
  const words = tagline.split(' ');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Split panels — invisible during load, slide apart on exit */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-101%' }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 z-10 bg-white will-change-transform"
          />
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '101%' }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 z-10 bg-white will-change-transform"
          />

          {/* Central Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex w-full max-w-sm flex-col items-center px-6 sm:max-w-md"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mb-8 h-10 w-48 sm:w-56 md:mb-12 md:h-14 md:w-72"
            >
              <Image
                src="/images/common/iic_logo.png"
                alt="Itahari International College Logo"
                fill
                sizes="(max-width: 768px) 224px, 288px"
                className="object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>

            {/* Progress Wrapper */}
            <div className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[320px]">
              {/* Thin Progress Bar with Percentage Inside */}
              <div className="relative h-6 w-full bg-[#21409A]/5 rounded-full overflow-hidden border border-[#21409A]/10">
                
                {/* Background Text (Blue) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#21409A] text-[10px] md:text-xs font-black font-iic tabular-nums uppercase tracking-widest">
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
                  <div className="absolute inset-0 w-[220px] sm:w-[240px] md:w-[320px] flex items-center justify-center">
                    <span className="text-white text-[10px] md:text-xs font-black font-iic tabular-nums uppercase tracking-widest">
                      {percentage}%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Tagline below the bar */}
              <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-1 mt-5 md:mt-6 overflow-hidden">
                {words.map((word, wIdx) => (
                  <div key={wIdx} className="flex overflow-hidden">
                    {word.split('').map((char, cIdx) => (
                      <motion.span
                        key={cIdx}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.15 + (wIdx * 0.06) + (cIdx * 0.015),
                          ease: "easeOut"
                        }}
                        className="text-[#21409A] text-[9px] sm:text-[10px] md:text-xs font-black tracking-[0.16em] sm:tracking-[0.2em] uppercase"
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
