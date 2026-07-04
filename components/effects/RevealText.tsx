'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
}

const RevealText = ({ text, className = '', delay = 0, as: Tag = 'div' }: RevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0%" });

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="relative overflow-hidden inline-block mr-[0.2em] px-1 -mx-1 py-1 -my-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && <span className="sr-only"> </span>}
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default RevealText;
