'use client';

import React from 'react';

const TopBar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-2 hidden md:block z-[110] relative">
      <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 text-[13px] text-gray-600 font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[#21409A]">📞</span>
          <a href="tel:+977123456789" className="hover:text-[#21409A] transition-colors tracking-tight">+977 123 456789</a>
        </div>
        <div className="flex items-center gap-2 border-l border-gray-200 pl-8">
          <span className="text-[#21409A]">📧</span>
          <a href="mailto:admissions@iic.edu.np" className="hover:text-[#21409A] transition-colors tracking-tight">admissions@iic.edu.np</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
