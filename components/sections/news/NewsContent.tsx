'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';

const categories = ['All', 'News', 'Events', 'Announcements'];

interface NewsContentProps {
  initialNews: any[];
  initialFeatured: any;
}

const NewsContent: React.FC<NewsContentProps> = ({ initialNews, initialFeatured }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = initialFeatured;
  const newsItems = initialNews.filter(item => !item.featured);

  // Filtering Logic
  const filteredItems = newsItems.filter(item => {
    // Standardize category comparison (handle plural UI vs singular data)
    let normalizedActive = activeCategory;
    if (activeCategory === 'Events') normalizedActive = 'Event';
    if (activeCategory === 'Announcements') normalizedActive = 'Announcement';
    
    const normalizedItem = item.category;
    
    const matchesCategory = activeCategory === 'All' || normalizedItem === normalizedActive;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured post logic
  let activeNormalized = activeCategory;
  if (activeCategory === 'Events') activeNormalized = 'Event';
  if (activeCategory === 'Announcements') activeNormalized = 'Announcement';
  
  const showFeatured = (activeCategory === 'All' || featuredPost.category === activeNormalized) && 
                      (searchQuery === '' || featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const upcomingEvents = [
    { id: 1, day: '15', month: 'OCTOBER', title: 'Global Tech & Innovation Summit', time: '09:00 AM - 05:00 PM' },
    { id: 2, day: '05', month: 'NOVEMBER', title: 'Alumni Networking Mixer: Bus', time: '06:00 PM - 08:30 PM' },
    { id: 3, day: '22', month: 'OCTOBER', title: 'Guest Lecture: The Future of E-', time: '02:00 PM - 04:00 PM' }
  ];

  const archives = [
    { month: 'September 2024', count: 12 },
    { month: 'August 2024', count: 8 },
    { month: 'July 2024', count: 15 },
    { month: 'June 2024', count: 5 },
    { month: 'May 2024', count: 20 }
  ];

  return (
    <section className="pb-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filter Bar */}
        <div className="bg-[#1A2B56] rounded-xl p-3 mb-16 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex p-1 gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-[#121E3B] text-white shadow-inner' 
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
            {showFeatured && (
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
                      <span className="px-4 py-1.5 bg-[#21409A] text-white text-[9px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                        {featuredPost.category}
                      </span>
                    </div>
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="md:w-[55%] p-10 md:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold mb-4 uppercase">
                      <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span>{featuredPost.date}</span>
                    </div>
                    <h3 className="text-3xl md:text-[38px] font-black text-[#1a1a1a] mb-6 font-sora leading-tight tracking-tight group-hover:text-[#21409A] transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-slate-700 mb-10 leading-relaxed text-[15px] font-medium">
                      Join industry leaders and leading academics for a full day of keynotes, workshops, and networking focused on...
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{featuredPost.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{featuredPost.location}</span>
                      </div>
                    </div>

                    <div className="self-start px-8 py-3.5 bg-[#21409A] text-white rounded-lg font-bold text-xs shadow-lg group-hover:bg-[#1a3580] transition-all flex items-center gap-3">
                      Register Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Sub-News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <Link key={item.id} href={`/news/${item.slug}`}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 h-full flex flex-col cursor-pointer"
                    >
                      <div className="relative h-60 overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md text-white ${
                            item.category === 'News' ? 'bg-[#74C044]' : 'bg-[#00B2A9]'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-8 md:p-10 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold mb-4 uppercase">
                          <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span>{item.date}</span>
                        </div>
                        <h4 className="text-xl font-bold text-[#1a1a1a] mb-5 font-sora leading-tight tracking-tight line-clamp-2 min-h-[50px] group-hover:text-[#21409A] transition-colors">
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
                          <button className="text-gray-400 hover:text-[#21409A] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Upcoming Events */}
            <div className="bg-white p-10 rounded-[24px] border-[2px] border-[#00B2A9] shadow-sm">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#1A2B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <h5 className="text-xl font-bold text-[#1a1a1a] font-sora tracking-tight">Upcoming Events</h5>
                </div>
                <button className="text-[11px] uppercase tracking-wider font-bold text-slate-400 hover:text-[#00B2A9] transition-colors">View All</button>
              </div>

              <div className="space-y-10">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex gap-4 group cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#E8EEF5] rounded-xl shrink-0">
                      <span className="text-[9px] font-bold text-[#21409A] mb-1">{event.month}</span>
                      <span className="text-2xl font-black text-[#1A2B56] leading-none">{event.day}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h6 className="text-[14px] font-bold text-[#1a1a1a] leading-tight mb-1.5 group-hover:text-[#21409A] transition-colors line-clamp-2">{event.title}</h6>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter - Matches Reference Precisely */}
            <div className="bg-[#DDE5F0] p-10 rounded-[24px] shadow-sm">
              <h5 className="text-xl font-bold font-sora mb-4 text-[#1a1a1a] tracking-tight">Stay Informed</h5>
              <p className="text-gray-600 text-[14px] mb-10 leading-relaxed font-medium">Get the latest news and event updates delivered directly to your inbox.</p>
              <div className="space-y-4">
                <input 
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-[#E8EEF5] border-none rounded-lg py-4 px-5 outline-none focus:ring-2 focus:ring-[#21409A]/10 transition-all text-sm text-[#1A2B56] font-medium placeholder:text-gray-400"
                />
                <button className="w-full py-4 bg-[#1F3E97] text-white font-bold rounded-lg text-sm hover:shadow-xl transition-all active:scale-[0.98]">
                  Subscribe Newsletter
                </button>
              </div>
            </div>

            {/* Archive */}
            <div className="bg-[#F3F7FA] p-10 rounded-[24px] shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <svg className="w-6 h-6 text-[#1A2B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h5 className="text-xl font-bold text-[#1a1a1a] font-sora tracking-tight">News Archive</h5>
              </div>
              <div className="space-y-6">
                {archives.map((archive) => (
                  <div key={archive.month} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-[15px] font-bold text-slate-600 group-hover:text-[#21409A] transition-colors">{archive.month}</span>
                    <span className="text-[13px] font-bold text-slate-400">{archive.count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsContent;
