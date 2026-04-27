import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1000] bg-white flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-[#21409A]/10 rounded-full"></div>
        
        {/* Animated Ring */}
        <div className="absolute inset-0 border-4 border-[#21409A] border-t-transparent rounded-full animate-spin"></div>
        
        {/* Center Dot */}
        <div className="absolute inset-[35%] bg-[#76bc43] rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <div className="absolute mt-32 text-[#003B2E] text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
        Loading...
      </div>
    </div>
  );
}
