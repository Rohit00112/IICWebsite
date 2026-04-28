'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';

const formSteps = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Academic' },
  { id: 3, label: 'Program' },
  { id: 4, label: 'Documents' },
];

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
);

const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);

interface ApplicationFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ApplicationForm = ({ currentStep, setCurrentStep }: ApplicationFormProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>('BIT');
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string, preview: string | null } }>({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    schoolName: '',
    board: 'NEB (Nepal)',
    cgpa: '',
    program: 'BIT',
    shift: 'Morning (6:30 AM - 11:30 AM)'
  });

  const transcriptInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);

  // Persistence: Data
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('admissions_form_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        setSelectedProgram(parsed.program);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      setUploadedFiles(prev => {
        const existing = prev[key];
        if (existing?.preview) URL.revokeObjectURL(existing.preview);
        return { ...prev, [key]: { name: file.name, preview } };
      });
    }
    // Reset the input value so the same file can be uploaded again if removed
    if (e.target) e.target.value = '';
  };

  const removeFile = (e: React.MouseEvent, key: string) => {
    e.stopPropagation(); // Don't trigger the file input click
    const file = uploadedFiles[key];
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setUploadedFiles(prev => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
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
          Thank you for applying to Itahari International College. Our admissions team will review your documents and contact you within 2-3 business days.
        </p>
        <Magnetic strength={0.2}>
          <button
            onClick={() => window.location.href = '/'}
            className="px-10 py-4 bg-[#21409A] text-white rounded-xl font-bold shadow-xl shadow-blue-900/10"
          >
            Back to Home
          </button>
        </Magnetic>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
      <div className="flex flex-col mb-12">
        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-2 font-sora tracking-tight">
          Application Form
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-medium">
          Please fill in the details carefully. Your progress is automatically saved.
        </p>
      </div>

      {/* Stepped Indicator */}
      <div className="flex justify-between items-center mb-16 relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-[#21409A] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (formSteps.length - 1)) * 100}%` }}
        />

        {formSteps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              aria-label={`Go to step ${step.id}: ${step.label}`}
              aria-current={currentStep === step.id ? 'step' : undefined}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep >= step.id
                ? 'bg-[#21409A] text-white shadow-lg shadow-blue-200'
                : 'bg-white text-gray-400 border-2 border-gray-100'
                }`}
            >
              {currentStep > step.id ? '✓' : step.id}
            </button>
            <span className={`absolute top-14 whitespace-nowrap text-[10px] md:text-xs font-bold uppercase tracking-widest ${currentStep >= step.id ? 'text-[#21409A]' : 'text-gray-400'
              }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <motion.div layout className="flex-grow">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
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
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+977 98xxxxxxxx"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Permanent Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street, City, District"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              <div className="md:col-span-2 flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Education Board <span className="text-red-500">*</span></label>
                <select
                  name="board"
                  value={formData.board}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
                >
                  <option>NEB (Nepal)</option>
                  <option>CBSE (India)</option>
                  <option>Cambridge (A-Levels)</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">CGPA / Percentage <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  placeholder="e.g. 3.5 or 85%"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Interested Program <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
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
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Preferred Shift</label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#21409A]/10 focus:border-[#21409A] transition-all font-medium text-gray-900"
                >
                  <option>Morning (6:30 AM - 11:30 AM)</option>
                  <option>Day (11:30 AM - 4:30 PM)</option>
                </select>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 mb-12"
            >
              <input
                type="file"
                ref={transcriptInputRef}
                onChange={(e) => handleFileChange(e, 'transcript')}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <input
                type="file"
                ref={idInputRef}
                onChange={(e) => handleFileChange(e, 'id')}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />

              <div
                onClick={() => transcriptInputRef.current?.click()}
                className={`group relative p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${uploadedFiles.transcript
                    ? 'border-[#76bc43] bg-green-50/20'
                    : 'border-gray-200 bg-gray-50/30 hover:border-[#21409A]/30'
                  }`}
              >
                {uploadedFiles.transcript && (
                  <button
                    onClick={(e) => removeFile(e, 'transcript')}
                    aria-label="Remove uploaded transcript"
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all z-20"
                  >
                    <XIcon />
                  </button>
                )}
                {uploadedFiles.transcript?.preview ? (
                  <div className="w-full h-64 mb-6 rounded-2xl overflow-hidden relative shadow-inner bg-gray-100">
                    <img src={uploadedFiles.transcript.preview} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-bold px-4 py-2 bg-[#21409A] rounded-full shadow-xl">Change Document</span>
                    </div>
                  </div>
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${uploadedFiles.transcript ? 'bg-green-50 text-[#76bc43]' : 'bg-blue-50 text-[#21409A]'
                    }`}>
                    {uploadedFiles.transcript ? '✓' : <UploadIcon />}
                  </div>
                )}
                <h4 className={`text-lg font-bold mb-1 ${uploadedFiles.transcript ? 'text-[#003B2E]' : 'text-gray-700'}`}>
                  {uploadedFiles.transcript ? 'Transcript Uploaded' : 'Upload Academic Transcript'}
                </h4>
                <p className={`text-sm font-medium ${uploadedFiles.transcript ? 'text-[#76bc43]' : 'text-gray-400'}`}>
                  {uploadedFiles.transcript ? uploadedFiles.transcript.name : 'PDF, JPG or PNG (Max 5MB)'}
                </p>
              </div>

              <div
                onClick={() => idInputRef.current?.click()}
                className={`group relative p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${uploadedFiles.id
                    ? 'border-[#76bc43] bg-green-50/20'
                    : 'border-gray-200 bg-gray-50/30 hover:border-[#21409A]/30'
                  }`}
              >
                {uploadedFiles.id && (
                  <button
                    onClick={(e) => removeFile(e, 'id')}
                    aria-label="Remove uploaded identification document"
                    className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all z-20"
                  >
                    <XIcon />
                  </button>
                )}
                {uploadedFiles.id?.preview ? (
                  <div className="w-full h-64 mb-6 rounded-2xl overflow-hidden relative shadow-inner bg-gray-100">
                    <img src={uploadedFiles.id.preview} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-bold px-4 py-2 bg-[#21409A] rounded-full shadow-xl">Change Document</span>
                    </div>
                  </div>
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${uploadedFiles.id ? 'bg-green-50 text-[#76bc43]' : 'bg-blue-50 text-[#21409A]'
                    }`}>
                    {uploadedFiles.id ? '✓' : <FileTextIcon />}
                  </div>
                )}
                <h4 className={`text-lg font-bold mb-1 ${uploadedFiles.id ? 'text-[#003B2E]' : 'text-gray-700'}`}>
                  {uploadedFiles.id ? 'ID Uploaded' : 'Upload Citizenship / ID'}
                </h4>
                <p className={`text-sm font-medium ${uploadedFiles.id ? 'text-[#76bc43]' : 'text-gray-400'}`}>
                  {uploadedFiles.id ? uploadedFiles.id.name : 'Both sides required in a single file'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-10 border-t border-gray-100/50 mt-auto">
        <Magnetic strength={0.2}>
          <button
            className="px-6 py-2.5 bg-gray-50 border border-gray-100 text-gray-400 rounded-full font-bold text-[13px] flex items-center gap-2 hover:bg-gray-100 hover:text-gray-600 transition-all"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          >
            <span className="text-base">←</span> Back
          </button>
        </Magnetic>

        <Magnetic strength={0.2} maxDistance={15}>
          <button
            className="px-10 py-3.5 bg-[#21409A] text-white rounded-xl font-bold text-[14px] flex items-center gap-3 shadow-xl shadow-blue-900/10 hover:brightness-110 transition-all active:scale-[0.98]"
            onClick={() => {
              if (currentStep === formSteps.length) {
                setIsSubmitted(true);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === formSteps.length ? 'Submit Application' : 'Continue'} <span className="text-lg">→</span>
          </button>
        </Magnetic>
      </div>
    </div>
  );
};

export default ApplicationForm;
