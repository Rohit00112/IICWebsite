'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';

const pillars = [
  {
    label: 'Academics',
    desc: 'Top grades across modules.',
    detail: 'Good academic standing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.42a12.08 12.08 0 010 6.84L12 21l-6.16-3.58a12.08 12.08 0 010-6.84L12 14z" />
      </svg>
    ),
  },
  {
    label: 'Attitude',
    desc: 'Engaged & professional.',
    detail: 'Clean disciplinary record and exemplary behaviour.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    label: 'Attendance',
    desc: 'Consistent presence.',
    detail: 'At least 80% attendance in each module.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const letterSparks = [
  { top: '8%', left: '18%', x: -18, y: -22, delay: 0 },
  { top: '18%', left: '80%', x: 24, y: -16, delay: 0.04 },
  { top: '48%', left: '8%', x: -24, y: 6, delay: 0.08 },
  { top: '62%', left: '90%', x: 28, y: 12, delay: 0.12 },
  { top: '88%', left: '30%', x: -14, y: 22, delay: 0.16 },
  { top: '84%', left: '70%', x: 18, y: 24, delay: 0.2 },
];

const backgroundStars = [
  { top: '6%', left: '8%', size: 'h-2 w-2', delay: 0, duration: 2.8 },
  { top: '7%', left: '45%', size: 'h-1.5 w-1.5', delay: 1.9, duration: 3.1 },
  { top: '9%', left: '28%', size: 'h-1.5 w-1.5', delay: 0.7, duration: 3.4 },
  { top: '12%', left: '72%', size: 'h-2.5 w-2.5', delay: 1.2, duration: 2.9 },
  { top: '14%', left: '54%', size: 'h-2 w-2', delay: 2.4, duration: 3.7 },
  { top: '17%', left: '91%', size: 'h-2 w-2', delay: 0.35, duration: 3.6 },
  { top: '20%', left: '39%', size: 'h-3 w-3', delay: 1.1, duration: 2.7 },
  { top: '25%', left: '14%', size: 'h-3 w-3', delay: 1.6, duration: 3.1 },
  { top: '27%', left: '67%', size: 'h-1.5 w-1.5', delay: 0.25, duration: 3.2 },
  { top: '30%', left: '82%', size: 'h-2 w-2', delay: 0.95, duration: 2.6 },
  { top: '36%', left: '58%', size: 'h-1.5 w-1.5', delay: 2.1, duration: 3.8 },
  { top: '38%', left: '24%', size: 'h-2.5 w-2.5', delay: 2.85, duration: 3.4 },
  { top: '42%', left: '92%', size: 'h-4 w-4', delay: 0.45, duration: 3.2 },
  { top: '48%', left: '6%', size: 'h-2 w-2', delay: 1.4, duration: 2.7 },
  { top: '49%', left: '36%', size: 'h-1.5 w-1.5', delay: 0.6, duration: 3.5 },
  { top: '52%', left: '74%', size: 'h-2.5 w-2.5', delay: 2.5, duration: 3.5 },
  { top: '58%', left: '21%', size: 'h-1.5 w-1.5', delay: 0.2, duration: 2.9 },
  { top: '60%', left: '54%', size: 'h-3 w-3', delay: 1.55, duration: 3.3 },
  { top: '64%', left: '88%', size: 'h-3 w-3', delay: 1.05, duration: 3.7 },
  { top: '69%', left: '12%', size: 'h-2.5 w-2.5', delay: 2.3, duration: 3 },
  { top: '73%', left: '44%', size: 'h-2 w-2', delay: 0.8, duration: 3.3 },
  { top: '75%', left: '68%', size: 'h-2.5 w-2.5', delay: 2.05, duration: 3.6 },
  { top: '79%', left: '79%', size: 'h-1.5 w-1.5', delay: 1.75, duration: 2.8 },
  { top: '84%', left: '30%', size: 'h-3 w-3', delay: 0.55, duration: 3.9 },
  { top: '86%', left: '49%', size: 'h-1.5 w-1.5', delay: 1.45, duration: 2.9 },
  { top: '89%', left: '62%', size: 'h-2 w-2', delay: 2.65, duration: 3.2 },
  { top: '93%', left: '93%', size: 'h-2.5 w-2.5', delay: 1.25, duration: 2.6 },
];

interface EligibilityAccordionProps {
  items: string[];
  intro: string;
  defaultOpen?: boolean;
}

const Spark = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {/* plump 4-point star — rounded concave sides, soft tips */}
    <path d="M12 1 C12.9 7.3 16.7 11.1 23 12 C16.7 12.9 12.9 16.7 12 23 C11.1 16.7 7.3 12.9 1 12 C7.3 11.1 11.1 7.3 12 1 Z" />
  </svg>
);

const twinkleAnimation = {
  opacity: [0.18, 1, 0.35, 0.9, 0.18],
  scale: [0.6, 1.12, 0.75, 1, 0.6],
  filter: [
    'drop-shadow(0 0 1px rgba(255,255,255,0.2))',
    'drop-shadow(0 0 6px rgba(255,255,255,1)) drop-shadow(0 0 16px rgba(255,255,255,0.85))',
    'drop-shadow(0 0 3px rgba(255,255,255,0.4))',
    'drop-shadow(0 0 8px rgba(255,255,255,0.95)) drop-shadow(0 0 18px rgba(200,224,255,0.7))',
    'drop-shadow(0 0 1px rgba(255,255,255,0.2))',
  ],
};

const EligibilityAccordion = ({ items, intro, defaultOpen = false }: EligibilityAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-3xl"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-[#6CA8FF]/35 bg-[#142850]/78 px-5 py-5 text-left shadow-[0_24px_80px_-54px_rgba(108,168,255,0.75)] backdrop-blur-xl transition-all duration-300 hover:border-[#8DBAFF]/70 hover:bg-[#18305E]/80 sm:px-7"
      >
        <span className="flex items-center gap-3 text-base font-black text-white sm:text-lg font-iic">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#8DBAFF]/60 text-[#8DBAFF]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </span>
          Eligibility Criteria
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-6 w-6 shrink-0 text-[#8DBAFF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="eligibility-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl border border-[#6CA8FF]/20 bg-[#0F2144]/82 px-5 py-5 backdrop-blur-xl sm:px-7 sm:py-6">
              <p className="mb-4 text-sm font-medium leading-relaxed text-white/75 sm:text-base">
                {intro}
              </p>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.35 }}
                    className="flex gap-3 text-sm font-medium leading-relaxed text-white/70 sm:text-[15px]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#74C044] shadow-[0_0_10px_rgba(116,192,68,0.75)]" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
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
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [livePillar, setLivePillar] = useState<number | null>(null);

  const activePillarData = activePillar === null ? null : pillars[activePillar];

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-[#081A39] py-14 text-white sm:py-20 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
      <div className="absolute left-0 top-0 h-1 w-[48%] bg-[#74C044]" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,127,235,0.18),transparent_52%)]" />
        <div className="absolute left-1/2 top-56 h-[720px] w-[820px] -translate-x-1/2 rounded-full bg-[#356CD8]/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[700px] w-[920px] -translate-x-1/2 rounded-full bg-[#244D9F]/14 blur-3xl" />
        {backgroundStars.map((star, index) => (
          <motion.div
            key={`background-star-${index}`}
            animate={twinkleAnimation}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
            style={{ top: star.top, left: star.left }}
            className={`absolute ${star.size} text-white`}
          >
            <span className="relative block h-full w-full">
              <Spark className="relative z-10 h-full w-full" />
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center text-[10px] font-black tracking-[0.16em] text-[#8DBAFF] sm:text-xs md:text-sm font-iic"
        >
          Scholarships at Itahari International College
        </motion.p>

        <div className="relative mb-7 w-full max-w-5xl">
          <div className="absolute inset-x-8 top-1/2 h-28 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(108,168,255,0.32)_0%,transparent_68%)] blur-3xl" />
          <div className="relative flex items-end justify-center gap-3 sm:gap-5 md:gap-8">
            {pillars.map((pillar, index) => {
              const isActive = activePillar === index;
              const isLive = livePillar === index;

              return (
                <motion.button
                  key={pillar.label}
                  type="button"
                  initial={{ opacity: 0, y: 46, scale: 0.86 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.14 + index * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -16,
                    scale: 1.07,
                    rotate: index === 0 ? -2 : index === 2 ? 2 : 0,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => {
                    setActivePillar(index);
                    setLivePillar(index);
                  }}
                  onHoverEnd={() => {
                    setActivePillar(null);
                    setLivePillar(null);
                  }}
                  onFocus={() => {
                    setActivePillar(index);
                    setLivePillar(index);
                  }}
                  onBlur={() => {
                    setActivePillar(null);
                    setLivePillar(null);
                  }}
                  aria-pressed={isActive}
                  aria-label={`${pillar.label} scholarship pillar`}
                  className="relative isolate cursor-pointer rounded-lg p-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8DBAFF]/40"
                >
                  <motion.span
                    aria-hidden
                    animate={{
                      opacity: isActive ? 1 : 0.18,
                      scale: isActive ? 1 : 0.78,
                    }}
                    transition={{ duration: 0.35 }}
                    className="absolute -inset-5 -z-10 rounded-full bg-[radial-gradient(circle,rgba(141,186,255,0.42)_0%,rgba(53,108,216,0.34)_42%,transparent_74%)] blur-xl"
                  />

                  <AnimatePresence>
                    {isLive && (
                      <>
                        {letterSparks.map((spark, sparkIndex) => (
                          <motion.span
                            key={`${pillar.label}-${sparkIndex}`}
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.35, 1.35, 0.6],
                              rotate: [0, 35, -18],
                              x: spark.x,
                              y: spark.y,
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              duration: 0.82,
                              delay: spark.delay,
                              repeat: Infinity,
                              repeatDelay: 0.16,
                              ease: 'easeOut',
                            }}
                            style={{ top: spark.top, left: spark.left }}
                            className="pointer-events-none absolute h-3 w-3 text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]"
                          >
                            <Spark className="h-full w-full" />
                          </motion.span>
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  <motion.svg
                    animate={{
                      filter: isActive
                        ? 'drop-shadow(0 18px 34px rgba(108,168,255,0.46)) drop-shadow(0 0 26px rgba(141,186,255,0.58))'
                        : 'drop-shadow(0 10px 28px rgba(108,168,255,0.28))',
                    }}
                    transition={{ duration: 0.35 }}
                    viewBox="0 0 100 130"
                    className="relative z-10 h-auto w-[88px] overflow-visible sm:w-[128px] md:w-[170px] lg:w-[190px]"
                  >
                    <defs>
                      <linearGradient id={`aaa-grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isActive ? '#F7FBFF' : '#8DBAFF'} />
                        <stop offset="45%" stopColor={isActive ? '#8DBAFF' : '#6CA8FF'} />
                        <stop offset="100%" stopColor={isActive ? '#3C75DF' : '#4269C5'} />
                      </linearGradient>
                      <filter id={`aaa-glow-${index}`} x="-45%" y="-45%" width="190%" height="190%">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <text
                      x="50"
                      y="118"
                      textAnchor="middle"
                      fill={`url(#aaa-grad-${index})`}
                      filter={isActive ? `url(#aaa-glow-${index})` : undefined}
                      style={{
                        fontFamily: 'var(--font-iic), sans-serif',
                        fontWeight: 900,
                        fontSize: '140px',
                        letterSpacing: '0px',
                      }}
                    >
                      A
                    </text>
                  </motion.svg>

                  <motion.span
                    aria-hidden
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scaleX: isActive ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.28 }}
                    className="absolute -bottom-2 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-[#8DBAFF] shadow-[0_0_24px_rgba(141,186,255,0.85)] md:w-24"
                  />
                </motion.button>
              );
            })}
          </div>

          <div className="mx-auto mt-7 min-h-[92px] w-full max-w-xl">
            <AnimatePresence mode="wait">
              {activePillarData && (
                <motion.div
                  key={activePillarData.label}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-[#6CA8FF]/35 bg-[#142850]/70 px-5 py-4 text-center shadow-[0_24px_80px_-52px_rgba(108,168,255,0.85)] backdrop-blur-xl"
                >
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:text-left">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#203F7D] text-[#8DBAFF]">
                      <div className="h-6 w-6">{activePillarData.icon}</div>
                    </div>
                    <div>
                      <p className="text-[11px] font-black tracking-[0.12em] text-[#8DBAFF]">
                        {activePillarData.label}
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-white/70 sm:text-base">
                        {activePillarData.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="max-w-4xl text-center text-3xl font-black leading-[1.08] text-white sm:text-5xl md:text-6xl font-iic"
        >
          Scholarship at Itahari International College
        </motion.h2>

        <RevealText
          text="Earn up to 100% tuition waiver by mastering the three pillars of student excellence."
          className="mt-6 max-w-2xl justify-center text-center text-base font-medium leading-relaxed text-white/62 sm:text-xl md:text-2xl"
        />

        <div className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const isActive = activePillar === index;
            const isDimmed = activePillar !== null && activePillar !== index;

            return (
              <motion.button
                key={pillar.label}
                type="button"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onHoverStart={() => {
                  setActivePillar(index);
                  setLivePillar(index);
                }}
                onHoverEnd={() => {
                  setActivePillar(null);
                  setLivePillar(null);
                }}
                onFocus={() => setActivePillar(index)}
                onBlur={() => setActivePillar(null)}
                className={`group relative overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8DBAFF]/35 sm:p-8 ${
                  isActive
                    ? 'border-[#6CA8FF]/65 bg-[#142850]/88 shadow-[0_26px_80px_-52px_rgba(108,168,255,0.9)]'
                    : 'border-[#6CA8FF]/25 bg-[#122545]/68 hover:border-[#6CA8FF]/55'
                } ${isDimmed ? 'opacity-80' : 'opacity-100'}`}
              >
                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#356CD8]/14 blur-2xl transition-colors duration-300 group-hover:bg-[#356CD8]/24" />
                <div className={`relative mb-7 h-12 w-12 transition-transform duration-300 ${isActive ? 'scale-110 text-[#8DBAFF]' : 'text-[#8DBAFF]'}`}>
                  {pillar.icon}
                </div>
                <h3 className="relative text-2xl font-black text-white font-iic">{pillar.label}</h3>
                <p className="relative mt-3 text-sm font-medium leading-relaxed text-white/58 sm:text-base">{pillar.desc}</p>
              </motion.button>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-12 text-center text-base font-black text-white/76 sm:text-xl font-iic"
        >
          Hit all 3 pillars <span className="text-white/40">→</span> <span className="text-[#8DBAFF]">up to 100% tuition off</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mt-10 max-w-3xl text-center"
        >
          <p className="text-base font-medium leading-relaxed text-white/68 sm:text-lg">
            The <span className="font-bold text-[#A8C8FF]">AAA (Academics, Attendance, and Attitude) Scholarship Award</span> is awarded to <span className="font-bold text-white">10% of students</span> who excelled during the calendar year in academics, discipline, and active participation. It provides students with an incentive to have <span className="font-bold text-white">100% of their tuition fees waived</span> for the calendar year.
          </p>
          <p className="mt-5 text-sm italic text-white/40">*Excluding University Fee</p>
        </motion.div>

        <div className="mt-8 w-full">
          <EligibilityAccordion
            intro="Applicants can apply for the scholarship if they meet the following criteria:"
            items={pillars.map((pillar) => pillar.detail)}
          />
        </div>

        <div className="my-20 flex w-full max-w-3xl items-center gap-4 md:my-28">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6CA8FF]/24 to-transparent" />
          <motion.span
            animate={twinkleAnimation}
            transition={{ duration: 2.65, repeat: Infinity, delay: 0.25, ease: 'easeInOut' }}
            className="h-5 w-5 text-[#DCEAFF]"
          >
            <Spark className="h-full w-full" />
          </motion.span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#6CA8FF]/24 to-transparent" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-[10px] font-black tracking-[0.16em] text-[#8DBAFF] sm:text-xs md:text-sm font-iic"
        >
          Postgraduate Award
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex w-full items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,168,255,0.24)_0%,transparent_62%)] blur-3xl" />
          <div className="relative flex items-center justify-center gap-4 sm:gap-8">
            <svg className="h-auto w-8 text-[#6CA8FF]/75 sm:w-12 md:w-20" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 4 C 8 12, 4 24, 12 44" strokeLinecap="round" />
              <path d="M16 8 C 8 14, 6 22, 12 30" strokeLinecap="round" />
              <path d="M14 16 C 8 20, 8 28, 12 34" strokeLinecap="round" />
            </svg>

            <svg viewBox="0 0 360 140" className="h-auto w-[220px] overflow-visible sm:w-[320px] md:w-[560px]">
              <defs>
                <linearGradient id="hundred-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8DBAFF" />
                  <stop offset="55%" stopColor="#6CA8FF" />
                  <stop offset="100%" stopColor="#4269C5" />
                </linearGradient>
              </defs>
              <text
                x="180"
                y="125"
                textAnchor="middle"
                fill="url(#hundred-grad)"
                style={{
                  fontFamily: 'var(--font-iic), sans-serif',
                  fontWeight: 900,
                  fontSize: '150px',
                  letterSpacing: '0px',
                }}
              >
                100%
              </text>
            </svg>

            <svg className="h-auto w-8 scale-x-[-1] text-[#6CA8FF]/75 sm:w-12 md:w-20" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-5 max-w-4xl text-center text-3xl font-black leading-[1.08] text-white sm:text-5xl md:text-6xl font-iic"
        >
          Fully Funded Master&apos;s Degree
        </motion.h2>

        <RevealText
          text="A special scholarship opportunity for one eligible graduate to pursue quality postgraduate study at ING colleges in Nepal."
          className="mt-6 max-w-2xl justify-center text-center text-base font-medium leading-relaxed text-white/62 sm:text-xl md:text-2xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mt-10 max-w-3xl space-y-5 text-center"
        >
          <p className="text-base font-medium leading-relaxed text-white/68 sm:text-lg">
            Upon completion of an eligible <span className="font-bold text-[#A8C8FF]">IT or Business programme</span>, students may receive postgraduate scholarship opportunities within ING colleges. We hope this support inspires future generations to pursue meaningful opportunities and build stronger futures.
          </p>
          <p className="text-base font-medium leading-relaxed text-white/68 sm:text-lg">
            We aim to support each student&apos;s <span className="font-bold text-white">professional and personal growth.</span>
          </p>
          <p className="text-sm italic text-white/40">*Job Placement at one of the ING Companies</p>
        </motion.div>

        <div className="mt-8 w-full">
          <EligibilityAccordion
            intro="Applicants can apply for the scholarship if they meet the following criteria:"
            items={[
              'Citizen of Nepal.',
              'Completed and obtained an eligible IT or Business undergraduate degree with FIRST CLASS HONOURS from Itahari International College.',
              'Applying to pursue a full-time residential Postgraduate Degree at London Metropolitan University, UK.',
            ]}
          />
        </div>

      </div>
    </section>
  );
};

export default ScholarshipSection;
