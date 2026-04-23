import CoursesHero from '@/components/sections/courses/CoursesHero';
import CoursesList from '@/components/sections/courses/CoursesList';
import ScholarshipsSection from '@/components/sections/courses/ScholarshipsSection';

export default function CoursesPage() {
  return (
    <main className="bg-[#f3f6fb]">
      <CoursesHero />
      <CoursesList />
      <ScholarshipsSection />
    </main>
  );
}
