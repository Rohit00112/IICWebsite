
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BirdProps {
  delay: number;
  duration: number;
  top: string;
  left: string;
  scale: number;
  reverse?: boolean;
}

const Bird: React.FC<BirdProps> = ({ delay, duration, top, left, scale, reverse = false }) => {
  const facing = reverse ? undefined : 'scaleX(-1)';
  const birdStyle = {
    top,
    left,
    '--bird-duration': `${duration}s`,
    '--bird-bob-duration': `${duration * 0.3}s`,
    '--bird-delay': `${delay}s`,
  } as React.CSSProperties;

  return (
    <div
      style={birdStyle}
      className={`bird-sweep absolute z-[2] pointer-events-none ${reverse ? 'bird-sweep-right' : 'bird-sweep-left'}`}
    >
      <div className="bird-bob">
        <div style={{ transform: `${facing ? `${facing} ` : ''}scale(${scale})`, transformOrigin: 'center', width: 72, height: 42 }}>
          <svg width="72" height="42" viewBox="0 0 72 42" fill="none" style={{ filter: 'drop-shadow(0 2px 2px rgba(26,47,110,0.18))' }}>
            <g>
              <path d="M36 25 C30 13 18 3 7 5 C17 16 28 22 36 25 Z" fill="#21409A">
                <animate
                  attributeName="d"
                  values="M36 25 C30 13 18 3 7 5 C17 16 28 22 36 25 Z; M36 25 C27 27 15 34 5 36 C17 38 30 31 36 25 Z; M36 25 C29 20 18 15 9 16 C20 23 30 26 36 25 Z; M36 25 C30 13 18 3 7 5 C17 16 28 22 36 25 Z"
                  keyTimes="0;0.34;0.68;1"
                  keySplines="0.32 0 0.67 0; 0.22 1 0.36 1; 0.32 0 0.67 0"
                  calcMode="spline"
                  dur="0.86s"
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-10 36 25; 24 36 25; -24 36 25; -10 36 25"
                  keyTimes="0;0.34;0.68;1"
                  keySplines="0.32 0 0.67 0; 0.22 1 0.36 1; 0.32 0 0.67 0"
                  calcMode="spline"
                  dur="0.86s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M36 25 C42 13 54 3 65 5 C55 16 44 22 36 25 Z" fill="#2950b8">
                <animate
                  attributeName="d"
                  values="M36 25 C42 13 54 3 65 5 C55 16 44 22 36 25 Z; M36 25 C45 27 57 34 67 36 C55 38 42 31 36 25 Z; M36 25 C43 20 54 15 63 16 C52 23 42 26 36 25 Z; M36 25 C42 13 54 3 65 5 C55 16 44 22 36 25 Z"
                  keyTimes="0;0.34;0.68;1"
                  keySplines="0.32 0 0.67 0; 0.22 1 0.36 1; 0.32 0 0.67 0"
                  calcMode="spline"
                  dur="0.86s"
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="10 36 25; -24 36 25; 24 36 25; 10 36 25"
                  keyTimes="0;0.34;0.68;1"
                  keySplines="0.32 0 0.67 0; 0.22 1 0.36 1; 0.32 0 0.67 0"
                  calcMode="spline"
                  dur="0.86s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 1.2; 0 -0.7; 0 0"
                keyTimes="0;0.34;0.68;1"
                keySplines="0.32 0 0.67 0; 0.22 1 0.36 1; 0.32 0 0.67 0"
                calcMode="spline"
                dur="0.86s"
                repeatCount="indefinite"
              />
              <ellipse cx="36" cy="26" rx="7.5" ry="3.2" fill="#142b68" />
              <ellipse cx="43.5" cy="24" rx="3.2" ry="2.5" fill="#142b68" />
              <path d="M46.5 23.5 L50 23.8 L46.8 24.8" fill="#d4a017" />
              <path d="M28.5 26 L22 23 L22 29 Z" fill="#142b68" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Sun: React.FC = () => {
  return (
    <motion.div
      className="absolute top-[56%] right-[6%] w-32 h-32 md:top-[55%] md:w-48 md:h-48 pointer-events-none"
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
  left: string;
  width: string;
  opacity: number;
  blur: number;
  tint: string;
  reverse?: boolean;
}

const Cloud: React.FC<CloudProps> = ({ delay, duration, top, left, width, opacity, blur, tint, reverse = false }) => {
  const yOffset = reverse ? -15 : 15;
  const cloudStyle = {
    top,
    left,
    width,
    opacity,
    filter: `blur(${blur}px)`,
    '--cloud-duration': `${duration}s`,
    '--cloud-bob-duration': `${duration * 0.4}s`,
    '--cloud-delay': `${delay}s`,
    '--cloud-y-offset': `${yOffset}px`,
  } as React.CSSProperties;

  return (
    <div
      style={cloudStyle}
      className={`cloud-sweep absolute z-[1] pointer-events-none ${reverse ? 'cloud-sweep-right' : 'cloud-sweep-left'}`}
    >
      <div className="cloud-bob">
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
      </div>
    </div>
  );
};

const CloudBackground = ({ className = "fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none" }: { className?: string }) => {
  const clouds = useMemo(() => [
    { delay: -8, duration: 46, top: '54%', left: '0', width: '200px', opacity: 0.78, blur: 0.4, tint: 'B8C8E0', reverse: false },
    { delay: -23, duration: 58, top: '66%', left: '0', width: '240px', opacity: 0.68, blur: 0.8, tint: 'C8D4E8', reverse: true },
    { delay: -41, duration: 64, top: '78%', left: '0', width: '190px', opacity: 0.58, blur: 0.6, tint: 'A8BCD8', reverse: false },
    { delay: -31, duration: 52, top: '89%', left: '0', width: '150px', opacity: 0.62, blur: 0.2, tint: 'D7E0EF', reverse: true },
  ], []);

  const birds = useMemo(() => [
    { delay: -4, duration: 24, top: '58%', left: '0', scale: 1, reverse: false },
    { delay: -11, duration: 28, top: '61%', left: '0', scale: 0.72, reverse: false },
    { delay: -18, duration: 26, top: '65%', left: '0', scale: 0.86, reverse: false },
    { delay: -25, duration: 32, top: '69%', left: '0', scale: 0.62, reverse: true },
    { delay: -33, duration: 34, top: '63%', left: '0', scale: 0.78, reverse: false },
  ], []);

  return (
    <div className={className}>
      <style>
        {`
          .bird-sweep {
            animation-duration: var(--bird-duration);
            animation-delay: var(--bird-delay);
            animation-fill-mode: both;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            will-change: transform;
          }

          .bird-sweep-left {
            animation-name: iic-bird-sweep-left;
          }

          .bird-sweep-right {
            animation-name: iic-bird-sweep-right;
          }

          .bird-bob {
            animation: iic-bird-bob var(--bird-bob-duration) ease-in-out var(--bird-delay) infinite alternate both;
            will-change: transform;
          }

          .cloud-sweep {
            animation-duration: var(--cloud-duration);
            animation-delay: var(--cloud-delay);
            animation-fill-mode: both;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            will-change: transform;
          }

          .cloud-sweep-left {
            animation-name: iic-cloud-sweep-left;
          }

          .cloud-sweep-right {
            animation-name: iic-cloud-sweep-right;
          }

          .cloud-bob {
            animation: iic-cloud-bob var(--cloud-bob-duration) ease-in-out var(--cloud-delay) infinite alternate both;
            will-change: transform;
          }

          @keyframes iic-bird-sweep-left {
            from { transform: translate3d(110vw, 0, 0); }
            to { transform: translate3d(-20vw, 0, 0); }
          }

          @keyframes iic-bird-sweep-right {
            from { transform: translate3d(-20vw, 0, 0); }
            to { transform: translate3d(110vw, 0, 0); }
          }

          @keyframes iic-cloud-sweep-left {
            from { transform: translate3d(110vw, 0, 0); }
            to { transform: translate3d(-35vw, 0, 0); }
          }

          @keyframes iic-cloud-sweep-right {
            from { transform: translate3d(-35vw, 0, 0); }
            to { transform: translate3d(110vw, 0, 0); }
          }

          @keyframes iic-bird-bob {
            0% { transform: translate3d(0, 0, 0); }
            20% { transform: translate3d(0, -30px, 0); }
            40% { transform: translate3d(0, 15px, 0); }
            60% { transform: translate3d(0, -20px, 0); }
            80% { transform: translate3d(0, 5px, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }

          @keyframes iic-cloud-bob {
            0% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, var(--cloud-y-offset), 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
        `}
      </style>
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
