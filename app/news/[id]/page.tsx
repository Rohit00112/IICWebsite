import { Metadata } from 'next';
import NewsDetailHero from '../../../components/sections/news/NewsDetailHero';
import NewsDetailContent from '../../../components/sections/news/NewsDetailContent';
import PageTransition from '../../../components/layout/PageTransition';

// Mock function to simulate data fetching (will be replaced by real backend later)
const getNewsItem = (id: string) => {
  const newsItems = [
    {
      id: '1',
      category: 'News',
      date: 'September 28, 2024',
      title: 'IIC Partners with Microsoft for Cloud Computing Initiative',
      description: 'We are thrilled to announce a strategic partnership with Microsoft to provide our students with cutting-edge resources and certifications in Azure cloud computing.',
      content: `
        <p>Itahari International College (IIC) is proud to announce a landmark partnership with Microsoft, a global leader in technology. This initiative is designed to bridge the gap between academic learning and industry requirements by providing students with direct access to Microsoft's world-class cloud computing resources.</p>
        
        <h2>Empowering the Next Generation of Tech Leaders</h2>
        <p>Through this partnership, IIC students will gain access to Microsoft Azure's comprehensive suite of cloud services. This includes specialized training modules, official Microsoft certifications, and hands-on laboratory environments where they can build, deploy, and manage applications on a global scale.</p>
        
        <blockquote>"This partnership marks a significant milestone in our mission to provide industry-ready education. By integrating Microsoft's cutting-edge cloud technologies into our curriculum, we are ensuring our graduates are prepared for the high-demand roles of the future." - Academic Director, IIC</blockquote>

        <h2>What this means for our students:</h2>
        <ul>
          <li>Direct access to Microsoft Azure cloud services.</li>
          <li>Official certification pathways at discounted rates.</li>
          <li>Hands-on workshops led by Microsoft certified trainers.</li>
          <li>Real-world project experience using industry-standard tools.</li>
        </ul>

        <p>The Cloud Computing Initiative will be integrated across our BSc (Hons) Computing and IT programs starting this academic semester. This ensures that every student, regardless of their specialization, develops a foundational understanding of cloud architecture and management.</p>
      `,
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=2000&auto=format&fit=crop',
      author: {
        name: 'IIC Communications Team',
        role: 'Marketing & PR',
        avatar: 'https://i.pravatar.cc/150?u=iic'
      }
    },
    // ... other items would be here
  ];
  return newsItems.find(item => item.id === id) || newsItems[0];
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = getNewsItem(params.id);
  
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

const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  const item = getNewsItem(params.id);

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
