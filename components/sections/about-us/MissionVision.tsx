'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MissionVision = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#F8FAFF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-14 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="mb-8 flex justify-center text-[#21409A]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15l-2 5 2 2 2-2-2-5z" />
                <path d="M15 7a3 3 0 0 1-6 0" />
                <circle cx="12" cy="7" r="4" />
                <path d="M12 11v4" />
              </svg>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#21409A] font-iic leading-tight tracking-tight mb-6">
              &ldquo;Developing impactful <br className="hidden md:block" /> industry ready graduates&rdquo;
            </h2>

            <p className="text-gray-400 font-bold tracking-[0.2em] text-xs md:text-sm uppercase font-iic">
              ITAHARI INTERNATIONAL COLLEGE
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-14 md:gap-32 max-w-6xl mx-auto">
          {/* Row 1: Mission */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center justify-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px", amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[55%] h-[300px] sm:h-[380px] md:h-auto md:aspect-[4/3] relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about/mission.png"
                alt="Students at Itahari International College"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) calc(100vw - 48px), 55vw"
              />
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-full md:w-[45%] bg-[#21409A] p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-[0_35px_60px_-15px_rgba(33,64,154,0.3)] relative flex flex-col items-start"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#21409A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-iic">Our Mission</h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium font-iic">
                To deliver direct UK university education locally, cultivating academic excellence,
critical thinking, and hands-on skills that prepare students to make an immediate
impact in industry.
              </p>
            </motion.div>
          </div>

          {/* Row 2: Vision */}
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-24 items-center justify-center">
            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px", amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[55%] h-[300px] sm:h-[380px] md:h-auto md:aspect-[4/3] relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about/vision.png"
                alt="Campus Life"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) calc(100vw - 48px), 55vw"
              />
            </motion.div>

            {/* Left Card */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-full md:w-[45%] bg-[#58595B] p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-[0_35px_60px_-15px_rgba(88,89,91,0.3)] relative flex flex-col items-start"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#58595B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                  <path d="M15 15l-6-6M9 15l6-6" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-iic">Our Vision</h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium font-iic">
               To be the leading higher education institution in Eastern Nepal, recognised globally for
producing innovative leaders and contributing to socio-economic progress through
quality education.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
