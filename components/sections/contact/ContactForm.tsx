'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';
import Link from 'next/link';
import AnimeReveal from '../../effects/AnimeReveal';

const REASONS = [
  { value: 'admissions', label: 'Admissions Inquiry', programmes: true },
  { value: 'scholarship', label: 'Scholarship Information', programmes: false },
  { value: 'general', label: 'General Support', programmes: false },
  { value: 'partnership', label: 'Business Partnership', programmes: false },
  { value: 'visit', label: 'Schedule a College Visit', programmes: false },
];

const PROGRAMMES = [
  'BIT',
  'BA',
  'Not sure yet',
];

const CONTACT_CHANNELS = [
  {
    name: 'Admissions WhatsApp',
    description: 'Need immediate answers? Chat with our admissions counsellors instantly.',
    href: 'https://wa.me/9779801003030',
    action: 'Chat with Admissions',
    cardClass: 'bg-[#25D366]/5 border-[#25D366]/20',
    iconClass: 'bg-[#25D366]',
    actionClass: 'text-[#25D366]',
    filled: true,
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412',
  },
  {
    name: 'Contact on Facebook',
    description: 'Ask admissions questions and get college updates.',
    href: 'https://www.facebook.com/IICNepal/',
    action: 'Message on Facebook',
    cardClass: 'bg-[#1877F2]/5 border-[#1877F2]/20',
    iconClass: 'bg-[#1877F2]',
    actionClass: 'text-[#1877F2]',
    filled: false,
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    name: 'Contact on Instagram',
    description: 'DM us on Instagram for quick questions and college updates.',
    href: 'https://www.instagram.com/iic.nepal/',
    action: 'Message on Instagram',
    cardClass: 'bg-[#E1306C]/5 border-[#E1306C]/20',
    iconClass: 'bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)]',
    actionClass: 'text-[#E1306C]',
    filled: false,
    path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z',
  },
];

const COUNTRIES = [
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  { code: 'BT', name: 'Bhutan', dial: '+975', flag: '🇧🇹' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
];

const MESSAGE_MAX = 600;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'reason' | 'programme' | 'message';
type FormErrors = Partial<Record<FieldKey, string>>;

const getFormValue = (formData: FormData, key: FieldKey) => (
  String(formData.get(key) || '').trim()
);

const getDigits = (value: string) => value.replace(/\D/g, '');

const normalizePhoneNumber = (dial: string, value: string) => {
  const phoneDigits = getDigits(value);
  if (!phoneDigits) return '';
  if (dial === '+977') return phoneDigits;

  const dialDigits = getDigits(dial);
  return phoneDigits.startsWith(dialDigits) ? phoneDigits : `${dialDigits}${phoneDigits}`;
};

const getReasonLabel = (value: string) => (
  REASONS.find(reason => reason.value === value)?.label || 'General Inquiry'
);

const FieldError = ({ id, message }: { id: string; message?: string }) => {
  if (!message) return null;

  return (
    <p id={id} className="text-xs font-bold text-[#ED1C24]">
      {message}
    </p>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [reason, setReason] = useState('');
  const [programme, setProgramme] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState('');
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countryOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [countryOpen]);

  const filteredCountries = COUNTRIES.filter(c => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q);
  });

  const showProgramme = REASONS.find(r => r.value === reason)?.programmes;

  const clearError = (field: FieldKey) => {
    setErrors((state) => {
      if (!state[field]) return state;
      const next = { ...state };
      delete next[field];
      return next;
    });
  };

  const focusFirstError = (form: HTMLFormElement, nextErrors: FormErrors) => {
    const firstField = (Object.keys(nextErrors) as FieldKey[])[0];

    if (!firstField) return;

    window.requestAnimationFrame(() => {
      const target = firstField === 'programme'
        ? form.querySelector<HTMLElement>('[data-programme-choice]')
        : form.elements.namedItem(firstField);

      if (target instanceof HTMLElement) target.focus();
    });
  };

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const nextErrors: FormErrors = {};
    const firstName = getFormValue(formData, 'firstName');
    const lastName = getFormValue(formData, 'lastName');
    const email = getFormValue(formData, 'email');
    const phone = getFormValue(formData, 'phone');
    const address = getFormValue(formData, 'address');
    const selectedReason = reason.trim();
    const selectedProgramme = programme.trim();
    const trimmedMessage = message.trim();

    if (!firstName) nextErrors.firstName = 'Please enter your first name.';
    if (!lastName) nextErrors.lastName = 'Please enter your last name.';
    if (!email) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!phone) {
      nextErrors.phone = 'Please enter your phone number.';
    } else {
      const digits = getDigits(phone);
      if (digits.length < 7 || digits.length > 15) {
        nextErrors.phone = 'Please enter a valid phone number.';
      }
    }

    if (!address) {
      nextErrors.address = 'Please enter your address.';
    } else if (address.length < 4) {
      nextErrors.address = 'Please enter a complete address.';
    }

    if (!selectedReason) nextErrors.reason = 'Please select a reason for contact.';
    if (showProgramme && !selectedProgramme) nextErrors.programme = 'Please select a programme of interest.';
    if (!trimmedMessage) {
      nextErrors.message = 'Please enter your message.';
    } else if (trimmedMessage.length < 10) {
      nextErrors.message = 'Please enter at least 10 characters.';
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const nextErrors = validateForm(form);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(form, nextErrors);
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);
    const formData = new FormData(form);
    const firstName = getFormValue(formData, 'firstName');
    const lastName = getFormValue(formData, 'lastName');
    const email = getFormValue(formData, 'email');
    const phone = getFormValue(formData, 'phone');
    const address = getFormValue(formData, 'address');
    const selectedReason = reason.trim();
    const selectedProgramme = programme.trim();
    const course = showProgramme && selectedProgramme
      ? selectedProgramme
      : getReasonLabel(selectedReason);

    try {
      const response = await fetch('/api/clms-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone_number: normalizePhoneNumber(country.dial, phone),
          address,
          course,
          type: 'contact',
          message: message.trim(),
        }),
      });
      const responseBody = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(responseBody?.error || 'Could not send your message right now.');
      }

      setIsSuccess(true);
      setReason('');
      setProgramme('');
      setMessage('');
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = "w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:border-[#21409A] focus:ring-2 focus:ring-[#21409A]/15 outline-none transition-all placeholder:text-gray-400 font-medium text-sm text-[#1a1a1a]";
  const getFieldClass = (field: FieldKey, extraClass = '') => `${fieldClass} ${errors[field] ? 'border-[#ED1C24] focus:border-[#ED1C24] focus:ring-[#ED1C24]/15' : ''} ${extraClass}`;
  const labelClass = "flex items-center gap-1 text-[13px] font-bold text-[#1a1a1a]";
  const requiredMark = <span aria-hidden className="text-[#ED1C24]">*</span>;

  return (
    <section className="py-16 md:py-20 bg-[#f3f6fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Directory */}
          <div className="lg:col-span-5">
            <h2 className="text-[32px] font-bold text-[#1a1a1a] mb-3 font-iic tracking-tight md:hidden">
              Contact Directory
            </h2>
            <div className="hidden md:block">
              <AnimeReveal
                as="h2"
                text="Contact Directory"
                className="text-[40px] font-bold text-[#1a1a1a] mb-3 font-iic tracking-tight"
                staggerFrom="first"
              />
            </div>
            <p className="text-gray-500 mb-8 font-medium text-sm md:text-base">Reach out directly to the department that best suits your needs.</p>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_CHANNELS.map((channel, index) => {
                  const isPrimary = index === 0;

                  return (
                    <div
                      key={channel.name}
                      className={`${channel.cardClass} ${isPrimary ? 'sm:col-span-2 p-6' : 'p-5'} h-full rounded-[24px] border group transition-all`}
                    >
                      <div className={`flex h-full ${isPrimary ? 'items-start gap-5' : 'flex-col gap-4'}`}>
                        <div className={`${isPrimary ? 'w-12 h-12' : 'w-11 h-11'} ${channel.iconClass} rounded-xl flex items-center justify-center text-white shrink-0`}>
                          <svg
                            className={isPrimary ? 'w-6 h-6' : 'w-5 h-5'}
                            fill={channel.filled ? 'currentColor' : 'none'}
                            stroke={channel.filled ? 'none' : 'currentColor'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path d={channel.path} />
                          </svg>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className={`${isPrimary ? 'text-xl' : 'text-base'} font-bold text-[#1a1a1a] mb-2 font-iic leading-tight`}>{channel.name}</h3>
                          <p className={`${isPrimary ? 'text-sm' : 'text-xs line-clamp-2'} text-gray-400 mb-4 leading-relaxed font-medium`}>{channel.description}</p>
                          <a
                            href={channel.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${channel.actionClass} mt-auto font-bold text-xs tracking-wider flex items-center gap-2 hover:gap-3 transition-all`}
                          >
                            {channel.action} <span>→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* General Enquiries */}
              <div
                className="bg-white p-6 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 group hover:border-[#21409A]/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#21409A]/5 rounded-xl flex items-center justify-center text-[#21409A] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 font-iic">General Enquiries</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed font-medium">For general college information, student services, and administrative support.</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        info@iic.edu.np
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        +977-9801003030
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div
                className="bg-[#21409A]/5 p-6 rounded-[24px] border border-[#21409A]/10"
              >
                <div className="flex items-center gap-3 mb-5">
                  <svg className="w-5 h-5 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h3 className="text-lg font-bold text-[#1a1a1a] font-iic">Office Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-[13px] md:text-sm font-bold">
                    <span className="text-gray-400">Sunday - Saturday</span>
                    <span className="text-[#1a1a1a]">7:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send us a Message */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-14 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-white h-full relative overflow-hidden"
            >
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-20 h-20 bg-[#21409A]/5 rounded-full flex items-center justify-center text-[#21409A] mb-8">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4 font-iic">Message Received!</h2>
                    <p className="text-gray-500 font-medium max-w-sm mb-10">
                      Thank you for reaching out. Our team has been notified and will contact you within 15 minutes.
                    </p>
                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                        setErrors({});
                        setSubmitError('');
                      }}
                      className="px-8 py-3 bg-[#21409A] text-white font-bold rounded-xl"
                    >
                      Send Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-8 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#74C044]/10 border border-[#74C044]/20 rounded-full mb-6 self-start">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full bg-[#74C044] rounded-full opacity-75 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 bg-[#74C044] rounded-full" />
                  </span>
                  <span className="text-[11px] font-bold tracking-wider text-[#21409A]">Avg. reply in 15 minutes</span>
                </div>

                <h2 className="text-3xl font-bold text-[#1a1a1a] font-iic tracking-tight md:hidden">
                  Send us a Message
                </h2>
                <div className="hidden md:block">
                  <AnimeReveal
                    as="h2"
                    text="Send us a Message"
                    className="text-[34px] font-bold text-[#1a1a1a] font-iic tracking-tight"
                    staggerFrom="first"
                  />
                </div>
                <p className="text-gray-500 text-sm mt-3 font-medium leading-relaxed max-w-md">
                  Tell us a little about you. Fields marked <span className="text-[#ED1C24] font-bold">*</span> are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {(Object.keys(errors).length > 0 || submitError) && (
                  <div role="alert" className="rounded-2xl border border-[#ED1C24]/20 bg-[#ED1C24]/5 px-4 py-3 text-sm font-bold text-[#B91C1C]">
                    {submitError || 'Please fix the highlighted fields before sending.'}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className={labelClass}>First Name {requiredMark}</label>
                    <input
                      id="firstName"
                      name="firstName"
                      required
                      type="text"
                      autoComplete="given-name"
                      placeholder="e.g. Aarav"
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      onChange={() => clearError('firstName')}
                      className={getFieldClass('firstName')}
                    />
                    <FieldError id="firstName-error" message={errors.firstName} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className={labelClass}>Last Name {requiredMark}</label>
                    <input
                      id="lastName"
                      name="lastName"
                      required
                      type="text"
                      autoComplete="family-name"
                      placeholder="e.g. Sharma"
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      onChange={() => clearError('lastName')}
                      className={getFieldClass('lastName')}
                    />
                    <FieldError id="lastName-error" message={errors.lastName} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className={labelClass}>Email Address {requiredMark}</label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        id="email"
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        onChange={() => clearError('email')}
                        className={getFieldClass('email', 'pl-11')}
                      />
                    </div>
                    <FieldError id="email-error" message={errors.email} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className={labelClass}>Phone Number {requiredMark}</label>
                    <div ref={countryRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setCountryOpen(v => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={countryOpen}
                        aria-label={`Country code: ${country.name} ${country.dial}`}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 pl-2 pr-2 py-1.5 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-base leading-none" aria-hidden>{country.flag}</span>
                        <span className="text-sm font-bold text-gray-700">{country.dial}</span>
                        <svg className={`w-3 h-3 text-gray-400 transition-transform ${countryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <span className="absolute left-[112px] top-1/2 -translate-y-1/2 h-6 w-px bg-gray-200 z-10 pointer-events-none" aria-hidden />
                      <input
                        id="phone"
                        name="phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder="98XXXXXXXX"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        onChange={() => clearError('phone')}
                        className={getFieldClass('phone', 'pl-[128px] relative')}
                      />
                      <AnimatePresence>
                        {countryOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-20 left-0 right-0 top-[calc(100%+6px)] bg-white border border-gray-200 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden"
                          >
                            <div className="p-2 border-b border-gray-100">
                              <input
                                autoFocus
                                type="text"
                                value={countryQuery}
                                onChange={(e) => setCountryQuery(e.target.value)}
                                placeholder="Search country or code"
                                className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#21409A]/15 font-semibold text-[#1a1a1a] placeholder:text-gray-400 placeholder:font-medium"
                              />
                            </div>
                            <ul
                              role="listbox"
                              data-lenis-prevent
                              style={{ maxHeight: '240px' }}
                              className="overflow-y-auto overscroll-contain py-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                            >
                              {filteredCountries.length === 0 && (
                                <li className="px-4 py-3 text-xs text-gray-400 font-medium">No matches</li>
                              )}
                              {filteredCountries.map(c => {
                                const active = c.code === country.code;
                                return (
                                  <li key={c.code} role="option" aria-selected={active}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCountry(c);
                                        setCountryOpen(false);
                                        setCountryQuery('');
                                      }}
                                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                                        active ? 'bg-[#21409A]/5 text-[#21409A]' : 'text-[#1a1a1a] hover:bg-gray-50'
                                      }`}
                                    >
                                      <span className="text-lg leading-none" aria-hidden>{c.flag}</span>
                                      <span className="font-bold flex-1 truncate">{c.name}</span>
                                      <span className="text-xs font-bold text-gray-400 tabular-nums">{c.dial}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <FieldError id="phone-error" message={errors.phone} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className={labelClass}>Address {requiredMark}</label>
                  <input
                    id="address"
                    name="address"
                    required
                    type="text"
                    autoComplete="street-address"
                    placeholder="Kathmandu, Nepal"
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    onChange={() => clearError('address')}
                    className={getFieldClass('address')}
                  />
                  <FieldError id="address-error" message={errors.address} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="reason" className={labelClass}>Reason for Contact {requiredMark}</label>
                  <div className="relative">
                    <select
                      id="reason"
                      name="reason"
                      required
                      value={reason}
                      aria-invalid={Boolean(errors.reason)}
                      aria-describedby={errors.reason ? 'reason-error' : undefined}
                      onChange={(e) => {
                        setReason(e.target.value);
                        setProgramme('');
                        setErrors((state) => {
                          const next = { ...state };
                          delete next.reason;
                          delete next.programme;
                          return next;
                        });
                      }}
                      className={getFieldClass('reason', `appearance-none pr-12 ${reason ? '' : 'text-gray-400'}`)}
                    >
                      <option value="" disabled>Select what brings you here…</option>
                      {REASONS.map(r => (
                        <option key={r.value} value={r.value} className="text-[#1a1a1a]">{r.label}</option>
                      ))}
                    </select>
                    <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#21409A] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <FieldError id="reason-error" message={errors.reason} />
                </div>

                <AnimatePresence initial={false}>
                  {showProgramme && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: -24 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pt-1">
                        <label className={labelClass}>Programme of Interest {requiredMark}</label>
                        <input type="hidden" name="programme" value={programme} />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {PROGRAMMES.map(p => {
                            const active = programme === p;
                            return (
                              <button
                                type="button"
                                key={p}
                                data-programme-choice
                                onClick={() => {
                                  setProgramme(p);
                                  clearError('programme');
                                }}
                                aria-pressed={active}
                                aria-describedby={errors.programme ? 'programme-error' : undefined}
                                className={`px-3 py-3 rounded-xl border text-xs font-bold transition-all ${
                                  active
                                    ? 'bg-[#21409A] border-[#21409A] text-white shadow-md'
                                    : errors.programme
                                      ? 'bg-white border-[#ED1C24] text-[#1a1a1a] hover:border-[#ED1C24]'
                                    : 'bg-white border-gray-200 text-[#1a1a1a] hover:border-[#21409A]/40'
                                }`}
                              >
                                {p}
                              </button>
                            );
                          })}
                        </div>
                        <FieldError id="programme-error" message={errors.programme} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className={labelClass}>Your Message {requiredMark}</label>
                    <span className={`text-[11px] font-bold tabular-nums ${message.length > MESSAGE_MAX * 0.9 ? 'text-[#ED1C24]' : 'text-gray-400'}`}>
                      {message.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    value={message}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearError('message');
                    }}
                    placeholder="Share your goals, questions, or which programme excites you most…"
                    className={getFieldClass('message', 'resize-none leading-relaxed')}
                  />
                  <FieldError id="message-error" message={errors.message} />
                </div>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-[18px] bg-[#21409A] text-white font-bold rounded-xl shadow-[0_10px_30px_rgba(33,64,154,0.3)] hover:bg-[#21409A] hover:shadow-[0_14px_40px_rgba(33,64,154,0.4)] transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </Magnetic>

                <p className="text-[11px] text-gray-400 text-center font-medium leading-relaxed">
                  By submitting, you agree to our <Link href="/privacy-policy" className="underline hover:text-[#21409A]">Privacy Policy</Link>. We never share your data.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
