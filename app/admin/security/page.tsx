import { redirect } from 'next/navigation';

import TwoFactorSettings from '../../../components/admin/TwoFactorSettings';
import { getSession } from '../../../lib/auth';
import dbConnect from '../../../lib/db';
import Admin from '../../../models/Admin';

export const dynamic = 'force-dynamic';


export default async function SecurityPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  await dbConnect();
  const admin = await Admin.findById(session.admin.id).select(
    'twoFactorEnabled',
  );
  if (!admin) {
    redirect('/login');
  }

  return <TwoFactorSettings initialEnabled={admin.twoFactorEnabled} />;
}
