'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ObfuscatedEmailText } from '@/components/common/ObfuscatedEmail';

const VIDEO_SRC = '/videos/iic.mp4';
const POSTER_SRC = '/images/common/tower_block.JPG';

const ScrollScaleVideo = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const stageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({ ...prev, visible: false }));
  };

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = useCallback(() => setIsFullscreen(false), []);

  useEffect(() => {
    if (!isFullscreen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isFullscreen, closeFullscreen]);

  return (
    <section className="relative w-full bg-black">
      <div
        ref={stageRef}
        onClick={openFullscreen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer sm:aspect-[2327/1080] md:cursor-none"
      >
        {/* Side Text Overlays */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[45%] z-20 hidden xl:flex items-center pl-[4%] pr-32 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none"
        >
          <div className="text-white text-6xl font-light leading-[1.1] tracking-tight font-iic">
            A place where <br />
            <span className="text-[#74C044] font-semibold">education</span> and <br />
            <span className="text-[#74C044] font-semibold">innovation</span> get connected.
          </div>
        </motion.div>

        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[45%] z-20 hidden xl:flex flex-col justify-center items-end pr-[4%] pl-32 bg-gradient-to-l from-black/75 via-black/40 to-transparent pointer-events-none"
        >
          <div className="flex flex-col items-end gap-6 max-w-md">
            {/* Address card */}
            <div className="relative w-full">
              <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#74C044] to-transparent" />
              <div className="flex items-start gap-4 justify-end">
                <div className="text-right">
                  <span className="text-[#74C044] text-[11px] font-bold tracking-[0.4em] block mb-2 font-iic">
                    Address
                  </span>
                  <p className="text-white text-2xl font-light leading-snug font-iic tracking-tight">
                    Sundarharaicha-4, Dulari
                  </p>
                  <p className="text-white/70 text-xl font-light font-iic">
                    Morang, Nepal
                  </p>
                </div>
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#74C044]/15 border border-[#74C044]/40 flex items-center justify-center backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#74C044" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-gradient-to-l from-[#74C044]/60 to-transparent" />

            {/* Contact + Hours stack */}
            <div className="flex items-start gap-4 justify-end w-full">
              <div className="text-right">
                <span className="text-[#74C044]/90 text-[11px] font-bold tracking-[0.4em] block mb-2 font-iic">
                  Contact
                </span>
                <p className="text-white text-base font-light font-iic tracking-tight">
                  +977 9801003030
                </p>
                <p className="text-white/70 text-base font-light font-iic">
                  <ObfuscatedEmailText mailbox="info" />
                </p>
              </div>
              <div className="shrink-0 w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
            </div>

            <div className="w-24 h-px bg-gradient-to-l from-[#74C044]/60 to-transparent" />

            <div className="flex items-start gap-4 justify-end w-full">
              <div className="text-right">
                <span className="text-[#74C044]/90 text-[11px] font-bold tracking-[0.4em] block mb-2 font-iic">
                  Visit Hours
                </span>
                <p className="text-white text-base font-light font-iic tracking-tight">
                  Sun – Sat · 7:00 AM – 5:00 PM
                </p>
              </div>
              <div className="shrink-0 w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative h-full w-full overflow-hidden group">

          <video
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
          />

          {/* Edge radial blur mask */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 pointer-events-none opacity-100 fluid-edge-mask"
          />

          {/* Vignette & Global Dark Overlay */}
          <div className="absolute inset-0 z-10 bg-black/10 pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

          {/* Framing lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
          <div className="absolute top-0 left-0 h-full w-[1px] bg-white/10 z-20" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-white/10 z-20" />
        </div>

        {/* Custom cursor pill — follows entire section */}
        <AnimatePresence>
          {cursor.visible && !isFullscreen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                left: cursor.x,
                top: cursor.y,
                translateX: '-50%',
                translateY: '-50%',
              }}
              className="absolute z-50 pointer-events-none flex items-center justify-center"
            >
              <div className="px-6 py-3 rounded-full bg-[#74C044] text-white text-[10px] font-bold tracking-[0.2em] shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                WATCH VIDEO
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <FullscreenOverlay src={VIDEO_SRC} poster={POSTER_SRC} onClose={closeFullscreen} />
        )}
      </AnimatePresence>
    </section>
  );
};

interface FullscreenOverlayProps {
  src: string;
  poster: string;
  onClose: () => void;
}

const FullscreenOverlay = ({ src, poster, onClose }: FullscreenOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const resetHideTimeout = useCallback(() => {
    setShowControls(true);
    scheduleHideTimeout();
  }, [scheduleHideTimeout]);

  useEffect(() => {
    scheduleHideTimeout();
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [scheduleHideTimeout]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
    resetHideTimeout();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    resetHideTimeout();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
    resetHideTimeout();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={resetHideTimeout}
      className="fixed inset-0 z-[10001] bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors border border-white/10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </motion.button>

      {/* Custom Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-12 z-[110] bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="relative w-full h-1 bg-white/20 rounded-full mb-5 md:mb-8 group cursor-pointer">
            <div
              className="absolute top-0 left-0 h-full bg-[#74C044] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleScrub}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          <div className="flex items-center justify-between text-white gap-4">
            <div className="flex items-center gap-4 md:gap-8">
              {/* Play/Pause */}
              <button onClick={togglePlay} className="hover:text-[#74C044] transition-colors">
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3l14 9-14 9V3z"></path>
                  </svg>
                )}
              </button>

              {/* Time */}
              <div className="text-[10px] sm:text-[12px] font-mono tracking-wider opacity-60">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              {/* Mute/Unmute */}
              <button onClick={toggleMute} className="hover:text-[#74C044] transition-colors">
                {isMuted ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                    <path d="M9 9l-5 5H2v-4h2l5 5z"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                )}
              </button>

              {/* Branding */}
              <div className="hidden md:flex items-center gap-4 opacity-40">
                <div className="w-[1px] h-4 bg-white" />
                <span className="text-[10px] font-bold tracking-[0.3em]">IIC College Film</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

export default ScrollScaleVideo;
