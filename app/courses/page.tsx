import CoursesHero from "@/components/sections/CoursesHero";
import CoursesList from "@/components/sections/CoursesList";
import ProspectusSection from "@/components/sections/ProspectusSection";
import Preloader from "@/components/layout/Preloader";
import StatsStrip from "@/components/sections/StatsStrip";

import ScholarshipsSection from "@/components/sections/ScholarshipsSection";

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
