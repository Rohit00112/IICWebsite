'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import Tilt from '../../effects/Tilt';
import RevealText from '../../effects/RevealText';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Sweta Basnet",
    degree: "BSc (Hons) Computing",
    quote: "Starting my journey at Itahari International College has been an exciting experience. The practical learning and supportive lecturers have made me even more passionate about technology, and I'm looking forward to what's ahead.",
    image: "/images/home/sweta.JPG",
    objectPosition: "50% 20%",
    featured: true
  },
  {
    name: "Jen Thapa",
    degree: "BSc (Hons) Computing",
    quote: "At Itahari International College, learning feels practical, engaging and meaningful. The encouragement from my lecturers has strengthened my passion for technology. I'm proud to be building my future here.",
    image: "/images/home/jen.JPG",
    objectPosition: "50% 20%",
    featured: false
  },
  {
    name: "Kritika Karki",
    degree: "BA (Hons) Business Administration",
    quote: "Studying BA (Hons) Business Administration at Itahari International College has broadened my perspective on business and leadership. The engaging learning environment encourages me to think critically and grow with confidence.",
    image: "/images/home/kritika.JPG",
    objectPosition: "50% 20%",
    featured: false
  }
];

const avatarImageStyle = {
  objectPosition: '50% 0%',
  transform: 'scale(1.55)',
  transformOrigin: '50% 25%',
} satisfies React.CSSProperties;

type StoryCardProps = {
  item: typeof testimonials[number];
  index: number;
};

const StoryCard: React.FC<StoryCardProps> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  // Use direct hovered state for visibility logic
  const imageShown = hovered;
  const defaultShown = !hovered;

  const handleEnter = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.12,
        duration: 1,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      className="story-card h-[480px] w-[min(300px,84vw)] flex-none snap-center sm:h-[540px] sm:w-[min(320px,86vw)] md:h-[560px] md:w-full md:flex-auto"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Tilt strength={4} className="h-full">
        <div
          className="relative h-full overflow-hidden rounded-[22px] border border-gray-100 bg-white p-5 text-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 sm:rounded-[24px] sm:p-8 md:rounded-[32px] md:p-12"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Image layer - clip-path bloom from corner reveals image over card */}
          <motion.div
            initial={false}
            animate={{
              clipPath: imageShown
                ? `circle(160% at ${index % 2 === 0 ? '100% 100%' : '0% 100%'})`
                : `circle(0% at ${index % 2 === 0 ? '100% 100%' : '0% 100%'})`,
            }}
            transition={{
              duration: 0.75,
              ease: imageShown ? [0.22, 1, 0.36, 1] : [0.7, 0, 0.84, 0],
            }}
            className="absolute inset-0 z-20 overflow-hidden rounded-[24px] md:rounded-[32px]"
            style={{ willChange: 'clip-path' }}
          >
            <Image
              src={item.image}
              alt={`${item.name} - Itahari International College student`}
              fill
              sizes="(max-width: 768px) 86vw, 33vw"
              className="object-cover"
              style={{ objectPosition: item.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>

          {/* Reveal overlay (name and degree) sits with image */}

          {/* Original card content — base layer, fully idle only */}
          <motion.div
            initial={false}
            animate={{ opacity: defaultShown ? 1 : 0 }}
            transition={{
              duration: 0.4,
              delay: defaultShown ? 0.45 : 0,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative z-10 flex h-full flex-col"
          >
            {/* Quote Icon */}
            <div className="mb-4 shrink-0 font-serif text-4xl font-bold leading-none text-blue-200 sm:mb-6 sm:text-5xl md:text-6xl">
              &ldquo;
            </div>

            {/* Quote Text */}
            <RevealText
              text={item.quote}
              className="mb-5 min-h-[168px] content-start text-[13px] font-medium italic leading-relaxed text-gray-700 sm:mb-8 sm:min-h-[180px] sm:text-base md:min-h-[196px] md:text-lg"
              delay={0.4}
            />

            {/* Profile Section */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm md:h-20 md:w-20">
                <Image
                  src={item.image}
                  alt={`${item.name} - Successful Itahari International College Student Testimonial`}
                  fill
                  sizes="(max-width: 768px) 64px, 80px"
                  className="object-cover"
                  style={avatarImageStyle}
                />
              </div>
              <div>
                <h4 className="font-iic text-base font-bold text-[#1a1a1a] md:text-lg">
                  {item.name}
                </h4>
                <p className="text-xs font-medium text-gray-400 md:text-sm">
                  {item.degree}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reveal overlay - name and degree pinned to bottom over image */}
          <AnimatePresence>
            {imageShown && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 z-40 p-6 md:p-8 text-white"
              >
                <h4 className="text-xl md:text-2xl font-bold font-iic">{item.name}</h4>
                <p className="text-xs md:text-sm font-medium text-white/70">{item.degree}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tilt>
    </motion.div>
  );
};

const StudentStories = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white pt-16 pb-8 md:pt-24 md:pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-9 flex flex-col items-center text-center md:mb-16">
          <span className="text-[#74C044] text-xs sm:text-sm md:text-base font-bold tracking-[0.12em] sm:tracking-[0.14em] mb-4 font-iic">
            Insights
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-2 font-iic">
            Success Stories From<span className="sr-only"> Students</span>
          </h2>
          <AnimeReveal
            as="div"
            text="Students"
            className="mb-5 text-[40px] font-black leading-[0.9] tracking-tight text-[#74C044] sm:text-6xl md:mb-10 md:text-8xl md:leading-[0.8] font-iic justify-center"
            staggerFrom="center"
            delay={0.1}
          />
          <p className="max-w-2xl text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            Hear directly from our students about how the Itahari International College environment shaped their academic and social lives.
          </p>
        </div>

        {/* Horizontal Scrollable Row */}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-5 pt-3 scroll-smooth sm:gap-6 sm:px-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:snap-none lg:gap-8">
          {testimonials.map((item, index) => (
            <StoryCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default StudentStories;
