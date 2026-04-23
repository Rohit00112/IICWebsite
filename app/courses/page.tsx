import CoursesHero from "@/components/sections/courses/CoursesHero";
import CoursesList from "@/components/sections/courses/CoursesList";

import ScholarshipsSection from "@/components/sections/courses/ScholarshipsSection";

export const metadata = {
  title: 'Programmes | Itahari International College',
  description: 'Explore our world-class UK degrees in IT and Business at Itahari International College. Partnered with London Metropolitan University.',
};

export default function CoursesPage() {
  return (
    <>
      <CoursesHero />
      <CoursesList />
      <ScholarshipsSection />
    </>
  );
}
