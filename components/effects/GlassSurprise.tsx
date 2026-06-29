'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import useIsMobileLike from './useIsMobileLike';
import usePrefersReducedMotion from './usePrefersReducedMotion';

interface GlassSurpriseProps {
  children: React.ReactNode;
}

const GlassSurprise: React.FC<GlassSurpriseProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMobileLike = useIsMobileLike();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldSimplifyMotion = isMobileLike || prefersReducedMotion;

  // Mouse coordinates relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { damping: 25, stiffness: 120 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { damping: 25, stiffness: 120 });

  // Light streak position
  const streakX = useSpring(useTransform(x, [-300, 300], ['-100%', '200%']), { damping: 30, stiffness: 100 });

  // Reactive Orb Positions
  const orbX = useSpring(useTransform(x, [-300, 300], [-100, 100]), { damping: 30, stiffness: 100 });
  const orbY = useSpring(useTransform(y, [-300, 300], [-100, 100]), { damping: 30, stiffness: 100 });
  const shadowX = useTransform(x, [-300, 300], [30, -30]);
  const shadowY = useTransform(y, [-300, 300], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldSimplifyMotion) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative w-full flex justify-center px-4 py-8 md:px-0 md:py-12"
      onMouseMove={shouldSimplifyMotion ? undefined : handleMouseMove}
      onMouseEnter={shouldSimplifyMotion ? undefined : handleMouseEnter}
      onMouseLeave={shouldSimplifyMotion ? undefined : handleMouseLeave}
      style={shouldSimplifyMotion ? undefined : { perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        style={shouldSimplifyMotion ? undefined : {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-4xl z-20"
      >
        {/* The Glass Card */}
        <motion.div
          className="relative z-10 bg-white/10 backdrop-blur-sm md:backdrop-blur-[60px] border border-white/40 md:border-white/50 rounded-[34px] md:rounded-[64px] p-7 md:p-16 shadow-[0_18px_42px_rgba(0,0,0,0.32)] md:shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex flex-col items-center text-center overflow-hidden"
          style={shouldSimplifyMotion ? undefined : {
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Internal Glowing Light Orb */}
          {!shouldSimplifyMotion && (
            <motion.div
              style={{
                x: orbX,
                y: orbY,
                opacity: isHovered ? 0.4 : 0,
              }}
              className="absolute -inset-40 bg-gradient-to-tr from-[#21409A] to-[#74C044] blur-[100px] rounded-full z-0 pointer-events-none transition-opacity duration-700"
            />
          )}

          {/* Animated Light Streak */}
          {!shouldSimplifyMotion && (
            <motion.div
              style={{ x: streakX }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
            />
          )}

          {/* Liquid Texture */}
          <div className="absolute inset-0 hidden opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay md:block" />

          {/* Content with 3D Pop */}
          <div style={shouldSimplifyMotion ? undefined : { transform: 'translateZ(50px)' }} className="relative z-10 w-full">
            {children}
          </div>
        </motion.div>

        {/* Dynamic Shadow */}
        {!shouldSimplifyMotion && (
          <motion.div
            style={{
              x: shadowX,
              y: shadowY,
              opacity: isHovered ? 0.3 : 0.15,
            }}
            className="absolute -inset-6 bg-black/50 blur-[60px] rounded-[64px] -z-10 pointer-events-none transition-opacity"
          />
        )}
      </motion.div>
    </div>
  );
};

export default GlassSurprise;
