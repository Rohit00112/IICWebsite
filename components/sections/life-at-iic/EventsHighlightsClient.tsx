'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import RevealText from '../../effects/RevealText';
import type { EventGalleryArchive } from '@/lib/event-galleries';

export default function EventsHighlightsClient({ galleries }: { galleries: EventGalleryArchive[] }) {
  return (
    <section className="bg-[#21409A] py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mb-12 text-center md:mb-16">
          <p className="font-iic text-2xl font-medium text-white/90 md:text-3xl">A Year in Moments</p>
          <AnimeReveal
            as="h2"
            text="Events & Fests"
            className="mt-4 justify-center font-iic text-5xl font-black leading-none tracking-normal text-white md:text-7xl lg:text-[100px]"
            staggerFrom="center"
            delay={0.15}
          />
          <RevealText
            text="From cultural festivals to flagship competitions, Itahari International College's calendar is built around moments that bring the community together."
            className="mx-auto mt-8 max-w-2xl justify-center font-iic text-base font-medium leading-relaxed text-white/70 md:text-lg"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {galleries.map((gallery, index) => (
            <motion.div
              key={gallery.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/life-at-iic/events/${gallery.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#21409A]"
              >
                <Image
                  src={gallery.coverImage}
                  alt={gallery.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="mb-2 font-iic text-xl font-bold text-white md:text-2xl">{gallery.title}</h3>
                  <p className="line-clamp-2 font-iic text-sm leading-relaxed text-white/75">{gallery.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
