'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import Tilt from '../../effects/Tilt';

const CourseCard = ({ course, index }: { course: any, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Advanced Parallax Transforms
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -5 : 5, 0, isEven ? 5 : -5]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.4], [isEven ? -100 : 100, 0]);
  
  // Image specific parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { 
          opacity: 0,
          y: 60,
          scale: 0.98
        },
        visible: { 
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.08,
            delayChildren: 0.1
          }
        }
      }}
      style={{ 
        backgroundColor: course.bg,
        scale: scrollScale, 
        rotate, 
        opacity: scrollOpacity,
        x,
        perspective: 1000
      }}
      className={`group relative overflow-hidden rounded-[32px] mb-24 md:mb-32 min-h-[450px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/10`}
    >
      {/* Premium Glow Sweep Effect */}
      <motion.div 
        variants={{
          hidden: { x: '-150%', skewX: -25 },
          visible: { x: '150%', skewX: -25 }
        }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent z-20 pointer-events-none"
      />

      <Tilt 
        strength={5} 
        className="w-full h-full relative z-10"
        innerClassName={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      >
        {/* Image Section with Curtain Reveal */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-auto overflow-hidden">
          <motion.div 
            variants={{
              hidden: { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.2 },
              visible: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
            }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 2}
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </motion.div>
          {/* Glass Overlay on Image */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          
          {/* Subtle Magnetic Pulse Point */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#74C044] rounded-full blur-[2px] z-20 pointer-events-none shadow-[0_0_15px_#74C044]"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative z-10">
          <div className="relative">
            {/* Category Tags Reveal */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="px-4 py-1.5 border border-white/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm">
                {course.category}
              </span>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </div>
            </motion.div>

            {/* Title Reveal */}
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 40, skewY: 3 },
                visible: { opacity: 1, y: 0, skewY: 0 }
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-[46px] font-black mb-8 leading-[1.05] tracking-tighter uppercase italic"
            >
              {course.title}
            </motion.h3>

            {/* Stats Reveal */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="px-4 py-1.5 bg-white text-black rounded-sm text-[9px] font-black uppercase tracking-widest shadow-xl">
                {course.modules}
              </span>
              <span className="px-4 py-1.5 bg-white text-black rounded-sm text-[9px] font-black uppercase tracking-widest shadow-xl">
                {course.credits}
              </span>
            </motion.div>

            {/* Description Reveal */}
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 0.75 }
              }}
              className="text-white mb-12 leading-relaxed text-sm md:text-base max-w-lg font-medium"
            >
              {course.description}
            </motion.p>

            {/* Action Reveal */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mt-auto pt-10 border-t border-white/10 flex items-center justify-between"
            >
              <div className="flex gap-3">
                {course.features.slice(0, 2).map((feature: string, i: number) => (
                  <span key={i} className="px-4 py-1.5 bg-white/5 rounded-md text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 border border-white/5">
                    {feature}
                  </span>
                ))}
              </div>
              <Link 
                href={`/courses/${course.slug}`}
                className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest group/btn hover:text-[#74C044] transition-colors"
              >
                Explore
                <div className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center group-hover/btn:border-[#74C044] group-hover/btn:bg-[#74C044] group-hover/btn:text-white transition-all duration-500 transform group-hover/btn:rotate-[360deg]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const CoursesList = () => {
  const courses = [
    {
      title: "Bachelor In Information Technology",
      category: "BSc (Hons) Computing",
      duration: "3 Years",
      bg: "#1a2b5e",
      description: "A comprehensive program covering software engineering, databases, and systems analysis, designed to build a strong foundation in modern computing.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bit.png",
      slug: "bsc-hons-computing",
      features: ["SOFTWARE ENGINEERING", "AI"],
    },
    {
      title: "Digital Business Management",
      category: "Business & Management",
      duration: "3 Years",
      bg: "#06332d",
      description: "A comprehensive program covering software engineering, databases, and systems analysis, designed to build a strong foundation in modern computing.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bba2.png",
      slug: "digital-business-management",
      features: ["SOFTWARE ENGINEERING", "AI"],
    },
    {
      title: "International Business",
      category: "Business & Management",
      duration: "3 Years",
      bg: "#5c1616",
      description: "A comprehensive program covering software engineering, databases, and systems analysis, designed to build a strong foundation in modern computing.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bba1.png",
      slug: "international-business",
      features: ["SOFTWARE ENGINEERING", "AI"],
    },
    {
      title: "Advertising & Marketing",
      category: "Business & Management",
      duration: "3 Years",
      bg: "#2b3b16",
      description: "A comprehensive program covering software engineering, databases, and systems analysis, designed to build a strong foundation in modern computing.",
      credits: "360 Credits",
      modules: "17 Modules",
      image: "/images/courses/bba3.png",
      slug: "advertising-marketing",
      features: ["SOFTWARE ENGINEERING", "AI"],
    }
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#f3f6fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-[64px] font-black text-[#21409A] mb-8 leading-tight tracking-tight uppercase">
            Browse our degrees
          </h2>
          <p className="text-[#444444] text-[14px] md:text-[18px] max-w-3xl leading-relaxed font-medium">
            Choose from our range of UK-affiliated IT and Business programmes, 
            designed to prepare you for the global job market.
          </p>
        </div>

        <div className="space-y-12">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesList;
