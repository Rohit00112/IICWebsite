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

const NewsDetailContent: React.FC<NewsDetailContentProps> = ({ item }) => {
  const sanitizedContent = React.useMemo(() => sanitizeHtml(item.content), [item.content]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Main Article Body */}
          <div className="lg:col-span-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none prose-headings:font-sora prose-headings:font-bold [&&_h1]:text-[#1A2B56] [&&_h2]:text-[#1A2B56] [&&_h3]:text-[#1A2B56] [&&_h4]:text-[#1A2B56] [&&_p]:text-slate-800 [&&_li]:text-slate-800 [&&_strong]:text-slate-900 [&&_span]:text-slate-800 prose-p:leading-relaxed prose-li:marker:text-[#21409A] prose-li:marker:font-black prose-blockquote:border-[#74C044] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl"
            >
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                className="rich-content"
              />
            </motion.article>

            {/* Share Section */}
            <AnimeStagger className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8" selector=":scope > *" staggerDelay={120} translateY={20} duration={700}>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Share this story</span>
                <div className="flex items-center gap-3">
                  {['facebook', 'twitter', 'linkedin'].map((social) => (
                    <Magnetic key={social} strength={0.3}>
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#21409A] hover:text-white transition-all shadow-sm">
                        <span className="text-[10px] font-bold uppercase">{social.slice(0, 2)}</span>
                      </button>
                    </Magnetic>
                  ))}
                </div>
              </div>

              <Link href="/news" className="group flex items-center gap-3 text-[#21409A] font-bold text-sm">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to News & Events
              </Link>
            </AnimeStagger>
          </div>

          {/* Sidebar */}
          <AnimeStagger
            className="lg:col-span-4 space-y-12"
            selector=":scope > div"
            staggerDelay={140}
            translateY={28}
            duration={760}
          >

            {/* Quick Facts Card */}
            <Tilt strength={6}>
              <div className="bg-[#f8fcfb] p-10 rounded-[40px] border border-[#74C044]/20 shadow-sm relative overflow-hidden">
                <h5 className="text-xl font-bold text-[#1a1a1a] font-sora mb-6">Article Details</h5>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Category</p>
                      <p className="text-sm font-bold text-[#1A2B56]">{item.category}</p>
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Location</p>
                        <p className="text-sm font-bold text-[#1A2B56]">{item.location}</p>
                      </div>
                    </div>
                  )}

                  {item.time && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Time</p>
                        <p className="text-sm font-bold text-[#1A2B56]">{item.time}</p>
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
                  className="text-xl font-bold font-sora mb-4 text-[#1a1a1a]"
                  staggerFrom="first"
                />
                <p className="text-gray-600 text-[14px] mb-8 leading-relaxed font-medium">Never miss an update. Join our newsletter to get the latest IIC news.</p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-[#E8EEF5] border-none rounded-xl py-4 px-5 outline-none focus:ring-2 focus:ring-[#21409A]/10 transition-all text-sm placeholder:text-gray-400"
                  />
                  <button className="w-full py-4 bg-[#1F3E97] text-white font-bold rounded-xl text-sm hover:shadow-xl transition-all">
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
