'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const experiences = [
  {
    id: "01",
    title: "Tech",
    description: "Where ideas become reality. This community is focused on developing real products through collaboration, problem-solving, and hands-on coding. Members work together to design, build, and refine software — turning concepts into functioning solutions that solve real problems.",
    image: "/images/lifestyle/tech.JPG"
  },
  {
    id: "02",
    title: "Research",
    description: "Where curiosity meets impact. This community is driven by the pursuit of knowledge — exploring new technologies, conducting in-depth research, and publishing work that contributes to both academia and industry. Members dig deeper, question everything, and add to the growing body of tech knowledge.",
    image: "/images/lifestyle/research.JPG"
  },
  {
    id: "03",
    title: "Entrepreneur",
    description: "Where technology meets the market. This community focuses on the business side of innovation — studying market trends, identifying gaps, and developing strategies to bring products to the right audience. Members think like founders, learning how to validate ideas and build something people actually want.",
    image: "/images/lifestyle/entrepreneur.JPG"
  },
  {
    id: "04",
    title: "Creator",
    description: "Where innovation meets creativity. This community lives at the intersection of technology and digital culture — building brands, creating content, and driving engagement through smart marketing and creative campaigns. Members use the innovation lab as their playground to experiment, create, and make noise in the digital world.",
    image: "/images/lifestyle/creator.png"
  }
];

const StudentExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#74C044] text-sm md:text-base font-bold tracking-[0.2em] mb-4 block font-iic">
            Student Life
          </span>
          <h2 className="text-4xl md:text-6xl font-black leading-tight font-iic">
            Vibrant & Diverse <br className="hidden md:block"/>
            <span className="text-[#21409A]">Community</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] gap-12 lg:gap-16 items-center">
          {/* Accordion / List */}
          <div className="w-full min-w-0 flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className="group cursor-pointer relative"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className={`w-full h-[2px] mb-6 transition-colors duration-500 ${activeIndex === index ? 'bg-[#74C044]' : 'bg-white/10 group-hover:bg-white/30'}`} />
                <div className="flex gap-6 md:gap-10 items-start">
                  <span className={`text-2xl md:text-4xl font-light font-iic transition-colors duration-500 ${activeIndex === index ? 'text-[#74C044]' : 'text-white/30 group-hover:text-white/50'}`}>
                    {exp.id}
                  </span>
                  <div className="min-w-0">
                    <h3 className={`text-3xl md:text-5xl font-bold font-iic mb-4 transition-all duration-500 ${activeIndex === index ? 'text-white translate-x-4' : 'text-white/50 group-hover:text-white/70'}`}>
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
                          <p className="text-white/70 text-lg leading-relaxed pl-4 max-w-2xl pb-4">
                            {exp.description}
                          </p>
                          <div className="relative ml-4 mt-5 aspect-[16/10] max-w-3xl overflow-hidden rounded-lg lg:hidden">
                            <Image
                              src={exp.image}
                              alt={exp.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) calc(100vw - 96px), 100vw"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Display */}
          <div className="hidden w-full lg:relative lg:block lg:aspect-square lg:overflow-hidden lg:rounded-[40px]">
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
