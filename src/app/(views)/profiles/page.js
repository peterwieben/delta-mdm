'use client';

import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';

const profilesData = [
  {
    id: 1,
    profileName: 'Gold',
    type: 'Security',
    devices: 25,
    status: 'Active',
  },
  {
    id: 2,
    profileName: 'Blue',
    type: 'WiFi',
    devices: 12,
    status: 'Active',
  },
  {
    id: 3,
    profileName: 'Red',
    type: 'VPN',
    devices: 8,
    status: 'Inactive',
  },
  {
    id: 4,
    profileName: 'Black',
    type: 'Email',
    devices: 45,
    status: 'Active',
  },
];

export default function ProfilesPage() {
  const router = useRouter();

  const handleProfileClick = (profileId) => {
    router.push(`/profiles/${profileId}`);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="pb-4 flex items-center justify-between">
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">PROFILES</h1>
          <button className="bg-black text-white px-4 py-2 rounded text-xs font-medium flex items-center space-x-1 hover:bg-gray-800 transition-colors cursor-pointer">
            <span className="text-sm">+</span>
            <span>Add Profile</span>
          </button>
        </div>

        {/* Profiles Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Profile Name
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Type
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Devices
                  </th>
                  <th className="text-right py-4 text-sm font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {profilesData.map((profile) => (
                  <tr key={profile.id} className="hover:bg-white hover:font-medium cursor-pointer border-t" style={{ borderTopColor: '#f2f2f2' }} onClick={() => handleProfileClick(profile.id)}>
                    <td className="py-4 text-sm text-gray-900">
                      {profile.profileName}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        profile.profileName === 'Gold' 
                          ? 'bg-yellow-200 text-yellow-800'
                          : profile.profileName === 'Blue'
                          ? 'bg-blue-200 text-blue-800'
                          : profile.profileName === 'Red'
                          ? 'bg-red-200 text-red-800'
                          : profile.profileName === 'Black'
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {profile.type}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {profile.devices}
                    </td>
                    <td className="py-4 text-sm text-gray-900 text-right">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        profile.status === 'Active' 
                          ? 'bg-green-200 text-green-800'
                          : profile.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {profile.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}