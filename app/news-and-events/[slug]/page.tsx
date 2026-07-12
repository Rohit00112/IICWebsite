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
  COLLEGE_NAME,
  mergeKeywords,
  NEWS_PAGE_KEYWORDS,
  toIsoDate,
} from '@/lib/seo-schema';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  
  if (!item) {
    return {
      title: 'News Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/news-and-events/${item.slug || slug}`;
  const section = item.category === 'Event' ? 'IIC Events' : 'IIC News';
  const authorName = item.author?.name?.trim() || COLLEGE_NAME;
  const publishedTime = toIsoDate(item.date);
  const keywords = mergeKeywords(NEWS_PAGE_KEYWORDS, [item.title, item.category, item.location, section]);

  return {
    title: {
      absolute: `${item.title} | Itahari International College`,
    },
    description: item.description,
    authors: [{ name: authorName }],
    category: section,
    alternates: { canonical: canonicalPath },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: item.title,
      description: item.description,
      url: canonicalPath,
      siteName: COLLEGE_NAME,
      locale: 'en_NP',
      images: [
        {
          url: item.image,
          alt: item.title,
        },
      ],
      type: 'article',
      publishedTime,
      modifiedTime: publishedTime,
      authors: [authorName],
      section,
      tags: keywords.slice(0, 10),
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
    { name: 'News & Events', item: '/news-and-events' },
    { name: item.title, item: `/news-and-events/${slug}` },
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
            path: `/news-and-events/${item.slug || slug}`,
            name: item.title,
            description: item.description,
            image: item.image,
            keywords: mergeKeywords(NEWS_PAGE_KEYWORDS, [item.title, item.category]),
            mainEntity: { '@id': itemSchema['@id'] },
            dateModified: toIsoDate(item.date),
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
