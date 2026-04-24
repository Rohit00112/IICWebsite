'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';

interface NewsDetailContentProps {
  item: any;
}

const NewsDetailContent: React.FC<NewsDetailContentProps> = ({ item }) => {
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
              className="prose prose-lg max-w-none prose-headings:font-sora prose-headings:font-bold prose-headings:text-[#1a1a1a] prose-p:text-gray-600 prose-p:leading-relaxed prose-blockquote:border-[#74C044] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />

            {/* Share Section */}
            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Share this story</span>
                <div className="flex items-center gap-3">
                  {['fb', 'tw', 'ln', 'wa'].map((social) => (
                    <Magnetic key={social} strength={0.3}>
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#21409A] hover:text-white transition-all shadow-sm">
                        <span className="text-[10px] font-bold uppercase">{social}</span>
                      </button>
                    </Magnetic>
                  ))}
                </div>
              </div>

              <Link href="/news" className="group flex items-center gap-3 text-[#21409A] font-bold text-sm">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to News & Events
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Related Information Card */}
            <div className="bg-[#f8fcfb] p-10 rounded-[40px] border border-[#74C044]/20 shadow-sm relative overflow-hidden">
              <h5 className="text-xl font-bold text-[#1a1a1a] font-sora mb-6">Quick Facts</h5>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10h5m-5-4h5m2-4h2m7 10v12m-9-12v12" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Partner</p>
                    <p className="text-sm font-bold text-[#1a1a1a]">Microsoft Corporation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#21409A]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Target</p>
                    <p className="text-sm font-bold text-[#1a1a1a]">Computing & IT Students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup (Consistent with Listing) */}
            <div className="bg-[#DDE5F0] p-10 rounded-[40px] shadow-sm">
              <h5 className="text-xl font-bold font-sora mb-4 text-[#1a1a1a]">Stay Updated</h5>
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

          </div>

        </div>
      </div>
    </section>
  );
};

import Link from 'next/link';
export default NewsDetailContent;
