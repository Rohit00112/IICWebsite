'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Magnetic from '../effects/Magnetic';
import AnimeStagger from '../effects/AnimeStagger';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/common/footer-bg.png"
          alt="Successful Students Celebrating Graduation at Itahari International College"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-32 pb-16">
        <AnimeStagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20"
          selector=":scope > div"
          staggerDelay={120}
          translateY={40}
          duration={800}
        >

          {/* Brand Column */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center self-start rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <div className="relative w-64 h-16">
                <Image
                  src="/images/common/iic_logo_white.png"
                  alt="Itahari International College Official Logo"
                  fill
                  sizes="(max-width: 768px) 260px, 260px"
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-sm font-iic">
              Developing impactful industry-ready graduates through globally connected IT and Business programmes.
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Facebook', href: 'https://www.facebook.com/IICNepal/', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', filled: false },
                { name: 'Instagram', href: 'https://www.instagram.com/iic.nepal/', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z', filled: false },
                { name: 'LinkedIn', href: 'https://np.linkedin.com/school/itahari-international-college/', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 2a2 2 0 110 4 2 2 0 010-4z', filled: false },
                { name: 'WhatsApp', href: 'https://wa.me/9779801003030', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412', filled: true },
                { name: 'TikTok', href: 'https://www.tiktok.com/@iic.nepal', path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .6.05.87.14V9.4a6.34 6.34 0 00-1-.08A6.35 6.35 0 003 15.68a6.35 6.35 0 0010.86 4.49 6.33 6.33 0 001.85-4.49V8.75a8.16 8.16 0 004.77 1.52V6.8c-.3 0-.6-.04-.89-.11z', filled: true },
                { name: 'YouTube', href: 'https://www.youtube.com/@itahariinternationalcolleg4968', path: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31.1 31.1 0 000 12a31.1 31.1 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.1 31.1 0 0024 12a31.1 31.1 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z', filled: true }
              ].map((social) => (
                <Magnetic key={social.name} strength={0.4}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#74C044] hover:border-[#74C044] transition-all duration-300 group"
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg
                      className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
                      fill={social.filled ? 'currentColor' : 'none'}
                      stroke={social.filled ? 'none' : 'currentColor'}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={social.path} />
                    </svg>
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-iic text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/courses" className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  Academic Programmes
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link href="/life-at-iic" className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  College Life
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-iic text-white">Resources</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/news" className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  News & Events
                </Link>
              </li>
             
              <li>
                <Link href="/contact" className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="https://innovation.iic.edu.np" target="_blank" rel="noopener noreferrer" prefetch={false} className="text-white/60 hover:text-[#74C044] transition-colors text-base font-medium inline-block">
                  Innovation Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-iic text-white">Contact Us</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <svg className="w-6 h-6 text-[#74C044] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-white/60 text-base leading-relaxed font-iic">Sundar Haraicha 04, Dulari, Morang, Nepal</span>
              </li>
              <li className="flex items-center gap-4">
                <svg className="w-6 h-6 text-[#74C044] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-white/60 text-base font-iic">+977 9801003030</span>
              </li>
              <li className="flex items-center gap-4">
                <svg className="w-6 h-6 text-[#74C044] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-white/60 text-base font-iic">info@iic.edu.np</span>
              </li>
            </ul>
          </div>
        </AnimeStagger>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-iic">
            © 2026 Itahari International College. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="text-white/40 hover:text-white transition-colors text-sm font-iic">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-white/40 hover:text-white transition-colors text-sm font-iic">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
