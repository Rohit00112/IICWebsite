'use client';

import React from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const alumniStory = {
  name: 'Utsav Dhungana',
  quote: 'The final year project at IIC was instrumental in my career development. It allowed me to apply my knowledge and skills to a real-world problem, showcasing my abilities and preparing me for the workforce.',
  image: '/images/home/utsav.png',
  position: 'Flutter Developer',
  company: 'Himalayan Techies',
  classYear: 'Class of 2022',
};

const ProspectusSection = () => {
  const brochureUrl = 'https://iic.edu.np/pdf/iic_brochure.pdf';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(brochureUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="admission" className="relative w-full overflow-hidden bg-[#21409A] py-14 sm:py-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <AnimeStagger
        className="relative z-10 mx-auto flex max-w-[1440px] flex-col px-4 sm:px-6"
        selector=".prospectus-panel"
        staggerDelay={160}
        translateY={44}
        duration={900}
      >
        <div className="prospectus-panel mb-10 max-w-4xl md:mb-14" style={{ willChange: 'transform, opacity' }}>
          <AnimeReveal
            as="h2"
            text="Student Success Stories"
            className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl md:mb-6 md:text-[64px] lg:text-[72px] font-iic"
            staggerFrom="first"
          />
          <p className="max-w-3xl text-base font-medium leading-relaxed text-white/70 md:text-xl">
            Hear directly from those who have walked our halls and gone on to achieve remarkable things.
          </p>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Left Side: Success Stories */}
          <div className="prospectus-panel h-full" style={{ willChange: 'transform, opacity' }}>
            <div className="relative flex h-full flex-col rounded-[28px] bg-white p-6 shadow-[0_32px_80px_rgba(5,12,40,0.22)] sm:p-8 md:rounded-[36px] md:p-12">
            <div className="text-6xl font-black leading-none text-[#21409A]/16 font-serif md:text-7xl">
              &ldquo;
            </div>

            <p className="mt-3 text-lg font-semibold italic leading-[1.65] text-[#344054] sm:text-xl md:text-[25px]">
              &ldquo;{alumniStory.quote}&rdquo;
            </p>

            <div className="mt-auto flex flex-col gap-5 border-t border-gray-100 pt-7 sm:flex-row sm:items-center sm:gap-7">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white bg-[#EDF2FF] shadow-[0_16px_36px_rgba(16,24,40,0.18)] md:h-40 md:w-40">
                <Image
                  src={alumniStory.image}
                  alt={alumniStory.name}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="scale-[1.12] object-cover object-[43%_18%] [transform-origin:50%_18%]"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-iic text-2xl font-black leading-tight text-[#101828] md:text-3xl">
                  {alumniStory.name}
                </h4>
                <p className="mt-1 text-base font-bold leading-relaxed text-gray-500 md:text-lg">
                  {alumniStory.position} at {alumniStory.company}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#21409A]/8 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#21409A]">
                    {alumniStory.classYear}
                  </span>
                  <span className="rounded-full bg-[#74C044]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#3C8A22]">
                    Alumni Voice
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Right Side: Prospectus Form */}
          <div className="prospectus-panel h-full" style={{ willChange: 'transform, opacity' }}>
          <div className="relative flex h-full flex-col rounded-[24px] md:rounded-[36px] bg-white/[0.07] backdrop-blur-2xl border border-white/15 p-5 sm:p-8 md:p-11 shadow-[0_40px_120px_rgba(5,12,40,0.45)]">
            {/* Accent top hairline */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#74C044]/70 to-transparent" />
            {/* Corner glow */}
            <div aria-hidden className="pointer-events-none absolute -top-px -right-px h-28 w-28 rounded-tr-[36px] bg-[radial-gradient(circle_at_top_right,rgba(116,192,68,0.35),transparent_70%)]" />

            {/* Form Header */}
            <div className="relative flex items-start gap-4 sm:gap-5 mb-8 md:mb-9">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#74C044] to-[#5da233] text-white shadow-[0_10px_30px_rgba(116,192,68,0.45)]">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 font-iic">
                  Get the Prospectus
                </h3>
                <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed">
                  Download details about our programmes, college, and fees.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <form className="relative flex flex-1 flex-col space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="ml-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-white/55">Full Name</label>
                <div className="group relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#74C044]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-white/12 bg-white/[0.06] py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-white/30 transition-all focus:border-[#74C044]/60 focus:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#74C044]/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-white/55">Email Address</label>
                <div className="group relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#74C044]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" /></svg>
                  </span>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-2xl border border-white/12 bg-white/[0.06] py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-white/30 transition-all focus:border-[#74C044]/60 focus:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#74C044]/40"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-white/55">Programme</label>
                  <div className="group relative">
                    <select className="w-full appearance-none cursor-pointer rounded-2xl border border-white/12 bg-white/[0.06] py-3.5 pl-4 pr-10 text-sm sm:text-base text-white/70 transition-all focus:border-[#74C044]/60 focus:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#74C044]/40 [&>option]:bg-[#21409A] [&>option]:text-white">
                      <option>Select a Programme</option>
                      <option>BSc (Hons) Computing</option>
                      <option>BBA (Hons) Business Administration</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-[#74C044]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-white/55">Contact Number</label>
                  <div className="group relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#74C044]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.5 1.21l-1.7.85a11 11 0 005.5 5.5l.85-1.7a1 1 0 011.2-.5l3.6 1.2a1 1 0 01.69.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" /></svg>
                    </span>
                    <input
                      type="tel"
                      placeholder="+977 9800000000"
                      className="w-full rounded-2xl border border-white/12 bg-white/[0.06] py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-white/30 transition-all focus:border-[#74C044]/60 focus:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-[#74C044]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative mt-auto w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#74C044] to-[#62a838] py-4 sm:py-[18px] text-base sm:text-lg font-bold text-white shadow-[0_16px_40px_rgba(116,192,68,0.4)] transition-all hover:shadow-[0_20px_55px_rgba(116,192,68,0.55)] hover:brightness-105 active:scale-[0.99]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative inline-flex items-center justify-center gap-2">
                  Download Prospectus Now
                  <svg className="h-5 w-5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </span>
              </button>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-white/45">
                <svg className="h-4 w-4 text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                No spam. Your details stay private — PDF opens instantly.
              </div>
            </form>
          </div>
        </div>
        </div>
      </AnimeStagger>
    </section>
  );
};

export default ProspectusSection;
