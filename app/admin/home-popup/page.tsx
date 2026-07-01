import HomePopupForm from '../../../components/admin/HomePopupForm';

import { getHomePopupSettings } from '../../../lib/home-popup';

export const dynamic = 'force-dynamic';


export default async function HomePopupAdminPage() {
  const settings = await getHomePopupSettings();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-4xl font-black tracking-tight text-[#1A2B56] font-sora">
          Home Popup
        </h1>
        <p className="font-medium text-gray-500">
          Manage the announcement popup shown on the home page.
        </p>
      </div>

      <HomePopupForm initialSettings={settings} />
    </div>
  );
}
