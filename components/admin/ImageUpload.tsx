'use client';

import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { toSafeImageSrc } from '@/lib/image-source';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  label?: string;
}

type CloudinaryUploadResult = {
  info?: {
    secure_url?: unknown;
  };
};

interface UploadTriggerProps {
  uploadPreset: string;
  onSuccess: (result: unknown) => void;
  onClose: () => void;
  compact?: boolean;
}

function UploadTrigger({
  uploadPreset,
  onSuccess,
  onClose,
  compact = false,
}: UploadTriggerProps) {
  return (
    <CldUploadWidget onSuccess={onSuccess} onClose={onClose} uploadPreset={uploadPreset}>
      {({ open }) => {
        const onClick = () => {
          open?.();
        };

        return (
          <button
            type="button"
            onClick={onClick}
            className={
              compact
                ? 'h-12 rounded-xl border-2 border-[#eef2f6] bg-[#f8fafc] px-5 text-[10px] font-black tracking-widest text-[#21409A] transition-all hover:border-[#21409A] hover:bg-blue-50'
                : 'group flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#eef2f6] bg-[#f8fafc] text-gray-500 transition-all hover:border-[#21409A] hover:text-[#21409A] md:h-40 md:w-40'
            }
          >
            <svg className={`${compact ? 'hidden' : 'h-8 w-8 transition-transform group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>{compact ? 'Change Image' : 'Select File'}</span>
          </button>
        );
      }}
    </CldUploadWidget>
  );
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  label = "Upload Image"
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const previewSrc = toSafeImageSrc(value);
  const [imageErrorSrc, setImageErrorSrc] = useState('');
  const imageFailed = Boolean(previewSrc && imageErrorSrc === previewSrc);

  const restoreScroll = () => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
  };

  const onSuccess = (result: unknown) => {
    const url = (result as CloudinaryUploadResult)?.info?.secure_url;
    if (typeof url === 'string') {
      onChange(url);
    } else {
      console.error('[ImageUpload] Upload succeeded but secure_url missing:', result);
    }
    setTimeout(restoreScroll, 0);
  };

  const onClose = () => {
    setTimeout(restoreScroll, 0);
  };

  if (!cloudName || !uploadPreset) {
    return (
      <div className="space-y-4 w-full">
        <label className="text-[10px] font-bold tracking-widest text-gray-700">
          {label} (Cloudinary not configured)
        </label>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
            Please configure <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> in your <code className="bg-amber-100 px-1 rounded">.env.local</code> to enable image uploads.
          </p>
        </div>
        {/* Fallback to URL input so they can still work */}
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL as fallback..."
          className="w-full bg-[#f8fafc] border-2 border-[#eef2f6] rounded-xl px-4 py-3 text-xs font-bold text-[#1A2B56] outline-none focus:border-[#21409A] transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={onRemove}
            className="text-[10px] font-bold tracking-widest text-red-500 hover:text-red-600 transition-colors"
          >
            Remove Image
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold tracking-widest text-gray-700">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={onRemove}
            className="text-[10px] font-bold tracking-widest text-red-500 hover:text-red-600 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {previewSrc && !imageFailed ? (
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-[#eef2f6]">
            <Image
              fill
              src={previewSrc}
              alt="Uploaded image"
              sizes="160px"
              className="object-cover"
              onError={() => setImageErrorSrc(previewSrc)}
            />
          </div>
        ) : value ? (
          <div className="flex h-40 w-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-100 bg-red-50 px-4 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Image unavailable</span>
            <span className="mt-2 text-[10px] font-bold leading-relaxed text-red-400">Remove it or upload a new one.</span>
          </div>
        ) : (
          <UploadTrigger uploadPreset={uploadPreset} onSuccess={onSuccess} onClose={onClose} />
        )}
        {(previewSrc || value) && (
          <UploadTrigger
            uploadPreset={uploadPreset}
            onSuccess={onSuccess}
            onClose={onClose}
            compact
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
