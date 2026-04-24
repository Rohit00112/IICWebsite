'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    title: "The Knowledge Hub",
    description: "Our central library is a quiet sanctuary for deep work and research. Spanning three floors, it houses an extensive physical collection alongside millions of digital academic journals accessible from anywhere on campus.",
    points: ["Quiet Study Pods", "Collaborative Group Rooms", "Extensive Digital Archive"],
    image: "/images/about/whychoseiic1.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21409A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
