import React from 'react';
import NewsHero from '../../components/sections/news/NewsHero';
import NewsContent from '../../components/sections/news/NewsContent';
import { getAllNews, getFeaturedNews, getUpcomingEvents, getNewsArchive } from '../../lib/news';
import { logExpectedDbFallback } from '../../lib/db-fallback-log';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import {
  absoluteAssetUrl,
  buildEventNode,
  buildNewsAndEventsCollectionNode,
  buildNewsArticleNode,
  buildNewsItemListNode,
  buildSchemaGraph,
} from '@/lib/seo-schema';

const pageTitle = 'IIC News, Events & Blogs | Itahari International College';
const pageDescription = 'Read IIC news, events and blogs, including campus stories, student achievements, workshops, admissions updates and learning insights.';
const openGraphImage = absoluteAssetUrl('/og/news.png');

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: { canonical: '/news-and-events' },
  category: 'Education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/news-and-events',
    siteName: 'Itahari International College',
    locale: 'en_NP',
    type: 'website',
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: 'IIC News and Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [openGraphImage],
  },
};

const NewsPage = async () => {
  let allNews: Awaited<ReturnType<typeof getAllNews>> = [];
  let featuredPost: Awaited<ReturnType<typeof getFeaturedNews>> = null;
  let upcomingEvents: Awaited<ReturnType<typeof getUpcomingEvents>> = [];
  let archive: Awaited<ReturnType<typeof getNewsArchive>> = [];

  try {
    [allNews, featuredPost, upcomingEvents, archive] = await Promise.all([
      getAllNews(),
      getFeaturedNews(),
      getUpcomingEvents(4),
      getNewsArchive(6),
    ]);
  } catch (err) {
    logExpectedDbFallback('[news] DB unavailable, rendering empty state:', err);
  }

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'News & Events', item: '/news-and-events' },
  ];
  const schemaItems = allNews.filter((item) => item.slug).slice(0, 12);

  return (
    <main className="bg-white min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildNewsAndEventsCollectionNode(schemaItems, pageDescription),
          buildNewsItemListNode(schemaItems),
          ...schemaItems.map((item) => (item.category === 'Event' ? buildEventNode(item) : buildNewsArticleNode(item))),
        ])}
      />
      <NewsHero />
      <NewsContent
        initialNews={allNews}
        initialFeatured={featuredPost}
        upcomingEvents={upcomingEvents}
        archive={archive}
      />
    </main>
  );
};

export default NewsPage;
