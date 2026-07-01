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

const DEFAULT_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  schoolName: '',
  program: 'BIT',
};

type ApplicationFormData = typeof DEFAULT_FORM_DATA;
type ApplicationField = keyof ApplicationFormData;
type ApplicationErrors = Partial<Record<ApplicationField, string>>;
type ApplicationTouched = Partial<Record<ApplicationField, boolean>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getDigits = (value: string) => value.replace(/\D/g, '');

const validateApplicationForm = (values: ApplicationFormData): ApplicationErrors => {
  const nextErrors: ApplicationErrors = {};
  const phoneDigits = getDigits(values.phone);

  if (!values.fullName.trim()) {
    nextErrors.fullName = 'Please enter your full name.';
  } else if (values.fullName.trim().length < 2) {
    nextErrors.fullName = 'Name must be at least 2 characters.';
  }

  if (!values.email.trim()) {
    nextErrors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    nextErrors.email = 'Please enter a valid email address.';
  }

  if (!values.phone.trim()) {
    nextErrors.phone = 'Please enter your phone number.';
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    nextErrors.phone = 'Please enter a valid phone number.';
  }

  if (!values.address.trim()) {
    nextErrors.address = 'Please enter your address.';
  } else if (values.address.trim().length < 4) {
    nextErrors.address = 'Please enter a complete address.';
  }

  if (!values.schoolName.trim()) {
    nextErrors.schoolName = 'Please enter your school or college name.';
  } else if (values.schoolName.trim().length < 2) {
    nextErrors.schoolName = 'School or college name is too short.';
  }

  if (!values.program) {
    nextErrors.program = 'Please select a programme.';
  }

  return nextErrors;
};

const getInputClassName = (invalid: boolean) => `w-full px-6 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-900 ${
  invalid
    ? 'border-[#ED1C24]/60 focus:border-[#ED1C24] focus:ring-[#ED1C24]/10'
    : 'border-gray-100 focus:border-[#21409A] focus:ring-[#21409A]/10'
}`;

function loadSavedFormData(): ApplicationFormData {
  if (typeof window === 'undefined') return DEFAULT_FORM_DATA;

  try {
    const savedData = localStorage.getItem('admissions_form_data');
    if (!savedData) return DEFAULT_FORM_DATA;

    const parsed = JSON.parse(savedData) as Partial<ApplicationFormData>;
    if (!parsed || typeof parsed !== 'object') return DEFAULT_FORM_DATA;

    return { ...DEFAULT_FORM_DATA, ...parsed };
  } catch {
    localStorage.removeItem('admissions_form_data');
    return DEFAULT_FORM_DATA;
  }
}

const ApplicationForm = ({ isSubmitted, setIsSubmitted }: ApplicationFormProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<ApplicationFormData>(() => loadSavedFormData());
  const [selectedProgram, setSelectedProgram] = useState<string | null>(() => formData.program);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [touched, setTouched] = useState<ApplicationTouched>({});

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
    localStorage.setItem('admissions_form_data', JSON.stringify(formData));
  }, [formData]);

  const hasFieldError = (field: ApplicationField) => Boolean(touched[field] && errors[field]);
  const getErrorId = (field: ApplicationField) => `application-${field}-error`;
  const getDescriptionIds = (field: ApplicationField, extraId?: string) => {
    const ids = [extraId, hasFieldError(field) ? getErrorId(field) : null].filter(Boolean);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const field = name as ApplicationField;
    const nextFormData = { ...formData, [field]: value };

    setFormData(nextFormData);

    if (touched[field] || errors[field]) {
      setErrors(validateApplicationForm(nextFormData));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as ApplicationField;
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validateApplicationForm(formData));
  };

  const handleProgramSelect = (program: string) => {
    const nextFormData = { ...formData, program };
    setSelectedProgram(program);
    setFormData(nextFormData);

    if (touched.program || errors.program) {
      setErrors(validateApplicationForm(nextFormData));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateApplicationForm(formData);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        address: true,
        schoolName: true,
        program: true,
      });
      return;
    }

    localStorage.removeItem('admissions_form_data');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-full bg-[#74C044]/10 text-[#74C044] flex items-center justify-center mb-8"
        >
          <CheckCircleIcon />
        </motion.div>
        <h2 className="text-3xl font-black text-[#1a1a1a] mb-4 font-iic">Application Submitted!</h2>
        <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
          Thank you for applying to Itahari International College. Our admissions team will review your application and contact you within 2-3 business days.
        </p>
        <Magnetic strength={0.2}>
          <Link
            href="/"
            className="px-10 py-4 bg-[#21409A] text-white rounded-xl font-bold shadow-xl shadow-[#21409A]/10"
          >
            Back to Home
          </Link>
        </Magnetic>
      </div>
    );
  }

  const sectionInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 };

  return (
    <form
      className="w-full h-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-2 font-iic tracking-tight">
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
          <h3 className="text-[11px] font-black text-[#21409A] tracking-[0.2em] mb-6">Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 flex flex-col gap-2">
              <label htmlFor="application-fullName" className="text-[11px] font-bold text-gray-400 tracking-[0.15em] ml-1">Full Name <span className="text-[#ED1C24]">*</span></label>
              <input
                id="application-fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                aria-invalid={hasFieldError('fullName')}
                aria-describedby={getDescriptionIds('fullName')}
                placeholder="John Doe"
                className={getInputClassName(hasFieldError('fullName'))}
              />
              {hasFieldError('fullName') && (
                <p id={getErrorId('fullName')} className="text-xs font-semibold text-[#ED1C24] ml-1">
                  {errors.fullName}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="application-email" className="text-[11px] font-bold text-gray-400 tracking-[0.15em] ml-1">Email Address <span className="text-[#ED1C24]">*</span></label>
              <input
                id="application-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                aria-invalid={hasFieldError('email')}
                aria-describedby={getDescriptionIds('email', 'application-email-help')}
                placeholder="john.doe@example.com"
                className={getInputClassName(hasFieldError('email'))}
              />
              <span id="application-email-help" className="text-[10px] text-gray-400 italic ml-1">We&apos;ll use this for all official correspondence</span>
              {hasFieldError('email') && (
                <p id={getErrorId('email')} className="text-xs font-semibold text-[#ED1C24] ml-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="application-phone" className="text-[11px] font-bold text-gray-400 tracking-[0.15em] ml-1">Phone Number <span className="text-[#ED1C24]">*</span></label>
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
                  id="application-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  aria-invalid={hasFieldError('phone')}
                  aria-describedby={getDescriptionIds('phone')}
                  placeholder="98xxxxxxxx"
                  className={`${getInputClassName(hasFieldError('phone'))} pl-[136px]`}
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
              {hasFieldError('phone') && (
                <p id={getErrorId('phone')} className="text-xs font-semibold text-[#ED1C24] ml-1">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label htmlFor="application-address" className="text-[11px] font-bold text-gray-400 tracking-[0.15em] ml-1">Address <span className="text-[#ED1C24]">*</span></label>
              <input
                id="application-address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                aria-invalid={hasFieldError('address')}
                aria-describedby={getDescriptionIds('address')}
                placeholder="Street, City, District"
                className={getInputClassName(hasFieldError('address'))}
              />
              {hasFieldError('address') && (
                <p id={getErrorId('address')} className="text-xs font-semibold text-[#ED1C24] ml-1">
                  {errors.address}
                </p>
              )}
            </div>
          </div>
        </motion.section>

        {/* Academic Section */}
        <motion.section
          initial={sectionInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[11px] font-black text-[#21409A] tracking-[0.2em] mb-6">Academic</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="application-schoolName" className="text-[11px] font-bold text-gray-400 tracking-[0.15em] ml-1">School / College Name <span className="text-[#ED1C24]">*</span></label>
            <input
              id="application-schoolName"
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              aria-invalid={hasFieldError('schoolName')}
              aria-describedby={getDescriptionIds('schoolName')}
              placeholder="Enter your last attended institution"
              className={getInputClassName(hasFieldError('schoolName'))}
            />
            {hasFieldError('schoolName') && (
              <p id={getErrorId('schoolName')} className="text-xs font-semibold text-[#ED1C24] ml-1">
                {errors.schoolName}
              </p>
            )}
          </div>
        </motion.section>

        {/* Programme Section */}
        <motion.section
          initial={sectionInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[11px] font-black text-[#21409A] tracking-[0.2em] mb-6">Programme</h3>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-400 tracking-[0.15em] ml-1">Interested Programme <span className="text-[#ED1C24]">*</span></label>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              role="radiogroup"
              aria-invalid={hasFieldError('program')}
              aria-describedby={getDescriptionIds('program')}
            >
              <button
                type="button"
                role="radio"
                aria-checked={selectedProgram === 'BIT'}
                onClick={() => handleProgramSelect('BIT')}
                className={`p-6 border-2 rounded-2xl text-left transition-all ${selectedProgram === 'BIT'
                    ? 'border-[#21409A] bg-[#21409A]/5'
                    : hasFieldError('program')
                      ? 'border-[#ED1C24]/60 bg-[#ED1C24]/5'
                      : 'border-gray-100 bg-gray-50 hover:border-[#21409A]/20'
                  }`}
              >
                <div className={`font-bold mb-1 ${selectedProgram === 'BIT' ? 'text-[#21409A]' : 'text-gray-700'}`}>BSc (Hons) Computing</div>
                <div className={`text-[10px] tracking-widest font-bold ${selectedProgram === 'BIT' ? 'text-gray-500' : 'text-gray-400'}`}>BIT - 3 Years</div>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={selectedProgram === 'BBA'}
                onClick={() => handleProgramSelect('BBA')}
                className={`p-6 border-2 rounded-2xl text-left transition-all ${selectedProgram === 'BBA'
                    ? 'border-[#21409A] bg-[#21409A]/5'
                    : hasFieldError('program')
                      ? 'border-[#ED1C24]/60 bg-[#ED1C24]/5'
                      : 'border-gray-100 bg-gray-50 hover:border-[#21409A]/20'
                  }`}
              >
                <div className={`font-bold mb-1 ${selectedProgram === 'BBA' ? 'text-[#21409A]' : 'text-gray-700'}`}>BA (Hons) Business Administration</div>
                <div className={`text-[10px] tracking-widest font-bold ${selectedProgram === 'BBA' ? 'text-gray-500' : 'text-gray-400'}`}>BBA - 3 Years</div>
              </button>
            </div>
            {hasFieldError('program') && (
              <p id={getErrorId('program')} className="text-xs font-semibold text-[#ED1C24] ml-1">
                {errors.program}
              </p>
            )}
          </div>
        </motion.section>
      </motion.div>

      {/* Submit Button */}
      <div className="flex justify-end items-center pt-10 border-t border-gray-100/50 mt-12">
        <Magnetic strength={0.2} maxDistance={15}>
          <button
            type="submit"
            className="px-10 py-3.5 bg-[#21409A] text-white rounded-xl font-bold text-[14px] flex items-center gap-3 shadow-xl shadow-[#21409A]/10 hover:brightness-110 transition-all active:scale-[0.98]"
          >
            Submit Application <span className="text-lg">→</span>
          </button>
        </Magnetic>
      </div>
    </form>
  );
};

export default ApplicationForm;
