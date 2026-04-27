'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';
import Link from 'next/link';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="py-24 bg-[#f3f6fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Directory */}
          <div className="lg:col-span-5">
            <AnimeReveal
              as="h2"
              text="Contact Directory"
              className="text-[32px] md:text-[40px] font-bold text-[#1a1a1a] mb-3 font-sora tracking-tight"
              staggerFrom="first"
            />
            <p className="text-gray-500 mb-12 font-medium text-sm md:text-base">Reach out directly to the department that best suits your needs.</p>
            
            <AnimeStagger className="space-y-6" selector=":scope > *" staggerDelay={120} translateY={28} duration={760}>
              {/* WhatsApp Fast-Track - NEW CRO ADDITION */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#25D366]/5 p-8 rounded-[24px] border border-[#25D366]/20 group transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.412" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-sora">Admissions WhatsApp</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed font-medium">Need immediate answers? Chat with our admissions counsellors instantly.</p>
                    <a href="https://wa.me/9779801234567" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
                      Chat with Admissions <span>→</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Admissions Office */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 group hover:border-[#21409A]/20 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#21409A]/5 rounded-xl flex items-center justify-center text-[#21409A] shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-sora">Admissions Office</h3>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed font-medium">For inquiries regarding applications, entry requirements, and scholarships.</p>
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        admissions@iic.edu.np
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        +977-1-12345678
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* General Enquiries */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 group hover:border-[#21409A]/20 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#21409A]/5 rounded-xl flex items-center justify-center text-[#21409A] shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-sora">General Enquiries</h3>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed font-medium">For general campus information, student services, and administrative support.</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        info@iic.edu.np
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        +977-1-12345679
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[#21409A]/5 p-8 rounded-[24px] border border-[#21409A]/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-5 h-5 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h3 className="text-lg font-bold text-[#1a1a1a] font-sora">Office Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-[13px] md:text-sm font-bold">
                    <span className="text-gray-400">Sunday - Thursday</span>
                    <span className="text-[#1a1a1a]">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-sm font-bold">
                    <span className="text-gray-400">Friday</span>
                    <span className="text-[#1a1a1a]">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between text-[13px] md:text-sm font-bold">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-red-500 uppercase tracking-wide">Closed</span>
                  </div>
                </div>
              </motion.div>
            </AnimeStagger>
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
                    <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4 font-sora">Message Received!</h2>
                    <p className="text-gray-500 font-medium max-w-sm mb-10">
                      Thank you for reaching out. Our admissions team has been notified and will contact you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-3 bg-[#21409A] text-white font-bold rounded-xl"
                    >
                      Send Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-start gap-4 mb-3">
                <div className="mt-1 text-[#21409A]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <AnimeReveal
                    as="h2"
                    text="Send us a Message"
                    className="text-3xl font-bold text-[#1a1a1a] font-sora tracking-tight"
                    staggerFrom="first"
                  />
                  <p className="text-gray-400 text-[13px] md:text-sm mt-2 font-medium leading-relaxed max-w-sm">
                    Fill out the form below and our team will get back to you within 24-48 working hours.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-12 space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-[#1a1a1a]">First Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John" 
                      className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-[#1a1a1a]">Last Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Doe" 
                      className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-[#1a1a1a]">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-[#1a1a1a]">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+977 98..." 
                      className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 relative">
                  <label className="text-[13px] font-bold text-[#1a1a1a]">Reason for Contact</label>
                  <div className="relative">
                    <select required className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all font-medium text-sm appearance-none">
                      <option value="">Select an option</option>
                      <option>Admissions - BIT (Hons)</option>
                      <option>Admissions - BBA (Hons)</option>
                      <option>Admissions - MBA</option>
                      <option>General Support</option>
                      <option>Business Partnership</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-[#1a1a1a]">Your Message</label>
                  <textarea 
                    required
                    rows={5} 
                    placeholder="Tell us about your academic goals..." 
                    className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm resize-none"
                  ></textarea>
                </div>

                <Magnetic strength={0.2}>
                  <button 
                    disabled={isSubmitting}
                    className={`w-full py-5 bg-[#21409A] text-white font-bold rounded-xl shadow-xl hover:bg-[#1a337e] transition-all flex items-center justify-center gap-3 mt-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      </>
                    )}
                  </button>
                </Magnetic>

                <p className="text-[11px] text-gray-400 text-center mt-8 font-medium">
                  By submitting this form, you agree to our <Link href="#" className="underline">Privacy Policy</Link>. We respect your inbox.
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
