'use client';

import React from 'react';
import NewsHero from '../../components/sections/news/NewsHero';
import NewsContent from '../../components/sections/news/NewsContent';
import PageTransition from '../../components/layout/PageTransition';

const NewsPage = () => {
  return (
    <PageTransition>
      <main className="bg-white min-h-screen">
        <NewsHero />
        <NewsContent />
      </main>
    </PageTransition>
  );
};

export default NewsPage;
