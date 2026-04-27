import React from 'react';
import NewsHero from '../../components/sections/news/NewsHero';
import NewsContent from '../../components/sections/news/NewsContent';
import PageTransition from '../../components/layout/PageTransition';
import { getAllNews, getFeaturedNews } from '../../lib/news';
import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Latest News, Events & Announcements | IIC Itahari',
  description: 'Stay updated with the latest news, success stories, and upcoming events from Itahari International College and London Metropolitan University.',
};

const NewsPage = async () => {
  const allNews = await getAllNews();
  const featuredPost = await getFeaturedNews();

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'News & Events', item: '/news' },
  ];

  return (
    <PageTransition>
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
                  "itemListElement": allNews.map((item: any, index: number) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `https://iic.edu.np/news/${item.slug}`,
                    "name": item.title
                  }))
                },
                ...allNews.filter((item: any) => item.category === 'Event').map((event: any) => ({
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
        <NewsContent initialNews={allNews} initialFeatured={featuredPost} />
      </main>
    </PageTransition>
  );
};

export default NewsPage;
