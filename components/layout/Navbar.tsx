'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
      { name: 'Life at IIC', href: '/life-at-iic' },
    ],
  },
  {
    name: 'Academics',
    children: [
      { name: 'Courses', href: '/courses' },
      { name: 'Admission', href: '/admissions' },
      { name: 'Scholarships', href: '/scholarships' },
    ],
  },
  { name: 'Innovation Lab', href: 'https://innovation.iic.edu.np', external: true },
  { name: 'News & Events', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

const allLeafLinks: LeafLink[] = navItems.flatMap((item) =>
  item.children ? item.children : [{ name: item.name, href: item.href!, external: item.external }]
);

const getAbsoluteUrl = (href: string) =>
  href.startsWith('http') ? href : `https://iic.edu.np${href}`;

const navigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: allLeafLinks.map((link, index) => ({
    '@type': 'SiteNavigationElement',
    position: index + 1,
    name: link.name,
    url: getAbsoluteUrl(link.href),
  })),
};

const EASE = [0.22, 1, 0.36, 1] as const;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
      />

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
        className="fixed top-0 inset-x-0 z-[200] bg-white/70 backdrop-blur-2xl backdrop-saturate-200 border-b border-white/60 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.8),0_8px_32px_-8px_rgba(33,64,154,0.22)]"
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2.5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Itahari International College — Home"
            className="relative h-12 w-[160px] shrink-0 sm:h-14 sm:w-[188px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] rounded"
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
                      className={`group relative flex items-center gap-1 text-[12.5px] font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none ${
                        active ? 'text-[#21409A]' : 'text-[#1e2733] hover:text-[#21409A]'
                      }`}
                    >
                      {item.name}
                      {item.external && <span aria-hidden className="text-[9px] opacity-60">↗</span>}
                      <span
                        aria-hidden
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#74C044] transition-all duration-300 ${
                          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
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
                    className={`group relative flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none ${
                      active ? 'text-[#21409A]' : 'text-[#1e2733] hover:text-[#21409A]'
                    }`}
                  >
                    {item.name}
                    <motion.span
                      aria-hidden
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[8px] opacity-70"
                    >
                      ▾
                    </motion.span>
                    <span
                      aria-hidden
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#74C044] transition-all duration-300 ${
                        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
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
            className="relative flex h-10 w-10 items-center justify-center rounded-full lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
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

        {/* Mobile dropdown panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mx-auto mt-3 max-w-[1400px] px-5 sm:px-8">
                <div className="max-h-[calc(100svh-6rem)] overflow-y-auto overscroll-contain rounded-3xl border border-black/5 bg-white p-4 shadow-[0_20px_50px_-15px_rgba(33,64,154,0.4)] ring-1 ring-black/5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <ul className="flex flex-col gap-0.5">
                  {navItems.map((item, index) => {
                    if (!item.children) {
                      return (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 + index * 0.04 }}
                        >
                          <Link
                            href={item.href!}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                            prefetch={item.external ? false : undefined}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-bold uppercase tracking-[0.1em] transition-colors ${
                              isActive(item.href) ? 'bg-[#74C044]/12 text-[#21409A]' : 'text-[#1e2733] hover:bg-[#21409A]/6'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {item.name}
                              {item.external && <span aria-hidden className="text-xs opacity-60">↗</span>}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    }
                    const accOpen = openAccordion === item.name;
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + index * 0.04 }}
                      >
                        <button
                          type="button"
                          aria-expanded={accOpen}
                          onClick={() => setOpenAccordion(accOpen ? null : item.name)}
                          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-bold uppercase tracking-[0.1em] text-[#1e2733] transition-colors hover:bg-[#21409A]/6"
                        >
                          {item.name}
                          <motion.span
                            aria-hidden
                            animate={{ rotate: accOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-xs opacity-70"
                          >
                            ▾
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {accOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="overflow-hidden pl-3"
                            >
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                                      isActive(child.href) ? 'text-[#74C044]' : 'text-[#6b7280] hover:text-[#21409A]'
                                    }`}
                                  >
                                    {child.name}
                                    {isActive(child.href) && (
                                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#74C044]" />
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
      </motion.header>
    </>
  );
};

export default Navbar;
