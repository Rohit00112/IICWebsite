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
        <NewsHero />
        <NewsContent initialNews={allNews} initialFeatured={featuredPost} />
      </main>
    </PageTransition>
  );
};

export default NewsPage;
