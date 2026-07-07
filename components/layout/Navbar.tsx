'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import JsonLd from '@/components/common/JsonLd';
import { buildSiteNavigationNode, withContext } from '@/lib/seo-schema';

type LeafLink = { name: string; href: string; external?: boolean };
type NavItem =
  | { name: string; href: string; external?: boolean; children?: undefined }
  | { name: string; children: LeafLink[]; href?: undefined; external?: undefined };

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    children: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Our Infrastructure', href: '/our-infrastructure' },
      { name: 'Industry Exposure', href: '/industry-exposure' },
      { name: 'Life at IIC', href: '/life-at-iic' },
      { name: 'Alumni Network', href: '/alumni' },
    ],
  },
  {
    name: 'Academics',
    children: [
      { name: 'Courses', href: '/courses' },
      { name: 'Admission', href: '/admissions' },
      { name: 'Scholarship', href: '/scholarship' },
      { name: 'Research Committee', href: '/research-management-committee' },
    ],
  },
  { name: 'Innovation Lab', href: 'https://innovation.iic.edu.np', external: true },
  { name: 'News & Events', href: '/news-and-events' },
  { name: 'Contact', href: '/contact-us' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const desktopNavItemClass = (active: boolean, gap = 'gap-1') =>
  `group relative flex items-center ${gap} rounded-full px-3.5 py-2 text-[12.5px] font-bold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] ${
    active
      ? 'bg-[#21409A] text-white shadow-[0_12px_28px_-18px_rgba(33,64,154,0.85)] ring-1 ring-[#21409A]/25'
      : 'text-[#1e2733] hover:bg-[#21409A]/8 hover:text-[#21409A]'
  }`;

const dropdownIconClass = (emphasized: boolean, inActiveNav = false) =>
  `flex h-5 w-5 items-center justify-center rounded-full ring-1 transition-colors ${
    inActiveNav
      ? 'bg-white/20 text-white ring-white/35'
      : emphasized
      ? 'bg-[#21409A] text-white ring-[#21409A]'
      : 'bg-[#21409A]/10 text-[#21409A] ring-[#21409A]/20 group-hover:bg-[#21409A] group-hover:text-white group-hover:ring-[#21409A]'
  }`;

const mobileDropdownIconClass = (emphasized: boolean) =>
  `flex h-7 w-7 items-center justify-center rounded-full ring-1 transition-colors ${
    emphasized
      ? 'bg-[#21409A] text-white ring-[#21409A]'
      : 'bg-[#21409A]/10 text-[#21409A] ring-[#21409A]/20 group-hover:bg-[#21409A] group-hover:text-white group-hover:ring-[#21409A]'
  }`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Show navbar only after scrolling past ~80% of viewport height (past hero)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMenuOpen(false);
      setOpenDropdown(null);
      setOpenAccordion(null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href?: string) => !!href && !href.startsWith('http') && href === pathname;
  const isItemActive = (item: NavItem) =>
    item.children ? item.children.some((c) => isActive(c.href)) : isActive(item.href);

  const handleEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      <JsonLd data={withContext(buildSiteNavigationNode())} />

      {/* Mobile backdrop dimmer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[140] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        aria-label="Main Navigation"
        initial={false}
        animate={{
          y: visible ? '0%' : '-110%',
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed left-3 right-3 top-3 z-[200] rounded-full border border-white/70 bg-white/[0.88] backdrop-blur-2xl backdrop-saturate-200 shadow-[0_14px_40px_-24px_rgba(33,64,154,0.65)] [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.85),0_14px_40px_-24px_rgba(33,64,154,0.65)] sm:left-5 sm:right-5 lg:inset-x-0 lg:top-0 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-white/60 lg:bg-white/70 lg:shadow-none lg:[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.8),0_8px_32px_-8px_rgba(33,64,154,0.22)]"
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-3 py-2 sm:px-4 lg:px-5 lg:py-2.5 xl:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Itahari International College — Home"
            className="relative h-10 w-[138px] shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] sm:h-12 sm:w-[160px] lg:h-12 lg:w-[160px] xl:h-14 xl:w-[188px]"
          >
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College"
              fill
              sizes="188px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const active = isItemActive(item);
              if (!item.children) {
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href!}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      prefetch={item.external ? false : undefined}
                      className={desktopNavItemClass(active)}
                    >
                      {item.name}
                      {item.external && <span aria-hidden className="text-[9px] opacity-70">↗</span>}
                    </Link>
                  </li>
                );
              }
              const open = openDropdown === item.name;
              return (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleEnter(item.name)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="menu"
                    onClick={() => setOpenDropdown(open ? null : item.name)}
                    onFocus={() => handleEnter(item.name)}
                    className={desktopNavItemClass(active, 'gap-2')}
                  >
                    {item.name}
                    <motion.span
                      aria-hidden
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={dropdownIconClass(open, active)}
                    >
                      <ChevronDown className="h-3.5 w-3.5 stroke-[3]" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.ul
                        role="menu"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="absolute left-1/2 top-[calc(100%+1.1rem)] z-[60] -translate-x-1/2 min-w-[210px] rounded-2xl border border-black/5 bg-white p-2 shadow-[0_20px_50px_-15px_rgba(33,64,154,0.4)] ring-1 ring-black/5"
                      >
                        {item.children.map((child, i) => (
                          <motion.li
                            key={child.name}
                            role="none"
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.03 + i * 0.04 }}
                          >
                            <Link
                              href={child.href}
                              role="menuitem"
                              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] ${
                                isActive(child.href)
                                  ? 'bg-[#74C044]/12 text-[#21409A]'
                                  : 'text-[#1e2733] hover:bg-[#21409A]/6 hover:text-[#21409A]'
                              }`}
                            >
                              {child.name}
                              {isActive(child.href) && (
                                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#74C044]" />
                              )}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#21409A]/8 text-[#21409A] transition-colors hover:bg-[#21409A]/12 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
          >
            <span className="sr-only">Menu</span>
            <motion.span
              aria-hidden
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -4 }}
              className="absolute h-[2px] w-5 rounded-full bg-[#21409A]"
            />
            <motion.span
              aria-hidden
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="absolute h-[2px] w-5 rounded-full bg-[#21409A]"
            />
            <motion.span
              aria-hidden
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 4 }}
              className="absolute h-[2px] w-5 rounded-full bg-[#21409A]"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="fixed inset-x-0 top-[76px] z-[190] px-3 sm:top-[88px] sm:px-5 lg:hidden"
          >
            <div className="mx-auto max-w-md">
              <div className="max-h-[calc(100svh-5.75rem)] overflow-y-auto overscroll-contain rounded-[28px] border border-white/70 bg-white/[0.96] p-2.5 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.55)] ring-1 ring-[#21409A]/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, index) => {
                    if (!item.children) {
                      return (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 + index * 0.035 }}
                        >
                          <Link
                            href={item.href!}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                            prefetch={item.external ? false : undefined}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex min-h-12 items-center justify-between rounded-[20px] px-4 py-3 text-[14px] font-black uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] ${
                              isActive(item.href) ? 'bg-[#74C044]/12 text-[#21409A]' : 'text-[#1e2733] hover:bg-[#21409A]/6'
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-1.5">
                              <span className="truncate">{item.name}</span>
                              {item.external && <span aria-hidden className="text-xs opacity-60">↗</span>}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    }
                    const accOpen = openAccordion === item.name;
                    const accActive = isItemActive(item);
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + index * 0.035 }}
                      >
                        <button
                          type="button"
                          aria-expanded={accOpen}
                          onClick={() => setOpenAccordion(accOpen ? null : item.name)}
                          className={`group flex min-h-12 w-full items-center justify-between rounded-[20px] px-4 py-3 text-[14px] font-black uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] ${
                            accActive || accOpen ? 'bg-[#74C044]/12 text-[#21409A]' : 'text-[#1e2733] hover:bg-[#21409A]/6'
                          }`}
                        >
                          <span className="truncate pr-3">{item.name}</span>
                          <motion.span
                            aria-hidden
                            animate={{ rotate: accOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className={mobileDropdownIconClass(accOpen)}
                          >
                            <ChevronDown className="h-4 w-4 stroke-[3]" />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {accOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="overflow-hidden px-2 py-1"
                            >
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex min-h-10 items-center justify-between rounded-2xl px-4 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] ${
                                      isActive(child.href) ? 'bg-[#21409A]/8 text-[#21409A]' : 'text-[#5d6675] hover:bg-[#21409A]/6 hover:text-[#21409A]'
                                    }`}
                                  >
                                    <span className="truncate pr-3">{child.name}</span>
                                    {isActive(child.href) && (
                                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#74C044]" />
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
