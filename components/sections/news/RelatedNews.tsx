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
    <section className="py-16 md:py-20 bg-[#F8FAFC] border-t border-gray-100">
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
              <Link href={`/news/${item.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.image || '/images/common/tower_block.JPG'}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#21409A] text-[10px] font-bold tracking-wider rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-[10px] font-bold text-gray-400 mb-3">{item.date}</div>
                  <h4 className="text-xl font-bold text-[#1a1a1a] mb-4 font-iic leading-tight line-clamp-2 group-hover:text-[#21409A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[#21409A] font-bold text-xs">
                    Read Story
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
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
