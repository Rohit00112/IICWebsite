import React from 'react';
import Image from 'next/image';

const IngSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#f4f7fa] overflow-hidden border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <h3 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-sora">
            Be A Part Of
          </h3>
          <h2 className="text-[60px] md:text-[140px] font-black text-[#76bc43] leading-[0.8] tracking-[-0.03em] font-sora">
            SOMETHING BIGGER
          </h2>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: ING Logo */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[1.6/1]">
              <Image
                src="/images/ing.png"
                alt="ING Group Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: Description */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-xl">
              Transforming Lives Through Innovation & Education with ingenuity at the forefront of all our decisions, we strive to become a contributive factor in the betterment of Nepal and society in general by providing practical career centric education and innovations in technology. ING houses state-of-the-art organizations in a variety of industries which include Tech, Education and More.
            </p>
            <a
              href="#"
              className="text-[#76bc43] text-xl font-bold border-b-2 border-[#76bc43] pb-1 hover:text-[#007a5e] hover:border-[#007a5e] transition-colors font-sora"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngSection;
