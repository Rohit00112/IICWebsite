'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

import Tilt from '../../effects/Tilt';

type CourseListItem = {
  title: string;
  category: string;
  duration: string;
  bg: string;
  description: string;
  credits: string;
  modules: string;
  image: string;
  slug: string;
  features: string[];
};

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
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 2}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
          </motion.div>

          {/* Gradient veil — fades image into the colored side smoothly */}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-black/30`}
          />

          {/* Index marker, sits in the photo's outer corner */}
          <div className={`absolute top-5 ${isEven ? 'left-5 md:left-6' : 'right-5 md:right-6'} z-20`}>
            <div className="flex items-center gap-2 text-white/85">
              <span className="text-[10px] font-bold tracking-[0.3em]">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
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
            className="text-[28px] sm:text-4xl md:text-[42px] lg:text-[48px] font-black mb-7 leading-[1.05] tracking-tight"
          >
            {course.title}
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
                <span key={i} className="px-3 py-1.5 bg-white/[0.04] rounded-md text-[9px] font-bold tracking-[0.2em] text-white/50 border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-3 self-start sm:self-auto text-[11px] font-black tracking-[0.25em] group/btn"
            >
              <span className="relative transition-colors duration-300 group-hover/btn:text-[#74C044]">
                Explore
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#74C044] transition-all duration-500 group-hover/btn:w-full" />
              </span>
              <span className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover/btn:border-[#74C044] group-hover/btn:bg-[#74C044]">
                <svg className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <svg className="w-4 h-4 absolute -translate-x-6 transition-transform duration-500 group-hover/btn:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const CoursesList = () => {
  const courses = [
    {
      title: "Bachelor in Information Technology",
      category: "BSc (Hons) Computing",
      duration: "3 Years",
      bg: "#21409A",
      description: "A programme for future-ready technologists. Study software engineering, application development, artificial intelligence, and systems analysis through practical projects that connect theory with real industry expectations.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bit.png",
      slug: "bsc-hons-computing",
      features: ["Software Engineering", "AI"],
    },
    {
      title: "Digital Business Management",
      category: "Business & Management",
      duration: "3 Years",
      bg: "#58595B",
      description: "Build the skills to lead digital transformation, manage technology-enabled teams, and connect business strategy with modern tools, data, and customer expectations.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bba2.png",
      slug: "digital-business-management",
      features: ["Digital Strategy", "Management"],
    },
    {
      title: "International Business",
      category: "Business & Management",
      duration: "3 Years",
      bg: "#58595B",
      description: "Prepare for global markets with a business degree shaped by international standards, cross-cultural collaboration, and practical decision-making.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bba1.png",
      slug: "international-business",
      features: ["Global Markets", "Leadership"],
    },
    {
      title: "Advertising & Marketing",
      category: "Business & Management",
      duration: "3 Years",
      bg: "#21409A",
      description: "Develop the creative, analytical, and strategic skills to build brands, understand audiences, and deliver campaigns that make a measurable impact.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bba3.png",
      slug: "advertising-marketing",
      features: ["Brand Strategy", "Marketing"],
    }
  ];

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
          {courses.map((course, index) => (
            <div key={index} className="mb-[15vh] last:mb-0">
              <CourseCard course={course} index={index} total={courses.length} />
            </div>
          ))}
          {/* Spacer so last sticky card releases */}
          <div aria-hidden className="h-[20vh]" />
        </div>
      </div>
    </section>
  );
};

export default CoursesList;
