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

  const faqs = [
    {
      q: "Is Itahari International College affiliated with a UK University?",
      a: "Yes, Itahari International College (IIC) offers direct degrees from London Metropolitan University, UK. Students receive the same degree as those studying in London."
    },
    {
      q: "What courses are offered at IIC Itahari?",
      a: "IIC offers BSc (Hons) Computing (BIT) and BA (Hons) Business Administration (BBA) with specializations in Digital Business, International Business, and Marketing."
    },
    {
      q: "Are IIC degrees recognized in Nepal?",
      a: "Yes, all degrees offered at Itahari International College are fully recognized by the Ministry of Education, Nepal, and have equivalence from Tribhuvan University (TU)."
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
      </div>

      {/* FAQ Schema for GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "dateModified": new Date().toISOString(),
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default GEOSection;
