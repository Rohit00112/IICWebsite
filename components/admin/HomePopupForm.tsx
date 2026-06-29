'use client';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { DEFAULT_HOME_POPUP_IMAGE } from '@/lib/home-popup-constants';
import { toSafeImageSrc } from '@/lib/image-source';
import type { HomePopupSettings } from '@/lib/home-popup';

interface HomePopupFormProps {
  initialSettings: HomePopupSettings;
}

export default function HomePopupForm({ initialSettings }: HomePopupFormProps) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialSettings.enabled);
  const [image, setImage] = useState(initialSettings.image || DEFAULT_HOME_POPUP_IMAGE);
  const [alt, setAlt] = useState(initialSettings.alt || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const previewSrc = useMemo(() => toSafeImageSrc(image), [image]);

  const saveSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');

    if (!toSafeImageSrc(image)) {
      setMessage('Please upload a popup image before saving.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/home-popup', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled, image, alt }),
      });

      const body = await response.json().catch(() => null);

      if (!response.ok) {
        if (body?.details?.length) {
          const lines = body.details
            .map((detail: { path: (string | number)[]; message: string }) => `${detail.path.join('.')}: ${detail.message}`)
            .join('\n');
          throw new Error(lines);
        }

        throw new Error(body?.error || 'Failed to update popup');
      }

      setMessage('Home popup updated.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update popup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={saveSettings} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
      <div className="space-y-8">
        <section className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#74C044]">Home Page</p>
            <h2 className="mt-2 text-2xl font-black text-[#1A2B56]">Popup Settings</h2>
          </div>

          <div className="space-y-8">
            <label className="flex items-center justify-between rounded-2xl border border-gray-100 bg-[#f8fafc] px-5 py-4">
              <span>
                <span className="block text-sm font-black text-[#1A2B56]">Show popup</span>
                <span className="mt-1 block text-xs font-bold text-gray-400">Visible only on the home page.</span>
              </span>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(event) => setEnabled(event.target.checked)}
                className="h-5 w-5 accent-[#74C044]"
              />
            </label>

            <ImageUpload
              label="Popup Image"
              value={image}
              onChange={setImage}
              onRemove={() => setImage('')}
            />

            <div className="space-y-3">
              <label htmlFor="home-popup-alt" className="text-[10px] font-bold tracking-widest text-gray-700">
                Alt Text
              </label>
              <input
                id="home-popup-alt"
                type="text"
                value={alt}
                maxLength={140}
                onChange={(event) => setAlt(event.target.value)}
                placeholder="College announcement"
                className="w-full rounded-xl border-2 border-[#eef2f6] bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#1A2B56] outline-none transition-all focus:border-[#21409A]"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-[#21409A] px-8 py-4 text-sm font-black text-white shadow-lg shadow-[#21409A]/20 transition-colors hover:bg-[#1A2B56] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save Popup'}
          </button>
          <button
            type="button"
            onClick={() => setImage(DEFAULT_HOME_POPUP_IMAGE)}
            className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-black text-[#1A2B56] transition-colors hover:border-[#21409A]/30"
          >
            Use Default Image
          </button>
          {message && (
            <p className={`text-sm font-bold ${message.includes('updated') ? 'text-[#74C044]' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      <aside className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-gray-400">Preview</p>
        <div className="rounded-[28px] bg-[#061126] p-5">
          <div className="grid min-h-[240px] place-items-center overflow-hidden rounded-[22px] bg-white">
            {previewSrc ? (
              <Image
                src={previewSrc}
                alt={alt || 'College announcement'}
                width={1920}
                height={1920}
                sizes="420px"
                className="h-auto w-full object-contain"
              />
            ) : (
              <span className="px-8 text-center text-xs font-black uppercase tracking-[0.18em] text-gray-300">
                No image selected
              </span>
            )}
          </div>
        </div>
        <p className="mt-4 text-xs font-bold leading-relaxed text-gray-400">
          Visitors will see this as a centered popup after the home page loads.
        </p>
      </aside>
    </form>
  );
}
