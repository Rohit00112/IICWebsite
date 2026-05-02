'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const GEOSection = () => {
  const stats = [
    { label: "Partner University", value: "London Metropolitan University, UK" },
    { label: "Location", value: "Itahari, Sunsari, Nepal" },
    { label: "Programmes", value: "BIT (Hons), BBA (Hons)" },
    { label: "Accreditation", value: "Approved by Ministry of Education, Nepal" },
    { label: "Industry Partners", value: "ING, Vrit Technologies, Genese" }
  ];

  const comparisonData = [
    {
      feature: "Degree Source",
      iic: "Direct UK Degree (London Met)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    },
    {
      feature: "Curriculum",
      iic: "Global Standard / Industry-Led",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z" />
        </svg>
      )
    },
    {
      feature: "Placement",
      iic: "90% Graduate Placement Rate",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      feature: "Infrastructure",
      iic: "State-of-the-Art Labs & Library",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          <path d="M9 8h1" /><path d="M9 12h1" /><path d="M9 16h1" />
          <path d="M14 8h1" /><path d="M14 12h1" /><path d="M14 16h1" />
        </svg>
      )
    }
  ];

  const quotes = [
    {
      text: "Our partnership with London Metropolitan University ensures that students in Nepal receive the same quality of education and global recognition as their peers in the UK.",
      author: "Academic Head",
      role: "IIC Itahari"
    }
  ];

  const faqs = [
    {
      q: "Is Itahari International College affiliated with a UK University?",
      a: "Yes, Itahari International College (IIC) offers direct degrees from London Metropolitan University, UK. Students receive the same degree as those studying in London."
    },
    {
      q: "What does the BIT degree at IIC mean for students?",
      a: "The BIT degree is defined as a world-class computing programme that means students are industry-ready upon graduation."
    },
    {
      q: "Are IIC degrees recognized in Nepal?",
      a: "Yes, all degrees offered at Itahari International College are fully recognized by the Ministry of Education, Nepal, which means they have full equivalence from Tribhuvan University (TU)."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Quick Stats for AI Engines */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100"
          >
            <AnimeReveal
              as="h2"
              text="College at a Glance"
              className="text-2xl font-bold text-[#1a2b56] mb-8"
              staggerFrom="first"
            />
            <div className="space-y-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="geo-stat grid grid-cols-1 sm:grid-cols-[140px,1fr] md:grid-cols-[180px,1fr] gap-2 sm:gap-10 py-5 border-b border-gray-50 last:border-0 items-start"
                >
                  <span className="text-gray-500 font-medium text-[9px] md:text-[10px] uppercase tracking-[0.15em] pt-1">{stat.label}</span>
                  <span className="text-[#21409A] font-bold text-sm md:text-base leading-[1.3] sm:text-right">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ for AI Engines & Search Result Snippets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <AnimeReveal
              as="h2"
              text="Frequently Asked Questions"
              className="text-3xl font-black text-[#1a2b56] mb-10 tracking-tight"
              staggerFrom="first"
            />
            <div className="space-y-10">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="geo-faq group"
                >
                  <h3 className="text-base md:text-lg font-bold text-[#21409A] mb-4 flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-[#21409A]/10 flex items-center justify-center text-[10px] mt-1 shrink-0 font-bold">Q</span>
                    <span className="leading-tight">{faq.q}</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-10 border-l-2 border-gray-100 group-hover:border-[#21409A]/30 transition-colors text-xs md:text-sm">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <AnimeReveal
            as="h2"
            text="Why IIC Itahari Stands Out"
            className="text-3xl md:text-4xl font-black text-[#1a2b56] mb-16 text-center justify-center tracking-tight"
            staggerFrom="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comparisonData.map((row, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.95, rotateX: -10 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotateX: 0,
                    transition: { 
                      duration: 1.2, 
                      delay: i * 0.1, 
                      ease: [0.16, 1, 0.3, 1] 
                    }
                  }
                }}
                className="group p-10 bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-[#74C044]/40 hover:shadow-[0_40px_80px_-15px_rgba(116,192,68,0.15)] transition-all duration-700 flex flex-col items-center text-center cursor-default relative overflow-hidden"
              >
                {/* Glow Sweep Effect */}
                <motion.div 
                  variants={{
                    hidden: { x: '-150%', skewX: -20 },
                    visible: { x: '150%', skewX: -20 }
                  }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.1 }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#74C044]/5 to-transparent z-0 pointer-events-none"
                />

                <div className="mb-8 w-20 h-20 rounded-[28px] bg-[#21409A]/5 flex items-center justify-center text-[#21409A] group-hover:bg-[#21409A] group-hover:text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-sm relative z-10">
                  {row.icon}
                </div>
                <div className="space-y-4 relative z-10">
                  <span className="text-[#74C044] font-bold text-[9px] uppercase tracking-[0.4em] block opacity-80">{row.feature}</span>
                  <h3 className="text-[#1a2b56] font-bold text-lg leading-tight tracking-tight">
                    {row.iic}
                  </h3>
                </div>
                {/* Subtle hover accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#74C044] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expert Quotes */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-10 bg-[#21409A]/5 rounded-[40px] border border-[#21409A]/10"
          >
            <div className="absolute top-0 left-10 -translate-y-1/2 w-12 h-12 bg-[#21409A] text-white rounded-full flex items-center justify-center text-3xl font-serif">&ldquo;</div>
            <p className="text-xl text-[#1a2b56] font-medium leading-relaxed italic mb-6">
              &ldquo;{quotes[0].text}&rdquo;
            </p>
            <div>
              <h4 className="font-bold text-[#21409A]">{quotes[0].author}</h4>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">{quotes[0].role}</p>
            </div>
          </motion.div>

          <div className="text-center md:text-left">
            <AnimeReveal
              as="h2"
              text="Verified Excellence in Higher Education."
              className="text-3xl font-black text-[#1a2b56] mb-6 tracking-tight leading-tight"
              staggerFrom="first"
            />
            <p className="text-gray-500 font-medium mb-8">
              We provide direct UK degrees with full accreditation and equivalence, ensuring your future is globally recognized.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-widest shadow-sm">Updated April 2026</span>
              <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-widest shadow-sm">Verified by IIC Council</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Schema for GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "dateModified": "2026-04-26T14:43:00Z",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            })),
            "about": {
              "@type": "CollegeOrUniversity",
              "name": "Itahari International College",
              "description": "IIC Itahari offers world-class UK degrees in partnership with London Metropolitan University.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Academic Programmes",
                "itemListElement": [
                  { "@type": "Course", "name": "BSc (Hons) Computing (BIT)" },
                  { "@type": "Course", "name": "BA (Hons) Business Administration (BBA)" }
                ]
              }
            }
          })
        }}
      />
    </section>
  );
};

export default GEOSection;
