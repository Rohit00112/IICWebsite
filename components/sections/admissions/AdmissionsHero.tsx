'use client';

import AnimeReveal from '../../effects/AnimeReveal';
import ParticleBackground from '../../effects/ParticleBackground';
import RevealText from '../../effects/RevealText';

const AdmissionsHero = () => {
  return (
    <section className="relative w-full pt-24 pb-20 md:pt-28 md:pb-24 bg-[#21409A] overflow-hidden">
      <ParticleBackground />
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#74C044]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#21409A]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center">
        <AnimeReveal
          as="h1"
          text="Start Your Global Journey"
          className="text-4xl md:text-7xl font-black text-white mb-6 font-iic tracking-tight justify-center"
          staggerFrom="center"
        />

        <div className="max-w-2xl px-4">
          <RevealText
            text="Apply to a London Metropolitan University awarded programme at IIC and take the next step toward an industry-ready future."
            className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed font-iic justify-center"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default AdmissionsHero;
