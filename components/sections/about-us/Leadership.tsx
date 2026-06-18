'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const Leadership = () => {
  return (
    <section className="pt-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 space-y-32 pb-32">
        {/* Chairman Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-[#74C044] font-bold tracking-[0.2em] text-sm mb-6 block">
              Message from the
            </span>
            <AnimeReveal
              as="h2"
              text="Our Chairman"
              className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-10 font-iic leading-tight"
              staggerFrom="first"
            />
            <AnimeStagger className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed font-iic" selector=":scope > *" staggerDelay={120} translateY={24} duration={700}>
              <p>{`"Welcome to Itahari International College, where we offer world-class IT and Business academic qualifications through partnerships with prestigious international universities from the UK."`}</p>
              <p>{`"Our innovative approach to education goes beyond textbooks and classrooms, engaging the mind, body, and spirit of our students. With a focus on nurturing talent, we instil in our students a passion for learning and excellence, preparing them for real-world challenges."`}</p>
              <p>{`"Embark on a transformative learning journey that shapes your future at Itahari International College, the college of your own!"`}</p>
            </AnimeStagger>
            <div className="mt-12">
              <p className="text-xl font-bold text-[#1a1a1a]">Mr. Sulav Budhathoki</p>
              <p className="text-[#74C044] font-bold tracking-widest text-sm mt-1">Chairman, ING Group</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full group"
          >
            {/* Background Shape */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[45%] bg-[#21409A] rounded-t-[160px] md:rounded-t-[200px] shadow-2xl transition-all duration-500 group-hover:scale-105" />

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
            <span className="text-[#21409A] font-bold tracking-[0.2em] text-sm mb-6 block">
              Message from the
            </span>
            <AnimeReveal
              as="h2"
              text="What our CEO has to say"
              className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-10 font-iic leading-tight"
              staggerFrom="first"
            />
            <AnimeStagger className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed font-iic" selector=":scope > *" staggerDelay={120} translateY={24} duration={700}>
              <p>{`"Itahari International College offers exceptional academic programmes, setting us apart from other institutions. As part of Innovate Nepal Group (ING), a renowned provider of practical career-centric education, we prioritise guiding our students and equipping them with practical skills. Our experienced faculty and top-notch infrastructure, combined with the latest international curriculum, ensure a comprehensive learning experience. We provide in-demand Business and IT courses in partnership with London Metropolitan University, aiming to produce globally competitive professionals."`}</p>
              <p>{`"Through ongoing support and innovative approaches, we strive to enhance each student's career prospects and contribute to society."`}</p>
            </AnimeStagger>
            <div className="mt-12">
              <p className="text-xl font-bold text-[#1a1a1a]">Mr. Satyabrat Koirala</p>
              <p className="text-[#21409A] font-bold tracking-widest text-sm mt-1">CEO, Itahari International College</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full group"
          >
            {/* Background Shape */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[45%] bg-[#21409A] rounded-t-[160px] md:rounded-t-[200px] shadow-2xl transition-all duration-500 group-hover:scale-105" />

            <Image
              src="/images/about/iic-ceo.png"
              alt="CEO"
              fill
              className="object-contain object-bottom relative z-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

      </div>

      {/* Quote Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#21409A] py-32 px-6 text-center"
      >
        <div className="max-w-[1200px] mx-auto text-white">
          <span className="text-white/40 font-bold tracking-[0.3em] text-xs mb-10 block font-iic">
            The Itahari International College Experience
          </span>
          <AnimeReveal
            as="h2"
            text="Education here extends far beyond the classrooms, developing strong values, encouraging creativity, and building a vibrant community that empowers confident leaders to global professionals ready to make a real world impact."
            className="text-2xl md:text-4xl lg:text-5xl font-iic leading-[1.5] font-extralight text-white/80 justify-center"
            staggerFrom="center"
            stagger={10}
          />
        </div>
      </motion.div>
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
