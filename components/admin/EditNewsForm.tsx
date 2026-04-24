'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-50 rounded-2xl" />
});

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  content: string;
  featured: boolean;
}

export default function EditNewsForm({ article }: { article: NewsItem }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: article.title,
    category: article.category,
    date: article.date,
    image: article.image,
    description: article.description,
    content: article.content,
    featured: article.featured,
  });

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      ['clean']
    ],
  }), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/news/${article.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/news');
        router.refresh();
      } else {
        alert('Failed to update article');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      alert('An error occurred during update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20">
      <div className="mb-12 flex items-end justify-between border-b border-gray-100 pb-10">
        <div>
          <h1 className="text-5xl font-black text-[#1A2B56] font-sora tracking-tight mb-3">Edit Article</h1>
          <p className="text-gray-500 font-medium text-lg">Update your published content, images, and metadata.</p>
        </div>
        <div className="flex items-center gap-8 mb-2">
          <Link href="/admin/news" className="text-sm font-bold text-gray-400 hover:text-[#21409A] flex items-center gap-2 group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Articles
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-12 py-5 bg-[#21409A] text-white rounded-[20px] font-bold text-sm shadow-2xl shadow-[#21409A]/30 disabled:opacity-50 flex items-center gap-3"
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-8 self-start">
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#1A2B56] font-sora tracking-tight">Article Metadata</h2>
              <p className="text-sm text-gray-400 font-medium">Core details and categorization</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Article Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56]"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Category</label>
                  <div className="relative">
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56] appearance-none"
                    >
                      <option value="News">News</option>
                      <option value="Event">Event</option>
                      <option value="Announcement">Announcement</option>
                    </select>
                    <svg className="w-5 h-5 absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Publish Date</label>
                  <input 
                    type="text" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Featured Image URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56]"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Short Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56] resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-5 py-5 px-8 bg-[#f8fcfb] rounded-[24px] border border-[#74C044]/20 group cursor-pointer">
                <input 
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-6 h-6 rounded-lg border-gray-300 text-[#74C044] focus:ring-[#74C044] cursor-pointer"
                />
                <label htmlFor="featured" className="text-sm font-bold text-[#1A2B56] cursor-pointer">Mark as Featured Article</label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm flex flex-col flex-grow">
            <div className="space-y-2 mb-10">
              <h2 className="text-2xl font-black text-[#1A2B56] font-sora tracking-tight">Article Content</h2>
              <p className="text-sm text-gray-400 font-medium">Edit and format your story</p>
            </div>
            
            <div className="flex-grow flex flex-col">
              <ReactQuill 
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({...formData, content: value})}
                modules={modules}
                className="flex-grow flex flex-col"
              />
            </div>
            
            <style jsx global>{`
              .quill {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                position: relative;
              }
              .ql-container {
                border-bottom-left-radius: 28px;
                border-bottom-right-radius: 28px;
                border: none !important;
                background: #f9fafb;
                font-family: 'Sora', sans-serif;
                font-size: 16px;
                flex-grow: 1;
                min-height: 800px;
              }
              .ql-toolbar {
                border-top-left-radius: 28px;
                border-top-right-radius: 28px;
                border: none !important;
                background: #f9fafb;
                padding: 20px !important;
                margin-bottom: 4px;
                position: sticky;
                top: 0;
                z-index: 10;
                box-shadow: 0 4px 12px rgba(0,0,0,0.02);
              }
              .ql-editor {
                padding: 60px !important;
                color: #1A2B56;
                line-height: 1.8;
                font-weight: 500;
              }
            `}</style>
          </div>
        </div>
      </form>
    </div>
  );
}
