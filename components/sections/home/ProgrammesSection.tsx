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

  const programmes = [
    {
      type: 'BSc (Hons) Computing',
      duration: '3 Years',
      title: 'Bachelor in',
      subtitle: 'Information Technology',
      modules: '17 Modules',
      credits: '360 Credits',
      image: '/images/home/course1.png',
      bgColor: 'bg-[#126DA2]',
      tagColor: 'bg-[#0e567f]',
      tags: ['Artificial Intelligence', 'Application Development', 'Cloud Computing and Internet of Things'],
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
      bgColor: 'bg-[#00BBCC]',
      tagColor: 'bg-[#0095a3]',
      tags: ['Project Management', 'Marketing'],
      parallax: y1
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-white overflow-x-clip overflow-y-visible">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-[#74C044] text-[12px] md:text-[14px] font-bold tracking-[0.3em] uppercase mb-6 font-sora"
        >
          Our Programmes
        </motion.span>

        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2 font-sora">
            Nepal&apos;s First Direct UK Degree in
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 w-full mb-20 max-w-[1440px] 2xl:max-w-[1600px]">
          {programmes.map((prog, index) => (
            <Tilt key={index} strength={4} className="h-full min-w-0">
              <motion.div
                initial={{
                  y: 60,
                  opacity: 0
                }}
                whileInView={{
                  y: 0,
                  opacity: 1
                }}
                viewport={{ once: true, margin: "0px 0px -80px 0px", amount: 0.15 }}
                transition={{
                  delay: index * 0.1,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`${prog.bgColor} rounded-[32px] sm:rounded-[40px] md:rounded-[48px] p-6 sm:p-8 md:p-10 2xl:p-12 relative overflow-hidden flex h-full min-h-[520px] sm:min-h-[500px] md:min-h-[520px] xl:min-h-[500px] 2xl:min-h-[540px] flex-col justify-between shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group cursor-pointer border border-white/5 transition-shadow duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10 max-w-[72%] sm:max-w-[64%] xl:max-w-[58%] relative z-20"
                  >
                    <span className={`${prog.tagColor} max-w-full truncate text-white text-[10px] md:text-[11px] px-4 py-2 rounded-full font-bold tracking-wider uppercase border border-white/10 shadow-lg whitespace-nowrap `}>
                      {prog.type}
                    </span>
                    <span className="bg-white/15 backdrop-blur-xl text-white text-[10px] md:text-[11px] px-3.5 py-2 rounded-full font-bold border border-white/10 flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {prog.duration}
                    </span>
                  </motion.div>

                  <div className="max-w-[70%] sm:max-w-[62%] xl:max-w-[54%] relative z-10">
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
                      <h3 className="text-white text-[32px] sm:text-4xl md:text-[42px] xl:text-4xl 2xl:text-[44px] font-black leading-[1.05] mb-8 font-sora uppercase">
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
                          <li key={i} className="text-white/80 text-[13px] md:text-[15px] flex items-center gap-3 font-medium leading-relaxed transition-transform duration-300 hover:translate-x-2">
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
                      className="flex flex-wrap gap-3 sm:gap-4"
                    >
                      <span className="bg-white/10 backdrop-blur-xl text-white text-[12px] md:text-[13px] font-bold px-5 py-2 rounded-full border border-white/10">
                        {prog.modules}
                      </span>
                      <span className="bg-white/10 backdrop-blur-xl text-white text-[12px] md:text-[13px] font-bold px-5 py-2 rounded-full border border-white/10">
                        {prog.credits}
                      </span>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ delay: index * 0.1 + 1.1 }}
                      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-6 border-t border-white/10"
                    >
                      <div className="flex gap-2 flex-wrap min-w-0 sm:max-w-[72%]">
                        {prog.tags?.map((item, i) => (
                          <span key={i} className="max-w-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest leading-snug text-white/40 px-3 py-1.5 bg-white/5 rounded-md border border-white/5">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="flex shrink-0 items-center gap-4 self-start sm:self-auto text-[11px] font-black uppercase tracking-widest text-white group/btn">
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
                  style={{
                    y: prog.parallax,
                    maskImage: 'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
                  }}
                  className="absolute right-[-8%] top-24 bottom-36 w-[54%] pointer-events-none z-0 overflow-hidden sm:right-[-2%] sm:top-8 sm:bottom-32 sm:w-[50%] md:right-0 md:top-6 md:w-[48%]"
                >
                  <Image
                    src={prog.image}
                    alt={prog.subtitle}
                    fill
                    sizes="(max-width: 640px) 60vw, (max-width: 1280px) 50vw, 28vw"
                    className="object-contain object-right-bottom transition-all duration-1000 group-hover:scale-105 group-hover:-translate-y-2"
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
            text="Starting your college journey is a meaningful experience shaped by growth, and we’re
here to support you in every step of the way, helping you feel confident and connected as
you begin this new chapter."
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
