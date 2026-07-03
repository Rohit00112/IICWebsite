'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
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
  const moduleBadgeStyles = [
    'rounded-full bg-white text-[#21409A] border-white/70 shadow-[0_12px_28px_rgba(255,255,255,0.18)]',
    'rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#74C044] text-white border-white/25 shadow-[0_12px_28px_rgba(116,192,68,0.25)]',
    'rounded-xl bg-[#101010]/28 text-white border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.16)]',
  ];

  const programmes = [
    {
      type: 'BSc (Hons) Computing',
      duration: '3 Years',
      title: 'Bachelor in',
      subtitle: 'Information Technology',
      // modules: '17 Modules',
      // credits: '360 Credits',
      image: '/images/home/course1.png',
      bgColor: 'bg-[#1C86A6]',
      tagColor: 'bg-[#166D87]',
      pillColor: 'bg-[#459DB7]',
      featurePillColor: 'bg-[#3391AE]',
      tags: ['Artificial Intelligence', 'Application Development', 'Cloud Computing and the Internet of Things'],
      href: '/courses/bsc-hons-computing',
      parallax: y1
    },
    {
      type: 'BA (Hons) Business Administration',
      duration: '3 Years',
      title: 'Bachelor in',
      subtitle: 'Business Administration',
      list: ['International Business', 'Digital Business Management', 'Advertising and Marketing'],
      // modules: '17 Modules',
      // credits: '360 Credits',
      image: '/images/home/course2.png',
      bgColor: 'bg-[#1CBEC8]',
      tagColor: 'bg-[#159AA3]',
      pillColor: 'bg-[#55CDD5]',
      featurePillColor: 'bg-[#3CC6CF]',
      tags: ['Principles of Finance', 'Company and Business Law', 'Dissertation'],
      href: '/courses',
      specializations: [
        { name: 'International Business', href: '/courses/bba-international-business' },
        { name: 'Digital Business Management', href: '/courses/bba-digital-business-management' },
        { name: 'Advertising and Marketing', href: '/courses/bba-advertising-and-marketing' },
      ],
      parallax: y1
    },
  ];

  const [activePopup, setActivePopup] = useState<number | null>(null);

  useEffect(() => {
    if (activePopup === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePopup(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activePopup]);

  return (
    <section ref={containerRef} className="relative w-full bg-white pt-14 pb-8 overflow-x-clip overflow-y-visible sm:pt-20 sm:pb-10 md:pt-24 md:pb-10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-[#74C044] text-[11px] sm:text-[12px] md:text-[14px] font-bold tracking-[0.12em] md:tracking-[0.16em] mb-4 md:mb-6 font-iic"
        >
          Our Programmes
        </motion.span>

        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2 font-iic">
            Nepal&apos;s First <span className="text-[#74C044]">UK Degree</span> Programmes in<span className="sr-only"> Itahari</span>
          </h2>
          <div className="overflow-hidden py-2">
            <Magnetic strength={0.1}>
              <AnimeReveal
                text="Itahari"
                as="div"
                className="text-[44px] sm:text-6xl md:text-8xl font-black text-[#74C044] tracking-tight leading-none font-iic justify-center uppercase"
                staggerFrom="center"
                delay={0.2}
              />
            </Magnetic>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 w-full mb-14 md:mb-16 max-w-[1440px] 2xl:max-w-[1600px]">
          {programmes.map((prog, index) => {
            const cardInner = (
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
                  className={`${prog.bgColor} rounded-[24px] sm:rounded-[40px] md:rounded-[48px] p-5 sm:p-8 md:p-10 2xl:p-12 relative overflow-hidden flex h-full min-h-[440px] sm:min-h-[500px] md:min-h-[520px] xl:min-h-[500px] 2xl:min-h-[540px] flex-col justify-between group border border-white/5 cursor-pointer`}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10 max-w-full sm:max-w-[64%] xl:max-w-[58%] relative z-20"
                    >
                      <span className={`${prog.tagColor} max-w-full truncate text-white text-[9px] sm:text-[10px] md:text-[11px] px-3 sm:px-4 py-2 rounded-full font-bold tracking-wider border border-white/10 shadow-lg whitespace-nowrap`}>
                        {prog.type}
                      </span>
                      <span className={`${prog.pillColor} text-white text-[9px] sm:text-[10px] md:text-[11px] px-3 sm:px-3.5 py-2 rounded-full font-bold border border-white/15 flex items-center gap-1.5 whitespace-nowrap shrink-0`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {prog.duration}
                      </span>
                    </motion.div>

                    <div className="max-w-[82%] sm:max-w-[62%] xl:max-w-[54%] relative z-10">
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                      >
                        <h3 className="text-white/60 text-base sm:text-lg md:text-xl font-medium mb-1 font-iic tracking-tight">
                          {prog.title}
                        </h3>
                        <h3 className="text-white text-[25px] sm:text-4xl md:text-[42px] xl:text-4xl 2xl:text-[44px] font-black leading-[1.05] mb-6 sm:mb-8 font-iic">
                          {prog.subtitle}
                        </h3>
                      </motion.div>

                      {prog.list && (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          transition={{ delay: index * 0.1 + 0.8, duration: 1 }}
                          className="mb-8"
                        >
                          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/60 sm:text-[11px]">
                            Specialization
                          </p>
                          <ul className="space-y-2">
                            {prog.list.map((item, i) => (
                              <li key={i} className="text-[12px] sm:text-[13px] md:text-[15px] flex items-center gap-2.5 sm:gap-3 font-medium leading-relaxed text-white/80 transition-transform duration-300 hover:translate-x-2">
                                <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)] shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-6">
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, scale: 0.9 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                        transition={{ delay: index * 0.1 + 0.9, duration: 0.8, ease: "backOut" }}
                        className="flex flex-wrap gap-2.5 sm:gap-4"
                      >
                        {/* <span className={`${prog.pillColor} text-white text-[11px] sm:text-[12px] md:text-[13px] font-bold px-4 sm:px-5 py-2 rounded-full border border-white/15`}>
                          {prog.modules}
                        </span>
                        <span className={`${prog.pillColor} text-white text-[11px] sm:text-[12px] md:text-[13px] font-bold px-4 sm:px-5 py-2 rounded-full border border-white/15`}>
                          {prog.credits}
                        </span> */}
                      </motion.div>

                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ delay: index * 0.1 + 1.1 }}
                        className="relative flex flex-col gap-4 pt-5 sm:pt-6"
                      >
                        <span aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 z-0 border-t border-white/10" />
                        <div className="relative z-10 flex max-w-[72%] flex-col gap-2 min-w-0 sm:max-w-[56%] lg:max-w-[58%]">
                          <p className="text-[8px] font-black uppercase tracking-[0.24em] text-white/60">
                            Top Modules
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {prog.tags?.map((item, i) => (
                              <React.Fragment key={i}>
                                {prog.tags && prog.tags.length > 2 && i === 2 && (
                                  <span aria-hidden="true" className="basis-full h-0" />
                                )}
                                <span className={`${moduleBadgeStyles[i % moduleBadgeStyles.length]} max-w-full text-[8px] sm:text-[9px] font-black tracking-[0.08em] sm:tracking-[0.12em] leading-snug px-2.5 sm:px-3 py-1.5 border`}>
                                  {item}
                                </span>
                              </React.Fragment>
                            ))}
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
                    className="absolute right-2 bottom-8 h-[190px] w-[36%] opacity-50 pointer-events-none z-20 overflow-hidden sm:h-auto sm:opacity-100 sm:right-[-1%] sm:top-8 sm:bottom-10 sm:w-[44%] md:right-0 md:top-10 md:bottom-12 md:w-[42%] xl:top-8 xl:bottom-10 xl:w-[46%]"
                  >
                    <Image
                      src={prog.image}
                      alt={prog.subtitle}
                      fill
                      sizes="(max-width: 640px) 36vw, (max-width: 1280px) 44vw, 28vw"
                      className="object-contain object-right-bottom transition-all duration-1000 group-hover:scale-105 group-hover:-translate-y-2"
                    />
                  </motion.div>

                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
            );

            const wrapperClass = "block h-full w-full text-left rounded-[24px] sm:rounded-[40px] md:rounded-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/80";

            return (
              <Tilt key={index} strength={4} className="h-full min-w-0">
                {prog.specializations ? (
                  <button
                    type="button"
                    onClick={() => setActivePopup(index)}
                    aria-haspopup="dialog"
                    aria-label={`View specializations for ${prog.type}`}
                    className={wrapperClass}
                  >
                    {cardInner}
                  </button>
                ) : (
                  <Link
                    href={prog.href}
                    aria-label={`Explore ${prog.type}`}
                    className={wrapperClass}
                  >
                    {cardInner}
                  </Link>
                )}
              </Tilt>
            );
          })}
        </div>

        <div className="max-w-3xl text-center flex flex-col items-center">
          <RevealText
            text="Starting your college journey is a meaningful experience shaped by growth, and we’re here to support you in every step of the way, helping you feel confident and connected as you begin this new chapter."
            className="text-gray-500 text-sm md:text-base font-medium leading-relaxed mb-8 md:mb-10 px-2 sm:px-4 justify-center"
          />
          <Magnetic strength={0.3}>
            <Link href="/admissions" className="inline-flex bg-[#21409A] text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-2xl hover:opacity-90 transition-all active:scale-95">
              Enrol Now
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Specialization popup */}
      <AnimatePresence>
        {activePopup !== null && programmes[activePopup]?.specializations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setActivePopup(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Choose a specialization"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActivePopup(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>

              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#74C044]">
                {programmes[activePopup].subtitle}
              </p>
              <h3 className="mt-1 mb-5 text-2xl font-black text-[#1a1a1a] font-iic">
                Choose a Specialization
              </h3>

              <div className="flex flex-col gap-3">
                {programmes[activePopup].specializations!.map((spec, i) => (
                  <Link
                    key={i}
                    href={spec.href}
                    onClick={() => setActivePopup(null)}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-bold text-[#1a1a1a] transition-all hover:border-[#21409A]/30 hover:bg-[#21409A] hover:text-white"
                  >
                    <span>{spec.name}</span>
                    <svg className="shrink-0 transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProgrammesSection;
