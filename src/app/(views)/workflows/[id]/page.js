'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { GripVertical, Plus, Settings, X, Zap } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';

const workflowData = {
  1: {
    id: 1,
    workflowName: 'Device Setup',
    description: 'Complete onboarding workflow for new corporate devices',
    status: 'Active',
    lastModified: '2025-07-25',
    steps: [
      {
        id: 'step-1',
        type: 'install-app',
        title: 'Install Corporate VPN',
        config: { appId: 'vpn-client', appName: 'Corporate VPN' },
        order: 1
      },
      {
        id: 'step-2',
        type: 'set-pincode',
        title: 'Set Device PIN',
        config: { pinLength: 6, complexity: 'high' },
        order: 2
      },
      {
        id: 'step-3',
        type: 'add-file',
        title: 'Install Certificate',
        config: { fileName: 'corporate-cert.pem', destination: '/system/certs/' },
        order: 3
      }
    ]
  },
  2: {
    id: 2,
    workflowName: 'Security Compliance',
    description: 'Enforce security policies and compliance checks',
    status: 'Active',
    lastModified: '2025-07-24',
    steps: []
  },
  3: {
    id: 3,
    workflowName: 'App Deployment',
    description: 'Batch installation of corporate applications',
    status: 'Draft',
    lastModified: '2025-07-23',
    steps: []
  }
};

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

export default function WorkflowDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const workflow = workflowData[resolvedParams.id];
  
  const [workflowSteps, setWorkflowSteps] = useState(workflow?.steps || []);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [configStep, setConfigStep] = useState(null);
  const [stepConfig, setStepConfig] = useState({});
  const [actionSearchTerm, setActionSearchTerm] = useState('');

  if (!workflow) {
    return (
      <MainLayout>
        <div className="p-6">
          <p>Workflow not found</p>
        </div>
      </MainLayout>
    );
  }

  const handleDragStart = (e, item, source) => {
    setDraggedItem({ ...item, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex = null) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const newStep = {
      id: `step-${Date.now()}`,
      type: draggedItem.id,
      title: draggedItem.title,
      config: {},
      order: targetIndex !== null ? targetIndex : workflowSteps.length + 1
    };

    if (draggedItem.source === 'actions') {
      if (draggedItem.requiresConfig) {
        setConfigStep(newStep);
        setStepConfig({});
        setShowConfigDialog(true);
      } else {
        const newSteps = [...workflowSteps];
        if (targetIndex !== null) {
          newSteps.splice(targetIndex, 0, newStep);
        } else {
          newSteps.push(newStep);
        }
        setWorkflowSteps(newSteps);
      }
    } else if (draggedItem.source === 'reorder') {
      const newSteps = [...workflowSteps];
      const currentIndex = newSteps.findIndex(step => step.id === draggedItem.id);
      const [movedStep] = newSteps.splice(currentIndex, 1);
      
      if (targetIndex !== null) {
        newSteps.splice(targetIndex, 0, movedStep);
      } else {
        newSteps.push(movedStep);
      }
      
      setWorkflowSteps(newSteps);
    }

    setDraggedItem(null);
  };

  const handleConfigSave = () => {
    if (configStep) {
      const newSteps = [...workflowSteps, { ...configStep, config: stepConfig }];
      setWorkflowSteps(newSteps);
    }
    setShowConfigDialog(false);
    setConfigStep(null);
    setStepConfig({});
  };

  const removeStep = (stepId) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
  };

  const renderConfigDialog = () => {
    if (!configStep) return null;

    const actionType = configStep.type;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Configure {configStep.title}</h3>
            <button
              onClick={() => setShowConfigDialog(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            {actionType === 'install-app' && (
              <>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">App Name</label>
                  <input
                    type="text"
                    value={stepConfig.appName || ''}
                    onChange={(e) => setStepConfig({...stepConfig, appName: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                    placeholder="Enter app name"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Package Name</label>
                  <input
                    type="text"
                    value={stepConfig.packageName || ''}
                    onChange={(e) => setStepConfig({...stepConfig, packageName: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                    placeholder="com.example.app"
                  />
                </div>
              </>
            )}
            
            {actionType === 'add-file' && (
              <>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">File Name</label>
                  <input
                    type="text"
                    value={stepConfig.fileName || ''}
                    onChange={(e) => setStepConfig({...stepConfig, fileName: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                    placeholder="filename.ext"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Destination</label>
                  <input
                    type="text"
                    value={stepConfig.destination || ''}
                    onChange={(e) => setStepConfig({...stepConfig, destination: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                    placeholder="/path/to/destination/"
                  />
                </div>
              </>
            )}
            
            {actionType === 'set-pincode' && (
              <>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">PIN Length</label>
                  <select
                    value={stepConfig.pinLength || '4'}
                    onChange={(e) => setStepConfig({...stepConfig, pinLength: e.target.value})}
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
                    value={stepConfig.complexity || 'medium'}
                    onChange={(e) => setStepConfig({...stepConfig, complexity: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </>
            )}
            
            {actionType === 'set-background' && (
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Image URL</label>
                <input
                  type="text"
                  value={stepConfig.imageUrl || ''}
                  onChange={(e) => setStepConfig({...stepConfig, imageUrl: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  placeholder="https://example.com/background.jpg"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowConfigDialog(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfigSave}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
            >
              Add Step
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-8 pb-8">
        {/* Back Button and Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/workflows')}
            className="text-xs text-gray-600 hover:text-black transition-colors uppercase tracking-wide cursor-pointer"
          >
            ← WORKFLOWS
          </button>
        </div>

        {/* Top Info Section */}
        <div className="pb-4">
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">
            {workflow.workflowName}
          </h1>
          <p className="text-sm text-gray-600 mt-2">{workflow.description}</p>
          
          <div className="grid grid-cols-3 gap-8 mt-6">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Status</label>
              <p className="text-sm text-gray-900">{workflow.status}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Actions</label>
              <p className="text-sm text-gray-900">{workflowSteps.length} steps</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Last Modified</label>
              <p className="text-sm text-gray-900">{workflow.lastModified}</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Workflow Builder */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Workflow Builder
              </h2>
              
              <div 
                className="min-h-96 space-y-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e)}
              >
                {workflowSteps.length === 0 ? (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <Plus className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Drag actions here to build your workflow</p>
                    </div>
                  </div>
                ) : (
                  workflowSteps.map((step, index) => (
                    <div
                      key={step.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, step, 'reorder')}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 cursor-move"
                    >
                      <div className="flex items-center space-x-3">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                          <p className="text-xs text-gray-500">
                            Type: {availableActions.find(a => a.id === step.type)?.title || step.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setConfigStep(step);
                            setStepConfig(step.config || {});
                            setShowConfigDialog(true);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Settings size={16} />
                        </button>
                        <button
                          onClick={() => removeStep(step.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Available Actions */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Available Actions
              </h2>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Filter actions..."
                  value={actionSearchTerm}
                  onChange={(e) => setActionSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                {availableActions
                  .filter(action => 
                    actionSearchTerm === '' || 
                    action.title.toLowerCase().includes(actionSearchTerm.toLowerCase()) ||
                    action.description.toLowerCase().includes(actionSearchTerm.toLowerCase())
                  )
                  .map((action) => (
                  <div
                    key={action.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, action, 'actions')}
                    className="relative border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-move transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">{action.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
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
            </div>
          </div>
        </div>

        {showConfigDialog && renderConfigDialog()}
      </div>
    </MainLayout>
  );
}