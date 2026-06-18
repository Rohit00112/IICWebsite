'use client';

import React from 'react';
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

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  label = "Upload Image"
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const previewSrc = toSafeImageSrc(value);

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

      <div className="flex items-center gap-4">
        {previewSrc ? (
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-[#eef2f6]">
            <Image
              fill
              src={previewSrc}
              alt="Uploaded image"
              className="object-cover"
            />
          </div>
        ) : (
          <CldUploadWidget onSuccess={onSuccess} onClose={onClose} uploadPreset={uploadPreset}>
            {({ open }) => {
              const onClick = () => {
                open();
              };

              return (
                <button
                  type="button"
                  onClick={onClick}
                  className="w-full aspect-video md:w-40 md:h-40 bg-[#f8fafc] border-2 border-dashed border-[#eef2f6] rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#21409A] hover:text-[#21409A] transition-all group"
                >
                  <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[10px] font-bold tracking-widest">Select File</span>
                </button>
              );
            }}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
