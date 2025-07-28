import MainLayout from '@/components/layout/main-layout';

const appsData = [
  {
    id: 1,
    appName: 'Slack',
    version: '4.29.0',
    platform: 'iOS',
    status: 'Installed',
  },
  {
    id: 2,
    appName: 'Microsoft Teams',
    version: '2.5.0',
    platform: 'Android',
    status: 'Pending',
  },
  {
    id: 3,
    appName: 'Zoom',
    version: '5.12.1',
    platform: 'iOS',
    status: 'Installed',
  },
  {
    id: 4,
    appName: 'Google Drive',
    version: '4.2022.42203',
    platform: 'Android',
    status: 'Installed',
  },
  {
    id: 5,
    appName: 'Outlook',
    version: '4.2242.0',
    platform: 'iOS',
    status: 'Failed',
  },
];

export default function AppsPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="pb-4">
          <h1 className="text-xl font-medium text-black uppercase tracking-wider">APPS</h1>
        </div>

        {/* Apps Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    App Name
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Version
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Platform
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {appsData.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-200">
                    <td className="py-4 text-sm text-gray-900">
                      {app.appName}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {app.version}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        app.platform === 'Android' 
                          ? 'bg-green-200 text-green-800' 
                          : 'bg-blue-200 text-blue-800'
                      }`}>
                        {app.platform}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        app.status === 'Installed' 
                          ? 'bg-green-200 text-green-800'
                          : app.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                      }`}>
                        {app.status}
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