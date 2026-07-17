'use client';

import React, { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useSpring, useMotionValue, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import SmoothScroll from "@/components/effects/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useIsMobileLike from "@/components/effects/useIsMobileLike";

const FluidBackground = dynamic(() => import("@/components/effects/FluidBackground"), {
  ssr: false,
});

const CURSOR_SIZE = 32;
const CURSOR_OFFSET = CURSOR_SIZE / 2;
const DOT_OFFSET = 12;
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, label, summary, [role="button"], [data-cursor-hover]';

function DesktopScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#74C044] origin-left z-[10000]"
      style={{ scaleX }}
    />
  );
}

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith('/admin') || pathname === '/login';
  // Brochure links page renders standalone (no global navbar/footer/cursor).
  const isBarePage = pathname === '/link-hub';
  const hasDesktopViewport = useMediaQuery('(min-width: 768px)');
  const isMobileLike = useIsMobileLike();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isCursorVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX - CURSOR_OFFSET);
      mouseY.set(e.clientY - CURSOR_OFFSET);

      if (!isCursorVisibleRef.current) {
        isCursorVisibleRef.current = true;
        setIsCursorVisible(true);
      }

      const target = e.target instanceof Element ? e.target : null;
      const nextHovered = Boolean(target?.closest(INTERACTIVE_SELECTOR));

      if (isHoveredRef.current !== nextHovered) {
        isHoveredRef.current = nextHovered;
        setIsHovered(nextHovered);
      }
    };

    const handlePointerLeave = () => {
      if (!isCursorVisibleRef.current) return;

      isCursorVisibleRef.current = false;
      setIsCursorVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <MotionConfig reducedMotion={isMobileLike ? "always" : "user"}>
      <div className={`relative flex flex-col ${isAdminPage || isBarePage ? 'font-sora cursor-default' : 'font-iic md:cursor-none'}`}>
        {!isAdminPage && !isBarePage && (
          <>
            {hasDesktopViewport && <DesktopScrollProgress />}

            <motion.div
              className="fixed top-0 left-0 w-8 h-8 bg-[#21409A]/20 border border-[#21409A]/40 rounded-full pointer-events-none z-[9999] hidden md:block will-change-transform"
              animate={{ scale: isHovered ? 1.5 : 1 }}
              transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.22 }}
              style={{
                x: mouseX,
                y: mouseY,
                opacity: isCursorVisible ? 1 : 0,
              }}
            />

            <motion.div
              className="fixed top-0 left-0 w-2 h-2 bg-[#74C044] rounded-full pointer-events-none z-[9999] hidden md:block will-change-transform"
              style={{
                x: mouseX,
                y: mouseY,
                opacity: isCursorVisible ? 1 : 0,
                marginLeft: DOT_OFFSET,
                marginTop: DOT_OFFSET,
              }}
            />
            {hasDesktopViewport && <FluidBackground />}
          </>
        )}

        {isAdminPage || isBarePage ? (
          <div key={pathname} className="flex-grow">
            {children}
          </div>
        ) : (
          <SmoothScroll>
            <TopBar />
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </SmoothScroll>
        )}
      </div>
    </MotionConfig>
  );
}
