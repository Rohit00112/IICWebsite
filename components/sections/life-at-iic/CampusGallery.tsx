'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Image from 'next/image';

const sections = [
  {
    id: 1,
    image: '/images/home/iic-lifestyle 3.png',
    title: 'The Knowledge Hub',
    text: "Our state-of-the-art library offers a serene environment for deep work and collaborative study. Equipped with extensive digital archives, quiet reading zones, and dedicated group study pods, it's designed to support your academic journey.",
    bgColor: '#0A2520',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    reverse: false
  },
  {
    id: 2,
    image: '/images/home/iic-lifestyle 2.png',
    title: 'Advanced Technology Labs',
    text: "Experience hands-on learning in our dedicated computing and IT laboratories. Outfitted with the latest hardware and enterprise software, these spaces allow you to innovate, code, and build the technologies of tomorrow.",
    bgColor: '#0B1120',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    reverse: true
  },
  {
    id: 3,
    image: '/images/lifestyle/lifestyle.png',
    title: 'Recreation & Wellness',
    text: "Balance is key to success. Our campus features modern recreational facilities, including a multi-purpose sports hall, fitness center, and vibrant student lounges, ensuring you stay active and refreshed.",
    bgColor: '#2E401B',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    reverse: false
  }
];

const Slide = ({ section }: { section: typeof sections[0] }) => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col md:flex-row overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
    >
      <div
        className={`w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-10 md:px-24 lg:px-32 text-white ${section.reverse ? 'md:order-1' : 'md:order-2'}`}
        style={{ backgroundColor: section.bgColor }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
        >
          {section.icon}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sora">
            {section.title}
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md font-sora">
            {section.text}
          </p>
        </motion.div>
      </div>

      <div className={`w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden ${section.reverse ? 'md:order-2' : 'md:order-1'}`}>
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full"
        >
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SLIDE_COOLDOWN_MS = 700;
const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 40;
const SNAP_TOLERANCE = 4;

const CampusGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const cooldownRef = useRef(false);
  const isExitingRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const wheelAccumRef = useRef(0);
  const touchStartYRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const lenis = useLenis();

  const setIndex = useCallback((next: number) => {
    activeIndexRef.current = next;
    setActiveIndex(next);
  }, []);

  const lastScrollYRef = useRef(0);

  const lockScroll = useCallback(
    (entryDirection: 1 | -1) => {
      if (lockedRef.current || !lenis || !sectionRef.current) return;
      lockedRef.current = true;
      isExitingRef.current = false;
      wheelAccumRef.current = 0;
      const rect = sectionRef.current.getBoundingClientRect();
      const target = window.scrollY + rect.top;
      lenis.stop();
      lenis.scrollTo(target, { immediate: true, force: true, lock: true });
      const resetIndex = entryDirection > 0 ? 0 : sections.length - 1;
      if (activeIndexRef.current !== resetIndex) {
        activeIndexRef.current = resetIndex;
        setActiveIndex(resetIndex);
      }
    },
    [lenis]
  );

  const unlockScroll = useCallback(
    (nudgeDirection: 1 | -1 | 0 = 0) => {
      if (!lockedRef.current || !lenis) return;
      lockedRef.current = false;
      isExitingRef.current = nudgeDirection !== 0;
      lenis.start();
      if (nudgeDirection !== 0 && sectionRef.current) {
        if (exitTimerRef.current !== null) {
          window.clearTimeout(exitTimerRef.current);
        }

        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const nudge = nudgeDirection > 0 ? sectionTop + rect.height + 1 : sectionTop - 1;
        lenis.scrollTo(nudge, { duration: 0.4 });
        exitTimerRef.current = window.setTimeout(() => {
          isExitingRef.current = false;
          exitTimerRef.current = null;
        }, 700);
      }
    },
    [lenis]
  );

  const triggerCooldown = useCallback(() => {
    cooldownRef.current = true;
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, SLIDE_COOLDOWN_MS);
  }, []);

  const advance = useCallback(
    (direction: 1 | -1) => {
      const current = activeIndexRef.current;
      const next = current + direction;

      if (next < 0) {
        unlockScroll(-1);
        wheelAccumRef.current = 0;
        return false;
      }
      if (next > sections.length - 1) {
        unlockScroll(1);
        wheelAccumRef.current = 0;
        return false;
      }

      setIndex(next);
      triggerCooldown();
      wheelAccumRef.current = 0;
      return true;
    },
    [setIndex, triggerCooldown, unlockScroll]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !lenis) return;

    const tryLockOnEntry = (direction: 1 | -1) => {
      if (lockedRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const enteredSection = direction > 0
        ? rect.top <= SNAP_TOLERANCE && rect.bottom > SNAP_TOLERANCE
        : rect.bottom >= window.innerHeight - SNAP_TOLERANCE && rect.top < window.innerHeight - SNAP_TOLERANCE;

      if (!enteredSection) {
        isExitingRef.current = false;
        return;
      }
      if (isExitingRef.current) return;
      lockScroll(direction);
    };

    const shouldCaptureIncomingScroll = (direction: 1 | -1) => {
      if (lockedRef.current || isExitingRef.current || !sectionRef.current) return false;

      const rect = sectionRef.current.getBoundingClientRect();

      if (direction > 0) {
        return rect.top < window.innerHeight - SNAP_TOLERANCE && rect.bottom > SNAP_TOLERANCE;
      }

      return rect.bottom > SNAP_TOLERANCE && rect.top < window.innerHeight - SNAP_TOLERANCE;
    };

    const onScroll = (data?: { scroll?: number }) => {
      const currentY = data?.scroll ?? window.scrollY;
      const direction: 1 | -1 = currentY >= lastScrollYRef.current ? 1 : -1;
      lastScrollYRef.current = currentY;
      tryLockOnEntry(direction);
    };

    const onWheel = (e: WheelEvent) => {
      const incomingDirection: 1 | -1 = e.deltaY >= 0 ? 1 : -1;

      if (!lockedRef.current) {
        if (shouldCaptureIncomingScroll(incomingDirection)) {
          e.preventDefault();
          e.stopPropagation();
          lockScroll(incomingDirection);
          return;
        }

        tryLockOnEntry(incomingDirection);
        if (!lockedRef.current) return;
      }
      e.preventDefault();
      e.stopPropagation();

      if (cooldownRef.current) return;

      wheelAccumRef.current += e.deltaY;
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) return;

      const direction: 1 | -1 = wheelAccumRef.current > 0 ? 1 : -1;
      advance(direction);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) {
        const currentY = e.touches[0]?.clientY ?? touchStartYRef.current;
        const dir: 1 | -1 = touchStartYRef.current - currentY >= 0 ? 1 : -1;
        tryLockOnEntry(dir);
        if (!lockedRef.current) return;
      }
      e.preventDefault();
      e.stopPropagation();

      if (cooldownRef.current) return;

      const currentY = e.touches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - currentY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;

      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      if (advance(direction)) {
        touchStartYRef.current = currentY;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!lockedRef.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (!cooldownRef.current) advance(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (!cooldownRef.current) advance(-1);
      }
    };

    lenis.on('scroll', onScroll);
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', onKeyDown);

    onScroll();

    return () => {
      lenis.off('scroll', onScroll);
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
      window.removeEventListener('keydown', onKeyDown);
      if (lockedRef.current) {
        lockedRef.current = false;
        lenis.start();
      }
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, [lenis, advance, lockScroll]);

  const activeSection = sections[activeIndex];

  return (
    <section
      id="campus-gallery"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#1a1a1a]"
      style={{ isolation: 'isolate' }}
    >
      <AnimatePresence initial={false} mode="sync">
        <Slide key={activeSection.id} section={activeSection} />
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {sections.map((s, i) => (
          <span
            key={s.id}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? 28 : 8,
              backgroundColor: i === activeIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CampusGallery;
