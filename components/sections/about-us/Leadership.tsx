'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';

const portraitBackdropClass = "pointer-events-none absolute bottom-[-8%] left-1/2 h-[52%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_28%,#365CC2_0%,#284BAA_55%,#1F3D94_100%)] shadow-[0_28px_80px_rgba(33,64,154,0.14)] transition-transform duration-500 group-hover:scale-[1.025] md:w-[88%]";

const Leadership = () => {
  return (
    <section className="pt-16 md:pt-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 space-y-20 md:space-y-24 pb-20 md:pb-24">
        {/* Chairman Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="mb-5 block text-base font-black text-[#4FAE35] md:text-lg">
              Chairman&apos;s Message
            </span>
            <AnimeReveal
              as="h2"
              text="A Vision for Global Learning"
              className="mb-10 max-w-2xl text-[44px] font-black leading-[1.04] text-[#101010] sm:text-5xl md:text-6xl xl:text-[72px] font-iic"
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
            className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full group overflow-hidden"
          >
            {/* Background Shape */}
            <div className={portraitBackdropClass} />

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
            <span className="mb-5 block text-base font-black text-[#21409A] md:text-lg">
              CEO&apos;s Message
            </span>
            <AnimeReveal
              as="h2"
              text="Preparing Students for Global Careers"
              className="mb-10 max-w-2xl text-[44px] font-black leading-[1.04] text-[#101010] sm:text-5xl md:text-6xl xl:text-[72px] font-iic"
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
            className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full group overflow-hidden"
          >
            {/* Background Shape */}
            <div className={portraitBackdropClass} />

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
        className="bg-[#21409A] py-20 md:py-24 px-6 text-center"
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
