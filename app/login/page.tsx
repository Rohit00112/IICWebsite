'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginStep = 'credentials' | 'two-factor';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<LoginStep>('credentials');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint =
        step === 'credentials' ? '/api/auth/login' : '/api/auth/2fa/verify';
      const body =
        step === 'credentials' ? { email, password } : { code };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.requiresTwoFactor) {
          setStep('two-factor');
          setPassword('');
          return;
        }

        router.push('/admin/news');
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#21409A] rounded-[24px] shadow-2xl mb-8">
            <span className="text-white font-black text-2xl tracking-tighter">IIC</span>
          </div>
          <h1 className="text-4xl font-black text-[#1A2B56] font-sora tracking-tight mb-3">
            {step === 'credentials' ? 'Welcome back' : 'Verify your identity'}
          </h1>
          <p className="text-gray-500 font-medium">
            {step === 'credentials'
              ? 'Enter your details to manage the platform.'
              : 'Enter the code from your authenticator app or a recovery code.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 'credentials' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-widest text-gray-400 ml-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@iic.edu.np"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21409A]/10 transition-all font-medium text-[#1A2B56]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-bold tracking-widest text-gray-400 ml-1">Password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21409A]/10 transition-all font-medium text-[#1A2B56]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="two-factor-code" className="text-xs font-bold tracking-widest text-gray-400 ml-1">Verification Code</label>
              <input
                id="two-factor-code"
                type="text"
                inputMode="text"
                autoComplete="one-time-code"
                required
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="123456 or XXXX-XXXX-XXXX"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21409A]/10 transition-all font-bold tracking-[0.2em] text-center text-[#1A2B56]"
              />
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600 text-sm font-bold">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#21409A] text-white rounded-2xl font-bold text-sm shadow-2xl shadow-[#21409A]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading
              ? 'Authenticating...'
              : step === 'credentials'
                ? 'Continue'
                : 'Verify and Sign In'}
          </button>

          {step === 'two-factor' && (
            <button
              type="button"
              onClick={() => {
                setStep('credentials');
                setCode('');
                setError('');
              }}
              className="w-full text-sm font-bold text-gray-400 hover:text-[#21409A]"
            >
              Back to email and password
            </button>
          )}
        </form>

        <div className="text-center pt-8">
          <p className="text-xs font-bold text-gray-300 tracking-widest">&copy; 2026 Itahari International College</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
