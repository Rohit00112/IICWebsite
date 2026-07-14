'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';
import type { CourseItem } from '@/lib/courses';

interface Module {
  name: string;
  code?: string;
  description?: string;
  credits?: string;
}

interface Year {
  title?: string;
  modules?: Module[];
}

interface FacultyMember {
  name?: string;
  role?: string;
  description?: string;
  image?: string;
  color?: string;
}

interface CareerPath {
  title?: string;
  description?: string;
  color?: string;
}

interface Project {
  title?: string;
  cohort?: string;
  image?: string;
}

interface FAQ {
  question?: string;
  answer?: string;
}


const formatCredits = (credits?: string) => {
  const value = credits?.trim();

  if (!value) return '';
  return /credits?/i.test(value) ? value : `${value} Credits`;
};

const MNEMONIC_WHITE_FILTER_ID = 'related-course-mnemonic-white-filter';

const mnemonicSeparators = /\r?\n|\s*\|\s*/;

const isShortMnemonicLabel = (value?: string) => {
  const label = value?.trim();

  return !!label && label.length <= 6 && /^[a-z0-9&.+-]+$/i.test(label);
};

const getShortCourseLabel = (course: CourseItem) => {
  const candidates = [course.category, course.listing?.category, course.title];

  for (const candidate of candidates) {
    const label = candidate?.trim();

    if (!label) continue;
    if (isShortMnemonicLabel(label)) return label;

    const match = label.match(/\b(BBA|BSc|BA|BIT|MBA|BHM)\b/i);
    if (match) return match[1];
  }

  return '';
};

const splitMnemonic = (value?: string) => (
  value
    ?.split(mnemonicSeparators)
    .map((part) => part.trim())
    .filter(Boolean) || []
);

const getHeadlineMnemonic = (headline: string) => {
  const cleanHeadline = headline.trim();
  const bachelorMatch = cleanHeadline.match(/^(Bachelor in)\s+(.+)$/i);

  if (bachelorMatch) {
    return [bachelorMatch[1], bachelorMatch[2]];
  }

  return cleanHeadline ? [cleanHeadline] : [];
};

const getRelatedCourseMnemonic = (course: CourseItem) => {
  const listing = course.listing || {};
  const customMnemonic = splitMnemonic(listing.mnemonic);

  if (customMnemonic.length > 0) {
    return customMnemonic;
  }

  const specialism = listing.specialism?.trim();
  const headline = listing.displayTitle?.trim() || listing.title?.trim();

  if (specialism) {
    const shortLabel = getShortCourseLabel(course);
    return [shortLabel || headline || course.category || course.title, specialism].filter(Boolean);
  }

  return getHeadlineMnemonic(headline || course.title);
};

const getRelatedCourseModuleCount = (course: CourseItem) => (
  course.curriculum?.reduce((total, year) => total + (year.modules?.length || 0), 0) || 0
);

const getRelatedCourseCreditTotal = (course: CourseItem) => (
  course.curriculum?.reduce((total, year) => (
    total + (year.modules?.reduce((moduleTotal, module) => {
      const parsed = Number.parseInt(module.credits || '', 10);
      return moduleTotal + (Number.isFinite(parsed) ? parsed : 0);
    }, 0) || 0)
  ), 0) || 0
);

const getRelatedCourseDisplay = (course: CourseItem) => {
  const listing = course.listing || {};
  const specialism = listing.specialism?.trim();
  const headline = listing.displayTitle?.trim() || listing.title?.trim();
  const moduleCount = getRelatedCourseModuleCount(course);
  const creditTotal = getRelatedCourseCreditTotal(course);

  return {
    image: listing.image || course.image,
    category: listing.category || course.category || 'Undergraduate',
    title: specialism || headline || course.title,
    color: listing.backgroundColor || '#21409A',
    mnemonic: getRelatedCourseMnemonic(course),
    mnemonicImage: listing.mnemonicImage || '',
    duration: course.duration || course.details?.duration || '3 Years',
    modules: listing.modulesLabel || (moduleCount ? `${moduleCount} Modules` : '17 Modules'),
    credits: listing.creditsLabel || (creditTotal ? `${creditTotal} Credits` : '360 Credits'),
  };
};

const RelatedCourseMnemonic = ({
  parts,
  color,
  imageSrc,
  alt,
}: {
  parts: string[];
  color: string;
  imageSrc?: string;
  alt: string;
}) => {
  const [rawLead = '', ...detailParts] = parts;
  const inlineDegreeMatch = rawLead.match(/^(BSc|BBA|BA|BIT|MBA|BHM)\s+(.+)$/i);
  const lead = detailParts.length === 0 && inlineDegreeMatch ? inlineDegreeMatch[1] : rawLead;
  const detail = detailParts.length === 0 && inlineDegreeMatch
    ? inlineDegreeMatch[2]
    : detailParts.join(' ');
  const compactLead = isShortMnemonicLabel(lead) && !!detail;

  return (
    <div
      className={`absolute bottom-0 left-6 z-20 flex translate-y-1/2 items-center overflow-hidden text-white shadow-[0_18px_32px_rgba(15,23,42,0.18)] md:left-8 ${
        imageSrc
          ? 'aspect-[3.15/1] w-[min(82%,380px)]'
          : 'min-h-[92px] w-[min(76%,320px)] px-7 py-5'
      }`}
      style={{ backgroundColor: color }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="scale-[1.45] object-contain"
          sizes="(max-width: 768px) 82vw, 380px"
          style={{ filter: `url(#${MNEMONIC_WHITE_FILTER_ID})` }}
        />
      ) : compactLead ? (
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 text-5xl font-black uppercase leading-none md:text-[56px]">
            {lead}
          </span>
          <span className="min-w-0 text-sm font-black uppercase leading-[0.95] md:text-base">
            {detail}
          </span>
        </div>
      ) : (
        <div className="min-w-0">
          {lead && (
            <div className={`${detail ? 'text-xs md:text-sm' : 'text-3xl md:text-[40px]'} font-black uppercase leading-[0.95]`}>
              {lead}
            </div>
          )}
          {detail && (
            <div className="mt-2 text-2xl font-black uppercase leading-[0.95] md:text-[30px]">
              {detail}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface CourseData {
  title: string;
  subtitle?: string;
  listing?: {
    displayTitle?: string;
    specialism?: string;
  };
  description?: string;
  overview?: string;
  details?: {
    level?: string;
    duration?: string;
    intake?: string;
    awardingBody?: string;
  };
  curriculum?: Year[];
  learningOutcomes?: string[];
  careerOpportunities?: CareerPath[];
  faculty?: FacultyMember[];
  quote?: {
    text?: string;
    author?: string;
  };
  projects?: Project[];
  faqs?: FAQ[];
}

import { sanitizeHtml } from '@/lib/sanitize';

const CourseDetailPage = ({ course, relatedCourses }: { course: CourseData, relatedCourses?: CourseItem[] }) => {
  const [activeYear, setActiveYear] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'outcomes'>('overview');
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const heroTitle = course.listing?.displayTitle || course.title;
  const heroSpecialism = course.listing?.specialism || '';
  const heroDescription = course.title === 'BSc (Hons) Computing' && course.description?.trim().toLowerCase() === 'hacked_by_inred'
    ? ''
    : course.description?.trim();

  const toggleModule = (key: string) => {
    setExpandedModule((current) => (current === key ? null : key));
  };

  const curriculumYears = course.curriculum ?? [];
  const safeActiveYear =
    activeYear >= 0 && activeYear < curriculumYears.length ? activeYear : 0;
  const activeYearModules = curriculumYears[safeActiveYear]?.modules ?? [];

  const sanitizedOverview = React.useMemo(() => {
    const overviewHtml = course.overview || `
      <p>The ${course.title} degree at Itahari International College, awarded by London Metropolitan University, is designed to provide you with a comprehensive understanding of core principles and practical skills in your chosen field.</p>
      <p>Our industry-aligned curriculum ensures you are exposed to the latest technologies and methodologies, preparing you for a seamless transition into the global workforce.</p>
    `;
    return sanitizeHtml(overviewHtml).replace(/[\u00A0\u202F]/g, ' ');
  }, [course.overview, course.title]);

  const admissionsHref = `/admissions?program=${encodeURIComponent(course.title)}`;
  const brochureHref = '/IIC Prospectus.pdf';

  return (
    <main className="bg-white">
      <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        <filter id={MNEMONIC_WHITE_FILTER_ID} colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            result="whiteArtwork"
            type="matrix"
            values="
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              1.45 1.45 1.45 0 -2.65
            "
          />
          <feComposite in="whiteArtwork" in2="SourceAlpha" operator="in" />
        </filter>
      </svg>
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/course-details/course-details-hero.webp"
            alt={course.title}
            fill
            className="object-cover opacity-40 brightness-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 border border-[#74C044]/60 rounded-full mb-10 bg-transparent backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-[#74C044]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.055l-10 5.445 10 5.445 10-5.445-10-5.445zm0 13.09l-8.03-4.373-1.97 1.073 10 5.445 10-5.445-1.97-1.073-8.03 4.373z" />
              <path d="M12 21.945l-10-5.445 1.97-1.073 8.03 4.373 8.03-4.373 1.97 1.073-10 5.445z" />
            </svg>
            <span className="text-white text-[13px] font-medium tracking-[0.05em]">
              {course.details?.awardingBody}
            </span>
          </motion.div>

          <div className="mb-10 flex flex-col items-center">
            <AnimeReveal
              as="h1"
              text={heroTitle}
              className="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[64px] xl:text-[72px] font-bold text-white leading-[1.05] tracking-normal max-w-[1230px] mx-auto justify-center"
              staggerFrom="center"
            />
            {heroSpecialism && (
              <AnimeReveal
                as="p"
                text={heroSpecialism}
                delay={0.2}
                className="mt-3 text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-semibold text-white/80 leading-[1.1] tracking-normal max-w-[1230px] mx-auto justify-center"
                staggerFrom="center"
              />
            )}
          </div>

          {heroDescription && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-[14px] md:text-[16px] max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
            >
              {heroDescription}
            </motion.p>
          )}

          <Magnetic strength={0.25}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href={admissionsHref} className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#21409A] text-white font-bold rounded-xl shadow-2xl hover:bg-[#21409A] transition-all">
                <span className="text-sm">Apply Now</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </Magnetic>
        </div>
      </section>

      {/* Overview & Details Section */}
      <section className="py-20 bg-[#f3f6fb] overflow-x-clip">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 min-w-0">
          
          {/* Overview Card */}
          <div className="lg:col-span-7 min-w-0 overflow-hidden bg-white p-6 sm:p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50">
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-gray-100 mb-10">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'overview' ? 'text-[#21409A] border-b-2 border-[#21409A]' : 'text-gray-400'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('outcomes')}
                className={`pb-4 text-lg font-bold transition-all relative ${activeTab === 'outcomes' ? 'text-[#21409A] border-b-2 border-[#21409A]' : 'text-gray-400'}`}
              >
                Learning Outcomes
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="min-w-0 space-y-6"
                >
                  <div className="prose prose-lg max-w-none min-w-0 break-normal text-gray-500 font-medium leading-relaxed [overflow-wrap:normal] [word-break:normal] [&_*]:max-w-full [&_*]:!whitespace-normal [&_*]:break-normal [&_*]:[overflow-wrap:normal] [&_*]:[word-break:normal]"
                    dangerouslySetInnerHTML={{ __html: sanitizedOverview }} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="outcomes"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="min-w-0 space-y-4"
                >
                  {course.learningOutcomes?.map((outcome, i) => (
                    <div key={i} className="flex min-w-0 gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#74C044]/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3.5 h-3.5 text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="min-w-0 break-words text-gray-500 font-medium">{outcome}</p>
                    </div>
                  )) || (
                    <p className="text-gray-400 italic">No learning outcomes specified for this course yet.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Programme Details Card */}
          <div className="lg:col-span-5 min-w-0 bg-white p-6 sm:p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-10">Programme Details</h3>
            
            <AnimeStagger className="space-y-8" selector=":scope > div" staggerDelay={110} translateY={22} duration={720}>
              {[
                { label: 'Level', value: course.details?.level || 'Undergraduate', icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )},
                { label: 'Duration', value: course.details?.duration, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )},
                { label: 'Location', value: 'Sundarharaicha - 4, Dulari, Morang', icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )},
                { label: 'Intake', value: course.details?.intake, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                  </svg>
                )},
                { label: 'Study Mode', value: 'Full-Time', icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )},
              ].map((item, i) => (
                <div key={i} className="flex min-w-0 items-center gap-5 sm:gap-6">
                  <div className="w-12 h-12 shrink-0 bg-[#f0f4f8] rounded-xl flex items-center justify-center text-[#21409A]">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-sm font-medium">{item.label}</p>
                    <p className="break-words text-[#1a1a1a] font-bold text-lg leading-snug">{item.value}</p>
                  </div>
                </div>
              ))}
            </AnimeStagger>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 md:py-20 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 md:mb-12">
            <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
              Curriculum Structure
              <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Year tabs + module list */}
            <div className="lg:col-span-8">
              {/* Year tab bar */}
              <div className="flex gap-1.5 rounded-2xl bg-white p-1.5 shadow-sm border border-gray-100">
                {course.curriculum?.map((year, i) => {
                  const isActive = safeActiveYear === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setActiveYear(i);
                        setExpandedModule(null);
                      }}
                      aria-selected={isActive}
                      role="tab"
                      className="relative flex-1 rounded-xl px-4 py-3.5 text-center text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21409A] focus-visible:ring-offset-2"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="curriculum-year-pill"
                          className="absolute inset-0 rounded-xl bg-[#21409A] shadow-md"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        />
                      )}
                      <span className={`relative z-10 ${isActive ? 'text-white' : 'text-[#21409A]'}`}>
                        {year.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Module list for active year */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeActiveYear}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mt-6 flex flex-col gap-4"
                >
                  {activeYearModules.map((mod, moduleIndex) => {
                    const moduleKey = `${safeActiveYear}-${moduleIndex}`;
                    const isOpen = expandedModule === moduleKey;
                    const hasDescription = Boolean(mod.description?.trim());

                    return (
                      <div
                        key={moduleIndex}
                        className={`overflow-hidden rounded-2xl border transition-colors ${
                          isOpen
                            ? 'border-[#21409A]/40 bg-[#f7f9fd] shadow-[0_14px_30px_rgba(33,64,154,0.08)]'
                            : 'border-gray-200 bg-white hover:border-[#21409A]/30'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => hasDescription && toggleModule(moduleKey)}
                          aria-expanded={isOpen}
                          disabled={!hasDescription}
                          className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21409A] focus-visible:ring-offset-2 ${
                            hasDescription ? 'cursor-pointer' : 'cursor-default'
                          }`}
                        >
                          <span className="flex flex-1 flex-col gap-1.5">
                            <span className="block text-lg font-bold leading-snug text-[#21409A]">
                              {mod.name}
                            </span>
                            <span className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500">
                              {mod.code && <span>Module: {mod.code}</span>}
                              {mod.credits && <span>{formatCredits(mod.credits)}</span>}
                            </span>
                          </span>
                          {hasDescription && (
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                isOpen
                                  ? 'rotate-180 border-[#21409A] bg-[#21409A] text-white'
                                  : 'border-gray-200 bg-gray-50 text-gray-400'
                              }`}
                              aria-hidden="true"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                          )}
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && hasDescription && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <p className="border-t border-gray-100 px-6 py-5 text-sm leading-relaxed text-gray-600">
                                {mod.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right side: Image & CTAs */}
            <div className="lg:col-span-4 space-y-8">
              <div className="relative aspect-[4/5] w-full transform translate-y-4">
                <Image
                  src="/images/home/course1.png"
                  alt="Student"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="space-y-4">
                <Magnetic strength={0.2}>
                  <Link href={admissionsHref} className="block w-full py-4 bg-[#21409A] text-white text-center font-bold rounded-2xl shadow-xl hover:bg-[#21409A] transition-all transform hover:-y-1">
                    Apply for this Programme
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Requirements Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="text-[#21409A] font-bold text-xs tracking-[0.2em] mb-4 block">Eligibility</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] font-iic tracking-tight leading-tight">
              Entry <span className="text-[#21409A]">Requirements</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-100">
              <h4 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#21409A]/10 flex items-center justify-center text-[#21409A]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                Academic Level
              </h4>
              <ul className="list-disc pl-5 space-y-3 text-gray-500 font-medium leading-relaxed">
                <li>NEB +2 overall aggregate of 2.2 CGPA (55%) or above, grade 12 English score of 60 or minimum of grade C+ and SEE Mathematics score of 50 or minimum of grade C+.</li>
                <li>For A-Level minimum of 3 &lsquo;A&rsquo; Level passes with minimum of grade D or General Paper or English (A or AS) with minimum of grade E.</li>
                <li>For CBSE / ICSE / any Indian Board an aggregate score of 65% or above &amp; grade 10 Mathematics grade of 60 or above.</li>
              </ul>
            </div>
            <div className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-100">
              <h4 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#21409A]/10 flex items-center justify-center text-[#21409A]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                English &amp; Math Proficiency
              </h4>
              <p className="text-gray-700 font-semibold leading-relaxed mb-4">
                Applicants not meeting the aforementioned criteria for English or Math can demonstrate their English or Math proficiency with the following internationally recognised English or Math Tests.
              </p>
              <p className="text-[#1a1a1a] font-bold mb-3">For Level 4 or Year 1 BIT / BA</p>
              <ul className="list-disc pl-5 space-y-3 text-gray-500 font-medium leading-relaxed">
                <li>Pass in General Paper or English Language or IELTS 6.0 with a minimum of 5.5 in each sub-element or PTE 57.</li>
                <li>Pass in English or Math Test approved by London Metropolitan University.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      {course.careerOpportunities && course.careerOpportunities.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f3f6fb] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#21409A]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#21409A] font-bold text-xs tracking-[0.2em] mb-4 block">Future Prospects</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] font-iic tracking-tight">
                Your <span className="text-[#21409A]">Career</span> Path
              </h2>
            </div>
            <AnimeStagger
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              selector=".career-card"
              staggerDelay={100}
              translateY={28}
              duration={760}
            >
              {course.careerOpportunities.map((path, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="career-card bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm hover:border-[#21409A]/20 hover:shadow-xl transition-all"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center bg-[#21409A]/10 text-[#21409A]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-[#1a1a1a] mb-3">{path.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{path.description}</p>
                </motion.div>
              ))}
            </AnimeStagger>
          </div>
        </section>
      )}

      {/* Student Innovation Gallery (Projects) */}
      {course.projects && course.projects.length > 0 && (
        <section className="py-16 md:py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <span className="text-[#21409A] font-bold text-xs tracking-[0.2em] mb-4 block">Hands-on Learning</span>
                <h2 className="text-4xl font-bold text-[#1a1a1a] font-iic tracking-tight">
                  Innovation <span className="text-[#21409A]">Gallery</span>
                </h2>
              </div>
              <p className="text-gray-500 font-medium max-w-sm">
                Explore a selection of capstone projects and research work developed by our students.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {course.projects.map((project, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="group relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl bg-gray-100"
                >
                  <Image 
                    src={project.image || '/images/course-details/course-details-hero.webp'} 
                    alt={project.title || "Student Project"} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 p-10 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#21409A] font-bold text-xs tracking-widest mb-3 block">{project.cohort}</span>
                    <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Meet the Faculty Section */}
      <section className="py-16 md:py-20 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 md:mb-12">
            <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
              Meet the Faculty
              <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
            </h2>
          </div>

          <AnimeStagger
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            selector=".faculty-card"
            staggerDelay={100}
            translateY={28}
            duration={760}
          >
            {course.faculty?.map((member, i) => {
              return (
                <div 
                  key={i} 
                  className="faculty-card flex flex-col items-center rounded-[32px] border border-gray-100 bg-white p-10 text-center text-[#1a1a1a] shadow-sm"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-[#f0f4f8]">
                    <div className="relative h-28 w-28 overflow-hidden rounded-full bg-white shadow-inner">
                      <Image 
                        src={member.image || '/images/common/iic_logo.png'} 
                        alt={member.name || 'Faculty Member'} 
                        fill 
                        className="scale-[1.08] object-cover object-[50%_12%] [transform-origin:50%_12%]"
                        sizes="112px"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{member.name || 'Staff Member'}</h4>
                  <p className="mb-1 text-sm font-bold text-[#21409A]">
                    {member.role || 'Faculty'}
                  </p>
                  <p className="text-[13px] leading-relaxed text-gray-400 line-clamp-6">
                    {member.description}
                  </p>
                </div>
              );
            })}
          </AnimeStagger>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10 md:mb-12">
            <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
              Frequently Asked Questions
              <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
            </h2>
          </div>

          <div className="space-y-4">
            {course.faqs?.map((faq, i) => (
              <div key={i} className="overflow-hidden">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === i ? -1 : i)}
                  className={`w-full px-8 py-6 flex items-center justify-between transition-all rounded-2xl ${
                    activeFAQ === i 
                    ? 'bg-[#21409A] text-white shadow-lg' 
                    : 'bg-white text-[#1a1a1a] border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg font-bold text-left">{faq.question}</span>
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 ${activeFAQ === i ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {activeFAQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 py-6 text-gray-500 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Courses Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 md:mb-12">
            <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
              Explore Other Degrees
              <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
            </h2>
          </div>

          <AnimeStagger
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            selector=".related-course-card"
            staggerDelay={120}
            translateY={30}
            duration={760}
          >
            {relatedCourses?.map((relCourse) => {
              const display = getRelatedCourseDisplay(relCourse);
              const normalizedCategory = display.category.trim().toLowerCase();
              const normalizedTitle = display.title.trim().toLowerCase();
              const showCategory = normalizedCategory.length > 0 && normalizedCategory !== normalizedTitle;

              return (
                <Link
                  href={`/${relCourse.slug}`}
                  key={relCourse.slug}
                  className="related-course-card group block h-full"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-sm border border-gray-100 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative z-10">
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
                        <Image
                          src={display.image}
                          alt={relCourse.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <RelatedCourseMnemonic
                        parts={display.mnemonic}
                        color={display.color}
                        imageSrc={display.mnemonicImage}
                        alt={`${relCourse.title} mnemonic`}
                      />
                    </div>
                    <div className="relative flex min-h-[205px] flex-1 overflow-hidden px-7 pb-7 pt-16 md:px-8 md:pb-8">
                      <div
                        className="absolute inset-x-0 bottom-0 h-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
                        style={{ backgroundColor: display.color }}
                      />
                      <div className="relative z-10 flex min-h-[145px] flex-1 flex-col">
                        {showCategory && (
                          <span className="mb-3 block text-base font-medium leading-tight text-[#21409A] transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                            {display.category}
                          </span>
                        )}
                        <h3 className="text-2xl font-black leading-tight text-[#1a1a1a] transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                          {display.title}
                        </h3>
                        <div className="mt-auto flex translate-y-4 flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-base font-bold leading-tight text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                          <span>{display.duration}</span>
                          <span className="text-white/75">|</span>
                          <span>{display.modules}</span>
                          <span className="text-white/75">|</span>
                          <span>{display.credits}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </AnimeStagger>
        </div>
      </section>
    </main>
  );
};

export default CourseDetailPage;
