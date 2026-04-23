'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    // Stage 1: Reveal logo after a short delay
    const logoTimer = setTimeout(() => {
      setIsLogoVisible(true);
    }, 300);

    // Stage 2: Start fade-out of the whole overlay
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    // cleanup
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out ${isLogoVisible && !isVisible ? 'opacity-0' : 'opacity-100'}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="flex flex-col items-center">
        {/* Animated Branding Container */}
        <div 
          className={`relative h-24 md:h-32 w-64 md:w-96 transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) transform ${
            isLogoVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10'
          }`}
        >
          <Image
            src="/images/common/iic_logo.png"
            alt="Itahari International College Branding"
            fill
            sizes="(max-width: 768px) 256px, 384px"
            className="object-contain"
            priority
          />
        </div>

        {/* Reveal Progress Accent - Using IIC Blue */}
        <div className="mt-8 w-48 md:w-64 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-[#1e3a8a] transition-all duration-[2000ms] ease-out ${
              isLogoVisible ? 'w-full' : 'w-0'
            }`}
          />
        </div>

        {/* Tagline Reveal */}
        <div className="mt-4 h-6 overflow-hidden">
          <p className={`text-[#1e3a8a] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase transition-all duration-1000 delay-500 transform ${
            isLogoVisible ? 'translate-y-0 opacity-80' : 'translate-y-full opacity-0'
          }`}>
            Unleashing Your Potential
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
