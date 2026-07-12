'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import JsonLd from '@/components/common/JsonLd';
import { absoluteUrl, buildFaqPageNode, withContext } from '@/lib/seo-schema';

const GEOSection = () => {
  const stats = [
    { label: "Partner University", value: "London Metropolitan University, UK" },
    { label: "Location", value: "Sundarharaincha-4, Dulari, Morang" },
    { label: "Programmes", value: "BSc (Hons) Computing, BA (Hons) Business Administration" },
    { label: "Accreditation", value: "Approved by Ministry of Education, Nepal and Equivalence by Tribhuvan University" },
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
    }
  ];

  const faqs = [
    {
      q: "Is the degree recognised in Nepal?",
      plain: "IIC offers degrees in IT and Business in direct partnership with London Metropolitan University. The Ministry of Education of Nepal recognises the degrees offered by LMU. Additionally, Tribhuvan University provides equivalency certificates for all LMU degrees.",
      a: (
        <p>
          IIC offers degrees in IT and Business in direct partnership with <strong className="text-[#21409A]">London Metropolitan University</strong>. The Ministry of Education of Nepal recognises the degrees offered by LMU. Additionally, Tribhuvan University provides <strong className="text-[#21409A]">equivalency certificates</strong> for all LMU degrees.
        </p>
      )
    },
    {
      q: "The main problem in Nepal is unemployment. How does IIC address this situation?",
      plain: "Unlike the traditional education system, IIC follows the London Metropolitan University curriculum with an LTW-based, practice-oriented teaching approach. Students gain internship opportunities from the first year, while ING and IIC's partnerships (MoUs) with 150+ companies provide strong pathways to industry and employment.",
      a: (
        <p>
          Unlike the traditional education system, IIC follows the London Metropolitan University curriculum with an <strong className="text-[#21409A]">LTW-based, practice-oriented</strong> teaching approach. Students gain internship opportunities from the first year, while ING and IIC&apos;s partnerships (MoUs) with <strong className="text-[#21409A]">150+ companies</strong> provide strong pathways to industry and employment.
        </p>
      )
    },
    {
      q: "Are there student support services at the college?",
      plain: "IIC has a dedicated Student Services Department (SSD) that supports students throughout their academic journey while serving as the primary point of contact for parents. Additionally, each student is assigned a Personal Academic Tutor (PAT) to provide individual academic guidance and pastoral support.",
      a: (
        <p>
          IIC has a dedicated <strong className="text-[#21409A]">Student Services Department (SSD)</strong> that supports students throughout their academic journey while serving as the primary point of contact for parents. Additionally, each student is assigned a <strong className="text-[#21409A]">Personal Academic Tutor (PAT)</strong> to provide individual academic guidance and pastoral support.
        </p>
      )
    }
  ];

  return (
    <section className="overflow-hidden bg-gray-50 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Quick Stats for AI Engines */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[22px] border border-gray-100 bg-white p-5 shadow-sm sm:rounded-[24px] sm:p-8 md:rounded-[32px] md:p-12"
          >
            <AnimeReveal
              as="h3"
              text="College at a Glance"
              className="text-xl sm:text-2xl font-bold text-[#21409A] mb-6 md:mb-8"
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
                  className="geo-stat grid grid-cols-1 gap-3 py-4 sm:py-5 border-b border-gray-50 last:border-0 items-start text-left"
                >
                  <span className="text-[#74C044] font-semibold text-[9px] md:text-[10px] tracking-[0.15em] pt-1 uppercase">{stat.label}</span>
                  <span className="text-[#1f2937] font-bold text-sm md:text-base leading-[1.35]">{stat.value}</span>
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
              as="h3"
              text="Frequently Asked Questions"
              className="mb-6 text-2xl font-black tracking-tight text-[#1a1a2e] sm:text-3xl md:mb-10"
              staggerFrom="first"
            />
            <div className="space-y-6 md:space-y-10">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="geo-faq group"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1a1a2e] mb-3 md:mb-4 flex items-start gap-3 sm:gap-4">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] mt-1 shrink-0 font-bold">Q</span>
                    <span className="leading-tight">{faq.q}</span>
                  </h3>
                  <div className="text-gray-600 leading-relaxed pl-9 sm:pl-10 border-l-2 border-gray-100 group-hover:border-[#74C044]/40 transition-colors text-xs md:text-sm">
                    {faq.a}
                  </div>
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
          className="mt-10 md:mt-16"
        >
          <AnimeReveal
            as="h2"
            text="Why Itahari International College Stands Out"
            className="mb-8 text-center text-2xl font-black tracking-tight text-[#21409A] sm:text-3xl md:mb-16 md:text-4xl justify-center"
            staggerFrom="center"
          />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
                className="group relative flex cursor-default flex-col items-center overflow-hidden rounded-[22px] border border-gray-100 bg-white p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-700 hover:border-[#74C044]/40 hover:shadow-[0_40px_80px_-15px_rgba(116,192,68,0.15)] sm:rounded-[24px] sm:p-8 md:rounded-[40px] lg:p-10"
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

                <div className="mb-6 md:mb-8 w-16 h-16 md:w-20 md:h-20 rounded-[22px] md:rounded-[28px] bg-[#21409A]/5 flex items-center justify-center text-[#21409A] group-hover:bg-[#21409A] group-hover:text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-sm relative z-10">
                  {row.icon}
                </div>
                <div className="space-y-4 relative z-10">
                  <span className="text-[#3F7F1F] font-extrabold text-[10px] sm:text-xs tracking-[0.12em] md:tracking-[0.18em] block">
                    {row.feature}
                  </span>
                  <h3 className="text-[#1f2937] font-bold text-base md:text-lg leading-tight tracking-tight">
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
        <div className="mt-10 grid grid-cols-1 items-center gap-7 md:mt-16 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-6 sm:p-8 md:p-10 bg-white rounded-[24px] md:rounded-[40px] border border-gray-100 shadow-sm"
          >
            <div className="absolute top-0 left-10 -translate-y-1/2 w-12 h-12 bg-[#74C044] text-white rounded-full flex items-center justify-center text-3xl font-serif shadow-md">&ldquo;</div>
            <p className="text-base sm:text-lg md:text-xl text-[#374151] font-medium leading-relaxed italic mb-6">
              &ldquo;{quotes[0].text}&rdquo;
            </p>
           
          </motion.div>

          <div className="text-center md:text-left">
            <AnimeReveal
              as="h3"
              text="Verified Excellence in Higher Education."
              className="text-2xl sm:text-3xl font-black text-[#21409A] mb-4 md:mb-6 tracking-tight leading-tight"
              staggerFrom="first"
            />
            <p className="text-gray-500 font-medium mb-8">
              We provide direct UK degrees with full accreditation and equivalence, ensuring your future is globally recognised.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Schema for GEO */}
      {(() => {
        const faqSchema = buildFaqPageNode(
          faqs.map((faq) => ({ question: faq.q, answer: faq.plain })),
          `${absoluteUrl('/')}#home-faq`
        );

        return faqSchema ? <JsonLd data={withContext(faqSchema)} /> : null;
      })()}
    </section>
  );
};

export default GEOSection;
