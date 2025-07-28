'use client';

import MainLayout from '@/components/layout/main-layout';
import DeviceDetailsShelf from '@/components/devices/device-details-shelf';
import { useState } from 'react';

const devicesData = [
  // ALPHA team - mostly Gold with some Blue
  {
    id: 1,
    deviceNumber: 'ALPHA-001',
    build: 'Gold',
    code: '02',
    user: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    status: 'good',
    dateLastUpdated: '2025-07-28',
  },
  {
    id: 2,
    deviceNumber: 'ALPHA-002',
    build: 'Gold',
    code: '01',
    user: 'b2c3d4e5-f6g7-8901-bcde-f12345678901',
    status: 'good',
    dateLastUpdated: '2025-07-27',
  },
  {
    id: 3,
    deviceNumber: 'ALPHA-003',
    build: 'Gold',
    code: '02',
    user: 'c3d4e5f6-g7h8-9012-cdef-123456789012',
    status: 'good',
    dateLastUpdated: '2025-07-26',
  },
  {
    id: 4,
    deviceNumber: 'ALPHA-004',
    build: 'Gold',
    code: '01',
    user: 'p6q7r8s9-t0u1-2345-defa-456789012345',
    status: 'good',
    dateLastUpdated: '2025-07-25',
  },
  {
    id: 5,
    deviceNumber: 'ALPHA-005',
    build: 'Gold',
    code: '03',
    user: 'x1y2z3a4-b5c6-7890-defg-hij123456789',
    status: 'warning',
    dateLastUpdated: '2025-07-24',
  },
  {
    id: 6,
    deviceNumber: 'ALPHA-006',
    build: 'Blue',
    code: '02',
    user: 'q9w8e7r6-t5y4-3210-abcd-ef9876543210',
    status: 'good',
    dateLastUpdated: '2025-07-23',
  },
  {
    id: 7,
    deviceNumber: 'ALPHA-007',
    build: 'Blue',
    code: '01',
    user: 'm3n4o5p6-q7r8-9012-wxyz-123456789abc',
    status: 'good',
    dateLastUpdated: '2025-07-22',
  },
  // BETA team - mostly Black with some Red
  {
    id: 8,
    deviceNumber: 'BETA-001',
    build: 'Black',
    code: '03',
    user: 'd4e5f6g7-h8i9-0123-defa-234567890123',
    status: 'warning',
    dateLastUpdated: '2025-07-21',
  },
  {
    id: 9,
    deviceNumber: 'BETA-002',
    build: 'Black',
    code: '01',
    user: 'e5f6g7h8-i9j0-1234-efab-345678901234',
    status: 'good',
    dateLastUpdated: '2025-07-20',
  },
  {
    id: 10,
    deviceNumber: 'BETA-003',
    build: 'Black',
    code: '02',
    user: 'f6g7h8i9-j0k1-2345-fabc-456789012345',
    status: 'good',
    dateLastUpdated: '2025-07-19',
  },
  {
    id: 11,
    deviceNumber: 'BETA-004',
    build: 'Black',
    code: '03',
    user: 'q7r8s9t0-u1v2-3456-efab-567890123456',
    status: 'good',
    dateLastUpdated: '2025-07-18',
  },
  {
    id: 12,
    deviceNumber: 'BETA-005',
    build: 'Red',
    code: '01',
    user: 'z9y8x7w6-v5u4-3210-mnop-qrs987654321',
    status: 'alert',
    dateLastUpdated: '2025-07-17',
  },
  // GAMMA team - mostly Blue with some Gold
  {
    id: 13,
    deviceNumber: 'GAMMA-001',
    build: 'Blue',
    code: '02',
    user: 'g7h8i9j0-k1l2-3456-abcd-567890123456',
    status: 'good',
    dateLastUpdated: '2025-07-16',
  },
  {
    id: 14,
    deviceNumber: 'GAMMA-002',
    build: 'Blue',
    code: '03',
    user: 'h8i9j0k1-l2m3-4567-bcde-678901234567',
    status: 'good',
    dateLastUpdated: '2025-07-15',
  },
  {
    id: 15,
    deviceNumber: 'GAMMA-003',
    build: 'Blue',
    code: '01',
    user: 'i9j0k1l2-m3n4-5678-cdef-789012345678',
    status: 'warning',
    dateLastUpdated: '2025-07-14',
  },
  // DELTA team - mostly Red with some Black
  {
    id: 16,
    deviceNumber: 'DELTA-001',
    build: 'Red',
    code: '02',
    user: 'j0k1l2m3-n4o5-6789-defa-890123456789',
    status: 'good',
    dateLastUpdated: '2025-07-13',
  },
  {
    id: 17,
    deviceNumber: 'DELTA-002',
    build: 'Red',
    code: '03',
    user: 'k1l2m3n4-o5p6-7890-efab-901234567890',
    status: 'good',
    dateLastUpdated: '2025-07-12',
  },
  {
    id: 18,
    deviceNumber: 'DELTA-003',
    build: 'Red',
    code: '01',
    user: 'l2m3n4o5-p6q7-8901-fabc-012345678901',
    status: 'good',
    dateLastUpdated: '2025-07-11',
  },
  // ECHO team - mixed Gold and Blue
  {
    id: 19,
    deviceNumber: 'ECHO-001',
    build: 'Gold',
    code: '02',
    user: 'm3n4o5p6-q7r8-9012-abcd-123456789012',
    status: 'warning',
    dateLastUpdated: '2025-07-10',
  },
  {
    id: 20,
    deviceNumber: 'ECHO-002',
    build: 'Gold',
    code: '03',
    user: 'n4o5p6q7-r8s9-0123-bcde-234567890123',
    status: 'alert',
    dateLastUpdated: '2025-07-09',
  },
];

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredDevices = devicesData.filter(device => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      device.deviceNumber.toLowerCase().includes(searchLower) ||
      device.user.toLowerCase().includes(searchLower)
    );
  });

  const sortedDevices = [...filteredDevices].sort((a, b) => {
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
        <div>
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">DEVICES</h1>
        </div>

        {/* Search Filter */}
        <div>
          <input
            type="text"
            placeholder="Filter by device number or IMEI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
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
                  <th className="text-right py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black w-16 pr-8" onClick={() => handleSort('status')}>
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('build')}>
                    Profile {sortField === 'build' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('code')}>
                    Code {sortField === 'code' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('user')}>
                    IMEI {sortField === 'user' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                    <td className="py-4 text-sm text-gray-900 pr-8">
                      <div className="flex items-center justify-end">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: 
                              device.status === 'good' ? '#16a34a' :
                              device.status === 'warning' ? '#f59e0b' :
                              device.status === 'alert' ? '#dc2626' : '#gray-400'
                          }}
                        ></div>
                      </div>
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