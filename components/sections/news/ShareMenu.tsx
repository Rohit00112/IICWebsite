'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareMenuProps {
  url: string;
  title: string;
  description?: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ url, title, description }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [igInfo, setIgInfo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const absoluteUrl = typeof window !== 'undefined'
    ? new URL(url, window.location.origin).toString()
    : url;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setIgInfo(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setIgInfo(false); }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggle = (e: React.MouseEvent) => {
    stop(e);
    setOpen(o => !o);
    setIgInfo(false);
  };

  const shareFacebook = (e: React.MouseEvent) => {
    stop(e);
    const quote = description ? `${title}\n\n${description}` : title;
    const u = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl)}&quote=${encodeURIComponent(quote)}`;
    window.open(u, 'fb-share', 'width=626,height=620,noopener,noreferrer');
    setOpen(false);
  };

  const copyLink = async (e: React.MouseEvent) => {
    stop(e);
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1200);
    } catch {}
  };

  return (
    <div ref={ref} className="relative" onClick={stop}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Share this article"
        className="text-gray-400 hover:text-[#21409A] transition-colors p-1 -m-1"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute right-0 bottom-full mb-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-2 z-30"
          >
            <button
              type="button"
              role="menuitem"
              onClick={shareFacebook}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1877F2]/5 text-left transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </span>
              <span className="text-sm font-bold text-[#1a1a1a]">Facebook</span>
            </button>

            <div className="h-px bg-gray-100 my-1.5" />

            <button
              type="button"
              role="menuitem"
              onClick={copyLink}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-left transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[#21409A] shrink-0">
                {copied ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                )}
              </span>
              <span className="text-sm font-bold text-[#1a1a1a]">{copied ? 'Link copied' : 'Copy link'}</span>
            </button>

            {igInfo && (
              <p className="text-[11px] text-gray-500 px-3 pt-2 pb-1 leading-relaxed">
                Link copied. Open Instagram and paste it into a Story, DM, or your bio.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareMenu;
