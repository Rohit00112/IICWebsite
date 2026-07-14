'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimeStagger from '../../effects/AnimeStagger';
import Tilt from '../../effects/Tilt';
import type { NewsItem, UpcomingEvent, ArchiveEntry } from '@/lib/news';
import ShareMenu from './ShareMenu';

type NewsCategoryFilter = 'All' | 'News' | 'Events' | 'Blogs';

const categories: NewsCategoryFilter[] = ['All', 'News', 'Events', 'Blogs'];
const categoryValueMap: Record<NewsCategoryFilter, NewsItem['category'] | 'All'> = {
  All: 'All',
  News: 'News',
  Events: 'Event',
  Blogs: 'Blog',
};
const FALLBACK_IMAGE = '/images/common/tower_block.JPG';
const ITEMS_PER_PAGE = 4;

const formatMonthYear = (value: string) => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

interface NewsContentProps {
  initialNews: NewsItem[];
  initialFeatured: NewsItem | null;
  upcomingEvents: UpcomingEvent[];
  archive: ArchiveEntry[];
}

const NewsContent: React.FC<NewsContentProps> = ({ initialNews }) => {
  const [activeCategory, setActiveCategory] = useState<NewsCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const newsItems = initialNews;

  // Filtering Logic
  const filteredItems = newsItems.filter(item => {
    const normalizedActive = categoryValueMap[activeCategory];

    const normalizedItem = item.category;
    
    const matchesCategory = activeCategory === 'All' || normalizedItem === normalizedActive;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = filteredItems.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );
  return (
    <section className="pb-20 md:pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filter Bar */}
        <div className="bg-[#21409A] rounded-xl p-3 mb-16 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex p-1 gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-[#21409A] text-white shadow-inner' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-96 px-2 md:px-0">
            <input 
              type="text"
              placeholder="Search articles, events..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white text-[#1a1a1a] border-none rounded-lg py-2.5 pl-10 pr-4 outline-none text-sm placeholder:text-gray-400"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="space-y-10">
            {/* News Grid */}
            <AnimeStagger
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              selector=".news-card-wrapper"
              staggerDelay={100}
              translateY={30}
              duration={760}
            >
              <AnimatePresence mode="popLayout">
                {paginatedItems.map((item, idx) => (
                  <Link key={item.id} href={`/news-and-events/${item.slug}`} className="news-card-wrapper">
                    <Tilt strength={12} className="h-full">
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="news-card group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col cursor-pointer"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <div className="relative h-60 overflow-hidden">
                          <div className="absolute top-4 left-4 z-10">
                            <span className={`px-4 py-1.5 text-[9px] font-bold tracking-wider rounded-full shadow-md text-white ${
                              item.category === 'News' ? 'bg-[#74C044]' : 'bg-[#74C044]'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                        <Image
                          src={item.image || FALLBACK_IMAGE}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-8 md:p-10 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold mb-4">
                          <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span>{formatMonthYear(item.date)}</span>
                        </div>
                        <h4 className="text-xl font-bold text-[#1a1a1a] mb-5 font-iic leading-tight tracking-tight line-clamp-2 min-h-[50px] group-hover:text-[#21409A] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-sm mb-10 leading-relaxed line-clamp-3 font-medium">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="text-[#21409A] font-bold text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
                            {item.category === 'Event' ? 'View Details' : 'Read More'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </div>
                          <ShareMenu
                            url={`/news-and-events/${item.slug}`}
                            title={item.title}
                            description={item.description}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </Tilt>
                </Link>
                ))}
              </AnimatePresence>
            </AnimeStagger>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.max(1, safeCurrentPage - 1))}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#21409A] hover:text-[#21409A] transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  const isActive = page === safeCurrentPage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-[#21409A] text-white shadow-sm'
                          : 'bg-white border border-gray-200 text-slate-600 hover:border-[#21409A] hover:text-[#21409A]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#21409A] hover:text-[#21409A] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
    </section>
  );
};

export default NewsContent;
