'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';
import Tilt from '../../effects/Tilt';
import Magnetic from '../../effects/Magnetic';
import RevealText from '../../effects/RevealText';

const testimonials = [
  {
    name: "Sarah Jenks",
    degree: "BSc (Hons) Computing",
    quote: "The collaborative spaces and 24/7 access to the labs completely changed how I approached my final year project. It felt less like a school and more like a tech incubator.",
    tag: "Hackathon Winner | Taranga, ERC",
    image: "/images/profiles/sarah.png",
    featured: true
  },
  {
    name: "David Chen",
    degree: "BBA (Hons)",
    quote: "Joining the Business Leaders Club gave me the network I needed. The campus isn't just about classrooms; it's where you meet your future co-founders.",
    tag: "President | Entrepreneurs Club",
    image: "/images/profiles/david.png",
    featured: false
  },
  {
    name: "Emily Watson",
    degree: "BSc (Hons) AI",
    quote: "The mentorship programs at IIC connected me with industry leaders in Kathmandu's growing tech scene. I had my first internship offer before even graduating.",
    tag: "AI Research Lead",
    image: "/images/profiles/emily.png",
    featured: false
  },
  {
    name: "Jason Miller",
    degree: "BSc (Hons) Cyber Security",
    quote: "IIC provides a safe yet challenging environment to test your limits. The practical labs are state-of-the-art and exactly like what we use in the field.",
    tag: "Security Auditor",
    image: "/images/profiles/david.png",
    featured: false
  }
];

const StudentStories = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#007a5e] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 font-sora">
            Insights
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-2 font-sora">
            Stories From The
          </h2>
          <AnimeReveal
            as="h2"
            text="STUDENTS"
            className="text-5xl md:text-7xl font-black text-[#007a5e] leading-[0.8] tracking-tight mb-10 font-sora justify-center"
            staggerFrom="center"
            delay={0.1}
          />
          <p className="max-w-2xl text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            Hear Directly From Our Students About How The IIC Campus Environment Shaped Their Academic And Social Lives.
          </p>
        </div>

        {/* Horizontal Scrollable Row */}
        <div className="relative">
          <AnimeStagger
            className="flex gap-6 overflow-x-auto pb-12 pt-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
            selector=".story-card"
            staggerDelay={120}
            translateY={36}
            duration={850}
          >
            {testimonials.map((item, index) => (
              <div key={index} className="story-card flex-none w-[320px] md:w-[450px] snap-center">
                <Tilt strength={4}>
                  <div
                    className={`p-8 md:p-12 rounded-[24px] md:rounded-[32px] transition-all duration-300 h-full ${item.featured
                        ? 'bg-[#0a3285] text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
                        : 'bg-white text-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100'
                      }`}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {/* Quote Icon */}
                    <div className={`text-5xl md:text-6xl font-bold mb-6 leading-none ${item.featured ? 'text-white/40' : 'text-blue-200'} font-serif`}>
                      &ldquo;
                    </div>

                    {/* Quote Text */}
                    <RevealText
                      text={item.quote}
                      className={`text-lg md:text-[22px] font-medium leading-relaxed italic mb-8 ${item.featured ? 'text-white/90' : 'text-gray-700'
                        }`}
                      delay={0.4}
                    />

                    {/* Achievement Tag */}
                    <div className="mb-10">
                      <span className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border ${item.featured
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-blue-50 border-blue-100 text-blue-600'
                        }`}>
                        {item.tag}
                      </span>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mt-auto">
                      <Magnetic strength={0.2}>
                        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 56px, 64px"
                            className="object-cover"
                          />
                        </div>
                      </Magnetic>
                      <div>
                        <h4 className={`text-lg md:text-xl font-bold font-sora ${item.featured ? 'text-white' : 'text-[#1a1a1a]'}`}>
                          {item.name}
                        </h4>
                        <p className={`text-sm md:text-base font-medium ${item.featured ? 'text-white/60' : 'text-gray-400'}`}>
                          {item.degree}
                        </p>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>
            ))}
          </AnimeStagger>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default StudentStories;
