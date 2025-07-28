'use client';

import MainLayout from '@/components/layout/main-layout';
import DeviceDetailsShelf from '@/components/devices/device-details-shelf';
import { useState } from 'react';

const devicesData = [
  {
    id: 1,
    deviceNumber: 'ALPHA-001',
    build: 'Gold',
    code: '01',
    user: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    dateLastUpdated: '2025-07-28',
  },
  {
    id: 2,
    deviceNumber: 'ALPHA-002',
    build: 'Blue',
    code: '02',
    user: 'b2c3d4e5-f6g7-8901-bcde-f12345678901',
    dateLastUpdated: '2025-07-27',
  },
  {
    id: 3,
    deviceNumber: 'ALPHA-003',
    build: 'Red',
    code: '01',
    user: 'c3d4e5f6-g7h8-9012-cdef-123456789012',
    dateLastUpdated: '2025-07-26',
  },
  {
    id: 4,
    deviceNumber: 'BETA-001',
    build: 'Black',
    code: '03',
    user: 'd4e5f6g7-h8i9-0123-defa-234567890123',
    dateLastUpdated: '2025-07-25',
  },
  {
    id: 5,
    deviceNumber: 'BETA-002',
    build: 'Gold',
    code: '02',
    user: 'e5f6g7h8-i9j0-1234-efab-345678901234',
    dateLastUpdated: '2025-07-24',
  },
  {
    id: 6,
    deviceNumber: 'BETA-003',
    build: 'Blue',
    code: '01',
    user: 'f6g7h8i9-j0k1-2345-fabc-456789012345',
    dateLastUpdated: '2025-07-23',
  },
  {
    id: 7,
    deviceNumber: 'GAMMA-001',
    build: 'Red',
    code: '03',
    user: 'g7h8i9j0-k1l2-3456-abcd-567890123456',
    dateLastUpdated: '2025-07-22',
  },
  {
    id: 8,
    deviceNumber: 'GAMMA-002',
    build: 'Black',
    code: '02',
    user: 'h8i9j0k1-l2m3-4567-bcde-678901234567',
    dateLastUpdated: '2025-07-21',
  },
  {
    id: 9,
    deviceNumber: 'GAMMA-003',
    build: 'Gold',
    code: '01',
    user: 'i9j0k1l2-m3n4-5678-cdef-789012345678',
    dateLastUpdated: '2025-07-20',
  },
  {
    id: 10,
    deviceNumber: 'DELTA-001',
    build: 'Blue',
    code: '02',
    user: 'j0k1l2m3-n4o5-6789-defa-890123456789',
    dateLastUpdated: '2025-07-19',
  },
  {
    id: 11,
    deviceNumber: 'DELTA-002',
    build: 'Red',
    code: '03',
    user: 'k1l2m3n4-o5p6-7890-efab-901234567890',
    dateLastUpdated: '2025-07-18',
  },
  {
    id: 12,
    deviceNumber: 'DELTA-003',
    build: 'Black',
    code: '01',
    user: 'l2m3n4o5-p6q7-8901-fabc-012345678901',
    dateLastUpdated: '2025-07-17',
  },
  {
    id: 13,
    deviceNumber: 'ECHO-001',
    build: 'Gold',
    code: '02',
    user: 'm3n4o5p6-q7r8-9012-abcd-123456789012',
    dateLastUpdated: '2025-07-16',
  },
  {
    id: 14,
    deviceNumber: 'ECHO-002',
    build: 'Blue',
    code: '03',
    user: 'n4o5p6q7-r8s9-0123-bcde-234567890123',
    dateLastUpdated: '2025-07-15',
  },
  {
    id: 15,
    deviceNumber: 'ECHO-003',
    build: 'Red',
    code: '01',
    user: 'o5p6q7r8-s9t0-1234-cdef-345678901234',
    dateLastUpdated: '2025-07-14',
  },
  {
    id: 16,
    deviceNumber: 'ALPHA-004',
    build: 'Black',
    code: '02',
    user: 'p6q7r8s9-t0u1-2345-defa-456789012345',
    dateLastUpdated: '2025-07-13',
  },
  {
    id: 17,
    deviceNumber: 'BETA-004',
    build: 'Gold',
    code: '03',
    user: 'q7r8s9t0-u1v2-3456-efab-567890123456',
    dateLastUpdated: '2025-07-12',
  },
  {
    id: 18,
    deviceNumber: 'GAMMA-004',
    build: 'Blue',
    code: '01',
    user: 'r8s9t0u1-v2w3-4567-fabc-678901234567',
    dateLastUpdated: '2025-07-11',
  },
  {
    id: 19,
    deviceNumber: 'DELTA-004',
    build: 'Red',
    code: '02',
    user: 's9t0u1v2-w3x4-5678-abcd-789012345678',
    dateLastUpdated: '2025-07-10',
  },
  {
    id: 20,
    deviceNumber: 'ECHO-004',
    build: 'Black',
    code: '03',
    user: 't0u1v2w3-x4y5-6789-bcde-890123456789',
    dateLastUpdated: '2025-07-09',
  },
];

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setIsShelfOpen(true);
  };

  const handleCloseShelf = () => {
    setIsShelfOpen(false);
    setSelectedDevice(null);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDevices = [...devicesData].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'dateLastUpdated') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="pb-4">
          <h1 className="text-xl font-medium text-black uppercase tracking-wider">DEVICES</h1>
        </div>

        {/* Device Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('deviceNumber')}>
                    Device Number {sortField === 'deviceNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('build')}>
                    Build {sortField === 'build' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('code')}>
                    Code {sortField === 'code' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('user')}>
                    User {sortField === 'user' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('dateLastUpdated')}>
                    Date Last Updated {sortField === 'dateLastUpdated' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-white hover:font-medium cursor-pointer" onClick={() => handleDeviceClick(device)}>
                    <td className="py-4 text-sm text-gray-900">
                      {device.deviceNumber}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        device.build === 'Gold' 
                          ? 'bg-yellow-200 text-yellow-800'
                          : device.build === 'Blue'
                          ? 'bg-blue-200 text-blue-800'
                          : device.build === 'Red'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {device.build}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {device.code}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {device.user.substring(0, 5)}...
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {device.dateLastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeviceDetailsShelf
        device={selectedDevice}
        isOpen={isShelfOpen}
        onClose={handleCloseShelf}
      />
    </MainLayout>
  );
}