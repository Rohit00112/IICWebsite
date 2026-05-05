'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import RevealText from '../../effects/RevealText';

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

interface EligibilityProps {
  intro: string;
  items: string[];
  finePrint: string;
  defaultOpen?: boolean;
}

const EligibilityAccordion: React.FC<EligibilityProps> = ({ intro, items, finePrint, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-gradient-to-r from-[#5B8DEF]/15 to-[#21409A]/15 backdrop-blur-xl border border-[#5B8DEF]/40 hover:border-[#5B8DEF]/70 transition-all duration-300 group"
      >
        <span className="flex items-center gap-3 text-white font-bold text-base md:text-lg font-sora tracking-wide">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FB3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Eligibility Criteria
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7FB3FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="elig-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 px-6 py-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-[#5B8DEF]/20">
              <p className="text-white/80 text-[15px] md:text-base mb-4 leading-relaxed">
                {intro}
              </p>
              <ul className="space-y-3 mb-5">
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex gap-3 text-white/75 text-[15px] leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#7FB3FF] shrink-0 shadow-[0_0_8px_rgba(127,179,255,0.8)]" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="text-white/50 text-sm italic border-t border-[#5B8DEF]/20 pt-4">
                {finePrint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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
      {/* Radial blue glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,#5B8DEF_0%,transparent_60%)] opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,#3B6FD9_0%,transparent_70%)] opacity-15" />
      </div>

      {/* Decorative floating sparkles */}
      <motion.div
        style={{ y: ySparkle1 }}
        className="absolute top-32 left-[8%] w-3 h-3 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="#7FB3FF" className="w-full h-full opacity-70">
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
      </motion.div>
      <motion.div
        style={{ y: ySparkle2 }}
        className="absolute top-1/2 right-[10%] w-4 h-4 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="#A8C9FF" className="w-full h-full opacity-60">
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
      </motion.div>
      <motion.div
        style={{ y: ySparkle1 }}
        className="absolute bottom-40 left-[18%] w-2 h-2 pointer-events-none"
      >
        <svg viewBox="0 0 24 24" fill="#7FB3FF" className="w-full h-full opacity-80">
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* ── BLOCK 1: TRIPLE A SCHOLARSHIP ── */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-[#7FB3FF] text-[12px] md:text-[14px] font-bold tracking-[0.4em] uppercase mb-8 font-sora"
        >
          Scholarships in Nepal
        </motion.span>

        {/* Huge AAA letters */}
        <div className="flex items-end justify-center gap-4 md:gap-10 mb-6 md:mb-10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,141,239,0.3)_0%,transparent_60%)] blur-2xl pointer-events-none" />
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
              className="w-[80px] md:w-[180px] h-auto drop-shadow-[0_10px_40px_rgba(91,141,239,0.6)] overflow-visible"
            >
              <defs>
                <linearGradient id={`aaa-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A8C9FF" />
                  <stop offset="50%" stopColor="#5B8DEF" />
                  <stop offset="100%" stopColor="#21409A" />
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
          Triple A Scholarships at IIC
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
              className="relative bg-white/[0.04] backdrop-blur-xl border border-[#5B8DEF]/30 rounded-2xl p-7 md:p-8 overflow-hidden group transition-all duration-500 hover:border-[#5B8DEF]/60 hover:bg-white/[0.06]"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#5B8DEF]/10 rounded-full blur-2xl group-hover:bg-[#5B8DEF]/25 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-5 text-[#7FB3FF]">{pillar.icon}</div>
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
          className="text-center text-base md:text-lg font-bold mb-10 font-sora"
        >
          <span className="text-white/80">Hit all 3 pillars → </span>
          <span className="bg-gradient-to-r from-[#A8C9FF] to-[#5B8DEF] bg-clip-text text-transparent">
            up to 100% tuition off
          </span>
        </motion.p>

        {/* AAA detailed description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mb-6"
        >
          <p className="text-white/75 text-base md:text-[17px] leading-relaxed text-center">
            The <span className="text-[#A8C9FF] font-semibold">AAA (Academics, Attendance, and Attitude) Scholarship Award</span> is awarded to <span className="text-white font-bold">10% of students</span> who excelled during the calendar year in academics, discipline, and active participation. It provides students with an incentive to have <span className="text-white font-bold">100% of their tuition fees waived</span> for the calendar year.
          </p>
          <p className="text-white/40 italic text-sm text-center mt-4">*Excluding University Fee</p>
        </motion.div>

        {/* AAA Eligibility */}
        <EligibilityAccordion
          intro="Applicants can apply for the Scholarship if they meet the following criteria:"
          items={[
            'Good academic standing.',
            'At least 80% attendance in each module.',
            'Timely payment of all the financial dues.',
            'Clean disciplinary record and exemplary behaviour.',
          ]}
          finePrint="All applications must be made in the same year of an applicant's graduation date."
        />

        {/* ── DIVIDER ── */}
        <div className="w-full max-w-3xl flex items-center gap-4 my-20 md:my-24">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#5B8DEF]/40 to-transparent" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#7FB3FF" className="opacity-70">
            <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#5B8DEF]/40 to-transparent" />
        </div>

        {/* ── BLOCK 2: POSTGRADUATE SCHOLARSHIP ── */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#7FB3FF] text-[12px] md:text-[14px] font-bold tracking-[0.4em] uppercase mb-6 font-sora"
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,141,239,0.3)_0%,transparent_60%)] blur-2xl pointer-events-none" />

          <div className="relative flex items-center justify-center gap-4 md:gap-8">
            {/* Left laurel */}
            <svg
              className="w-12 md:w-20 h-auto opacity-70 shrink-0"
              viewBox="0 0 24 48"
              fill="none"
              stroke="#7FB3FF"
              strokeWidth="1.5"
            >
              <path d="M20 4 C 8 12, 4 24, 12 44" strokeLinecap="round" />
              <path d="M16 8 C 8 14, 6 22, 12 30" strokeLinecap="round" />
              <path d="M14 16 C 8 20, 8 28, 12 34" strokeLinecap="round" />
            </svg>

            {/* 100% */}
            <svg
              viewBox="0 0 360 140"
              className="w-[280px] md:w-[560px] h-auto drop-shadow-[0_15px_50px_rgba(91,141,239,0.6)] overflow-visible"
            >
              <defs>
                <linearGradient id="hundred-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A8C9FF" />
                  <stop offset="50%" stopColor="#5B8DEF" />
                  <stop offset="100%" stopColor="#21409A" />
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
              className="w-12 md:w-20 h-auto opacity-70 scale-x-[-1] shrink-0"
              viewBox="0 0 24 48"
              fill="none"
              stroke="#7FB3FF"
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
          Free Master&apos;s Degree Scholarship
        </motion.h2>

        <RevealText
          text="One top achiever each year earns a fully-funded master's at any ING partnership college in the course of their choice."
          className="text-white/70 text-base md:text-xl font-medium leading-relaxed text-center max-w-2xl mb-12 justify-center"
        />

        {/* ING detailed description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mb-8 space-y-4"
        >
          <p className="text-white/75 text-base md:text-[17px] leading-relaxed text-center">
            Upon completion of <span className="text-[#A8C9FF] font-semibold">London Metropolitan University&apos;s Bachelor&apos;s Degree</span>, our students will be awarded postgraduate scholarships within ING colleges. We hope our assistance will inspire future generations, so that they may as well get similar opportunities to better their future.
          </p>
          <p className="text-white/75 text-base md:text-[17px] leading-relaxed text-center">
            We aim to facilitate our student&apos;s <span className="text-white font-bold">professional and personal growth</span>.
          </p>
        </motion.div>

        {/* ING Eligibility */}
        <EligibilityAccordion
          intro="Applicants can apply for the Scholarship if they meet the following criteria:"
          items={[
            'Citizen of Nepal.',
            'Completed and obtained a London Metropolitan University Undergraduate Degree with FIRST CLASS HONOURS from Itahari International College.',
            'Applying to pursue a full-time residential Postgraduate Degree at London Metropolitan University, UK.',
          ]}
          finePrint="All applications must be made in the same year of an applicant's graduation date."
        />
      </div>
    </section>
  );
};

export default ScholarshipSection;
