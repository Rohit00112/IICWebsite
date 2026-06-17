'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import RevealText from '../../effects/RevealText';
import Magnetic from '../../effects/Magnetic';
import AnimeReveal from '../../effects/AnimeReveal';

const PartnerSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBuilding = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const rankingCards = [
    '/images/home/lmu rank 1.png',
    '/images/home/lmu rank 2.png',
    '/images/home/lmu rank 3.png',
    '/images/home/lmu rank 4.png',
    '/images/home/lmu rank 5.png',
  ];

  return (
    <section ref={containerRef} className="relative w-full py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-12 px-6 max-w-[1200px]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[#1a1a1a] text-base sm:text-lg md:text-xl font-bold font-iic block mb-2"
          >
            Partner
          </motion.span>
          <div className="overflow-hidden py-2">
            <Magnetic strength={0.1}>
              <AnimeReveal
                text="UNIVERSITY"
                as="h2"
                className="text-[40px] sm:text-5xl md:text-8xl font-black text-[#74C044] tracking-tight leading-none font-iic justify-center"
                staggerFrom="center"
                delay={0.2}
              />
            </Magnetic>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10 md:mb-14 px-4 sm:px-6 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="relative h-14 sm:h-16 md:h-20 w-full max-w-[300px] sm:max-w-[320px] md:max-w-[400px]"
          >
            <Image
              src="/images/home/lmu brand 2.png"
              alt="London Metropolitan University World Ranking"
              fill
              sizes="(max-width: 768px) 320px, 400px"
              className="object-contain"
            />
          </motion.div>
          <div className="h-8 w-[1.5px] bg-gray-300 hidden md:block mx-4"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="relative h-20 sm:h-28 md:h-36 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[640px]"
          >
            <Image
              src="/images/home/lmu brand 1.png"
              alt="London Metropolitan University Official Logo"
              fill
              sizes="(max-width: 768px) 460px, 640px"
              className="object-contain"
            />
          </motion.div>
        </div>

        <div className="relative w-full mb-10 md:mb-16">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/6] overflow-hidden">
            <motion.div style={{ y: yBuilding }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
              <Image
                src="/images/home/lmu building.png"
                alt="LMU Building"
                fill
                sizes="100vw"
                priority
                loading="eager"
                className="object-cover"
              />
            </motion.div>
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 md:gap-8 w-full mb-10 md:mb-14 px-4 sm:px-6 max-w-[1300px]">
          {rankingCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.12,
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <Image
                src={card}
                alt={`LMU Rank ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-contain transition-transform duration-500 hover:scale-110"
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
