'use client';

import React, { useState } from 'react';

type ApplyMode = 'replace' | 'append';

interface JsonArrayInputProps<T> {
  fieldName: string;
  label?: string;
  currentCount?: number;
  example: string;
  transformItems: (items: unknown[]) => T[];
  onApply: (items: T[], mode: ApplyMode) => void;
}

const quoteObjectKeys = (value: string) => (
  value
    .replace(/([{,]\s*)([A-Za-z_$][\w$-]*)\s*:/g, '$1"$2":')
    .replace(/,\s*([}\]])/g, '$1')
);

const parseJsonLike = (value: string, fieldName: string): unknown[] => {
  const trimmed = value.trim().replace(/^\uFEFF/, '').replace(/;\s*$/, '');

  if (!trimmed) throw new Error('Paste JSON or choose a JSON file first.');

  const fieldPattern = new RegExp(`^\\s*${fieldName}\\s*:`);
  const candidate = fieldPattern.test(trimmed)
    ? trimmed.replace(fieldPattern, '').trim().replace(/;\s*$/, '')
    : trimmed;

  const parse = (source: string) => JSON.parse(source) as unknown;
  let parsed: unknown;

  try {
    parsed = parse(candidate);
  } catch {
    parsed = parse(quoteObjectKeys(candidate));
  }

  if (Array.isArray(parsed)) return parsed;

  if (parsed && typeof parsed === 'object') {
    const record = parsed as Record<string, unknown>;
    const fieldValue = record[fieldName];

    if (Array.isArray(fieldValue)) return fieldValue;

    const arrayValues = Object.values(record).filter(Array.isArray);
    if (arrayValues.length === 1) return arrayValues[0] as unknown[];
  }

  throw new Error(`Expected an array or an object containing "${fieldName}".`);
};

export default function JsonArrayInput<T>({
  fieldName,
  label = 'Bulk JSON Import',
  currentCount = 0,
  example,
  transformItems,
  onApply,
}: JsonArrayInputProps<T>) {
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const applyJson = (mode: ApplyMode) => {
    try {
      const parsedItems = parseJsonLike(rawValue, fieldName);
      const nextItems = transformItems(parsedItems);

      onApply(nextItems, mode);
      setError('');
      setStatus(`${mode === 'replace' ? 'Replaced' : 'Appended'} ${nextItems.length} item${nextItems.length === 1 ? '' : 's'}.`);
    } catch (err) {
      setStatus('');
      setError(err instanceof Error ? err.message : 'Could not parse JSON.');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setRawValue(await file.text());
      setError('');
      setStatus(`Loaded ${file.name}. Review it, then replace or append.`);
    } catch {
      setStatus('');
      setError('Could not read that file.');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="rounded-[28px] border border-[#21409A]/10 bg-[#21409A]/[0.03] p-6 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-sm font-black text-[#1A2B56]">{label}</h4>
          <p className="mt-1 text-xs font-semibold text-gray-500">
            Paste an array, paste <span className="font-mono">{fieldName}: [...]</span>, or upload a JSON file. Current items: {currentCount}.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#21409A]/20 bg-white px-4 py-2 text-xs font-black tracking-widest text-[#21409A] transition-colors hover:bg-[#21409A] hover:text-white">
          Choose JSON File
          <input type="file" accept=".json,.txt,application/json,text/plain" onChange={handleFileChange} className="sr-only" />
        </label>
      </div>

      <textarea
        rows={8}
        value={rawValue}
        onChange={(event) => {
          setRawValue(event.target.value);
          setError('');
          setStatus('');
        }}
        className="block min-h-[320px] w-full resize-y rounded-2xl border-2 border-[#d9e2f3] bg-white p-5 font-mono text-sm font-semibold leading-7 text-[#0f172a] outline-none transition-all placeholder:text-slate-400 focus:border-[#21409A] focus:ring-4 focus:ring-[#21409A]/10"
        spellCheck={false}
        placeholder={example}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => applyJson('replace')}
          className="rounded-full bg-[#21409A] px-5 py-2.5 text-xs font-black tracking-widest text-white transition-opacity hover:opacity-90"
        >
          Replace Current
        </button>
        <button
          type="button"
          onClick={() => applyJson('append')}
          className="rounded-full border border-[#21409A]/20 bg-white px-5 py-2.5 text-xs font-black tracking-widest text-[#21409A] transition-colors hover:bg-[#21409A] hover:text-white"
        >
          Append
        </button>
        {status && <span className="text-xs font-bold text-[#3F7F1F]">{status}</span>}
        {error && <span className="text-xs font-bold text-red-500">{error}</span>}
      </div>
    </div>
  );
}
