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
    <div className="bg-[#DDE5F0] p-10 rounded-[24px] shadow-sm">
      <h5 className="text-xl font-bold font-iic mb-3 text-[#1a1a1a] tracking-tight">Stay Informed</h5>
      <p className="text-gray-600 text-[14px] mb-8 leading-relaxed font-medium">
        Get the latest news and event updates delivered directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          disabled={status === 'loading'}
          className="w-full bg-white border border-transparent rounded-lg py-4 px-5 outline-none focus:border-[#21409A]/40 focus:ring-2 focus:ring-[#21409A]/15 transition-all text-sm text-[#21409A] font-medium placeholder:text-gray-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-[#21409A] text-white font-bold rounded-lg text-sm hover:shadow-xl hover:bg-[#21409A] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Subscribing…</span>
            </>
          ) : (
            'Subscribe Newsletter'
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
            className={`mt-4 px-4 py-3 rounded-lg text-[12px] font-bold ${
              status === 'success'
                ? 'bg-[#74C044]/15 text-[#21409A]'
                : 'bg-[#ED1C24]/10 text-[#ED1C24]'
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
