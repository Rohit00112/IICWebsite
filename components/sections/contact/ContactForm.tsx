'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../../effects/Magnetic';
import Link from 'next/link';

const ContactForm = () => {
  return (
    <section className="py-24 bg-[#f3f6fb]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Directory */}
          <div className="lg:col-span-5">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1a1a1a] mb-3 font-sora tracking-tight">Contact Directory</h2>
            <p className="text-gray-500 mb-12 font-medium text-sm md:text-base">Reach out directly to the department that best suits your needs.</p>
            
            <div className="space-y-6">
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
                    <Link href="#" className="text-[#21409A] font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Apply Now <span>→</span>
                    </Link>
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

              {/* Industry Partnerships */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 group hover:border-[#21409A]/20 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#21409A]/5 rounded-xl flex items-center justify-center text-[#21409A] shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-sora">Industry Partnerships</h3>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed font-medium">For corporate relations, internship placements, and collaborative projects.</p>
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        partnerships@iic.edu.np
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#1a1a1a] font-bold">
                        <svg className="w-4 h-4 text-[#21409A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        +977-1-12345680
                      </div>
                    </div>
                    <Link href="#" className="text-[#21409A] font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore Careers <span>→</span>
                    </Link>
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
            </div>
          </div>

          {/* Right Column: Send us a Message */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-14 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-white h-full"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="mt-1 text-[#21409A]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#1a1a1a] font-sora tracking-tight">Send us a Message</h2>
                  <p className="text-gray-400 text-[13px] md:text-sm mt-2 font-medium leading-relaxed max-w-sm">
                    Fill out the form below and our team will get back to you within 24-48 working hours.
                  </p>
                </div>
              </div>

              <form className="mt-12 space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-[#1a1a1a]">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-[#1a1a1a]">Last Name</label>
                    <input 
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
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    />
                    <p className="text-[11px] text-gray-400 font-medium px-1">We'll never share your email with anyone else.</p>
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-[#1a1a1a]">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      placeholder="+977 98..." 
                      className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 relative">
                  <label className="text-[13px] font-bold text-[#1a1a1a]">How can we help you?</label>
                  <div className="relative">
                    <select className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all font-medium text-sm appearance-none">
                      <option className="text-gray-300">Select an option</option>
                      <option>Admissions Inquiry</option>
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
                    rows={5} 
                    placeholder="Please provide as much detail as possible..." 
                    className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl focus:border-[#21409A]/20 focus:ring-0 outline-none transition-all placeholder:text-gray-300 font-medium text-sm resize-none"
                  ></textarea>
                </div>

                <Magnetic strength={0.2}>
                  <button className="w-full py-5 bg-[#21409A] text-white font-bold rounded-xl shadow-xl hover:bg-[#1a337e] transition-all flex items-center justify-center gap-3 mt-4">
                    <span>Send Message</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </Magnetic>

                <p className="text-[11px] text-gray-400 text-center mt-8 font-medium">
                  By submitting this form, you agree to our <Link href="#" className="underline">Privacy Policy</Link> and <Link href="#" className="underline">Terms of Service</Link>.
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
