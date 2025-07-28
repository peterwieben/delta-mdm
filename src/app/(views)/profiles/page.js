import MainLayout from '@/components/layout/main-layout';

const profilesData = [
  {
    id: 1,
    profileName: 'Enterprise Security',
    type: 'Security',
    devices: 25,
    status: 'Active',
  },
  {
    id: 2,
    profileName: 'Sales Team WiFi',
    type: 'WiFi',
    devices: 12,
    status: 'Active',
  },
  {
    id: 3,
    profileName: 'Developer VPN',
    type: 'VPN',
    devices: 8,
    status: 'Inactive',
  },
  {
    id: 4,
    profileName: 'Email Configuration',
    type: 'Email',
    devices: 45,
    status: 'Active',
  },
  {
    id: 5,
    profileName: 'App Restrictions',
    type: 'Restrictions',
    devices: 30,
    status: 'Pending',
  },
];

export default function ProfilesPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="pb-4">
          <h1 className="text-xl font-medium text-black uppercase tracking-wider">PROFILES</h1>
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
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {profilesData.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-200">
                    <td className="py-4 text-sm text-gray-900">
                      {profile.profileName}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        profile.type === 'Security' 
                          ? 'bg-red-200 text-red-800'
                          : profile.type === 'WiFi'
                          ? 'bg-blue-200 text-blue-800'
                          : profile.type === 'VPN'
                          ? 'bg-purple-200 text-purple-800'
                          : profile.type === 'Email'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {profile.type}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {profile.devices}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
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