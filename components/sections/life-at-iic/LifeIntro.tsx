'use client';

import React from 'react';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const LifeIntro = () => {
  return (
    <section className="py-16 md:py-24 bg-white flex items-center justify-center text-center px-6">
      <div className="max-w-5xl mx-auto">
        <AnimeReveal
          as="h2"
          text="More Than Just A Degree. A Place To Grow, Connect, And Thrive."
          className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] leading-[1.1] tracking-tight mb-10 font-iic justify-center"
          staggerFrom="center"
        />
        
        <AnimeStagger
          className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg lg:text-xl font-medium leading-relaxed font-iic"
        >
          <p>At Itahari International College, experience growth beyond the classroom—through interactive learning, supportive faculty, and a dynamic college life that keeps you inspired.</p>
        </AnimeStagger>
      </div>
    </section>
  );
};

export default LifeIntro;
