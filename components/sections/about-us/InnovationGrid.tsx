'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimeReveal from '../../effects/AnimeReveal';
import RevealText from '../../effects/RevealText';

const campusItems = [
  { 
    title: "Advanced Computing Labs", 
    image: "/images/about/Image-2.png" 
  },
  { 
    title: "Innovation Lab", 
    image: "/images/about/Image-3.png" 
  },
  { 
    title: "Lecture Theatres",
    image: "/images/about/Image-4.png" 
  },
  { 
    title: "Library", 
    image: "/images/about/Image-5.png" 
  },
  {
    title: "Cafeteria",
    image: "/images/about/img1.png"
  },
  {
    title: "Seminar Hall",
    image: "/images/about/img2.png"
  }
];

const InnovationGrid = () => {
  return (
    <section className="py-20 md:py-24 bg-[#21409A] text-white">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-2xl md:text-3xl font-medium font-iic text-white/90">
              A Campus Built For
            </p>
            <AnimeReveal
              as="h2"
              text="Innovation"
              className="text-6xl md:text-8xl lg:text-[120px] font-black text-white font-iic leading-none tracking-tight justify-center"
              staggerFrom="center"
              delay={0.15}
            />
            <RevealText
              text="Explore our modern facilities designed to provide an optimal environment for learning, research, and recreation."
              className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mt-8 font-medium leading-relaxed font-iic justify-center"
            />
          </motion.div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campusItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-2xl"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="text-xl md:text-2xl font-bold font-iic text-white tracking-tight">
                  {item.title}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[2.5rem] group-hover:border-white/20 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationGrid;
