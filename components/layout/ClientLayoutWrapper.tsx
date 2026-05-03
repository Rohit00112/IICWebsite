'use client';

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/effects/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";

const FluidBackground = dynamic(() => import("@/components/effects/FluidBackground"), {
  ssr: false,
});
const CloudBackground = dynamic(() => import("@/components/effects/CloudBackground"), {
  ssr: false,
});

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdminPage = mounted && (pathname?.startsWith('/admin') || pathname === '/login');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
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
      {mounted && !isAdminPage && (
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
          <FluidBackground />
          <CloudBackground />
        </>
      )}

      {!isAdminPage ? (
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          {mounted && <Footer />}
        </SmoothScroll>
      ) : (
        <div key={pathname} className="flex-grow">
          {children}
        </div>
      )}
    </div>

  );
}
