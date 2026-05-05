'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaveCurtainProps {
  active: boolean;
  panelClassName?: string;
  panelStyle?: React.CSSProperties;
  strips?: number;
  duration?: number;
  stripDelay?: number;
  skew?: number;
  zIndex?: number;
  showFoldShading?: boolean;
  foldShadingDark?: string;
  foldShadingLight?: string;
}

const DEFAULTS = {
  strips: 6,
  duration: 1.1,
  stripDelay: 0.04,
  skew: 1.5,
};

const EASE: [number, number, number, number] = [0.6, 0.01, 0, 0.95];

const WaveCurtain: React.FC<WaveCurtainProps> = ({
  active,
  panelClassName = 'bg-white',
  panelStyle,
  strips = DEFAULTS.strips,
  duration = DEFAULTS.duration,
  stripDelay = DEFAULTS.stripDelay,
  skew = DEFAULTS.skew,
  zIndex = 20,
  showFoldShading = true,
  foldShadingDark = 'rgba(0,0,0,0.12)',
  foldShadingLight = 'rgba(255,255,255,0.05)',
}) => {
  const variants = {
    initial: (side: 'left' | 'right') => ({
      scaleX: 1,
      x: 0,
      skewY: 0,
      opacity: 0,
    }),
    open: (side: 'left' | 'right') => ({
      scaleX: 0,
      x: side === 'left' ? '-100%' : '100%',
      skewY: side === 'left' ? -skew : skew,
      opacity: 1,
    }),
    closed: (side: 'left' | 'right') => ({
      scaleX: 1,
      x: 0,
      skewY: 0,
      opacity: 1, // Stay opaque while closing
    })
  };

  const renderStrips = (side: 'left' | 'right') =>
    Array.from({ length: strips }).map((_, i) => {
      const stripIndex = side === 'left' ? strips - 1 - i : i;
      const delay = stripIndex * stripDelay;

      return (
        <motion.div
          key={`${side}-${i}`}
          custom={side}
          variants={variants}
          initial="initial"
          animate="open"
          exit="closed"
          transition={{
            duration,
            delay,
            ease: EASE,
            opacity: { duration: 0.1, delay } // Quick snap to visible
          }}
          className={`relative h-full ${panelClassName}`}
          style={{
            width: `calc(${100 / strips}% + 1px)`,
            transformOrigin: side === 'left' ? 'left center' : 'right center',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            contain: 'layout paint',
            ...panelStyle,
          }}
        >
          {showFoldShading && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: i % 2 === 0
                  ? `linear-gradient(90deg, ${foldShadingDark} 0%, rgba(0,0,0,0) 50%, ${foldShadingDark} 100%)`
                  : `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${foldShadingLight} 50%, rgba(0,0,0,0) 100%)`,
              }}
            />
          )}
        </motion.div>
      );
    });

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="curtain-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: duration + strips * stripDelay }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex }}
        >
          <div
            className="absolute top-0 left-0 w-1/2 h-full flex"
            style={{ perspective: '1200px' }}
          >
            {renderStrips('left')}
          </div>
          <div
            className="absolute top-0 right-0 w-1/2 h-full flex"
            style={{ perspective: '1200px' }}
          >
            {renderStrips('right')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaveCurtain;
