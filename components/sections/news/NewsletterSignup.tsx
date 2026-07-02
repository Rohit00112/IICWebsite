'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'idle' | 'loading' | 'success' | 'error';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'news-sidebar' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Subscription failed.');
        return;
      }
      setStatus('success');
      setMessage(data.message || 'Subscribed!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-slate-50 px-8 py-12 text-center md:px-16">
      <h5 className="mb-3 font-iic text-2xl font-bold tracking-tight text-[#1a1a1a]">Stay Informed</h5>
      <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-slate-500">
        Get the latest news and event updates delivered directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row" noValidate>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          disabled={status === 'loading'}
          className="flex-1 rounded-full border border-gray-200 bg-white px-5 py-3.5 text-sm text-[#1a1a1a] outline-none transition-all placeholder:text-slate-400 focus:border-[#21409A] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-2 rounded-full bg-[#21409A] px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Subscribing…</span>
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>

      <AnimatePresence>
        {status !== 'idle' && status !== 'loading' && message && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="status"
            className={`mx-auto mt-4 max-w-lg rounded-full px-4 py-3 text-[12px] font-bold ${
              status === 'success' ? 'bg-[#74C044]/15 text-[#21409A]' : 'bg-[#ED1C24]/10 text-[#ED1C24]'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsletterSignup;
