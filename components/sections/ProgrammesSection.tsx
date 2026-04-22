import React from 'react';
import Image from 'next/image';

const ProgrammesSection = () => {
  const programmes = [
    {
      type: 'BSc (Hons) Computing',
      duration: '3 Years',
      title: 'Bachelor in',
      subtitle: 'Information Technology',
      modules: '17 Modules',
      credits: '360 Credits',
      image: '/images/course1.png',
      bgColor: 'bg-[#004033]',
      tagColor: 'bg-[#005a49]',
    },
    {
      type: 'BA (Hons) Business Administration',
      duration: '3 Years',
      title: 'BBA',
      subtitle: 'Specialization',
      list: ['International Business', 'Digital Business Management', 'Advertising And Marketing'],
      modules: '17 Modules',
      credits: '360 Credits',
      image: '/images/course2.png',
      bgColor: 'bg-[#002a78]',
      tagColor: 'bg-[#0038a1]',
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#f4f7fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Top Tag */}
        <span className="text-[#007a5e] text-[12px] md:text-[14px] font-bold tracking-[0.3em] uppercase mb-6 font-sora">
          Our Programmes
        </span>

        {/* Headings */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-2 font-sora">
            Nepal's First Direct UK Degree At
          </h2>
          <h2 className="text-7xl md:text-[140px] font-black text-[#007a5e] tracking-tighter leading-none font-sora">
            ITAHARI
          </h2>
        </div>

        {/* Programme Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-20 max-w-[1440px]">
          {programmes.map((prog, index) => (
            <div
              key={index}
              className={`${prog.bgColor} rounded-[32px] md:rounded-[40px] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[400px] md:h-[440px] shadow-2xl group transition-all duration-500 hover:scale-[1.01]`}
            >
              <div className="relative z-10">
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className={`${prog.tagColor} text-white/90 text-[11px] md:text-[13px] px-5 py-2 rounded-full font-medium border border-white/5`}>
                    {prog.type}
                  </span>
                  <span className="bg-white text-[#1a1a1a] text-[11px] md:text-[13px] px-5 py-2 rounded-full font-bold flex items-center gap-2">
                    <span className="text-base">🕒</span> {prog.duration}
                  </span>
                </div>

                <div className="max-w-[60%] md:max-w-[55%]">
                  <h3 className="text-white/80 text-xl md:text-2xl font-medium mb-1 font-sora tracking-tight">
                    {prog.title}
                  </h3>
                  <h3 className="text-white text-4xl md:text-[46px] font-black leading-[1.05] mb-6 font-sora tracking-tighter">
                    {prog.subtitle}
                  </h3>

                  {prog.list && (
                    <ul className="space-y-1 mb-6">
                      {prog.list.map((item, i) => (
                        <li key={i} className="text-white/70 text-[12px] md:text-[14px] flex items-start gap-2">
                          <span className="mt-2 w-1 h-1 bg-white/40 rounded-full shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex gap-3 relative z-10">
                <span className="bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-[11px] md:text-[12px] font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {prog.modules}
                </span>
                <span className="bg-white/90 backdrop-blur-sm text-[#1a1a1a] text-[11px] md:text-[12px] font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {prog.credits}
                </span>
              </div>

              {/* Character Image - Positioned with more gap from text */}
              <div className="absolute right-0 bottom-0 w-[50%] h-[95%] pointer-events-none">
                <Image
                  src={prog.image}
                  alt={prog.subtitle}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-contain object-bottom transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text and CTA */}
        <div className="max-w-3xl text-center">
          <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed mb-10 px-4">
            Beginning Your College Journey Is A Very Personal And Sacred Experience That Encompasses A Wide Range Of Events Compounding Your Growth.
          </p>
          <button className="bg-[#1e3a8a] text-white px-12 py-4 rounded-lg font-bold text-lg shadow-2xl hover:bg-[#1a337e] hover:shadow-blue-500/20 transition-all active:scale-95">
            Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;
