'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const CourseCard = ({ course, index }: { course: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-[32px] flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12 min-h-[450px] shadow-2xl`}
      style={{ backgroundColor: course.bg }}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative h-[300px] md:h-auto overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-4 py-1.5 border border-white/20 rounded-full text-[12px] font-bold tracking-wide">
            {course.category}
          </span>
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white/20 rounded-full text-[12px] font-bold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.duration}
          </div>
        </div>

        <h3 className="text-3xl md:text-[42px] font-black mb-6 leading-tight tracking-tight">
          {course.title}
        </h3>

        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-white text-black rounded-full text-[11px] font-bold uppercase">
            {course.modules}
          </span>
          <span className="px-3 py-1 bg-white text-black rounded-full text-[11px] font-bold uppercase">
            {course.credits}
          </span>
        </div>

        <p className="text-white/80 mb-10 leading-relaxed text-[14px] md:text-[16px] max-w-lg font-medium">
          {course.description}
        </p>

        <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-2">
            {course.features.slice(0, 2).map((feature: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest text-white/60">
                {feature}
              </span>
            ))}
          </div>
          <button className="flex items-center gap-2 text-[14px] font-bold hover:text-white/70 transition-colors group/btn">
            View Details
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
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
      features: ["SOFTWARE ENGINEERING", "AI"],
    }
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#f3f6fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-[64px] font-black text-[#21409A] mb-8 leading-tight tracking-tight uppercase">
            Find a Course
          </h2>
          <p className="text-[#444444] text-[14px] md:text-[18px] max-w-3xl leading-relaxed font-medium">
            Beginning your college journey is a very personal and sacred experience that encompasses a 
            wide range of events compounding towards your growth.
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
