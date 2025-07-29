'use client';

import MainLayout from '@/components/layout/main-layout';
import { useState } from 'react';

// Global history data - actions taken across the entire system
const historyData = [
  {
    id: 1,
    action: 'Install App',
    details: 'Installed Slack v4.29.0 on ALPHA-001',
    user: 'admin@company.com',
    device: 'ALPHA-001',
    timestamp: '2025-07-29 14:30:00',
    status: 'success',
    category: 'app-management'
  },
  {
    id: 2,
    action: 'Run Workflow',
    details: 'Executed Device Setup workflow on 5 devices',
    user: 'admin@company.com',
    device: 'Multiple (5)',
    timestamp: '2025-07-29 14:15:00',
    status: 'success',
    category: 'workflow'
  },
  {
    id: 3,
    action: 'Set PIN Code',
    details: 'Updated device PIN requirements to 6 digits, high complexity on ALPHA-002',
    user: 'security@company.com',
    device: 'ALPHA-002',
    timestamp: '2025-07-29 10:15:00',
    status: 'success',
    category: 'security'
  },
  {
    id: 4,
    action: 'Apply Profile',
    details: 'Applied Gold profile to BETA-003',
    user: 'admin@company.com',
    device: 'BETA-003',
    timestamp: '2025-07-29 09:45:00',
    status: 'success',
    category: 'profile'
  },
  {
    id: 5,
    action: 'Install Certificate',
    details: 'Installed corporate security certificate on GAMMA-001',
    user: 'admin@company.com',
    device: 'GAMMA-001',
    timestamp: '2025-07-28 16:45:00',
    status: 'success',
    category: 'security'
  },
  {
    id: 6,
    action: 'Configure VPN',
    details: 'Set up corporate VPN connection on DELTA-001',
    user: 'network@company.com',
    device: 'DELTA-001',
    timestamp: '2025-07-28 09:20:00',
    status: 'failed',
    category: 'network'
  },
  {
    id: 7,
    action: 'Device Enrollment',
    details: 'Device enrolled in Delta MDM system',
    user: 'system',
    device: 'ECHO-002',
    timestamp: '2025-07-27 11:00:00',
    status: 'success',
    category: 'enrollment'
  },
  {
    id: 8,
    action: 'Factory Reset',
    details: 'Performed complete device wipe on BETA-005',
    user: 'security@company.com',
    device: 'BETA-005',
    timestamp: '2025-07-27 08:30:00',
    status: 'success',
    category: 'security'
  },
  {
    id: 9,
    action: 'Install App',
    details: 'Failed to install Microsoft Teams v2.5.0 on GAMMA-003',
    user: 'admin@company.com',
    device: 'GAMMA-003',
    timestamp: '2025-07-26 15:20:00',
    status: 'failed',
    category: 'app-management'
  },
  {
    id: 10,
    action: 'Disable Camera',
    details: 'Disabled camera access for security compliance on ALPHA-005',
    user: 'security@company.com',
    device: 'ALPHA-005',
    timestamp: '2025-07-26 12:10:00',
    status: 'success',
    category: 'security'
  },
  {
    id: 11,
    action: 'Run Workflow',
    details: 'Executed Security Compliance workflow on 3 devices',
    user: 'security@company.com',
    device: 'Multiple (3)',
    timestamp: '2025-07-25 14:00:00',
    status: 'success',
    category: 'workflow'
  },
  {
    id: 12,
    action: 'Enable WiFi',
    details: 'Configured corporate WiFi on DELTA-002',
    user: 'network@company.com',
    device: 'DELTA-002',
    timestamp: '2025-07-25 10:30:00',
    status: 'success',
    category: 'network'
  }
];

export default function HistoryPage() {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredHistory = historyData.filter(entry => {
    const matchesSearch = !searchTerm || 
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (!sortField) {
      // Default sort by timestamp descending (newest first)
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'app-management', label: 'App Management' },
    { value: 'workflow', label: 'Workflows' },
    { value: 'security', label: 'Security' },
    { value: 'profile', label: 'Profiles' },
    { value: 'network', label: 'Network' },
    { value: 'enrollment', label: 'Enrollment' }
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">HISTORY</h1>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between space-x-4">
          <input
            type="text"
            placeholder="Search actions, devices, users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
          
          <div className="flex items-center space-x-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* History Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('timestamp')}>
                    Date & Time {sortField === 'timestamp' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('action')}>
                    Action {sortField === 'action' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase">
                    Details
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('device')}>
                    Device {sortField === 'device' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black" onClick={() => handleSort('user')}>
                    User {sortField === 'user' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-center py-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-black w-16" onClick={() => handleSort('status')}>
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((entry) => (
                  <tr 
                    key={entry.id} 
                    className="hover:bg-gray-50 border-t"
                    style={{ borderTopColor: '#f2f2f2' }}
                  >
                    <td className="py-4 text-sm text-gray-900">
                      <div>
                        <p className="font-medium">{entry.timestamp.split(' ')[0]}</p>
                        <p className="text-xs text-gray-500">{entry.timestamp.split(' ')[1]}</p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <span className="font-medium">{entry.action}</span>
                    </td>
                    <td className="py-4 text-sm text-gray-900 max-w-md pr-6">
                      <p className="truncate">{entry.details}</p>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {entry.device}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {entry.user}
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: 
                              entry.status === 'success' ? '#16a34a' :
                              entry.status === 'failed' ? '#dc2626' : '#gray-400'
                          }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="text-sm text-gray-500">
          Showing {sortedHistory.length} of {historyData.length} actions
        </div>
      </div>
    </MainLayout>
  );
}