import { Metadata } from 'next';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';
import NewsDetailHero from '../../../components/sections/news/NewsDetailHero';
import NewsDetailContent from '../../../components/sections/news/NewsDetailContent';
import { getNewsBySlug, getRelatedNews } from '../../../lib/news';
import { notFound } from 'next/navigation';
import RelatedNews from '../../../components/sections/news/RelatedNews';
import JsonLd from '@/components/common/JsonLd';
import {
  buildEventNode,
  buildNewsArticleNode,
  buildSchemaGraph,
  buildWebPageNode,
} from '@/lib/seo-schema';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  
  if (!item) return { title: 'Not Found' };

  return {
    title: `${item.title} | Itahari International College`,
    description: item.description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `/news/${slug}`,
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

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'News & Events', item: '/news' },
    { name: item.title, item: `/news/${slug}` },
  ];
  const itemSchema = item.category === 'Event'
    ? buildEventNode(item)
    : buildNewsArticleNode(item);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <JsonLd
        data={buildSchemaGraph([
          buildWebPageNode({
            path: `/news/${slug}`,
            name: item.title,
            description: item.description,
            image: item.image,
            mainEntity: { '@id': itemSchema['@id'] },
          }),
          itemSchema,
        ])}
      />
      <main className="bg-white min-h-screen">
        <NewsDetailHero item={item} />
        <NewsDetailContent item={item} />
        <RelatedNews items={relatedNews} />
      </main>
    </>
  );
};

export default NewsDetailPage;
