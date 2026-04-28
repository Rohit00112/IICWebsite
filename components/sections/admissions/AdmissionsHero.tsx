'use client';

import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';
import Tilt from '../../effects/Tilt';
import ParticleBackground from '../../effects/ParticleBackground';
import RevealText from '../../effects/RevealText';

const steps = [
  { id: 1, title: 'Details', subtitle: 'Basic info' },
  { id: 2, title: 'Academics', subtitle: 'Past records' },
  { id: 3, title: 'Program', subtitle: 'Choose path' },
  { id: 4, title: 'Uploads', subtitle: 'Docs & ID' },
];

interface AdmissionsHeroProps {
  currentStep: number;
}

const AdmissionsHero = ({ currentStep }: AdmissionsHeroProps) => {
  return (
    <section className="relative w-full pt-32 pb-32 md:pt-44 md:pb-48 bg-[#003B2E] overflow-hidden">
      <ParticleBackground />
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#76bc43]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#21409A]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center">
        <AnimeReveal
          as="h1"
          text="Start Your Journey"
          className="text-4xl md:text-7xl font-black text-white mb-6 font-sora tracking-tight justify-center"
          staggerFrom="center"
        />

        <div className="max-w-2xl mb-16 px-4">
          <RevealText
            text="Join a community of innovators. Our straightforward application process is your first step towards a global degree at IIC."
            className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed font-sora justify-center"
            delay={0.6}
          />
        </div>

        {/* Top Progress Tracker */}
        <AnimeStagger
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          selector=".step-card-wrapper"
          staggerDelay={100}
          translateY={20}
          duration={800}
          delay={1.2}
        >
          {steps.map((step) => (
            <div key={step.id} className="step-card-wrapper h-full">
              <Tilt strength={10} className="h-full">
                <div
                  className={`step-card group relative h-full p-6 rounded-2xl border backdrop-blur-md flex flex-col items-center transition-all duration-500 overflow-hidden ${currentStep === step.id
                      ? 'bg-white/10 border-white/30 shadow-2xl shadow-blue-900/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                    }`}
                >
                  {/* Holographic Shimmer for active state */}
                  {currentStep === step.id && (
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                        transition: { duration: 3, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                  )}

                  <motion.div
                    layout
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 mb-4 ${currentStep === step.id
                        ? 'bg-[#21409A] text-white shadow-lg shadow-blue-900/40 scale-125'
                        : currentStep > step.id
                          ? 'bg-[#76bc43] text-white'
                          : 'bg-white/10 text-white/40'
                      }`}
                  >
                    {currentStep > step.id ? '✓' : step.id}
                  </motion.div>
                  <motion.h3
                    layout
                    className={`font-bold text-sm md:text-base mb-1 font-sora transition-all duration-500 ${currentStep === step.id ? 'text-white' : 'text-white/70'
                      }`}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    layout
                    className="text-gray-400 text-[10px] md:text-xs font-medium uppercase tracking-wider text-center"
                  >
                    {step.subtitle}
                  </motion.p>
                </div>
              </Tilt>
            </div>
          ))}
        </AnimeStagger>
      </div>
    </section>
  );
};

export default AdmissionsHero;
