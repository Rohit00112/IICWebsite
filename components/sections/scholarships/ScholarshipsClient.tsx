'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { ScholarshipAwardType, ScholarshipBatch, ScholarshipRecipient } from '@/lib/scholarships';

const awardLabels: Record<ScholarshipAwardType, string> = {
  aaa: 'AAA Scholarship',
  ing_postgraduate: 'ING Postgraduate Scholarship',
};

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
      'Applying to pursue a full-time postgraduate degree through an eligible ING pathway.',
    ],
  },
} as const;

const heroImage = '/images/lifestyle/graduation.JPG';
const fallbackGroupImage = '/images/lifestyle/graduation.JPG';
const fallbackRecipientImage = '/images/common/iic_logo.png';
const ingLogo = '/images/common/ing.png';

const EASE = [0.16, 1, 0.3, 1] as const;

const sortBatches = (batches: ScholarshipBatch[]) => (
  [...batches].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  })
);

const getRecipients = (batch?: ScholarshipBatch) => batch?.recipients || [];

const recipientLabel = (count: number) => `${count || 'No'} ${count === 1 ? 'recipient' : 'recipients'}`;

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
  const theme = awardThemes[awardType];
  const copy = trackCopy[awardType];
  const isAaa = awardType === 'aaa';

  return (
    <div className="relative">
      {/* offset frame */}
      <span
        className={`absolute -z-10 h-full w-full rounded-2xl ${isAaa ? '-left-4 -top-4' : '-right-4 -top-4'}`}
        style={{ backgroundColor: isAaa ? '#F5C516' : theme.accent }}
      />
      <div
        className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl p-7 text-center shadow-xl md:p-8"
        style={{ background: isAaa
          ? 'linear-gradient(160deg,#EAF2FF 0%,#D4E4FF 55%,#BFD6FF 100%)'
          : 'linear-gradient(160deg,#0B2E55 0%,#123C6E 60%,#1B4E8C 100%)' }}
      >
        <p
          className="text-[10px] font-black uppercase tracking-[0.28em]"
          style={{ color: isAaa ? theme.ink : '#A9D88A' }}
        >
          {copy.eyebrow}
        </p>

        <div>
          {!isAaa && (
            <span className="mb-3 inline-block rounded-md bg-[#74C044] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
              {copy.posterTop}
            </span>
          )}
          {isAaa && (
            <p className="mb-1 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: theme.ink }}>{copy.posterTop}</p>
          )}
          <h3
            className={`font-black leading-[0.9] tracking-tight ${isAaa ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}
            style={{ color: isAaa ? theme.accent : '#fff' }}
          >
            {copy.posterTitle}
          </h3>
        </div>

        <p className="text-[11px] font-bold leading-relaxed" style={{ color: isAaa ? theme.ink : 'rgba(255,255,255,0.78)' }}>
          {copy.posterNote}
          <span className="mt-1 block text-[9px] font-semibold opacity-70">{copy.posterFine}</span>
        </p>
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
          const theme = awardThemes[awardType];
          const copy = trackCopy[awardType];

          return (
            <Reveal key={awardType} delay={idx * 0.08} className="flex flex-col">
              <AwardPoster awardType={awardType} />
              <h3 className="mt-9 text-2xl font-black tracking-tight" style={{ color: theme.ink }}>{copy.cardTitle}</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-gray-600">{copy.description}</p>
              {copy.fineprint && <p className="mt-3 text-xs font-bold italic text-gray-400">{copy.fineprint}</p>}
              <div className="mt-6">
                <EligibilityDropdown awardType={awardType} open={openEligibility[awardType]} onToggle={() => toggleEligibility(awardType)} />
              </div>
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
      <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#EEF7EA] shadow-xl shadow-[#74C044]/15">
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
        <p className="text-2xl font-black uppercase tracking-tight" style={{ color: theme.accent }}>Scholarship {batch.year}</p>
        <span className="mt-3 block h-1 w-16 rounded-full" style={{ backgroundColor: theme.accent }} />
        <h3 className="mt-7 text-3xl font-black tracking-tight text-[#171717] md:text-4xl">
          {first} <span className="font-medium text-gray-500">{rest}</span>
        </h3>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em]" style={{ color: theme.ink }}>
          {recipient?.programme || 'Annual ING Postgraduate Scholar'}
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

const IngArchiveRow = ({ batch }: { batch: ScholarshipBatch }) => {
  const recipient = batch.recipients[0];
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F4F7FA]">
        <Image src={recipient?.image || batch.groupImage || fallbackRecipientImage} alt={recipient?.name || batch.title} fill sizes="56px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#3C7D25]">{batch.year}</p>
        <p className="mt-0.5 break-words text-base font-black tracking-tight text-[#171717]">{recipient?.name || 'Scholar to be announced'}</p>
        <p className="break-words text-xs font-bold text-gray-500">{recipient?.programme || 'ING Postgraduate Scholar'}</p>
      </div>
    </div>
  );
};

const FullScholarshipSection = ({ batches }: { batches: ScholarshipBatch[] }) => {
  const latestBatch = batches[0];
  const previousBatches = batches.slice(1);
  const scholar = latestBatch?.recipients[0];

  return (
    <section id="ing-postgraduate-scholarship" className="scroll-mt-8 bg-[#F4F7FA] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><SectionTitle>Full Scholarship Recipients</SectionTitle></Reveal>
        <div className="mt-14">
          {latestBatch ? (
            <>
              <IngSpotlight batch={latestBatch} recipient={scholar} />
              {previousBatches.length > 0 && (
                <Reveal className="mt-12">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-[#3C7D25]">Previous ING scholars</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {previousBatches.map((batch) => <IngArchiveRow key={batch.id} batch={batch} />)}
                  </div>
                </Reveal>
              )}
            </>
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
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-full border-2 border-white/70 px-7 py-3.5 text-sm font-black text-white transition-colors hover:border-white hover:bg-white hover:text-[#3C7D25]">
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
