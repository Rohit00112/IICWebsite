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
