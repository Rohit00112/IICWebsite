'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const Leadership = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 space-y-32">
        {/* Chairman Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-[#74C044] font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
              Message from the
            </span>
            <AnimeReveal
              as="h2"
              text="Our Chairman"
              className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-10 font-sora leading-tight"
              staggerFrom="first"
            />
            <AnimeStagger className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed font-sora" selector=":scope > *" staggerDelay={120} translateY={24} duration={700}>
              <p>{`"At Itahari International College, we believe that education is the most powerful weapon which you can use to change the world. Our commitment is to provide a platform where students can achieve their highest potential."`}</p>
              <p>{`"Through our partnership with London Metropolitan University, we bring a global standard of learning to Nepal, ensuring our graduates are competitive on the world stage."`}</p>
            </AnimeStagger>
            <div className="mt-12">
              <p className="text-xl font-bold text-[#1a1a1a]">Mr. Sulav Budhathoki</p>
              <p className="text-[#74C044] font-bold uppercase tracking-widest text-sm mt-1">Chairman, ING Group</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full group"
          >
            {/* Background Shape */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[45%] bg-[#0A1629] rounded-t-[160px] md:rounded-t-[200px] shadow-2xl transition-all duration-500 group-hover:scale-105" />

            <Image
              src="/images/about/ing-ceo.png"
              alt="Chairman"
              fill
              className="object-contain object-bottom relative z-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* CEO Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-[#21409A] font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
              Message from the
            </span>
            <AnimeReveal
              as="h2"
              text="What our CEO has to say"
              className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-10 font-sora leading-tight"
              staggerFrom="first"
            />
            <AnimeStagger className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed font-sora" selector=":scope > *" staggerDelay={120} translateY={24} duration={700}>
              <p>{`"IIC is more than just a college; it's a community of innovators and leaders. We focus on practical learning and industry exposure to make sure every student is ready for the real world."`}</p>
              <p>{`"Our state-of-the-art facilities and dedicated faculty are here to support you in every step of your professional journey."`}</p>
            </AnimeStagger>
            <div className="mt-12">
              <p className="text-xl font-bold text-[#1a1a1a]">Mr. Satyabrat Koirala</p>
              <p className="text-[#21409A] font-bold uppercase tracking-widest text-sm mt-1">CEO, Itahari International College</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full group"
          >
            {/* Background Shape */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[45%] bg-[#0A1629] rounded-t-[160px] md:rounded-t-[200px] shadow-2xl transition-all duration-500 group-hover:scale-105" />

            <Image
              src="/images/about/iic-ceo.png"
              alt="CEO"
              fill
              className="object-contain object-bottom relative z-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A1629] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-32 px-6 text-center"
        >
          <div className="max-w-[1200px] mx-auto text-white">
            <span className="text-white/40 font-bold tracking-[0.3em] uppercase text-xs mb-10 block font-sora">
              The IIC Experience
            </span>
            <AnimeReveal
              as="h2"
              text="Education here extends far beyond the four walls of a classroom. It’s about building character, fostering innovation, and creating a community that inspires greatness every single day."
              className="text-2xl md:text-4xl lg:text-5xl font-sora leading-[1.5] font-extralight text-white/80 justify-center"
              staggerFrom="center"
              stagger={10}
            />
          </div>
        </motion.div>
      </div>
      {/* Leadership Schema for GEO Authority */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mr. Sulav Budhathoki",
              "jobTitle": "Chairman",
              "worksFor": {
                "@type": "Organization",
                "name": "ING Group"
              },
              "description": "Chairman of ING Group and Itahari International College, dedicated to bringing global education standards to Nepal."
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mr. Satyabrat Koirala",
              "jobTitle": "CEO",
              "worksFor": {
                "@type": "CollegeOrUniversity",
                "name": "Itahari International College"
              },
              "description": "CEO of Itahari International College, focusing on practical learning and industry exposure."
            }
          ])
        }}
      />
    </section>
  );
};

export default Leadership;
