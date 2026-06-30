'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  type Variants,
  useReducedMotion,
} from 'framer-motion';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import useIsMobileLike from '@/components/effects/useIsMobileLike';

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
    accent: '#21409A',
    left: {
      image: '/images/common/library.JPG',
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
      image: '/images/common/lab.JPG',
      alt: 'Advanced Technology Labs at IIC',
    },
  },
  {
    id: 'recreation-wellness',
    accent: '#58595B',
    left: {
      image: '/images/lifestyle/holi.jpg',
      alt: 'Students celebrating Holi at IIC',
    },
    right: {
      content: {
        title: 'Student Life & Wellbeing',
        description:
          'Balance is key to success. Beyond classes, college life brings together student clubs, community events, creative activities, and comfortable common areas where you can connect, recharge, and feel supported.',
      },
    },
  },
];

const getStoryContent = (page: StoryPage) => page.left.content ?? page.right.content;

const getStoryImage = (page: StoryPage) => {
  if (page.left.image) {
    return {
      src: page.left.image,
      alt: page.left.alt ?? '',
    };
  }

  if (page.right.image) {
    return {
      src: page.right.image,
      alt: page.right.alt ?? '',
    };
  }

  return null;
};

const SLIDE_DURATION_MS = 620;
const BOUNDARY_HOLD_MS = SLIDE_DURATION_MS + 360;
const SNAP_TOLERANCE = 28;
const TOUCH_THRESHOLD = 42;
const WHEEL_GESTURE_IDLE_MS = 320;
const WHEEL_DELTA_THRESHOLD = 8;

const EASE_EXPO = [0.83, 0, 0.17, 1] as const;

// per-panel layered motion — image and content travel at different
// offsets so the slide reads as depth, not one flat block sliding.
type PanelCustom = { direction: 1 | -1; isImage: boolean };

const panelVariants: Variants = {
  enter: ({ direction, isImage }: PanelCustom) => ({
    y: direction > 0 ? '100%' : '-100%',
    scale: isImage ? 1.12 : 1,
  }),
  center: {
    y: '0%',
    scale: 1,
    transition: {
      y: { duration: 0.9, ease: EASE_EXPO },
      scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: ({ direction, isImage }: PanelCustom) => ({
    // content trails the image slightly for a parallax lag
    y: direction > 0 ? (isImage ? '-100%' : '-72%') : isImage ? '100%' : '72%',
    scale: isImage ? 1.08 : 1,
    transition: {
      y: { duration: 0.9, ease: EASE_EXPO },
      scale: { duration: 0.9, ease: EASE_EXPO },
    },
  }),
};

const preventPageScroll = (event: Event) => {
  if (event.cancelable) event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const contentVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.18 },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const StoryPanel = ({
  accent,
  index,
  page,
  side,
  position,
  direction,
}: {
  accent: string;
  index: number;
  page: StoryPage;
  side: StorySide;
  position: 'left' | 'right';
  direction: 1 | -1;
}) => {
  const hasImage = Boolean(side.image);
  const isRight = position === 'right';
  const mobilePlacement = hasImage
    ? isRight
      ? 'top-[58%] h-[42%]'
      : 'top-0 h-[42%]'
    : isRight
      ? 'top-[42%] h-[58%]'
      : 'top-0 h-[58%]';
  const desktopPlacement = isRight
    ? hasImage
      ? 'md:left-[56%] md:w-[44%] 2xl:left-1/2 2xl:w-1/2'
      : 'md:left-[44%] md:w-[56%] 2xl:left-1/2 2xl:w-1/2'
    : hasImage
      ? 'md:left-0 md:w-[44%] 2xl:w-1/2'
      : 'md:left-0 md:w-[56%] 2xl:w-1/2';

  return (
    <motion.div
      custom={{ direction, isImage: hasImage }}
      variants={panelVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className={`absolute left-0 w-full overflow-hidden will-change-transform md:top-0 md:h-full ${mobilePlacement} ${desktopPlacement}`}
    >
      {hasImage ? (
        <div className="group relative h-full w-full overflow-hidden bg-[#07100d]">
          <motion.div
            key={`${page.id}-${position}-image`}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 7, ease: 'linear' }}
            className="absolute inset-0"
          >
            <Image
              src={side.image as string}
              alt={side.alt ?? ''}
              fill
              loading={index === 0 ? 'eager' : 'lazy'}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1536px) 44vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/12 to-black/20" />
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: accent }}
          />
        </div>
      ) : (
        <div className="relative flex h-full w-full items-center bg-[#070b12] px-6 py-9 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at ${
                isRight ? '14% 16%' : '86% 16%'
              }, ${accent}38, transparent 46%), linear-gradient(135deg, #050706 0%, #0c1412 50%, #060912 100%)`,
            }}
          />
          {/* fine grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage:
                'radial-gradient(120% 100% at 50% 0%, black, transparent 78%)',
            }}
          />
          {/* soft accent glow drifting in */}
          <motion.div
            key={`${page.id}-${position}-glow`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute h-72 w-72 rounded-full blur-[120px]"
            style={{
              backgroundColor: accent,
              top: '12%',
              [isRight ? 'left' : 'right']: '8%',
            }}
          />

          {side.content && (
            <motion.div
              key={`${page.id}-${position}-content`}
              variants={contentVariants}
              initial="hidden"
              animate="show"
              className="relative z-10 max-w-full lg:max-w-xl"
            >
              {/* eyebrow accent rule */}
              <motion.div
                variants={contentItemVariants}
                className="mb-7 flex items-center"
              >
                <span className="h-px w-12" style={{ backgroundColor: accent === '#0B1120' ? '#74C044' : accent }} />
              </motion.div>

              <motion.h3
                variants={contentItemVariants}
                className="mb-6 break-words font-iic text-4xl font-black leading-[1.0] tracking-tight text-white sm:text-5xl lg:text-6xl 2xl:text-7xl"
              >
                {side.content.title}
              </motion.h3>
              <motion.p
                variants={contentItemVariants}
                className="max-w-md text-base leading-relaxed text-white/65 md:text-lg"
              >
                {side.content.description}
              </motion.p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const StaticCollegeGallery = ({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) => (
  <section
    id="college-gallery"
    ref={sectionRef}
    className="bg-[#07100d] px-4 py-14 text-white sm:px-6 sm:py-16 md:bg-[#f7faf8] md:px-6 md:py-24 md:text-[#111827]"
  >
    <div className="mx-auto max-w-[1440px]">
      <div className="mb-10 max-w-3xl md:mb-12">
        <p className="mb-4 font-iic text-xs font-bold tracking-[0.2em] text-[#74C044] md:text-sm">
          College Gallery
        </p>
        <h2 className="font-iic text-4xl font-black leading-tight tracking-tight md:text-6xl">
          Life moves differently here.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {storyPages.map((page) => {
          const content = getStoryContent(page);
          const image = getStoryImage(page);

          return (
            <article
              key={page.id}
              className="overflow-hidden rounded-lg bg-white/[0.06] text-white ring-1 ring-white/10 shadow-2xl shadow-black/20 md:bg-white md:text-[#111827] md:ring-black/5 md:shadow-[0_22px_54px_rgba(15,23,42,0.12)]"
            >
              {image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black md:aspect-[4/5]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent md:hidden" />
                </div>
              )}

              {content && (
                <div className="p-5 sm:p-6 md:p-7">
                  <div
                    className="mb-4 h-px w-12"
                    style={{
                      backgroundColor:
                        page.accent === '#0B1120' ? '#74C044' : page.accent,
                    }}
                  />
                  <h3 className="font-iic text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-2xl">
                    {content.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/68 md:text-[#58595B]">
                    {content.description}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const CollegeGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef<number | null>(null);
  const boundaryHoldUntilRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const wheelGestureTimerRef = useRef<number | null>(null);
  const wheelGestureActiveRef = useRef(false);
  const touchStartedPinnedRef = useRef(false);
  const touchContentChangedRef = useRef(false);
  const touchStartYRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobileLike = useIsMobileLike();
  const shouldUseStaticGallery = isMobileLike || prefersReducedMotion;
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

  const isSectionPinned = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return false;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
      Math.abs(rect.top) <= SNAP_TOLERANCE &&
      Math.abs(rect.bottom - viewportHeight) <= SNAP_TOLERANCE
    );
  }, []);

  const markWheelGesture = useCallback(() => {
    const isFreshGesture = !wheelGestureActiveRef.current;
    wheelGestureActiveRef.current = true;

    if (wheelGestureTimerRef.current !== null) {
      window.clearTimeout(wheelGestureTimerRef.current);
    }

    wheelGestureTimerRef.current = window.setTimeout(() => {
      wheelGestureActiveRef.current = false;
      wheelGestureTimerRef.current = null;
    }, WHEEL_GESTURE_IDLE_MS);

    return isFreshGesture;
  }, []);

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

  const setBoundaryPage = useCallback((nextIndex: number, nextDirection: 1 | -1) => {
    if (activeIndexRef.current === nextIndex) return;

    activeIndexRef.current = nextIndex;
    setDirection(nextDirection);
    setActiveIndex(nextIndex);
  }, []);

  const syncBoundaryPage = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top >= viewportHeight) {
      setBoundaryPage(0, 1);
      return;
    }

    if (rect.bottom <= 0) {
      setBoundaryPage(storyPages.length - 1, -1);
    }
  }, [setBoundaryPage]);

  const keepSectionPinnedWhileChangingContent = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY >= lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;

    const isAtGalleryViewport =
      rect.top <= SNAP_TOLERANCE &&
      rect.bottom >= viewportHeight - SNAP_TOLERANCE;
    const shouldHoldForDirection = isScrollingDown
      ? activeIndexRef.current < storyPages.length - 1
      : activeIndexRef.current > 0;

    if (
      isAtGalleryViewport &&
      shouldHoldForDirection &&
      Math.abs(rect.top) > 1
    ) {
      scrollToSectionTop();
    }
  }, [scrollToSectionTop]);

  const setPage = useCallback(
    (nextIndex: number, nextDirection: 1 | -1) => {
      const boundedIndex = Math.min(storyPages.length - 1, Math.max(0, nextIndex));

      activeIndexRef.current = boundedIndex;
      boundaryHoldUntilRef.current =
        boundedIndex === 0 || boundedIndex === storyPages.length - 1
          ? Date.now() + BOUNDARY_HOLD_MS
          : 0;
      setDirection(nextDirection);
      setActiveIndex(boundedIndex);
      lockCooldown();
    },
    [lockCooldown]
  );

  const handleStep = useCallback(
    (
      event: Event,
      nextDirection: 1 | -1,
      canAdvanceContent = true,
      isWheelGestureContinuation = false
    ) => {
      if (prefersReducedMotion) return false;

      if (!isSectionPinned()) return false;

      const currentIndex = activeIndexRef.current;
      const nextIndex = currentIndex + nextDirection;
      const canChangeContent = nextIndex >= 0 && nextIndex < storyPages.length;

      if (!canChangeContent) {
        const shouldHoldBoundary =
          cooldownRef.current ||
          Date.now() < boundaryHoldUntilRef.current ||
          !canAdvanceContent ||
          isWheelGestureContinuation;

        if (shouldHoldBoundary) {
          preventPageScroll(event);
          scrollToSectionTop();
          return true;
        }

        return false;
      }

      preventPageScroll(event);

      if (!canAdvanceContent || cooldownRef.current) return true;

      scrollToSectionTop();
      setPage(nextIndex, nextDirection);
      return true;
    },
    [isSectionPinned, prefersReducedMotion, scrollToSectionTop, setPage]
  );

  useEffect(() => {
    if (shouldUseStaticGallery) return;

    syncBoundaryPage();

    const handleWheel = (event: WheelEvent) => {
      const isFreshGesture = markWheelGesture();
      if (Math.abs(event.deltaY) < WHEEL_DELTA_THRESHOLD) return;
      const nextDirection: 1 | -1 = event.deltaY >= 0 ? 1 : -1;
      // advance continuously while scrolling; cooldown paces the steps
      handleStep(event, nextDirection, true, !isFreshGesture);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
      touchStartedPinnedRef.current = isSectionPinned();
      touchContentChangedRef.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - currentY;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      const nextDirection: 1 | -1 = deltaY >= 0 ? 1 : -1;
      const canAdvanceContent =
        touchStartedPinnedRef.current && !touchContentChangedRef.current;

      if (handleStep(event, nextDirection, canAdvanceContent)) {
        if (canAdvanceContent) touchContentChangedRef.current = true;
        touchStartYRef.current = currentY;
      }
    };

    const handleTouchEnd = () => {
      touchStartedPinnedRef.current = false;
      touchContentChangedRef.current = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const downKeys = ['ArrowDown', 'PageDown', ' '];
      const upKeys = ['ArrowUp', 'PageUp'];

      if (event.repeat) return;
      if (!downKeys.includes(event.key) && !upKeys.includes(event.key)) return;

      const nextDirection: 1 | -1 = downKeys.includes(event.key) ? 1 : -1;
      handleStep(event, nextDirection);
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    const handleScroll = () => {
      syncBoundaryPage();
      keepSectionPinnedWhileChangingContent();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener('touchmove', handleTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener('touchend', handleTouchEnd, { capture: true });
    window.addEventListener('touchcancel', handleTouchEnd, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('touchend', handleTouchEnd, { capture: true });
      window.removeEventListener('touchcancel', handleTouchEnd, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });

      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }

      if (wheelGestureTimerRef.current !== null) {
        window.clearTimeout(wheelGestureTimerRef.current);
      }

      wheelGestureActiveRef.current = false;
    };
  }, [
    handleStep,
    isSectionPinned,
    keepSectionPinnedWhileChangingContent,
    markWheelGesture,
    shouldUseStaticGallery,
    syncBoundaryPage,
  ]);

  if (shouldUseStaticGallery) {
    return <StaticCollegeGallery sectionRef={sectionRef} />;
  }

  return (
    <section
      id="college-gallery"
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-[#060908] text-white"
      style={{ isolation: 'isolate' }}
    >
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),transparent_18%,transparent_72%,rgba(0,0,0,0.48))]" />

      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <StoryPanel
          key={`${activePage.id}-left`}
          accent={activePage.accent}
          index={activeIndex}
          page={activePage}
          side={activePage.left}
          position="left"
          direction={direction}
        />
        <StoryPanel
          key={`${activePage.id}-right`}
          accent={activePage.accent}
          index={activeIndex}
          page={activePage}
          side={activePage.right}
          position="right"
          direction={direction}
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute left-6 top-8 z-30 md:left-10 md:top-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#74C044] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#74C044]" />
          </span>
          <p className="font-iic text-xs font-bold tracking-[0.26em] text-[#74C044] md:text-sm">
            College Gallery
          </p>
        </div>
        <div className="h-[2px] w-28 overflow-hidden bg-white/18">
          <div
            className="h-full origin-left bg-[#74C044] transition-transform duration-700 ease-out"
            style={{
              transform: `scaleX(${(activeIndex + 1) / storyPages.length})`,
            }}
          />
        </div>
      </div>

      {/* vertical slide dots */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex md:right-10">
        {storyPages.map((page, dotIndex) => (
          <span
            key={page.id}
            className="rounded-full transition-all duration-500 ease-out"
            style={{
              width: dotIndex === activeIndex ? '8px' : '6px',
              height: dotIndex === activeIndex ? '24px' : '6px',
              backgroundColor:
                dotIndex === activeIndex ? '#74C044' : 'rgba(255,255,255,0.28)',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CollegeGallery;
