'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Module {
  name: string;
  description: string;
  credits: string;
}

interface Year {
  title: string;
  modules: Module[];
}

interface FacultyMember {
  name: string;
  role: string;
  description: string;
  image: string;
  color?: string;
}

interface CareerPath {
  title: string;
  description: string;
  color: string;
}

interface Project {
  title: string;
  cohort: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface CourseData {
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  details: {
    level: string;
    duration: string;
    intake: string;
    awardingBody: string;
  };
  curriculum: Year[];
  entryRequirements: {
    academic: string;
    language: string;
  };
  learningOutcomes: string[];
  careerOpportunities: CareerPath[];
  faculty: FacultyMember[];
  quote: {
    text: string;
    author: string;
  };
  projects: Project[];
  faqs: FAQ[];
}

const CourseDetailPage = ({ course }: { course: CourseData }) => {
  const [activeYear, setActiveYear] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'outcomes'>('overview');
  const [activeFAQ, setActiveFAQ] = useState(0);

  return (
    <main className="bg-white">
      <Navbar />

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

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Refined Badge Design from 2nd Screenshot */}
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
              {course.details.awardingBody}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[100px] font-bold text-white mb-10 leading-[1] tracking-tight max-w-[900px] mx-auto"
          >
            {course.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word} {i === 1 ? <br /> : ''}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-[14px] md:text-[16px] max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
          >
            {course.description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#21409A] text-white font-bold rounded-xl shadow-2xl hover:bg-[#1a337e] transition-all transform hover:scale-105"
          >
            <span className="text-sm">Apply Now</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
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
                  <p className="text-gray-500 leading-relaxed font-medium">
                    The {course.title} degree at Itahari International College, awarded by London Metropolitan University, is designed to provide you with a comprehensive understanding of computer science principles and practical software development skills. You will learn to design, develop, and maintain complex software systems that solve real-world problems.
                  </p>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Our industry-aligned curriculum ensures you are exposed to the latest technologies, including cloud computing, artificial intelligence, and agile methodologies, preparing you for a seamless transition into the global tech workforce.
                  </p>
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
            
            <div className="space-y-8">
              {[
                { label: 'Duration', value: course.details.duration, icon: (
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
                { label: 'Intake', value: course.details.intake, icon: (
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
            </div>
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
              {course.curriculum.map((year, i) => (
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
                          {year.modules.map((mod, j) => (
                            <div key={j} className="p-8 bg-[#f8fafc] rounded-2xl border border-gray-100 group hover:border-[#21409A]/20 transition-all">
                              <h4 className="font-bold text-[#1a1a1a] mb-3 text-lg leading-tight">
                                {mod.name} ({mod.credits} Credits)
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
                <button className="w-full py-4 bg-[#21409A] text-white font-bold rounded-2xl shadow-xl hover:bg-[#1a337e] transition-all transform hover:-y-1">
                  Apply for this Program
                </button>
                <button className="w-full py-4 bg-white text-[#1a1a1a] font-bold rounded-2xl shadow-md border border-gray-100 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
                  </svg>
                  Download Brochure
                </button>
                <p className="text-center text-sm text-gray-400">
                  Have questions? <span className="text-[#21409A] font-bold cursor-pointer">Contact Admissions</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Requirements Section */}
      <section className="py-24 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50 relative min-h-[450px] flex items-center">
            {/* Content side */}
            <div className="w-full lg:w-2/3 p-12 md:p-20 relative z-10">
              <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-12">
                Entry Requirements
                <div className="absolute -bottom-2 left-0 w-12 h-1.5 bg-[#21409A] rounded-full" />
              </h2>

              <div className="space-y-12 max-w-xl">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f0f4f8] flex items-center justify-center flex-shrink-0 text-[#21409A]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1a1a1a] mb-3">Academic Requirements</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      Minimum 50% in 10+2 (or equivalent) in any stream. Mathematics background preferred but not mandatory.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f0f4f8] flex items-center justify-center flex-shrink-0 text-[#21409A]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1a1a1a] mb-3">English Language</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      Minimum IELTS score of 6.0 (with no band less than 5.5) or equivalent English proficiency test.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image side */}
            <div className="hidden lg:block absolute right-0 bottom-0 w-[45%] h-[115%] pointer-events-none">
              <Image
                src="/images/course-details/entry-image.png"
                alt="Graduate"
                fill
                className="object-contain object-bottom scale-100 origin-bottom translate-x-4"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
              Career Opportunities
              <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {course.careerOpportunities.map((path, i) => {
              const isWhite = i === 1 || i === 3 || i === 4 || i === 6;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className={`${isWhite ? 'bg-white border border-gray-100' : path.color} p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center transition-all`}
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-8 border-4 border-white/20 shadow-lg">
                    <Image
                      src={course.faculty[i % course.faculty.length].image}
                      alt={path.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className={`text-xl font-bold mb-4 ${isWhite ? 'text-[#1a1a1a]' : 'text-white'}`}>
                    {path.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${isWhite ? 'text-gray-500' : 'text-white/80'}`}>
                    {path.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet the Faculty Section */}
      <section className="py-24 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
              Meet the Faculty
              <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {course.faculty.map((member, i) => {
              const isFirst = i === 0;
              return (
                <div 
                  key={i} 
                  className={`${isFirst ? 'bg-[#483d73] text-white' : 'bg-white border border-gray-100 text-[#1a1a1a]'} p-10 rounded-[32px] shadow-sm flex flex-col items-center text-center`}
                >
                  <div className={`relative w-28 h-28 rounded-full mb-8 flex items-center justify-center ${isFirst ? 'bg-[#f8d7da]/20' : 'bg-[#f0f4f8]'}`}>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-inner">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover scale-110" 
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{member.name}</h4>
                  <p className={`text-sm font-bold mb-1 ${isFirst ? 'text-white/80' : 'text-[#21409A]'}`}>
                    {member.role}
                  </p>
                  <p className={`text-[13px] leading-relaxed ${isFirst ? 'text-white/60' : 'text-gray-400'}`}>
                    {member.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Quote Section */}
      <section className="bg-[#0a1d37] overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left: Quote Text */}
          <div className="lg:w-1/2 p-16 md:p-24 flex flex-col justify-center relative">
            <div className="absolute top-16 left-16 opacity-20">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 14.691 16.708 12 20.017 12L20.017 12L20.017 12C20.017 12 20.017 12 20.017 12L20.017 21L14.017 21ZM5.017 21L5.017 18C5.017 14.691 7.708 12 11.017 12L11.017 12L11.017 12C11.017 12 11.017 12 11.017 12L11.017 21L5.017 21Z" transform="rotate(180 12 12)" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                "{course.quote.text}"
              </h2>
              <p className="text-white/60 text-lg">
                - {course.quote.author}
              </p>
            </div>

            <div className="absolute bottom-16 right-16 opacity-10">
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 14.691 16.708 12 20.017 12L20.017 12L20.017 12C20.017 12 20.017 12 20.017 12L20.017 21L14.017 21ZM5.017 21L5.017 18C5.017 14.691 7.708 12 11.017 12L11.017 12L11.017 12C11.017 12 11.017 12 11.017 12L11.017 21L5.017 21Z" />
              </svg>
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-auto">
            <Image
              src="/images/course-details/quote-image.png"
              alt="Course Quote"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      {/* Student Project Highlights */}
      <section className="py-24 bg-[#f3f6fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-[#1a1a1a] relative inline-block mb-4">
                Student Project Highlights
                <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#21409A] rounded-full" />
              </h2>
              <p className="text-gray-400 font-medium">See what our students are building.</p>
            </div>
            <button className="flex items-center gap-2 text-[#21409A] font-bold group">
              View all projects
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.projects.map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative aspect-[4/3] rounded-[32px] overflow-hidden group shadow-xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{project.title}</h4>
                    <p className="text-white/60 text-xs font-medium">{project.cohort}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-[#21409A] transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            {course.faqs.map((faq, i) => (
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
    </main>
  );
};

export default CourseDetailPage;
