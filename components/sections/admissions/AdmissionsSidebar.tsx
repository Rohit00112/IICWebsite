'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Magnetic from '../../effects/Magnetic';
import Tilt from '../../effects/Tilt';

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);

const GraduationCapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);

const MedalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/><circle cx="12" cy="8" r="7"/></svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);

interface AdmissionsSidebarProps {
  isSubmitted?: boolean;
}

const AdmissionsSidebar = ({ isSubmitted = false }: AdmissionsSidebarProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('requirements');

  const resources = [
    { name: 'Download College Brochure', icon: <BookIcon />, gated: true, href: 'https://iic.edu.np/pdf/iic_brochure.pdf' },
  ];

  const sidebarLinks = [
    { id: 'requirements', title: 'Entry Requirements', icon: <GraduationCapIcon />, content: [
      'Minimum 2.0 CGPA in +2/NEB or equivalent.',
      'Pass in English, or IELTS 6.0 (no band less than 5.5).',
      'Successful completion of an admissions interview.'
    ]},
    { id: 'scholarships', title: 'Scholarships', icon: <MedalIcon />, content: [
      'AAA Scholarship — up to 100% tuition waiver for excellence in Academics, Attendance, and Attitude (awarded to the top 10% of students).',
      'Fully Funded Masters Degree — 100% ING Postgraduate Scholarship at ING Colleges with Job placement in one of the ING companies',
      '* Eligibility includes good academic standing, 80%+ module attendance, timely fee payment, and a clean disciplinary record.'
    ] },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Resources Card */}
      <Tilt strength={5}>
        <div className="bg-white rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#21409A]">
              <FileIcon />
            </div>
            <h3 className="font-black text-[#1a1a1a] text-[17px] font-iic">Application Resources</h3>
          </div>
          <div className="flex flex-col gap-3">
            {resources.map((res) => {
              const locked = res.gated && !isSubmitted;
              const resourceClassName = `group w-full flex items-center justify-between p-4 border rounded-2xl transition-all duration-300 ${
                locked
                  ? 'bg-gray-50/50 border-transparent cursor-not-allowed opacity-60'
                  : 'bg-gray-50/50 hover:bg-white border-transparent hover:border-gray-100'
              }`;
              const resourceContent = (
                <>
                  <div className="flex items-center gap-3">
                    <span className={`transition-all ${locked ? 'opacity-40' : 'opacity-40 group-hover:opacity-100 group-hover:text-[#21409A]'}`}>{res.icon}</span>
                    <span className={`text-[13px] font-bold transition-colors ${locked ? 'text-gray-400' : 'text-gray-600 group-hover:text-[#1a1a1a]'}`}>{res.name}</span>
                  </div>
                  {locked && (
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 flex items-center gap-1">
                      <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                  )}
                </>
              );

              if (locked) {
                return (
                  <div key={res.name} className="relative">
                    <button
                      type="button"
                      aria-disabled="true"
                      onClick={(e) => e.preventDefault()}
                      className={`${resourceClassName} peer`}
                    >
                      {resourceContent}
                    </button>
                    {/* Instant tooltip — no hover delay */}
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#3a3a3a] px-3 py-2 text-[12px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-100 peer-hover:opacity-100"
                    >
                      Submit your application to unlock the brochure
                    </span>
                  </div>
                );
              }

              return (
                <a
                  key={res.name}
                  href={res.href}
                  target={res.href.startsWith('http') ? '_blank' : undefined}
                  rel={res.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={resourceClassName}
                >
                  {resourceContent}
                </a>
              );
            })}
          </div>
        </div>
      </Tilt>

      {/* Accordion Sections */}
      <Tilt strength={4}>
        <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
          {sidebarLinks.map((item) => (
            <div key={item.id} className="border-b border-gray-50 last:border-0">
              <button 
                onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${openAccordion === item.id ? 'bg-blue-50 text-[#21409A]' : 'bg-gray-50 text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] text-[14px] font-iic">{item.title}</h3>
                </div>
                <span className={`text-gray-300 transition-transform duration-300 ${openAccordion === item.id ? 'rotate-90 text-[#21409A]' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </span>
              </button>
              <AnimatePresence>
                {openAccordion === item.id && item.content.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-14 pb-8 pt-0 flex flex-col gap-3">
                      <ul className="flex flex-col gap-4">
                        {item.content.map((point, idx) => {
                          const hideBullet = item.id === 'scholarships' && idx === item.content.length - 1;

                          return (
                            <li key={idx} className="flex gap-3 text-[13px] text-gray-500 leading-relaxed font-medium">
                              <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${hideBullet ? 'invisible' : 'bg-[#74C044]'}`} />
                              {point}
                            </li>
                          );
                        })}
                      </ul>
                      <Link href={item.id === 'scholarships' ? '/scholarships' : '/courses'} className="text-[12px] font-bold text-[#21409A] flex items-center gap-2 mt-4 hover:translate-x-1 transition-transform">
                        {item.id === 'scholarships' ? 'View scholarship details ->' : 'View detailed programme requirements ->'}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Tilt>

      {/* Help Card */}
      <Tilt strength={8}>
        <div className="relative overflow-hidden bg-white rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
          {/* Subtle mesh-like background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/40 rounded-full blur-[60px] -z-0" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-50/40 rounded-full blur-[40px] -z-0" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#21409A]">
                <HelpIcon />
              </div>
              <h3 className="font-black text-[#1a1a1a] text-[17px] font-iic">Need Help?</h3>
            </div>
            <p className="text-gray-500 text-[13px] font-medium leading-relaxed mb-8">
              Our admissions team is here to guide you through every step of the process.
            </p>
            
            {/* Counsellor Profile */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-sm md:h-[72px] md:w-[72px]">
                <Image 
                  src="/images/admission/riju.png"
                  alt="Riju Bhattarai"
                  fill
                  sizes="(max-width: 768px) 64px, 72px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-[#1a1a1a] text-[14px]">Riju Bhattarai</h4>
                <span className="text-gray-400 text-[11px] font-medium tracking-wider">Admissions Counsellor</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Magnetic strength={0.1}>
                <a href="tel:+9779801305392" aria-label="Request a callback from Riju Bhattarai at 9801305392" className="w-full py-3.5 bg-[#21409A] text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:brightness-110 transition-all">
                  <span className="text-white/70">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <span className="flex flex-col items-center leading-tight">
                    <span>Request a Callback</span>
                    <span className="mt-1 text-[11px] font-semibold tracking-[0.08em] text-white/75">9801305392</span>
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.1}>
                <a href="mailto:admissions@iic.edu.np" className="w-full py-3.5 bg-white text-[#21409A] border border-gray-100 rounded-xl text-[13px] font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
                  <span className="text-[#21409A]/60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <span>Email Admissions</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default AdmissionsSidebar;
