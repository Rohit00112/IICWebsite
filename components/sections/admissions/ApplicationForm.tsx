'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';

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

const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

interface ApplicationFormProps {
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

const ApplicationForm = ({ isSubmitted, setIsSubmitted }: ApplicationFormProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedProgram, setSelectedProgram] = useState<string | null>('BIT');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    schoolName: '',
    program: 'BIT',
  });

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

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('admissions_form_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
        if (parsed.program) setSelectedProgram(parsed.program);
      }
    } catch {
      localStorage.removeItem('admissions_form_data');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admissions_form_data', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-full bg-green-50 text-[#76bc43] flex items-center justify-center mb-8"
        >
          <CheckCircleIcon />
        </motion.div>
        <h2 className="text-3xl font-black text-[#1a1a1a] mb-4 font-sora">Application Submitted!</h2>
        <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
          Thank you for applying to Itahari International College. Our admissions team will review your application and contact you within 2-3 business days.
        </p>
        <Magnetic strength={0.2}>
          <Link
            href="/"
            className="px-10 py-4 bg-[#21409A] text-white rounded-xl font-bold shadow-xl shadow-blue-900/10"
          >
            Back to Home
          </Link>
        </Magnetic>
      </div>
    );
  }

  const sectionInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 };

  return (
    <div className="w-full h-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
      <div className="flex flex-col mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-2 font-sora tracking-tight">
          Application Form
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-medium">
          Please fill in the details carefully. Your progress is automatically saved.
        </p>
      </div>

      <motion.div layout className="flex-grow flex flex-col gap-12">
        {/* Personal Section */}
        <motion.section
          initial={sectionInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[11px] font-black text-[#21409A] uppercase tracking-[0.2em] mb-6">Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
              />
              <span className="text-[10px] text-gray-400 italic ml-1">We'll use this for all official correspondence</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Phone Number <span className="text-red-500">*</span></label>
              <div ref={countryRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCountryOpen(v => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={countryOpen}
                  aria-label={`Country code: ${country.name} ${country.dial}`}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 pl-2 pr-2 py-1.5 rounded-lg bg-gray-50 hover:bg-white transition-colors"
                >
                  <span className="text-base leading-none" aria-hidden>{country.flag}</span>
                  <span className="text-sm font-bold text-gray-700">{country.dial}</span>
                  <svg className={`w-3 h-3 text-gray-400 transition-transform ${countryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <span className="absolute left-[120px] top-1/2 -translate-y-1/2 h-6 w-px bg-gray-200 z-10 pointer-events-none" aria-hidden />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="98xxxxxxxx"
                  className="w-full pl-[136px] pr-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
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
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Address <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street, City, District"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
              />
            </div>
          </div>
        </motion.section>

        {/* Academic Section */}
        <motion.section
          initial={sectionInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[11px] font-black text-[#21409A] uppercase tracking-[0.2em] mb-6">Academic</h3>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">School / College Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleInputChange}
              placeholder="Enter your last attended institution"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
            />
          </div>
        </motion.section>

        {/* Program Section */}
        <motion.section
          initial={sectionInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[11px] font-black text-[#21409A] uppercase tracking-[0.2em] mb-6">Program</h3>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Interested Program <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedProgram('BIT');
                  setFormData(prev => ({ ...prev, program: 'BIT' }));
                }}
                className={`p-6 border-2 rounded-2xl text-left transition-all ${selectedProgram === 'BIT'
                    ? 'border-[#21409A] bg-blue-50/50'
                    : 'border-gray-100 bg-gray-50 hover:border-blue-200'
                  }`}
              >
                <div className={`font-bold mb-1 ${selectedProgram === 'BIT' ? 'text-[#21409A]' : 'text-gray-700'}`}>BSc (Hons) Computing</div>
                <div className={`text-[10px] uppercase tracking-widest font-bold ${selectedProgram === 'BIT' ? 'text-gray-500' : 'text-gray-400'}`}>BIT - 3 Years</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProgram('BBA');
                  setFormData(prev => ({ ...prev, program: 'BBA' }));
                }}
                className={`p-6 border-2 rounded-2xl text-left transition-all ${selectedProgram === 'BBA'
                    ? 'border-[#21409A] bg-blue-50/50'
                    : 'border-gray-100 bg-gray-50 hover:border-blue-200'
                  }`}
              >
                <div className={`font-bold mb-1 ${selectedProgram === 'BBA' ? 'text-[#21409A]' : 'text-gray-700'}`}>BBA (Hons)</div>
                <div className={`text-[10px] uppercase tracking-widest font-bold ${selectedProgram === 'BBA' ? 'text-gray-500' : 'text-gray-400'}`}>Business - 3 Years</div>
              </button>
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Submit Button */}
      <div className="flex justify-end items-center pt-10 border-t border-gray-100/50 mt-12">
        <Magnetic strength={0.2} maxDistance={15}>
          <button
            type="button"
            className="px-10 py-3.5 bg-[#21409A] text-white rounded-xl font-bold text-[14px] flex items-center gap-3 shadow-xl shadow-blue-900/10 hover:brightness-110 transition-all active:scale-[0.98]"
            onClick={() => setIsSubmitted(true)}
          >
            Submit Application <span className="text-lg">→</span>
          </button>
        </Magnetic>
      </div>
    </div>
  );
};

export default ApplicationForm;
