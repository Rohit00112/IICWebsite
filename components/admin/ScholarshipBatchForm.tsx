'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import JsonArrayInput from './JsonArrayInput';
import type { ScholarshipAwardType, ScholarshipBatch, ScholarshipRecipient, ScholarshipStatus } from '@/lib/scholarships';

type ScholarshipFormData = {
  year: number;
  awardType: ScholarshipAwardType;
  title: string;
  summary: string;
  groupImage: string;
  status: ScholarshipStatus;
  recipients: ScholarshipRecipient[];
};

const currentYear = new Date().getFullYear();
const PROGRAMME_OPTIONS = [
  'BSc (Hons) Computing',
  'BA (Hons) Business Administration',
  'BBA (Hons) Business Administration',
  'MBA',
];

const defaultFormData: ScholarshipFormData = {
  year: currentYear,
  awardType: 'aaa',
  title: `AAA Scholarship ${currentYear}`,
  summary: '',
  groupImage: '',
  status: 'draft',
  recipients: [],
};

const RECIPIENT_JSON_EXAMPLE = `[
  {
    "name": "Sujan Subedi",
    "programme": "BSc (Hons) Computing",
    "image": "https://example.com/sujan.jpg",
    "quote": "Optional recipient quote"
  },
  {
    "name": "Rohit Sharma",
    "programme": "BA (Hons) Business Administration",
    "image": "https://example.com/rohit.jpg"
  }
]`;

function recipientsFromJson(items: unknown[]): ScholarshipRecipient[] {
  return items.map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error(`Recipient ${index + 1} must be an object.`);
    }

    const recipient = item as Record<string, unknown>;
    const name = typeof recipient.name === 'string' ? recipient.name.trim() : '';
    if (name.length < 2) {
      throw new Error(`Recipient ${index + 1} needs a name with at least 2 characters.`);
    }

    const programme = typeof recipient.programme === 'string' ? recipient.programme.trim() : '';
    const image = typeof recipient.image === 'string' ? recipient.image.trim() : '';
    const quote = typeof recipient.quote === 'string' ? recipient.quote.trim() : '';

    return { name, programme, image, quote, sortOrder: index };
  });
}

export default function ScholarshipBatchForm({ batch }: { batch?: ScholarshipBatch }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ScholarshipFormData>(batch ? {
    year: batch.year,
    awardType: batch.awardType,
    title: batch.title,
    summary: batch.summary || '',
    groupImage: batch.groupImage || '',
    status: batch.status,
    recipients: batch.recipients || [],
  } : defaultFormData);

  const isEditing = Boolean(batch);
  const isIngPostgraduate = formData.awardType === 'ing_postgraduate';
  const canAddRecipient = !isIngPostgraduate || formData.recipients.length === 0;

  const updateAwardType = (awardType: ScholarshipAwardType) => {
    setFormData({
      ...formData,
      awardType,
      recipients: awardType === 'ing_postgraduate'
        ? formData.recipients.slice(0, 1).map((recipient, sortOrder) => ({ ...recipient, sortOrder }))
        : formData.recipients,
    });
  };

  const updateRecipient = (index: number, patch: Partial<ScholarshipRecipient>) => {
    const nextRecipients = [...formData.recipients];
    nextRecipients[index] = { ...nextRecipients[index], ...patch };
    setFormData({ ...formData, recipients: nextRecipients });
  };

  const addRecipient = () => {
    if (!canAddRecipient) return;

    setFormData({
      ...formData,
      recipients: [
        ...formData.recipients,
        {
          name: '',
          programme: '',
          image: '',
          quote: '',
          sortOrder: formData.recipients.length,
        },
      ],
    });
  };

  const removeRecipient = (index: number) => {
    setFormData({
      ...formData,
      recipients: formData.recipients.filter((_, i) => i !== index).map((recipient, sortOrder) => ({ ...recipient, sortOrder })),
    });
  };

  const moveRecipient = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= formData.recipients.length) return;
    const nextRecipients = [...formData.recipients];
    const [item] = nextRecipients.splice(index, 1);
    nextRecipients.splice(target, 0, item);
    setFormData({
      ...formData,
      recipients: nextRecipients.map((recipient, sortOrder) => ({ ...recipient, sortOrder })),
    });
  };

  const applyRecipientJson = (items: ScholarshipRecipient[], mode: 'replace' | 'append') => {
    const recipients = mode === 'replace' ? items : [...formData.recipients, ...items];

    if (isIngPostgraduate && recipients.length > 1) {
      alert('ING Postgraduate Scholarship can have only one recipient per year.');
      return;
    }

    setFormData({
      ...formData,
      recipients: recipients.map((recipient, sortOrder) => ({ ...recipient, sortOrder })),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      recipients: formData.recipients.map((recipient, sortOrder) => ({
        ...recipient,
        sortOrder,
      })),
    };

    try {
      const res = await fetch(isEditing ? `/api/scholarships/${batch?.id}` : '/api/scholarships', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/scholarships');
        router.refresh();
      } else {
        const body = await res.json().catch(() => null);
        if (body?.details?.length) {
          const lines = body.details.map((d: { path: (string | number)[]; message: string }) => `- ${d.path.join('.')}: ${d.message}`).join('\n');
          alert(`Validation failed:\n${lines}`);
        } else {
          alert(body?.error || 'Failed to save scholarship batch');
        }
      }
    } catch (error) {
      console.error('Error saving scholarship batch:', error);
      alert('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] pb-20">
      <div className="mb-12 flex items-end justify-between border-b border-gray-100 pb-10">
        <div>
          <h1 className="mb-3 font-sora text-5xl font-black tracking-tight text-[#1A2B56]">
            {isEditing ? 'Edit Scholarship Batch' : 'Create Scholarship Batch'}
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Manage a yearwise recipient list, photos, and publication status.
          </p>
        </div>
        <div className="mb-2 flex items-center gap-8">
          <Link href="/admin/scholarships" className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#21409A]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Scholarships
          </Link>
          <button
            type="submit"
            form="scholarship-batch-form"
            disabled={loading}
            className="flex items-center gap-3 rounded-[20px] bg-[#21409A] px-12 py-5 text-sm font-bold text-white shadow-2xl shadow-[#21409A]/30 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Batch'}
          </button>
        </div>
      </div>

      <form id="scholarship-batch-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-3">
          <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-black tracking-[0.18em] text-gray-400">Publication</p>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ScholarshipStatus })}
              className="form-input-admin mt-4"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <p className="mt-4 text-xs font-medium leading-relaxed text-gray-500">
              Only published batches appear on the public scholarship page.
            </p>
          </div>
          <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-black tracking-[0.18em] text-gray-400">Recipients</p>
            <p className="mt-3 text-4xl font-black text-[#1A2B56]">{formData.recipients.length}</p>
            <p className="mt-3 text-xs font-medium leading-relaxed text-gray-500">
              {isIngPostgraduate ? 'ING Postgraduate supports one scholar per year.' : 'AAA can include many recipients in one year.'}
            </p>
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-9">
          <section className="rounded-[40px] border border-gray-100 bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#1A2B56]">Batch Details</h2>
              <p className="mt-2 text-sm font-medium text-gray-500">This content identifies the year and award type on the public archive.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <label className="text-[10px] font-bold tracking-widest text-gray-700">Year</label>
                <input
                  type="number"
                  min="2000"
                  max="2100"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="form-input-admin"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold tracking-widest text-gray-700">Award Type</label>
                <select
                  value={formData.awardType}
                  onChange={(e) => updateAwardType(e.target.value as ScholarshipAwardType)}
                  className="form-input-admin"
                >
                  <option value="aaa">AAA Scholarship</option>
                  <option value="ing_postgraduate">ING Postgraduate Scholarship</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold tracking-widest text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ScholarshipStatus })}
                  className="form-input-admin"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <label className="text-[10px] font-bold tracking-widest text-gray-700">Batch Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input-admin"
                placeholder="AAA Scholarship 2026"
                required
              />
            </div>

            <div className="mt-8 space-y-3">
              <label className="text-[10px] font-bold tracking-widest text-gray-700">Summary</label>
              <textarea
                rows={4}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="form-input-admin resize-none"
                placeholder="Short public summary for this scholarship batch..."
              />
            </div>

            <div className="mt-8">
              <ImageUpload
                label="Group Image"
                value={formData.groupImage}
                onChange={(url) => setFormData({ ...formData, groupImage: url })}
                onRemove={() => setFormData({ ...formData, groupImage: '' })}
              />
            </div>
          </section>

          <section className="rounded-[40px] border border-gray-100 bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#1A2B56]">Recipients</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {isIngPostgraduate
                    ? 'ING Postgraduate batches are limited to one annual scholar.'
                    : 'Add AAA recipients in display order. Reorder controls keep this simple.'}
                </p>
              </div>
              <button
                type="button"
                onClick={addRecipient}
                disabled={!canAddRecipient}
                className="rounded-2xl bg-[#21409A] px-5 py-3 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                Add Recipient
              </button>
            </div>

            <div className="space-y-6">
              <details className="group border-b border-gray-100 pb-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-[#21409A] [&::-webkit-details-marker]:hidden">
                  Import recipients from JSON
                  <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9 6 6 6-6" /></svg>
                </summary>
                <div className="pt-5">
                  <JsonArrayInput
                    fieldName="recipients"
                    label="Recipient JSON"
                    currentCount={formData.recipients.length}
                    example={RECIPIENT_JSON_EXAMPLE}
                    transformItems={recipientsFromJson}
                    onApply={applyRecipientJson}
                  />
                </div>
              </details>

              {formData.recipients.map((recipient, index) => (
                <div key={`recipient-${index}`} className="rounded-[28px] border border-gray-100 bg-[#f8fafc] p-6">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p className="text-sm font-black text-[#1A2B56]">Recipient {index + 1}</p>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => moveRecipient(index, -1)} disabled={index === 0} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-gray-500 disabled:opacity-40">Up</button>
                      <button type="button" onClick={() => moveRecipient(index, 1)} disabled={index === formData.recipients.length - 1} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-gray-500 disabled:opacity-40">Down</button>
                      <button type="button" onClick={() => removeRecipient(index)} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-500">Remove</button>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-widest text-gray-700">Name</label>
                      <input
                        type="text"
                        value={recipient.name}
                        onChange={(e) => updateRecipient(index, { name: e.target.value })}
                        className="form-input-admin"
                        placeholder="Recipient name"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold tracking-widest text-gray-700">Programme</label>
                      <select
                        value={recipient.programme || ''}
                        onChange={(e) => updateRecipient(index, { programme: e.target.value })}
                        className="form-input-admin"
                        required
                      >
                        <option value="" disabled>Select a programme</option>
                        {[
                          ...(recipient.programme && !PROGRAMME_OPTIONS.includes(recipient.programme) ? [recipient.programme] : []),
                          ...PROGRAMME_OPTIONS,
                        ].map((programme) => (
                          <option key={programme} value={programme}>{programme}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-700">Quote</label>
                      <input
                        type="text"
                        value={recipient.quote || ''}
                        onChange={(e) => updateRecipient(index, { quote: e.target.value })}
                        className="form-input-admin"
                        placeholder="Optional recipient quote"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <ImageUpload
                      label="Recipient Image"
                      value={recipient.image || ''}
                      onChange={(url) => updateRecipient(index, { image: url })}
                      onRemove={() => updateRecipient(index, { image: '' })}
                    />
                  </div>
                </div>
              ))}

              {formData.recipients.length === 0 && (
                <div className="rounded-[28px] border border-dashed border-gray-200 bg-[#f8fafc] p-10 text-center">
                  <p className="text-sm font-bold text-gray-500">No recipients added yet.</p>
                  <button type="button" onClick={addRecipient} className="mt-4 text-sm font-black text-[#21409A]">
                    {isIngPostgraduate ? 'Add the ING scholar' : 'Add the first recipient'}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </form>

      <style jsx>{`
        .form-input-admin {
          width: 100%;
          background: #f8fafc;
          border: 2px solid #eef2f6;
          border-radius: 20px;
          padding: 1.1rem 1.35rem;
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
