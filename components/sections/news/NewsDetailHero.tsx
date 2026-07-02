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
    <section className="relative flex min-h-[420px] w-full items-end overflow-hidden bg-black pb-10 md:h-[50vh]">
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80"
        >
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/news" className="transition-colors hover:text-white">News & Events</Link>
          <span>/</span>
          <span className="text-[#74C044]">{item.category}</span>
        </motion.div>

        <AnimeReveal
          as="h1"
          text={item.title}
          className="mb-6 font-iic text-3xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
          staggerFrom="first"
          delay={0.2}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-white/90"
        >
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {displayDate}
          </span>
          {item.location && (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {item.location}
            </span>
          )}
          {item.time && (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {item.time}
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsDetailHero;
