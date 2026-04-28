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
      document.body.style.overflow = 'unset';
    }
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
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center w-full pointer-events-none"
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
              className="pointer-events-auto bg-[#141414]/70 backdrop-blur-[32px] border border-white/10 shadow-2xl w-[min(380px,92vw)] max-h-[75vh] rounded-[32px] overflow-hidden flex flex-col mb-4"
            >
              <div className="px-9 pt-10 pb-8 flex flex-col h-full">
                {/* Header Label */}
                <div className="text-white/30 text-[8px] font-bold uppercase tracking-[0.4em] mb-8">
                  Menu
                </div>

                <ul 
                  id="main-menu"
                  role="menu"
                  className="flex flex-col gap-0 items-start mb-10"
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
                        className="group relative block py-0.5 overflow-hidden focus-visible:outline-none"
                      >
                        <div className="relative h-[44px] overflow-hidden">
                          <motion.div
                            animate={{
                              y: hoveredIndex === index ? '-44px' : '0px'
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.76, 0, 0.24, 1]
                            }}
                            className="flex flex-col h-[80px]"
                          >
                            <span className={`text-[28px] font-medium tracking-tight h-[44px] flex items-center transition-all duration-300 ${hoveredIndex !== null && hoveredIndex !== index ? 'text-white/20' : 'text-white'
                              }`}>
                              {link.name}
                            </span>
                            <span className="text-[28px] font-medium tracking-tight h-[44px] flex items-center text-white">
                              {link.name}
                            </span>
                          </motion.div>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Footer Info Section */}
                <div className="flex flex-col gap-1.5 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-[11px] font-medium">News</span>
                    <span className="text-white/80 text-[11px] font-medium">Events & Updates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-[11px] font-medium">Email</span>
                    <span className="text-white/80 text-[11px] font-medium">info@iic.edu.np</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-[11px] font-medium">Phone</span>
                    <span className="text-white/80 text-[11px] font-medium">+977 123 456789</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full py-3.5 bg-[#21409A] border border-white/5 rounded-lg text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black/60 transition-all">
                  <span>Schedule a Campus tour</span>
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
                width: isMenuOpen ? '64px' : 'min(360px, 92vw)',
                height: '64px',
                borderRadius: isMenuOpen ? '16px' : '32px'
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
                    className="relative w-10 h-10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="absolute w-5 h-[1.5px] bg-white rotate-45" />
                    <span className="absolute w-5 h-[1.5px] bg-white -rotate-45" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-between px-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-7 w-28">
                        <Image
                          src="/images/common/iic_logo.png"
                          alt="Itahari International College"
                          fill
                          sizes="112px"
                          className="object-contain brightness-110 contrast-125"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="h-5 w-[1px] bg-white/20" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/70 min-w-[60px] text-right">
                        {getActivePageName()}
                      </span>
                      <div 
                        className="w-8 h-8 rounded-full bg-white/5 flex flex-col gap-1 items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="w-3.5 h-[1px] bg-white" />
                        <span className="w-3.5 h-[1px] bg-white" />
                        <span className="w-3.5 h-[1px] bg-white" />
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


