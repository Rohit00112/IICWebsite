'use client';

import { motion, AnimatePresence, Transition } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function FrozenRoute({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const transition: Transition = { 
  duration: 1, 
  ease: [0.76, 0, 0.24, 1] 
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative min-h-screen overflow-hidden bg-white">
        
        {/* Content: Atmospheric Zoom & Blur Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px) grayscale(1)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px) grayscale(0)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px) grayscale(1)' }}
          transition={transition}
          className="relative z-10"
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>

        {/* Exceptional: Concentric Vortex Iris Wipe */}
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(0% at 50% 50%)' }}
              exit={{ clipPath: 'circle(100% at 50% 50%)' }}
              transition={{
                ...transition,
                delay: i * 0.05,
              }}
              className="absolute inset-0 bg-white"
              style={{
                zIndex: 10 - i,
                opacity: 1 - (i * 0.1),
                backdropFilter: `blur(${i * 10}px)`
              }}
            />
          ))}
        </div>

        {/* Entrance Wipe: Concentric vortex uncover */}
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ clipPath: 'circle(100% at 50% 50%)' }}
              animate={{ clipPath: 'circle(0% at 50% 50%)' }}
              exit={{ clipPath: 'circle(100% at 50% 50%)' }}
              transition={{
                ...transition,
                delay: (5 - i) * 0.05,
              }}
              className="absolute inset-0 bg-white"
              style={{
                zIndex: 10 - i,
                opacity: 1 - (i * 0.1),
                backdropFilter: `blur(${i * 10}px)`
              }}
            />
          ))}
        </div>

        {/* Lens Flare Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0, 1.5, 2] }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-blue-400/20 to-transparent blur-[80px] pointer-events-none z-[10000]"
        />
      </div>
    </AnimatePresence>
  );
}
