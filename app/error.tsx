'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Magnetic from '@/components/effects/Magnetic';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F4F7FA] flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center relative overflow-hidden py-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ED1C24]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#21409A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-[#ED1C24]/10 text-[#ED1C24] rounded-3xl flex items-center justify-center mx-auto mb-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#21409A] font-iic tracking-tight">
              Something went wrong
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium mb-12 leading-relaxed font-iic"
          >
            We could not load this page. Try again, or return home and continue exploring IIC.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Magnetic strength={0.2}>
              <button
                onClick={() => reset()}
                className="px-10 py-4 bg-[#21409A] text-white rounded-xl font-bold shadow-xl shadow-[#21409A]/10 hover:brightness-110 transition-all text-base inline-block"
              >
                Try Again
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/"
                className="px-10 py-4 bg-white text-[#21409A] border border-gray-100 rounded-xl font-bold hover:bg-gray-50 transition-all text-base inline-block"
              >
                Go to Homepage
              </Link>
            </Magnetic>
          </motion.div>

          {error.digest && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="mt-12 text-[10px] tracking-widest text-gray-400 font-bold"
            >
              Error ID: {error.digest}
            </motion.p>
          )}
        </div>
      </div>

    </main>
  );
}
