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
    description: "IIC follows the innovative L-T-W approach — Lecture, Tutorial, and Workshop — combining theoretical understanding with hands-on practice to build real-world skills and industry readiness.",
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
    description: "IIC provides valuable networking experiences through projects, guest lectures, and industry interactions, helping students connect with professionals and build strong career opportunities.",
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
    <section className="py-24 md:py-32 bg-[#F8FAFF]">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 md:mb-32"
        >
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] font-sora">
            Why choose IIC ?
          </h2>
        </motion.div>

        <div className="space-y-40 md:space-y-64">
          {features.map((feature, idx) => (
            <div key={idx} className={`relative flex flex-col items-center justify-center ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

              {/* Uniform Glassmorphic Card */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                className={`w-full lg:w-[60%] bg-white/10 rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.08)] border border-white/40 relative z-20 overflow-hidden ${idx % 2 === 0 ? 'lg:-mr-48' : 'lg:-ml-48'}`}
              >
                <div className={`flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content Section (Takes up most of the card) */}
                  <div className="flex-[1.5] p-10 md:p-16">
                    <div className="w-14 h-14 bg-white/40 rounded-xl flex items-center justify-center mb-8 shadow-inner border border-white/20">
                      {feature.icon}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-sora tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="text-[#2D2D2D] text-base md:text-lg leading-relaxed mb-10 font-sora font-medium">
                      {feature.description}
                    </p>

                    <ul className="space-y-5">
                      {feature.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-4 text-sm md:text-base font-bold text-[#21409A] font-sora">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Empty Space for Overlap Visibility (Ensures text doesn't touch the image) */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </motion.div>

              {/* Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full lg:w-[65%] h-[400px] md:h-[650px] relative rounded-[3rem] overflow-hidden shadow-xl mt-8 lg:mt-0"
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseIIC;
