'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';

const pillars = [
  {
    label: 'Academics',
    desc: 'Top grades across modules.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 010 6.844L12 21l-6.16-3.578a12.083 12.083 0 010-6.844L12 14z" />
      </svg>
    ),
  },
  {
    label: 'Attitude',
    desc: 'Engaged & professional.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    label: 'Attendance',
    desc: 'Consistent presence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const ScholarshipSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const ySparkle1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const ySparkle2 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const letters = ['A', 'A', 'A'];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0a1733] overflow-hidden py-24 md:py-32"
    >
      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,#D4AF37_0%,transparent_60%)] opacity-15" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,#D4AF37_0%,transparent_70%)] opacity-10" />
      </div>

      {/* Decorative floating sparkles */}
      <motion.div
        style={{ y: ySparkle1 }}
        className="absolute top-32 left-[8%] w-3 h-3 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="#D4AF37" className="w-full h-full opacity-60">
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
      </motion.div>
      <motion.div
        style={{ y: ySparkle2 }}
        className="absolute top-1/2 right-[10%] w-4 h-4 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="#FFD700" className="w-full h-full opacity-50">
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
      </motion.div>
      <motion.div
        style={{ y: ySparkle1 }}
        className="absolute bottom-40 left-[18%] w-2 h-2 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="#D4AF37" className="w-full h-full opacity-70">
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* ── BLOCK 1: TRIPLE A SCHOLARSHIP ── */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-[#D4AF37] text-[12px] md:text-[14px] font-bold tracking-[0.4em] uppercase mb-8 font-sora"
        >
          Scholarship
        </motion.span>

        {/* Huge AAA letters */}
        <div className="flex items-end justify-center gap-4 md:gap-10 mb-6 md:mb-10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.25)_0%,transparent_60%)] blur-2xl pointer-events-none" />
          {letters.map((letter, i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 + i * 0.15,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewBox="0 0 100 130"
              className="w-[80px] md:w-[180px] h-auto drop-shadow-[0_10px_40px_rgba(212,175,55,0.5)] overflow-visible"
            >
              <defs>
                <linearGradient id={`aaa-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE27A" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
              </defs>
              <text
                x="50"
                y="118"
                textAnchor="middle"
                fill={`url(#aaa-grad-${i})`}
                style={{
                  fontFamily: 'var(--font-sora), sans-serif',
                  fontWeight: 900,
                  fontSize: '140px',
                  letterSpacing: '-4px',
                }}
              >
                {letter}
              </text>
            </motion.svg>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl md:text-5xl font-black text-white tracking-tight uppercase font-sora text-center mb-6"
        >
          Triple A Scholarship
        </motion.h2>

        <RevealText
          text="Earn up to 100% tuition waiver by mastering the three pillars of student excellence."
          className="text-white/70 text-base md:text-xl font-medium leading-relaxed text-center max-w-2xl mb-14 justify-center"
        />

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 w-full max-w-5xl mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative bg-white/[0.04] backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-7 md:p-8 overflow-hidden group transition-all duration-500 hover:border-[#D4AF37]/60 hover:bg-white/[0.06]"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-5 text-[#D4AF37]">{pillar.icon}</div>
                <h3 className="text-white text-xl md:text-2xl font-black tracking-tight uppercase font-sora mb-2">
                  {pillar.label}
                </h3>
                <p className="text-white/60 text-sm md:text-[15px] font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center text-base md:text-lg font-bold mb-24 md:mb-32 font-sora"
        >
          <span className="text-white/80">Hit all 3 pillars → </span>
          <span className="bg-gradient-to-r from-[#FFE27A] to-[#D4AF37] bg-clip-text text-transparent">
            up to 100% tuition off
          </span>
        </motion.p>

        {/* ── DIVIDER ── */}
        <div className="w-full max-w-3xl flex items-center gap-4 mb-20 md:mb-24">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37" className="opacity-60">
            <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </div>

        {/* ── BLOCK 2: POSTGRADUATE SCHOLARSHIP ── */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#D4AF37] text-[12px] md:text-[14px] font-bold tracking-[0.4em] uppercase mb-6 font-sora"
        >
          Postgraduate Award
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center w-full"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.25)_0%,transparent_60%)] blur-2xl pointer-events-none" />

          <div className="relative flex items-center justify-center gap-4 md:gap-8">
            {/* Left laurel */}
            <svg
              className="w-12 md:w-20 h-auto opacity-60 shrink-0"
              viewBox="0 0 24 48"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            >
              <path d="M20 4 C 8 12, 4 24, 12 44" strokeLinecap="round" />
              <path d="M16 8 C 8 14, 6 22, 12 30" strokeLinecap="round" />
              <path d="M14 16 C 8 20, 8 28, 12 34" strokeLinecap="round" />
            </svg>

            {/* 100% */}
            <svg
              viewBox="0 0 360 140"
              className="w-[280px] md:w-[560px] h-auto drop-shadow-[0_15px_50px_rgba(212,175,55,0.5)] overflow-visible"
            >
              <defs>
                <linearGradient id="hundred-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE27A" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
              </defs>
              <text
                x="180"
                y="125"
                textAnchor="middle"
                fill="url(#hundred-grad)"
                style={{
                  fontFamily: 'var(--font-sora), sans-serif',
                  fontWeight: 900,
                  fontSize: '150px',
                  letterSpacing: '-6px',
                }}
              >
                100%
              </text>
            </svg>

            {/* Right laurel (mirrored) */}
            <svg
              className="w-12 md:w-20 h-auto opacity-60 scale-x-[-1] shrink-0"
              viewBox="0 0 24 48"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
            >
              <path d="M20 4 C 8 12, 4 24, 12 44" strokeLinecap="round" />
              <path d="M16 8 C 8 14, 6 22, 12 30" strokeLinecap="round" />
              <path d="M14 16 C 8 20, 8 28, 12 34" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl md:text-5xl font-black text-white tracking-tight uppercase font-sora text-center mt-4 mb-6"
        >
          Free Master's Degree
        </motion.h2>

        <RevealText
          text="One top achiever each year earns a fully-funded master's at any ING partnership college in the course of their choice."
          className="text-white/70 text-base md:text-xl font-medium leading-relaxed text-center max-w-2xl justify-center"
        />
      </div>
    </section>
  );
};

export default ScholarshipSection;
