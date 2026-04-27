'use client';

import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  maxDistance?: number;
}

const Magnetic = ({ children, strength = 0.5, maxDistance = 20 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate raw displacement
    let x = (clientX - centerX) * strength;
    let y = (clientY - centerY) * strength;

    // Apply distance limit to prevent overlapping with nearby elements
    const distance = Math.sqrt(x * x + y * y);
    if (distance > maxDistance) {
      const ratio = maxDistance / distance;
      x *= ratio;
      y *= ratio;
    }

    setPosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 1.05 : 1,
        zIndex: isHovered ? 50 : 10,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 150, 
        damping: 15, 
        mass: 0.1,
        scale: { duration: 0.2 }
      }}
      className="relative"
    >
      {/* Attractive Magnetic Field Glow */}
      <motion.div
        className="absolute inset-0 bg-current opacity-0 rounded-xl blur-xl -z-10 pointer-events-none"
        animate={{ 
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.4 : 1,
        }}
      />
      {children}
    </motion.div>
  );
};

export default Magnetic;
