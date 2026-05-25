import React from 'react';
import NewsHero from '../../components/sections/news/NewsHero';
import NewsContent from '../../components/sections/news/NewsContent';
import { getAllNews, getFeaturedNews, getUpcomingEvents, getNewsArchive } from '../../lib/news';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Latest News, Events & Announcements | Itahari International College',
  description: 'Stay updated with the latest news, success stories, and upcoming events from Itahari International College and London Metropolitan University.',
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
    { name: 'News & Events', item: '/news' },
  ];

  return (
    <main className="bg-white min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ItemList",
                "name": "Latest News & Events",
                "numberOfItems": allNews.length,
                "itemListElement": allNews.map((item, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "url": `https://iic.edu.np/news/${item.slug}`,
                  "name": item.title
                }))
              },
              ...allNews.filter((item) => item.category === 'Event').map((event) => ({
                "@type": "Event",
                "name": event.title,
                "startDate": new Date(event.date).toISOString(),
                "location": {
                  "@type": "Place",
                  "name": event.location || "Itahari International College",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Sundar Haraicha 04",
                    "addressLocality": "Itahari",
                    "addressCountry": "NP"
                  }
                },
                "image": event.image,
                "description": event.description,
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
              }))
            ]
          })
        }}
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
