'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import Tilt from '../../effects/Tilt';
import RevealText from '../../effects/RevealText';
import WaveCurtain from '../../effects/WaveCurtain';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Jenks",
    degree: "BSc (Hons) Computing",
    quote: "The collaborative spaces and 24/7 access to the labs completely changed how I approached my final year project. It felt less like a school and more like a tech incubator.",
    tag: "Hackathon Winner | Taranga, ERC",
    image: "/images/profiles/sarah.png",
    video: "/videos/students/sarah.mp4",
    featured: true
  },
  {
    name: "David Chen",
    degree: "BBA (Hons)",
    quote: "Joining the Business Leaders Club gave me the network I needed. The campus isn't just about classrooms; it's where you meet your future co-founders.",
    tag: "President | Entrepreneurs Club",
    image: "/images/profiles/david.png",
    video: "/videos/students/david.mp4",
    featured: false
  },
  {
    name: "Emily Watson",
    degree: "BSc (Hons) AI",
    quote: "The mentorship programs at IIC connected me with industry leaders in Kathmandu's growing tech scene. I had my first internship offer before even graduating.",
    tag: "AI Research Lead",
    image: "/images/profiles/emily.png",
    video: "/videos/students/emily.mp4",
    featured: false
  }
];

type StoryCardProps = {
  item: typeof testimonials[number];
  index: number;
};

const CURTAIN_MS = 1300;
type Phase = 'idle' | 'opening' | 'open' | 'closing';

const StoryCard: React.FC<StoryCardProps> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Use direct hovered state for visibility logic
  const videoShown = hovered;
  const defaultShown = !hovered;

  const handleEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => { });
    }
  };

  const handleLeave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
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
      className="story-card flex-none w-[320px] md:w-[450px] snap-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Tilt strength={4}>
        <div
          className={`relative overflow-hidden p-8 md:p-12 rounded-[24px] md:rounded-[32px] transition-all duration-300 h-full ${item.featured
            ? 'bg-[#0a3285] text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
            : 'bg-white text-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100'
            }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Video layer — sits behind curtain, visible while curtain animating */}
          <motion.div
            initial={false}
            animate={{ opacity: videoShown ? 1 : 0 }}
            transition={{
              duration: 0.6,
              delay: hovered ? 0 : 0.6, // Keep video visible while curtain closes
              ease: "easeInOut"
            }}
            className="absolute inset-0 z-0 overflow-hidden rounded-[24px] md:rounded-[32px]"
          >
            <video
              ref={videoRef}
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>

          {/* Reveal overlay (name+tag) sits with video */}

          {/* Original card content — base layer, fully idle only */}
          <motion.div
            initial={false}
            animate={{ opacity: defaultShown ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            {/* Quote Icon */}
            <div className={`text-5xl md:text-6xl font-bold mb-6 leading-none ${item.featured ? 'text-white/40' : 'text-blue-200'} font-serif`}>
              &ldquo;
            </div>

            {/* Quote Text */}
            <RevealText
              text={item.quote}
              className={`text-base md:text-lg font-medium leading-relaxed italic mb-8 ${item.featured ? 'text-white/90' : 'text-gray-700'
                }`}
              delay={0.4}
            />

            {/* Achievement Tag */}
            <div className="mb-10">
              <span className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border ${item.featured
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-blue-50 border-blue-100 text-blue-600'
                }`}>
                {item.tag}
              </span>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src={item.image}
                  alt={`${item.name} - Successful IIC Student Testimonial`}
                  fill
                  sizes="(max-width: 768px) 56px, 64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className={`text-base md:text-lg font-bold font-sora ${item.featured ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  {item.name}
                </h4>
                <p className={`text-xs md:text-sm font-medium ${item.featured ? 'text-white/60' : 'text-gray-400'}`}>
                  {item.degree}
                </p>
              </div>
            </div>
          </motion.div>

          <WaveCurtain
            active={hovered}
            panelClassName={item.featured ? 'bg-[#0a3285]' : 'bg-white'}
            foldShadingDark={item.featured ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.06)'}
            foldShadingLight={item.featured ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}
          />

          {/* Reveal overlay — name + tag pinned to bottom over video */}
          <AnimatePresence>
            {videoShown && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 z-30 p-6 md:p-8 text-white"
              >
                <span className="inline-block px-3 py-1 rounded-full text-[11px] md:text-xs font-medium bg-white/15 border border-white/25 backdrop-blur-sm mb-3">
                  {item.tag}
                </span>
                <h4 className="text-xl md:text-2xl font-bold font-sora">{item.name}</h4>
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
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#007a5e] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 font-sora">
            Insights
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-2 font-sora">
            Success Stories From
          </h2>
          <AnimeReveal
            as="h2"
            text="IIC STUDENTS"
            className="text-5xl md:text-7xl font-black text-[#007a5e] leading-[0.8] tracking-tight mb-10 font-sora justify-center"
            staggerFrom="center"
            delay={0.1}
          />
          <p className="max-w-2xl text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            Hear Directly From Our Students About How The IIC Campus Environment Shaped Their Academic And Social Lives.
          </p>
        </div>

        {/* Horizontal Scrollable Row */}
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth">
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
