'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CampusPictures = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-black text-[#74C044] mb-4 font-iic tracking-tight">
            Campus in Pictures
          </h2>
          <p className="text-gray-500 text-base md:text-xl font-medium font-iic">
            A glimpse into the vibrant moments that define the Itahari International College experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          {/* Left Large Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 lg:col-span-6 relative rounded-[40px] overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/home/iic-lifestyle 3.png"
              alt="Campus Life"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right Column */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6 h-1/2">
              {/* Top Left Small */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-[32px] overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/home/iic-lifestyle 2.png"
                  alt="Labs"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>

              {/* Top Right Small */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative rounded-[32px] overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/home/ivlab2.png"
                  alt="Students"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>

            {/* Bottom Large Horizontal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1/2 relative rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/home/iic-lifestyle 1.png"
                alt="Culture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusPictures;
