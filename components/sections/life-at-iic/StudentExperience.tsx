'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const experiences = [
  {
    id: "01",
    title: "Clubs & Societies",
    description: "Join over 20+ active student clubs ranging from robotics and coding to music and literature. Find your tribe and pursue your passions outside the curriculum.",
    image: "/images/home/ivlab2.png"
  },
  {
    id: "02",
    title: "Events & Fests",
    description: "Experience the vibrant cultural life at IIC through annual tech fests, cultural nights, hackathons, and sports tournaments that bring the entire campus together.",
    image: "/images/home/ivlab3.png"
  },
  {
    id: "03",
    title: "Sports & Athletics",
    description: "Stay active with our dedicated sports facilities. Whether you're a casual player or a competitive athlete, there's a place for you on our teams.",
    image: "/images/home/ivlab4.png"
  }
];

const StudentExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-[#1a1a1a] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#74C044] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 block font-sora">
            Student Life
          </span>
          <h2 className="text-4xl md:text-6xl font-black leading-tight font-sora">
            Vibrant & Diverse <br className="hidden md:block"/>
            <span className="text-[#21409A]">Community</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* Accordion / List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className="group cursor-pointer relative"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className={`w-full h-[2px] mb-6 transition-colors duration-500 ${activeIndex === index ? 'bg-[#74C044]' : 'bg-white/10 group-hover:bg-white/30'}`} />
                <div className="flex gap-6 md:gap-10 items-start">
                  <span className={`text-2xl md:text-4xl font-light font-sora transition-colors duration-500 ${activeIndex === index ? 'text-[#74C044]' : 'text-white/30 group-hover:text-white/50'}`}>
                    {exp.id}
                  </span>
                  <div>
                    <h3 className={`text-3xl md:text-5xl font-bold font-sora mb-4 transition-all duration-500 ${activeIndex === index ? 'text-white translate-x-4' : 'text-white/50 group-hover:text-white/70'}`}>
                      {exp.title}
                    </h3>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/70 text-lg translate-x-4 max-w-md pb-4">
                            {exp.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Display */}
          <div className="w-full lg:w-1/2 relative aspect-[4/5] md:aspect-[3/4] lg:aspect-square rounded-[40px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={experiences[activeIndex].image}
                  alt={experiences[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentExperience;
