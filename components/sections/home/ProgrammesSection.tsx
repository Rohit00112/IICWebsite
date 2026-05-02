'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';
import Tilt from '../../effects/Tilt';

const ProgrammesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const programmes = [
    {
      type: 'BSc (Hons) Computing',
      duration: '3 Years',
      title: 'Bachelor in',
      subtitle: 'Information Technology',
      modules: '17 Modules',
      credits: '360 Credits',
      image: '/images/home/course1.png',
      bgColor: 'bg-[#2a4d1b]', // Darker version of brand green
      tagColor: 'bg-[#74C044]',
      parallax: y1
    },
    {
      type: 'BA (Hons) Business Administration',
      duration: '3 Years',
      title: 'BBA',
      subtitle: 'Specialization',
      list: ['International Business', 'Digital Business Management', 'Advertising And Marketing'],
      modules: '17 Modules',
      credits: '360 Credits',
      image: '/images/home/course2.png',
      bgColor: 'bg-[#21409A]',
      tagColor: 'bg-[#1a337e]',
      parallax: y1
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-[#74C044] text-[12px] md:text-[14px] font-bold tracking-[0.3em] uppercase mb-6 font-sora"
        >
          Our Programmes
        </motion.span>

        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2 font-sora">
            Nepal's First Direct UK Degree At
          </h2>
          <div className="overflow-hidden py-2">
            <Magnetic strength={0.1}>
              <AnimeReveal
                text="ITAHARI"
                as="h2"
                className="text-4xl md:text-7xl font-black text-[#74C044] tracking-tight leading-none font-sora"
                staggerFrom="center"
                delay={0.2}
              />
            </Magnetic>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-20 max-w-[1440px]">
          {programmes.map((prog, index) => (
            <Tilt key={index} strength={4}>
              <motion.div
                initial={{ 
                  clipPath: 'inset(100% 0 0 0)', 
                  y: 100,
                  opacity: 0
                }}
                whileInView={{ 
                  clipPath: 'inset(0% 0 0 0)', 
                  y: 0,
                  opacity: 1
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 1.4, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`${prog.bgColor} rounded-[40px] md:rounded-[48px] p-10 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[440px] md:h-[480px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group cursor-pointer border border-white/5 transition-shadow duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap gap-4 mb-10"
                  >
                    <span className={`${prog.tagColor} text-white/95 text-[10px] md:text-[12px] px-5 py-2 rounded-full font-bold tracking-widest uppercase border border-white/10 shadow-lg`}>
                      {prog.type}
                    </span>
                    <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] md:text-[12px] px-5 py-2 rounded-full font-bold border border-white/10 flex items-center gap-2">
                      <span className="text-sm">🕒</span> {prog.duration}
                    </span>
                  </motion.div>

                  <div className="max-w-[70%] md:max-w-[60%]">
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                    >
                      <h3 className="text-white/60 text-lg md:text-xl font-medium mb-1 font-sora tracking-tight">
                        {prog.title}
                      </h3>
                      <h3 className="text-white text-3xl md:text-4xl font-black leading-[1.05] mb-8 font-sora tracking-tighter uppercase italic">
                        {prog.subtitle}
                      </h3>
                    </motion.div>

                    {prog.list && (
                      <motion.ul 
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ delay: index * 0.1 + 0.8, duration: 1 }}
                        className="space-y-2 mb-8"
                      >
                        {prog.list.map((item, i) => (
                          <li key={i} className="text-white/80 text-[13px] md:text-[15px] flex items-center gap-3 font-medium transition-transform duration-300 hover:translate-x-2">
                             <span className="w-1.5 h-1.5 bg-[#74C044] rounded-full shrink-0 shadow-[0_0_8px_rgba(116,192,68,0.6)]"></span>
                             {item}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>

                  <div className="mt-auto flex flex-col gap-6">
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      transition={{ delay: index * 0.1 + 0.9, duration: 0.8, ease: "backOut" }}
                      className="flex gap-4"
                    >
                      <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] md:text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/10">
                        {prog.modules}
                      </span>
                      <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] md:text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/10">
                        {prog.credits}
                      </span>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ delay: index * 0.1 + 1.1 }}
                      className="flex items-center justify-between pt-6 border-t border-white/10"
                    >
                      <div className="flex gap-2">
                         {prog.list?.slice(0, 2).map((item, i) => (
                           <span key={i} className="text-[9px] font-black uppercase tracking-widest text-white/40 px-3 py-1 bg-white/5 rounded-md border border-white/5">
                             {item.split(' ').slice(-1)[0]}
                           </span>
                         ))}
                      </div>
                      <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-white group/btn">
                        Explore
                        <div className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center group-hover/btn:border-[#74C044] group-hover/btn:bg-[#74C044] transition-all duration-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 60, scale: 1.1 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ y: prog.parallax }}
                  className="absolute right-[-5%] bottom-[-5%] w-[55%] h-[90%] pointer-events-none"
                >
                  <Image
                    src={prog.image}
                    alt={prog.subtitle}
                    fill
                    sizes="(max-width: 768px) 60vw, 40vw"
                    className="object-contain object-bottom transition-all duration-1000 group-hover:scale-105 group-hover:-translate-y-4 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  />
                </motion.div>
                
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            </Tilt>
          ))}
        </div>

        <div className="max-w-3xl text-center flex flex-col items-center">
          <RevealText
            text="Beginning Your College Journey Is A Very Personal And Sacred Experience That Encompasses A Wide Range Of Events Compounding Your Growth."
            className="text-gray-500 text-sm md:text-base font-medium leading-relaxed mb-10 px-4 justify-center"
          />
          <Magnetic strength={0.3}>
            <button className="bg-[#21409A] text-white px-12 py-4 rounded-lg font-bold text-lg shadow-2xl hover:opacity-90 transition-all active:scale-95">
              Enroll Now
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;

