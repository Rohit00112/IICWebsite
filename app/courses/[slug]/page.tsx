import { permanentRedirect } from 'next/navigation';

type LegacyCoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyCoursePage({
  params,
}: LegacyCoursePageProps) {
  const { slug } = await params;

  permanentRedirect(`/${slug}`);
}
