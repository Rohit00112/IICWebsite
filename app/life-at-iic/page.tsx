import React from 'react';
import Navbar from '@/components/layout/Navbar';
import LifeHero from '@/components/sections/life-at-iic/LifeHero';
import LifeIntro from '@/components/sections/life-at-iic/LifeIntro';
import CampusGallery from '@/components/sections/life-at-iic/CampusGallery';
import StudentExperience from '@/components/sections/life-at-iic/StudentExperience';
import CampusPictures from '@/components/sections/life-at-iic/CampusPictures';

export const metadata = {
  title: 'Life At IIC | Itahari International College',
  description: 'Discover the vibrant community, modern facilities, and student experiences at Itahari International College.',
};

export default function LifeAtIicPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <LifeHero />
      <LifeIntro />
      <CampusGallery />
      <StudentExperience />
      <CampusPictures />
    </main>
  );
}
