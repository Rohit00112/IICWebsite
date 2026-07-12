'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import AnimeStagger from '../../effects/AnimeStagger';
import JsonLd from '@/components/common/JsonLd';
import { absoluteUrl, buildSchemaGraph, COLLEGE_ID } from '@/lib/seo-schema';

const portraitFrameClass = "lg:w-1/2 relative h-[420px] md:h-[620px] w-full group overflow-hidden bg-white shadow-[0_34px_90px_-70px_rgba(22,19,47,0.3)]";
const portraitBlendClass = "pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_42%,#EEF3FB_0%,#F6F9FE_58%,#FFFFFF_88%)]";
const portraitArchClass = "pointer-events-none absolute bottom-0 left-1/2 z-0 h-[30%] w-[84%] -translate-x-1/2 rounded-t-[999px] bg-[#191430] shadow-[0_-22px_70px_-42px_rgba(25,20,48,0.75)] transition-transform duration-500 group-hover:scale-[1.025] md:h-[34%] md:w-[86%]";

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
              <p className="text-[#74C044] font-bold tracking-widest text-sm mt-1">Chairman, Innovative Nepal Group</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={portraitFrameClass}
          >
            {/* Background Shape */}
            <div className={portraitBlendClass} />
            <div className={portraitArchClass} />

            <Image
              src="/images/about/ing-ceo.webp"
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
            className={portraitFrameClass}
          >
            {/* Background Shape */}
            <div className={portraitBlendClass} />
            <div className={portraitArchClass} />

            <Image
              src="/images/about/iic-ceo.webp"
              alt="CEO"
              fill
              className="object-contain object-bottom relative z-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

      </div>

      {/* Leadership Schema for GEO Authority */}
      <JsonLd
        data={buildSchemaGraph([
            {
              "@type": "Person",
              "@id": `${absoluteUrl('/about-us')}#sulav-budhathoki`,
              "name": "Mr. Sulav Budhathoki",
              "jobTitle": "Chairman",
              "worksFor": {
                "@type": "Organization",
                "name": "ING Group"
              },
              "description": "Chairman of ING Group and Itahari International College, dedicated to bringing global education standards to Nepal."
            },
            {
              "@type": "Person",
              "@id": `${absoluteUrl('/about-us')}#satyabrat-koirala`,
              "name": "Mr. Satyabrat Koirala",
              "jobTitle": "CEO",
              "worksFor": { "@id": COLLEGE_ID },
              "description": "CEO of Itahari International College, focusing on practical learning and industry exposure."
            }
          ])}
      />
    </section>
  );
};

export default Leadership;
