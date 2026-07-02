'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { NewsItem, UpcomingEvent } from '@/lib/news';
import ShareMenu from './ShareMenu';
import NewsletterSignup from './NewsletterSignup';

const categories = ['All', 'News', 'Events'];
const FALLBACK_IMAGE = '/images/common/tower_block.JPG';
const ITEMS_PER_PAGE = 6;

const formatMonthYear = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(parsed);
};

type UpcomingEventGroup = {
  key: string;
  month: string;
  year: string;
  events: UpcomingEvent[];
};

const groupUpcomingEventsByMonth = (events: UpcomingEvent[]) =>
  events.reduce<UpcomingEventGroup[]>((groups, event) => {
    const key = `${event.year}-${event.month}`;
    const existing = groups.find((g) => g.key === key);
    if (existing) {
      existing.events.push(event);
      return groups;
    }
    groups.push({ key, month: event.month, year: event.year, events: [event] });
    return groups;
  }, []);

interface NewsContentProps {
  initialNews: NewsItem[];
  initialFeatured: NewsItem | null;
  upcomingEvents: UpcomingEvent[];
}

const NewsContent: React.FC<NewsContentProps> = ({ initialNews, initialFeatured, upcomingEvents }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Merge featured into feed (dedupe by id) — no special featured card.
  const feed = React.useMemo(() => {
    if (!initialFeatured) return initialNews;
    const withoutDup = initialNews.filter((item) => item.id !== initialFeatured.id);
    return [initialFeatured, ...withoutDup];
  }, [initialNews, initialFeatured]);

  const filteredItems = feed.filter((item) => {
    const normalizedActive = activeCategory === 'Events' ? 'Event' : activeCategory;
    const matchesCategory = activeCategory === 'All' || item.category === normalizedActive;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = filteredItems.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );
  const upcomingEventGroups = groupUpcomingEventsByMonth(upcomingEvents);

  return (
    <section className="pb-20 md:pb-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Toolbar */}
        <div className="sticky top-0 z-20 -mx-6 mb-12 border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-[#21409A] text-white'
                        : 'text-slate-500 hover:text-[#21409A]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-80">
              <svg className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles, events..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border-b border-gray-200 bg-transparent py-2 pl-7 pr-2 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-slate-400 focus:border-[#21409A]"
              />
            </div>
          </div>
        </div>

        {/* Feed grid */}
        {paginatedItems.length === 0 ? (
          <p className="py-20 text-center text-slate-400">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                >
                  <Link
                    href={`/news/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#21409A]/40"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={item.image || FALLBACK_IMAGE}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em]">
                        <span className="text-[#21409A]">{item.category}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-400">{formatMonthYear(item.date)}</span>
                      </div>
                      <h4 className="mb-3 font-iic text-lg font-bold leading-snug tracking-tight text-[#1a1a1a] line-clamp-2 transition-colors group-hover:text-[#21409A]">
                        {item.title}
                      </h4>
                      <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs font-bold text-[#21409A] transition-all group-hover:gap-3">
                          {item.category === 'Event' ? 'View Details' : 'Read More'}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                        <ShareMenu
                          url={`/news/${item.slug}`}
                          title={item.title}
                          description={item.description}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage(Math.max(1, safeCurrentPage - 1))}
              disabled={safeCurrentPage === 1}
              className="px-3 py-2 text-xs font-bold text-slate-500 transition-colors hover:text-[#21409A] disabled:cursor-not-allowed disabled:opacity-40"
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
                  className={`h-9 w-9 rounded-full text-xs font-bold transition-colors ${
                    isActive ? 'bg-[#21409A] text-white' : 'text-slate-500 hover:text-[#21409A]'
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
              className="px-3 py-2 text-xs font-bold text-slate-500 transition-colors hover:text-[#21409A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* Upcoming Events — inline */}
        {upcomingEvents.length > 0 && (
          <div className="mt-24 border-t border-gray-100 pt-16">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-iic text-3xl font-bold tracking-tight text-[#1a1a1a]">Upcoming Events</h2>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('Events');
                  setCurrentPage(1);
                  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-[#21409A]"
              >
                View All
              </button>
            </div>
            <div className="space-y-10">
              {upcomingEventGroups.map((group) => (
                <div key={group.key}>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#74C044]">
                    {group.month} {group.year}
                  </p>
                  <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {group.events.map((event) => (
                      <Link
                        key={event.id}
                        href={`/news/${event.slug}`}
                        className="group flex items-center gap-5 py-5 transition-colors hover:bg-slate-50"
                      >
                        <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#21409A] text-white">
                          <span className="text-[10px] font-black leading-none tracking-[0.12em]">{group.month}</span>
                          <span className="mt-1 text-[10px] font-bold leading-none text-white/70">{group.year}</span>
                        </span>
                        <h6 className="flex-1 text-base font-bold leading-tight text-[#1a1a1a] transition-colors group-hover:text-[#21409A] line-clamp-2">
                          {event.title}
                        </h6>
                        <svg className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter — inline band */}
        <div className="mt-24">
          <NewsletterSignup />
        </div>
      </div>
    </section>
  );
};

export default NewsContent;
