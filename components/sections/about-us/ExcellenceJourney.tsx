'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const historyItems = [
  {
    year: "2017",
    title: "Foundation Established",
    description: "IIC was established with a vision to bring world-class British education to the Eastern region of Nepal.",
    color: "#00A69C",
  },
  {
    year: "2018",
    title: "First Cohort Enrolled",
    description: "Welcomed our first batch of enthusiastic students in the BSc (Hons) Computing program.",
    color: "#21409A",
  },
  {
    year: "2020",
    title: "Campus Expansion",
    description: "Inaugurated the new state-of-the-art facility featuring advanced labs and a modern learning environment.",
    color: "#5B4B9C",
  },
  {
    year: "2022",
    title: "Industry Partnerships",
    description: "Strengthened our ecosystem with over 50+ local and international industry partners.",
    color: "#C04444",
  }
];

const ExcellenceJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] font-sora">
            Our Journey of Excellence
          </h2>
          <p className="mt-6 text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto font-sora">
            A legacy of transforming education in Eastern Nepal, one milestone at a time.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200/50 hidden md:block -translate-x-1/2 rounded-full overflow-hidden pointer-events-none">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-[#00A69C] via-[#21409A] to-[#C04444] rounded-full"
            />
          </div>

          <div className="space-y-24 md:space-y-40">
            {historyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Card Side */}
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-12 md:p-20 rounded-[3.5rem] text-left text-white shadow-2xl w-full max-w-2xl relative group overflow-hidden"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="absolute top-0 right-0 p-12 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-500" />
                    
                    <div className="inline-block px-5 py-2 bg-black/30 rounded-full text-xs font-bold mb-8 tracking-widest font-sora backdrop-blur-sm">
                      {item.year}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 font-sora leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium font-sora">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spinning Center Node */}
                <div className="relative z-10 hidden md:flex items-center justify-center">
                   <motion.div 
                     initial={{ rotate: 0, scale: 0 }}
                     whileInView={{ rotate: 360, scale: 1 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                     className="w-14 h-14 rounded-full bg-white border-4 flex items-center justify-center shadow-xl z-20" 
                     style={{ borderColor: item.color }}
                   >
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }} 
                      />
                   </motion.div>
                   
                   {/* Pulse Effect */}
                   <motion.div 
                     initial={{ scale: 0, opacity: 0 }}
                     whileInView={{ scale: 1.5, opacity: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, delay: 0.4 }}
                     className="absolute w-14 h-14 rounded-full bg-current opacity-20"
                     style={{ color: item.color }}
                   />
                </div>

                {/* Empty Spacer Side */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcellenceJourney;
