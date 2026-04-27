'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Magnetic from '@/components/effects/Magnetic';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F4F7FA] flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center relative overflow-hidden py-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#76bc43]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#21409A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h1 className="text-[150px] md:text-[220px] font-black text-[#21409A]/10 leading-none select-none tracking-tighter">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <h2 className="text-3xl md:text-5xl font-black text-[#003B2E] font-sora tracking-tight">
                Page Not Found
              </h2>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium mb-12 leading-relaxed font-sora"
          >
            The page you're looking for doesn't exist or has been moved. Let's get you back to the right place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Magnetic strength={0.2}>
              <Link
                href="/"
                className="px-10 py-4 bg-[#21409A] text-white rounded-xl font-bold shadow-xl shadow-blue-900/10 hover:brightness-110 transition-all text-base inline-block"
              >
                Back to Homepage
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/contact"
                className="px-10 py-4 bg-white text-[#003B2E] border border-gray-100 rounded-xl font-bold hover:bg-gray-50 transition-all text-base inline-block"
              >
                Contact Support
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>

    </main>
  );
}
