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
            text="Join our community of innovators and begin your journey with a clear and simple application process toward a globally recognised degree at IIC."
            className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed font-sora justify-center"
            delay={0.6}
          />
        </div>

        {/* Top Progress Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.8, rotateX: -20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  rotateX: 0,
                  transition: { 
                    duration: 1.2, 
                    delay: 0.6 + index * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }
              }}
              className="h-full"
            >
              <Tilt strength={12} className="h-full">
                <div
                  className={`step-card group relative h-full p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center transition-all duration-700 overflow-hidden ${currentStep === step.id
                      ? 'bg-white/10 border-white/40 shadow-[0_40px_80px_-15px_rgba(33,64,154,0.3)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  {/* Holographic Shimmer for active state */}
                  {currentStep === step.id && (
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                        transition: { duration: 2.5, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none z-0"
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      layout
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center font-black text-lg transition-all duration-700 mb-6 ${currentStep === step.id
                          ? 'bg-[#21409A] text-white shadow-[0_0_30px_rgba(33,64,154,0.6)] scale-110'
                          : currentStep > step.id
                            ? 'bg-[#76bc43] text-white'
                            : 'bg-white/10 text-white/40'
                        }`}
                    >
                      {currentStep > step.id ? (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>
                      ) : step.id}
                    </motion.div>
                    
                    <motion.h3
                      layout
                      className={`font-black text-lg md:text-xl mb-2 font-sora transition-all duration-500 uppercase tracking-tight ${currentStep === step.id ? 'text-white' : 'text-white/60'
                        }`}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <motion.p
                      layout
                      className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-center transition-opacity duration-500 ${currentStep === step.id ? 'text-white/60' : 'text-white/30'}`}
                    >
                      {step.subtitle}
                    </motion.p>
                  </div>
                  
                  {/* Active Step Indicator Dot */}
                  {currentStep === step.id && (
                    <motion.div 
                      layoutId="step-indicator"
                      className="absolute bottom-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
                    />
                  )}
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionsHero;
