import React from 'react';
import { getNewsById } from '../../../../lib/news';
import { notFound } from 'next/navigation';
import EditNewsForm from '../../../../components/admin/EditNewsForm';

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    notFound();
  }

  return <EditNewsForm article={article} />;
}
