'use client';

import React, { useRef, useEffect, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

interface AnimeRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
  delay?: number;
  staggerFrom?: 'first' | 'center' | 'last';
  duration?: number;
  stagger?: number;
  style?: React.CSSProperties;
}

/**
 * Character-level split-text animation powered by anime.js v4.
 * Used for high-impact headings — complements the existing word-level RevealText.
 */
const AnimeReveal = ({
  text,
  className = '',
  as: Tag = 'div',
  delay = 0,
  staggerFrom = 'center',
  duration = 900,
  stagger: staggerValue = 30,
  style,
}: AnimeRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);
  const shouldShow = isVisible || prefersReducedMotion;

  // IntersectionObserver to trigger once
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Run anime.js animation when visible
  useEffect(() => {
    if (!shouldShow || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.anime-char');
    if (chars.length === 0) return;

    if (prefersReducedMotion) {
      chars.forEach((c) => {
        (c as HTMLElement).style.opacity = '1';
        (c as HTMLElement).style.transform = 'none';
      });
      return;
    }

    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const { animate, stagger, spring } = await import('animejs');

        const anim = animate(chars, {
          translateY: [40, 0],
          opacity: [0, 1],
          rotateZ: [8, 0],
          duration,
          delay: stagger(staggerValue, {
            from: staggerFrom === 'center' ? 'center' : staggerFrom === 'last' ? 'last' : 'first',
            start: delay * 1000,
          }),
          ease: spring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 }),
        });

        cleanup = () => {
          if (anim && typeof anim.revert === 'function') {
            anim.revert();
          }
        };
      } catch {
        // Fallback: just show everything
        chars.forEach((c) => {
          (c as HTMLElement).style.opacity = '1';
          (c as HTMLElement).style.transform = 'none';
        });
      }
    })();

    return () => {
      cleanup?.();
    };
  }, [duration, shouldShow, delay, prefersReducedMotion, staggerFrom, staggerValue]);

  // Split text into words, then each word into characters
  // Each word is wrapped in a span with whitespace-nowrap to prevent line breaks within words
  const content = text.split(' ').map((word, wordIndex, wordsArray) => (
    <span key={wordIndex} className="inline-block whitespace-nowrap">
      {word.split('').map((char, charIndex) => (
        <span
          key={charIndex}
          className="anime-char inline-block"
          style={{
            opacity: shouldShow ? undefined : 0,
            willChange: 'transform, opacity',
          }}
        >
          {char}
        </span>
      ))}
      {/* Add space after word if it's not the last word */}
      {wordIndex < wordsArray.length - 1 && (
        <span className="inline-block" style={{ width: '0.25em' }}>
          &nbsp;
        </span>
      )}
    </span>
  ));

  return (
    <Tag
      ref={(node) => {
        containerRef.current = node as HTMLElement | null;
      }}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {content}
    </Tag>
  );
};

export default AnimeReveal;
