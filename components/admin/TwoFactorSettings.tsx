'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SetupDetails {
  qrCodeDataUrl: string;
  secret: string;
}

async function readError(response: Response) {
  try {
    const data = await response.json();
    return data.error || 'Something went wrong.';
  } catch {
    return 'Something went wrong.';
  }
}

export default function TwoFactorSettings({
  initialEnabled,
}: {
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [setup, setSetup] = useState<SetupDetails | null>(null);
  const [setupPassword, setSetupPassword] = useState('');
  const [code, setCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [disableCode, setDisableCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const startSetup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: setupPassword }),
      });
      if (!response.ok) {
        setError(await readError(response));
        return;
      }

      setSetup(await response.json());
      setSetupPassword('');
    } catch {
      setError('Unable to start two-factor setup.');
    } finally {
      setLoading(false);
    }
  };

  const enableTwoFactor = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        setError(await readError(response));
        return;
      }

      const data = await response.json();
      setEnabled(true);
      setSetup(null);
      setCode('');
      setRecoveryCodes(data.recoveryCodes);
      setMessage('Two-factor authentication is now enabled.');
    } catch {
      setError('Unable to enable two-factor authentication.');
    } finally {
      setLoading(false);
    }
  };

  const disableTwoFactor = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/2fa', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, code: disableCode }),
      });
      if (!response.ok) {
        setError(await readError(response));
        return;
      }

      setEnabled(false);
      setPassword('');
      setDisableCode('');
      setRecoveryCodes([]);
      setMessage('Two-factor authentication has been disabled.');
    } catch {
      setError('Unable to disable two-factor authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-black text-[#1A2B56] font-sora tracking-tight mb-2">Security</h1>
        <p className="text-gray-500 font-medium">Protect the admin account with an authenticator app and one-time recovery codes.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-sm font-bold">
          {error}
        </div>
      )}

      {message && (
        <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-green-700 text-sm font-bold">
          {message}
        </div>
      )}

      {recoveryCodes.length > 0 && (
        <section className="bg-amber-50 border border-amber-200 rounded-[32px] p-8 space-y-5">
          <div>
            <h2 className="text-xl font-black text-amber-900">Save your recovery codes</h2>
            <p className="text-sm text-amber-800 mt-2">Each code works once. Store them somewhere secure; they will not be shown again.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recoveryCodes.map((recoveryCode) => (
              <code key={recoveryCode} className="bg-white border border-amber-200 rounded-xl px-4 py-3 text-center font-bold tracking-wider text-amber-950">
                {recoveryCode}
              </code>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setRecoveryCodes([])}
            className="text-sm font-bold text-amber-900 hover:underline"
          >
            I have saved these codes
          </button>
        </section>
      )}

      <section className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 md:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-[#1A2B56]">Authenticator app</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">Use Google Authenticator, Microsoft Authenticator, 1Password, or another TOTP-compatible app.</p>
          </div>
          <span className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest ${enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {!enabled && !setup && (
          <form onSubmit={startSetup} className="mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="setup-password" className="text-xs font-bold uppercase tracking-widest text-gray-400">Confirm current password</label>
              <input
                id="setup-password"
                type="password"
                autoComplete="current-password"
                required
                value={setupPassword}
                onChange={(event) => setSetupPassword(event.target.value)}
                placeholder="Current password"
                className="mt-2 w-full bg-gray-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21409A]/10 font-medium text-[#1A2B56]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-4 bg-[#21409A] text-white rounded-2xl font-bold text-sm disabled:opacity-50"
            >
              {loading ? 'Preparing setup...' : 'Set up authenticator app'}
            </button>
          </form>
        )}

        {!enabled && setup && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">
            <div className="bg-white border border-gray-200 rounded-3xl p-3">
              <Image
                src={setup.qrCodeDataUrl}
                alt="QR code for authenticator app setup"
                width={240}
                height={240}
                unoptimized
                className="w-full h-auto"
              />
            </div>
            <form onSubmit={enableTwoFactor} className="space-y-5">
              <div>
                <h3 className="font-black text-[#1A2B56]">1. Scan the QR code</h3>
                <p className="text-sm text-gray-500 mt-2">If scanning does not work, enter this setup key manually:</p>
                <code className="mt-3 block break-all rounded-xl bg-gray-50 p-4 text-sm font-bold text-[#1A2B56]">{setup.secret}</code>
              </div>
              <div>
                <label htmlFor="setup-code" className="text-xs font-bold uppercase tracking-widest text-gray-400">2. Confirm the six-digit code</label>
                <input
                  id="setup-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="mt-2 w-full bg-gray-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#21409A]/10 font-bold tracking-[0.25em] text-[#1A2B56]"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-4 bg-[#21409A] text-white rounded-2xl font-bold text-sm disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Enable two-factor authentication'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSetup(null);
                    setCode('');
                    setError('');
                  }}
                  className="px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {enabled && (
          <form onSubmit={disableTwoFactor} className="mt-8 border-t border-gray-100 pt-8 space-y-5">
            <div>
              <h3 className="font-black text-[#1A2B56]">Disable two-factor authentication</h3>
              <p className="text-sm text-gray-500 mt-2">Confirm your password and enter an authenticator or recovery code.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Current password"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-red-500/10 font-medium text-[#1A2B56]"
              />
              <input
                type="text"
                autoComplete="one-time-code"
                required
                value={disableCode}
                onChange={(event) => setDisableCode(event.target.value.toUpperCase())}
                placeholder="Authenticator or recovery code"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-red-500/10 font-bold text-[#1A2B56]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-100 disabled:opacity-50"
            >
              {loading ? 'Disabling...' : 'Disable two-factor authentication'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
