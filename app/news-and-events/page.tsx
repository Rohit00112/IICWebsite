import React from 'react';
import NewsHero from '../../components/sections/news/NewsHero';
import NewsContent from '../../components/sections/news/NewsContent';
import { getAllNews, getFeaturedNews, getUpcomingEvents, getNewsArchive } from '../../lib/news';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import {
  buildEventNode,
  buildNewsItemListNode,
  buildSchemaGraph,
  buildWebPageNode,
  NEWS_PAGE_KEYWORDS,
} from '@/lib/seo-schema';

const pageDescription = 'Read the latest IIC news, events, student achievements, and academic updates from our globally connected college in Itahari.';

export const metadata: Metadata = {
  title: 'Latest News & Events',
  description: pageDescription,
  keywords: NEWS_PAGE_KEYWORDS,
  alternates: { canonical: '/news-and-events' },
  openGraph: {
    title: 'Latest News & Events | Itahari International College',
    description: pageDescription,
    url: '/news-and-events',
    type: 'website',
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
    console.error('[news] DB unavailable, rendering empty state:', err);
  }

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'News & Events', item: '/news-and-events' },
  ];

  return (
    <main className="bg-white min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/news-and-events',
            name: 'Latest News & Events',
            description: pageDescription,
            type: 'CollectionPage',
            image: '/images/common/seminar.webp',
            keywords: NEWS_PAGE_KEYWORDS,
          }),
          buildNewsItemListNode(allNews),
          ...allNews.filter((item) => item.category === 'Event').map(buildEventNode),
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
