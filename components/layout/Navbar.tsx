'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Magnetic from '../effects/Magnetic';

type NavLink = {
  name: string;
  href: string;
  external?: boolean;
  label: string;
  marker: string;
  accent: string;
};

const navLinks: NavLink[] = [
  { name: 'Home', href: '/', label: 'Start', marker: '01', accent: '#74C044' },
  { name: 'About', href: '/about-us', label: 'College', marker: '02', accent: '#6EA8FE' },
  { name: 'Courses', href: '/courses', label: 'Study', marker: '03', accent: '#21409A' },
  { name: 'Admission', href: '/admissions', label: 'Apply', marker: '04', accent: '#ED1C24' },
  { name: 'Scholarships', href: '/scholarships', label: 'Awards', marker: '05', accent: '#74C044' },
  { name: 'Innovation Lab', href: 'https://innovation.iic.edu.np', external: true, label: 'Build', marker: '↗', accent: '#8EEA4D' },
  { name: 'Life at IIC', href: '/life-at-iic', label: 'Culture', marker: '06', accent: '#F4B63F' },
  { name: 'News & Events', href: '/news', label: 'Updates', marker: '07', accent: '#6EA8FE' },
  { name: 'Contact', href: '/contact', label: 'Reach', marker: '08', accent: '#74C044' },
];

const dockLinks = navLinks.filter((link) => (
  link.name === 'Courses' ||
  link.name === 'Admission' ||
  link.name === 'Scholarships'
));

const getAbsoluteUrl = (href: string) =>
  href.startsWith('http') ? href : `https://iic.edu.np${href}`;

const navigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: navLinks.map((link, index) => ({
    '@type': 'SiteNavigationElement',
    position: index + 1,
    name: link.name,
    url: getAbsoluteUrl(link.href),
  })),
};

const isActivePath = (pathname: string | null, link: NavLink) => {
  if (link.external) return false;
  if (link.href === '/') return pathname === '/';
  return Boolean(pathname?.startsWith(link.href));
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const activeLink = useMemo(() => {
    return navLinks.find((link) => isActivePath(pathname, link)) ?? navLinks[0];
  }, [pathname]);

  const previewLink = useMemo(() => {
    return navLinks.find((link) => link.name === previewName) ?? activeLink;
  }, [activeLink, previewName]);

  const springTransition = shouldReduceMotion
    ? { duration: 0.12 }
    : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.8 };

  const panelTransition = shouldReduceMotion
    ? { duration: 0.12 }
    : { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.08 : 0.2 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-[140] bg-[#07101f]/40 backdrop-blur-[4px]"
          />
        )}
      </AnimatePresence>

      <nav
        className="fixed bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-1/2 z-[200] flex w-full max-w-[calc(100vw-1rem)] -translate-x-1/2 flex-col items-center pointer-events-none sm:bottom-7"
        aria-label="Main Navigation"
      >
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="creative-navigation-panel"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.96, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.97, filter: 'blur(10px)' }}
              transition={panelTransition}
              className="pointer-events-auto mb-3 w-[min(1040px,calc(100vw-1rem))] overflow-hidden rounded-[34px] border border-white/16 bg-[#101923]/90 shadow-[0_30px_96px_rgba(0,0,0,0.42)] backdrop-blur-[32px]"
            >
              <div className="max-h-[calc(100svh_-_7.2rem_-_env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain p-3 [scrollbar-width:none] sm:p-4 [&::-webkit-scrollbar]:hidden">
                <div className="grid gap-3 lg:grid-cols-[310px_minmax(0,1fr)]">
                  <motion.aside
                    layout
                    className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.045))] p-5 sm:p-6"
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-1"
                      style={{ backgroundColor: previewLink.accent }}
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="relative h-9 w-[176px] overflow-hidden">
                        <Image
                          src="/images/common/iic_logo_white.png"
                          alt="Itahari International College"
                          fill
                          sizes="176px"
                          className="object-contain brightness-110 contrast-125"
                        />
                      </div>
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black text-white shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
                        style={{ backgroundColor: previewLink.accent }}
                      >
                        {previewLink.marker}
                      </span>
                    </div>

                    <div className="mt-9">
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/38">
                        {previewLink.label}
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.h2
                          key={previewLink.name}
                          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                          transition={{ duration: shouldReduceMotion ? 0.08 : 0.2 }}
                          className="mt-3 text-[clamp(2.2rem,8vw,4.4rem)] font-black leading-[0.95] tracking-normal text-white"
                        >
                          {previewLink.name}
                        </motion.h2>
                      </AnimatePresence>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-2">
                      {navLinks.slice(0, 6).map((link) => {
                        const active = link.name === previewLink.name;

                        return (
                          <button
                            key={link.name}
                            type="button"
                            onClick={() => setPreviewName(link.name)}
                            className={`h-2 rounded-full transition-all ${
                              active ? 'col-span-2' : 'bg-white/12 hover:bg-white/24'
                            }`}
                            style={active ? { backgroundColor: link.accent } : undefined}
                            aria-label={link.name}
                          />
                        );
                      })}
                    </div>

                    <Link
                      href={previewLink.href}
                      target={previewLink.external ? '_blank' : undefined}
                      rel={previewLink.external ? 'noopener noreferrer' : undefined}
                      prefetch={previewLink.external ? false : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="group mt-8 flex min-h-14 items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-black text-[#162033] shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
                    >
                      <span>Open {previewLink.name}</span>
                      <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </motion.aside>

                  <div className="grid gap-3">
                    <div className="rounded-[28px] border border-white/12 bg-white/[0.045] p-3 sm:p-4">
                      <motion.ul
                        id="main-menu"
                        role="menu"
                        className="grid gap-2 md:grid-cols-2 xl:grid-cols-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: shouldReduceMotion ? 0 : 0.028,
                              delayChildren: shouldReduceMotion ? 0 : 0.05,
                            },
                          },
                        }}
                      >
                        {navLinks.map((link) => {
                          const active = isActivePath(pathname, link);
                          const previewing = previewLink.name === link.name;

                          return (
                            <motion.li
                              key={link.name}
                              role="none"
                              variants={{
                                hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 },
                                visible: { opacity: 1, y: 0, scale: 1 },
                              }}
                              transition={{ duration: shouldReduceMotion ? 0.08 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <Link
                                href={link.href}
                                role="menuitem"
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                prefetch={link.external ? false : undefined}
                                onMouseEnter={() => setPreviewName(link.name)}
                                onFocus={() => setPreviewName(link.name)}
                                onClick={() => setIsMenuOpen(false)}
                                className={`group relative flex min-h-[86px] flex-col justify-between overflow-hidden rounded-[22px] border p-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] ${
                                  active
                                    ? 'border-[#74C044]/42 bg-[#74C044]/13 text-white shadow-[0_14px_38px_rgba(116,192,68,0.14)]'
                                    : previewing
                                      ? 'border-white/20 bg-white/[0.08] text-white'
                                      : 'border-white/8 bg-white/[0.035] text-white/76 hover:border-white/18 hover:bg-white/[0.07] hover:text-white'
                                }`}
                              >
                                <span
                                  className="absolute inset-x-4 top-0 h-[3px] rounded-b-full opacity-80 transition-transform duration-300 group-hover:scale-x-100"
                                  style={{ backgroundColor: link.accent, transform: previewing || active ? 'scaleX(1)' : 'scaleX(0.36)' }}
                                />
                                <span className="flex items-center justify-between gap-3">
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/38">
                                    {link.label}
                                  </span>
                                  <span className="text-xs font-black text-white/34">
                                    {link.marker}
                                  </span>
                                </span>
                                <span className="mt-5 text-[17px] font-black leading-tight tracking-normal">
                                  {link.name}
                                </span>
                              </Link>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
                      <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex min-h-16 items-center justify-between rounded-[22px] bg-[#21409A] px-5 py-4 text-sm font-black text-white shadow-[0_18px_46px_rgba(33,64,154,0.26)] transition-all hover:bg-[#1A2B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
                      >
                        <span>Book a College Visit</span>
                        <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                      <Link
                        href="/admissions"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#74C044]/25 bg-[#74C044]/12 px-5 py-4 text-sm font-black text-[#b6f28d] transition-all hover:bg-[#74C044]/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
                      >
                        <span>Apply Now</span>
                        <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          transition={springTransition}
          className="pointer-events-auto"
        >
          <Magnetic strength={0.14}>
            <motion.div
              layout
              className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[#101923]/88 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-[28px]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]" />
              <div className="relative flex min-h-[64px] w-[min(910px,calc(100vw-1rem))] items-center gap-2 px-3 sm:px-4">
                <Link
                  href="/"
                  aria-label="Itahari International College home"
                  className="flex shrink-0 items-center rounded-2xl px-2 py-2 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
                >
                  <div className="relative h-9 w-[168px] overflow-hidden sm:w-[186px]">
                    <Image
                      src="/images/common/iic_logo_white.png"
                      alt="Itahari International College"
                      fill
                      sizes="(max-width: 640px) 168px, 186px"
                      className="object-contain brightness-110 contrast-125"
                      priority
                    />
                  </div>
                </Link>

                <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
                  {dockLinks.map((link) => {
                    const active = isActivePath(pathname, link);

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`relative rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] ${
                          active ? 'text-white' : 'text-white/46 hover:text-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="navbar-dock-active"
                            className="absolute inset-0 rounded-full border border-white/14 bg-white/[0.08]"
                            transition={springTransition}
                          />
                        )}
                        <span className="relative">{link.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="ml-auto flex min-w-0 items-center gap-2">
                  <div className="hidden min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 md:flex">
                    <span
                      className="h-2.5 w-2.5 rounded-full shadow-[0_0_16px_rgba(116,192,68,0.75)]"
                      style={{ backgroundColor: activeLink.accent }}
                    />
                    <span className="max-w-[150px] truncate text-[10px] font-black uppercase tracking-[0.18em] text-white/58">
                      {activeLink.name}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => {
                      setPreviewName(null);
                      setIsMenuOpen((open) => !open);
                    }}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-menu"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    className="group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]"
                  >
                    <span className="relative h-5 w-5" aria-hidden="true">
                      <motion.span
                        animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        transition={springTransition}
                        className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-white"
                      />
                      <motion.span
                        animate={isMenuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                        transition={springTransition}
                        className="absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-white/80"
                      />
                      <motion.span
                        animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        transition={springTransition}
                        className="absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-white"
                      />
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Magnetic>
        </motion.div>
      </nav>
    </>
  );
}
