'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import usePrefersReducedMotion from '@/components/effects/usePrefersReducedMotion';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }

    (async () => {
      try {
        const { createTimeline, spring } = await import('animejs');

        const tl = createTimeline({
          defaults: {
            ease: spring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 }),
          },
        });

        // Stage 1: Logo enters with spring bounce
        tl.add(logoRef.current!, {
          opacity: [0, 1],
          scale: [0.85, 1],
          translateY: [30, 0],
          duration: 1000,
          delay: 300,
        });

        // Stage 2: Progress bar fills (overlaps with logo)
        tl.add(progressRef.current!, {
          scaleX: [0, 1],
          duration: 1400,
          ease: 'out(4)',
        }, '-=600');

        // Stage 3: Tagline characters stagger in
        if (taglineRef.current) {
          const chars = taglineRef.current.querySelectorAll('.preloader-char');
          if (chars.length > 0) {
            const { stagger } = await import('animejs');
            tl.add(chars, {
              opacity: [0, 1],
              translateY: [15, 0],
              duration: 500,
              delay: stagger(25),
            }, '-=800');
          }
        }

        // Stage 4: Fade out central content
        tl.add(contentRef.current!, {
          opacity: 0,
          scale: 0.95,
          duration: 600,
          delay: 800,
          ease: 'inOut(3)',
        });

        // Stage 5: Curtain split exit
        tl.add(curtainLeftRef.current!, {
          translateX: [0, '-100%'],
          duration: 1200,
          ease: 'inOut(4)',
        }, '-=300');

        tl.add(curtainRightRef.current!, {
          translateX: [0, '100%'],
          duration: 1200,
          ease: 'inOut(4)',
        }, '-=1200');

        // Remove from DOM after animation
        tl.add({}, {
          duration: 100,
          onComplete: () => setIsVisible(false),
        });

        cleanup = () => {
          if (tl && typeof tl.revert === 'function') {
            tl.revert();
          }
        };
      } catch {
        // Fallback: just hide after delay
        const timer = setTimeout(() => setIsVisible(false), 2500);
        cleanup = () => clearTimeout(timer);
      }
    })();

    return () => {
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  // Split tagline into words, then each word into characters
  const tagline = 'Unleashing Your Potential';
  const taglineContent = tagline.split(' ').map((word, wordIndex, wordsArray) => (
    <span key={wordIndex} className="inline-block whitespace-nowrap">
      {word.split('').map((char, charIndex) => (
        <span
          key={`${wordIndex}-${charIndex}`}
          className="preloader-char inline-block"
          style={{ opacity: 0 }}
        >
          {char}
        </span>
      ))}
      {/* Add space after word if it's not the last word */}
      {wordIndex < wordsArray.length - 1 && (
        <span className="inline-block">&nbsp;</span>
      )}
    </span>
  ));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Curtain Left */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-0 w-1/2 left-0 bg-white z-10"
        style={{ willChange: 'transform' }}
      />
      {/* Curtain Right */}
      <div
        ref={curtainRightRef}
        className="absolute inset-0 w-1/2 right-0 left-auto bg-white z-10"
        style={{ willChange: 'transform' }}
      />

      {/* Content (sits above curtains) */}
      <div 
        ref={contentRef}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div
            ref={logoRef}
            className="relative h-24 md:h-32 w-64 md:w-96"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College Branding"
              fill
              sizes="(max-width: 768px) 256px, 384px"
              className="object-contain"
              priority
            />
          </div>

          {/* Progress Bar */}
          <div className="mt-8 w-48 md:w-64 h-1 bg-gray-100/20 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-[#1e3a8a] rounded-full origin-left"
              style={{ transform: 'scaleX(0)', willChange: 'transform' }}
            />
          </div>

          {/* Tagline */}
          <div className="mt-4 h-6 overflow-hidden">
            <p
              ref={taglineRef}
              className="text-[#1e3a8a] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase"
            >
              {taglineContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
