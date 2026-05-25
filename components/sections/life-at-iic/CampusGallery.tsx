'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
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

const Slide = ({ section, index, scrollYProgress }: { section: typeof sections[0], index: number, scrollYProgress: MotionValue<number> }) => {
  // Slide 0 is always at y=0.
  // Slide 1 comes in from 100% to 0% between progress 0.2 and 0.5.
  // Slide 2 comes in from 100% to 0% between progress 0.6 and 0.9.

  // Slide 0: Visible alone from 0% to 25%
  // Slide 1: Slides in from 25% to 50%, then stays alone until 75%
  // Slide 2: Slides in from 75% to 100%
  const start = index === 0 ? 0 : index === 1 ? 0.25 : 0.75;
  const end = index === 0 ? 0.25 : index === 1 ? 0.50 : 0.95;

  // Slide 0 stays fixed at y: 0. Slides 1 and 2 slide over it.
  const rawY = useTransform(scrollYProgress, [start, end], ['100%', '0%'], { clamp: true });
  const y = useSpring(rawY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(scrollYProgress, [start - 0.1, end + 0.1], [1.2, 1], { clamp: true });
  const style = index > 0 ? { y } : { y: 0 };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full flex flex-col md:flex-row overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-[#1a1a1a]"
      initial={index > 0 ? { y: '100%' } : { y: '0%' }}
      style={{ height: '100vh', zIndex: index * 10 + 10, ...style }}
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
        <motion.div style={{ scale }} className="w-full h-full">
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
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
    <section 
      id="campus-gallery"
      ref={containerRef} 
      className="relative w-full h-[300vh] bg-[#1a1a1a]"
      style={{ isolation: 'isolate' }}
    >
      {/* Sticky container — forced to top-0 with high priority and explicit relative parent context */}
      <div 
        className="sticky top-0 left-0 w-full overflow-hidden z-10"
        style={{ 
          height: '100vh', 
          position: 'sticky', 
          top: 0,
          zIndex: 50 
        }}
      >
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
