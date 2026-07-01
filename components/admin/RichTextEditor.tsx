'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-50 animate-pulse rounded-xl border-2 border-gray-100 flex items-center justify-center text-gray-400 font-bold">
      Loading Visual Editor...
    </div>
  ),
});

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean'],
    ],
  }), []);

  const formats = useMemo(() => [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'link'
  ], []);

  return (
    <div className="rich-text-editor-container">
      <style jsx global>{`
        .rich-text-editor-container .ql-container {
          min-height: 400px;
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          border-bottom-left-radius: 24px;
          border-bottom-right-radius: 24px;
          border: 2px solid #eef2f6 !important;
          border-top: none !important;
          background: white;
        }
        .rich-text-editor-container .ql-toolbar {
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          border: 2px solid #eef2f6 !important;
          background: #f8fafc;
          padding: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .rich-text-editor-container .ql-editor {
          min-height: 400px;
          color: #1e293b;
          line-height: 1.6;
          padding: 24px;
        }
        .rich-text-editor-container .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
          left: 24px;
        }
        /* Fix for Quill icons appearing as text or being hidden */
        .rich-text-editor-container .ql-snow .ql-stroke {
          stroke: #475569;
          stroke-width: 2px;
        }
        .rich-text-editor-container .ql-snow .ql-fill {
          fill: #475569;
        }
        .rich-text-editor-container .ql-snow .ql-picker {
          color: #475569;
          font-weight: 700;
        }
        .rich-text-editor-container .ql-snow.ql-toolbar button:hover .ql-stroke,
        .rich-text-editor-container .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #21409A;
        }
        .rich-text-editor-container .ql-snow.ql-toolbar button:hover .ql-fill,
        .rich-text-editor-container .ql-snow.ql-toolbar button.ql-active .ql-fill {
          fill: #21409A;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
