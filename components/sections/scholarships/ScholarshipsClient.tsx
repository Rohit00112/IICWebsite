'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { ScholarshipAwardType, ScholarshipBatch, ScholarshipRecipient } from '@/lib/scholarships';

const awardThemes: Record<ScholarshipAwardType, {
  accent: string;
  ink: string;
  pale: string;
  line: string;
  dark: string;
  soft: string;
}> = {
  aaa: {
    accent: '#21409A',
    ink: '#142F75',
    pale: '#EEF3FF',
    line: '#C8D6FF',
    dark: '#081A39',
    soft: 'rgba(33,64,154,0.08)',
  },
  ing_postgraduate: {
    accent: '#74C044',
    ink: '#3C7D25',
    pale: '#F0FAEA',
    line: '#CDE8BD',
    dark: '#173B16',
    soft: 'rgba(116,192,68,0.10)',
  },
};

const trackCopy = {
  aaa: {
    eyebrow: 'Seize the opportunity',
    posterTop: 'Academics · Attendance · Attitude',
    posterTitle: 'AAA Scholarship',
    posterNote: '100% college fee refunded* for deserving students',
    posterFine: '*Excluding University Fee',
    cardTitle: 'AAA Scholarship',
    kicker: 'Up to 100% tuition waiver',
    description: 'The AAA (Academics, Attendance, and Attitude) Scholarship Award is given to 10% of students who excelled during the calendar year in academics, discipline, and active participation. It provides students with an incentive to have 100% of their tuition fees waived for the calendar year.',
    fineprint: '*Excluding University Fee',
    archiveTitle: 'AAA Scholarship Recipients',
    emptyTitle: 'AAA recipients will be published soon.',
    emptyDescription: 'When the IIC team publishes the next AAA batch, the full recipient list and group photo will appear here.',
    criteria: [
      'Good academic standing across enrolled modules.',
      'At least 80% attendance in each module.',
      'Clean disciplinary record and exemplary student attitude.',
      'Timely completion of internal requirements and college processes.',
    ],
  },
  ing_postgraduate: {
    eyebrow: 'Seize the opportunity',
    posterTop: 'Full-fledged',
    posterTitle: 'ING Postgraduate',
    posterNote: 'Postgraduate scholarship within ING colleges',
    posterFine: 'Placement at one of the ING companies',
    cardTitle: 'ING Postgraduate Scholarship',
    kicker: 'One recipient per year',
    description: 'Upon completion of London Metropolitan University’s Bachelor’s Degree, our students will be awarded postgraduate scholarships within ING colleges. We hope our assistance will inspire future generations, so that they may as well get similar opportunities to better their future. We aim to facilitate our student’s professional and personal growth.',
    fineprint: '',
    archiveTitle: 'ING postgraduate archive',
    emptyTitle: 'ING postgraduate scholar will be published soon.',
    emptyDescription: 'Once the annual ING Postgraduate Scholar is announced, their profile will appear as a dedicated spotlight.',
    criteria: [
      'Citizen of Nepal.',
      'Completed a London Metropolitan University undergraduate degree from IIC.',
      'Achieved First Class Honours.',
    ],
  },
} as const;

const heroImage = '/images/lifestyle/graduation.JPG';
const fallbackGroupImage = '/images/lifestyle/graduation.JPG';

const EASE = [0.16, 1, 0.3, 1] as const;

const sortBatches = (batches: ScholarshipBatch[]) => (
  [...batches].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  })
);

const getRecipients = (batch?: ScholarshipBatch) => batch?.recipients || [];

const recipientLabel = (count: number) => `${count || 'No'} ${count === 1 ? 'recipient' : 'recipients'}`;

const formatProgrammeName = (programme?: string) => {
  const value = programme?.trim();

  if (!value) return 'Annual ING Postgraduate Scholar';
  if (/[a-z]/.test(value)) return value;

  const preferredCase: Record<string, string> = {
    BA: 'BA',
    BBA: 'BA',
    BIT: 'BIT',
    BSC: 'BSc',
    HONS: 'Hons',
    IIC: 'IIC',
    ING: 'ING',
    IT: 'IT',
  };

  return value.toLowerCase().replace(/[a-z]+/gi, (word) => (
    preferredCase[word.toUpperCase()] || `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  ));
};

const ArrowIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ChevronIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, ease: EASE, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center">
    <h2 className="text-3xl font-black tracking-tight text-[#171717] md:text-5xl">{children}</h2>
    <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-[#21409A] to-[#74C044]" />
  </div>
);

/* ---------- Hero ---------- */

const ScholarshipHero = () => (
  <section className="relative isolate overflow-hidden bg-[#07162F] text-white">
    <div className="relative h-[58vh] min-h-[420px] w-full md:h-[66vh]">
      <Image src={heroImage} alt="IIC graduates celebrating at graduation" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06142D] via-[#06142D]/35 to-[#06142D]/55" />
    </div>

    <div className="relative mx-auto -mt-24 max-w-7xl px-6 pb-4 md:-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative max-w-2xl overflow-hidden rounded-2xl bg-white p-7 text-[#171717] shadow-2xl shadow-black/30 md:p-9"
      >
        <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#21409A] to-[#74C044]" />
        <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#21409A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#74C044]" />
          Scholarships at IIC
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-4xl">Scholarship Opportunity</h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-gray-600">
          At IIC, we take pride in recognising and honouring our students’ outstanding academic achievements, talents, and accomplishments through our exclusive scholarship programme.
        </p>
      </motion.div>
    </div>
  </section>
);

/* ---------- Award poster cards ---------- */

const AwardPoster = ({ awardType }: { awardType: ScholarshipAwardType }) => {
  const copy = trackCopy[awardType];
  const isAaa = awardType === 'aaa';

  return (
    <div className="relative overflow-hidden rounded-sm bg-white shadow-[0_22px_54px_rgba(15,23,42,0.12)]">
      <div className={`absolute ${isAaa ? 'left-0 top-0 h-full w-2 bg-[#F4CA2F]' : 'right-0 top-0 h-full w-2 bg-[#2F9DB5]'}`} />
      <div className={`absolute ${isAaa ? 'bottom-0 left-0 h-2 w-full bg-[#F4CA2F]' : 'bottom-0 right-0 h-2 w-full bg-[#2F9DB5]'}`} />
      <div className={`relative aspect-[1.45/1] overflow-hidden p-6 text-center md:p-8 ${isAaa ? 'bg-[#E7F8FF]' : 'bg-white'}`}>
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: isAaa
              ? 'radial-gradient(circle at 18px 18px, rgba(255,255,255,0.92) 0 2px, transparent 2.5px), linear-gradient(135deg, rgba(48,160,184,0.11) 0 18%, transparent 18% 36%, rgba(48,160,184,0.08) 36% 54%, transparent 54%)'
              : 'radial-gradient(circle at 8px 8px, rgba(20,20,20,0.055) 0 1.5px, transparent 1.8px)',
            backgroundSize: isAaa ? '42px 42px, 180px 180px' : '18px 18px',
          }}
        />
        {isAaa ? (
          <div className="relative flex h-full flex-col items-center justify-between">
            <p className="text-sm font-medium uppercase tracking-normal text-[#1D3148] md:text-base">
              Seize the <span className="font-black">Opportunity</span>
            </p>
            <div className="w-full">
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <span className="text-[86px] font-black leading-none text-[#2F9DB5] md:text-[116px]">
                  AAA
                </span>
                <span className="text-left text-2xl font-black leading-[0.95] text-[#2F9DB5] md:text-3xl">
                  Academic<br />Attitude<br />Attendance
                </span>
              </div>
              <h3 className="mt-1 text-[60px] font-black leading-none text-[#3E3E3E] md:text-[82px]">
                Scholarship
              </h3>
            </div>
            <p className="text-2xl font-medium leading-tight text-[#3E3E3E] md:text-3xl">
              100% College fee refunded*<br />
              <span className="font-normal">for deserving students</span>
              <span className="mt-3 block text-sm font-bold">{copy.posterFine}</span>
            </p>
          </div>
        ) : (
          <div className="@container relative flex h-full flex-col items-center text-center">
            {/* Soft teal aura behind wordmark for depth */}
            <div className="pointer-events-none absolute left-1/2 top-[46%] h-[60%] w-[88%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,157,181,0.16),transparent_68%)] blur-md" />

            {/* Concentric arcs radiating from bottom-left, layered opacity */}
            <svg className="pointer-events-none absolute -bottom-[32%] -left-[20%] h-[160%] w-[82%]" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="0" cy="200" r="58" stroke="rgba(47,157,181,0.10)" strokeWidth="13" />
              <circle cx="0" cy="200" r="106" stroke="rgba(148,163,184,0.28)" strokeWidth="13" />
              <circle cx="0" cy="200" r="154" stroke="rgba(148,163,184,0.18)" strokeWidth="13" />
              <circle cx="0" cy="200" r="200" stroke="rgba(148,163,184,0.10)" strokeWidth="13" />
            </svg>

            {/* Graduation cap + scroll + book cluster — floats in empty top-right corner, tilted */}
            <svg className="pointer-events-none absolute -top-1 right-0 h-20 w-32 rotate-[8deg] md:h-24 md:w-40" viewBox="0 0 200 130" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="ingCapBoard" x1="0" y1="0" x2="0.3" y2="1">
                  <stop offset="0%" stopColor="#243049" />
                  <stop offset="100%" stopColor="#11192B" />
                </linearGradient>
                <linearGradient id="ingCapBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A2336" />
                  <stop offset="100%" stopColor="#0A1019" />
                </linearGradient>
              </defs>
              {/* contact shadow */}
              <ellipse cx="105" cy="120" rx="72" ry="9" fill="rgba(15,23,42,0.16)" />
              {/* book */}
              <path d="M150 95h44v19h-44z" fill="#21306A" />
              <path d="M150 95l-5 6v19l5-6z" fill="#16204A" />
              <path d="M194 95l5 6v19l-5-6z" fill="#2C3D7C" />
              <path d="M150 100h44" stroke="#3A4C93" strokeWidth="1.5" />
              {/* diploma scroll */}
              <path d="M88 102c-9 6-24 8-37 4 11-2 20-8 24-17l19 7z" fill="#F0E7D2" />
              <path d="M88 102c-9 6-24 8-37 4 6-1 12-3 17-7l16 2z" fill="#E2D6BB" />
              <ellipse cx="50" cy="108" rx="6" ry="9" fill="#E03A2F" transform="rotate(20 50 108)" />
              <path d="M92 83l25 15-23 15-23-13z" fill="#F6EFDD" />
              {/* cap board */}
              <path d="M30 56 104 29l67 25-73 27-68-25Z" fill="url(#ingCapBoard)" />
              <path d="M104 29l67 25-73 27" fill="rgba(255,255,255,0.06)" />
              {/* cap base */}
              <path d="M58 73h84v23c0 9-18 16-42 16s-42-7-42-16V73Z" fill="url(#ingCapBase)" />
              {/* button */}
              <circle cx="101" cy="54" r="7" fill="#E8B84B" />
              <circle cx="101" cy="54" r="3" fill="#C9952E" />
              {/* tassel */}
              <path d="M135 56v34" stroke="#E03A2F" strokeWidth="5" strokeLinecap="round" />
              <path d="M135 90c3 8 1 17-4 23" stroke="#E03A2F" strokeWidth="5" strokeLinecap="round" />
              <circle cx="130" cy="117" r="7.5" fill="#E03A2F" />
              <circle cx="130" cy="117" r="3.5" fill="#B72B22" />
            </svg>

            {/* Heading group */}
            <p className="relative z-10 mt-1 text-[2.4cqw] font-semibold uppercase tracking-[0.34em] text-[#334155]">
              Seize the <span className="font-black text-[#171717]">Opportunity</span>
            </p>
            <span className="relative z-10 mt-2 block h-px w-[7cqw] bg-gradient-to-r from-transparent via-[#2F9DB5] to-transparent" />

            <div className="relative z-10 mt-[3cqw] w-full">
              <span className="relative inline-flex bg-[#2F9DB5] px-[2.4cqw] py-[1cqw] text-[3.6cqw] font-black uppercase leading-none tracking-[0.06em] text-white shadow-[0_8px_18px_rgba(47,157,181,0.32)]">
                Full-fledged
              </span>
              <p className="mt-[2.6cqw] bg-gradient-to-b from-[#1E2A3A] to-[#0B1320] bg-clip-text text-[6.4cqw] font-black uppercase leading-none tracking-[-0.01em] text-transparent">
                ING Postgraduate
              </p>
              <div className="relative -mt-[0.5cqw]">
                <h3 className="bg-gradient-to-b from-[#3FB6CE] via-[#2F9DB5] to-[#1F7F95] bg-clip-text text-[13.4cqw] font-black uppercase leading-[0.82] tracking-[-0.018em] text-transparent drop-shadow-[0_2px_10px_rgba(47,157,181,0.22)]">
                  Scholarship
                </h3>
              </div>
            </div>

            {/* Detail lines */}
            <div className="relative z-10 mb-auto mt-[4cqw] w-full text-[2.7cqw] font-semibold leading-relaxed text-[#334155]">
              <span className="mx-auto mb-[2cqw] block h-px w-[11cqw] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <p className="flex items-start justify-center gap-[1.4cqw]">
                <span className="mt-[0.4cqw] text-[#2F9DB5]">▸</span>
                <span>IT/Business Post Graduate Degree at<br />Islington College, Herald College Kathmandu or Apex College</span>
              </p>
              <p className="mt-[1.4cqw] flex items-start justify-center gap-[1.4cqw]">
                <span className="mt-[0.4cqw] text-[#2F9DB5]">▸</span>
                <span>Job placement at one of the ING Companies</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EligibilityDropdown = ({ awardType, open, onToggle }: { awardType: ScholarshipAwardType; open: boolean; onToggle: () => void }) => {
  const theme = awardThemes[awardType];
  const copy = trackCopy[awardType];

  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: theme.line }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50"
      >
        <span className="text-sm font-black tracking-tight text-[#171717]">Eligibility Criteria</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ color: theme.ink }}>
          <ChevronIcon className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-5 pb-5 pt-1" style={{ backgroundColor: theme.soft }}>
              {copy.criteria.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-medium leading-relaxed text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: theme.accent }}>
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AwardsRow = ({ openEligibility, toggleEligibility }: {
  openEligibility: Record<ScholarshipAwardType, boolean>;
  toggleEligibility: (key: ScholarshipAwardType) => void;
}) => (
  <section className="bg-white py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-10">
        {(['aaa', 'ing_postgraduate'] as ScholarshipAwardType[]).map((awardType, idx) => {
          const copy = trackCopy[awardType];

          return (
            <Reveal key={awardType} delay={idx * 0.08} className="flex flex-col">
              <AwardPoster awardType={awardType} />
              <h3 className="mt-9 text-2xl font-black tracking-tight text-[#2F9DB5]">{copy.cardTitle}</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-gray-600">{copy.description}</p>
              <div className="mt-6">
                <EligibilityDropdown awardType={awardType} open={openEligibility[awardType]} onToggle={() => toggleEligibility(awardType)} />
              </div>
              {copy.fineprint && <p className="mt-3 text-xs font-bold italic text-gray-400">{copy.fineprint}</p>}
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------- ING spotlight ---------- */

const IngSpotlight = ({ batch, recipient }: { batch: ScholarshipBatch; recipient?: ScholarshipRecipient }) => {
  const theme = awardThemes.ing_postgraduate;
  const nameParts = (recipient?.name || batch.title).split(' ');
  const first = nameParts[0];
  const rest = nameParts.slice(1).join(' ');

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="grid items-stretch gap-8 md:grid-cols-2 md:gap-12"
    >
      <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#EEF7EA] shadow-xl shadow-[#74C044]/15">
        <Image
          src={recipient?.image || batch.groupImage || fallbackGroupImage}
          alt={recipient?.name || `${batch.year} ING Postgraduate Scholar`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#3C7D25] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#74C044]" />
          ING Postgraduate
        </span>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-2xl font-black tracking-tight" style={{ color: theme.accent }}>Recipient {batch.year}</p>
        <span className="mt-3 block h-1 w-16 rounded-full" style={{ backgroundColor: theme.accent }} />
        <h3 className="mt-7 text-3xl font-black tracking-tight text-[#171717] md:text-4xl">
          {first} <span className="font-medium text-gray-500">{rest}</span>
        </h3>
        <p className="mt-2 text-base font-bold tracking-normal" style={{ color: theme.ink }}>
          {formatProgrammeName(recipient?.programme)}
        </p>
        {recipient?.quote ? (
          <p className="mt-7 border-l-2 pl-5 text-lg font-medium italic leading-relaxed text-gray-600" style={{ borderColor: theme.accent }}>
            {`"${recipient.quote}"`}
          </p>
        ) : (
          <p className="mt-7 text-lg font-medium leading-relaxed text-gray-600">
            {batch.summary || 'A focused postgraduate scholarship awarded to one outstanding eligible graduate for the year.'}
          </p>
        )}
      </div>
    </motion.article>
  );
};

const FullScholarshipSection = ({ batches }: { batches: ScholarshipBatch[] }) => {
  const latestBatch = batches[0];
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  const updateActiveIndexFromScroll = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const viewportLeft = viewport.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((child, index) => {
      const slide = child as HTMLElement;
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - viewportLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndexRef.current = closestIndex;
  };

  useEffect(() => {
    if (batches.length <= 1) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeoutId: number | undefined;
    let frameId: number | undefined;

    const stopAutoScroll = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      timeoutId = undefined;
      frameId = undefined;
    };

    const scrollToNextBatch = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) return;
      if (document.visibilityState !== 'visible' || motionQuery.matches) return;

      const nextIndex = (activeIndexRef.current + 1) % batches.length;
      const nextSlide = track.children[nextIndex] as HTMLElement | undefined;

      activeIndexRef.current = nextIndex;
      viewport.scrollTo({
        left: nextSlide ? nextSlide.offsetLeft - track.offsetLeft : viewport.clientWidth * nextIndex,
        behavior: 'smooth',
      });
    };

    const scheduleAutoScroll = (delay = 3000) => {
      stopAutoScroll();
      timeoutId = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(() => {
          scrollToNextBatch();
          scheduleAutoScroll();
        });
      }, delay);
    };

    const startAutoScroll = (delay = 1000) => {
      if (document.visibilityState !== 'visible' || motionQuery.matches) return;
      scheduleAutoScroll(delay);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startAutoScroll(600);
      } else {
        stopAutoScroll();
      }
    };

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        stopAutoScroll();
      } else {
        startAutoScroll(600);
      }
    };

    startAutoScroll();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      stopAutoScroll();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [batches.length]);

  return (
    <section id="ing-postgraduate-scholarship" className="scroll-mt-8 bg-[#F4F7FA] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><SectionTitle>ING Postgraduate Scholarship Recipients</SectionTitle></Reveal>
        <div className="mt-14">
          {latestBatch ? (
            <div
              ref={viewportRef}
              onScroll={updateActiveIndexFromScroll}
              className="-mx-6 overflow-x-auto px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div ref={trackRef} className="flex snap-x snap-mandatory gap-8">
                {batches.map((batch) => (
                  <div key={batch.id} className="min-w-full snap-start">
                    <IngSpotlight batch={batch} recipient={batch.recipients[0]} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#CDE8BD] bg-white/60 p-10 text-center">
              <h3 className="text-2xl font-black tracking-tight text-[#171717]">{trackCopy.ing_postgraduate.emptyTitle}</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-gray-500">{trackCopy.ing_postgraduate.emptyDescription}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- AAA recipients accordion ---------- */

const AaaBatchPanel = ({ batch, open, onToggle, defaultOpen }: { batch: ScholarshipBatch; open: boolean; onToggle: () => void; defaultOpen?: boolean }) => {
  const theme = awardThemes.aaa;
  const recipients = getRecipients(batch);
  const isOpen = open;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm" style={{ borderColor: isOpen ? theme.line : '#E5E7EB' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors md:px-6 ${isOpen ? 'text-white' : 'text-[#171717] hover:bg-gray-50'}`}
        style={isOpen ? { backgroundColor: theme.accent } : undefined}
      >
        <span className="text-sm font-black tracking-tight md:text-base">List of {batch.title || `AAA Scholarship ${batch.year} Recipients`}</span>
        <span className="flex items-center gap-3">
          <span className={`hidden text-xs font-black uppercase tracking-[0.1em] sm:inline ${isOpen ? 'text-white/70' : 'text-gray-400'}`}>
            {recipientLabel(recipients.length)}
          </span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronIcon className="h-5 w-5" />
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={defaultOpen ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="p-5 md:p-6">
              <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-[#E9EEF8]">
                <Image
                  src={batch.groupImage || fallbackGroupImage}
                  alt={`${batch.year} AAA Scholarship recipients`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover"
                />
              </div>
              {batch.summary && (
                <p className="mt-5 text-sm font-medium leading-relaxed text-gray-600">{batch.summary}</p>
              )}
              {recipients.length > 0 ? (
                <ol className="mt-6 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
                  {recipients.map((recipient, index) => (
                    <li key={`${batch.id}-${recipient.name}-${index}`} className="flex gap-2 border-b border-gray-100 py-2 text-sm font-medium text-gray-700">
                      <span className="shrink-0 font-black tabular-nums" style={{ color: theme.ink }}>{index + 1}.</span>
                      <span className="break-words">{recipient.name}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-6 text-sm font-bold text-gray-500">Recipient names for this batch will be added soon.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AaaRecipientsSection = ({ batches, openArchive, toggleArchive }: {
  batches: ScholarshipBatch[];
  openArchive: Record<string, boolean>;
  toggleArchive: (key: string) => void;
}) => (
  <section id="aaa-scholarship" className="scroll-mt-8 bg-white py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-6">
      <Reveal><SectionTitle>AAA Scholarship Recipients</SectionTitle></Reveal>
      <div className="mx-auto mt-14 max-w-5xl space-y-4">
        {batches.length > 0 ? (
          batches.map((batch, idx) => {
            const key = `aaa-${batch.id}`;
            const open = openArchive[key] ?? idx === 0;
            return (
              <Reveal key={batch.id} delay={Math.min(idx * 0.05, 0.2)}>
                <AaaBatchPanel batch={batch} open={open} onToggle={() => toggleArchive(key)} defaultOpen={idx === 0} />
              </Reveal>
            );
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-[#C8D6FF] bg-[#F4F7FA] p-10 text-center">
            <h3 className="text-2xl font-black tracking-tight text-[#171717]">{trackCopy.aaa.emptyTitle}</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-gray-500">{trackCopy.aaa.emptyDescription}</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

/* ---------- Next step CTA ---------- */

const NextStepCTA = () => (
  <section className="bg-white px-6 py-16 md:py-24">
    <div className="mx-auto max-w-7xl">
      <div
        className="relative isolate overflow-hidden rounded-[28px] px-8 py-16 text-center text-white md:px-12 md:py-20"
        style={{ background: 'linear-gradient(135deg,#3C7D25 0%,#5AA033 45%,#74C044 100%)' }}
      >
        {/* decorative glows */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: 'radial-gradient(circle at 85% 15%, rgba(255,255,255,0.22), transparent 40%), radial-gradient(circle at 12% 90%, rgba(8,26,57,0.30), transparent 45%)' }}
        />
        {/* subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '46px 46px' }}
        />

        <div className="relative mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Admissions Open
          </p>
          <h2 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">What’s Your Next Step?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/90">
            Talk with our admissions team about eligibility, deadlines, and how scholarship decisions are published each year.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="inline-flex items-center gap-3 rounded-full border-2 border-white/70 px-7 py-3.5 text-sm font-black text-white transition-colors hover:border-white hover:bg-white hover:text-[#3C7D25]">
              Schedule a Visit
            </Link>
            <Link href="/admissions" className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#3C7D25] shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5">
              Apply Now
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Root ---------- */

const ScholarshipsClient = ({ batches }: { batches: ScholarshipBatch[] }) => {
  const [openArchive, setOpenArchive] = useState<Record<string, boolean>>({});
  const [openEligibility, setOpenEligibility] = useState<Record<ScholarshipAwardType, boolean>>({ aaa: false, ing_postgraduate: false });

  const aaaBatches = useMemo(() => sortBatches(batches.filter((batch) => batch.awardType === 'aaa')), [batches]);
  const ingBatches = useMemo(() => sortBatches(batches.filter((batch) => batch.awardType === 'ing_postgraduate')), [batches]);

  const toggleArchive = (key: string) => setOpenArchive((state) => ({ ...state, [key]: !(state[key] ?? key === `aaa-${aaaBatches[0]?.id}`) }));
  const toggleEligibility = (key: ScholarshipAwardType) => setOpenEligibility((state) => ({ ...state, [key]: !state[key] }));

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <ScholarshipHero />
      <AwardsRow openEligibility={openEligibility} toggleEligibility={toggleEligibility} />
      <FullScholarshipSection batches={ingBatches} />
      <AaaRecipientsSection batches={aaaBatches} openArchive={openArchive} toggleArchive={toggleArchive} />
      <NextStepCTA />
    </main>
  );
};

export default ScholarshipsClient;
