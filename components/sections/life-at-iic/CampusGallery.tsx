'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Image from 'next/image';

type StoryContent = {
  title: string;
  description: string;
};

type StorySide = {
  image?: string;
  alt?: string;
  content?: StoryContent;
};

type StoryPage = {
  id: string;
  accent: string;
  left: StorySide;
  right: StorySide;
};

const storyPages: StoryPage[] = [
  {
    id: 'knowledge-hub',
    accent: '#0A2520',
    left: {
      image: '/images/home/iic-lifestyle 3.png',
      alt: 'The Knowledge Hub at IIC',
    },
    right: {
      content: {
        title: 'The Knowledge Hub',
        description:
          "Our state-of-the-art library offers a serene environment for deep work and collaborative study. Equipped with extensive digital archives, quiet reading zones, and dedicated group study pods, it's designed to support your academic journey.",
      },
    },
  },
  {
    id: 'technology-labs',
    accent: '#0B1120',
    left: {
      content: {
        title: 'Advanced Technology Labs',
        description:
          'Experience hands-on learning in our dedicated computing and IT laboratories. Outfitted with the latest hardware and enterprise software, these spaces allow you to innovate, code, and build the technologies of tomorrow.',
      },
    },
    right: {
      image: '/images/home/iic-lifestyle 2.png',
      alt: 'Advanced Technology Labs at IIC',
    },
  },
  {
    id: 'recreation-wellness',
    accent: '#2E401B',
    left: {
      image: '/images/lifestyle/lifestyle.png',
      alt: 'Recreation and wellness spaces at IIC',
    },
    right: {
      content: {
        title: 'Recreation & Wellness',
        description:
          'Balance is key to success. Our campus features modern recreational facilities, including a multi-purpose sports hall, fitness center, and vibrant student lounges, ensuring you stay active and refreshed.',
      },
    },
  },
];

const SLIDE_DURATION_MS = 900;
const SNAP_TOLERANCE = 24;
const TOUCH_THRESHOLD = 42;

const leftPanelVariants: Variants = {
  enter: (direction: 1 | -1) => ({
    y: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    y: '0%',
  },
  exit: (direction: 1 | -1) => ({
    y: direction > 0 ? '-100%' : '100%',
  }),
};

const rightPanelVariants: Variants = {
  enter: (direction: 1 | -1) => ({
    y: direction > 0 ? '-100%' : '100%',
  }),
  center: {
    y: '0%',
  },
  exit: (direction: 1 | -1) => ({
    y: direction > 0 ? '100%' : '-100%',
  }),
};

const contentVariants: Variants = {
  enter: {
    opacity: 0,
    y: 28,
    filter: 'blur(10px)',
  },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(8px)',
  },
};

const preventPageScroll = (event: Event) => {
  if (event.cancelable) event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const StoryPanel = ({
  accent,
  direction,
  index,
  page,
  side,
  variants,
  position,
}: {
  accent: string;
  direction: 1 | -1;
  index: number;
  page: StoryPage;
  side: StorySide;
  variants: Variants;
  position: 'left' | 'right';
}) => {
  const hasImage = Boolean(side.image);
  const isRight = position === 'right';

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.92, ease: [0.76, 0, 0.24, 1] }}
      className={`absolute h-1/2 w-full overflow-hidden md:top-0 md:h-full md:w-1/2 ${
        isRight ? 'top-1/2 md:left-1/2' : 'left-0 top-0'
      }`}
    >
      {hasImage ? (
        <div className="group relative h-full w-full overflow-hidden bg-[#07100d]">
          <motion.div
            key={`${page.id}-${position}-image`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.04 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={side.image as string}
              alt={side.alt ?? ''}
              fill
              loading={index === 0 ? 'eager' : 'lazy'}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/12 to-black/20" />
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: accent }}
          />
        </div>
      ) : (
        <div className="relative flex h-full w-full items-center bg-[#070b12] px-7 py-10 md:px-14 lg:px-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-85"
            style={{
              background: `radial-gradient(circle at ${
                isRight ? '18% 20%' : '82% 20%'
              }, ${accent}44, transparent 38%), linear-gradient(135deg, #050706 0%, #0d1413 48%, #060915 100%)`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent_32%,transparent_68%,rgba(255,255,255,0.04))]" />

          {side.content && (
            <motion.div
              key={`${page.id}-${position}-content`}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.58, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-xl"
            >
              <h3 className="mb-5 font-sora text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                {side.content.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-white/72 md:text-lg">
                {side.content.description}
              </p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const CampusGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const lenis = useLenis();

  const activePage = storyPages[activeIndex];

  const scrollToSectionTop = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;

    if (lenis) {
      lenis.scrollTo(sectionTop, { immediate: true, force: true });
    } else {
      window.scrollTo(0, sectionTop);
    }
  }, [lenis]);

  const lockCooldown = useCallback(() => {
    cooldownRef.current = true;

    if (cooldownTimerRef.current !== null) {
      window.clearTimeout(cooldownTimerRef.current);
    }

    cooldownTimerRef.current = window.setTimeout(() => {
      cooldownRef.current = false;
      cooldownTimerRef.current = null;
    }, SLIDE_DURATION_MS);
  }, []);

  const setPage = useCallback(
    (nextIndex: number, nextDirection: 1 | -1) => {
      const boundedIndex = Math.min(storyPages.length - 1, Math.max(0, nextIndex));

      activeIndexRef.current = boundedIndex;
      setDirection(nextDirection);
      setActiveIndex(boundedIndex);
      lockCooldown();
    },
    [lockCooldown]
  );

  const handleStep = useCallback(
    (event: Event, nextDirection: 1 | -1) => {
      if (prefersReducedMotion) return false;

      const section = sectionRef.current;
      if (!section) return false;

      const rect = section.getBoundingClientRect();
      const isPinned = Math.abs(rect.top) <= SNAP_TOLERANCE;

      if (!isPinned) {
        return false;
      }

      const currentIndex = activeIndexRef.current;
      const nextIndex = currentIndex + nextDirection;
      const canMovePanels = nextIndex >= 0 && nextIndex < storyPages.length;

      if (!canMovePanels) return false;

      preventPageScroll(event);

      if (cooldownRef.current) return true;

      scrollToSectionTop();
      setPage(nextIndex, nextDirection);
      return true;
    },
    [
      prefersReducedMotion,
      scrollToSectionTop,
      setPage,
    ]
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const nextDirection: 1 | -1 = event.deltaY >= 0 ? 1 : -1;
      handleStep(event, nextDirection);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - currentY;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      const nextDirection: 1 | -1 = deltaY >= 0 ? 1 : -1;

      if (handleStep(event, nextDirection)) {
        touchStartYRef.current = currentY;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const downKeys = ['ArrowDown', 'PageDown', ' '];
      const upKeys = ['ArrowUp', 'PageUp'];

      if (!downKeys.includes(event.key) && !upKeys.includes(event.key)) return;

      const nextDirection: 1 | -1 = downKeys.includes(event.key) ? 1 : -1;
      handleStep(event, nextDirection);
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener('touchmove', handleTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });

      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }
    };
  }, [handleStep]);

  if (prefersReducedMotion) {
    return (
      <section
        id="campus-gallery"
        ref={sectionRef}
        className="bg-[#f7faf8] px-6 py-24 text-[#111827] md:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 font-sora text-sm font-bold uppercase tracking-[0.2em] text-[#007a5e]">
              Campus Gallery
            </p>
            <h2 className="font-sora text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Life moves differently here.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {storyPages.map((page) => {
              const content = page.left.content ?? page.right.content;
              const image = page.left.image ?? page.right.image;

              return (
                <article
                  key={page.id}
                  className="relative aspect-[4/5] overflow-hidden rounded-lg bg-black text-white"
                >
                  {image && (
                    <Image
                      src={image}
                      alt={page.left.alt ?? page.right.alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  {content && (
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-sora text-2xl font-bold leading-tight">
                        {content.title}
                      </h3>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="campus-gallery"
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-[#060908] text-white"
      style={{ isolation: 'isolate' }}
    >
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),transparent_18%,transparent_72%,rgba(0,0,0,0.48))]" />

      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <div key={activePage.id} className="absolute inset-0">
          <StoryPanel
            accent={activePage.accent}
            direction={direction}
            index={activeIndex}
            page={activePage}
            side={activePage.left}
            variants={leftPanelVariants}
            position="left"
          />
          <StoryPanel
            accent={activePage.accent}
            direction={direction}
            index={activeIndex}
            page={activePage}
            side={activePage.right}
            variants={rightPanelVariants}
            position="right"
          />
        </div>
      </AnimatePresence>

      <div className="pointer-events-none absolute left-6 top-8 z-30 md:left-10 md:top-10">
        <p className="mb-3 font-sora text-xs font-bold uppercase tracking-[0.26em] text-[#74C044] md:text-sm">
          Campus Gallery
        </p>
        <div className="h-[2px] w-28 overflow-hidden bg-white/18">
          <div
            className="h-full origin-left bg-[#74C044] transition-transform duration-700"
            style={{
              transform: `scaleX(${(activeIndex + 1) / storyPages.length})`,
            }}
          />
        </div>
      </div>

    </section>
  );
};

export default CampusGallery;
