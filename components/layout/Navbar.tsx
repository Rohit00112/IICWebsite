'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../effects/Magnetic';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'Courses', href: '/courses' },
    { name: 'Admission', href: '/admissions' },
    { name: 'Innovation Lab', href: '/#innovation-lab' },
    { name: 'Life at IIC', href: '/life-at-iic' },
    { name: 'News & Events', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  const getActivePageName = () => {
    const activeLink = navLinks.find(link => link.href === pathname);
    return activeLink ? activeLink.name : 'Home';
  };

  const navigationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: navLinks.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.name,
      url: `https://iic.edu.np${link.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
      />
      {/* Background Dimmer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[140]"
          />
        )}
      </AnimatePresence>

      <nav
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-8 left-1/2 -translate-x-1/2 z-[200] flex w-full max-w-[calc(100vw-1.5rem)] flex-col items-center pointer-events-none"
        aria-label="Main Navigation"
      >

        {/* Independent Expanded Menu Rectangle */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="pointer-events-auto bg-[#141414]/75 backdrop-blur-[32px] border border-white/10 shadow-2xl w-[min(360px,calc(100vw-1.5rem))] max-h-[calc(100svh_-_6.5rem_-_env(safe-area-inset-bottom))] rounded-[28px] overflow-hidden flex flex-col mb-3"
            >
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 flex min-h-0 max-h-[calc(100svh_-_6.5rem_-_env(safe-area-inset-bottom))] flex-col overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {/* Header Label */}
                <div className="text-white/30 text-[7px] font-bold uppercase tracking-[0.4em] mb-4 sm:mb-6">
                  Menu
                </div>

                <ul
                  id="main-menu"
                  role="menu"
                  className="flex flex-col gap-1 items-start mb-5 sm:mb-7"
                >
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      role="none"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.03 }}
                    >
                      <Link
                        href={link.href}
                        role="menuitem"
                        onClick={() => setIsMenuOpen(false)}
                        className="group relative block py-0.5 focus-visible:outline-none"
                      >
                        <span
                          className={`block text-[clamp(20px,4.2svh,24px)] font-medium leading-[1.25] tracking-tight transition-all duration-300 group-hover:translate-x-1 ${hoveredIndex !== null && hoveredIndex !== index ? 'text-white/20' : 'text-white'
                            }`}
                        >
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer Info Section */}
                <div className="flex flex-col gap-1 mb-5 sm:mb-7">
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-[10px] font-medium">News</span>
                    <span className="text-white/80 text-[10px] font-medium">Events & Updates</span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-white/30 text-[10px] font-medium">Email</span>
                    <span className="text-white/80 text-[10px] font-medium text-xs truncate">info@iic.edu.np</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full min-h-11 shrink-0 px-4 py-3 bg-[#21409A] border border-white/5 rounded-lg text-white text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black/60 transition-all">
                  <span className="truncate">Schedule a Campus tour</span>
                  <span className="text-base opacity-40">→</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Independent Toggle/Close Button */}
        <motion.div
          layout
          className="pointer-events-auto"
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <Magnetic strength={0.2}>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
              animate={{
                width: isMenuOpen ? '56px' : 'min(320px, 92vw)',
                height: '56px',
                borderRadius: isMenuOpen ? '14px' : '28px'
              }}
              className="bg-[#141414]/80 backdrop-blur-[24px] border border-white/15 shadow-2xl flex items-center justify-center relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#74C044] focus-visible:outline-none"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    className="relative w-8 h-8 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="absolute w-4 h-[1.5px] bg-white rotate-45" />
                    <span className="absolute w-4 h-[1.5px] bg-white -rotate-45" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-between gap-4 px-5 sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-5 w-[72px] shrink-0 sm:w-20">
                        <Image
                          src="/images/common/iic_logo.png"
                          alt="Itahari International College"
                          fill
                          sizes="80px"
                          className="object-contain brightness-110 contrast-125"
                        />
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div className="h-4 w-[1px] shrink-0 bg-white/20" />
                      <span className="min-w-0 max-w-[82px] truncate text-right text-[8px] font-bold uppercase tracking-[0.18em] text-white/70 sm:max-w-[110px] sm:tracking-[0.2em]">
                        {getActivePageName()}
                      </span>
                      <div
                        className="w-7 h-7 shrink-0 rounded-full bg-white/5 flex flex-col gap-0.5 items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="w-3 h-[1px] bg-white" />
                        <span className="w-3 h-[1px] bg-white" />
                        <span className="w-3 h-[1px] bg-white" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </Magnetic>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
