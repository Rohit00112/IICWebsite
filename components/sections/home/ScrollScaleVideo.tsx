'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const VIDEO_SRC = '/videos/iic.mp4';
const POSTER_SRC = '/images/home/tower_block.png';

const ScrollScaleVideo = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor(prev => ({ ...prev, visible: false }));
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

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
    <section className="relative w-full mt-20 md:mt-32 overflow-hidden group">
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        onClick={openFullscreen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-video md:aspect-[1920/864] overflow-hidden bg-white shadow-2xl cursor-none"
      >
        <video
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Framing Lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-white/10 z-20" />

        {/* Custom Cursor Button */}
        <AnimatePresence>
          {cursor.visible && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ 
                left: cursor.x, 
                top: cursor.y,
                translateX: '-50%',
                translateY: '-50%'
              }}
              className="fixed md:absolute z-50 pointer-events-none flex items-center justify-center"
            >
              <div className="px-6 py-3 rounded-full bg-[#74C044] text-white text-[10px] font-bold tracking-[0.2em] shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                WATCH VIDEO
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetHideTimeout = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    resetHideTimeout();
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={resetHideTimeout}
      className="fixed inset-0 z-[10001] bg-white flex items-center justify-center"
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
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
        onClick={onClose}
        className="absolute top-8 right-8 z-[110] p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors border border-white/10"
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
        className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-[110] bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="relative w-full h-1 bg-white/20 rounded-full mb-8 group cursor-pointer">
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

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-8">
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
              <div className="text-[12px] font-mono tracking-wider opacity-60">
                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-8">
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
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">IIC Campus Film</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollScaleVideo;
