'use client';

import MainLayout from '@/components/layout/main-layout';
import DeviceDetailsShelf from '@/components/devices/device-details-shelf';
import { useState } from 'react';
import { Check, Loader2, Smartphone, File, Lock, Image, Hash, Wifi, Camera, AlertTriangle, Shield, Activity, Play } from 'lucide-react';

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

const workflowsData = [
  {
    id: 1,
    workflowName: 'Device Setup',
    description: 'Complete onboarding workflow for new corporate devices',
    actions: 3,
    status: 'Active',
    lastModified: '2025-07-25',
    steps: [
      {
        id: 'step-1',
        type: 'install-app',
        title: 'Install Corporate VPN',
        config: { appName: 'Corporate VPN', packageName: 'com.corp.vpn' }
      },
      {
        id: 'step-2',
        type: 'set-pincode',
        title: 'Set Device PIN',
        config: { pinLength: '6', complexity: 'high' }
      },
      {
        id: 'step-3',
        type: 'add-file',
        title: 'Install Certificate',
        config: { fileName: 'corporate-cert.pem', destination: '/system/certs/' }
      }
    ]
  },
  {
    id: 2,
    workflowName: 'Security Compliance',
    description: 'Enforce security policies and compliance checks',
    actions: 4,
    status: 'Active',
    lastModified: '2025-07-24',
    steps: [
      {
        id: 'step-1',
        type: 'strip-permissions',
        title: 'Strip App Permissions',
        config: {}
      },
      {
        id: 'step-2',
        type: 'disable-camera',
        title: 'Disable Camera',
        config: {}
      },
      {
        id: 'step-3',
        type: 'install-certificate',
        title: 'Install Security Certificate',
        config: { certificateType: 'corporate', domain: 'company.com' }
      },
      {
        id: 'step-4',
        type: 'configure-vpn',
        title: 'Configure Corporate VPN',
        config: { serverUrl: 'vpn.company.com', protocol: 'OpenVPN' }
      }
    ]
  },
  {
    id: 3,
    workflowName: 'App Deployment',
    description: 'Batch installation of corporate applications',
    actions: 3,
    status: 'Draft',
    lastModified: '2025-07-23',
    steps: [
      {
        id: 'step-1',
        type: 'install-app',
        title: 'Install Slack',
        config: { appName: 'Slack', packageName: 'com.slack.slack' }
      },
      {
        id: 'step-2',
        type: 'install-app',
        title: 'Install Microsoft Teams',
        config: { appName: 'Microsoft Teams', packageName: 'com.microsoft.teams' }
      },
      {
        id: 'step-3',
        type: 'install-app',
        title: 'Install Zoom',
        config: { appName: 'Zoom', packageName: 'us.zoom.videomeetings' }
      }
    ]
  },
  {
    id: 4,
    workflowName: 'Device Wipe',
    description: 'Complete device data wipe and factory reset',
    actions: 2,
    status: 'Active',
    lastModified: '2025-07-22',
    steps: [
      {
        id: 'step-1',
        type: 'strip-permissions',
        title: 'Remove All App Permissions',
        config: {}
      },
      {
        id: 'step-2',
        type: 'factory-reset',
        title: 'Factory Reset Device',
        config: {}
      }
    ]
  },
  {
    id: 5,
    workflowName: 'User Offboarding',
    description: 'Remove corporate data and revoke access',
    actions: 4,
    status: 'Active',
    lastModified: '2025-07-21',
    steps: [
      {
        id: 'step-1',
        type: 'strip-permissions',
        title: 'Revoke App Permissions',
        config: {}
      },
      {
        id: 'step-2',
        type: 'disable-camera',
        title: 'Disable Camera Access',
        config: {}
      },
      {
        id: 'step-3',
        type: 'add-file',
        title: 'Remove Corporate Files',
        config: { fileName: 'cleanup.sh', destination: '/tmp/' }
      },
      {
        id: 'step-4',
        type: 'factory-reset',
        title: 'Complete Device Wipe',
        config: {}
      }
    ]
  },
];

const actionTypeIcons = {
  'install-app': Smartphone,
  'add-file': File,
  'strip-permissions': Lock,
  'set-background': Image,
  'set-pincode': Hash,
  'enable-wifi': Wifi,
  'disable-camera': Camera,
  'factory-reset': AlertTriangle,
  'install-certificate': Shield,
  'configure-vpn': Activity
};

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevices, setSelectedDevices] = useState(new Set());
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [isWorkflowSheetOpen, setIsWorkflowSheetOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflowSearchTerm, setWorkflowSearchTerm] = useState('');
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [workflowStepProgress, setWorkflowStepProgress] = useState({});

  const handleCheckboxChange = (device, index, event) => {
    event.stopPropagation();
    
    if (event.shiftKey && lastSelectedIndex !== null) {
      // Shift+click range selection on checkboxes
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      const newSelected = new Set(selectedDevices);
      
      for (let i = start; i <= end; i++) {
        newSelected.add(sortedDevices[i].id);
      }
      
      setSelectedDevices(newSelected);
    } else {
      // Regular checkbox toggle
      const newSelected = new Set(selectedDevices);
      if (selectedDevices.has(device.id)) {
        newSelected.delete(device.id);
      } else {
        newSelected.add(device.id);
      }
      setSelectedDevices(newSelected);
      setLastSelectedIndex(index);
    }
  };

  const handleRowClick = (device, index, event) => {
    // Don't trigger if clicking on a button or other interactive element
    if (event.target.tagName === 'BUTTON' || event.target.closest('button')) {
      return;
    }
    
    // Row click should toggle selection instead of opening details
    handleCheckboxChange(device, index, event);
  };

  const handleOpenDetails = (device, event) => {
    event.stopPropagation();
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


  const handleSelectAll = () => {
    if (selectedDevices.size === sortedDevices.length) {
      setSelectedDevices(new Set());
    } else {
      setSelectedDevices(new Set(sortedDevices.map(d => d.id)));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action '${action}' on devices:`, Array.from(selectedDevices));
    // Implement bulk actions here
  };

  const handleWorkflowSelect = (workflow) => {
    setSelectedWorkflow(workflow);
    setWorkflowSearchTerm('');
  };

  const handleWorkflowRemove = () => {
    setSelectedWorkflow(null);
  };

  const handleRunWorkflow = async () => {
    if (!selectedWorkflow) return;
    
    setIsRunningWorkflow(true);
    setWorkflowStepProgress({});
    
    // Simulate step-by-step execution
    for (let i = 0; i < selectedWorkflow.steps.length; i++) {
      // Mark current step as running
      setWorkflowStepProgress(prev => ({
        ...prev,
        [i]: 'running'
      }));
      
      // Simulate step execution time (1-2 seconds per step)
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // Mark step as completed
      setWorkflowStepProgress(prev => ({
        ...prev,
        [i]: 'completed'
      }));
    }
    
    // Wait a moment to show all completed
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsRunningWorkflow(false);
    setIsWorkflowSheetOpen(false);
    setSelectedWorkflow(null);
    setWorkflowSearchTerm('');
    setWorkflowStepProgress({});
    
    console.log(`Running workflow '${selectedWorkflow.workflowName}' on ${selectedDevices.size} devices`);
  };

  const handleCloseWorkflowSheet = () => {
    setIsWorkflowSheetOpen(false);
    setSelectedWorkflow(null);
    setWorkflowSearchTerm('');
    setIsRunningWorkflow(false);
    setWorkflowStepProgress({});
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

  const filteredWorkflows = workflowsData.filter(workflow => {
    if (!workflowSearchTerm) return workflow.status === 'Active';
    const searchLower = workflowSearchTerm.toLowerCase();
    return workflow.status === 'Active' && (
      workflow.workflowName.toLowerCase().includes(searchLower) ||
      workflow.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">DEVICES</h1>
        </div>

        {/* Search Filter and Bulk Actions */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Filter by device number or IMEI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
          
          {selectedDevices.size > 0 && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{selectedDevices.size} selected</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsWorkflowSheetOpen(true)}
                  className="bg-black text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-800 transition-colors flex items-center space-x-1"
                >
                  <Play className="w-3 h-3" />
                  <span>RUN WORKFLOW</span>
                </button>
                <button
                  onClick={() => handleBulkAction('apply-profile')}
                  className="bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-700 transition-colors"
                >
                  APPLY PROFILE
                </button>
                <button
                  onClick={() => setSelectedDevices(new Set())}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
                >
                  CLEAR
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Device Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-xs font-medium text-gray-500 uppercase w-12">
                    <input
                      type="checkbox"
                      checked={selectedDevices.size === sortedDevices.length && sortedDevices.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 checked:bg-blue-600 checked:border-blue-600"
                    />
                  </th>
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
                  <th className="text-right py-4 text-xs font-medium text-gray-500 uppercase w-16">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDevices.map((device, index) => (
                  <tr 
                    key={device.id} 
                    className={`hover:bg-gray-50 cursor-pointer border-t ${
                      selectedDevices.has(device.id) ? 'bg-white font-medium' : ''
                    }`}
                    style={{ borderTopColor: '#f2f2f2' }}
                    onClick={(e) => handleRowClick(device, index, e)}
                  >
                    <td className="py-4 text-sm text-gray-900">
                      <input
                        type="checkbox"
                        checked={selectedDevices.has(device.id)}
                        onChange={(e) => handleCheckboxChange(device, index, e)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 checked:bg-blue-600 checked:border-blue-600"
                      />
                    </td>
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
                    <td className="py-4 text-right">
                      <button
                        onClick={(e) => handleOpenDetails(device, e)}
                        className="bg-white text-gray-400 hover:text-black transition-colors cursor-pointer py-1 pl-12 pr-2 flex items-center justify-end rounded"
                        title="View details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
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

      {/* Workflow Selection Sheet */}
      {isWorkflowSheetOpen && (
        <div className="fixed inset-0 flex items-end justify-end z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
          <div className="bg-white rounded-lg shadow-xl w-96 h-[700px] flex flex-col m-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                {selectedWorkflow && (
                  <button
                    onClick={handleWorkflowRemove}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={isRunningWorkflow}
                  >
                    ←
                  </button>
                )}
                <h3 className="text-sm font-medium text-black uppercase tracking-widest">
                  {selectedWorkflow ? selectedWorkflow.workflowName : 'Run Workflow'}
                </h3>
              </div>
              <button
                onClick={handleCloseWorkflowSheet}
                className="text-gray-400 hover:text-gray-600 text-lg"
                disabled={isRunningWorkflow}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Selected Workflow Steps Display */}
              {selectedWorkflow ? (
                <div className="space-y-4">
                  {/* Workflow Info */}
                  <div className="bg-gray-50 rounded-md p-3">
                    <p className="text-sm font-medium text-gray-900">{selectedWorkflow.workflowName}</p>
                    <p className="text-xs text-gray-500">{selectedWorkflow.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{selectedWorkflow.steps.length} steps</p>
                  </div>

                  {/* Workflow Steps */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Workflow Steps</h4>
                    {selectedWorkflow.steps.map((step, index) => {
                      const stepStatus = workflowStepProgress[index];
                      const isCompleted = stepStatus === 'completed';
                      const isRunning = stepStatus === 'running';
                      const ActionIcon = actionTypeIcons[step.type] || File;
                      
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          {/* Step Icon */}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                            isCompleted 
                              ? 'bg-black border-black text-white' 
                              : isRunning
                              ? 'bg-white border-gray-300 text-gray-600'
                              : 'bg-white border-gray-200 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <Check size={12} />
                            ) : isRunning ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          
                          {/* Step Content */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <ActionIcon size={14} className={`${
                                isCompleted ? 'text-gray-400' 
                                : isRunning ? 'text-gray-600' 
                                : 'text-gray-400'
                              }`} />
                              <p className={`text-sm ${
                                isCompleted ? 'text-black font-medium line-through' 
                                : isRunning ? 'text-black font-medium' 
                                : 'text-gray-500'
                              }`}>
                                {step.title}
                              </p>
                            </div>
                            
                            {/* Configuration Details */}
                            {step.config && Object.keys(step.config).length > 0 && (
                              <div className="mt-1 ml-5 space-y-1">
                                {Object.entries(step.config).map(([key, value]) => (
                                  <p key={key} className={`text-xs ${
                                    isCompleted ? 'text-gray-400 line-through' 
                                    : isRunning ? 'text-gray-600' 
                                    : 'text-gray-400'
                                  }`}>
                                    {key}: {value}
                                  </p>
                                ))}
                              </div>
                            )}
                            
                            {/* Minimal Progress Indicator */}
                            {isRunning && (
                              <div className="mt-2 ml-5 w-full bg-gray-100 rounded-full h-0.5">
                                <div className="bg-gray-400 h-0.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  {/* Search */}
                  <div>
                    <input
                      type="text"
                      placeholder="Search workflows..."
                      value={workflowSearchTerm}
                      onChange={(e) => setWorkflowSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  </div>

                  {/* Workflow List */}
                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {filteredWorkflows.length > 0 ? (
                      filteredWorkflows.map((workflow) => (
                        <div
                          key={workflow.id}
                          onClick={() => handleWorkflowSelect(workflow)}
                          className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{workflow.workflowName}</p>
                              <p className="text-xs text-gray-500">{workflow.description}</p>
                            </div>
                            <span className="text-xs text-gray-400">{workflow.actions} actions</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No active workflows found</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {selectedWorkflow && (
              <div className="p-4 border-t">
                <button
                  onClick={handleRunWorkflow}
                  disabled={isRunningWorkflow}
                  className="w-full bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isRunningWorkflow ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Running...
                    </>
                  ) : (
                    'Run'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
}