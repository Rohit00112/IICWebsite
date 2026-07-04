'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';
import type { NewsItem } from '@/lib/news';


import { sanitizeHtml } from '@/lib/sanitize';
import Tilt from '@/components/effects/Tilt';

interface NewsDetailContentProps {
  item: NewsItem;
}

const SHARE_TARGETS = [
  {
    name: 'Facebook',
    hoverBg: 'hover:bg-[#1877F2]',
    getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    hoverBg: 'hover:bg-[#0A66C2]',
    getUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

const NewsDetailContent: React.FC<NewsDetailContentProps> = ({ item }) => {
  const sanitizedContent = React.useMemo(() => sanitizeHtml(item.content), [item.content]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-16">

          {/* Main Article Body */}
          <div className="min-w-0">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-left prose-headings:font-iic prose-headings:font-bold [&&_h1]:text-[#21409A] [&&_h2]:text-[#21409A] [&&_h3]:text-[#21409A] [&&_h4]:text-[#21409A] [&&_p]:text-slate-800 [&&_p]:leading-[1.8] [&&_li]:text-slate-800 [&&_strong]:text-slate-900 [&&_span]:text-slate-800 prose-li:marker:text-[#21409A] prose-li:marker:font-black prose-blockquote:border-[#74C044] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl [&_*]:max-w-full [&_*]:!whitespace-normal [&_*]:[hyphens:none] [&_*]:[overflow-wrap:normal] [&_*]:[word-break:normal] [&_a]:[overflow-wrap:anywhere] [&_code]:[overflow-wrap:anywhere] [&_pre]:overflow-x-auto"
            >
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                className="rich-content max-w-full overflow-hidden [text-wrap:pretty]"
              />
            </motion.article>

            {/* Share Section */}
            <AnimeStagger className="mt-14 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8" selector=":scope > *" staggerDelay={120} translateY={20} duration={700}>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest text-gray-400">Share this story</span>
                <div className="flex items-center gap-3">
                  {SHARE_TARGETS.map(({ name, getUrl, hoverBg, icon }) => (
                    <Magnetic key={name} strength={0.3}>
                      <button
                        type="button"
                        aria-label={`Share on ${name}`}
                        onClick={() => {
                          const url = typeof window !== 'undefined' ? window.location.href : '';
                          window.open(getUrl(url), `share-${name}`, 'width=626,height=620,noopener,noreferrer');
                        }}
                        className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 ${hoverBg} hover:text-white transition-all shadow-sm`}
                      >
                        {icon}
                      </button>
                    </Magnetic>
                  ))}
                </div>
              </div>

              <Link href="/news-and-events" className="group flex items-center gap-3 text-[#21409A] font-bold text-sm">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to News & Events
              </Link>
            </AnimeStagger>
          </div>

          {/* Sidebar */}
          <AnimeStagger
            className="min-w-0 space-y-10 xl:space-y-12"
            selector=":scope > div"
            staggerDelay={140}
            translateY={28}
            duration={760}
          >

            {/* Quick Facts Card */}
            <Tilt strength={6}>
              <div className="bg-[#f8fcfb] p-10 rounded-[40px] border border-[#74C044]/20 shadow-sm relative overflow-hidden">
                <h5 className="text-xl font-bold text-[#1a1a1a] font-iic mb-6">Article Details</h5>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-700 tracking-wider mb-1">Category</p>
                      <p className="text-sm font-bold text-[#21409A]">{item.category}</p>
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-700 tracking-wider mb-1">Location</p>
                        <p className="text-sm font-bold text-[#21409A]">{item.location}</p>
                      </div>
                    </div>
                  )}

                  {item.time && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-700 tracking-wider mb-1">Time</p>
                        <p className="text-sm font-bold text-[#21409A]">{item.time}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Tilt>

            {/* Newsletter Signup */}
            <Tilt strength={4}>
              <div className="bg-[#DDE5F0] p-10 rounded-[40px] shadow-sm">
                <AnimeReveal
                  as="h5"
                  text="Stay Updated"
                  className="text-xl font-bold font-iic mb-4 text-[#1a1a1a]"
                  staggerFrom="first"
                />
                <p className="text-gray-600 text-[14px] mb-8 leading-relaxed font-medium">Never miss an update. Join our newsletter to get the latest Itahari International College news.</p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-[#E8EEF5] border-none rounded-xl py-4 px-5 outline-none focus:ring-2 focus:ring-[#21409A]/10 transition-all text-sm placeholder:text-gray-400"
                  />
                  <button className="w-full py-4 bg-[#21409A] text-white font-bold rounded-xl text-sm hover:shadow-xl transition-all">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </Tilt>

          </AnimeStagger>

        </div>
      </div>
    </section>
  );
};

export default NewsDetailContent;
