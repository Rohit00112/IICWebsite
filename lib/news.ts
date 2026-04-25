import dbConnect from './db';
import News from '../models/News';

export interface NewsAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface NewsItem {
  id: string;
  category: 'News' | 'Event' | 'Announcement';
  date: string;
  time?: string;
  location?: string;
  title: string;
  description: string;
  content: string;
  image: string;
  featured: boolean;
  author?: NewsAuthor;
}

// Helper to convert Mongo document to clean plain object
function mapNewsItem(doc: any): NewsItem {
  return {
    id: doc._id.toString(),
    category: doc.category,
    date: doc.date,
    time: doc.time,
    location: doc.location,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    image: doc.image,
    featured: doc.featured,
    author: {
      name: doc.author?.name || '',
      role: doc.author?.role || '',
      avatar: doc.author?.avatar || ''
    },
  };
}

export async function getAllNews(): Promise<NewsItem[]> {
  await dbConnect();
  const news = await News.find({}).sort({ createdAt: -1 });
  return news.map(mapNewsItem);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  await dbConnect();
  try {
    const item = await News.findById(id);
    return item ? mapNewsItem(item) : null;
  } catch (error) {
    return null;
  }
}

export async function getFeaturedNews(): Promise<NewsItem | null> {
  await dbConnect();
  const item = await News.findOne({ featured: true });
  if (item) return mapNewsItem(item);
  
  // Fallback to latest news if no featured one found
  const latest = await News.findOne({}).sort({ createdAt: -1 });
  return latest ? mapNewsItem(latest) : null;
}

export async function createNews(data: Partial<NewsItem>): Promise<NewsItem> {
  await dbConnect();
  const newItem = await News.create(data);
  return mapNewsItem(newItem);
}

export async function updateNews(id: string, data: Partial<NewsItem>): Promise<NewsItem | null> {
  await dbConnect();
  const updatedItem = await News.findByIdAndUpdate(id, data, { new: true });
  return updatedItem ? mapNewsItem(updatedItem) : null;
}

export async function deleteNews(id: string): Promise<boolean> {
  await dbConnect();
  const result = await News.findByIdAndDelete(id);
  return !!result;
}

export async function filterNews(category: string, search: string): Promise<NewsItem[]> {
  await dbConnect();
  
  let query: any = {};
  
  // Category mapping
  if (category !== 'All') {
    let normalizedCategory = category;
    if (category === 'Events') normalizedCategory = 'Event';
    if (category === 'Announcements') normalizedCategory = 'Announcement';
    query.category = normalizedCategory;
  }

  // Search logic
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const news = await News.find(query).sort({ createdAt: -1 });
  return news.map(mapNewsItem);
}

export async function getRelatedNews(category: string, currentId: string, limit = 3): Promise<NewsItem[]> {
  await dbConnect();
  const news = await News.find({
    category,
    _id: { $ne: currentId }
  })
  .sort({ createdAt: -1 })
  .limit(limit);
  
  return news.map(mapNewsItem);
}

