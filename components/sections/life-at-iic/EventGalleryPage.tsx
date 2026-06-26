'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { EventGalleryArchive, EventGalleryItem } from '@/lib/event-galleries';

type ActivePhoto = {
  images: string[];
  index: number;
  label: string;
};

const photoShapes = [
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[4/5]',
];

function getGalleryImages(gallery: EventGalleryItem) {
  return Array.from(new Set([gallery.coverImage, ...gallery.images]));
}

export default function EventGalleryPage({ gallery }: { gallery: EventGalleryArchive }) {
  const [activePhoto, setActivePhoto] = useState<ActivePhoto | null>(null);

  const changePhoto = (direction: -1 | 1) => {
    if (!activePhoto) return;

    setActivePhoto({
      ...activePhoto,
      index: (activePhoto.index + direction + activePhoto.images.length) % activePhoto.images.length,
    });
  };

  return (
    <main className="bg-[#f4f6fb] pb-20">
      <section className="relative min-h-[60svh] overflow-hidden bg-[#111827] text-white">
        <Image
          src={gallery.coverImage}
          alt={gallery.title}
          fill
          priority
          className="object-cover opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[60svh] max-w-7xl flex-col justify-end px-6 pb-14 pt-28 md:pb-20">
          <Link href="/life-at-iic" className="mb-auto inline-flex w-fit items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18-6-6 6-6" /></svg>
            Life at IIC
          </Link>
          <p className="mb-4 text-sm font-bold tracking-[0.18em] text-white/75">EVENT ARCHIVE</p>
          <h1 className="max-w-4xl font-iic text-5xl font-black leading-[1.05] tracking-normal md:text-7xl">{gallery.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{gallery.summary}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        {gallery.galleries.map((yearGallery, yearIndex) => {
          const images = getGalleryImages(yearGallery);

          return (
            <section key={yearGallery.id} className={yearIndex === 0 ? '' : 'mt-20 border-t border-gray-200 pt-16'}>
              <div className="mb-8 flex items-end justify-between gap-6 border-b border-gray-200 pb-6 md:mb-10">
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-[#21409A]">{images.length} PHOTOS</p>
                  <h2 className="mt-2 text-3xl font-black text-[#1a1a1a] md:text-5xl">
                    {gallery.title} <span className={yearIndex % 2 === 0 ? 'text-[#21409A]' : 'text-[#4B8F30]'}>{yearGallery.year}</span>
                  </h2>
                </div>
              </div>

              <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
                {images.map((image, index) => (
                  <button
                    key={`${yearGallery.id}-${image}-${index}`}
                    type="button"
                    onClick={() => setActivePhoto({ images, index, label: `${gallery.title} ${yearGallery.year}` })}
                    className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-gray-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#21409A] focus-visible:ring-offset-4 ${photoShapes[index % photoShapes.length]}`}
                    aria-label={`Open ${gallery.title} ${yearGallery.year} photo ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${gallery.title} ${yearGallery.year} photo ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {activePhoto && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`${activePhoto.label} photo viewer`}>
          <button type="button" onClick={() => setActivePhoto(null)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close photo viewer" title="Close photo viewer">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          {activePhoto.images.length > 1 && (
            <button type="button" onClick={() => changePhoto(-1)} className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Previous photo" title="Previous photo">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 18-6-6 6-6" /></svg>
            </button>
          )}
          <div className="relative h-[min(80svh,900px)] w-full max-w-6xl">
            <Image src={activePhoto.images[activePhoto.index]} alt={`${activePhoto.label} photo ${activePhoto.index + 1}`} fill className="object-contain" sizes="100vw" priority />
          </div>
          {activePhoto.images.length > 1 && (
            <button type="button" onClick={() => changePhoto(1)} className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Next photo" title="Next photo">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 6 6 6-6 6" /></svg>
            </button>
          )}
        </div>
      )}
    </main>
  );
}
