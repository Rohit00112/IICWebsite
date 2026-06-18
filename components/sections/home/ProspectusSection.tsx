'use client';

import React from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const ProspectusSection = () => {
  const brochureUrl = 'https://iic.edu.np/pdf/iic_brochure.pdf';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(brochureUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="admission" className="relative w-full py-16 sm:py-24 md:py-32 bg-[#21409A] overflow-hidden">
      <AnimeStagger
        className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-24 items-center"
        selector=".prospectus-panel"
        staggerDelay={160}
        translateY={44}
        duration={900}
      >
        
        {/* Left Side: Success Stories */}
        <div className="prospectus-panel w-full lg:w-1/2" style={{ willChange: 'transform, opacity' }}>
          <AnimeReveal
            as="h2"
            text="Student Success Stories"
            className="text-3xl sm:text-4xl md:text-[56px] font-bold text-white mb-4 md:mb-6 font-iic"
            staggerFrom="first"
          />
          <p className="text-white/70 text-base md:text-xl font-medium leading-relaxed mb-8 md:mb-12 max-w-xl">
            Hear directly from those who have walked our halls and gone on to achieve remarkable things.
          </p>

          {/* Testimonial Card */}
          <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-12 relative shadow-2xl">
            <div className="text-5xl md:text-6xl text-[#21409A] font-black absolute top-6 left-6 md:top-8 md:left-8 opacity-20 font-serif">
              &ldquo;
            </div>
            <div className="relative z-10">
              <p className="text-gray-700 text-base md:text-xl font-medium leading-relaxed italic mb-8 md:mb-10 pt-4">
                &ldquo;The practical approach to learning at Itahari International College completely transformed my understanding of software development. The facilities and the faculty support are truly world-class, preparing me perfectly for my current role.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                  <Image
                    src="/images/profiles/sarah.png"
                    alt="Aarav Sharma"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base sm:text-xl font-bold text-[#1a1a1a] font-iic">Aarav Sharma</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">BSc Computing Alumni, Software Engineer at TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Prospectus Form */}
        <div className="prospectus-panel w-full lg:w-1/2" style={{ willChange: 'transform, opacity' }}>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] md:rounded-[40px] p-5 sm:p-8 md:p-12 shadow-2xl relative">
            {/* Form Header */}
            <div className="flex items-start gap-4 sm:gap-6 mb-8 md:mb-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#74C044]/20 flex items-center justify-center text-[#74C044] shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 font-iic">
                  Get the Prospectus
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                  Download details about our programmes, campus, and fees.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-white/80 text-xs sm:text-sm font-bold tracking-wider ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#74C044]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-xs sm:text-sm font-bold tracking-wider ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#74C044]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-xs sm:text-sm font-bold tracking-wider ml-1">Programme of Interest</label>
                <select className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base text-white/50 focus:outline-none focus:ring-2 focus:ring-[#74C044]/50 transition-all appearance-none cursor-pointer">
                  <option>Select a Programme</option>
                  <option>BSc (Hons) Computing</option>
                  <option>BBA (Hons) Business Administration</option>
                </select>
              </div>

              {/* add contact number  */}
              <div className="space-y-2">
                <label className="text-white/80 text-xs sm:text-sm font-bold tracking-wider ml-1">Contact Number</label>
                <input 
                  type="tel" 
                  placeholder="+977 9800000000"
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#74C044]/50 transition-all"
                />
              </div>

              

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#21409A] hover:bg-[#21409A] text-white font-bold py-4 sm:py-5 rounded-2xl shadow-xl transition-all hover:shadow-[0_0_30px_rgba(30,64,175,0.3)] mt-5 sm:mt-6 text-base sm:text-lg"
              >
                Download Prospectus Now
              </button>
            </form>
          </div>
        </div>
      </AnimeStagger>
    </section>
  );
};

export default ProspectusSection;
