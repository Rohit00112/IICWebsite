
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BirdProps {
  delay: number;
  duration: number;
  top: string;
  scale: number;
  reverse?: boolean;
}

const Bird: React.FC<BirdProps> = ({ delay, duration, top, scale, reverse = false }) => {
  return (
    <motion.div
      initial={{ x: reverse ? '-10vw' : '110vw', y: 0 }}
      animate={{
        x: reverse ? '110vw' : '-10vw',
        y: [0, -30, 15, -20, 5, 0],
      }}
      transition={{
        x: { duration, delay, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
        y: { duration: duration * 0.3, delay, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
      }}
      style={{ top, transform: `scale(${scale})` }}
      className="absolute pointer-events-none will-change-transform"
    >
      <div style={{ transform: reverse ? undefined : 'scaleX(-1)', width: 56, height: 32 }}>
        <svg width="56" height="32" viewBox="0 0 56 32" fill="none">
          {/* body */}
          <ellipse cx="28" cy="20" rx="6" ry="2.5" fill="#1a2f6e" />
          {/* head */}
          <ellipse cx="34" cy="18.5" rx="2.5" ry="2" fill="#1a2f6e" />
          {/* beak */}
          <path d="M36 18 L38.5 18.2 L36.2 19" fill="#d4a017" />
          {/* tail */}
          <path d="M22 20 L18 18 L18 22 Z" fill="#1a2f6e" />

          {/* wings flap via animateTransform */}
          <g>
            <motion.path
              d="M28 19 Q22 8, 8 6 Q18 16, 28 19 Z"
              fill="#21409A"
              animate={{
                d: [
                  'M28 19 Q22 8, 8 6 Q18 16, 28 19 Z',
                  'M28 19 Q22 16, 6 22 Q18 22, 28 19 Z',
                  'M28 19 Q22 12, 10 12 Q18 18, 28 19 Z',
                  'M28 19 Q22 8, 8 6 Q18 16, 28 19 Z',
                ],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M28 19 Q34 8, 48 6 Q38 16, 28 19 Z"
              fill="#2950b8"
              animate={{
                d: [
                  'M28 19 Q34 8, 48 6 Q38 16, 28 19 Z',
                  'M28 19 Q34 16, 50 22 Q38 22, 28 19 Z',
                  'M28 19 Q34 12, 46 12 Q38 18, 28 19 Z',
                  'M28 19 Q34 8, 48 6 Q38 16, 28 19 Z',
                ],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
};

const Sun: React.FC = () => {
  return (
    <motion.div
      className="absolute top-[8%] right-[6%] w-32 h-32 md:w-48 md:h-48 pointer-events-none"
      animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
      transition={{
        scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
      }}
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, #FFD96B 0%, rgba(255,179,71,0.5) 50%, transparent 80%)' }}
      />
      <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-[#FFE08A] to-[#FFB347] shadow-[0_0_60px_20px_rgba(255,200,80,0.4)]" />
    </motion.div>
  );
};

interface CloudProps {
  delay: number;
  duration: number;
  top: string;
  width: string;
  opacity: number;
  blur: number;
  tint: string;
  reverse?: boolean;
}

const Cloud: React.FC<CloudProps> = ({ delay, duration, top, width, opacity, blur, tint, reverse = false }) => {
  const yOffset = reverse ? -15 : 15;

  return (
    <motion.div
      initial={{ x: reverse ? '-30vw' : '110vw', y: 0 }}
      animate={{ x: reverse ? '110vw' : '-30vw', y: [0, yOffset, 0] }}
      transition={{
        x: {
          duration,
          delay,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
        y: {
          duration: duration * 0.4,
          delay,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
      style={{ top, width, opacity, filter: `blur(${blur}px)` }}
      className="absolute pointer-events-none will-change-transform"
    >
      <svg viewBox="0 0 240 100" fill="none" preserveAspectRatio="xMidYMid meet" className="w-full h-auto">
        <defs>
          <radialGradient id={`cloud-grad-${tint}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="55%" stopColor="#F0F4FB" stopOpacity="1" />
            <stop offset="100%" stopColor={`#${tint}`} stopOpacity="1" />
          </radialGradient>
          <filter id={`cloud-shadow-${tint}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter={`url(#cloud-shadow-${tint})`}>
          <ellipse cx="60" cy="65" rx="50" ry="28" fill={`url(#cloud-grad-${tint})`} />
          <ellipse cx="105" cy="50" rx="55" ry="35" fill={`url(#cloud-grad-${tint})`} />
          <ellipse cx="155" cy="55" rx="48" ry="30" fill={`url(#cloud-grad-${tint})`} />
          <ellipse cx="195" cy="65" rx="40" ry="22" fill={`url(#cloud-grad-${tint})`} />
          <ellipse cx="85" cy="42" rx="32" ry="22" fill="#ffffff" />
          <ellipse cx="135" cy="35" rx="38" ry="24" fill="#ffffff" />
          <ellipse cx="175" cy="42" rx="30" ry="20" fill="#ffffff" />
        </g>
      </svg>
    </motion.div>
  );
};

const CloudBackground = () => {
  const clouds = useMemo(() => [
    // sparse: 1 cloud per lane, fewer lanes
    { delay: 0, duration: 60, top: '10%', width: '260px', opacity: 1, blur: 2, tint: 'B8C8E0', reverse: false },
    { delay: -10, duration: 70, top: '38%', width: '300px', opacity: 1, blur: 1.5, tint: 'C8D4E8', reverse: true },
    { delay: -25, duration: 80, top: '62%', width: '280px', opacity: 1, blur: 2, tint: 'A8BCD8', reverse: false },
  ], []);

  const birds = useMemo(() => [
    { delay: 0, duration: 35, top: '18%', scale: 1, reverse: false },
    { delay: -8, duration: 40, top: '22%', scale: 0.7, reverse: false },
    { delay: -3, duration: 38, top: '20%', scale: 0.85, reverse: false },
    { delay: -20, duration: 45, top: '28%', scale: 0.6, reverse: true },
    { delay: -50, duration: 50, top: '32%', scale: 0.8, reverse: false },
  ], []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4E2F7] via-[#E8F0FB] to-transparent" />
      <Sun />
      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}
      {birds.map((bird, i) => (
        <Bird key={`bird-${i}`} {...bird} />
      ))}
    </div>
  );
};

export default CloudBackground;

