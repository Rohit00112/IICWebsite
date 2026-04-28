'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  strength?: number;
}

const Tilt = ({ children, className = '', innerClassName = '', strength = 20 }: TiltProps) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-strength, strength]);

  // Dynamic Glare Position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseXSpring, (v) => Math.abs(v) * 0.5 + 0.1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: isMobile ? 0 : rotateY,
        rotateX: isMobile ? 0 : rotateX,
        transformStyle: isMobile ? "flat" : "preserve-3d",
        perspective: "1000px",
      }}
      className={`relative ${className} group/tilt`}
    >
      <div
        className={`relative w-full h-full overflow-hidden rounded-[inherit] ${innerClassName}`}
        style={{
          transform: isMobile ? "none" : "translateZ(30px)",
          transformStyle: isMobile ? "flat" : "preserve-3d",
        }}
      >
        {/* Children Content */}
        {children}

        {/* Dynamic Glare Overlay */}
        {!isMobile && (
          <motion.div
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 80%)",
              left: glareX,
              top: glareY,
              opacity: glareOpacity,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute w-[150%] h-[150%] pointer-events-none z-50 mix-blend-overlay"
          />
        )}
      </div>
    </motion.div>
  );
};

export default Tilt;
