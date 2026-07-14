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
  keywords?: string[];
}

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, '');
}

const configuredSiteHost =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://iic.edu.np';

export const SITE_URL = normalizeSiteUrl(configuredSiteHost);

export const ASSET_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_ASSET_URL || SITE_URL
);

export function absoluteAssetUrl(path = '') {
  if (!path) return ASSET_URL;
  if (/^https?:\/\//i.test(path)) return path;

  return `${ASSET_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export const COLLEGE_NAME = 'Itahari International College';
export const COLLEGE_ID = `${SITE_URL}/#college`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const defaultCollegeImage = '/images/home/hero.webp';
const defaultLogo = '/images/common/iic_logo.png';
export const COLLEGE_PHONE_DISPLAY = '+977 9801003030';
export const COLLEGE_PHONE_TEL = '+9779801003030';
export const COLLEGE_ADDRESS = {
  streetAddress: 'Sundar Haraicha 04, Dulari',
  addressLocality: 'Dulari',
  addressRegion: 'Morang, Koshi Province',
  postalCode: '56705',
  addressCountry: 'NP',
};
export const COLLEGE_ADDRESS_TEXT = 'Sundarharaicha 04, Dulari, Morang, Nepal';
export const COLLEGE_SOCIAL_PROFILES = [
  'https://www.facebook.com/IICNepal/',
  'https://www.instagram.com/iic_nepal',
  'https://www.linkedin.com/school/itahari-international-college/',
  'https://www.youtube.com/@itahariinternationalcolleg4968',
  'https://www.tiktok.com/@iic.nepal',
  'https://x.com/iic_nepal',
];

export function mergeKeywords(...groups: Array<Array<string | undefined> | undefined>): string[] {
  const seen = new Set<string>();

  return groups
    .flatMap((group) => group || [])
    .map((keyword) => keyword?.trim())
    .filter((keyword): keyword is string => {
      if (!keyword) return false;
      const key = keyword.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export const BRAND_SEARCH_KEYWORDS = [
  'Itahari International College',
  'IIC',
  'IIC Itahari',
  'IIC Nepal',
  'IIC College',
  'IIC website',
  'Ithari International College',
];

export const LOCATION_SEARCH_KEYWORDS = [
  'Itahari college',
  'college in Itahari',
  'IT college in Itahari',
  'top 5 best college in Itahari',
  'Itahari college name',
  'Itahari International College location',
  'IIC location',
  'British affiliated colleges in Nepal',
  'international college in Nepal',
];

export const COURSE_SEARCH_KEYWORDS = [
  'IIC courses',
  'IIC course',
  'BIT course',
  'BSc (Hons) Computing',
  'BSc Computing in Itahari',
  'BA (Hons) Business Administration',
  'BA Business Administration in Itahari',
  'BBA college in Itahari',
  'BBA in Itahari',
  'UK degrees in Itahari',
  'London Metropolitan University courses in Nepal',
];

export const ADMISSION_SEARCH_KEYWORDS = [
  'Itahari International College fee structure',
  'IIC admissions',
  'IIC guidelines',
  'IIC finance',
  'college admission in Itahari',
];

export const CONTACT_SEARCH_KEYWORDS = [
  'IIC contact number',
  'Itahari International College contact number',
  'IIC location',
  'Itahari International College location',
  'IIC finance',
];

export const SCHOLARSHIP_SEARCH_KEYWORDS = [
  'AAA scholarship',
  'IIC scholarship',
  'IIC scholarships',
  'Itahari International College scholarship',
  'scholarship',
  'ING Postgraduate Scholarship',
];

export const MEDIA_SEARCH_KEYWORDS = [
  'Itahari International College photos',
  'Itahari International College logo',
  'IIC logo',
  'Life at IIC',
  'IIC events',
];

export const NEWS_SEARCH_KEYWORDS = [
  'IIC news',
  'IIC events',
  'IIC blogs',
  'Itahari International College news',
  'Itahari International College events',
  'Itahari International College blogs',
  'IIC newsroom',
  'IIC campus news',
  'IIC student achievements',
  'IIC workshops',
  'IIC seminars',
  'IIC admissions updates',
  'IIC event calendar',
  'college news in Itahari',
  'college events in Itahari',
  'Itahari college news',
  'Itahari college events',
];

export const ABOUT_SEARCH_KEYWORDS = [
  'about IIC',
  'about Itahari International College',
  'Itahari International College photos',
  'Itahari International College logo',
  'IIC logo',
];

export const INFRASTRUCTURE_SEARCH_KEYWORDS = [
  'IIC infrastructure',
  'Itahari International College infrastructure',
  'IIC facilities',
  'college facilities in Itahari',
  'computer labs in Itahari college',
  'IIC library',
  'IIC campus',
];

export const INDUSTRY_EXPOSURE_SEARCH_KEYWORDS = [
  'IIC industry exposure',
  'Itahari International College industry exposure',
  'IIC placement support',
  'IIC job fair',
  'IIC career development',
  'IIC international exposure',
  'IIC career readiness',
  'career development college in Itahari',
  'industry visits in college',
  'placement support in Itahari college',
  'industry exposure college in Nepal',
  'job fair at IIC',
];

export const ALUMNI_SEARCH_KEYWORDS = [
  'IIC alumni',
  'IIC alumni network',
  'Itahari International College alumni',
  'Itahari International College graduates',
  'IIC graduate stories',
  'IIC alumni directory',
  'alumni network in Itahari',
  'IIC alumni LinkedIn',
];

export const RMC_SEARCH_KEYWORDS = [
  'IIC research management committee',
  'Itahari International College research committee',
  'Research Management Committee IIC',
  'IIC RMC',
  'college research committee in Itahari',
  'academic research at IIC',
];

export const GLOBAL_METADATA_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS,
  ADMISSION_SEARCH_KEYWORDS,
  CONTACT_SEARCH_KEYWORDS,
  SCHOLARSHIP_SEARCH_KEYWORDS,
  MEDIA_SEARCH_KEYWORDS
);

export const HOME_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS,
  SCHOLARSHIP_SEARCH_KEYWORDS,
  CONTACT_SEARCH_KEYWORDS,
  MEDIA_SEARCH_KEYWORDS
);

export const COURSES_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS,
  ADMISSION_SEARCH_KEYWORDS
);

export const ADMISSIONS_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  ADMISSION_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS
);

export const CONTACT_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  CONTACT_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS
);

export const SCHOLARSHIPS_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  SCHOLARSHIP_SEARCH_KEYWORDS,
  ADMISSION_SEARCH_KEYWORDS
);

export const ABOUT_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  ABOUT_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS
);

export const INFRASTRUCTURE_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  INFRASTRUCTURE_SEARCH_KEYWORDS,
  ABOUT_SEARCH_KEYWORDS,
  MEDIA_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS
);

export const INDUSTRY_EXPOSURE_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  INDUSTRY_EXPOSURE_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS,
  ADMISSION_SEARCH_KEYWORDS
);

export const RMC_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  RMC_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS
);

export const LIFE_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  MEDIA_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS
);

export const ALUMNI_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS,
  ALUMNI_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS
);

export const NEWS_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  NEWS_SEARCH_KEYWORDS,
  MEDIA_SEARCH_KEYWORDS,
  LOCATION_SEARCH_KEYWORDS,
  COURSE_SEARCH_KEYWORDS,
  ADMISSION_SEARCH_KEYWORDS
);

export const POLICY_PAGE_KEYWORDS = mergeKeywords(
  BRAND_SEARCH_KEYWORDS,
  CONTACT_SEARCH_KEYWORDS
);

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
  return absoluteAssetUrl(src);
}

export function toIsoDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function stripHtml(value?: string) {
  if (!value) return undefined;
  const text = value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text || undefined;
}

function estimateWordCount(value?: string) {
  const text = stripHtml(value);
  if (!text) return undefined;

  return text.split(/\s+/).length;
}

function newsSchemaId(item: NewsItem) {
  const url = absoluteUrl(`/news-and-events/${item.slug}`);
  return `${url}#${item.category === 'Event' ? 'event' : 'article'}`;
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
    '@type': ['CollegeOrUniversity', 'EducationalOrganization', 'Organization'],
    '@id': COLLEGE_ID,
    name: COLLEGE_NAME,
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
    keywords: GLOBAL_METADATA_KEYWORDS,
    foundingDate: '2017',
    knowsAbout: [
      'Information Technology',
      'Business Administration',
      'Higher Education',
      'UK Degrees',
      'BIT course',
      'BSc Computing',
      'BA Business Administration',
      'AAA Scholarship',
      'Itahari college',
      'British affiliated colleges in Nepal',
    ],
    sameAs: COLLEGE_SOCIAL_PROFILES,
    address: {
      '@type': 'PostalAddress',
      ...COLLEGE_ADDRESS,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.6644,
      longitude: 87.2718,
    },
    telephone: COLLEGE_PHONE_TEL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COLLEGE_PHONE_TEL,
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

export function buildOrganizationNode(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: COLLEGE_NAME,
    alternateName: 'IIC',
    url: SITE_URL,
    logo: absoluteImageUrl(defaultLogo),
    image: absoluteImageUrl(defaultCollegeImage),
    description:
      'Itahari International College is a higher education institution in Morang, Nepal, offering UK-awarded IT and Business degrees in partnership with London Metropolitan University.',
    sameAs: COLLEGE_SOCIAL_PROFILES,
    address: {
      '@type': 'PostalAddress',
      ...COLLEGE_ADDRESS,
    },
    telephone: COLLEGE_PHONE_TEL,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COLLEGE_PHONE_TEL,
      contactType: 'admissions',
      areaServed: 'NP',
      availableLanguage: ['Nepali', 'English'],
    },
  };
}

export function buildLocalBusinessNode(): SchemaNode {
  return {
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: COLLEGE_NAME,
    alternateName: 'IIC',
    url: SITE_URL,
    image: absoluteImageUrl(defaultCollegeImage),
    parentOrganization: { '@id': ORGANIZATION_ID },
    priceRange: 'Programme fees vary by course',
    address: {
      '@type': 'PostalAddress',
      ...COLLEGE_ADDRESS,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.6644,
      longitude: 87.2718,
    },
    telephone: COLLEGE_PHONE_TEL,
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
    name: COLLEGE_NAME,
    inLanguage: 'en-NP',
    keywords: GLOBAL_METADATA_KEYWORDS,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function buildGlobalSchema() {
  return buildSchemaGraph([
    buildOrganizationNode(),
    buildLocalBusinessNode(),
    buildCollegeNode(),
    buildWebsiteNode(),
  ]);
}

export function buildSiteNavigationNode(): SchemaNode {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Infrastructure', href: '/our-infrastructure' },
    { name: 'Industry Exposure', href: '/industry-exposure' },
    { name: 'Life at IIC', href: '/life-at-iic' },
    { name: 'Courses', href: '/courses' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Scholarships', href: '/scholarship' },
    { name: 'Research Management Committee', href: '/research-management-committee' },
    { name: 'Innovation Lab', href: 'https://innovation.iic.edu.np' },
    { name: 'News & Events', href: '/news-and-events' },
    { name: 'Contact', href: '/contact-us' },
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
  keywords,
}: WebPageNodeOptions): SchemaNode {
  const url = absoluteUrl(path);
  const pageKeywords = mergeKeywords(BRAND_SEARCH_KEYWORDS, keywords);

  return compactNode({
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'en-NP',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': COLLEGE_ID },
    keywords: pageKeywords,
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
  const path = `/${course.slug}`;
  const url = absoluteUrl(path);
  const duration = course.details?.duration || course.duration;
  const description = course.description || course.overview || course.listing?.description;
  const courseKeywords = mergeKeywords(COURSES_PAGE_KEYWORDS, [
    course.title,
    course.subtitle,
    course.category,
    course.listing?.displayTitle,
    course.listing?.specialism,
  ]);

  return compactNode({
    '@type': 'Course',
    '@id': `${url}#course`,
    name: course.title,
    alternateName: course.listing?.displayTitle || course.subtitle,
    description,
    keywords: courseKeywords,
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
    keywords: COURSES_PAGE_KEYWORDS,
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: absoluteUrl(`/${course.slug}`),
      item: { '@id': `${absoluteUrl(`/${course.slug}`)}#course` },
    })),
  };
}

export function buildNewsItemListNode(items: NewsItem[]): SchemaNode {
  const publishedItems = items.filter((item) => item.slug && item.title);

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/news-and-events#news-list`,
    name: 'Latest news and events from Itahari International College',
    description:
      'A reverse-chronological list of IIC news, blogs, campus stories, student achievements, workshops, seminars, admissions updates, and college events.',
    keywords: NEWS_PAGE_KEYWORDS,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: publishedItems.length,
    itemListElement: publishedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: absoluteUrl(`/news-and-events/${item.slug}`),
      item: { '@id': newsSchemaId(item) },
    })),
  };
}

export function buildNewsAndEventsCollectionNode(
  items: NewsItem[],
  description: string,
  dateModified?: string
): SchemaNode {
  const url = absoluteUrl('/news-and-events');
  const visibleItems = items.filter((item) => item.slug && item.title).slice(0, 12);
  const latestDate = dateModified || toIsoDate(visibleItems[0]?.date);

  return compactNode({
    '@type': ['CollectionPage', 'WebPage'],
    '@id': `${url}#webpage`,
    url,
    name: 'IIC News & Events',
    headline: 'News & Events from Itahari International College',
    description,
    inLanguage: 'en-NP',
    isPartOf: { '@id': WEBSITE_ID },
    about: [
      { '@id': COLLEGE_ID },
      { '@type': 'Thing', name: 'IIC news' },
      { '@type': 'Thing', name: 'IIC events' },
      { '@type': 'Thing', name: 'IIC blogs' },
      { '@type': 'Thing', name: 'College events in Itahari' },
      { '@type': 'Thing', name: 'Student achievements at IIC' },
    ],
    keywords: NEWS_PAGE_KEYWORDS,
    publisher: { '@id': COLLEGE_ID },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteImageUrl('/images/common/seminar.webp'),
    },
    mainEntity: { '@id': `${SITE_URL}/news-and-events#news-list` },
    hasPart: visibleItems.map((item) => ({ '@id': newsSchemaId(item) })),
    audience: [
      { '@type': 'EducationalAudience', educationalRole: 'Prospective student' },
      { '@type': 'EducationalAudience', educationalRole: 'Student' },
      { '@type': 'Audience', audienceType: 'Parents and guardians' },
    ],
    significantLink: [
      absoluteUrl('/courses'),
      absoluteUrl('/admissions'),
      absoluteUrl('/life-at-iic'),
      absoluteUrl('/industry-exposure'),
    ],
    dateModified: latestDate,
  });
}

export function buildNewsArticleNode(item: NewsItem): SchemaNode {
  const url = absoluteUrl(`/news-and-events/${item.slug}`);
  const publishedDate = toIsoDate(item.date);
  const authorName = item.author?.name?.trim();
  const articleText = stripHtml(item.content || item.description);

  return compactNode({
    '@type': 'NewsArticle',
    '@id': newsSchemaId(item),
    url,
    headline: item.title,
    name: item.title,
    description: item.description,
    keywords: mergeKeywords(NEWS_PAGE_KEYWORDS, [item.title, item.category]),
    image: {
      '@type': 'ImageObject',
      url: absoluteImageUrl(item.image),
    },
    thumbnailUrl: absoluteImageUrl(item.image),
    datePublished: publishedDate,
    dateModified: publishedDate,
    articleSection: item.category,
    wordCount: estimateWordCount(articleText),
    isAccessibleForFree: true,
    inLanguage: 'en-NP',
    author: authorName
      ? {
          '@type': 'Person',
          name: authorName,
          jobTitle: item.author?.role || undefined,
        }
      : { '@id': COLLEGE_ID },
    publisher: { '@id': COLLEGE_ID },
    about: { '@id': COLLEGE_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  });
}

export function buildEventNode(item: NewsItem): SchemaNode {
  const url = absoluteUrl(`/news-and-events/${item.slug}`);
  const startDate = toIsoDate(item.date);

  return compactNode({
    '@type': 'Event',
    '@id': newsSchemaId(item),
    name: item.title,
    description: item.description,
    keywords: mergeKeywords(NEWS_PAGE_KEYWORDS, [item.title, item.category, item.location]),
    image: {
      '@type': 'ImageObject',
      url: absoluteImageUrl(item.image),
    },
    url,
    startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: { '@id': COLLEGE_ID },
    about: { '@id': COLLEGE_ID },
    audience: { '@type': 'EducationalAudience', educationalRole: 'Student' },
    location: {
      '@type': 'Place',
      name: item.location || 'Itahari International College',
      address: {
        '@type': 'PostalAddress',
        ...COLLEGE_ADDRESS,
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
      keywords: mergeKeywords(COURSES_PAGE_KEYWORDS, ADMISSIONS_PAGE_KEYWORDS, [
        'BIT course',
        'BSc Computing in Itahari',
      ]),
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
      keywords: mergeKeywords(COURSES_PAGE_KEYWORDS, ADMISSIONS_PAGE_KEYWORDS, [
        'BA Business Administration in Itahari',
        'BBA college in Itahari',
        'BBA in Itahari',
      ]),
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
    '@id': `${SITE_URL}/scholarship#scholarship-list`,
    name: 'Scholarships at Itahari International College',
    keywords: SCHOLARSHIPS_PAGE_KEYWORDS,
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
    keywords: mergeKeywords(LIFE_PAGE_KEYWORDS, [gallery.title, `${gallery.title} photos`]),
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
    keywords: LIFE_PAGE_KEYWORDS,
    numberOfItems: galleries.length,
    itemListElement: galleries.map((gallery, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${gallery.title} Gallery`,
      url: absoluteUrl(`/life-at-iic/events/${gallery.slug}`),
    })),
  };
}

export function buildInfrastructureFacilityListNode(): SchemaNode {
  const facilities = [
    {
      id: 'library',
      name: 'Library',
      description:
        'Digital and print library resources that support student research, reading, and independent academic work.',
      image: '/images/common/library.JPG',
      features: ['Digital resources', 'Print collections', 'Research support'],
    },
    {
      id: 'lecture-theatres',
      name: 'Lecture Theatres',
      description:
        'Spacious lecture theatres with audio-visual setups for lectures, seminars, and academic presentations.',
      image: '/images/common/lecture.JPG',
      features: ['Audio-visual setup', 'Tiered seating', 'Seminar-ready space'],
    },
    {
      id: 'computer-labs',
      name: 'Computer Labs',
      description:
        'Computer labs with high-performance workstations and industry-standard software for practical technical learning.',
      image: '/images/common/lab.JPG',
      features: ['High-performance workstations', 'Industry-standard software', 'Hands-on learning'],
    },
    {
      id: 'seminar-halls',
      name: 'Seminar Halls',
      description:
        'Seminar halls designed for workshops, guest lectures, student presentations, and collaborative discussions.',
      image: '/images/common/seminar.webp',
      features: ['Projection systems', 'Acoustic clarity', 'Collaborative seating'],
    },
    {
      id: 'cafeteria',
      name: 'Cafeteria',
      description:
        'A hygienic social space where students can relax, dine, collaborate, and recharge between classes.',
      image: '/images/about/cafeteria.webp',
      features: ['Healthy menu options', 'Indoor seating', 'Wi-Fi enabled lounge areas'],
    },
    {
      id: 'academic-blocks',
      name: 'Academic Blocks',
      description:
        'Modern academic blocks with naturally lit, well-ventilated learning spaces for students and faculty.',
      image: '/images/our-infrastructure/academic-block.JPG',
      features: ['Modern design', 'Sustainable features', 'Accessible infrastructure'],
    },
  ];

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/our-infrastructure#facility-list`,
    name: 'Campus facilities at Itahari International College',
    description:
      'A structured overview of IIC campus facilities, including the library, lecture theatres, computer labs, seminar halls, cafeteria, and academic blocks.',
    keywords: INFRASTRUCTURE_PAGE_KEYWORDS,
    numberOfItems: facilities.length,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Enterprise Wi-Fi access points', value: '60+' },
      { '@type': 'PropertyValue', name: 'Smart surveillance', value: '24/7' },
      { '@type': 'PropertyValue', name: 'Biometric attendance devices', value: '40+' },
      { '@type': 'PropertyValue', name: 'Enterprise servers', value: '5+' },
    ],
    itemListElement: facilities.map((facility, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: compactNode({
        '@type': 'Place',
        '@id': `${SITE_URL}/our-infrastructure#${facility.id}`,
        name: facility.name,
        description: facility.description,
        image: absoluteImageUrl(facility.image),
        containedInPlace: { '@id': COLLEGE_ID },
        amenityFeature: facility.features.map((feature) => ({
          '@type': 'LocationFeatureSpecification',
          name: feature,
          value: true,
        })),
      }),
    })),
  };
}

export function buildIndustryExposureItemListNode(): SchemaNode {
  const opportunities = [
    {
      id: 'international-exposure',
      name: 'International Exposure',
      serviceType: 'Global learning exposure',
      description:
        'International learning opportunities in the UK and Thailand with academic, cultural, classroom, and field-visit experiences.',
      image: '/images/industry-exposure/international-exposure.JPG',
      keywords: ['international exposure', 'global learning', 'cross-cultural learning'],
    },
    {
      id: 'placement-and-job-fair',
      name: 'Placement and Job Fair',
      serviceType: 'Placement support',
      description:
        'Employer connections, job fair preparation, walk-in interviews, internship access, and graduate role opportunities.',
      image: '/images/industry-exposure/placement-and-job-fair.jpg',
      keywords: ['job fair', 'placement support', 'internship opportunities'],
    },
    {
      id: 'career-development-learning',
      name: 'Career Development Learning',
      serviceType: 'Career development',
      description:
        'Seminars, certifications, professional development, academic projects, and industry trend awareness for career growth.',
      image: '/images/industry-exposure/career-development-learning.png',
      keywords: ['career development', 'professional development', 'project-based learning'],
    },
    {
      id: 'career-readiness-programme',
      name: 'Career Readiness Programme',
      serviceType: 'Career readiness',
      description:
        'Career counseling, mock interviews, resume building, workplace communication, teamwork, and leadership preparation.',
      image: '/images/about/networking.JPG',
      keywords: ['career readiness', 'mock interviews', 'resume building'],
    },
    {
      id: 'industry-visits',
      name: 'Industry Visits',
      serviceType: 'Industry visits',
      description:
        'Professional visits and industry interactions that connect classroom learning with real organization operations.',
      image: '/images/industry-exposure/industry-exposure.JPG',
      keywords: ['industry visits', 'industry networking', 'applied learning'],
    },
  ];

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/industry-exposure#exposure-list`,
    name: 'Industry exposure opportunities at Itahari International College',
    description:
      'A structured overview of IIC industry exposure, including international exposure, job fairs, career development, career readiness, and industry visits.',
    keywords: INDUSTRY_EXPOSURE_PAGE_KEYWORDS,
    numberOfItems: opportunities.length,
    itemListElement: opportunities.map((opportunity, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: compactNode({
        '@type': 'Service',
        '@id': `${SITE_URL}/industry-exposure#${opportunity.id}`,
        name: opportunity.name,
        serviceType: opportunity.serviceType,
        description: opportunity.description,
        keywords: mergeKeywords(INDUSTRY_EXPOSURE_PAGE_KEYWORDS, opportunity.keywords),
        image: absoluteImageUrl(opportunity.image),
        provider: { '@id': COLLEGE_ID },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
        },
        areaServed: 'Nepal',
      }),
    })),
  };
}

export function buildAlumniNetworkNode(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/alumni#alumni-network`,
    name: 'Itahari International College Alumni Network',
    alternateName: 'IIC Alumni Network',
    url: absoluteUrl('/alumni'),
    description:
      'The IIC alumni network connects graduates building careers across technology, finance, design, marketing, entrepreneurship, and global professional communities.',
    keywords: ALUMNI_PAGE_KEYWORDS,
    parentOrganization: { '@id': COLLEGE_ID },
    image: absoluteImageUrl('/images/alumini/graduate.jpg'),
    sameAs: ['https://www.linkedin.com/school/itahari-international-college/'],
    knowsAbout: [
      'Technology careers',
      'Finance careers',
      'Design careers',
      'Marketing careers',
      'Entrepreneurship',
      'Professional networking',
      'Graduate employability',
    ],
  };
}

export function buildAlumniCareerFieldListNode(): SchemaNode {
  const fields = [
    {
      name: 'Technology',
      description:
        'IIC alumni pursue technology careers including software engineering, quality assurance, data work, and product roles.',
    },
    {
      name: 'Finance',
      description:
        'IIC alumni pursue finance and business careers including financial analysis, investment, operations, and client success.',
    },
    {
      name: 'Design',
      description:
        'IIC alumni pursue design careers that combine user experience, prototyping, communication, and evidence-based decision making.',
    },
    {
      name: 'Marketing',
      description:
        'IIC alumni pursue marketing and brand careers that combine strategy, audience insight, campaigns, and communication.',
    },
  ];

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/alumni#career-field-list`,
    name: 'IIC alumni career fields',
    description: 'Career fields represented across the Itahari International College alumni network.',
    keywords: ALUMNI_PAGE_KEYWORDS,
    numberOfItems: fields.length,
    itemListElement: fields.map((field, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'DefinedTerm',
        name: field.name,
        description: field.description,
        inDefinedTermSet: `${SITE_URL}/alumni#career-fields`,
      },
    })),
  };
}
