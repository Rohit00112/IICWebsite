'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, MotionValue, cubicBezier } from 'framer-motion';

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
type PinState = 'before' | 'active' | 'after';

const Panel = ({ item, index, total, progress }: PanelProps) => {
  const step = total > 1 ? 1 / (total - 1) : 1;
  const center = total > 1 ? index * step : 0;
  const isLast = index === total - 1;
  const isFirst = index === 0;
  const enterStart = isFirst ? 0 : Math.max(0, center - step * 0.55);
  const enterEnd = isFirst ? 0 : Math.max(0, center - step * 0.18);
  const exitStart = isLast ? 1 : Math.min(1, center + step * 0.18);
  const exitEnd = isLast ? 1 : Math.min(1, center + step * 0.55);

  const visibilityInput = isFirst
    ? [0, exitStart, exitEnd]
    : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd];
  const visibilityOutput = isFirst
    ? [1, 1, 0]
    : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0];
  const yInput = isFirst
    ? [0, exitStart, exitEnd]
    : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, center, exitEnd];
  const titleYOutput = isFirst
    ? [0, 0, -60]
    : isLast
      ? [60, 0, 0]
      : [60, 0, -60];
  const descYOutput = isFirst
    ? [0, 0, -40]
    : isLast
      ? [40, 0, 0]
      : [40, 0, -40];
  const giantYOutput = isFirst
    ? [0, 0, -100]
    : isLast
      ? [100, 0, 0]
      : [100, 0, -100];
  const scaleOutput = isFirst
    ? [1, 1, 1.04]
    : isLast
      ? [0.96, 1, 1]
      : [0.96, 1, 1.04];
  const statScaleOutput = isFirst
    ? [1, 1, 1.08]
    : isLast
      ? [0.85, 1, 1]
      : [0.85, 1, 1.08];

  const opacity = useTransform(progress, visibilityInput, visibilityOutput, { ease: easeInOut });
  const blurValue = useTransform(
    progress,
    visibilityInput,
    visibilityOutput.map((value) => (value === 1 ? 0 : 4)),
    { ease: easeInOut }
  );
  const itemFilter = useTransform(blurValue, (b) => `blur(${b}px)`);

  const titleY = useTransform(progress, yInput, titleYOutput, { ease: easeOut });
  const descY = useTransform(progress, yInput, descYOutput, { ease: easeOut });
  const statScale = useTransform(progress, yInput, statScaleOutput, { ease: easeOut });
  const contentScale = useTransform(progress, yInput, scaleOutput, { ease: easeOut });
  const giantYearY = useTransform(progress, yInput, giantYOutput, { ease: easeOut });
  const giantOpacity = useTransform(
    progress,
    visibilityInput,
    visibilityOutput.map((value) => (value === 1 ? 0.18 : 0)),
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
  const step = total > 1 ? 1 / (total - 1) : 1;
  const center = total > 1 ? index * step : 0;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const range = isFirst
    ? [0, step * 0.5]
    : isLast
      ? [1 - step * 0.5, 1]
      : [center - step * 0.5, center, center + step * 0.5];
  const dotScale = useTransform(progress, range, isFirst ? [1.4, 0.7] : isLast ? [0.7, 1.4] : [0.7, 1.4, 0.7]);
  const labelOpacity = useTransform(progress, range, isFirst ? [1, 0.4] : isLast ? [0.4, 1] : [0.4, 1, 0.4]);

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
  const containerRef = useRef<HTMLElement>(null);
  const [pinState, setPinState] = useState<PinState>('before');
  const journeyProgress = useMotionValue(0);

  const total = historyItems.length;
  const railFill = useTransform(journeyProgress, [0, 1], ['0%', '100%']);

  const updatePinState = useCallback(() => {
    const section = containerRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = Math.max(1, rect.height - viewportHeight);
    const nextState: PinState =
      rect.top > 0 ? 'before' : rect.bottom <= viewportHeight ? 'after' : 'active';
    const nextProgress =
      nextState === 'before'
        ? 0
        : nextState === 'after'
          ? 1
          : Math.min(1, Math.max(0, -rect.top / scrollableDistance));

    journeyProgress.set(nextProgress);
    setPinState((currentState) => currentState === nextState ? currentState : nextState);
  }, [journeyProgress]);

  useEffect(() => {
    updatePinState();
    window.addEventListener('scroll', updatePinState, { passive: true });
    window.addEventListener('resize', updatePinState);

    return () => {
      window.removeEventListener('scroll', updatePinState);
      window.removeEventListener('resize', updatePinState);
    };
  }, [updatePinState]);

  const stagePositionClass =
    pinState === 'active'
      ? 'fixed inset-0 z-30'
      : pinState === 'after'
        ? 'absolute inset-x-0 bottom-0 z-10'
        : 'absolute inset-x-0 top-0 z-10';

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFAFA]"
      style={{ height: `${(total + 1) * 100}svh` }}
    >
      <div className={`${stagePositionClass} h-[100svh] w-full overflow-hidden bg-[#FAFAFA]`}>
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
              progress={journeyProgress}
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
                    progress={journeyProgress}
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
