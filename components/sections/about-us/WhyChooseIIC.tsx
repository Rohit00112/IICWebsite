'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Career Success Pathway",
    description: "Unlock opportunities beyond graduation with dedicated career support, industry connections, and professional development programmes designed to prepare students for successful employment in competitive global industries.",
    points: ["Career Counselling Support", "Industry Networking Events", "Skill Development Programmes"],
    image: "/images/about/whychoseiic1.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21409A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  },
  {
    title: "Practical Learning Experience",
    description: "Itahari International College follows the innovative L-T-W approach — Lecture, Tutorial, and Workshop — combining theoretical understanding with hands-on practice to build real-world skills and industry readiness.",
    points: ["Interactive Lecture Sessions", "Collaborative Tutorials and Activities", "Hands-On Workshops and Projects"],
    image: "/images/about/whychooseiic2.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21409A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  },
  {
    title: "Professional Networking Opportunities",
    description: "Itahari International College provides valuable networking experiences through projects, guest lectures, and industry interactions, helping students connect with professionals and build strong career opportunities.",
    points: ["Industry Expert Interactions", "Insightful Guest Lecture Sessions", "Career-Focused Project Collaborations"],
    image: "/images/about/whychoseiic1.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21409A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "World-Class Infrastructure",
    description: "Experience learning in a modern environment designed for innovation. Our campus features cutting-edge labs, creative spaces, and recreational zones that foster holistic development.",
    points: ["High-tech Computer Labs", "Creative Innovation Zones", "Modern Student Lounge"],
    image: "/images/about/whychooseiic2.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21409A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  }
];

const WhyChooseIIC = () => {
  return (
    <section className="py-14 md:py-24 bg-[#F8FAFF]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] font-bold text-[#21409A] mb-3 md:mb-4 font-iic">
            What Sets Us Apart?
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] font-iic leading-tight">
            Why choose Itahari International College?
          </h2>
        </motion.div>

        <div className="space-y-12 md:space-y-20">
          {features.map((feature, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`relative flex flex-col items-stretch lg:items-stretch justify-center gap-0 lg:gap-0 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className={`w-full lg:w-[58%] h-[260px] sm:h-[340px] md:h-[520px] lg:h-auto relative rounded-t-2xl md:rounded-t-[2rem] lg:rounded-t-none ${reverse ? 'lg:rounded-r-[2.5rem] lg:rounded-l-none' : 'lg:rounded-l-[2.5rem] lg:rounded-r-none'} overflow-hidden shadow-xl`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </motion.div>

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`w-full lg:w-[48%] bg-white rounded-b-2xl md:rounded-b-[2rem] lg:rounded-b-none ${reverse ? 'lg:rounded-l-[2.5rem] lg:rounded-r-none lg:-mr-12 xl:-mr-20' : 'lg:rounded-r-[2.5rem] lg:rounded-l-none lg:-ml-12 xl:-ml-20'} shadow-[0_30px_70px_rgba(33,64,154,0.08)] border border-[#E5EAF5] relative z-20 p-6 sm:p-8 md:p-10 lg:p-12`}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#EEF2FB] rounded-xl flex items-center justify-center mb-5 md:mb-7">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4 md:mb-5 font-iic tracking-tight leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-[#4A5568] text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 font-iic">
                    {feature.description}
                  </p>

                  <ul className="space-y-3 md:space-y-4 border-t border-[#E5EAF5] pt-5 md:pt-6">
                    {feature.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-center gap-3 text-sm md:text-base font-semibold text-[#21409A] font-iic"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#21409A]/10 flex items-center justify-center shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseIIC;
