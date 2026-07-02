# News & Events Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/news` listing and `/news/[slug]` detail pages to a minimalist editorial look while preserving all functionality (search, filter, pagination, newsletter API, share, SEO schema).

**Architecture:** Server pages keep data fetching + JSON-LD unchanged. Client components restyled/rewritten: flat toolbar, uniform card grid (no featured), inline Upcoming Events + Newsletter below feed, centered single-column article body. Remove `Tilt`, `Magnetic`, heavy shadows, filled pills, sidebar layouts.

**Tech Stack:** Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind, framer-motion. No React test framework — verification is `npx tsc --noEmit` + `npm run build` + manual dev-server checks.

**Spec:** `docs/superpowers/specs/2026-07-02-news-events-redesign-design.md`

---

## Conventions (all tasks)

- Colors: white bg, `#21409A` primary, `#74C044` sparingly, slate greys.
- Cards: `border border-gray-200`, hover `border-[#21409A]/40` + `-translate-y-1`, `transition-all`. No `shadow-md`/`shadow-xl`/`Tilt`.
- Keep `font-iic` on headings, keep existing framer-motion fade/stagger (subtle only).
- After each task: `npx tsc --noEmit` must be clean, then commit.

---

### Task 1: Lighten listing hero

**Files:**
- Modify: `components/sections/news/NewsHero.tsx`

- [ ] **Step 1: Replace hero body**

Replace the returned JSX section (keep `'use client'`, imports of `motion`, `AnimeReveal`) with a calmer version:

```tsx
  return (
    <section className="pt-28 pb-10 md:pt-32 md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-[11px] font-bold uppercase tracking-[0.28em] text-[#21409A] mb-6"
        >
          Newsroom
        </motion.span>

        <AnimeReveal
          as="h1"
          text="News & Events"
          className="text-5xl md:text-7xl font-black font-iic text-[#1a1a1a] mb-6 justify-center"
          staggerFrom="center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          College stories, student achievements, academic updates, and events from Itahari International College.
        </motion.p>
      </div>
    </section>
  );
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `NewsHero`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/news/NewsHero.tsx
git commit -m "feat(news): lighten news hero to minimalist"
```

---

### Task 2: Rewrite listing content (toolbar, grid, inline sections)

**Files:**
- Rewrite: `components/sections/news/NewsContent.tsx`

This is the core task. Full replacement file below. Preserves: `activeCategory`/`searchQuery`/`currentPage` state, `Events`→`Event` normalization, `ITEMS_PER_PAGE`, `groupUpcomingEventsByMonth`, `ShareMenu` on cards, `NewsletterSignup`. Removes: `Tilt`, featured post card, sidebar, `AnimeStagger` heavy usage retained lightly. Featured item merged into feed (deduped).

- [ ] **Step 1: Replace entire file contents**

```tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { NewsItem, UpcomingEvent, ArchiveEntry } from '@/lib/news';
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
  archive: ArchiveEntry[];
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
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `NewsContent`. (`archive` prop intentionally unused — destructured out of props signature, so no unused-var error; confirm no TS error. If `noUnusedParameters` flags it, it's fine because it's a prop not a param.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/news/NewsContent.tsx
git commit -m "feat(news): minimalist full-width listing, drop featured+sidebar"
```

---

### Task 3: Drop unused archive fetch in listing page

**Files:**
- Modify: `app/news/page.tsx`

`getNewsArchive` result (`archive`) is no longer rendered. Remove its fetch and prop to avoid dead work. `NewsContent` still accepts `archive?` — make it optional so removal is clean.

- [ ] **Step 1: Make `archive` optional in NewsContent props**

In `components/sections/news/NewsContent.tsx`, change:

```tsx
  archive: ArchiveEntry[];
```
to:
```tsx
  archive?: ArchiveEntry[];
```

- [ ] **Step 2: Remove archive fetch from page**

In `app/news/page.tsx`, update imports and fetch. Change the import line:

```tsx
import { getAllNews, getFeaturedNews, getUpcomingEvents, getNewsArchive } from '../../lib/news';
```
to:
```tsx
import { getAllNews, getFeaturedNews, getUpcomingEvents } from '../../lib/news';
```

Remove the `archive` declaration line:
```tsx
  let archive: Awaited<ReturnType<typeof getNewsArchive>> = [];
```

Change the `Promise.all` block:
```tsx
    [allNews, featuredPost, upcomingEvents, archive] = await Promise.all([
      getAllNews(),
      getFeaturedNews(),
      getUpcomingEvents(4),
      getNewsArchive(6),
    ]);
```
to:
```tsx
    [allNews, featuredPost, upcomingEvents] = await Promise.all([
      getAllNews(),
      getFeaturedNews(),
      getUpcomingEvents(4),
    ]);
```

Change the `<NewsContent>` usage — remove the `archive` prop:
```tsx
      <NewsContent
        initialNews={allNews}
        initialFeatured={featuredPost}
        upcomingEvents={upcomingEvents}
      />
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean. If `ArchiveEntry` import in NewsContent becomes unused, remove it from the import in `NewsContent.tsx` (`import type { NewsItem, UpcomingEvent } from '@/lib/news';`).

- [ ] **Step 4: Commit**

```bash
git add app/news/page.tsx components/sections/news/NewsContent.tsx
git commit -m "chore(news): drop unused archive fetch from listing"
```

---

### Task 4: Restyle NewsletterSignup as inline band

**Files:**
- Modify: `components/sections/news/NewsletterSignup.tsx`

Keep ALL logic (`email`, `status`, `handleSubmit`, `/api/subscribe`, `AnimatePresence` message). Only change the outer wrapper + input/button layout to a centered horizontal band.

- [ ] **Step 1: Replace the returned JSX wrapper**

Replace the top-level `<div className="bg-[#DDE5F0] ...">` container and its inner heading/copy/form layout with:

```tsx
  return (
    <div className="rounded-3xl border border-gray-200 bg-slate-50 px-8 py-12 text-center md:px-16">
      <h5 className="mb-3 font-iic text-2xl font-bold tracking-tight text-[#1a1a1a]">Stay Informed</h5>
      <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-slate-500">
        Get the latest news and event updates delivered directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row" noValidate>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          disabled={status === 'loading'}
          className="flex-1 rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-[#1a1a1a] outline-none transition-all placeholder:text-slate-400 focus:border-[#21409A] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-2 rounded-full bg-[#21409A] px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Subscribing…</span>
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>

      <AnimatePresence>
        {status !== 'idle' && status !== 'loading' && message && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="status"
            className={`mx-auto mt-4 max-w-lg rounded-full px-4 py-3 text-[12px] font-bold ${
              status === 'success' ? 'bg-[#74C044]/15 text-[#21409A]' : 'bg-[#ED1C24]/10 text-[#ED1C24]'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add components/sections/news/NewsletterSignup.tsx
git commit -m "feat(news): restyle newsletter as inline band"
```

---

### Task 5: Lighten detail hero

**Files:**
- Modify: `components/sections/news/NewsDetailHero.tsx`

Reduce height, soften gradient, add thin meta row (category · date · location · time). Keep breadcrumb + `AnimeReveal` title.

- [ ] **Step 1: Replace the returned JSX**

Replace the `<section ...>` block. Height `50vh`, lighter zoom, add meta row using `item.location`/`item.time` (conditional):

```tsx
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
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add components/sections/news/NewsDetailHero.tsx
git commit -m "feat(news): lighten article hero + inline meta row"
```

---

### Task 6: Rewrite detail body to centered single column

**Files:**
- Rewrite: `components/sections/news/NewsDetailContent.tsx`

Remove `Tilt`, `Magnetic`, `AnimeReveal`, sidebar cards. Keep prose (`sanitizeHtml`), keep `SHARE_TARGETS` share row (flattened), keep back link. Meta already moved to hero.

- [ ] **Step 1: Replace entire file contents**

```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { sanitizeHtml } from '@/lib/sanitize';

interface NewsDetailContentProps {
  item: NewsItem;
}

const SHARE_TARGETS = [
  {
    name: 'Facebook',
    hoverBg: 'hover:bg-[#1877F2]',
    getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    hoverBg: 'hover:bg-[#0A66C2]',
    getUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

const NewsDetailContent: React.FC<NewsDetailContentProps> = ({ item }) => {
  const sanitizedContent = React.useMemo(() => sanitizeHtml(item.content), [item.content]);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[720px] px-6">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none text-left prose-headings:font-iic prose-headings:font-bold [&&_h1]:text-[#21409A] [&&_h2]:text-[#21409A] [&&_h3]:text-[#21409A] [&&_h4]:text-[#21409A] [&&_p]:text-slate-800 [&&_p]:leading-[1.8] [&&_li]:text-slate-800 [&&_strong]:text-slate-900 [&&_span]:text-slate-800 prose-li:marker:text-[#21409A] prose-li:marker:font-black prose-blockquote:border-[#74C044] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl [&_*]:max-w-full [&_*]:!whitespace-normal [&_*]:[hyphens:none] [&_*]:[overflow-wrap:normal] [&_*]:[word-break:normal] [&_a]:[overflow-wrap:anywhere] [&_code]:[overflow-wrap:anywhere] [&_pre]:overflow-x-auto"
        >
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="rich-content max-w-full overflow-hidden [text-wrap:pretty]"
          />
        </motion.article>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-gray-100 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Share</span>
            <div className="flex items-center gap-3">
              {SHARE_TARGETS.map(({ name, getUrl, hoverBg, icon }) => (
                <button
                  key={name}
                  type="button"
                  aria-label={`Share on ${name}`}
                  onClick={() => {
                    const url = typeof window !== 'undefined' ? window.location.href : '';
                    window.open(getUrl(url), `share-${name}`, 'width=626,height=620,noopener,noreferrer');
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:text-white ${hoverBg}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <Link href="/news" className="group flex items-center gap-3 text-sm font-bold text-[#21409A]">
            <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to News & Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailContent;
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean. (`Magnetic`, `AnimeReveal`, `AnimeStagger`, `Tilt` imports removed — confirm no leftover references.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/news/NewsDetailContent.tsx
git commit -m "feat(news): centered single-column article body, drop sidebar"
```

---

### Task 7: Restyle RelatedNews cards to match

**Files:**
- Modify: `components/sections/news/RelatedNews.tsx`

Match new minimalist card (thin border, no `shadow`, text category label, `aspect-[16/9]`). Keep `AnimeReveal`/`AnimeStagger`/section shell.

- [ ] **Step 1: Replace the card `<Link>` block inside the map**

Replace the inner `<Link href={...} className="group block bg-white rounded-3xl ...">...</Link>` with:

```tsx
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
```

- [ ] **Step 2: Change section bg to white for consistency**

Change the outer `<section className="py-16 md:py-20 bg-[#F8FAFC] border-t border-gray-100">` to:
```tsx
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add components/sections/news/RelatedNews.tsx
git commit -m "feat(news): minimalist related-story cards"
```

---

### Task 8: Full build + manual verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, no errors. `/news` and `/news/[slug]` present in route output.

- [ ] **Step 2: Manual dev check**

Run: `npm run start` (or `npm run dev`) and open `/news`:
- Toolbar tabs switch (All/News/Events), search narrows results, pagination flips pages.
- Grid uniform, no featured card, no sidebar.
- Upcoming Events section renders below feed; "View All" jumps to Events filter.
- Newsletter band submits (network POST `/api/subscribe`).

Open a `/news/<slug>`:
- Hero ~50vh, meta row shows date (+ location/time if event).
- Body single centered column, prose intact.
- Share buttons open popups; Back link works.
- Related cards match new style + link.

- [ ] **Step 3: Confirm SEO intact**

Run: `curl -s http://localhost:3000/news | grep -c 'application/ld+json'`
Expected: ≥ 1 (JSON-LD still emitted). Same for a detail URL.

- [ ] **Step 4: Final commit (if any residual)**

```bash
git add -A
git commit -m "chore(news): redesign verification" || echo "nothing to commit"
```

---

## Self-Review Notes

- **Spec coverage:** hero lightening (T1,T5), toolbar+grid+no-featured+inline sections (T2), sidebar removal (T2,T6), newsletter reuse+restyle (T4), detail single column (T6), related restyle (T7), remove Tilt/Magnetic/pills/shadows (T2,T6,T7). All spec sections mapped.
- **Featured handling:** merged into feed with dedupe (T2) — matches spec "keep fetch, pass featured into feed as normal item."
- **Preserve list:** filter/search/pagination state (T2), newsletter API (T4 untouched logic), share targets (T2 ShareMenu, T6 SHARE_TARGETS), JSON-LD (pages untouched except archive removal T3), sanitizeHtml (T6). All retained.
- **Type consistency:** `NewsContentProps.archive` made optional (T3) before removing prop; `ArchiveEntry` import pruned if unused.
