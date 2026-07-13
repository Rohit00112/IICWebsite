import { redirect } from 'next/navigation';
import TwoFactorSettings from '../../../components/admin/TwoFactorSettings';
import { getSession } from '../../../lib/auth';
import prisma from '../../../lib/db';

export const dynamic = 'force-dynamic';

export default async function SecurityPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const admin = await prisma.admin.findUnique({
    where: { id: session.admin.id },
    select: { twoFactorEnabled: true },
  });
  if (!admin) {
    redirect('/login');
  }

  return <TwoFactorSettings initialEnabled={admin.twoFactorEnabled} />;
}
