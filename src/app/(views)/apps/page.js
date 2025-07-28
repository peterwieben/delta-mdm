'use client';

import { useState } from 'react';
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
  const [showAddAppDialog, setShowAddAppDialog] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', description: '', app: '' });

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="pb-4">
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">APPS</h1>
        </div>

        {/* Add App Button */}
        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {appsData.length} Apps
          </h3>
          <button
            onClick={() => setShowAddAppDialog(true)}
            className="bg-black text-white px-3 py-1 rounded text-xs font-medium flex items-center space-x-1 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <span className="text-sm">+</span>
            <span>Add New</span>
          </button>
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
                  <th className="text-right py-4 text-sm font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {appsData.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-200 border-t" style={{ borderTopColor: '#f2f2f2' }}>
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
                    <td className="py-4 text-sm text-gray-900 text-right">
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

        {/* Add App Dialog */}
        {showAddAppDialog && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => {
              setShowAddAppDialog(false);
              setNewApp({ name: '', description: '', app: '' });
            }}
          >
            <div 
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New App</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    value={newApp.name}
                    onChange={(e) => setNewApp({...newApp, name: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900"
                    placeholder="Enter app name"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Description</label>
                  <textarea
                    value={newApp.description}
                    onChange={(e) => setNewApp({...newApp, description: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900"
                    placeholder="Enter app description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">App</label>
                  <select
                    value={newApp.app}
                    onChange={(e) => setNewApp({...newApp, app: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900"
                  >
                    <option value="">Select App</option>
                    <option value="upload-apk">Upload APK</option>
                    <option value="signal">Signal</option>
                    <option value="gmail">Gmail</option>
                    <option value="ms-teams">Microsoft Teams</option>
                    <option value="slack">Slack</option>
                    <option value="zoom">Zoom</option>
                    <option value="chrome">Google Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="outlook">Outlook</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddAppDialog(false);
                    setNewApp({ name: '', description: '', app: '' });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Adding app:', newApp);
                    setShowAddAppDialog(false);
                    setNewApp({ name: '', description: '', app: '' });
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Add App
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}