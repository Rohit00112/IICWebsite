'use client';

import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { motion, useSpring, useMotionValue, useScroll } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/effects/SmoothScroll";
import FluidBackground from "@/components/effects/FluidBackground";
import PageTransition from "@/components/layout/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden font-sora cursor-none">
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
            x: useSpring(useMotionValue(0), springConfig),
            y: useSpring(useMotionValue(0), springConfig),
            left: mouseX,
            top: mouseY,
            marginLeft: 12,
            marginTop: 12,
          }}
        />

        <FluidBackground />

        <SmoothScroll>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
