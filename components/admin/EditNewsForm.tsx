'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';


interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time?: string;
  location?: string;
  image: string;
  description: string;
  content: string;
  featured: boolean;
}

import { sanitizeHtml } from '@/lib/sanitize';

export default function EditNewsForm({ article }: { article: NewsItem }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'metadata' | 'content' | 'media' | 'preview'>('metadata');
  
  const [formData, setFormData] = useState({
    title: article.title,
    category: article.category,
    date: article.date,
    time: article.time || '',
    location: article.location || '',
    image: article.image,
    description: article.description,
    content: article.content,
    featured: article.featured,
  });

  const sanitizedPreviewContent = React.useMemo(() => sanitizeHtml(formData.content), [formData.content]);

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

  const sections = [
    { id: 'metadata', label: 'Article Metadata', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'content', label: 'Article Content', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'media', label: 'Media & SEO', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'preview', label: 'Live Site Preview', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  ];

  return (
    <div className="pb-20">
      {/* Header Actions */}
      <div className="mb-12 flex items-end justify-between border-b border-gray-100 pb-10">
        <div>
          <h1 className="text-5xl font-black text-[#1A2B56] font-sora tracking-tight mb-3">Edit Article</h1>
          <p className="text-gray-500 font-medium text-lg font-sora tracking-tight">Updating: <span className="text-[#21409A] font-black">{article.title}</span></p>
        </div>
        <div className="flex items-center gap-8 mb-2">
          <Link href="/admin/news" className="text-sm font-extrabold text-gray-700 hover:text-[#21409A] flex items-center gap-2 group transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Articles
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-12 py-5 bg-[#21409A] text-white rounded-[20px] font-bold text-sm shadow-2xl shadow-[#21409A]/30 hover:bg-[#1A2B56] transition-all disabled:opacity-50 flex items-center gap-3"
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 sticky top-8 space-y-2">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-extrabold text-sm transition-all ${
                activeSection === sec.id 
                ? 'bg-[#21409A] text-white shadow-xl translate-x-2' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-[#1A2B56]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sec.icon} /></svg>
              {sec.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm min-h-[700px] transition-all w-full overflow-hidden">
          
          {activeSection === 'metadata' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold tracking-[0.2em] text-gray-700 ml-1">Article Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter article title..."
                  className="form-input-admin"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold tracking-[0.2em] text-gray-700 ml-1">Category</label>
                  <div className="relative">
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="form-input-admin appearance-none cursor-pointer pr-12"
                    >
                      <option value="News">News Story</option>
                      <option value="Event">Upcoming Event</option>
                      <option value="Announcement">Announcement</option>
                    </select>
                    <svg className="w-5 h-5 absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold tracking-[0.2em] text-gray-700 ml-1">Publish Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="form-input-admin"
                  />
                </div>
              </div>

              {(formData.category === 'Event' || formData.category === 'Announcement') && (
                <div className="grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold tracking-[0.2em] text-gray-700 ml-1">Event Time</label>
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="form-input-admin"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold tracking-[0.2em] text-gray-700 ml-1">Location / Venue</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. Auditorium"
                      className="form-input-admin"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'content' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#1A2B56] font-sora tracking-tight">Edit Article Content</h3>
                  <p className="text-sm text-gray-700 font-bold italic">Use the visual toolbar above to format your story.</p>
                </div>
                <button 
                  onClick={() => setActiveSection('preview')}
                  className="px-6 py-3 bg-gray-50 hover:bg-[#21409A] hover:text-white rounded-xl text-xs font-black transition-all text-[#21409A] border-2 border-[#21409A]/10"
                >
                  View Preview
                </button>
              </div>
              
              <RichTextEditor 
                value={formData.content}
                onChange={(val) => setFormData({...formData, content: val})}
                placeholder="Edit your news story here..."
              />
            </div>
          )}

          {activeSection === 'media' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="space-y-3">
                <ImageUpload 
                  label="Featured Image"
                  value={formData.image} 
                  onChange={(url) => setFormData({...formData, image: url})} 
                  onRemove={() => setFormData({...formData, image: ''})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-extrabold tracking-[0.2em] text-gray-700 ml-1">SEO Summary (Short Description)</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Summary for search results..."
                  className="form-input-admin resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-6 py-8 px-10 bg-[#f8fcfb] rounded-[32px] border-2 border-[#74C044]/10 transition-all hover:border-[#74C044]/30 group cursor-pointer">
                <input 
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-8 h-8 rounded-xl border-gray-300 text-[#74C044] focus:ring-[#74C044] cursor-pointer"
                />
                <div className="space-y-1">
                  <label htmlFor="featured" className="text-lg font-black text-[#1A2B56] cursor-pointer block">Featured Highlight</label>
                  <p className="text-sm text-gray-600 font-medium">Pin this article to the top of the homepage and archives.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'preview' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#1A2B56] font-sora tracking-tight">Live Site Preview</h3>
                  <p className="text-sm text-gray-700 font-bold">This is how your article will appear to visitors.</p>
                </div>
                <button 
                  onClick={() => setActiveSection('content')}
                  className="px-6 py-3 bg-white hover:bg-gray-50 rounded-xl text-xs font-black transition-all text-gray-700 border-2 border-gray-100"
                >
                  Edit Content
                </button>
              </div>
              
              <div className="prose prose-lg max-w-none break-words prose-headings:font-sora prose-headings:font-bold [&&_h1]:text-[#1A2B56] [&&_h2]:text-[#1A2B56] [&&_h3]:text-[#1A2B56] [&&_h4]:text-[#1A2B56] [&&_p]:text-slate-800 [&&_li]:text-slate-800 [&&_strong]:text-slate-900 [&&_span]:text-slate-800 prose-p:leading-relaxed prose-li:marker:text-[#21409A] prose-li:marker:font-black prose-blockquote:border-[#74C044] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl">
                {formData.content ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: sanitizedPreviewContent }}
                    className="rich-content"
                  />
                ) : (
                  <div className="py-20 text-center text-gray-300 italic">No content to preview.</div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      <style jsx global>{`
        .form-input-admin {
          width: 100%;
          background: #f8fafc;
          border: 2px solid #eef2f6;
          border-radius: 24px;
          padding: 1.5rem 2rem;
          font-weight: 800;
          color: #1A2B56;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Sora', sans-serif;
        }
        .form-input-admin::placeholder {
          color: #94a3b8;
          opacity: 1;
        }
        .form-input-admin:focus {
          border-color: #21409A;
          background: white;
          box-shadow: 0 20px 40px rgba(33, 64, 154, 0.08);
          transform: translateY(-2px);
        }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(18%) sepia(48%) saturate(2341%) hue-rotate(214deg) brightness(91%) contrast(98%);
          opacity: 0.6;
          transition: opacity 0.2s;
        }
      `}</style>
    </div>
  );
}
