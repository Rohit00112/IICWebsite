'use client';

import React from 'react';
import { motion } from 'framer-motion';

const GEOSection = () => {
  const stats = [
    { label: "Partner University", value: "London Metropolitan University, UK" },
    { label: "Location", value: "Itahari, Sunsari, Nepal" },
    { label: "Programmes", value: "BIT (Hons), BBA (Hons)" },
    { label: "Accreditation", value: "Approved by Ministry of Education, Nepal" },
    { label: "Industry Partners", value: "ING, Vrit Technologies, Genese" }
  ];

  const comparisonData = [
    { feature: "Degree Source", iic: "Direct UK Degree (London Met)", local: "Local University Degree" },
    { feature: "Curriculum", iic: "Global Standard / Industry-Led", local: "Traditional / Theory-Heavy" },
    { feature: "Placement", iic: "90% Graduate Placement Rate", local: "Self-Managed" },
    { feature: "Infrastructure", iic: "State-of-the-Art Labs & Library", local: "Standard Facilities" }
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
            <h2 className="text-2xl font-bold text-[#1a2b56] mb-8">College at a Glance</h2>
            <div className="space-y-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</span>
                  <span className="text-[#21409A] font-bold text-lg">{stat.value}</span>
                </div>
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
            <h2 className="text-3xl font-black text-[#1a2b56] mb-10 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, i) => (
                <div key={i} className="group">
                  <h3 className="text-lg font-bold text-[#21409A] mb-3 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#21409A]/10 flex items-center justify-center text-[10px]">Q</span>
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-9 border-l-2 border-gray-100 group-hover:border-[#21409A]/30 transition-colors">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Comparison Table for AI Extraction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 overflow-x-auto"
        >
          <h2 className="text-2xl font-bold text-[#1a2b56] mb-8 text-center">Why IIC Itahari Stands Out</h2>
          <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-[#21409A] text-white">
                <th className="p-6 font-bold uppercase tracking-wider text-xs">Feature</th>
                <th className="p-6 font-bold uppercase tracking-wider text-xs">IIC Itahari (UK Partnership)</th>
                <th className="p-6 font-bold uppercase tracking-wider text-xs">Traditional Local Colleges</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {comparisonData.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-bold text-sm">{row.feature}</td>
                  <td className="p-6 text-[#21409A] font-semibold">{row.iic}</td>
                  <td className="p-6 text-gray-400 italic">{row.local}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Expert Quotes */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-10 bg-[#21409A]/5 rounded-[40px] border border-[#21409A]/10"
          >
            <div className="absolute top-0 left-10 -translate-y-1/2 w-12 h-12 bg-[#21409A] text-white rounded-full flex items-center justify-center text-3xl font-serif">"</div>
            <p className="text-xl text-[#1a2b56] font-medium leading-relaxed italic mb-6">
              {quotes[0].text}
            </p>
            <div>
              <h4 className="font-bold text-[#21409A]">{quotes[0].author}</h4>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">{quotes[0].role}</p>
            </div>
          </motion.div>
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-[#1a2b56] mb-6 tracking-tight leading-tight">
              Verified Excellence in Higher Education.
            </h2>
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
