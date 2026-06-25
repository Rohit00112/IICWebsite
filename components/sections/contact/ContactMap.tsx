'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const ContactMap = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background Campus Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0 h-full">
        <Image
          src="/images/common/tower_block.JPG"
          alt="Itahari International College Campus"
          fill
          className="object-cover brightness-[0.4]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Location Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white/95 backdrop-blur-xl p-10 md:p-14 rounded-[40px] shadow-2xl border border-white/50 w-full flex flex-col justify-center"
          >
            <div className="w-12 h-12 bg-[#21409A]/5 rounded-2xl flex items-center justify-center text-[#21409A] mb-8">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <AnimeReveal
              as="h2"
              text="Visit Our Campus"
              className="text-3xl font-bold text-[#1a1a1a] mb-4 font-iic tracking-tight"
              staggerFrom="first"
            />
            <p className="text-gray-500 font-medium mb-10 leading-relaxed">
              Sundarharaicha-4, Itahari<br />
              Sunsari, Koshi Province<br />
              Nepal, 56705
            </p>

            <AnimeStagger className="space-y-4" selector=":scope > *" staggerDelay={120} translateY={20} duration={700}>
              <Magnetic strength={0.2}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Itahari%20International%20College"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#1a1a1a] text-white text-center font-bold rounded-xl shadow-lg hover:bg-black transition-all"
                >
                  Get Directions
                </a>
              </Magnetic>
              
              <Link href="/life-at-iic" className="w-full py-4 bg-white text-[#1a1a1a] font-bold rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group">
                <span>Explore Campus Life</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </AnimeStagger>
          </motion.div>

          {/* Right: Map Embed (Pinned) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 relative h-[550px] md:h-auto min-h-[550px] w-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10 group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4981.882632909549!2d87.3019478!3d26.655408500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6ea070e7b18b%3A0x2959e2a3e2bf54e0!2sItahari%20International%20College!5e1!3m2!1sen!2snp!4v1777009397630!5m2!1sen!2snp" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.1] contrast-[1.1] hover:grayscale-0 transition-all duration-700 h-full"
            />
            {/* Map Overlay for Style */}
            <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-[40px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactMap;
