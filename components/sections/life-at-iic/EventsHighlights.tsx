'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import RevealText from '../../effects/RevealText';

const events = [
  {
    title: 'Spring Carnival',
    description: 'A campus-wide celebration of music, food, and student-led performances marking the season.',
    image: '/images/about/img1.png',
  },
  {
    title: 'IICQuest',
    description: 'Our flagship inter-college tech and quiz challenge — teams compete across rounds of logic and creativity.',
    image: '/images/home/ivlab2.png',
  },
  {
    title: 'Innovex',
    description: 'An innovation showcase where students present prototypes, research, and startup ideas to industry mentors.',
    image: '/images/home/ivlab3.png',
  },
  {
    title: 'Holi',
    description: 'Colors, music, and community — Itahari International College celebrates the festival of spring with the entire student body.',
    image: '/images/about/img2.png',
  },
  {
    title: 'Sports Week',
    description: 'A week of futsal, basketball, table tennis, and athletics that turn the campus into one big arena.',
    image: '/images/home/iic-lifestyle 1.png',
  },
  {
    title: 'Creative Clash',
    description: 'A design and creative arts face-off — film, photography, music, and visual storytelling.',
    image: '/images/home/iic-lifestyle 2.png',
  },
  {
    title: 'Strategic',
    description: 'A business strategy and case competition that puts management students against real-world scenarios.',
    image: '/images/home/iic-lifestyle 3.png',
  },
  {
    title: 'Graduation',
    description: 'The culminating moment — celebrating each cohort as they step into their global careers.',
    image: '/images/about/Image-3.png',
  },
  {
    title: 'Christmas',
    description: 'A warm, lights-and-laughter end-of-year gathering bringing students, faculty, and families together.',
    image: '/images/about/Image-4.png',
  },
];

const EventsHighlights = () => {
  return (
    <section className="py-24 md:py-32 bg-[#21409A] text-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-2xl md:text-3xl font-medium font-iic text-white/90">
            A Year in Moments
          </p>
          <AnimeReveal
            as="h2"
            text="EVENTS & FESTS"
            className="text-5xl md:text-7xl lg:text-[100px] font-black text-white font-iic leading-none tracking-tight justify-center mt-4"
            staggerFrom="center"
            delay={0.15}
          />
          <RevealText
            text="From cultural festivals to flagship competitions, Itahari International College's calendar is built around moments that bring the community together."
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mt-8 font-medium leading-relaxed font-iic justify-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 pt-24 bg-gradient-to-t from-black/95 via-black/55 to-transparent">
                <h3 className="text-xl md:text-2xl font-bold font-iic text-white tracking-tight mb-2">
                  {event.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed font-iic">
                  {event.description}
                </p>
              </div>

              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[2rem] group-hover:border-white/25 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsHighlights;
