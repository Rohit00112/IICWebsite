'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import type { CourseItem } from '@/lib/courses';

import Tilt from '../../effects/Tilt';

const COURSES_APPLY_HREF = '/admissions';

type CourseListItem = {
  title: string;
  specialism: string;
  officialTitle: string;
  category: string;
  duration: string;
  bg: string;
  description: string;
  credits: string;
  modules: string;
  image: string;
  imagePosition: string;
  slug: string;
  features: string[];
};

const courseDefaults: Record<string, Partial<CourseListItem>> = {
  'bsc-hons-computing': {
    title: 'Bachelor in Information Technology',
    category: 'BSc (Hons) Computing',
    duration: '3 Years',
    bg: '#21409A',
    description: 'A programme for future-ready technologists. Study software engineering, application development, artificial intelligence, and systems analysis through practical projects that connect theory with real industry expectations.',
    credits: '360 Credits',
    modules: '17 Modules',
    image: '/images/courses/bit.webp',
    imagePosition: '50% center',
    features: ['Software Engineering', 'AI'],
  },
  'bba-digital-business-management': {
    title: 'Business Administration',
    specialism: 'Digital Business Management',
    category: 'Business & Management',
    duration: '3 Years',
    bg: '#58595B',
    description: 'Build the skills to lead digital transformation, manage technology-enabled teams, and connect business strategy with modern tools, data, and customer expectations.',
    credits: '360 Credits',
    modules: '17 Modules',
    image: '/images/courses/bba2.png',
    imagePosition: '46% center',
    features: ['Digital Strategy', 'Management'],
  },
  'international-business': {
    title: 'Business Administration',
    specialism: 'International Business',
    category: 'Business & Management',
    duration: '3 Years',
    bg: '#58595B',
    description: 'Prepare for global markets with a business degree shaped by international standards, cross-cultural collaboration, and practical decision-making.',
    credits: '360 Credits',
    modules: '17 Modules',
    image: '/images/courses/bba1.png',
    imagePosition: '50% center',
    features: ['Global Markets', 'Leadership'],
  },
  'advertising-marketing': {
    title: 'Business Administration',
    specialism: 'Advertising and Marketing',
    category: 'Business & Management',
    duration: '3 Years',
    bg: '#21409A',
    description: 'Develop the creative, analytical, and strategic skills to build brands, understand audiences, and deliver campaigns that make a measurable impact.',
    credits: '360 Credits',
    modules: '17 Modules',
    image: '/images/courses/bba3.png',
    imagePosition: '34% center',
    features: ['Brand Strategy', 'Marketing'],
  },
};

const featureBadgeStyles = [
  'rounded-full bg-white text-[#21409A] border-white/70 shadow-[0_12px_28px_rgba(255,255,255,0.18)]',
  'rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#74C044] text-white border-white/25 shadow-[0_12px_28px_rgba(116,192,68,0.25)]',
];

const getModuleCount = (course: CourseItem) => (
  course.curriculum?.reduce((total, year) => total + (year.modules?.length || 0), 0) || 0
);

const getCreditTotal = (course: CourseItem) => (
  course.curriculum?.reduce((total, year) => (
    total + (year.modules?.reduce((moduleTotal, module) => {
      const parsed = Number.parseInt(module.credits || '', 10);
      return moduleTotal + (Number.isFinite(parsed) ? parsed : 0);
    }, 0) || 0)
  ), 0) || 0
);

const placeholderPillValues = new Set(['string']);

const normalizePills = (items: unknown[] = []) => {
  const seen = new Set<string>();

  return items.reduce<string[]>((labels, item) => {
    const label = String(item).trim();
    const key = label.toLowerCase();

    if (!label || placeholderPillValues.has(key) || seen.has(key)) return labels;

    seen.add(key);
    labels.push(label);
    return labels;
  }, []);
};

const toCourseListItem = (course: CourseItem): CourseListItem => {
  const defaults = courseDefaults[course.slug] || {};
  const listing = course.listing || {};
  const moduleCount = getModuleCount(course);
  const creditTotal = getCreditTotal(course);
  const listingPills = normalizePills(listing.featuredModules || []);
  const curriculumPills = normalizePills(course.curriculum?.flatMap((year) => (
    year.modules?.map((module) => module.name) || []
  )) || []);
  const topModulePills = listingPills.length > 0 ? listingPills : curriculumPills;

  return {
    title: listing.displayTitle || defaults.title || listing.title || course.title,
    specialism: listing.specialism || defaults.specialism || '',
    officialTitle: course.title,
    category: listing.category || defaults.category || course.category || 'Undergraduate',
    duration: course.duration || course.details?.duration || defaults.duration || '3 Years',
    bg: listing.backgroundColor || defaults.bg || '#21409A',
    description: listing.description || course.description || defaults.description || 'Explore a London Metropolitan University awarded programme designed for practical learning and career readiness.',
    credits: listing.creditsLabel || (creditTotal ? `${creditTotal} Credits` : defaults.credits) || '360 Credits',
    modules: listing.modulesLabel || (moduleCount ? `${moduleCount} Modules` : defaults.modules) || '17 Modules',
    image: listing.image || defaults.image || course.image || '/images/courses/course-hero.JPG',
    imagePosition: defaults.imagePosition || '50% center',
    slug: course.slug,
    features: topModulePills.length > 0 ? topModulePills.slice(0, 2) : (defaults.features || ['Career Ready', 'Practical Learning']),
  };
};

const fallbackCourseCards = Object.entries(courseDefaults).map(([slug, defaults]) => ({
  title: defaults.title || '',
  specialism: defaults.specialism || '',
  officialTitle: defaults.category || defaults.title || '',
  category: defaults.category || 'Undergraduate',
  duration: defaults.duration || '3 Years',
  bg: defaults.bg || '#21409A',
  description: defaults.description || 'Explore a London Metropolitan University awarded programme designed for practical learning and career readiness.',
  credits: defaults.credits || '360 Credits',
  modules: defaults.modules || '17 Modules',
  image: defaults.image || '/images/courses/course-hero.JPG',
  imagePosition: defaults.imagePosition || '50% center',
  slug,
  features: defaults.features || ['Career Ready', 'Practical Learning'],
}));

const CourseCard = ({ course, index, total }: { course: CourseListItem, index: number, total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const smoothExit = useSpring(exitProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001
  });

  const isEven = index % 2 === 0;
  const isLast = index === total - 1;

  const cardScale = useTransform(smoothExit, [0, 1], reduceMotion || isLast ? [1, 1] : [1, 0.94]);
  const cardOpacity = useTransform(smoothExit, [0, 1], reduceMotion || isLast ? [1, 1] : [1, 0.55]);

  const imageY = useTransform(
    useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 }),
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-6%", "6%"]
  );

  const topOffset = 80 + index * 24;
  const courseHref = `/courses/${course.slug}`;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.08,
            delayChildren: 0.2,
          }
        }
      }}
      style={{
        backgroundColor: course.bg,
        scale: cardScale,
        opacity: cardOpacity,
        top: `${topOffset}px`,
        willChange: 'transform, opacity',
        transformOrigin: 'center top'
      }}
      className="group sticky overflow-hidden rounded-2xl md:rounded-[32px] min-h-[480px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] border border-white/10"
    >
      <Link
        href={courseHref}
        aria-label={`Explore ${course.officialTitle}`}
        className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/70 md:rounded-[32px]"
      >
        {/* Soft ambient gradient overlay — adds depth without busy effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)] z-[1]" />

        <Tilt
          strength={3}
          className="w-full h-full relative z-10"
          innerClassName={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-[260px] sm:h-[320px] md:h-auto md:min-h-[480px] overflow-hidden">
            <motion.div
              variants={{
                hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
                visible: { clipPath: 'inset(0% 0% 0% 0%)' }
              }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: imageY, willChange: 'transform' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={course.image}
                alt={course.officialTitle}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
                style={{ objectPosition: course.imagePosition }}
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
            </motion.div>

            {/* Gradient veil — fades image into the colored side smoothly */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-black/30`}
            />

            {/* Accent rule, sits in the photo's outer corner */}
            <div className={`absolute top-5 ${isEven ? 'left-5 md:left-6' : 'right-5 md:right-6'} z-20`}>
              <div className="flex items-center text-white/85">
                <span className="w-8 h-px bg-white/40" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-7 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center text-white relative z-10">
            {/* Eyebrow row: category + duration */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -16 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex flex-wrap items-center gap-2.5 mb-6"
            >
              <span className="px-3.5 py-1.5 border border-white/25 rounded-full text-[10px] font-bold tracking-[0.2em] bg-white/[0.06] backdrop-blur-sm">
                {course.category}
              </span>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.08] border border-white/10 rounded-full text-[10px] font-bold tracking-[0.15em]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 text-[28px] sm:text-4xl md:text-[42px] lg:text-[48px] font-black leading-[1.05] tracking-normal"
            >
              <span className="block text-balance">{course.title}</span>
              {course.specialism && (
                <span className="mt-3 block text-[18px] font-bold leading-tight text-white/75 sm:text-[22px] md:text-[24px]">
                  {course.specialism}
                </span>
              )}
            </motion.h3>

            {/* Stat strip — two columns with subtle divider */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 }
              }}
              className="grid grid-cols-2 gap-0 mb-7 border-y border-white/10 divide-x divide-white/10"
            >
              <div className="py-3.5 pr-4">
                <div className="text-[9px] font-bold tracking-[0.25em] text-white/50 mb-1">Modules</div>
                <div className="text-lg md:text-xl font-black text-white">{course.modules.replace(/\s*Modules?$/i, '')}</div>
              </div>
              <div className="py-3.5 pl-4">
                <div className="text-[9px] font-bold tracking-[0.25em] text-white/50 mb-1">Credits</div>
                <div className="text-lg md:text-xl font-black text-white">{course.credits.replace(/\s*Credits?$/i, '')}</div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 0.78 }
              }}
              className="text-white mb-8 leading-relaxed text-sm md:text-[15px] max-w-lg font-medium"
            >
              {course.description}
            </motion.p>

            {/* Footer: feature tags + CTA */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
            >
              <div className="flex flex-wrap gap-2">
                {course.features.slice(0, 2).map((feature: string, i: number) => (
                  <span key={i} className={`${featureBadgeStyles[i % featureBadgeStyles.length]} px-3 py-1.5 text-[9px] font-black tracking-[0.14em] border`}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-3 self-start text-[11px] font-black tracking-[0.25em] sm:self-auto">
                <span className="relative transition-colors duration-300 group-hover:text-[#74C044]">
                  Explore
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#74C044] transition-all duration-500 group-hover:w-full" />
                </span>
                <span className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:border-[#74C044] group-hover:bg-[#74C044]">
                  <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <svg className="w-4 h-4 absolute -translate-x-6 transition-transform duration-500 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </div>
        </Tilt>
      </Link>
    </motion.div>
  );
};

const CoursesList = ({ courses }: { courses: CourseItem[] }) => {
  const courseCards = courses.length > 0 ? courses.map(toCourseListItem) : fallbackCourseCards;

  return (
    <section className="relative w-full py-14 md:py-24 bg-[#f3f6fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <p className="text-xs md:text-sm tracking-[0.3em] font-bold text-[#74C044] mb-4">
            UK Degrees &middot; Local Impact
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-black text-[#21409A] mb-6 leading-[1.05] tracking-tight">
            Industry-ready pathways
          </h2>
          <p className="text-[#444444] text-sm md:text-lg max-w-2xl leading-relaxed font-medium">
            Choose a London Metropolitan University awarded programme that combines international standards, hands-on learning, and career-focused support in Itahari.
          </p>
        </div>

        <div className="relative">
          {courseCards.map((course, index) => (
            <div key={index} className="mb-[15vh] last:mb-0">
              <CourseCard course={course} index={index} total={courseCards.length} />
            </div>
          ))}
          {/* Spacer so last sticky card releases */}
          <div className="flex h-[8vh] items-center justify-center pt-8">
            <Link
              href={COURSES_APPLY_HREF}
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[#21409A] px-12 py-4 text-sm md:text-base font-black tracking-[0.18em] text-white shadow-2xl shadow-[#21409A]/20 transition-all hover:bg-[#74C044] active:scale-95"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesList;
