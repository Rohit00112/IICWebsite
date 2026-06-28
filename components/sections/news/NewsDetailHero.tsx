'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimeReveal from '../../effects/AnimeReveal';
import type { NewsItem } from '@/lib/news';

interface NewsDetailHeroProps {
  item: NewsItem;
}

const NewsDetailHero: React.FC<NewsDetailHeroProps> = ({ item }) => {
  const displayDate = React.useMemo(() => {
    const parsedDate = new Date(item.date);
    if (Number.isNaN(parsedDate.getTime())) {
      return item.date;
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(parsedDate);
  }, [item.date]);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px] flex items-end pb-12 overflow-hidden bg-black">
      {/* Background Image with Cinematic Parallax-like Zoom */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={item.image || '/images/common/tower_block.JPG'}
          alt={item.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          {/* Breadcrumbs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-white/90 text-xs font-bold tracking-widest mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-white transition-colors">News & Events</Link>
            <span>/</span>
            <span className="text-[#74C044] font-black">{item.category}</span>
          </motion.div>

          <AnimeReveal
            as="h1"
            text={item.title}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-iic leading-tight mb-8"
            staggerFrom="first"
            delay={0.2}
          />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center gap-8 text-white"
          >
            <div className="flex items-center gap-3 text-xs font-bold tracking-wider">
              <svg className="w-4 h-4 text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>{displayDate}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailHero;
