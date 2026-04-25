import React from 'react';
import NewsHero from '../../components/sections/news/NewsHero';
import NewsContent from '../../components/sections/news/NewsContent';
import PageTransition from '../../components/layout/PageTransition';
import { getAllNews, getFeaturedNews } from '../../lib/news';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Events | Itahari International College',
  description: 'Stay updated with the latest news, announcements, and events from Itahari International College.',
};

const NewsPage = async () => {
  const allNews = await getAllNews();
  const featuredPost = await getFeaturedNews();

  return (
    <PageTransition>
      <main className="bg-white min-h-screen">
        <NewsHero />
        <NewsContent initialNews={allNews} initialFeatured={featuredPost} />
      </main>
    </PageTransition>
  );
};

export default NewsPage;
