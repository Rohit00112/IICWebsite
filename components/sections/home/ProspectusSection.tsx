import React from 'react';
import Image from 'next/image';

const ProspectusSection = () => {
  return (
    <section id="admission" className="relative w-full py-24 md:py-32 bg-[#0a1931] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Success Stories */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-[56px] font-bold text-white mb-6 font-sora">
            Student Success Stories
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-xl">
            Hear directly from those who have walked our halls and gone on to achieve remarkable things.
          </p>

          {/* Testimonial Card */}
          <div className="bg-white rounded-[32px] p-8 md:p-12 relative shadow-2xl">
            <div className="text-6xl text-[#0a1931] font-black absolute top-8 left-8 opacity-20 font-serif">
              &ldquo;
            </div>
            <div className="relative z-10">
              <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed italic mb-10 pt-4">
                &ldquo;The practical approach to learning at IIC completely transformed my understanding of software development. The facilities and the faculty support are truly world-class, preparing me perfectly for my current role.&rdquo;
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
                  <h4 className="text-xl font-bold text-[#1a1a1a] font-sora">Aarav Sharma</h4>
                  <p className="text-gray-500 font-medium">BSc Computing Alumni, Software Engineer at TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Prospectus Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl relative">
            {/* Form Header */}
            <div className="flex items-start gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-[#007a5e]/20 flex items-center justify-center text-[#2dd4bf] shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sora">
                  Get the Prospectus
                </h3>
                <p className="text-white/60 text-base">
                  Download comprehensive details about our programs, campus, and fees.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-bold uppercase tracking-wider ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#007a5e]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-bold uppercase tracking-wider ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#007a5e]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-bold uppercase tracking-wider ml-1">Program of Interest</label>
                <select className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white/50 focus:outline-none focus:ring-2 focus:ring-[#007a5e]/50 transition-all appearance-none cursor-pointer">
                  <option>Select a Program</option>
                  <option>BSc (Hons) Computing</option>
                  <option>BBA (Hons)</option>
                  <option>BSc (Hons) AI</option>
                </select>
              </div>

              {/* Checklist */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-[#007a5e]/30 flex items-center justify-center text-[#2dd4bf]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium">Detailed module descriptions</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-[#007a5e]/30 flex items-center justify-center text-[#2dd4bf]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium">Fee structures and scholarship info</span>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:shadow-[0_0_30px_rgba(30,64,175,0.3)] mt-6 text-lg"
              >
                Download Prospectus Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProspectusSection;
