'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/effects/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const FluidBackground = dynamic(() => import("@/components/effects/FluidBackground"), {
  ssr: false,
});

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith('/admin') || pathname === '/login';
  const hasDesktopViewport = useMediaQuery('(min-width: 768px)');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    let frame: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      latestX = e.clientX - 16;
      latestY = e.clientY - 16;

      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        mouseX.set(latestX);
        mouseY.set(latestY);
        frame = null;
      });
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const nextHovered = Boolean(target.closest('a, button'));

      if (isHoveredRef.current !== nextHovered) {
        isHoveredRef.current = nextHovered;
        setIsHovered(nextHovered);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
    };
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);

  return (
    <div className={`relative flex flex-col font-sora ${isAdminPage ? 'cursor-default' : 'cursor-none'}`}>
      {!isAdminPage && (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[#74C044] origin-left z-[10000]"
            style={{ scaleX }}
          />

          <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-[#21409A]/20 border border-[#21409A]/40 rounded-full pointer-events-none z-[9999] hidden md:block"
            style={{
              x: cursorX,
              y: cursorY,
              scale: isHovered ? 1.5 : 1,
            }}
          />

          <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-[#74C044] rounded-full pointer-events-none z-[9999] hidden md:block"
            style={{
              x: dotX,
              y: dotY,
              marginLeft: 12,
              marginTop: 12,
            }}
          />
          {hasDesktopViewport && <FluidBackground />}
        </>
      )}

      {!isAdminPage ? (
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
      ) : (
        <div key={pathname} className="flex-grow">
          {children}
        </div>
      )}
    </div>

  );
}
