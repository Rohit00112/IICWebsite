'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '@/components/effects/usePrefersReducedMotion';

/**
 * Animated counter that counts up from 0 using anime.js.
 * Falls back to instant display if anime.js fails.
 */
const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState('0');
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          (async () => {
            try {
              const { animate } = await import('animejs');

              const obj = { val: 0 };
              const anim = animate(obj, {
                val: [0, value],
                duration: 2000,
                ease: 'out(3)',
                modifier: (v: number) => Math.round(v),
                onUpdate: () => {
                  setDisplayValue(Math.round(obj.val) + suffix);
                },
                onComplete: () => {
                  setDisplayValue(value + suffix);
                },
              });

              cleanup = () => {
                if (anim && typeof anim.revert === 'function') {
                  anim.revert();
                }
              };
            } catch {
              setDisplayValue(value + suffix);
            }
          })();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [prefersReducedMotion, suffix, value]);

  return <span ref={spanRef}>{prefersReducedMotion ? value + suffix : displayValue}</span>;
};

const StatsStrip = () => {
  const stats = [
    { label: 'Industry-Ready Graduates', value: 1000, suffix: '+' },
    { label: 'Industry Partners', value: 150, suffix: '+' },
    { label: 'Years of Excellence', value: 8, suffix: '+' },
  ];

  return (
    <div className="bg-[#21409A] py-6 sm:py-8 md:py-14 relative z-10 w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center text-white py-5 sm:py-6 md:py-0 px-4"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight md:tracking-tighter mb-1 font-iic">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-xs sm:text-sm md:text-lg font-medium opacity-80 text-center tracking-[0.22em] md:tracking-widest leading-snug">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsStrip;
