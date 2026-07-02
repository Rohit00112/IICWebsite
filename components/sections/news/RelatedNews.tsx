'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NewsItem } from '@/lib/news';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

interface RelatedNewsProps {
  items: NewsItem[];
}

const RelatedNews: React.FC<RelatedNewsProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <AnimeReveal
              as="h2"
              text="Related Stories"
              className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-iic mb-4"
              staggerFrom="first"
            />
            <p className="text-gray-500 max-w-md">Continue exploring the latest updates, events, and announcements from Itahari International College.</p>
          </div>
          <Link href="/news" className="hidden md:flex items-center gap-2 text-[#21409A] font-bold text-sm hover:gap-3 transition-all">
            View All News
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <AnimeStagger
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          selector=".related-news-card"
          staggerDelay={120}
          translateY={30}
          duration={760}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="related-news-card"
              style={{ willChange: 'transform, opacity' }}
            >
              <Link href={`/news/${item.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#21409A]/40">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image || '/images/common/tower_block.JPG'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em]">
                    <span className="text-[#21409A]">{item.category}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="mb-3 font-iic text-lg font-bold leading-snug text-[#1a1a1a] line-clamp-2 transition-colors group-hover:text-[#21409A]">
                    {item.title}
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="mt-auto flex items-center gap-2 text-xs font-bold text-[#21409A] transition-all group-hover:gap-3">
                    Read Story
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimeStagger>
      </div>
    </section>
  );
};

export default RelatedNews;
