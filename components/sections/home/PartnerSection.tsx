'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';

const PartnerSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const awardCards = [
    '/images/home/Awards-03.png',
    '/images/home/Awards-04.png',
    '/images/home/Awards-05.png',
    '/images/home/Awards-06.png',
    '/images/home/Awards-07.png',
    '/images/home/Awards-08.png',
    '/images/home/Awards-09.png',
    '/images/home/Awards-10.png',
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-white pt-6 pb-14 overflow-hidden sm:pt-8 sm:pb-20 md:pt-8 md:pb-24">
      <div className="w-full flex flex-col items-center">
        <div className="w-full text-center mb-12 px-6 max-w-[1600px]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[#1a1a1a] text-2xl sm:text-3xl md:text-4xl font-bold font-iic block mb-3"
          >
            Partner
          </motion.span>
          <div className="overflow-hidden py-4">
            <Magnetic strength={0.1}>
              <AnimeReveal
                text="UNIVERSITY"
                as="h2"
                className="w-full text-[44px] sm:text-6xl md:text-8xl font-black uppercase text-[#74C044] tracking-tight leading-[1.05] font-iic justify-center"
                staggerFrom="center"
                delay={0.2}
              />
            </Magnetic>
          </div>
        </div>

        <div className="grid w-full max-w-[1240px] grid-cols-1 items-center justify-items-center gap-7 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="relative h-[120px] w-full max-w-[500px] overflow-hidden sm:h-[136px] md:h-[150px] md:max-w-[540px] md:justify-self-end"
          >
            <Image
              src="/images/home/lmu brand 2.png"
              alt="London Metropolitan University Official Logo"
              fill
              sizes="(max-width: 768px) min(100vw - 32px, 500px), 540px"
              className="object-cover object-[50%_34%]"
            />
          </motion.div>
          <div className="hidden h-24 w-[1.5px] bg-gray-300 md:block"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="relative h-[120px] w-full max-w-[500px] overflow-hidden sm:h-[136px] md:h-[150px] md:max-w-[540px] md:justify-self-start"
          >
            <Image
              src="/images/home/lmu brand 1.png"
              alt="Times Higher Education World University Ranking 2025"
              fill
              sizes="(max-width: 768px) min(100vw - 32px, 500px), 540px"
              className="object-contain object-center"
            />
          </motion.div>
        </div>

        <div className="relative w-full mb-10 md:mb-16">
          <div className="relative w-full aspect-[2000/1164] overflow-hidden">
            <Image
              src="/images/home/lmu building.png"
              alt="LMU Building"
              fill
              sizes="100vw"
              priority
              loading="eager"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5 opacity-20"></div>
          </div>

          <div className="absolute inset-x-0 bottom-[-5px] pointer-events-none">
            <div className="max-w-[1300px] mx-auto relative px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-0 right-10 md:right-20 w-36 md:w-[240px] h-36 md:h-[240px] drop-shadow-3xl z-30"
              >
                <Image
                  src="/images/home/lmu student favourate.png"
                  alt="Student Favourite"
                  fill
                  sizes="(max-width: 768px) 144px, 240px"
                  className="object-contain object-bottom"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-8 w-full mb-10 md:mb-14 px-4 sm:px-6 max-w-[1300px]">
          {awardCards.map((card, index) => (
            <motion.div
              key={card}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.12,
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="relative aspect-[3750/2184] w-full overflow-hidden"
            >
              <Image
                src={card}
                alt={`London Metropolitan University award ${index + 3}`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl text-center px-6 flex flex-col items-center">
          <RevealText
            text="London Metropolitan University believes that education has the power to transform lives
— and that belief shapes everything we do. We welcome students from all
backgrounds, providing the support and opportunities they need to reach their full
potential. Every student belongs, matters, and brings a distinct perspective that enriches
our university and city."
            className="text-gray-500 text-sm md:text-[16px] font-medium leading-relaxed mb-6 justify-center"
          />
          <Magnetic strength={0.2}>
            <a
              href="https://www.londonmet.ac.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#74C044] font-bold text-base md:text-lg underline underline-offset-8 decoration-2 hover:opacity-80 transition-colors inline-block"
            >
              Learn More
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
