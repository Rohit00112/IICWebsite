import CoursesHero from '@/components/sections/courses/CoursesHero';
import CoursesList from '@/components/sections/courses/CoursesList';
import ScholarshipsSection from '@/components/sections/courses/ScholarshipsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Programmes | Itahari International College',
  description: 'Explore our world-class undergraduate programs in Information Technology and Business Administration at Itahari International College.',
};

export default function CoursesPage() {
  return (
    <main className="bg-[#f3f6fb]">
      <CoursesHero />
      <CoursesList />
      <ScholarshipsSection />
    </main>
  );
}
