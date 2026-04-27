'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

interface AnimeStaggerProps {
  children: React.ReactNode;
  className?: string;
  /** CSS selector for child elements to stagger */
  selector?: string;
  /** Delay between each element in ms */
  staggerDelay?: number;
  /** Direction to stagger from */
  from?: 'first' | 'center' | 'last';
  /** Initial translateY offset */
  translateY?: number;
  /** Duration per element */
  duration?: number;
  /** Only animate once */
  once?: boolean;
}

/**
 * Generic wrapper that applies staggered entrance animation
 * to child elements matching a CSS selector using anime.js v4.
 */
const AnimeStagger = ({
  children,
  className = '',
  selector = ':scope > *',
  staggerDelay = 80,
  from = 'first',
  translateY = 30,
  duration = 700,
  once = true,
}: AnimeStaggerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const runAnimation = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (targets.length === 0) return;

    if (prefersReducedMotion) {
      targets.forEach((t) => {
        (t as HTMLElement).style.opacity = '1';
        (t as HTMLElement).style.transform = 'none';
      });
      return;
    }

    try {
      const { animate, stagger, spring } = await import('animejs');

      animate(targets, {
        translateY: [translateY, 0],
        opacity: [0, 1],
        duration,
        delay: stagger(staggerDelay, {
          from: from === 'center' ? 'center' : from === 'last' ? 'last' : 'first',
        }),
        ease: spring({ mass: 1, stiffness: 100, damping: 12, velocity: 0 }),
      });
    } catch {
      // Fallback: show everything
      targets.forEach((t) => {
        (t as HTMLElement).style.opacity = '1';
        (t as HTMLElement).style.transform = 'none';
        });
    }
  }, [duration, from, prefersReducedMotion, selector, staggerDelay, translateY]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (prefersReducedMotion) {
      targets.forEach((t) => {
        (t as HTMLElement).style.opacity = '1';
        (t as HTMLElement).style.transform = 'none';
      });
      return;
    }

    targets.forEach((t) => {
      (t as HTMLElement).style.opacity = '0';
      (t as HTMLElement).style.transform = `translateY(${translateY}px)`;
      (t as HTMLElement).style.willChange = 'transform, opacity';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          hasAnimated.current = true;
          runAnimation();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [once, prefersReducedMotion, runAnimation, selector, translateY]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default AnimeStagger;
