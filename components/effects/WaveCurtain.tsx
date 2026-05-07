'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WaveCurtainProps {
  active: boolean;
  panelClassName?: string;
  panelStyle?: React.CSSProperties;
  zIndex?: number;
  origin?: 'bottom-left' | 'bottom-right' | 'center' | 'top-right' | 'top-left';
  /** Direction of clip-path sweep when active becomes true. */
  reveal?: 'circle' | 'diagonal';
  duration?: number;
  /** Reserved for compatibility with previous API. Ignored. */
  strips?: number;
  stripDelay?: number;
  skew?: number;
  showFoldShading?: boolean;
  foldShadingDark?: string;
  foldShadingLight?: string;
}

const ORIGIN_MAP: Record<NonNullable<WaveCurtainProps['origin']>, string> = {
  'bottom-left': '0% 100%',
  'bottom-right': '100% 100%',
  center: '50% 50%',
  'top-right': '100% 0%',
  'top-left': '0% 0%',
};

const WaveCurtain: React.FC<WaveCurtainProps> = ({
  active,
  panelClassName = 'bg-white',
  panelStyle,
  zIndex = 20,
  origin = 'bottom-right',
  reveal = 'circle',
  duration = 0.85,
}) => {
  const o = ORIGIN_MAP[origin];

  const closedClip =
    reveal === 'circle'
      ? `circle(0% at ${o})`
      : 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)';
  const openClip =
    reveal === 'circle'
      ? `circle(160% at ${o})`
      : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ clipPath: active ? openClip : closedClip }}
      transition={{
        duration: active ? duration : duration * 0.75,
        ease: active ? [0.22, 1, 0.36, 1] : [0.7, 0, 0.84, 0],
      }}
      className={`absolute inset-0 pointer-events-none ${panelClassName}`}
      style={{
        zIndex,
        clipPath: closedClip,
        WebkitClipPath: closedClip,
        willChange: 'clip-path',
        ...panelStyle,
      }}
    />
  );
};

export default WaveCurtain;
