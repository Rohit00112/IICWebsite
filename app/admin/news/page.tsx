import React from 'react';
import Link from 'next/link';
import { getAllNews } from '../../../lib/news';
import NewsTable from '../../../components/admin/NewsTable';

const AdminNewsPage = async () => {
  const news = await getAllNews();

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#1A2B56] font-sora tracking-tight mb-2">News & Events</h1>
          <p className="text-gray-500 font-medium">Manage all your editorial content from one place.</p>
        </div>
        <Link 
          href="/admin/news/new" 
          className="px-8 py-4 bg-[#21409A] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#21409A]/20 flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Create New Article
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-xs font-bold tracking-widest mb-2">Total Articles</p>
          <p className="text-4xl font-black text-[#1A2B56] font-sora">{news.length}</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-xs font-bold tracking-widest mb-2">Events</p>
          <p className="text-4xl font-black text-[#00B2A9] font-sora">{news.filter(n => n.category === 'Event').length}</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-xs font-bold tracking-widest mb-2">News Stories</p>
          <p className="text-4xl font-black text-[#74C044] font-sora">{news.filter(n => n.category === 'News').length}</p>
        </div>
      </div>

      {/* Content Table Component */}
      <NewsTable initialNews={news} />
    </div>
  );
};

export default AdminNewsPage;
