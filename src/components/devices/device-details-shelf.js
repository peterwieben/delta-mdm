'use client';

import { useEffect, useState } from 'react';
import { Play, X, Zap } from 'lucide-react';
import WipeDialog from './wipe-dialog';

// Workflow data (same as devices page)
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
    actions: 2,
    status: 'Active',
    lastModified: '2025-07-24',
    steps: [
      {
        id: 'step-1',
        type: 'strip-permissions',
        title: 'Revoke Unused Permissions',
        config: {}
      },
      {
        id: 'step-2',
        type: 'install-certificate',
        title: 'Install Security Certificate',
        config: {}
      }
    ]
  }
];

// Available actions (from workflow builder)
const availableActions = [
  {
    id: 'install-app',
    title: 'Install App',
    description: 'Install an application on the device',
    icon: '📱',
    requiresConfig: true
  },
  {
    id: 'add-file',
    title: 'Add File',
    description: 'Copy a file to the device',
    icon: '📄',
    requiresConfig: true
  },
  {
    id: 'strip-permissions',
    title: 'Strip Permissions',
    description: 'Remove specific app permissions',
    icon: '🔒',
    requiresConfig: false
  },
  {
    id: 'set-background',
    title: 'Set Background',
    description: 'Set device wallpaper',
    icon: '🖼️',
    requiresConfig: true
  },
  {
    id: 'set-pincode',
    title: 'Set PIN Code',
    description: 'Configure device PIN requirements',
    icon: '🔢',
    requiresConfig: true
  },
  {
    id: 'enable-wifi',
    title: 'Enable WiFi',
    description: 'Configure and connect to WiFi',
    icon: '📶',
    requiresConfig: true
  },
  {
    id: 'disable-camera',
    title: 'Disable Camera',
    description: 'Disable device camera access',
    icon: '📷',
    requiresConfig: false
  },
  {
    id: 'factory-reset',
    title: 'Factory Reset',
    description: 'Perform complete device wipe',
    icon: '⚠️',
    requiresConfig: false
  },
  {
    id: 'install-certificate',
    title: 'Install Certificate',
    description: 'Install security certificate',
    icon: '🔐',
    requiresConfig: true
  },
  {
    id: 'configure-vpn',
    title: 'Configure VPN',
    description: 'Set up VPN connection',
    icon: '🛡️',
    requiresConfig: true
  }
];

// Sample device history data
const deviceHistory = [
  {
    id: 1,
    action: 'Install App',
    details: 'Installed Slack v4.29.0',
    user: 'admin@company.com',
    timestamp: '2025-07-29 14:30:00',
    status: 'success'
  },
  {
    id: 2,
    action: 'Set PIN Code',
    details: 'Updated device PIN requirements to 6 digits, high complexity',
    user: 'security@company.com',
    timestamp: '2025-07-29 10:15:00',
    status: 'success'
  },
  {
    id: 3,
    action: 'Install Certificate',
    details: 'Installed corporate security certificate',
    user: 'admin@company.com',
    timestamp: '2025-07-28 16:45:00',
    status: 'success'
  },
  {
    id: 4,
    action: 'Configure VPN',
    details: 'Set up corporate VPN connection',
    user: 'network@company.com',
    timestamp: '2025-07-28 09:20:00',
    status: 'failed'
  },
  {
    id: 5,
    action: 'Device Enrollment',
    details: 'Device enrolled in Delta MDM system',
    user: 'system',
    timestamp: '2025-07-27 11:00:00',
    status: 'success'
  }
];

export default function DeviceDetailsShelf({ device, isOpen, onClose }) {
  const [isWipeDialogOpen, setIsWipeDialogOpen] = useState(false);
  const [isWorkflowSheetOpen, setIsWorkflowSheetOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [workflowSearchTerm, setWorkflowSearchTerm] = useState('');
  
  // Action states
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [actionSearchTerm, setActionSearchTerm] = useState('');
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [actionConfig, setActionConfig] = useState({});
  const [isRunningAction, setIsRunningAction] = useState(false);
  
  // Tab state
  const [activeTab, setActiveTab] = useState('basics');

  const handleWipeClick = () => {
    setIsWipeDialogOpen(true);
  };

  const handleWipeDialogClose = () => {
    setIsWipeDialogOpen(false);
  };

  const handleRunWorkflow = () => {
    setIsWorkflowSheetOpen(true);
  };

  const handleCloseWorkflowSheet = () => {
    setIsWorkflowSheetOpen(false);
    setSelectedWorkflow(null);
    setIsRunningWorkflow(false);
    setWorkflowSearchTerm('');
  };

  const handleWorkflowSelect = (workflow) => {
    setSelectedWorkflow(workflow);
  };

  const handleWorkflowRun = () => {
    setIsRunningWorkflow(true);
    console.log(`Running workflow '${selectedWorkflow.workflowName}' on device ${device.deviceNumber}`);
    
    // Simulate workflow execution
    setTimeout(() => {
      setIsRunningWorkflow(false);
      setIsWorkflowSheetOpen(false);
      setSelectedWorkflow(null);
    }, 3000);
  };

  // Action handlers
  const handleRunAction = () => {
    setIsActionSheetOpen(true);
  };

  const handleCloseActionSheet = () => {
    setIsActionSheetOpen(false);
    setSelectedAction(null);
    setActionSearchTerm('');
    setShowConfigDialog(false);
    setActionConfig({});
    setIsRunningAction(false);
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setActionConfig({});
  };

  const handleActionRun = () => {
    setIsRunningAction(true);
    console.log(`Running action '${selectedAction.title}' on device ${device.deviceNumber}`, actionConfig);
    
    // Simulate action execution
    setTimeout(() => {
      setIsRunningAction(false);
      setIsActionSheetOpen(false);
      setSelectedAction(null);
      setActionConfig({});
      setShowConfigDialog(false);
    }, 2000);
  };

  // Helper function to check if action is properly configured
  const isActionConfigured = (action) => {
    if (!action.requiresConfig) return true;
    
    const config = actionConfig;
    switch (action.id) {
      case 'install-app':
        return config.appName && config.packageName;
      case 'add-file':
        return config.fileName && config.destination;
      case 'set-background':
        return config.imageUrl;
      case 'set-pincode':
        return config.pinLength && config.complexity;
      case 'enable-wifi':
        return config.ssid && config.password;
      case 'install-certificate':
        return config.certPath;
      case 'configure-vpn':
        return config.server && config.username;
      default:
        return false;
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !device) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        onClick={onClose}
      />
      
      {/* Shelf */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '480px' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-black uppercase tracking-wide">
              {device.deviceNumber}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {['basics', 'build', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium uppercase tracking-wide border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto pb-20">
            {activeTab === 'basics' && (
              <div className="p-6 space-y-6">
                {/* Device Info */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Device Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Device Number</label>
                      <p className="text-sm text-gray-900 font-medium">{device.deviceNumber}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Status</label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: 
                              device.status === 'good' ? '#16a34a' :
                              device.status === 'warning' ? '#f59e0b' :
                              device.status === 'alert' ? '#dc2626' : '#gray-400'
                          }}
                        ></div>
                        <p className="text-sm text-gray-900 capitalize">{device.status}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Code</label>
                      <p className="text-sm text-gray-900">{device.code}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">User</label>
                      <p className="text-sm text-gray-900 font-mono break-all">{device.user}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Last Updated</label>
                      <p className="text-sm text-gray-900">{device.dateLastUpdated}</p>
                    </div>
                  </div>
                </div>

                {/* Device Status */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Device Status</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Connection</label>
                      <p className="text-sm text-green-600 font-medium">Online</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Battery</label>
                      <p className="text-sm text-gray-900">87%</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Storage</label>
                      <p className="text-sm text-gray-900">64GB / 128GB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'build' && (
              <div className="p-6 space-y-6">
                {/* Profile Settings */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Profile & Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Profile</label>
                      <select 
                        defaultValue={device.build}
                        className="w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="Gold">Gold</option>
                        <option value="Blue">Blue</option>
                        <option value="Red">Red</option>
                        <option value="Black">Black</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Installed Apps */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Installed Apps</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm">💬</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Slack</p>
                          <p className="text-xs text-gray-500">v4.29.0</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Installed</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm">📧</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Outlook</p>
                          <p className="text-xs text-gray-500">v4.2242.0</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Installed</span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm">🌐</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Chrome</p>
                          <p className="text-xs text-gray-500">v131.0.6778</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Installed</span>
                    </div>
                  </div>
                </div>

                {/* Security Policies */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Security Policies</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">PIN Required</label>
                      <p className="text-sm text-gray-900">Yes</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wide">Camera Disabled</label>
                      <p className="text-sm text-gray-900">No</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Action History</h3>
                <div className="space-y-3">
                  {deviceHistory.map((entry) => (
                    <div key={entry.id} className="relative border border-gray-200 rounded-lg p-3">
                      <div className="absolute top-3 right-3">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: 
                              entry.status === 'success' ? '#16a34a' :
                              entry.status === 'failed' ? '#dc2626' : '#gray-400'
                          }}
                        ></div>
                      </div>
                      <div className="pr-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{entry.action}</h4>
                        <p className="text-xs text-gray-600 mb-2">{entry.details}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>By: {entry.user}</span>
                          <span>{entry.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions Menu */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <button 
                className="bg-black text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-800 transition-colors flex items-center space-x-1 cursor-pointer"
                onClick={handleRunWorkflow}
              >
                <Play className="w-3 h-3" />
                <span>RUN WORKFLOW</span>
              </button>
              <button 
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
              >
                APPLY PROFILE
              </button>
              <button 
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                onClick={handleRunAction}
              >
                RUN ACTION
              </button>
            </div>
          </div>

          {/* Wipe Dialog */}
          <WipeDialog
            device={device}
            isOpen={isWipeDialogOpen}
            onClose={handleWipeDialogClose}
          />
        </div>
      </div>

      {/* Workflow Sheet */}
      {isWorkflowSheetOpen && (
        <div className="fixed inset-0 flex items-end justify-end z-60" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
          <div className="bg-white rounded-lg shadow-xl w-96 h-[700px] flex flex-col m-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                {selectedWorkflow && (
                  <button
                    onClick={() => setSelectedWorkflow(null)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
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
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                disabled={isRunningWorkflow}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {selectedWorkflow ? (
                <div className="space-y-4">
                  {/* Workflow Info */}
                  <div className="bg-gray-50 rounded-md p-3">
                    <p className="text-sm font-medium text-gray-900">{selectedWorkflow.workflowName}</p>
                    <p className="text-xs text-gray-500">{selectedWorkflow.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{selectedWorkflow.steps.length} steps</p>
                  </div>

                  {/* Device Context */}
                  <div className="bg-blue-50 rounded-md p-3">
                    <p className="text-sm font-medium text-blue-900">Target Device</p>
                    <p className="text-xs text-blue-700">{device?.deviceNumber}</p>
                    <p className="text-xs text-blue-600">{device?.build} build</p>
                  </div>

                  {/* Workflow Steps */}
                  <div className="space-y-2">
                    {selectedWorkflow.steps.map((step, index) => (
                      <div key={step.id} className="bg-white border border-gray-200 rounded-md p-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{step.title}</p>
                            <p className="text-xs text-gray-500">Type: {step.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Run Workflow Button */}
                  {selectedWorkflow && (
                    <div className="mt-6">
                      <button
                        onClick={handleWorkflowRun}
                        disabled={isRunningWorkflow}
                        className="w-full bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isRunningWorkflow ? 'Running...' : 'RUN WORKFLOW'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Select a workflow to run on {device?.deviceNumber}:</p>
                  
                  {/* Search Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Filter workflows..."
                      value={workflowSearchTerm}
                      onChange={(e) => setWorkflowSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  </div>

                  {/* Filtered Workflows */}
                  {workflowsData
                    .filter(workflow => 
                      workflowSearchTerm === '' || 
                      workflow.workflowName.toLowerCase().includes(workflowSearchTerm.toLowerCase()) ||
                      workflow.description.toLowerCase().includes(workflowSearchTerm.toLowerCase())
                    )
                    .map((workflow) => (
                    <div
                      key={workflow.id}
                      onClick={() => handleWorkflowSelect(workflow)}
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-900">{workflow.workflowName}</h4>
                      <p className="text-xs text-gray-500 mt-1">{workflow.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{workflow.steps.length} steps</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Action Sheet */}
      {isActionSheetOpen && (
        <div className="fixed inset-0 flex items-end justify-end z-60" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
          <div className="bg-white rounded-lg shadow-xl w-96 h-[700px] flex flex-col m-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                {selectedAction && (
                  <button
                    onClick={() => setSelectedAction(null)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    disabled={isRunningAction}
                  >
                    ←
                  </button>
                )}
                <h3 className="text-sm font-medium text-black uppercase tracking-widest">
                  {selectedAction ? selectedAction.title : 'Run Action'}
                </h3>
              </div>
              <button
                onClick={handleCloseActionSheet}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                disabled={isRunningAction}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {selectedAction ? (
                <div className="space-y-4">
                  {/* Action Info */}
                  <div className="bg-gray-50 rounded-md p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{selectedAction.icon}</span>
                      <p className="text-sm font-medium text-gray-900">{selectedAction.title}</p>
                    </div>
                    <p className="text-xs text-gray-500">{selectedAction.description}</p>
                  </div>

                  {/* Device Context */}
                  <div className="bg-blue-50 rounded-md p-3">
                    <p className="text-sm font-medium text-blue-900">Target Device</p>
                    <p className="text-xs text-blue-700">{device?.deviceNumber}</p>
                    <p className="text-xs text-blue-600">{device?.build} build</p>
                  </div>

                  {/* Dynamic Status Section */}
                  {selectedAction.requiresConfig ? (
                    isActionConfigured(selectedAction) ? (
                      <div className="bg-green-50 rounded-md p-3">
                        <p className="text-sm font-medium text-green-900">Action Ready</p>
                        <p className="text-xs text-green-700">Configuration complete and ready to run.</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 rounded-md p-3">
                        <p className="text-sm font-medium text-yellow-900">Configuration Needed</p>
                        <p className="text-xs text-yellow-700">Please complete the configuration below to proceed.</p>
                      </div>
                    )
                  ) : (
                    <div className="bg-green-50 rounded-md p-3">
                      <p className="text-sm font-medium text-green-900">Action Ready</p>
                      <p className="text-xs text-green-700">This action requires no configuration and is ready to run.</p>
                    </div>
                  )}

                  {/* Inline Configuration */}
                  {selectedAction.requiresConfig && (
                    <div className="bg-white border border-gray-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">{selectedAction.title} Configuration</h4>
                      
                      <div className="space-y-4">
                        {selectedAction.id === 'install-app' && (
                          <>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">App Name</label>
                              <input
                                type="text"
                                value={actionConfig.appName || ''}
                                onChange={(e) => setActionConfig({...actionConfig, appName: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="Enter app name"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">Package Name</label>
                              <input
                                type="text"
                                value={actionConfig.packageName || ''}
                                onChange={(e) => setActionConfig({...actionConfig, packageName: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="com.example.app"
                              />
                            </div>
                          </>
                        )}
                        
                        {selectedAction.id === 'add-file' && (
                          <>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">File Name</label>
                              <input
                                type="text"
                                value={actionConfig.fileName || ''}
                                onChange={(e) => setActionConfig({...actionConfig, fileName: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="filename.ext"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">Destination</label>
                              <input
                                type="text"
                                value={actionConfig.destination || ''}
                                onChange={(e) => setActionConfig({...actionConfig, destination: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="/path/to/destination/"
                              />
                            </div>
                          </>
                        )}
                        
                        {selectedAction.id === 'set-background' && (
                          <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wide">Image URL</label>
                            <input
                              type="text"
                              value={actionConfig.imageUrl || ''}
                              onChange={(e) => setActionConfig({...actionConfig, imageUrl: e.target.value})}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                              placeholder="https://example.com/background.jpg"
                            />
                          </div>
                        )}
                        
                        {selectedAction.id === 'set-pincode' && (
                          <>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">PIN Length</label>
                              <select
                                value={actionConfig.pinLength || '4'}
                                onChange={(e) => setActionConfig({...actionConfig, pinLength: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                              >
                                <option value="4">4 digits</option>
                                <option value="6">6 digits</option>
                                <option value="8">8 digits</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">Complexity</label>
                              <select
                                value={actionConfig.complexity || 'medium'}
                                onChange={(e) => setActionConfig({...actionConfig, complexity: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                          </>
                        )}

                        {selectedAction.id === 'enable-wifi' && (
                          <>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">Network Name (SSID)</label>
                              <input
                                type="text"
                                value={actionConfig.ssid || ''}
                                onChange={(e) => setActionConfig({...actionConfig, ssid: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="WiFi Network Name"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">Password</label>
                              <input
                                type="password"
                                value={actionConfig.password || ''}
                                onChange={(e) => setActionConfig({...actionConfig, password: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="WiFi Password"
                              />
                            </div>
                          </>
                        )}

                        {selectedAction.id === 'install-certificate' && (
                          <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wide">Certificate File Path</label>
                            <input
                              type="text"
                              value={actionConfig.certPath || ''}
                              onChange={(e) => setActionConfig({...actionConfig, certPath: e.target.value})}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                              placeholder="/path/to/certificate.pem"
                            />
                          </div>
                        )}

                        {selectedAction.id === 'configure-vpn' && (
                          <>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">VPN Server</label>
                              <input
                                type="text"
                                value={actionConfig.server || ''}
                                onChange={(e) => setActionConfig({...actionConfig, server: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="vpn.company.com"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 uppercase tracking-wide">Username</label>
                              <input
                                type="text"
                                value={actionConfig.username || ''}
                                onChange={(e) => setActionConfig({...actionConfig, username: e.target.value})}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                                placeholder="VPN Username"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Run Action Button */}
                  {selectedAction && (
                    <div className="mt-6">
                      <button
                        onClick={handleActionRun}
                        disabled={isRunningAction || !isActionConfigured(selectedAction)}
                        className="w-full bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isRunningAction ? 'Running...' : 'RUN ACTION'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Select an action to run on {device?.deviceNumber}:</p>
                  
                  {/* Search Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Filter actions..."
                      value={actionSearchTerm}
                      onChange={(e) => setActionSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  </div>

                  {/* Filtered Actions */}
                  {availableActions
                    .filter(action => 
                      actionSearchTerm === '' || 
                      action.title.toLowerCase().includes(actionSearchTerm.toLowerCase()) ||
                      action.description.toLowerCase().includes(actionSearchTerm.toLowerCase())
                    )
                    .map((action) => (
                    <div
                      key={action.id}
                      onClick={() => handleActionSelect(action)}
                      className="relative border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-lg">{action.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                        </div>
                      </div>
                      {action.requiresConfig && (
                        <div className="absolute top-2 right-2">
                          <Zap className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </>
  );
}