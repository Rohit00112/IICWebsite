'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CirclePlay, X } from 'lucide-react';
import RevealText from '../../effects/RevealText';
import GlassSurprise from '../../effects/GlassSurprise';

const CAMPUS_VIDEO_EMBED_URL =
  'https://www.youtube.com/embed/uV1UTKs1hso?autoplay=1&rel=0&modestbranding=1';

const LifeHero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const closeVideo = useCallback(() => {
    setIsVideoOpen(false);
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [closeVideo, isVideoOpen]);

  return (
    <section className="relative flex min-h-[85svh] w-full items-center justify-center overflow-hidden bg-white px-4 pb-12 pt-24 md:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/lifestyle/lifestyle-hero.JPG"
          alt="Life at IIC"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Glassmorphism Card with Surprise Effect */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1100px]"
      >
        <GlassSurprise>
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 md:mb-8 px-6 py-2 rounded-full bg-[#21409A] text-white"
          >
            <span className="text-xs md:text-sm font-semibold tracking-wide">
              #LifeAtIIC
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 mb-8">
            <RevealText
              text="Life At"
              className="text-4xl md:text-6xl lg:text-[80px] font-black leading-[1.1] tracking-tight font-iic text-[#1a1a1a]"
            />
            <div className="text-[#21409A] relative inline-block">
              <RevealText
                text="IIC"
                className="text-4xl md:text-6xl lg:text-[80px] font-black leading-[1.1] tracking-tight font-iic"
                delay={0.4}
              />
              {/* Green SVG Underline */}
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1 md:-bottom-2 left-0 w-full origin-left"
                viewBox="0 0 200 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 5 10 Q 100 25 195 10" stroke="#74C044" strokeWidth="10" strokeLinecap="round" />
              </motion.svg>
            </div>
          </div>

          {/* Paragraph text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[750px] mx-auto text-[#333333] text-sm md:text-base font-medium leading-relaxed mb-8 font-iic opacity-80"
          >
            Beyond the classroom, IIC creates a supportive campus culture where students build confidence, leadership, creativity, and friendships that last.
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[#21409A] text-white rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-[#21409A] transition-all"
              >
                Schedule a Campus Tour
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2.5} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md border border-white/70 text-[#21409A] rounded-md font-semibold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-white/80 transition-all shadow-sm"
              >
                Watch Campus Video
                <CirclePlay className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2.5} />
              </button>
            </motion.div>
          </div>
        </GlassSurprise>
      </motion.div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-[10003] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md sm:px-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="campus-video-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeVideo();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl"
            >
              <button
                type="button"
                onClick={closeVideo}
                className="absolute -right-2 -top-14 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 sm:right-0"
                aria-label="Close campus video"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="overflow-hidden rounded-lg bg-black shadow-[0_32px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/20">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={CAMPUS_VIDEO_EMBED_URL}
                    title="Campus Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <h2 id="campus-video-title" className="sr-only">
                Campus Video
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LifeHero;
