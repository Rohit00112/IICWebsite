'use client';

import { AnimatePresence, motion, Transition, useReducedMotion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useState } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function FrozenRoute({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const [frozen] = useState(context);

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const pageTransition: Transition = {
  duration: 0.98,
  ease: [0.77, 0, 0.175, 1],
};

const shadeTransition: Transition = {
  duration: 0.98,
  ease: [0.645, 0.045, 0.355, 1],
};

const pageVariants: Variants = {
  enter: {
    y: '100svh',
    scale: 1,
    opacity: 1,
    zIndex: 2,
  },
  center: {
    y: 0,
    scale: 1,
    opacity: 1,
    zIndex: 2,
    transition: pageTransition,
  },
  exit: {
    y: '-8svh',
    scale: 0.985,
    opacity: 1,
    zIndex: 0,
    transition: pageTransition,
  },
};

const shadeVariants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 0,
    transition: { duration: 0.35, ease: 'linear' },
  },
  exit: {
    opacity: 0.34,
    transition: shadeTransition,
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHomeRoute = pathname === '/';

  if (shouldReduceMotion) {
    return (
      <div key={pathname} className="relative min-h-screen bg-white overflow-x-clip">
        <FrozenRoute>{children}</FrozenRoute>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen bg-white overflow-x-clip">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial={isHomeRoute ? false : 'enter'}
          animate="center"
          exit="exit"
          className="relative min-h-screen bg-white overflow-x-clip"
          style={{
            backfaceVisibility: 'hidden',
            transformOrigin: 'center top',
          }}
        >
          <FrozenRoute>{children}</FrozenRoute>
          <motion.div
            variants={shadeVariants}
            className="pointer-events-none absolute inset-0 z-50 bg-black"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
