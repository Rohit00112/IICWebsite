import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import NewsDetailHero from '../../../components/sections/news/NewsDetailHero';
import NewsDetailContent from '../../../components/sections/news/NewsDetailContent';
import PageTransition from '../../../components/layout/PageTransition';
import { getNewsBySlug, getRelatedNews } from '../../../lib/news';
import { notFound } from 'next/navigation';
import RelatedNews from '../../../components/sections/news/RelatedNews';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  
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

const NewsDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedNews = await getRelatedNews(item.category, item.id);

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.description,
    image: item.image,
    datePublished: new Date(item.date).toISOString(),
    dateModified: new Date(item.date).toISOString(), // Fallback to datePublished if no explicit modified date
    author: {
      '@type': 'Person',
      name: item.author?.name || 'IIC Editorial Team',
      jobTitle: item.author?.role || 'Contributor'
    },
    publisher: {
      '@type': 'CollegeOrUniversity',
      name: 'Itahari International College',
      logo: {
        '@type': 'ImageObject',
        url: 'https://iic.edu.np/images/common/iic_logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://iic.edu.np/news/${slug}`
    }
  };

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'News & Events', item: '/news' },
    { name: item.title, item: `/news/${slug}` },
  ];

  return (
    <PageTransition>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-white min-h-screen">
        <NewsDetailHero item={item} />
        <NewsDetailContent item={item} />
        <RelatedNews items={relatedNews} />
      </main>
    </PageTransition>
  );
};

export default NewsDetailPage;
