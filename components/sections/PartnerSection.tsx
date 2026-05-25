'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const PartnerSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBuilding = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yBadge = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const rankingCards = [
    '/images/lmu rank 1.png',
    '/images/lmu rank 2.png',
    '/images/lmu rank 3.png',
    '/images/lmu rank 4.png',
    '/images/lmu rank 5.png',
  ];

  const words = "UNIVERSITY".split("");

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-12 px-6 max-w-[1200px]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[#1a1a1a] text-lg md:text-xl font-bold font-sora block mb-2"
          >
            Partner
          </motion.span>
          <div className="overflow-hidden py-2">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-black text-[#74C044] tracking-tight leading-none font-sora"
            >
              UNIVERSITY
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 mb-14 px-6 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="relative h-10 md:h-12 w-64 md:w-[280px]"
          >
            <Image
              src="/images/lmu brand 2.png"
              alt="Ranking"
              fill
              sizes="(max-width: 768px) 256px, 280px"
              className="object-contain"
            />
          </motion.div>
          <div className="h-8 w-[1.5px] bg-gray-300 hidden md:block mx-4"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="relative h-14 md:h-16 w-80 md:w-[380px]"
          >
            <Image
              src="/images/lmu brand 1.png"
              alt="LMU"
              fill
              sizes="(max-width: 768px) 320px, 380px"
              className="object-contain"
            />
          </motion.div>
        </div>

        <div className="relative w-full mb-16">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/6] overflow-hidden">
            <motion.div style={{ y: yBuilding }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
              <Image
                src="/images/lmu building.png"
                alt="LMU Building"
                fill
                sizes="100vw"
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
                  src="/images/lmu student favourate.png"
                  alt="Student Favourite"
                  fill
                  sizes="(max-width: 768px) 144px, 240px"
                  className="object-contain object-bottom"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 w-full mb-14 px-6 max-w-[1300px]">
          {rankingCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <Image
                src={card}
                alt={`LMU Rank ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl text-center px-6"
        >
          <p className="text-gray-500 text-sm md:text-[16px] font-medium leading-relaxed mb-4">
            London Metropolitan University&apos;s Mission Is To Transform Lives Through The Power Of Education – And It Does That By Welcoming Students From All Kinds Of Backgrounds And Supporting Them To Achieve Success. Each And Every One Of Them Belongs There And Uniquely Contributes To The University And The City Around Them.
          </p>
          <a
            href="https://www.londonmet.ac.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#74C044] font-bold text-base md:text-lg underline underline-offset-8 decoration-2 hover:opacity-80 transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;
