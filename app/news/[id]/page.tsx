import { Metadata } from 'next';
import NewsDetailHero from '../../../components/sections/news/NewsDetailHero';
import NewsDetailContent from '../../../components/sections/news/NewsDetailContent';
import PageTransition from '../../../components/layout/PageTransition';
import { getNewsById } from '../../../lib/news';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await getNewsById(id);
  
  if (!item) return { title: 'Not Found' };

  return {
    title: `${item.title} | Itahari International College`,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: [item.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
      images: [item.image],
    },
  };
}

const NewsDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const item = await getNewsById(id);

  if (!item) {
    notFound();
  }

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.description,
    image: item.image,
    datePublished: new Date(item.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Itahari International College',
    },
  };

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-white min-h-screen">
        <NewsDetailHero item={item} />
        <NewsDetailContent item={item} />
      </main>
    </PageTransition>
  );
};

export default NewsDetailPage;
