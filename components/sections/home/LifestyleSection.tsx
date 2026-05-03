'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';

interface FlipCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  accent: string;
  rounded: string;
  parallaxY: ReturnType<typeof useTransform<number, string>>;
}

const FlipCard: React.FC<FlipCardProps> = ({ image, alt, title, description, stats, accent, rounded, parallaxY }) => {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div
      className="relative h-full w-full cursor-pointer"
      style={{ perspective: '1500px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 ${rounded} overflow-hidden shadow-2xl`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-3">
            <span className="text-white text-lg md:text-2xl font-bold font-sora">{title}</span>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 ${rounded} overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-10`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${accent} 0%, #21409A 100%)`,
          }}
        >
          <div>
            <span className="inline-block text-white/80 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3 font-sora">
              Explore
            </span>
            <h3 className="text-white text-2xl md:text-4xl font-black font-sora leading-tight mb-4">{title}</h3>
            <p className="text-white/85 text-sm md:text-base leading-relaxed font-sora">{description}</p>
          </div>

          <div className="flex flex-wrap gap-6 mt-6">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-white text-2xl md:text-3xl font-black font-sora">{s.value}</div>
                <div className="text-white/70 text-xs md:text-sm font-medium font-sora">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 text-white font-bold text-sm md:text-base font-sora border-b-2 border-white/60 pb-1">
              Learn more
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LifestyleSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[#74C044] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 font-sora">
            Discover
          </span>
          <Magnetic strength={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-2 font-sora">
              Lifestyle At
            </h2>
          </Magnetic>
          <Magnetic strength={0.2}>
            <AnimeReveal
              text="IIC"
              as="h2"
              className="text-6xl md:text-8xl font-black text-[#74C044] leading-[0.8] tracking-tight mb-10 font-sora justify-center"
              staggerFrom="center"
              delay={0.2}
            />
          </Magnetic>
          <RevealText
            text="Beyond Academics. A Vibrant Campus, Diverse Student Community, And State-Of-The-Art Facilities Designed For Holistic Growth."
            className="max-w-3xl text-gray-500 text-base md:text-lg font-medium leading-relaxed justify-center"
          />
        </div>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[800px]">
          {/* Main Large Card (Left) */}
          <div className="md:col-span-2 relative h-[400px] md:h-full">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)', y: 100, opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <FlipCard
                image="/images/home/iic-lifestyle 3.png"
                alt="Library at IIC"
                title="Library"
                description="A quiet, modern space stocked with academic texts, journals, and digital resources to power your research and study."
                stats={[
                  { value: '5K+', label: 'Books' },
                  { value: '24/7', label: 'Digital Access' },
                  { value: '120', label: 'Study Seats' },
                ]}
                accent="#74C044"
                rounded="rounded-[24px] md:rounded-[40px]"
                parallaxY={y1}
              />
            </motion.div>
          </div>

          {/* Right Column (Stacked) */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)', y: 60, opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[300px] md:h-auto"
            >
              <FlipCard
                image="/images/home/iic-lifestyle 1.png"
                alt="Lecture Theater"
                title="Lecture Theater"
                description="Spacious tiered halls with high-quality AV setups, designed for engaging lectures and dynamic seminars."
                stats={[
                  { value: '200', label: 'Capacity' },
                  { value: 'HD', label: 'Projection' },
                ]}
                accent="#21409A"
                rounded="rounded-[24px] md:rounded-[40px]"
                parallaxY={y2}
              />
            </motion.div>

            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)', y: 60, opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[300px] md:h-auto"
            >
              <FlipCard
                image="/images/home/iic-lifestyle 2.png"
                alt="Advanced Labs"
                title="Advanced Labs"
                description="Industry-grade computing labs equipped with the latest hardware and software for hands-on technical training."
                stats={[
                  { value: '8', label: 'Labs' },
                  { value: '160', label: 'Workstations' },
                ]}
                accent="#007a5e"
                rounded="rounded-[24px] md:rounded-[40px]"
                parallaxY={y3}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;

