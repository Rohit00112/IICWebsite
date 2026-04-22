import React from 'react';

const StatsStrip = () => {
  const stats = [
    { label: 'Students Enrolled', value: '2000+' },
    { label: 'Industry Partners', value: '100+' },
    { label: 'Years Of Excellence', value: '8+' },
  ];

  return (
    <div className="bg-[#008080] py-12 md:py-16 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/40">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-white py-6 md:py-0 px-4">
            <span className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-2">
              {stat.value}
            </span>
            <span className="text-lg md:text-2xl font-medium opacity-90 text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsStrip;
