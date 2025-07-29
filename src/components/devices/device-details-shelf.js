'use client';

import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
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

export default function DeviceDetailsShelf({ device, isOpen, onClose }) {
  const [isWipeDialogOpen, setIsWipeDialogOpen] = useState(false);
  const [isWorkflowSheetOpen, setIsWorkflowSheetOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);

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
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 pb-20">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {/* Device Info */}
              <div>
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
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Status
                </h3>
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

              {/* Installed Apps */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Installed Apps
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-900">Slack</span>
                    <span className="text-xs text-gray-500">v4.29.0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-900">Microsoft Teams</span>
                    <span className="text-xs text-gray-500">v2.5.0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-900">Zoom</span>
                    <span className="text-xs text-gray-500">v5.12.1</span>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Security
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Passcode</label>
                    <p className="text-sm text-green-600 font-medium">Enabled</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Encryption</label>
                    <p className="text-sm text-green-600 font-medium">Active</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Jailbroken</label>
                    <p className="text-sm text-gray-900">No</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <button 
                className="bg-black text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-800 transition-colors flex items-center space-x-1"
                onClick={handleRunWorkflow}
              >
                <Play className="w-3 h-3" />
                <span>RUN WORKFLOW</span>
              </button>
              <button 
                className="bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-700 transition-colors"
              >
                APPLY PROFILE
              </button>
              <button 
                className="bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 transition-colors"
                onClick={handleWipeClick}
              >
                REMOVE DEVICE
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
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Select a workflow to run on {device?.deviceNumber}:</p>
                  {workflowsData.map((workflow) => (
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

            {/* Footer */}
            <div className="p-4 border-t">
              {selectedWorkflow && (
                <button
                  onClick={handleWorkflowRun}
                  disabled={isRunningWorkflow}
                  className="w-full bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunningWorkflow ? 'Running...' : 'Run Workflow'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}