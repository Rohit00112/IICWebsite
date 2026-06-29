'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimeStagger from '../../effects/AnimeStagger';
import Tilt from '../../effects/Tilt';
import type { NewsItem, UpcomingEvent, ArchiveEntry } from '@/lib/news';
import ShareMenu from './ShareMenu';
import NewsletterSignup from './NewsletterSignup';

const categories = ['All', 'News', 'Events'];
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

type UpcomingEventGroup = {
  key: string;
  month: string;
  year: string;
  events: UpcomingEvent[];
};

const groupUpcomingEventsByMonth = (events: UpcomingEvent[]) => (
  events.reduce<UpcomingEventGroup[]>((groups, event) => {
    const key = `${event.year}-${event.month}`;
    const existingGroup = groups.find((group) => group.key === key);

    if (existingGroup) {
      existingGroup.events.push(event);
      return groups;
    }

    groups.push({
      key,
      month: event.month,
      year: event.year,
      events: [event],
    });

    return groups;
  }, [])
);

interface NewsContentProps {
  initialNews: NewsItem[];
  initialFeatured: NewsItem | null;
  upcomingEvents: UpcomingEvent[];
  archive: ArchiveEntry[];
}

const NewsContent: React.FC<NewsContentProps> = ({ initialNews, initialFeatured, upcomingEvents }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = initialFeatured;
  const newsItems = initialNews.filter(item => !item.featured);

  // Filtering Logic
  const filteredItems = newsItems.filter(item => {
    // Standardize category comparison (handle plural UI vs singular data)
    let normalizedActive = activeCategory;
    if (activeCategory === 'Events') normalizedActive = 'Event';

    const normalizedItem = item.category;
    
    const matchesCategory = activeCategory === 'All' || normalizedItem === normalizedActive;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured post logic
  let activeNormalized = activeCategory;
  if (activeCategory === 'Events') activeNormalized = 'Event';
  
  const showFeatured = !!featuredPost &&
    (activeCategory === 'All' || featuredPost.category === activeNormalized) &&
    (searchQuery === '' || featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = filteredItems.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );
  const upcomingEventGroups = groupUpcomingEventsByMonth(upcomingEvents);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Featured Post Card */}
            {showFeatured && featuredPost && (
              <Link href={`/news/${featuredPost.slug}`} className="block mb-10">
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer"
                >
                  <div className="md:w-[45%] relative h-72 md:h-auto overflow-hidden">
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-4 py-1.5 bg-[#21409A] text-white text-[9px] font-bold tracking-wider rounded-full shadow-lg">
                        {featuredPost.category}
                      </span>
                    </div>
                    <Image
                      src={featuredPost.image || FALLBACK_IMAGE}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="md:w-[55%] p-10 md:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold mb-4">
                      <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span>{formatMonthYear(featuredPost.date)}</span>
                    </div>
                    <h3 className="text-3xl md:text-[38px] font-black text-[#1a1a1a] mb-6 font-iic leading-tight tracking-tight group-hover:text-[#21409A] transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-slate-700 mb-10 leading-relaxed text-[15px] font-medium">
                      Join industry leaders and leading academics for a full day of keynotes, workshops, and networking focused on...
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{featuredPost.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{featuredPost.location}</span>
                      </div>
                    </div>

                    <div className="self-start px-8 py-3.5 bg-[#21409A] text-white rounded-lg font-bold text-xs shadow-lg group-hover:bg-[#21409A] transition-all flex items-center gap-3">
                      Register Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Sub-News Grid */}
            <AnimeStagger
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              selector=".news-card-wrapper"
              staggerDelay={100}
              translateY={30}
              duration={760}
            >
              <AnimatePresence mode="popLayout">
                {paginatedItems.map((item, idx) => (
                  <Link key={item.id} href={`/news/${item.slug}`} className="news-card-wrapper">
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
                            url={`/news/${item.slug}`}
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

          {/* Sidebar */}
          <AnimeStagger
            className="lg:col-span-4 space-y-8"
            selector=":scope > div"
            staggerDelay={120}
            translateY={28}
            duration={760}
          >
            
            {/* Upcoming Events */}
            <div className="bg-white p-7 sm:p-8 md:p-10 rounded-[24px] border-[2px] border-[#74C044] shadow-sm">
              <div className="mb-9 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FB] text-[#21409A]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-[#1a1a1a] font-iic tracking-tight">Upcoming Events</h5>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Month view</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('Events');
                    setCurrentPage(1);
                  }}
                  className="mt-2 shrink-0 text-[11px] tracking-wider font-bold text-slate-400 hover:text-[#74C044] transition-colors"
                >
                  View All
                </button>
              </div>

              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-slate-500 font-medium">No events scheduled. Check back soon.</p>
              ) : (
                <div className="space-y-7">
                  {upcomingEventGroups.map((group) => (
                    <div key={group.key}>
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#21409A] text-white shadow-sm shadow-[#21409A]/10">
                          <span className="text-[10px] font-black leading-none tracking-[0.14em]">{group.month}</span>
                          <span className="mt-1 text-[10px] font-bold leading-none text-white/70">{group.year}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#74C044]">{group.month} {group.year}</p>
                          <p className="mt-1 text-xs font-bold text-slate-400">
                            {group.events.length === 1 ? '1 event' : `${group.events.length} events`}
                          </p>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                      </div>

                      <div className="relative ml-6 space-y-3 border-l border-slate-200 pl-5">
                        {group.events.map((event) => (
                          <Link
                            key={event.id}
                            href={`/news/${event.slug}`}
                            className="group relative flex items-center gap-3 rounded-xl py-3 pl-1 pr-3 transition-colors hover:bg-[#F5F9F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044]/45"
                          >
                            <span className="absolute -left-[26px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-[#74C044] shadow-[0_0_0_3px_rgba(116,192,68,0.18)]" />
                            <div className="min-w-0 flex-1">
                              <h6 className="text-[14px] font-bold text-[#1a1a1a] leading-tight transition-colors group-hover:text-[#21409A] line-clamp-2">{event.title}</h6>
                            </div>
                            <svg className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <NewsletterSignup />

          </AnimeStagger>

        </div>
      </div>
    </section>
  );
};

export default NewsContent;
