'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';
import type { CourseItem } from '@/lib/courses';

interface Module {
  name: string;
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

interface CourseData {
  title: string;
  subtitle?: string;
  description?: string;
  overview?: string;
  details?: {
    level?: string;
    duration?: string;
    intake?: string;
    awardingBody?: string;
  };
  curriculum?: Year[];
  entryRequirements?: {
    academic?: string;
    language?: string;
  };
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

  const sanitizedOverview = React.useMemo(() => {
    const overviewHtml = course.overview || `
      <p>The ${course.title} degree at Itahari International College, awarded by London Metropolitan University, is designed to provide you with a comprehensive understanding of core principles and practical skills in your chosen field.</p>
      <p>Our industry-aligned curriculum ensures you are exposed to the latest technologies and methodologies, preparing you for a seamless transition into the global workforce.</p>
    `;
    return sanitizeHtml(overviewHtml);
  }, [course.overview, course.title]);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/course-details/course-details-hero.png"
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
            className="inline-flex items-center gap-2.5 px-5 py-2 border border-[#008767]/60 rounded-full mb-10 bg-transparent backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-[#008767]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.055l-10 5.445 10 5.445 10-5.445-10-5.445zm0 13.09l-8.03-4.373-1.97 1.073 10 5.445 10-5.445-1.97-1.073-8.03 4.373z" />
              <path d="M12 21.945l-10-5.445 1.97-1.073 8.03 4.373 8.03-4.373 1.97 1.073-10 5.445z" />
            </svg>
            <span className="text-white text-[13px] font-medium tracking-[0.05em]">
              {course.details?.awardingBody}
            </span>
          </motion.div>

          <AnimeReveal
            text={course.title}
            className="text-6xl md:text-[100px] font-bold text-white mb-10 leading-[1] tracking-tight max-w-[900px] mx-auto justify-center"
            staggerFrom="center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-[14px] md:text-[16px] max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
          >
            {course.description}
          </motion.p>

          <Magnetic strength={0.25}>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#21409A] text-white font-bold rounded-xl shadow-2xl hover:bg-[#1a337e] transition-all"
            >
              <span className="text-sm">Apply Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Magnetic>
        </div>
      </section>

      {/* Overview & Details Section */}
      <section className="py-20 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Overview Card */}
          <div className="lg:col-span-7 bg-white p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50">
            <div className="flex gap-8 border-b border-gray-100 mb-10">
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
                  className="space-y-6"
                >
                  <div className="prose prose-lg text-gray-500 max-w-none font-medium leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: sanitizedOverview }} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="outcomes"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {course.learningOutcomes?.map((outcome, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#74C044]/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3.5 h-3.5 text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">{outcome}</p>
                    </div>
                  )) || (
                    <p className="text-gray-400 italic">No learning outcomes specified for this course yet.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Program Details Card */}
          <div className="lg:col-span-5 bg-white p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-10">Program Details</h3>
            
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
                <div key={i} className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#f0f4f8] rounded-xl flex items-center justify-center text-[#21409A]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{item.label}</p>
                    <p className="text-[#1a1a1a] font-bold text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </AnimeStagger>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
              Curriculum Structure
              <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Accordions */}
            <div className="lg:col-span-8 space-y-6">
              {course.curriculum?.map((year, i) => (
                <div key={i} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
                  <button
                    onClick={() => setActiveYear(activeYear === i ? -1 : i)}
                    className="w-full px-8 py-7 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl font-bold text-[#1a1a1a]">{year.title}</span>
                    <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-300 ${activeYear === i ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeYear === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {year.modules?.map((mod, j) => (
                            <div key={j} className="p-8 bg-[#f8fafc] rounded-2xl border border-gray-100 group hover:border-[#21409A]/20 transition-all">
                              <h4 className="font-bold text-[#1a1a1a] mb-3 text-lg leading-tight">
                                {mod.name} {mod.credits && `(${mod.credits} Credits)`}
                              </h4>
                              <p className="text-sm text-gray-500 leading-relaxed">{mod.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-4 flex items-center gap-2 text-gray-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
                </svg>
                Download full module specification (PDF)
              </div>
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
                  <button className="w-full py-4 bg-[#21409A] text-white font-bold rounded-2xl shadow-xl hover:bg-[#1a337e] transition-all transform hover:-y-1">
                    Apply for this Program
                  </button>
                </Magnetic>
                <button className="w-full py-4 bg-white text-[#1a1a1a] font-bold rounded-2xl shadow-md border border-gray-100 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
                  </svg>
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Requirements Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#21409A] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Eligibility</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] font-sora tracking-tight leading-tight mb-8">
                Entry <span className="text-[#21409A]">Requirements</span>
              </h2>
              <div className="space-y-8">
                <div className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-100">
                  <h4 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#21409A]/10 flex items-center justify-center text-[#21409A]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    Academic Criteria
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {course.entryRequirements?.academic || "Please contact the admissions office for specific academic requirements for this program."}
                  </p>
                </div>
                <div className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-100">
                  <h4 className="text-xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#21409A]/10 flex items-center justify-center text-[#21409A]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    Language Proficiency
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {course.entryRequirements?.language || "Proficiency in English is required. Equivalent qualifications like IELTS or TOEFL are accepted."}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#21409A]/5 blur-[100px] rounded-full" />
              <div className="relative bg-[#1a1a1a] p-12 rounded-[48px] border border-white/10 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to Start?</h3>
                  <p className="text-gray-400">Our admissions team is here to guide you through every step of the process.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#21409A]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Next Intake</p>
                      <p className="text-lg font-bold">{course.details?.intake || "Spring 2026"}</p>
                    </div>
                  </div>
                  <Link href="/contact" className="block w-full py-4 bg-[#21409A] text-white text-center font-bold rounded-2xl hover:bg-[#1a337e] transition-all">
                    Inquire for Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      {course.careerOpportunities && course.careerOpportunities.length > 0 && (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#21409A]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <span className="text-[#21409A] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Future Prospects</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-sora tracking-tight">
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
                  className="career-card bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center bg-[#21409A]/20 text-[#21409A]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{path.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{path.description}</p>
                </motion.div>
              ))}
            </AnimeStagger>
          </div>
        </section>
      )}

      {/* Student Innovation Gallery (Projects) */}
      {course.projects && course.projects.length > 0 && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <span className="text-[#21409A] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Hands-on Learning</span>
                <h2 className="text-4xl font-bold text-[#1a1a1a] font-sora tracking-tight">
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
                    src={project.image || '/images/common/project-placeholder.png'} 
                    alt={project.title || "Student Project"} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 p-10 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#21409A] font-bold text-xs uppercase tracking-widest mb-3 block">{project.cohort}</span>
                    <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Meet the Faculty Section */}
      <section className="py-24 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
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
              const isFirst = i === 0;
              return (
                <div 
                  key={i} 
                  className={`faculty-card ${isFirst ? 'bg-[#483d73] text-white' : 'bg-white border border-gray-100 text-[#1a1a1a]'} p-10 rounded-[32px] shadow-sm flex flex-col items-center text-center`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className={`relative w-28 h-28 rounded-full mb-8 flex items-center justify-center ${isFirst ? 'bg-[#f8d7da]/20' : 'bg-[#f0f4f8]'}`}>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-inner">
                      <Image 
                        src={member.image || '/images/common/avatar-placeholder.png'} 
                        alt={member.name || 'Faculty Member'} 
                        fill 
                        className="object-cover scale-110" 
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{member.name || 'Staff Member'}</h4>
                  <p className={`text-sm font-bold mb-1 ${isFirst ? 'text-white/80' : 'text-[#21409A]'}`}>
                    {member.role || 'Faculty'}
                  </p>
                  <p className={`text-[13px] leading-relaxed ${isFirst ? 'text-white/60' : 'text-gray-400'}`}>
                    {member.description}
                  </p>
                </div>
              );
            })}
          </AnimeStagger>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
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
                    ? 'bg-[#004d40] text-white shadow-lg' 
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

      {/* Student Success Stories Section */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#21409A]/5 blur-[120px] rounded-full -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-[#21409A] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Student Outcomes</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-sora tracking-tight leading-[1.1]">
                Where Our <span className="text-[#21409A]">Graduates</span> Shine
              </h2>
            </div>
            <p className="text-gray-400 font-medium max-w-md lg:text-right">
              Join a global network of alumni working at top-tier tech firms and multinational corporations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Anish Shrestha",
                role: "Software Engineer at Google",
                quote: "The hands-on curriculum at IIC gave me the technical foundation I needed to excel in my career at a global scale.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
              },
              {
                name: "Priya Sharma",
                role: "Data Analyst at Microsoft",
                quote: "IIC's partnership with London Met provided me with a world-class degree while staying close to my roots in Itahari.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
              },
              {
                name: "Rohan Chaudhary",
                role: "Product Manager at Amazon",
                quote: "The focus on soft skills and industry exposure prepared me for the challenges of leading large-scale tech products.",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
              }
            ].map((testi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#21409A]/30">
                    <Image src={testi.img} alt={testi.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testi.name}</h4>
                    <p className="text-[#21409A] text-xs font-bold uppercase tracking-wider">{testi.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 font-medium leading-relaxed italic">
                  {`"${testi.quote}"`}
                </p>
                <div className="mt-8 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#21409A]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Courses Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
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
            {relatedCourses?.map((relCourse, i: number) => (
              <Link href={`/courses/${relCourse.slug}`} key={i} className="related-course-card group" style={{ willChange: 'transform, opacity' }}>
                <div className="bg-[#f8fafc] rounded-[32px] overflow-hidden border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-2">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={relCourse.image}
                      alt={relCourse.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[12px] font-bold text-[#21409A] uppercase tracking-wider mb-3 block">
                      {relCourse.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 group-hover:text-[#21409A] transition-colors">
                      {relCourse.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {relCourse.duration}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </AnimeStagger>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CourseDetailPage;
