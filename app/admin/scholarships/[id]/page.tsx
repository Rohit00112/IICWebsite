import { notFound } from 'next/navigation';
import ScholarshipBatchForm from '@/components/admin/ScholarshipBatchForm';
import { getScholarshipBatchById } from '@/lib/scholarships';

export default async function EditScholarshipBatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const batch = await getScholarshipBatchById(id);

  if (!batch) {
    notFound();
  }

  return <ScholarshipBatchForm batch={batch} />;
}
