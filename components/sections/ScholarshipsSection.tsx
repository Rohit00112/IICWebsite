'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ScholarshipsSection = () => {
  return (
    <section className="relative w-full py-20 md:py-32 bg-[#f3f6fb] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">

          {/* Left Content */}
          <div className="w-full lg:w-[35%] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-[76px] font-bold text-[#1a1a1a] mb-8 leading-[1.1] tracking-tight">
                AAA <br />
                Scholarships
              </h2>
              <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
                We believe financial barriers shouldn't hold back brilliance.
                Explore our range of financial support options.
              </p>
            </motion.div>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-[65%] flex flex-col md:flex-row gap-8">
            {/* Card 1: Academic Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 bg-white p-10 rounded-[32px] shadow-xl shadow-[#21409A]/5 border border-white flex flex-col"
            >
              <span className="text-[14px] font-bold text-[#1a1a1a] mb-6 uppercase tracking-wider block">
                Academic <br /> Excellence
              </span>
              <h3 className="text-[28px] font-black text-[#21409A] mb-4 leading-tight">
                Up to 100% <br /> Tuition
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                Awarded to top performers in their previous academic qualifications.
              </p>
              <button className="mt-auto w-full py-4 bg-[#1a1a1a] text-white rounded-xl font-bold text-[14px] hover:bg-[#21409A] transition-colors flex items-center justify-center gap-2">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>

            {/* Card 2: Need Guidance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 bg-white/50 backdrop-blur-sm p-10 rounded-[32px] border border-white/60 flex flex-col"
            >
              <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-6">
                Need Guidance?
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">
                Not sure which program is right for you? Our admissions team is here to help
                you navigate your options.
              </p>
              <button className="mt-auto w-full py-4 border-2 border-[#1a1a1a]/10 bg-white/80 text-[#1a1a1a] rounded-xl font-bold text-[14px] hover:border-[#21409A] hover:text-[#21409A] transition-all">
                Contact Admissions
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
