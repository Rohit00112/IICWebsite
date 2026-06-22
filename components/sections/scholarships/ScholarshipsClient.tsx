'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { ScholarshipAwardType, ScholarshipBatch, ScholarshipRecipient } from '@/lib/scholarships';

const awardLabels: Record<ScholarshipAwardType, string> = {
  aaa: 'AAA Scholarship',
  ing_postgraduate: 'ING Postgraduate Scholarship',
};

const awardAccents: Record<ScholarshipAwardType, string> = {
  aaa: '#21409A',
  ing_postgraduate: '#74C044',
};

const trackCopy = {
  aaa: {
    eyebrow: 'AAA Scholarship',
    title: 'A wider annual cohort for consistent excellence.',
    shortTitle: 'AAA Scholarship Recipients',
    kicker: 'Academics + Attendance + Attitude',
    description: 'AAA recognises students who keep their academic work, attendance, and attitude consistently strong across the year. Because this scholarship celebrates steady performance, each published year can include a larger recipient list.',
    archiveTitle: 'Previous AAA recipient lists',
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
    eyebrow: 'ING Postgraduate Scholarship',
    title: 'One standout graduate, one postgraduate pathway each year.',
    shortTitle: 'ING Postgraduate Scholar',
    kicker: 'One recipient per year',
    description: 'The ING Postgraduate Scholarship is designed as a focused annual honour for one eligible graduate who is ready to continue into postgraduate study through the ING pathway.',
    archiveTitle: 'Previous ING postgraduate scholars',
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

const fallbackHeroImage = '/images/common/footer-bg.png';
const fallbackGroupImage = '/images/home/hero.png';
const fallbackRecipientImage = '/images/common/iic_logo.png';

const sortBatches = (batches: ScholarshipBatch[]) => (
  [...batches].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  })
);

const getRecipients = (batch?: ScholarshipBatch) => batch?.recipients || [];

const recipientLabel = (count: number) => `${count || 'No'} ${count === 1 ? 'recipient' : 'recipients'}`;

const AwardBadge = ({ awardType }: { awardType: ScholarshipAwardType }) => (
  <span
    className="inline-flex items-center rounded-lg px-3 py-1.5 text-[10px] font-black uppercase text-white"
    style={{ backgroundColor: awardAccents[awardType] }}
  >
    {awardLabels[awardType]}
  </span>
);

const EligibilityCriteria = ({
  criteria,
}: {
  criteria: readonly string[];
}) => (
  <div className="border-t border-gray-200 pt-5">
    <h4 className="text-sm font-black text-[#1a1a1a]">Eligibility Criteria</h4>
    <ul className="mt-4 space-y-3">
      {criteria.map((item) => (
        <li key={item} className="flex gap-3 text-sm font-medium leading-relaxed text-gray-600">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#74C044]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TrackIntro = ({ awardType }: { awardType: ScholarshipAwardType }) => {
  const copy = trackCopy[awardType];

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <AwardBadge awardType={awardType} />
      <h3 className="mt-6 text-3xl font-black leading-tight text-[#1a1a1a] md:text-4xl">{copy.shortTitle}</h3>
      <p className="mt-2 text-sm font-black uppercase text-gray-400">{copy.kicker}</p>
      <p className="mt-6 text-base font-medium leading-relaxed text-gray-600">{copy.description}</p>
      <div className="mt-8">
        <EligibilityCriteria criteria={copy.criteria} />
      </div>
    </article>
  );
};

const EmptyTrackState = ({ awardType }: { awardType: ScholarshipAwardType }) => {
  const copy = trackCopy[awardType];

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
      <AwardBadge awardType={awardType} />
      <h3 className="mt-5 text-2xl font-black text-[#1a1a1a]">{copy.emptyTitle}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-gray-500">{copy.emptyDescription}</p>
    </div>
  );
};

const MetricBox = ({ label, value }: { label: string; value: number | string }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-3xl font-black text-[#1a1a1a]">{value}</p>
    <p className="mt-1 text-[10px] font-black uppercase text-gray-400">{label}</p>
  </div>
);

const AAARecipientItem = ({ recipient, index }: { recipient: ScholarshipRecipient; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay: Math.min(index * 0.025, 0.3), duration: 0.45 }}
    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
  >
    <div className="flex items-center gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#21409A] text-sm font-black text-white">
        {index + 1}
      </div>
      <div className="min-w-0">
        <h4 className="break-words text-base font-black text-[#1a1a1a]">{recipient.name}</h4>
        <p className="mt-1 break-words text-xs font-bold text-gray-500">
          {recipient.programme || 'AAA Scholarship Recipient'}
        </p>
      </div>
    </div>
  </motion.article>
);

const IngScholarCard = ({
  batch,
  recipient,
}: {
  batch: ScholarshipBatch;
  recipient?: ScholarshipRecipient;
}) => (
  <div className="grid overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl shadow-[#21409A]/10 lg:grid-cols-[0.95fr_1.05fr]">
    <div className="relative min-h-[360px] bg-[#eef4f0]">
      <Image
        src={recipient?.image || batch.groupImage || fallbackGroupImage}
        alt={recipient?.name || `${batch.year} ING Postgraduate Scholar`}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover"
      />
      <div className="absolute left-5 top-5 rounded-lg bg-white px-4 py-3 shadow-lg">
        <p className="text-[10px] font-black uppercase text-gray-400">Scholarship Year</p>
        <p className="text-3xl font-black text-[#21409A]">{batch.year}</p>
      </div>
    </div>
    <div className="flex flex-col justify-center p-7 md:p-10">
      <AwardBadge awardType="ing_postgraduate" />
      <h3 className="mt-6 text-4xl font-black leading-tight text-[#1a1a1a]">
        {recipient?.name || batch.title}
      </h3>
      <p className="mt-3 text-sm font-black uppercase text-[#74C044]">
        {recipient?.programme || 'Annual ING Postgraduate Scholar'}
      </p>
      {recipient?.quote ? (
        <p className="mt-7 text-lg font-medium leading-relaxed text-gray-600">{`"${recipient.quote}"`}</p>
      ) : (
        <p className="mt-7 text-lg font-medium leading-relaxed text-gray-600">
          {batch.summary || 'A focused postgraduate scholarship awarded to one outstanding eligible graduate for the year.'}
        </p>
      )}
    </div>
  </div>
);

const ScholarshipArchive = ({
  awardType,
  batches,
  openArchive,
  toggleArchive,
}: {
  awardType: ScholarshipAwardType;
  batches: ScholarshipBatch[];
  openArchive: Record<string, boolean>;
  toggleArchive: (key: string) => void;
}) => {
  const copy = trackCopy[awardType];

  if (batches.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm font-bold text-gray-500">
          {awardType === 'aaa' ? 'Previous AAA years will appear here as the archive grows.' : 'Previous ING scholars will appear here after more years are published.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-black text-[#1a1a1a]">{copy.archiveTitle}</h3>
      {batches.map((batch) => {
        const key = `${awardType}-${batch.id}`;
        const open = openArchive[key] ?? false;
        const recipients = getRecipients(batch);

        return (
          <div key={batch.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => toggleArchive(key)}
              className="flex w-full flex-wrap items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
            >
              <div>
                <p className="text-xl font-black text-[#1a1a1a]">{batch.year}</p>
                <p className="mt-1 text-sm font-bold text-gray-500">{batch.title}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-black uppercase text-[#21409A]">{recipientLabel(recipients.length)}</span>
                <motion.svg
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-200 bg-[#f8fafc] p-5 md:p-6">
                    {awardType === 'ing_postgraduate' ? (
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                          <Image
                            src={recipients[0]?.image || batch.groupImage || fallbackRecipientImage}
                            alt={recipients[0]?.name || batch.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="break-words text-lg font-black text-[#1a1a1a]">{recipients[0]?.name || 'Scholar to be announced'}</p>
                          <p className="mt-1 break-words text-sm font-bold text-gray-500">
                            {recipients[0]?.programme || 'ING Postgraduate Scholar'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {recipients.map((recipient, index) => (
                          <AAARecipientItem key={`${batch.id}-${recipient.name}-${index}`} recipient={recipient} index={index} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const AAASection = ({
  batches,
  openArchive,
  toggleArchive,
}: {
  batches: ScholarshipBatch[];
  openArchive: Record<string, boolean>;
  toggleArchive: (key: string) => void;
}) => {
  const latestBatch = batches[0];
  const previousBatches = batches.slice(1);
  const recipients = getRecipients(latestBatch);
  const totalRecipients = batches.reduce((sum, batch) => sum + batch.recipients.length, 0);

  return (
    <section id="aaa-scholarship" className="bg-[#f4f7fb] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase text-[#21409A]">AAA Scholarship</p>
            <h2 className="text-4xl font-black leading-tight text-[#1a1a1a] md:text-6xl">
              A yearwise honour roll for many deserving students.
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <TrackIntro awardType="aaa" />

          {latestBatch ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-3">
                <MetricBox label="Latest year" value={latestBatch.year} />
                <MetricBox label="Latest recipients" value={recipients.length} />
                <MetricBox label="Total archived" value={totalRecipients} />
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="relative min-h-[280px] bg-[#e9eef8] md:min-h-[420px]">
                  <Image
                    src={latestBatch.groupImage || fallbackGroupImage}
                    alt={`${latestBatch.year} AAA Scholarship recipients`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 68vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white md:p-8">
                    <AwardBadge awardType="aaa" />
                    <h3 className="mt-4 text-3xl font-black md:text-5xl">{latestBatch.title}</h3>
                    {latestBatch.summary && (
                      <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-white/75 md:text-base">
                        {latestBatch.summary}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-5 md:p-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-2xl font-black text-[#1a1a1a]">{latestBatch.year} AAA recipients</h3>
                    <span className="rounded-lg bg-[#21409A]/10 px-4 py-2 text-xs font-black uppercase text-[#21409A]">
                      {recipientLabel(recipients.length)}
                    </span>
                  </div>
                  {recipients.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {recipients.map((recipient, index) => (
                        <AAARecipientItem key={`${latestBatch.id}-${recipient.name}-${index}`} recipient={recipient} index={index} />
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg bg-[#f8fafc] p-5 text-sm font-bold text-gray-500">
                      Recipient names for this AAA batch will be added soon.
                    </p>
                  )}
                </div>
              </div>

              <ScholarshipArchive
                awardType="aaa"
                batches={previousBatches}
                openArchive={openArchive}
                toggleArchive={toggleArchive}
              />
            </div>
          ) : (
            <EmptyTrackState awardType="aaa" />
          )}
        </div>
      </div>
    </section>
  );
};

const IngSection = ({
  batches,
  openArchive,
  toggleArchive,
}: {
  batches: ScholarshipBatch[];
  openArchive: Record<string, boolean>;
  toggleArchive: (key: string) => void;
}) => {
  const latestBatch = batches[0];
  const previousBatches = batches.slice(1);
  const scholar = latestBatch?.recipients[0];

  return (
    <section id="ing-postgraduate-scholarship" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase text-[#74C044]">ING Postgraduate Scholarship</p>
            <h2 className="text-4xl font-black leading-tight text-[#1a1a1a] md:text-6xl">
              One postgraduate scholar receives the spotlight each year.
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            {latestBatch ? (
              <>
                <div className="grid gap-6 sm:grid-cols-3">
                  <MetricBox label="Latest year" value={latestBatch.year} />
                  <MetricBox label="Annual scholar" value={scholar ? 1 : 0} />
                  <MetricBox label="Years archived" value={batches.length} />
                </div>
                <IngScholarCard batch={latestBatch} recipient={scholar} />
                <ScholarshipArchive
                  awardType="ing_postgraduate"
                  batches={previousBatches}
                  openArchive={openArchive}
                  toggleArchive={toggleArchive}
                />
              </>
            ) : (
              <EmptyTrackState awardType="ing_postgraduate" />
            )}
          </div>
          <TrackIntro awardType="ing_postgraduate" />
        </div>
      </div>
    </section>
  );
};

const ScholarshipsClient = ({ batches }: { batches: ScholarshipBatch[] }) => {
  const [openArchive, setOpenArchive] = useState<Record<string, boolean>>({});

  const aaaBatches = useMemo(() => sortBatches(batches.filter((batch) => batch.awardType === 'aaa')), [batches]);
  const ingBatches = useMemo(() => sortBatches(batches.filter((batch) => batch.awardType === 'ing_postgraduate')), [batches]);
  const years = new Set(batches.map((batch) => batch.year));

  const toggleArchive = (key: string) => {
    setOpenArchive((state) => ({ ...state, [key]: !state[key] }));
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#1a1a1a]">
      <section className="relative flex min-h-[82svh] items-end overflow-hidden bg-black px-6 pb-14 pt-32 text-white md:pb-20">
        <Image
          src={fallbackHeroImage}
          alt="IIC graduates celebrating scholarships"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase text-[#8DBAFF]">Scholarships at IIC</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] sm:text-6xl md:text-7xl lg:text-[86px]">
              Two scholarship paths, two different kinds of recognition.
            </h1>
            <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-white/76 sm:text-xl">
              AAA celebrates a wider cohort of disciplined students. ING Postgraduate honours one outstanding graduate each year.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#aaa-scholarship" className="rounded-lg bg-[#21409A] px-6 py-4 text-sm font-black text-white shadow-xl shadow-black/20 transition-colors hover:bg-[#173179]">
                Explore AAA
              </Link>
              <Link href="#ing-postgraduate-scholarship" className="rounded-lg border border-white/28 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white/18">
                Explore ING Postgraduate
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
            {[
              { label: 'Years', value: years.size || '-' },
              { label: 'AAA students', value: aaaBatches.reduce((sum, batch) => sum + batch.recipients.length, 0) || '-' },
              { label: 'ING scholars', value: ingBatches.reduce((sum, batch) => sum + Math.min(batch.recipients.length, 1), 0) || '-' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-lg bg-black/20 p-4 text-center">
                <p className="text-3xl font-black text-white">{metric.value}</p>
                <p className="mt-1 text-[10px] font-black uppercase text-white/55">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {(['aaa', 'ing_postgraduate'] as ScholarshipAwardType[]).map((awardType) => {
              const copy = trackCopy[awardType];
              return (
                <Link
                  key={awardType}
                  href={awardType === 'aaa' ? '#aaa-scholarship' : '#ing-postgraduate-scholarship'}
                  className="group rounded-lg border border-gray-200 bg-[#f8fafc] p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#21409A]/30 hover:shadow-lg md:p-8"
                >
                  <AwardBadge awardType={awardType} />
                  <h2 className="mt-6 text-3xl font-black leading-tight text-[#1a1a1a] md:text-4xl">{copy.title}</h2>
                  <p className="mt-4 text-base font-medium leading-relaxed text-gray-600">{copy.description}</p>
                  <span className="mt-7 inline-flex text-sm font-black text-[#21409A] group-hover:text-[#173179]">
                    View section
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {batches.length === 0 && (
        <section className="bg-[#f4f7fb] py-12">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:p-10">
              <p className="text-xs font-black uppercase text-[#21409A]">Recipients Archive</p>
              <h2 className="mt-5 text-4xl font-black text-[#1a1a1a]">Recipients will be published soon.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-gray-500">
                The scholarship archive is ready for yearwise updates. Once published by the IIC team, AAA and ING recipient stories will appear in their own sections.
              </p>
            </div>
          </div>
        </section>
      )}

      <AAASection batches={aaaBatches} openArchive={openArchive} toggleArchive={toggleArchive} />
      <IngSection batches={ingBatches} openArchive={openArchive} toggleArchive={toggleArchive} />

      <section className="relative overflow-hidden bg-[#21409A] py-16 text-white md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs font-black uppercase text-[#A9D88A]">Next Step</p>
          <h2 className="mt-5 text-4xl font-black md:text-6xl">Ready to compete for your opportunity?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/72">
            Talk with our admissions team about eligibility, deadlines, and how scholarship decisions are published each year.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="rounded-lg bg-white px-6 py-4 text-sm font-black text-[#21409A] transition-colors hover:bg-[#f3f6fb]">
              Apply Now
            </Link>
            <Link href="/contact" className="rounded-lg border border-white/24 px-6 py-4 text-sm font-black text-white transition-colors hover:bg-white/10">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ScholarshipsClient;
