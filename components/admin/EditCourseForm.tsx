'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Module {
  name: string;
  description: string;
  credits: string;
}

interface CurriculumYear {
  title: string;
  modules: Module[];
}

interface CourseItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  level: string;
  featured: boolean;
  overview: string;
  details: {
    level: string;
    duration: string;
    intake: string;
    awardingBody: string;
  };
  curriculum: CurriculumYear[];
}

export default function EditCourseForm({ course }: { course: CourseItem }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(course);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/courses');
        router.refresh();
      } else {
        alert('Failed to update course');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('An error occurred during update');
    } finally {
      setLoading(false);
    }
  };

  const addYear = () => {
    setFormData({
      ...formData,
      curriculum: [...formData.curriculum, { title: 'New Year', modules: [] }]
    });
  };

  const addModule = (yearIndex: number) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[yearIndex].modules.push({ name: '', description: '', credits: '' });
    setFormData({ ...formData, curriculum: newCurriculum });
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20">
      <div className="mb-12 flex items-end justify-between border-b border-gray-100 pb-10">
        <div>
          <h1 className="text-5xl font-black text-[#1A2B56] font-sora tracking-tight mb-3">Edit Course</h1>
          <p className="text-gray-500 font-medium text-lg">Manage curriculum, faculty, and academic requirements.</p>
        </div>
        <div className="flex items-center gap-8 mb-2">
          <Link href="/admin/courses" className="text-sm font-bold text-gray-400 hover:text-[#21409A] flex items-center gap-2 group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Courses
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-12 py-5 bg-[#74C044] text-white rounded-[20px] font-bold text-sm shadow-2xl shadow-[#74C044]/30 disabled:opacity-50 flex items-center gap-3"
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Sidebar: Metadata */}
        <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-8 self-start">
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#1A2B56] font-sora tracking-tight">Core Details</h2>
              <p className="text-sm text-gray-400 font-medium">Basic information and program category</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Course Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56]"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Category</label>
                  <input 
                    type="text" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Level</label>
                  <input 
                    type="text" 
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Featured Image URL</label>
                <input 
                  type="url" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56]"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Short Description</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#21409A]/10 rounded-[20px] py-5 px-8 outline-none font-bold text-[#1A2B56] resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-5 py-5 px-8 bg-[#f8fcfb] rounded-[24px] border border-[#74C044]/20">
                <input 
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-6 h-6 rounded-lg border-gray-300 text-[#74C044] focus:ring-[#74C044]"
                />
                <label htmlFor="featured" className="text-sm font-bold text-[#1A2B56]">Feature on Home Page</label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Curriculum */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#1A2B56] font-sora tracking-tight">Curriculum Structure</h2>
                <p className="text-sm text-gray-400 font-medium">Manage modules across different years</p>
              </div>
              <button 
                type="button"
                onClick={addYear}
                className="px-6 py-3 bg-[#f0f4f8] text-[#21409A] rounded-xl font-bold text-sm hover:bg-[#21409A] hover:text-white"
              >
                + Add Year
              </button>
            </div>

            <div className="space-y-12">
              {formData.curriculum.map((year, yIdx) => (
                <div key={yIdx} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <input 
                      type="text" 
                      value={year.title}
                      onChange={(e) => {
                        const newCurriculum = [...formData.curriculum];
                        newCurriculum[yIdx].title = e.target.value;
                        setFormData({...formData, curriculum: newCurriculum});
                      }}
                      className="text-xl font-bold text-[#1A2B56] bg-transparent border-b-2 border-gray-100 focus:border-[#21409A] pb-2 outline-none flex-grow"
                    />
                    <button 
                      type="button"
                      onClick={() => addModule(yIdx)}
                      className="text-xs font-bold text-[#21409A] uppercase tracking-widest"
                    >
                      + Add Module
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {year.modules.map((mod, mIdx) => (
                      <div key={mIdx} className="bg-gray-50 p-8 rounded-3xl space-y-6 relative group">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-2 space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Module Name</label>
                            <input 
                              type="text" 
                              value={mod.name}
                              onChange={(e) => {
                                const newCurriculum = [...formData.curriculum];
                                newCurriculum[yIdx].modules[mIdx].name = e.target.value;
                                setFormData({...formData, curriculum: newCurriculum});
                              }}
                              className="w-full bg-white border border-gray-100 rounded-xl py-3 px-5 font-bold text-[#1A2B56] text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Credits</label>
                            <input 
                              type="text" 
                              value={mod.credits}
                              onChange={(e) => {
                                const newCurriculum = [...formData.curriculum];
                                newCurriculum[yIdx].modules[mIdx].credits = e.target.value;
                                setFormData({...formData, curriculum: newCurriculum});
                              }}
                              className="w-full bg-white border border-gray-100 rounded-xl py-3 px-5 font-bold text-[#1A2B56] text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
                          <textarea 
                            rows={2}
                            value={mod.description}
                            onChange={(e) => {
                              const newCurriculum = [...formData.curriculum];
                              newCurriculum[yIdx].modules[mIdx].description = e.target.value;
                              setFormData({...formData, curriculum: newCurriculum});
                            }}
                            className="w-full bg-white border border-gray-100 rounded-xl py-3 px-5 font-medium text-gray-500 text-sm resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
