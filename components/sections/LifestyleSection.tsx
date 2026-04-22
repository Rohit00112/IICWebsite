import React from 'react';
import Image from 'next/image';

const LifestyleSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[#007a5e] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 font-sora">
            Discover
          </span>
          <h2 className="text-4xl md:text-[64px] font-bold text-[#1a1a1a] leading-tight mb-2 font-sora">
            Lifestyle At
          </h2>
          <h2 className="text-[100px] md:text-[220px] font-black text-[#007a5e] leading-[0.8] tracking-[-0.05em] mb-10 font-sora">
            IIC
          </h2>
          <p className="max-w-3xl text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            Beyond Academics. A Vibrant Campus, Diverse Student Community, And State-Of-The-Art Facilities Designed For Holistic Growth.
          </p>
        </div>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[800px]">
          {/* Main Large Image (Left) */}
          <div className="md:col-span-2 relative group rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="/images/iic-lifestyle 3.png"
              alt="Lifestyle at IIC"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
            {/* Label */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-3">
              <span className="text-white text-lg md:text-2xl font-bold font-sora">
                Library
              </span>
            </div>
          </div>

          {/* Right Column (Stacked) */}
          <div className="flex flex-col gap-6">
            {/* Top Stacked Image */}
            <div className="flex-1 relative group rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl">
              <Image
                src="/images/iic-lifestyle 1.png"
                alt="Lecture Theater"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-8 left-8 flex items-center gap-2">
                <span className="text-white text-base md:text-lg font-bold font-sora">
                  Lecture Theater
                </span>
              </div>
            </div>

            {/* Bottom Stacked Image */}
            <div className="flex-1 relative group rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl">
              <Image
                src="/images/iic-lifestyle 2.png"
                alt="Advanced Labs"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-8 left-8 flex items-center gap-2">
                <span className="text-white text-base md:text-lg font-bold font-sora">
                  Advanced Labs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
