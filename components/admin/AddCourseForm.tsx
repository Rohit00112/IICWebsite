'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import JsonArrayInput from './JsonArrayInput';
import {
  courseJsonExamples,
  normalizeCareerJson,
  normalizeCurriculumJson,
  normalizeFacultyJson,
  normalizeFaqsJson,
  normalizeFeaturedModulesJson,
  normalizeLearningOutcomesJson,
  normalizeProjectsJson,
} from './courseJsonNormalizers';

interface Module {
  name: string;
  code?: string;
  description: string;
  credits: string;
}

interface CurriculumYear {
  title: string;
  modules: Module[];
}

interface ListingCard {
  title: string;
  mnemonic: string;
  mnemonicImage: string;
  displayTitle: string;
  specialism: string;
  category: string;
  description: string;
  image: string;
  backgroundColor: string;
  modulesLabel: string;
  creditsLabel: string;
  featuredModules: string[];
  order: number;
}

interface CareerPath {
  title: string;
  description: string;
  color: string;
}

interface FacultyMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface Project {
  title: string;
  cohort: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const cleanTopModulePills = (items: string[]) => {
  const seen = new Set<string>();

  return items.reduce<string[]>((labels, item) => {
    const label = item.trim();
    const key = label.toLowerCase();

    if (!label || key === 'string' || seen.has(key)) return labels;

    seen.add(key);
    labels.push(label);
    return labels;
  }, []);
};

export default function AddCourseForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'core' | 'listing' | 'curriculum' | 'outcomes' | 'career' | 'faculty' | 'projects' | 'faqs'>('core');
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    category: '',
    duration: '',
    description: '',
    image: '',
    level: '',
    listing: {
      title: '',
      mnemonic: '',
      mnemonicImage: '',
      displayTitle: '',
      specialism: '',
      category: '',
      description: '',
      image: '',
      backgroundColor: '#21409A',
      modulesLabel: '17 Modules',
      creditsLabel: '360 Credits',
      featuredModules: [] as string[],
      order: 0,
    } as ListingCard,
    featured: false,
    overview: '',
    details: {
      level: '',
      duration: '',
      intake: '',
      awardingBody: ''
    },
    curriculum: [] as CurriculumYear[],
    learningOutcomes: [] as string[],
    careerOpportunities: [] as CareerPath[],
    faculty: [] as FacultyMember[],
    projects: [] as Project[],
    faqs: [] as FAQ[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload a hero image before publishing.');
      setActiveSection('core');
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      listing: {
        ...formData.listing,
        featuredModules: cleanTopModulePills(formData.listing.featuredModules),
      },
      projects: formData.projects
        .filter((project) => project.title.trim() || project.cohort.trim() || project.image)
        .map(({ image, ...rest }) => (image ? { ...rest, image } : rest)),
      faculty: formData.faculty.map(({ image, ...rest }) => (image ? { ...rest, image } : rest)),
    };

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/courses');
        router.refresh();
      } else {
        const body = await res.json().catch(() => null);
        if (body?.details?.length) {
          const lines = body.details.map((d: { path: (string | number)[]; message: string }) => `• ${d.path.join('.')}: ${d.message}`).join('\n');
          alert(`Validation failed:\n${lines}`);
        } else {
          alert(body?.error || 'Failed to create course');
        }
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('An error occurred during creation');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for array fields
  const addYear = () => setFormData({ ...formData, curriculum: [...formData.curriculum, { title: 'Year ' + (formData.curriculum.length + 1), modules: [] }] });
  const addModule = (yIdx: number) => {
    const newCurr = [...formData.curriculum];
    newCurr[yIdx].modules.push({ name: '', code: '', description: '', credits: '' });
    setFormData({ ...formData, curriculum: newCurr });
  };
  
  const addOutcome = () => setFormData({ ...formData, learningOutcomes: [...formData.learningOutcomes, ''] });
  const addCareer = () => setFormData({ ...formData, careerOpportunities: [...formData.careerOpportunities, { title: '', description: '', color: '#21409A' }] });
  const removeCareer = (index: number) => setFormData((current) => ({
    ...current,
    careerOpportunities: current.careerOpportunities.filter((_, careerIndex) => careerIndex !== index),
  }));
  const addFaculty = () => setFormData({ ...formData, faculty: [...formData.faculty, { name: '', role: '', description: '', image: '' }] });
  const addProject = () => setFormData({ ...formData, projects: [...formData.projects, { title: '', cohort: '', image: '' }] });
  const removeProject = (index: number) => setFormData((current) => ({
    ...current,
    projects: current.projects.filter((_, projectIndex) => projectIndex !== index),
  }));
  const addFAQ = () => setFormData({ ...formData, faqs: [...formData.faqs, { question: '', answer: '' }] });
  const addListingPill = () => setFormData((current) => ({
    ...current,
    listing: {
      ...current.listing,
      featuredModules: [...current.listing.featuredModules, ''],
    },
  }));
  const updateListingPill = (idx: number, value: string) => setFormData((current) => {
    const featuredModules = [...current.listing.featuredModules];
    while (featuredModules.length <= idx) featuredModules.push('');
    featuredModules[idx] = value;
    return {
      ...current,
      listing: {
        ...current.listing,
        featuredModules,
      },
    };
  });
  const removeListingPill = (idx: number) => setFormData((current) => ({
    ...current,
    listing: {
      ...current.listing,
      featuredModules: current.listing.featuredModules.filter((_, i) => i !== idx),
    },
  }));

  const visibleListingPills = formData.listing.featuredModules.length > 0
    ? formData.listing.featuredModules
    : [''];

  const applyListingPillsJson = (items: string[], mode: 'replace' | 'append') => setFormData((current) => ({
    ...current,
    listing: {
      ...current.listing,
      featuredModules: mode === 'replace' ? items : [...current.listing.featuredModules, ...items],
    },
  }));
  const applyCurriculumJson = (items: CurriculumYear[], mode: 'replace' | 'append') => setFormData((current) => ({
    ...current,
    curriculum: mode === 'replace' ? items : [...current.curriculum, ...items],
  }));
  const applyLearningOutcomesJson = (items: string[], mode: 'replace' | 'append') => setFormData((current) => ({
    ...current,
    learningOutcomes: mode === 'replace' ? items : [...current.learningOutcomes, ...items],
  }));
  const applyCareerJson = (items: CareerPath[], mode: 'replace' | 'append') => setFormData((current) => ({
    ...current,
    careerOpportunities: mode === 'replace' ? items : [...current.careerOpportunities, ...items],
  }));
  const applyFacultyJson = (items: FacultyMember[], mode: 'replace' | 'append') => setFormData((current) => ({
    ...current,
    faculty: mode === 'replace' ? items : [...current.faculty, ...items],
  }));
  const applyProjectsJson = (items: Project[], mode: 'replace' | 'append') => setFormData((current) => ({
    ...current,
    projects: mode === 'replace' ? items : [...current.projects, ...items],
  }));
  const applyFaqsJson = (items: FAQ[], mode: 'replace' | 'append') => setFormData((current) => ({
    ...current,
    faqs: mode === 'replace' ? items : [...current.faqs, ...items],
  }));

  return (
    <div className="max-w-[1600px] mx-auto pb-20">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between border-b border-gray-100 pb-10">
        <div>
          <h1 className="text-5xl font-black text-[#1A2B56] font-sora tracking-tight mb-3">Initialise Course</h1>
          <p className="text-gray-500 font-medium text-lg">Synchronise academic data across the entire platform.</p>
        </div>
        <div className="flex items-center gap-8 mb-2">
          <Link href="/admin/courses" className="text-sm font-bold text-gray-700 hover:text-[#21409A] flex items-center gap-2 group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Cancel Creation
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-12 py-5 bg-[#21409A] text-white rounded-[20px] font-bold text-sm shadow-2xl shadow-[#21409A]/30 disabled:opacity-50 flex items-center gap-3"
          >
            {loading ? 'Syncing...' : 'Publish & Sync'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 sticky top-8 space-y-2">
          {[
            { id: 'core', label: 'Core Metadata', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'listing', label: 'Listing Card', icon: 'M4 6h16M4 12h16M4 18h7' },
            { id: 'curriculum', label: 'Curriculum Structure', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { id: 'outcomes', label: 'Entry & Outcomes', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'career', label: 'Career Paths', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            { id: 'faculty', label: 'Faculty Team', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            { id: 'projects', label: 'Student Innovation', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'faqs', label: 'Support FAQs', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as typeof activeSection)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-extrabold text-sm transition-all ${
                activeSection === sec.id ? 'bg-[#21409A] text-white shadow-xl' : 'text-gray-700 hover:bg-gray-100 hover:text-[#1A2B56]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sec.icon} /></svg>
              {sec.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm min-h-[600px]">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {activeSection === 'core' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Course Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="form-input-admin" placeholder="e.g. BSc (Hons) Computing" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Slug (URL)</label>
                    <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="form-input-admin" placeholder="bsc-computing" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Category</label>
                    <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="form-input-admin" placeholder="Technology" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Duration</label>
                    <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value, details: {...formData.details, duration: e.target.value}})} className="form-input-admin" placeholder="3 Years" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Level</label>
                    <input type="text" value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value, details: {...formData.details, level: e.target.value}})} className="form-input-admin" placeholder="Undergraduate" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Intake</label>
                    <input type="text" value={formData.details.intake} onChange={(e) => setFormData({...formData, details: {...formData.details, intake: e.target.value}})} className="form-input-admin" placeholder="September / February" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Awarding Body</label>
                    <input type="text" value={formData.details.awardingBody} onChange={(e) => setFormData({...formData, details: {...formData.details, awardingBody: e.target.value}})} className="form-input-admin" placeholder="London Metropolitan University" />
                  </div>
                </div>

                <div className="space-y-3">
                  <ImageUpload
                    label="Hero Image"
                    value={formData.image}
                    onChange={(url) => setFormData({...formData, image: url})}
                    onRemove={() => setFormData({...formData, image: ''})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest text-gray-700">Short Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="form-input-admin"
                    placeholder="A concise summary shown in course listings (min 10 characters)..."
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest text-gray-700">Detailed Overview</label>
                  <RichTextEditor 
                    value={formData.overview} 
                    onChange={(val) => setFormData({...formData, overview: val})} 
                    placeholder="Provide a comprehensive programme summary..."
                  />
                </div>
              </div>
            )}

            {activeSection === 'listing' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1A2B56]">Courses Page Listing Card</h3>
                  <p className="mt-2 text-sm font-medium text-gray-500">Controls the card shown on the public courses listing page. Empty fields fall back to core course data.</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Card Headline</label>
                    <input type="text" value={formData.listing.displayTitle} onChange={(e) => setFormData({...formData, listing: {...formData.listing, displayTitle: e.target.value}})} className="form-input-admin" placeholder="Business Administration" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Specialism</label>
                    <input type="text" value={formData.listing.specialism} onChange={(e) => setFormData({...formData, listing: {...formData.listing, specialism: e.target.value}})} className="form-input-admin" placeholder="Digital Business Management" />
                  </div>
                </div>

                <div className="space-y-3">
                  <ImageUpload
                    label="Mnemonic Image"
                    value={formData.listing.mnemonicImage}
                    onChange={(url) => setFormData({...formData, listing: {...formData.listing, mnemonicImage: url}})}
                    onRemove={() => setFormData({...formData, listing: {...formData.listing, mnemonicImage: ''}})}
                  />
                  <p className="text-xs font-medium text-gray-500">Upload the designed mnemonic artwork shown over the course image.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest text-gray-700">Mnemonic Text Fallback</label>
                  <textarea
                    rows={2}
                    value={formData.listing.mnemonic}
                    onChange={(e) => setFormData({...formData, listing: {...formData.listing, mnemonic: e.target.value}})}
                    className="form-input-admin"
                    placeholder={'BA\nDIGITAL BUSINESS MANAGEMENT'}
                  />
                  <p className="text-xs font-medium text-gray-500">Used only when no mnemonic image is uploaded.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest text-gray-700">Display Order</label>
                  <input type="number" value={formData.listing.order} onChange={(e) => setFormData({...formData, listing: {...formData.listing, order: Number(e.target.value)}})} className="form-input-admin" placeholder="1" />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Listing Category</label>
                    <input type="text" value={formData.listing.category} onChange={(e) => setFormData({...formData, listing: {...formData.listing, category: e.target.value}})} className="form-input-admin" placeholder="BSc (Hons) Computing" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Card Colour</label>
                    <input type="text" value={formData.listing.backgroundColor} onChange={(e) => setFormData({...formData, listing: {...formData.listing, backgroundColor: e.target.value}})} className="form-input-admin" placeholder="#21409A" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Modules Label</label>
                    <input type="text" value={formData.listing.modulesLabel} onChange={(e) => setFormData({...formData, listing: {...formData.listing, modulesLabel: e.target.value}})} className="form-input-admin" placeholder="17 Modules" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Credits Label</label>
                    <input type="text" value={formData.listing.creditsLabel} onChange={(e) => setFormData({...formData, listing: {...formData.listing, creditsLabel: e.target.value}})} className="form-input-admin" placeholder="360 Credits" />
                  </div>
                </div>

                <div className="space-y-3">
                  <ImageUpload
                    label="Listing Image"
                    value={formData.listing.image}
                    onChange={(url) => setFormData({...formData, listing: {...formData.listing, image: url}})}
                    onRemove={() => setFormData({...formData, listing: {...formData.listing, image: ''}})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest text-gray-700">Listing Description</label>
                  <textarea rows={3} value={formData.listing.description} onChange={(e) => setFormData({...formData, listing: {...formData.listing, description: e.target.value}})} className="form-input-admin" placeholder="Short listing copy shown on the course card..." />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold tracking-widest text-gray-700">Top Modules / Pills</label>
                    <button
                      type="button"
                      onClick={addListingPill}
                      className="rounded-full border border-[#21409A]/20 bg-[#21409A]/5 px-4 py-2 text-xs font-bold tracking-widest text-[#21409A] transition-colors hover:bg-[#21409A] hover:text-white"
                    >
                      + Add Module
                    </button>
                  </div>
                  <JsonArrayInput
                    fieldName="featuredModules"
                    currentCount={formData.listing.featuredModules.length}
                    example={courseJsonExamples.featuredModules}
                    transformItems={normalizeFeaturedModulesJson}
                    onApply={applyListingPillsJson}
                  />
                  <div className="space-y-3">
                    {visibleListingPills.map((module, idx) => (
                      <div key={`listing-module-${idx}`} className="flex gap-3">
                        <input
                          type="text"
                          value={module}
                          onChange={(e) => updateListingPill(idx, e.target.value)}
                          className="form-input-admin"
                          placeholder="Type a top module, e.g. Software Engineering"
                        />
                        {formData.listing.featuredModules.length > 0 && (
                          <button
                            type="button"
                            onClick={() => removeListingPill(idx)}
                            className="shrink-0 rounded-2xl border border-red-100 px-5 text-xs font-black tracking-widest text-red-500 transition-colors hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'curriculum' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1A2B56]">Module Structure</h3>
                  <button type="button" onClick={addYear} className="text-sm font-bold text-[#21409A]">+ Add Academic Year</button>
                </div>
                <JsonArrayInput
                  fieldName="curriculum"
                  currentCount={formData.curriculum.length}
                  example={courseJsonExamples.curriculum}
                  transformItems={normalizeCurriculumJson}
                  onApply={applyCurriculumJson}
                />
                {formData.curriculum.map((year, yIdx) => (
                  <div key={`year-${yIdx}`} className="p-8 bg-gray-50 rounded-[32px] space-y-6">
                    <div className="flex items-center justify-between">
                      <input type="text" value={year.title} onChange={(e) => {
                        const newCurr = [...formData.curriculum];
                        newCurr[yIdx].title = e.target.value;
                        setFormData({...formData, curriculum: newCurr});
                      }} className="bg-transparent border-b-2 border-gray-200 font-bold text-lg outline-none focus:border-[#21409A] text-[#1A2B56]" />
                      <button type="button" onClick={() => addModule(yIdx)} className="text-xs font-bold tracking-widest text-[#21409A]">+ Add Module</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {year.modules.map((mod, mIdx) => (
                        <div key={`mod-${yIdx}-${mIdx}`} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                          <input type="text" value={mod.name} placeholder="Module Name" onChange={(e) => {
                            const newCurr = [...formData.curriculum];
                            newCurr[yIdx].modules[mIdx].name = e.target.value;
                             setFormData({...formData, curriculum: newCurr});
                          }} className="w-full text-sm font-bold outline-none text-[#1A2B56]" />
                          <input type="text" value={mod.code || ''} placeholder="Module Code (e.g. COMP101)" onChange={(e) => {
                            const newCurr = [...formData.curriculum];
                            newCurr[yIdx].modules[mIdx].code = e.target.value;
                             setFormData({...formData, curriculum: newCurr});
                          }} className="w-full text-xs text-gray-700 outline-none font-medium" />
                          <input type="text" value={mod.credits} placeholder="Credits (e.g. 30)" onChange={(e) => {
                            const newCurr = [...formData.curriculum];
                            newCurr[yIdx].modules[mIdx].credits = e.target.value;
                             setFormData({...formData, curriculum: newCurr});
                          }} className="w-full text-xs text-gray-700 outline-none font-medium" />
                          <textarea placeholder="Description" rows={2} value={mod.description} onChange={(e) => {
                            const newCurr = [...formData.curriculum];
                            newCurr[yIdx].modules[mIdx].description = e.target.value;
                             setFormData({...formData, curriculum: newCurr});
                          }} className="w-full text-xs text-gray-600 outline-none resize-none font-medium" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'outcomes' && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#1A2B56]">Learning Outcomes</h3>
                    <button type="button" onClick={addOutcome} className="text-sm font-bold text-[#21409A]">+ Add Outcome</button>
                  </div>
                  <JsonArrayInput
                    fieldName="learningOutcomes"
                    currentCount={formData.learningOutcomes.length}
                    example={courseJsonExamples.learningOutcomes}
                    transformItems={normalizeLearningOutcomesJson}
                    onApply={applyLearningOutcomesJson}
                  />
                  <div className="grid grid-cols-1 gap-4">
                    {formData.learningOutcomes.map((outcome, idx) => (
                      <input key={`outcome-${idx}`} type="text" value={outcome} onChange={(e) => {
                        const newOutcomes = [...formData.learningOutcomes];
                        newOutcomes[idx] = e.target.value;
                        setFormData({...formData, learningOutcomes: newOutcomes});
                      }} className="form-input-admin" placeholder="Mastery of specific technical domains..." />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'career' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1A2B56]">Career Opportunities</h3>
                  <button type="button" onClick={addCareer} className="text-sm font-bold text-[#21409A]">+ Add Pathway</button>
                </div>
                <JsonArrayInput
                  fieldName="careerOpportunities"
                  currentCount={formData.careerOpportunities.length}
                  example={courseJsonExamples.careerOpportunities}
                  transformItems={normalizeCareerJson}
                  onApply={applyCareerJson}
                />
                <div className="grid grid-cols-2 gap-6">
                  {formData.careerOpportunities.map((career, idx) => (
                    <div key={`career-${idx}`} className="p-6 bg-gray-50 rounded-2xl space-y-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <input type="text" value={career.title} placeholder="e.g. Senior Software Architect" onChange={(e) => {
                          const newCareers = [...formData.careerOpportunities];
                          newCareers[idx].title = e.target.value;
                          setFormData({...formData, careerOpportunities: newCareers});
                        }} className="min-w-0 flex-1 font-bold bg-transparent outline-none text-[#1A2B56] placeholder:text-gray-500" />
                        <button
                          type="button"
                          onClick={() => removeCareer(idx)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          aria-label={`Remove ${career.title || 'career pathway'}`}
                          title="Remove pathway"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m-8 0 1 13h8l1-13" />
                          </svg>
                        </button>
                      </div>
                      <textarea placeholder="Describe the career path and potential earnings..." rows={3} value={career.description} onChange={(e) => {
                        const newCareers = [...formData.careerOpportunities];
                        newCareers[idx].description = e.target.value;
                        setFormData({...formData, careerOpportunities: newCareers});
                      }} className="w-full text-sm text-[#1A2B56] font-medium bg-transparent outline-none resize-none placeholder:text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'faculty' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1A2B56]">Faculty Members</h3>
                  <button type="button" onClick={addFaculty} className="text-sm font-bold text-[#21409A]">+ Add Faculty</button>
                </div>
                <JsonArrayInput
                  fieldName="faculty"
                  currentCount={formData.faculty.length}
                  example={courseJsonExamples.faculty}
                  transformItems={normalizeFacultyJson}
                  onApply={applyFacultyJson}
                />
                <div className="grid grid-cols-2 gap-6">
                  {formData.faculty.map((member, idx) => (
                    <div key={`faculty-${idx}`} className="p-8 border border-gray-100 rounded-[32px] space-y-4">
                      <input type="text" value={member.name} placeholder="Full Name (e.g. Dr. John Doe)" onChange={(e) => {
                        const newFaculty = [...formData.faculty];
                        newFaculty[idx].name = e.target.value;
                        setFormData({...formData, faculty: newFaculty});
                      }} className="w-full font-bold outline-none text-[#1A2B56] placeholder:text-gray-500" />
                      <input type="text" value={member.role} placeholder="Role (e.g. Professor of AI)" onChange={(e) => {
                        const newFaculty = [...formData.faculty];
                        newFaculty[idx].role = e.target.value;
                        setFormData({...formData, faculty: newFaculty});
                      }} className="w-full text-xs font-bold text-[#21409A] outline-none placeholder:text-[#21409A]/40" />
                      <textarea placeholder="Brief academic biography..." rows={3} value={member.description} onChange={(e) => {
                        const newFaculty = [...formData.faculty];
                        newFaculty[idx].description = e.target.value;
                        setFormData({...formData, faculty: newFaculty});
                      }} className="w-full text-sm text-gray-600 font-medium outline-none resize-none placeholder:text-gray-500" />
                      <ImageUpload 
                        label="Faculty Image"
                        value={member.image}
                        onChange={(url) => {
                          const newFaculty = [...formData.faculty];
                          newFaculty[idx].image = url;
                          setFormData({...formData, faculty: newFaculty});
                        }}
                        onRemove={() => {
                          const newFaculty = [...formData.faculty];
                          newFaculty[idx].image = '';
                          setFormData({...formData, faculty: newFaculty});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1A2B56]">Student Innovation</h3>
                  <button type="button" onClick={addProject} className="text-sm font-bold text-[#21409A]">+ Add Project</button>
                </div>
                <JsonArrayInput
                  fieldName="projects"
                  currentCount={formData.projects.length}
                  example={courseJsonExamples.projects}
                  transformItems={normalizeProjectsJson}
                  onApply={applyProjectsJson}
                />
                <div className="grid grid-cols-2 gap-6">
                  {formData.projects.map((proj, idx) => (
                    <div key={`proj-${idx}`} className="p-6 bg-gray-50 rounded-2xl space-y-4">
                      <div className="flex items-center gap-3">
                        <input type="text" value={proj.title} placeholder="Project Title" onChange={(e) => {
                          const newProj = [...formData.projects];
                          newProj[idx].title = e.target.value;
                           setFormData({...formData, projects: newProj});
                        }} className="min-w-0 flex-1 font-bold bg-transparent outline-none text-[#1A2B56]" />
                        <button
                          type="button"
                          onClick={() => removeProject(idx)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          aria-label="Remove project"
                          title="Remove project"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m-8 0 1 13h8l1-13" />
                          </svg>
                        </button>
                      </div>
                      <input type="text" value={proj.cohort} placeholder="Cohort (e.g. Class of 2024)" onChange={(e) => {
                        const newProj = [...formData.projects];
                        newProj[idx].cohort = e.target.value;
                         setFormData({...formData, projects: newProj});
                      }} className="w-full text-xs bg-transparent outline-none text-[#1A2B56]/70 font-bold" />
                      <ImageUpload 
                        label="Project Image"
                        value={proj.image}
                        onChange={(url) => {
                          const newProj = [...formData.projects];
                          newProj[idx].image = url;
                          setFormData({...formData, projects: newProj});
                        }}
                        onRemove={() => {
                          const newProj = [...formData.projects];
                          newProj[idx].image = '';
                          setFormData({...formData, projects: newProj});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'faqs' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1A2B56]">Programme FAQs</h3>
                  <button type="button" onClick={addFAQ} className="text-sm font-bold text-[#21409A]">+ Add FAQ</button>
                </div>
                <JsonArrayInput
                  fieldName="faqs"
                  currentCount={formData.faqs.length}
                  example={courseJsonExamples.faqs}
                  transformItems={normalizeFaqsJson}
                  onApply={applyFaqsJson}
                />
                {formData.faqs.map((faq, idx) => (
                  <div key={`faq-${idx}`} className="space-y-4 p-8 bg-gray-50 rounded-[32px]">
                    <input type="text" value={faq.question} placeholder="Frequently Asked Question" onChange={(e) => {
                      const newFAQ = [...(formData.faqs || [])];
                      newFAQ[idx].question = e.target.value;
                      setFormData({...formData, faqs: newFAQ});
                    }} className="w-full font-bold text-[#1A2B56] bg-transparent outline-none border-b border-gray-200 pb-2 placeholder:text-gray-500" />
                    <textarea placeholder="Write the comprehensive answer here..." rows={3} value={faq.answer} onChange={(e) => {
                      const newFAQ = [...(formData.faqs || [])];
                      newFAQ[idx].answer = e.target.value;
                      setFormData({...formData, faqs: newFAQ});
                    }} className="w-full text-sm text-[#1A2B56] font-medium bg-transparent outline-none resize-none placeholder:text-gray-500" />
                  </div>
                ))}
              </div>
            )}

          </form>
        </div>
      </div>

      <style jsx>{`
        .form-input-admin {
          width: 100%;
          background: #f8fafc;
          border: 2px solid #eef2f6;
          border-radius: 20px;
          padding: 1.25rem 2rem;
          font-weight: 700;
          color: #1A2B56;
          outline: none;
          transition: all 0.2s;
        }
        .form-input-admin::placeholder,
        input::placeholder,
        textarea::placeholder {
          color: #64748b;
          opacity: 1;
        }
        .form-input-admin:focus {
          border-color: #21409A;
          background: white;
          box-shadow: 0 10px 30px rgba(33, 64, 154, 0.05);
        }
      `}</style>
    </div>
  );
}
