import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#f4f7fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Top Tag */}
        <span className="text-[#007a5e] text-[12px] md:text-[14px] font-bold tracking-[0.3em] uppercase mb-6">
          Who We Are
        </span>

        {/* Main Headings */}
        <div className="flex flex-col items-center gap-2 mb-8 relative">
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter">
            Shape Your
          </h2>
          <div className="relative">
            <h2 className="text-7xl md:text-9xl font-black text-[#007a5e] tracking-tighter leading-none">
              FUTURE
            </h2>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter">
            In Nepal
          </h2>
        </div>

        {/* Description Paragraph */}
        <p className="max-w-3xl text-gray-500 text-sm md:text-base font-medium leading-relaxed mb-16 px-4">
          IIC Is A Flagship Institution Of Innovate Nepal Group. We Offer BSc (Hons) Computing And BA (Hons) Business Administration Directly Delivered In Partnership With London Metropolitan University — Right Here In Itahari.
        </p>

      </div>

      {/* Full-Width Building Image - Wide-angle landscape to cover whole width */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl mt-16">
        <Image
          src="/images/tower_block.png"
          alt="Itahari International College Tower Block"
          fill
          sizes="100vw"
          className="object-cover hover:scale-105 transition-transform duration-1000"
          priority
        />
        {/* Subtle Overlay for Premium Feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default AboutSection;
