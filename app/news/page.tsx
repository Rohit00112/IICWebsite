import React from 'react';
import NewsHero from '../../components/sections/news/NewsHero';
import NewsContent from '../../components/sections/news/NewsContent';
import { getAllNews, getFeaturedNews, getUpcomingEvents } from '../../lib/news';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import JsonLd from '@/components/common/JsonLd';
import {
  buildEventNode,
  buildNewsItemListNode,
  buildSchemaGraph,
  buildWebPageNode,
} from '@/lib/seo-schema';

const pageDescription = 'Read the latest IIC news, events, student achievements, and academic updates from our globally connected college in Itahari.';

export const metadata: Metadata = {
  title: 'Latest News & Events | Itahari International College',
  description: pageDescription,
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'Latest News & Events | Itahari International College',
    description: pageDescription,
    url: '/news',
    type: 'website',
  },
};

const NewsPage = async () => {
  let allNews: Awaited<ReturnType<typeof getAllNews>> = [];
  let featuredPost: Awaited<ReturnType<typeof getFeaturedNews>> = null;
  let upcomingEvents: Awaited<ReturnType<typeof getUpcomingEvents>> = [];

  try {
    [allNews, featuredPost, upcomingEvents] = await Promise.all([
      getAllNews(),
      getFeaturedNews(),
      getUpcomingEvents(4),
    ]);
  } catch (err) {
    console.error('[news] DB unavailable, rendering empty state:', err);
  }

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'News & Events', item: '/news' },
  ];

  return (
    <main className="bg-white min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: '/news',
            name: 'Latest News & Events',
            description: pageDescription,
            type: 'CollectionPage',
            image: '/images/common/seminar.webp',
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
      />
    </main>
  );
};

export default NewsPage;
