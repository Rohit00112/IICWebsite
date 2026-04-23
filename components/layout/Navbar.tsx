'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TopBar from './TopBar';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Admission', href: '/admission' },
    { name: 'Innovation Lab', href: '/innovation-lab' },
    { name: 'News & Events', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Reusable Top Contact Bar */}
      <TopBar />

      {/* Main Header / Navigation Area */}
      <div className="w-full relative">
        {/* The button is now fixed and global, outside this relative container */}
      </div>

      <motion.button
        onClick={toggleMenu}
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
          const centerX = left + width / 2;
          const centerY = top + height / 2;
          const distanceX = clientX - centerX;
          const distanceY = clientY - centerY;

          // Subtler pull (0.15 multiplier)
          setButtonPos({ x: distanceX * 0.15, y: distanceY * 0.15 });
        }}
        onMouseLeave={() => setButtonPos({ x: 0, y: 0 })}
        animate={{ x: buttonPos.x, y: buttonPos.y }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 15,
          mass: 0.1,
          restDelta: 0.001
        }}
        className={`fixed right-6 md:right-12 top-28 md:top-36 z-[200] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) p-2 rounded-md text-white active:scale-95 ${isMenuOpen
          ? 'rotate-180 bg-transparent shadow-none'
          : 'rotate-0 bg-[#1a1a1a]/95 shadow-xl hover:bg-black backdrop-blur-xl'
          }`}
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
      >
        <div className="w-8 h-8 flex flex-col justify-center items-center relative">
          <span
            className={`block w-7 h-[2.5px] bg-white rounded-full transition-all duration-500 absolute ${isMenuOpen ? 'rotate-45' : '-translate-y-2'
              }`}
          />
          <span
            className={`block w-7 h-[2.5px] bg-white rounded-full transition-all duration-500 absolute ${isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
          />
          <span
            className={`block w-7 h-[2.5px] bg-white rounded-full transition-all duration-500 absolute ${isMenuOpen ? '-rotate-45' : 'translate-y-2'
              }`}
          />
        </div>
      </motion.button>

      {/* Floating Menu Overlay - Refined for layer consistency */}
      <div
        className={`fixed inset-0 z-[150] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" />

        <div
          className={`fixed top-28 md:top-36 right-6 md:right-12 w-[90%] md:w-[450px] bg-[#2a2d34]/95 rounded-2xl shadow-2xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4'}`}
          style={{ transformOrigin: 'top right' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col px-8 md:px-12 pt-4 md:pt-6 pb-6 md:pb-8">
            {/* Branding Section inside Overlay */}
            <div className="flex items-center mb-6 border-b border-white/10 pb-6 pr-12">
              <div className="relative h-10 md:h-12 w-full">
                <Image
                  src="/images/iic_logo.png"
                  alt="IIC Branding"
                  fill
                  sizes="(max-width: 768px) 300px, 450px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <div className="text-gray-400 text-[10px] font-bold tracking-[0.3em] mb-4 uppercase">Menu</div>

            {/* Nav Links with Roll-up Scroll Effect */}
            <div className="relative mb-8 flex flex-col items-start px-4">
              <ul
                className="flex flex-col w-full"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {navLinks.map((link, index) => (
                  <li
                    key={link.name}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className="relative w-full py-1"
                  >
                    <Link
                      href={link.href}
                      className="block relative h-[28px] md:h-[36px] overflow-hidden"
                      onClick={toggleMenu}
                    >
                      <motion.div
                        animate={{ y: hoveredIndex === index ? "-50%" : "0%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col h-[200%]"
                      >
                        {/* Copy 1: Initial (Gray out others on hover) */}
                        <span className={`h-1/2 flex items-center text-xl md:text-2xl font-medium tracking-tight transition-colors duration-500 ${(hoveredIndex !== null && hoveredIndex !== index) ? 'text-white/20' : 'text-white'}`}>
                          {link.name}
                        </span>
                        {/* Copy 2: Hovered (Always White) */}
                        <span className="h-1/2 flex items-center text-xl md:text-2xl font-medium tracking-tight text-white">
                          {link.name}
                        </span>
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="border-t border-white/10 pt-6 pb-4">
              <div className="mb-3">
                <div className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-widest">Phone</div>
                <div className="text-white text-sm font-semibold opacity-90">+977 9869258083, +977 9801003030</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-widest">Email</div>
                <div className="text-white text-sm font-semibold opacity-90 underline decoration-white/20">info@iic.edu.np</div>
              </div>
              <div className="mb-4">
                <div className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-widest">Location</div>
                <div className="text-white text-sm font-semibold opacity-90 leading-relaxed">Sundarharaicha-4, Dulari, Morang</div>
              </div>

              {/* CTA Button */}
              <a
                href="#"
                className="flex items-center justify-between bg-[#21409A] hover:opacity-90 text-white px-6 py-4 rounded-md font-bold transition-all shadow-lg group w-full text-sm"
              >
                <span>Schedule a Campus Tour</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
