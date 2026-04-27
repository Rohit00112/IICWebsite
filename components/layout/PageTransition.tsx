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
  duration: 0.7, 
  ease: [0.33, 1, 0.68, 1] 
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const nbOfSlices = 20;

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative min-h-screen bg-white">
        
        {/* Content: Digital Distortion Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px) contrast(1.5)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px) contrast(1)' }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px) contrast(1.5)' }}
          transition={transition}
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>

        {/* The Barcode Shutter: 20 Thin Vertical Slices */}
        <div className="fixed inset-0 z-[9999] pointer-events-none flex w-screen h-screen overflow-hidden">
          {[...Array(nbOfSlices)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                ...transition,
                delay: Math.sin(i * 0.2) * 0.15 + 0.1,
              }}
              className="relative h-full w-full bg-white border-x border-gray-100/30"
              style={{
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(0,0,0,0.05)',
                transformOrigin: i % 2 === 0 ? 'top' : 'bottom'
              }}
            >
              {/* Inner Accent Line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-[#21409A]/10" />
            </motion.div>
          ))}
        </div>

        {/* Entrance Wave: Reverse Shutter */}
        <div className="fixed inset-0 z-[9999] pointer-events-none flex w-screen h-screen overflow-hidden">
          {[...Array(nbOfSlices)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 0 }}
              transition={{
                ...transition,
                delay: Math.cos(i * 0.2) * 0.15 + 0.1,
              }}
              className="relative h-full w-full bg-white border-x border-gray-100/30"
              style={{
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(0,0,0,0.05)',
                transformOrigin: i % 2 === 0 ? 'bottom' : 'top'
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#76bc43]/10" />
            </motion.div>
          ))}
        </div>

        {/* Flash Burst */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="fixed inset-0 z-[10000] bg-[#21409A]/5 pointer-events-none mix-blend-color-burn"
        />
      </div>
    </AnimatePresence>
  );
}
