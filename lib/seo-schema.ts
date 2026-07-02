import type { CourseItem } from '@/lib/courses';
import type { EventGalleryArchive } from '@/lib/event-galleries';
import type { NewsItem } from '@/lib/news';
import type { ScholarshipBatch } from '@/lib/scholarships';

export type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdData =
  | JsonLdPrimitive
  | JsonLdData[]
  | { [key: string]: JsonLdData | undefined };

export type SchemaNode = { [key: string]: JsonLdData | undefined };

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface WebPageNodeOptions {
  path: string;
  name: string;
  description?: string;
  type?: string;
  image?: string;
  mainEntity?: SchemaNode;
  dateModified?: string;
}

export const SITE_URL = 'https://iic.edu.np';
export const COLLEGE_ID = `${SITE_URL}/#college`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const defaultCollegeImage = '/images/home/hero.webp';
const defaultLogo = '/images/common/iic_logo.png';

function compactNode<T extends SchemaNode>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(([, value]) => {
      if (value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  ) as T;
}

export function absoluteUrl(path = '') {
  if (!path) return SITE_URL;
  if (path === '/') return `${SITE_URL}/`;
  if (/^https?:\/\//i.test(path)) return path;

  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function absoluteImageUrl(src?: string) {
  if (!src) return undefined;
  return absoluteUrl(src);
}

export function toIsoDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function durationToIso(value?: string) {
  if (!value) return undefined;

  const match = value.match(/(\d+)\s*(year|month|week|day)s?/i);
  if (!match) return undefined;

  const amount = match[1];
  const unit = match[2].toLowerCase();

  if (unit === 'year') return `P${amount}Y`;
  if (unit === 'month') return `P${amount}M`;
  if (unit === 'week') return `P${amount}W`;
  return `P${amount}D`;
}

export function withContext(node: SchemaNode): SchemaNode {
  return {
    '@context': 'https://schema.org',
    ...node,
  };
}

export function buildSchemaGraph(nodes: Array<SchemaNode | null | undefined>): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean) as SchemaNode[],
  };
}

export function buildCollegeNode(): SchemaNode {
  return {
    '@type': ['CollegeOrUniversity', 'EducationalOrganization'],
    '@id': COLLEGE_ID,
    name: 'Itahari International College',
    alternateName: 'IIC',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteImageUrl(defaultLogo),
      width: 450,
      height: 80,
    },
    image: absoluteImageUrl(defaultCollegeImage),
    description:
      'Itahari International College develops industry-ready graduates through UK-awarded IT and Business degrees in partnership with London Metropolitan University.',
    foundingDate: '2017',
    knowsAbout: [
      'Information Technology',
      'Business Administration',
      'Higher Education',
      'UK Degrees',
    ],
    sameAs: [
      'https://www.facebook.com/iic.nepal',
      'https://www.instagram.com/iic_nepal',
      'https://www.linkedin.com/school/itahari-international-college/',
      'https://www.youtube.com/@itahariinternationalcollege',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sundarharaicha-4, Dulari',
      addressLocality: 'Dulari',
      addressRegion: 'Morang, Koshi Province',
      postalCode: '56705',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.6644,
      longitude: 87.2718,
    },
    telephone: '+977-25-581111',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+977-25-581111',
        contactType: 'admissions',
        areaServed: 'NP',
        availableLanguage: ['Nepali', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+977-25-581112',
        contactType: 'customer service',
        areaServed: 'NP',
        availableLanguage: ['Nepali', 'English'],
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '07:00',
        closes: '17:00',
      },
    ],
  };
}

export function buildWebsiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Itahari International College',
    inLanguage: 'en-NP',
    publisher: { '@id': COLLEGE_ID },
  };
}

export function buildGlobalSchema() {
  return buildSchemaGraph([buildCollegeNode(), buildWebsiteNode()]);
}

export function buildSiteNavigationNode(): SchemaNode {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Life at IIC', href: '/life-at-iic' },
    { name: 'Courses', href: '/courses' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Innovation Lab', href: 'https://innovation.iic.edu.np' },
    { name: 'News & Events', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#site-navigation`,
    name: 'Itahari International College site navigation',
    itemListElement: links.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.name,
      url: absoluteUrl(link.href),
    })),
  };
}

export function buildBreadcrumbListNode(items: BreadcrumbItem[]): SchemaNode {
  const lastItem = items[items.length - 1];

  return {
    '@type': 'BreadcrumbList',
    '@id': lastItem ? `${absoluteUrl(lastItem.item)}#breadcrumb` : `${SITE_URL}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item),
    })),
  };
}

export function buildWebPageNode({
  path,
  name,
  description,
  type = 'WebPage',
  image,
  mainEntity,
  dateModified,
}: WebPageNodeOptions): SchemaNode {
  const url = absoluteUrl(path);

  return compactNode({
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'en-NP',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': COLLEGE_ID },
    publisher: { '@id': COLLEGE_ID },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    primaryImageOfPage: image
      ? {
          '@type': 'ImageObject',
          url: absoluteImageUrl(image),
        }
      : undefined,
    mainEntity,
    dateModified,
  });
}

export function buildFaqPageNode(
  faqs: Array<{ question: string; answer: string }>,
  id: string
): SchemaNode | null {
  const visibleFaqs = faqs.filter((faq) => faq.question && faq.answer);
  if (visibleFaqs.length === 0) return null;

  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: visibleFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildCourseNode(course: CourseItem): SchemaNode {
  const path = `/courses/${course.slug}`;
  const url = absoluteUrl(path);
  const duration = course.details?.duration || course.duration;
  const description = course.description || course.overview || course.listing?.description;

  return compactNode({
    '@type': 'Course',
    '@id': `${url}#course`,
    name: course.title,
    alternateName: course.listing?.displayTitle || course.subtitle,
    description,
    url,
    image: absoluteImageUrl(course.image),
    provider: { '@id': COLLEGE_ID },
    educationalLevel: course.details?.level || course.level || 'Undergraduate',
    educationalCredentialAwarded: course.details?.awardingBody
      ? `Degree awarded by ${course.details.awardingBody}`
      : 'Undergraduate Degree',
    timeRequired: durationToIso(duration),
    about: course.category
      ? {
          '@type': 'Thing',
          name: course.category,
        }
      : undefined,
    teaches: course.learningOutcomes?.filter(Boolean),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      '@id': `${url}#course-instance`,
      courseMode: 'Full-time',
      courseWorkload: 'Full-time',
      location: { '@id': COLLEGE_ID },
    },
  });
}

export function buildCourseItemListNode(courses: CourseItem[]): SchemaNode {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/courses#course-list`,
    name: 'Academic programmes at Itahari International College',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: absoluteUrl(`/courses/${course.slug}`),
      item: { '@id': `${absoluteUrl(`/courses/${course.slug}`)}#course` },
    })),
  };
}

export function buildNewsItemListNode(items: NewsItem[]): SchemaNode {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/news#news-list`,
    name: 'Latest news and events from Itahari International College',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: absoluteUrl(`/news/${item.slug}`),
    })),
  };
}

export function buildNewsArticleNode(item: NewsItem): SchemaNode {
  const url = absoluteUrl(`/news/${item.slug}`);
  const publishedDate = toIsoDate(item.date);
  const authorName = item.author?.name?.trim();

  return compactNode({
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    headline: item.title,
    description: item.description,
    image: absoluteImageUrl(item.image),
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: authorName
      ? {
          '@type': 'Person',
          name: authorName,
          jobTitle: item.author?.role || undefined,
        }
      : { '@id': COLLEGE_ID },
    publisher: { '@id': COLLEGE_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  });
}

export function buildEventNode(item: NewsItem): SchemaNode {
  const url = absoluteUrl(`/news/${item.slug}`);

  return compactNode({
    '@type': 'Event',
    '@id': `${url}#event`,
    name: item.title,
    description: item.description,
    image: absoluteImageUrl(item.image),
    url,
    startDate: toIsoDate(item.date),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: { '@id': COLLEGE_ID },
    location: {
      '@type': 'Place',
      name: item.location || 'Itahari International College',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sundarharaicha-4, Dulari',
        addressLocality: 'Dulari',
        addressRegion: 'Morang, Koshi Province',
        addressCountry: 'NP',
      },
    },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  });
}

export function buildAdmissionProgramNodes(): SchemaNode[] {
  return [
    {
      '@type': 'EducationalOccupationalProgram',
      '@id': `${SITE_URL}/admissions#bsc-hons-computing`,
      name: 'BSc (Hons) Computing',
      description:
        "A 3-year undergraduate computing degree delivered through IIC's partnership with London Metropolitan University.",
      provider: { '@id': COLLEGE_ID },
      programPrerequisites: 'Minimum 2.0 CGPA in +2/NEB or equivalent',
      educationalCredentialAwarded: 'BSc (Hons) Computing',
      offers: {
        '@type': 'Offer',
        category: 'Admission',
        url: absoluteUrl('/admissions'),
      },
    },
    {
      '@type': 'EducationalOccupationalProgram',
      '@id': `${SITE_URL}/admissions#ba-hons-business-administration`,
      name: 'BA (Hons) Business Administration',
      description:
        'A 3-year business degree focused on international standards, modern management, and entrepreneurship.',
      provider: { '@id': COLLEGE_ID },
      programPrerequisites: 'Minimum 2.0 CGPA in +2/NEB or equivalent',
      educationalCredentialAwarded: 'BA (Hons) Business Administration',
      offers: {
        '@type': 'Offer',
        category: 'Admission',
        url: absoluteUrl('/admissions'),
      },
    },
  ];
}

export function buildScholarshipListNode(batches: ScholarshipBatch[]): SchemaNode {
  const publishedBatches = batches.filter((batch) => batch.title);

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/scholarships#scholarship-list`,
    name: 'Scholarships at Itahari International College',
    numberOfItems: publishedBatches.length,
    itemListElement: publishedBatches.map((batch, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: compactNode({
        '@type': 'Grant',
        name: batch.title,
        description: batch.summary || undefined,
        sponsor: { '@id': COLLEGE_ID },
        datePublished: batch.createdAt,
        image: absoluteImageUrl(batch.groupImage),
      }),
    })),
  };
}

export function buildImageGalleryNode(gallery: EventGalleryArchive): SchemaNode {
  const url = absoluteUrl(`/life-at-iic/events/${gallery.slug}`);

  return compactNode({
    '@type': 'ImageGallery',
    '@id': `${url}#gallery`,
    name: `${gallery.title} Gallery`,
    description: gallery.summary,
    url,
    image: absoluteImageUrl(gallery.coverImage),
    publisher: { '@id': COLLEGE_ID },
    about: { '@id': COLLEGE_ID },
    associatedMedia: gallery.galleries.flatMap((yearGallery) =>
      yearGallery.images.map((image, index) => ({
        '@type': 'ImageObject',
        name: `${yearGallery.title} ${yearGallery.year} photo ${index + 1}`,
        contentUrl: absoluteImageUrl(image),
        thumbnailUrl: absoluteImageUrl(image),
        datePublished: String(yearGallery.year),
      }))
    ),
  });
}

export function buildEventGalleryItemListNode(galleries: EventGalleryArchive[]): SchemaNode {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/life-at-iic#event-gallery-list`,
    name: 'Life at IIC event galleries',
    numberOfItems: galleries.length,
    itemListElement: galleries.map((gallery, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${gallery.title} Gallery`,
      url: absoluteUrl(`/life-at-iic/events/${gallery.slug}`),
    })),
  };
}
