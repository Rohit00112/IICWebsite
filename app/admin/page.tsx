import React from 'react';
import { getAllNews } from '../../lib/news';
import News from '../../models/News';
import Course from '../../models/Course';
import dbConnect from '../../lib/db';
import Link from 'next/link';
import NextImage from 'next/image';

const AdminDashboard = async () => {
  await dbConnect();
  
  const [newsCount, courseCount, featuredNewsCount] = await Promise.all([
    News.countDocuments(),
    Course.countDocuments(),
    News.countDocuments({ featured: true })
  ]);

  const latestNews = await News.find().sort({ createdAt: -1 }).limit(5);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black text-[#1A2B56] font-sora tracking-tight mb-2">Dashboard</h1>
        <p className="text-gray-500 font-medium">Welcome back, Administrator. Here's what's happening at IIC.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:border-[#21409A]/20">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2z" /></svg>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total News</p>
          <p className="text-4xl font-black text-[#1A2B56] font-sora">{newsCount}</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:border-[#74C044]/20">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Courses</p>
          <p className="text-4xl font-black text-[#1A2B56] font-sora">{courseCount}</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:border-yellow-200">
          <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Featured</p>
          <p className="text-4xl font-black text-[#1A2B56] font-sora">{featuredNewsCount}</p>
        </div>

        <div className="bg-[#21409A] p-8 rounded-[32px] shadow-xl shadow-[#21409A]/20">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#74C044] rounded-full"></span>
            System Status
          </p>
          <p className="text-2xl font-black text-white font-sora leading-tight">Database Connected</p>
          <p className="text-white/60 text-xs mt-2 font-medium">v1.0.4 (Stable)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A2B56]">Recent News & Updates</h2>
            <Link href="/admin/news" className="text-sm font-bold text-[#21409A] hover:underline">View All</Link>
          </div>
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            {latestNews.map((item, idx) => (
              <div key={item._id.toString()} className={`p-6 flex items-center gap-6 ${idx !== latestNews.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="w-16 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                  {item.image && <NextImage src={item.image} alt="" fill sizes="64px" className="object-cover" />}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#1A2B56] text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-medium">{item.date} • {item.category}</p>
                </div>
                <Link 
                  href={`/admin/news/${item._id}`}
                  className="px-4 py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-lg hover:bg-[#21409A] hover:text-white"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#1A2B56]">Quick Actions</h2>
          <div className="space-y-4">
            <Link 
              href="/admin/news/new"
              className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 hover:border-[#21409A]/20 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-[#21409A] group-hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="font-bold text-[#1A2B56] text-sm">Post New Article</span>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>

            <Link 
              href="/admin/courses"
              className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 hover:border-[#74C044]/20 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-[#74C044] group-hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <span className="font-bold text-[#1A2B56] text-sm">Manage Courses</span>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-[#74C044]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>

            <div className="p-8 bg-gradient-to-br from-[#1A2B56] to-[#21409A] rounded-[40px] text-white space-y-4">
              <h3 className="font-bold">Need Help?</h3>
              <p className="text-white/60 text-xs leading-relaxed font-medium">Contact the IT Support team for any dashboard issues or access management.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold">
                Support Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
