'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const IIC_BLUE = '#21409A';
const CARD_BLUE = '#4C9BCF';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4981.882632909549!2d87.3019478!3d26.655408500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6ea070e7b18b%3A0x2959e2a3e2bf54e0!2sItahari%20International%20College!5e1!3m2!1sen!2snp!4v1777009397630!5m2!1sen!2snp';

type LinkCard = {
  label: string;
  cta: string;
  href: string;
  icon: React.ReactNode;
};

const GlobeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="8.8" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
    <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9V9.4c-1.3.1-2.5-.3-3.6-1v6.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.9V3h2.8Z" />
  </svg>
);

const InstagramIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.75-1.6 1.5V12h2.7l-.43 2.9h-2.27v7A10 10 0 0 0 22 12Z" />
  </svg>
);

const ArrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const linkCards: LinkCard[] = [
  { label: 'iic.edu.np', cta: 'Visit Website', href: 'https://iic.edu.np', icon: GlobeIcon },
  { label: 'TikTok', cta: 'Visit TikTok', href: 'https://www.tiktok.com/@iic.nepal', icon: TikTokIcon },
  { label: 'Instagram', cta: 'Visit Instagram', href: 'https://www.instagram.com/iic_nepal', icon: InstagramIcon },
  { label: 'Facebook', cta: 'Visit Facebook', href: 'https://www.facebook.com/IICNepal/', icon: FacebookIcon },
];

const Cloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 120" fill="#ffffff" aria-hidden="true" className={className}>
    <ellipse cx="55" cy="82" rx="52" ry="30" />
    <ellipse cx="105" cy="60" rx="46" ry="38" />
    <ellipse cx="150" cy="46" rx="44" ry="42" />
    <ellipse cx="200" cy="58" rx="50" ry="40" />
    <ellipse cx="248" cy="80" rx="48" ry="30" />
    <ellipse cx="150" cy="95" rx="140" ry="24" />
  </svg>
);

const CloudLayer = (
  <>
    <Cloud className="absolute right-[-2%] top-[1%] w-[18%] opacity-90" />
    <Cloud className="absolute right-[12%] top-[5%] w-[14%] opacity-80" />
    <Cloud className="absolute right-[28%] top-[0%] w-[10%] opacity-70" />
    <Cloud className="absolute left-[-2%] top-[2%] w-[14%] opacity-85" />
    <Cloud className="absolute left-[10%] top-[8%] w-[10%] opacity-70" />
  </>
);

const specializations = [
  { name: 'International Business', href: '/bba-international-business' },
  { name: 'Digital Business Management', href: '/bba-digital-business-management' },
  { name: 'Advertising and Marketing', href: '/bba-advertising-and-marketing' },
];

export default function LinksPageContent() {
  const [showBBAPopup, setShowBBAPopup] = useState(false);

  useEffect(() => {
    if (!showBBAPopup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowBBAPopup(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showBBAPopup]);

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* Hero + link cards */}
      <section className="relative">
        {/* Painted sky scene with building */}
        <div className="relative h-[46vh] min-h-[340px] sm:h-[78vh] sm:max-h-[900px] sm:min-h-[560px] w-full overflow-hidden">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#5CB6E8] via-[#8FD0F0] to-[#DCF1FB]" />

          {/* Painted clouds */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {CloudLayer}
          </div>

          {/* Building scene image (transparent sky) — scaled to fill, sides cropped */}
          <Image
            src="/images/links/bg.png"
            alt="Itahari International College campus"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="scale-[1.3] translate-y-[38%] object-cover ![object-position:center_5%] sm:scale-[1.25] sm:translate-y-[14%] sm:![object-position:center_100%]"
          />

          {/* Logo (centered on mobile, top-right on desktop) */}
          <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center sm:left-[66%] sm:top-12">
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College"
              width={380}
              height={140}
              className="h-auto w-[220px] drop-shadow-sm sm:w-[350px]"
              priority
            />
          </div>
        </div>

        {/* Blue band — desktop cards blend into it (original overlap design) */}
        <div
          style={{ backgroundColor: CARD_BLUE }}
          className="relative z-10 hidden sm:block rounded-t-none -mt-24 pt-24"
        >
          <div className="mx-auto max-w-6xl px-6 pb-20">
            <div className="grid grid-cols-4 gap-6">
              {linkCards.map((card) => (
                <div key={card.label} className="flex flex-col items-center">
                  <div
                    style={{ backgroundColor: CARD_BLUE }}
                    className="-mt-72 flex w-full flex-col items-center rounded-t-[28px] px-4 pb-8 pt-20 text-white"
                  >
                    <span className="text-white">{card.icon}</span>
                    <span className="mt-6 text-2xl font-medium">{card.label}</span>
                  </div>
                  <Link
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium shadow-sm transition-transform hover:scale-[1.03] active:scale-95 ${card.label === 'iic.edu.np'
                      ? 'bg-white text-[#171717]'
                      : 'border border-white/80 bg-transparent text-white'
                      }`}
                  >
                    {card.cta}
                    {ArrowIcon}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blue band — mobile cards (original overlap under hero) */}
        <div
          style={{ backgroundColor: CARD_BLUE }}
          className="relative z-10 block sm:hidden -mt-6 rounded-t-[32px] pt-12"
        >
          <div className="flex flex-col items-center gap-14 px-6 pb-16 pt-4">
            {linkCards.map((card) => (
              <div key={card.label} className="flex flex-col items-center text-center">
                {/* Icon */}
                <span className="text-white">{card.icon}</span>

                {/* Label */}
                <span className="mt-4 text-lg font-semibold tracking-wide text-white">
                  {card.label}
                </span>

                {/* Button/Link */}
                <Link
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-8 py-3 text-sm font-semibold shadow-md transition-transform hover:scale-[1.03] active:scale-95 ${card.label === 'iic.edu.np'
                    ? 'bg-white text-[#4C9BCF]'
                    : 'border border-white/80 bg-transparent text-white'
                    }`}
                >
                  {card.cta}
                  {ArrowIcon}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center text-4xl font-semibold tracking-wide text-[#F5B335] sm:text-5xl">Courses</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-[#58595B] sm:text-base">
          Expand your horizons with our diverse educational options designed to meet industry demands.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* BIT */}
          <Link
            href="/bsc-hons-computing"
            className="group relative flex h-[220px] sm:h-[250px] items-center text-white transition-transform hover:scale-[1.01]"
          >
            {/* Background block with sharp corners */}
            <div className="absolute inset-0 bg-[#0F74AC]" />

            {/* Student image overflowing top and bottom */}
            <div className="absolute bottom-[-24px] sm:bottom-[-32px] left-2 h-[250px] sm:h-[300px] w-[42%] sm:w-[50%] z-20 pointer-events-none">
              <Image
                src="/images/home/course1.png"
                alt="Bachelor in Information Technology student"
                fill
                priority
                sizes="(max-w-768px) 50vw, 30vw"
                className="object-contain object-bottom scale-110"
              />
            </div>

            {/* Chevron pointing right in the top-right corner */}
            <span className="absolute right-5 top-5 sm:right-6 sm:top-6 text-white opacity-80 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>

            {/* Content right-aligned */}
            <div className="relative z-10 ml-auto mr-5 sm:mr-8 flex flex-col justify-between h-full pt-12 sm:pt-14 pb-6 sm:pb-8 text-right max-w-[56%] sm:max-w-[55%]">
              <div>
                <p className="text-xs sm:text-sm font-light text-white/90">Bachelor in</p>
                <p className="text-2xl font-extrabold leading-tight tracking-wide mt-1 sm:text-4xl">
                  Information Technology
                </p>
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 font-medium">BSc (Hons) Computing</p>
            </div>
          </Link>

          {/* BBA */}
          <button
            type="button"
            onClick={() => setShowBBAPopup(true)}
            className="group relative flex h-[240px] sm:h-[250px] items-center text-white transition-transform hover:scale-[1.01] w-full text-left focus:outline-none"
          >
            {/* Background block with sharp corners */}
            <div className="absolute inset-0 bg-[#00BCD4]" />

            {/* Student image overflowing top and bottom */}
            <div className="absolute bottom-[-24px] sm:bottom-[-32px] right-0 sm:right-2 h-[240px] sm:h-[300px] w-[40%] sm:w-[50%] z-20 pointer-events-none">
              <Image
                src="/images/home/course2.png"
                alt="BBA student"
                fill
                priority
                sizes="(max-w-768px) 50vw, 30vw"
                className="object-contain object-bottom scale-110"
              />
            </div>

            {/* Chevron pointing right in the top-left corner */}
            <span className="absolute left-5 top-5 sm:left-6 sm:top-6 text-white opacity-80 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>

            {/* Content left-aligned */}
            <div className="relative z-10 mr-auto ml-5 sm:ml-8 flex flex-col justify-between h-full pt-12 sm:pt-14 pb-6 sm:pb-8 text-left max-w-[62%] sm:max-w-[55%]">
              <div>
                <p className="text-3xl font-extrabold tracking-wide sm:text-5xl">BBA</p>
                <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs font-semibold tracking-wide text-white/90">Specialisation</p>
                <ul className="mt-1.5 space-y-1 text-[11px] sm:text-xs text-white/95">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-white inline-block shrink-0"></span>
                    <span>International Business</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-white inline-block shrink-0"></span>
                    <span>Digital Business Management</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-white inline-block shrink-0"></span>
                    <span>Advertising &amp; Marketing</span>
                  </li>
                </ul>
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 font-medium">BA (Hons) Business Administration</p>
            </div>
          </button>
        </div>
      </section>

      {/* Enroll CTA */}
      <section className="bg-[#F4F7FA] py-16 text-center">
        <p className="mx-auto max-w-xl px-4 text-sm text-[#58595B] sm:text-base">
          Beginning your college journey is a very personal and sacred experience that encompasses a wide range of events compounding your growth.
        </p>
        <Link
          href="/admissions"
          className="mt-8 inline-flex items-center rounded-md bg-[#A3C644] px-10 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
        >
          Enroll Now
        </Link>

        {/* Map */}
        <div className="mx-auto mt-14 max-w-4xl px-4">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <iframe
              src={MAP_EMBED_SRC}
              title="Itahari International College location"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111' }} className="py-6 text-center text-xs text-white/80">
        © 2026 Itahari International College, All Rights Reserved
      </footer>

      {/* Specialization popup */}
      <AnimatePresence>
        {showBBAPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowBBAPopup(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Choose a specialization"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowBBAPopup(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>

              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#74C044]">
                Business Administration
              </p>
              <h3 className="mt-1 mb-5 text-2xl font-black text-[#1a1a1a] font-iic">
                Choose a Specialization
              </h3>

              <div className="flex flex-col gap-3">
                {specializations.map((spec, i) => (
                  <Link
                    key={i}
                    href={spec.href}
                    onClick={() => setShowBBAPopup(false)}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-bold text-[#1a1a1a] transition-all hover:border-[#21409A]/30 hover:bg-[#21409A] hover:text-white"
                  >
                    <span>{spec.name}</span>
                    <svg className="shrink-0 transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
