'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const sections = [
  {
    id: 1,
    image: '/images/home/iic-lifestyle 3.png',
    title: 'The Knowledge Hub',
    text: "Our state-of-the-art library offers a serene environment for deep work and collaborative study. Equipped with extensive digital archives, quiet reading zones, and dedicated group study pods, it's designed to support your academic journey.",
    bgColor: '#0A2520', // Dark green matching the image
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    reverse: false
  },
  {
    id: 2,
    image: '/images/home/iic-lifestyle 2.png',
    title: 'Advanced Technology Labs',
    text: "Experience hands-on learning in our dedicated computing and IT laboratories. Outfitted with the latest hardware and enterprise software, these spaces allow you to innovate, code, and build the technologies of tomorrow.",
    bgColor: '#0B1120', // Dark blue matching the image
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    reverse: true
  },
  {
    id: 3,
    image: '/images/lifestyle/lifestyle.png', // Using available image for students
    title: 'Recreation & Wellness',
    text: "Balance is key to success. Our campus features modern recreational facilities, including a multi-purpose sports hall, fitness center, and vibrant student lounges, ensuring you stay active and refreshed.",
    bgColor: '#2E401B', // Olive green matching the image
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    reverse: false
  }
];

const Slide = ({ section, index, scrollYProgress }: { section: typeof sections[0], index: number, scrollYProgress: any }) => {
  // Slide 0 is always at y=0.
  // Slide 1 comes in from 100% to 0% between progress 0.2 and 0.5.
  // Slide 2 comes in from 100% to 0% between progress 0.6 and 0.9.

  const start = index === 1 ? 0.15 : 0.55;
  const end = index === 1 ? 0.45 : 0.85;

  const y = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

  // Apply transform only if index > 0
  const style = index > 0 ? { y } : {};

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"
      initial={index > 0 ? { y: "100%" } : { y: "0%" }}
      style={{ zIndex: index * 10, ...style }}
    >
      {/* Content Block */}
      <div
        className={`w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-10 md:px-24 lg:px-32 text-white ${section.reverse ? 'md:order-1' : 'md:order-2'}`}
        style={{ backgroundColor: section.bgColor }}
      >
        <div>
          {section.icon}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sora">
            {section.title}
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md font-sora">
            {section.text}
          </p>
        </div>
      </div>

      {/* Image Block */}
      <div className={`w-full md:w-1/2 h-1/2 md:h-full relative ${section.reverse ? 'md:order-2' : 'md:order-1'}`}>
        <Image
          src={section.image}
          alt={section.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </motion.div>
  );
};

const CampusGallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#1a1a1a]">
      {/* Sticky container that stays in view */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {sections.map((section, index) => (
          <Slide
            key={section.id}
            section={section}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default CampusGallery;
