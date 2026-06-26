'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import type { EventGalleryItem, EventGalleryStatus } from '@/lib/event-galleries';

type GalleryFormData = {
  title: string;
  slug: string;
  year: number;
  summary: string;
  coverImage: string;
  images: string[];
  status: EventGalleryStatus;
  sortOrder: number;
};

const currentYear = new Date().getFullYear();

const defaultFormData: GalleryFormData = {
  title: '',
  slug: '',
  year: currentYear,
  summary: '',
  coverImage: '',
  images: [],
  status: 'draft',
  sortOrder: 0,
};

export default function EventGalleryForm({ gallery }: { gallery?: EventGalleryItem }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GalleryFormData>(gallery ? {
    title: gallery.title,
    slug: gallery.slug,
    year: gallery.year,
    summary: gallery.summary,
    coverImage: gallery.coverImage,
    images: gallery.images,
    status: gallery.status,
    sortOrder: gallery.sortOrder,
  } : defaultFormData);

  const isEditing = Boolean(gallery);

  const updateImage = (index: number, image: string) => {
    const images = [...formData.images];
    images[index] = image;
    setFormData({ ...formData, images });
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, itemIndex) => itemIndex !== index) });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      slug: formData.slug.trim() || undefined,
      images: formData.images.filter(Boolean),
    };

    try {
      const response = await fetch(isEditing ? `/api/galleries/${gallery?.id}` : '/api/galleries', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/galleries');
        router.refresh();
        return;
      }

      const body = await response.json().catch(() => null);
      if (body?.details?.length) {
        const errors = body.details
          .map((detail: { path: (string | number)[]; message: string }) => `- ${detail.path.join('.')}: ${detail.message}`)
          .join('\n');
        alert(`Validation failed:\n${errors}`);
      } else {
        alert(body?.error || 'Failed to save event gallery');
      }
    } catch (error) {
      console.error('Error saving event gallery:', error);
      alert('An error occurred while saving the gallery.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] pb-20">
      <div className="mb-10 flex flex-col gap-6 border-b border-gray-100 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-sora text-4xl font-black tracking-tight text-[#1A2B56] md:text-5xl">
            {isEditing ? 'Edit Event Gallery' : 'Create Event Gallery'}
          </h1>
          <p className="mt-3 text-base font-medium text-gray-500">
            Set the event year, cover photo, and every image visitors can explore.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/admin/galleries" className="inline-flex items-center gap-2 px-4 py-3 text-sm font-bold text-gray-700 hover:text-[#21409A]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0 7-7m-7 7h18" /></svg>
            Back to galleries
          </Link>
          <button
            type="submit"
            form="event-gallery-form"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#21409A] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#21409A]/20 transition-colors hover:bg-[#1A2B56] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Gallery'}
          </button>
        </div>
      </div>

      <form id="event-gallery-form" onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-8">
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#1A2B56]">Gallery Details</h2>
              <p className="mt-2 text-sm font-medium text-gray-500">These details appear on the event card and its public gallery page.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_150px]">
              <div>
                <Field label="Event name">
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                    placeholder="Spring Carnival"
                    className="admin-input"
                  />
                </Field>
                <p className="mt-2 text-xs font-medium text-gray-500">Use the same event name for every year so its photos appear together on one public archive.</p>
              </div>
              <Field label="Year">
                <input
                  required
                  type="number"
                  min="2000"
                  max="2100"
                  value={formData.year}
                  onChange={(event) => setFormData({ ...formData, year: Number(event.target.value) })}
                  className="admin-input"
                />
              </Field>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_150px]">
              <Field label="Page slug">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(event) => setFormData({ ...formData, slug: event.target.value })}
                  placeholder="Generated from title and year when blank"
                  className="admin-input"
                />
              </Field>
              <Field label="Display order">
                <input
                  type="number"
                  min="0"
                  max="9999"
                  value={formData.sortOrder}
                  onChange={(event) => setFormData({ ...formData, sortOrder: Number(event.target.value) })}
                  className="admin-input"
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Event summary">
                <textarea
                  required
                  rows={4}
                  value={formData.summary}
                  onChange={(event) => setFormData({ ...formData, summary: event.target.value })}
                  placeholder="A short description of the event and the moments captured in this collection."
                  className="admin-input resize-y"
                />
              </Field>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <ImageUpload
                label="Cover image"
                value={formData.coverImage}
                onChange={(coverImage) => setFormData({ ...formData, coverImage })}
                onRemove={() => setFormData({ ...formData, coverImage: '' })}
              />
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#1A2B56]">Gallery Photos</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">Add up to 60 photos. The cover image is also included automatically on the public page.</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
                disabled={formData.images.length >= 60}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#21409A] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Add Photo
              </button>
            </div>

            {formData.images.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {formData.images.map((image, index) => (
                  <div key={`gallery-photo-${index}`} className="relative rounded-lg border border-gray-200 bg-[#f8fafc] p-4">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm hover:bg-red-500 hover:text-white"
                      aria-label={`Remove gallery photo ${index + 1}`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 6 12 12M18 6 6 18" /></svg>
                    </button>
                    <ImageUpload
                      label={`Photo ${index + 1}`}
                      value={image}
                      onChange={(value) => updateImage(index, value)}
                      onRemove={() => removeImage(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 bg-[#f8fafc] px-6 py-12 text-center text-sm font-medium text-gray-500">
                No gallery photos yet.
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-lg font-black text-[#1A2B56]">Publishing</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">Only published galleries appear in Life at IIC.</p>
          <label className="mt-6 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-600">Status</label>
          <select
            value={formData.status}
            onChange={(event) => setFormData({ ...formData, status: event.target.value as EventGalleryStatus })}
            className="admin-input mt-3"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <dl className="mt-8 space-y-4 border-t border-gray-100 pt-6 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="font-medium text-gray-500">Gallery year</dt>
              <dd className="font-black text-[#1A2B56]">{formData.year}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="font-medium text-gray-500">Photos</dt>
              <dd className="font-black text-[#1A2B56]">{formData.images.filter(Boolean).length}</dd>
            </div>
          </dl>
        </aside>
      </form>

      <style jsx global>{`
        .admin-input {
          width: 100%;
          border: 1px solid #d7dee8;
          border-radius: 8px;
          background: #ffffff;
          padding: 0.8rem 0.9rem;
          color: #1A2B56;
          font-size: 0.9rem;
          font-weight: 600;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .admin-input:focus {
          border-color: #21409A;
          box-shadow: 0 0 0 3px rgba(33, 64, 154, 0.12);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-gray-600">{label}</span>
      {children}
    </label>
  );
}
