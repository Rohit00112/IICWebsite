'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, cubicBezier } from 'framer-motion';

const historyItems = [
  {
    year: "2017",
    markerLabel: "2017 · Founded",
    title: "Foundation Established",
    description: "Itahari International College was established with a vision to bring world-class British education to the Eastern region of Nepal.",
    stat: "1st",
    statLabel: "British curriculum in Eastern Nepal",
    color: "#00A69C",
  },
  {
    year: "2017",
    markerLabel: "2017 · First Cohort",
    title: "First Cohort Enrolled",
    description: "Welcomed our first batch of enthusiastic students in the BSc (Hons) Computing and BA (Hons) Business Administration programmes.",
    stat: "60+",
    statLabel: "Pioneer students",
    color: "#21409A",
  },
  {
    year: "2024",
    markerLabel: "2024 · Expansion",
    title: "Campus Expansion",
    description: "Inaugurated the new ING Block — a state-of-the-art facility featuring advanced labs, library, learning zone with lecture theatres, tutorial rooms, and  modern learning environment.",
    stat: "",
    statLabel: "Advanced Learning Environment",
    color: "#5B4B9C",
  },
];

interface PanelProps {
  item: (typeof historyItems)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const easeInOut = cubicBezier(0.65, 0, 0.35, 1);
const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const Panel = ({ item, index, total, progress }: PanelProps) => {
  const segment = 1 / total;
  const start = index * segment;
  const mid = start + segment / 2;
  const end = start + segment;
  const isLast = index === total - 1;
  const isFirst = index === 0;

  const fadeIn = isFirst ? -0.0001 : start + segment * 0.15;
  const holdStart = isFirst ? -0.0001 : start + segment * 0.3;
  const holdEnd = isLast ? 1.0001 : end - segment * 0.15;
  const fadeOut = isLast ? 1.0001 : end - segment * 0.02;

  const opacity = useTransform(
    progress,
    [fadeIn, holdStart, holdEnd, fadeOut],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    { ease: easeInOut }
  );
  const blurValue = useTransform(
    progress,
    [fadeIn, holdStart, holdEnd, fadeOut],
    [isFirst ? 0 : 4, 0, 0, isLast ? 0 : 4],
    { ease: easeInOut }
  );
  const itemFilter = useTransform(blurValue, (b) => `blur(${b}px)`);

  const titleY = useTransform(
    progress,
    [fadeIn, mid, fadeOut],
    [isFirst ? 0 : 60, 0, isLast ? 0 : -60],
    { ease: easeOut }
  );
  const descY = useTransform(
    progress,
    [fadeIn, mid, fadeOut],
    [isFirst ? 0 : 40, 0, isLast ? 0 : -40],
    { ease: easeOut }
  );
  const statScale = useTransform(
    progress,
    [fadeIn, mid, fadeOut],
    [isFirst ? 1 : 0.85, 1, isLast ? 1 : 1.08],
    { ease: easeOut }
  );
  const contentScale = useTransform(
    progress,
    [fadeIn, mid, fadeOut],
    [isFirst ? 1 : 0.96, 1, isLast ? 1 : 1.04],
    { ease: easeOut }
  );
  const giantYearY = useTransform(
    progress,
    [fadeIn, mid, fadeOut],
    [isFirst ? 0 : 100, 0, isLast ? 0 : -100],
    { ease: easeOut }
  );
  const giantOpacity = useTransform(
    progress,
    [fadeIn, holdStart, holdEnd, fadeOut],
    [isFirst ? 0.18 : 0, 0.18, 0.18, isLast ? 0.18 : 0],
    { ease: easeInOut }
  );

  return (
    <motion.div
      style={{ opacity, filter: itemFilter }}
      className="absolute inset-0 flex items-center justify-center will-change-[opacity,filter]"
    >
      {/* Color wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${item.color}40 0%, transparent 70%)`,
        }}
      />

      {/* Giant year backdrop */}
      <motion.div
        style={{ y: giantYearY, opacity: giantOpacity, color: item.color }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[28vw] md:text-[22vw] font-black font-sora leading-none tracking-tighter">
          {item.year}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ scale: contentScale }}
        className="relative z-10 max-w-4xl px-6 md:px-12 text-center"
      >
        <motion.div
          style={{ y: titleY }}
          className="mb-6"
        >
          <span
            className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.3em] font-sora text-white shadow-lg"
            style={{ backgroundColor: item.color }}
          >
            {item.year}
          </span>
        </motion.div>

        <motion.h3
          style={{ y: titleY }}
          className="text-4xl md:text-7xl font-black font-sora text-[#1a1a1a] leading-[0.95] tracking-tight mb-8"
        >
          {item.title}
        </motion.h3>

        <motion.p
          style={{ y: descY }}
          className="text-base md:text-xl text-gray-600 font-medium font-sora leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {item.description}
        </motion.p>

        <motion.div
          style={{ scale: statScale }}
          className="inline-flex items-baseline gap-3 px-6 py-3 rounded-2xl bg-white shadow-xl border border-gray-100"
        >
          <span
            className="text-4xl md:text-5xl font-black font-sora leading-none"
            style={{ color: item.color }}
          >
            {item.stat}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-gray-500 font-sora">
            {item.statLabel}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Marker = ({ item, index, total, progress }: { item: typeof historyItems[0], index: number, total: number, progress: MotionValue<number> }) => {
  const segment = 1 / total;
  const mid = index * segment + segment / 2;
  const dotScale = useTransform(
    progress,
    [mid - segment / 2, mid, mid + segment / 2],
    [0.7, 1.4, 0.7]
  );
  const labelOpacity = useTransform(
    progress,
    [mid - segment / 2, mid, mid + segment / 2],
    [0.4, 1, 0.4]
  );

  return (
    <div className="relative flex flex-col items-center">
      <motion.span
        style={{ scale: dotScale, backgroundColor: item.color }}
        className="block w-3 h-3 rounded-full ring-4 ring-[#FAFAFA] shadow"
      />
      <motion.span
        style={{ opacity: labelOpacity, color: item.color }}
        className="absolute top-5 whitespace-nowrap text-[10px] md:text-[11px] font-bold tracking-widest font-sora"
      >
        {item.markerLabel}
      </motion.span>
    </div>
  );
};

const ExcellenceJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const total = historyItems.length;
  const railFill = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFAFA]"
      style={{ height: `${total * 130}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute top-12 md:top-16 left-0 right-0 text-center z-20 pointer-events-none px-6"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-gray-400 font-sora mb-3">
            Our Journey
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-[#1a1a1a] font-sora">
            A Legacy of Excellence
          </h2>
        </motion.div>

        {/* Panels stacked, opacity-driven */}
        <div className="absolute inset-0">
          {historyItems.map((item, i) => (
            <Panel
              key={`${item.year}-${i}`}
              item={item}
              index={i}
              total={total}
              progress={smoothProgress}
            />
          ))}
        </div>

        {/* Bottom progress rail */}
        <div className="absolute bottom-10 md:bottom-14 left-0 right-0 z-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative h-[2px] bg-gray-200 rounded-full">
              <motion.div
                style={{ width: railFill }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00A69C] via-[#21409A] to-[#C04444] rounded-full"
              />

              {/* Markers */}
              <div className="absolute inset-0 flex justify-between items-center -translate-y-0">
                {historyItems.map((item, i) => (
                  <Marker
                    key={`${item.year}-${i}`}
                    item={item}
                    index={i}
                    total={total}
                    progress={smoothProgress}
                  />
                ))}
              </div>
            </div>
            <p className="mt-12 text-center text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-sora font-semibold">
              Scroll to journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcellenceJourney;
