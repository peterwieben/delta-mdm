'use client';

import { useState, use, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';

// Sample detailed profile data
const profileData = {
  1: {
    id: 1,
    profileName: 'Enterprise Security',
    type: 'Security',
    status: 'Active',
    description: 'Comprehensive security profile for enterprise devices with advanced threat protection and compliance monitoring.',
    devices: 25,
    dateCreated: '2025-06-15',
    dateModified: '2025-07-25',
    apps: [
      {
        id: 1,
        name: 'Secure Messenger',
        packageName: 'com.enterprise.messenger',
        version: '2.4.1',
        size: '45.2 MB',
        status: 'Required',
        description: 'End-to-end encrypted messaging for secure communications'
      },
      {
        id: 2,
        name: 'VPN Client',
        packageName: 'com.enterprise.vpn',
        version: '1.8.3',
        size: '12.8 MB',
        status: 'Required',
        description: 'Corporate VPN access with multi-factor authentication'
      },
      {
        id: 3,
        name: 'Document Scanner',
        packageName: 'com.enterprise.scanner',
        version: '3.1.0',
        size: '78.5 MB',
        status: 'Optional',
        description: 'Secure document scanning with OCR capabilities'
      },
      {
        id: 4,
        name: 'Password Manager',
        packageName: 'com.enterprise.passwords',
        version: '4.2.7',
        size: '32.1 MB',
        status: 'Required',
        description: 'Enterprise password management and vault'
      }
    ],
    settings: {
      security: {
        passwordPolicy: {
          minLength: 12,
          requireSpecialChars: true,
          requireNumbers: true,
          requireUppercase: true,
          maxAttempts: 3,
          lockoutDuration: 300
        },
        encryption: {
          deviceEncryption: true,
          storageEncryption: true,
          communicationEncryption: true
        },
        biometrics: {
          fingerprintEnabled: true,
          faceRecognitionEnabled: false,
          voiceRecognitionEnabled: false
        }
      },
      network: {
        wifiRestrictions: {
          allowPublicWifi: false,
          requireCorporateWifi: true,
          vpnAlwaysOn: true
        },
        dataUsage: {
          monthlyLimit: 10240,
          backgroundDataRestricted: true,
          roamingDisabled: true
        }
      },
      applications: {
        installRestrictions: {
          allowUnknownSources: false,
          requireApproval: true,
          blacklistedCategories: ['Games', 'Social', 'Dating']
        },
        permissions: {
          cameraAccess: 'Restricted',
          microphoneAccess: 'Restricted',
          locationAccess: 'Required Apps Only'
        }
      },
      device: {
        hardware: {
          cameraDisabled: false,
          usbDebuggingDisabled: true,
          screenshotDisabled: true,
          bluetoothRestricted: true
        },
        system: {
          systemUpdatesForced: true,
          rootDetectionEnabled: true,
          developerOptionsDisabled: true,
          factoryResetProtection: true
        }
      }
    }
  },
  2: {
    id: 2,
    profileName: 'Sales Team WiFi',
    type: 'WiFi',
    status: 'Active',
    description: 'WiFi configuration profile for sales team with secure access to corporate networks and guest restrictions.',
    devices: 12,
    dateCreated: '2025-05-20',
    dateModified: '2025-07-22',
    apps: [
      {
        id: 1,
        name: 'WiFi Manager Pro',
        packageName: 'com.sales.wifimanager',
        version: '1.5.2',
        size: '8.3 MB',
        status: 'Required',
        description: 'Advanced WiFi management with auto-connect features'
      },
      {
        id: 2,
        name: 'Network Analyzer',
        packageName: 'com.sales.netanalyzer',
        version: '2.1.0',
        size: '15.7 MB',
        status: 'Optional',
        description: 'Network diagnostics and troubleshooting tools'
      }
    ],
    settings: {
      security: {
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: false,
          requireNumbers: true,
          requireUppercase: false,
          maxAttempts: 5,
          lockoutDuration: 180
        },
        encryption: {
          deviceEncryption: false,
          storageEncryption: true,
          communicationEncryption: true
        }
      },
      network: {
        wifiRestrictions: {
          allowPublicWifi: true,
          requireCorporateWifi: false,
          vpnAlwaysOn: false
        },
        dataUsage: {
          monthlyLimit: 15360,
          backgroundDataRestricted: false,
          roamingDisabled: false
        }
      }
    }
  },
  3: {
    id: 3,
    profileName: 'Developer VPN',
    type: 'VPN',
    status: 'Inactive',
    description: 'VPN access profile for development team with secure tunneling to internal resources and testing environments.',
    devices: 8,
    dateCreated: '2025-04-10',
    dateModified: '2025-06-30',
    apps: [
      {
        id: 1,
        name: 'Corporate VPN',
        packageName: 'com.dev.vpnclient',
        version: '3.2.1',
        size: '22.4 MB',
        status: 'Required',
        description: 'Enterprise VPN client with multi-protocol support'
      },
      {
        id: 2,
        name: 'SSH Terminal',
        packageName: 'com.dev.sshterminal',
        version: '1.8.5',
        size: '12.1 MB',
        status: 'Required',
        description: 'Secure shell access for remote server management'
      },
      {
        id: 3,
        name: 'Code Editor',
        packageName: 'com.dev.codeeditor',
        version: '4.1.3',
        size: '95.2 MB',
        status: 'Optional',
        description: 'Mobile code editor with syntax highlighting'
      }
    ],
    settings: {
      security: {
        passwordPolicy: {
          minLength: 10,
          requireSpecialChars: true,
          requireNumbers: true,
          requireUppercase: true,
          maxAttempts: 5,
          lockoutDuration: 240
        }
      },
      network: {
        wifiRestrictions: {
          allowPublicWifi: false,
          requireCorporateWifi: true,
          vpnAlwaysOn: true
        }
      }
    }
  },
  4: {
    id: 4,
    profileName: 'Email Configuration',
    type: 'Email',
    status: 'Active',
    description: 'Corporate email configuration with Exchange integration, calendar sync, and security policies.',
    devices: 45,
    dateCreated: '2025-03-05',
    dateModified: '2025-07-20',
    apps: [
      {
        id: 1,
        name: 'Corporate Email',
        packageName: 'com.corp.email',
        version: '6.4.2',
        size: '67.8 MB',
        status: 'Required',
        description: 'Enterprise email client with Exchange support'
      },
      {
        id: 2,
        name: 'Calendar Sync',
        packageName: 'com.corp.calendar',
        version: '3.1.7',
        size: '28.3 MB',
        status: 'Required',
        description: 'Corporate calendar with meeting scheduling'
      },
      {
        id: 3,
        name: 'Contacts Manager',
        packageName: 'com.corp.contacts',
        version: '2.5.1',
        size: '19.2 MB',
        status: 'Optional',
        description: 'Enterprise contact management system'
      }
    ],
    settings: {
      security: {
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: false,
          requireNumbers: true,
          requireUppercase: true,
          maxAttempts: 4,
          lockoutDuration: 300
        }
      }
    }
  },
  5: {
    id: 5,
    profileName: 'App Restrictions',
    type: 'Restrictions',
    status: 'Pending',
    description: 'Application restriction profile with whitelist/blacklist management and parental controls for corporate devices.',
    devices: 30,
    dateCreated: '2025-02-15',
    dateModified: '2025-07-18',
    apps: [
      {
        id: 1,
        name: 'App Control Center',
        packageName: 'com.restriction.appcontrol',
        version: '2.3.4',
        size: '35.6 MB',
        status: 'Required',
        description: 'Application management and restriction controls'
      }
    ],
    settings: {
      applications: {
        installRestrictions: {
          allowUnknownSources: false,
          requireApproval: true,
          blacklistedCategories: ['Games', 'Social', 'Dating', 'Entertainment']
        },
        permissions: {
          cameraAccess: 'Admin Only',
          microphoneAccess: 'Restricted',
          locationAccess: 'Disabled'
        }
      },
      device: {
        hardware: {
          cameraDisabled: true,
          usbDebuggingDisabled: true,
          screenshotDisabled: true,
          bluetoothRestricted: true
        }
      }
    }
  }
};

export default function ProfileDetailPage({ params }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('apps');
  const [showAddAppDialog, setShowAddAppDialog] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', description: '', app: '' });
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [appToRemove, setAppToRemove] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);
  
  const resolvedParams = use(params);
  const profile = profileData[resolvedParams.id];

  if (!profile) {
    return (
      <MainLayout>
        <div className="p-6">
          <p>Profile not found</p>
        </div>
      </MainLayout>
    );
  }

  const tabs = [
    { id: 'apps', label: 'Apps' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <MainLayout>
      <div className="space-y-8 pb-8">
        {/* Back Button and Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/profiles')}
            className="text-xs text-gray-600 hover:text-black transition-colors uppercase tracking-wide cursor-pointer"
          >
            ← PROFILES
          </button>
        </div>

        <div className="pb-4">
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">
            {profile.profileName}
          </h1>
          <p className="text-sm text-gray-600 mt-2">{profile.description}</p>
        </div>

        {/* Profile Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Type</label>
              <p className="text-sm text-gray-900">{profile.type}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Status</label>
              <p className="text-sm text-gray-900">{profile.status}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Devices</label>
              <p className="text-sm text-gray-900">{profile.devices} devices</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Created</label>
              <p className="text-sm text-gray-900">{profile.dateCreated}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wide">Last Modified</label>
              <p className="text-sm text-gray-900">{profile.dateModified}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm uppercase tracking-wide transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Profile Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Type</label>
                  <p className="text-sm text-gray-900">{profile.type}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Status</label>
                  <p className="text-sm text-gray-900">{profile.status}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Devices</label>
                  <p className="text-sm text-gray-900">{profile.devices} devices</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Created</label>
                  <p className="text-sm text-gray-900">{profile.dateCreated}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Last Modified</label>
                  <p className="text-sm text-gray-900">{profile.dateModified}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{profile.apps.length}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Total Apps</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">
                    {profile.apps.filter(app => app.status === 'Required').length}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Required Apps</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile.apps.filter(app => app.status === 'Optional').length}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Optional Apps</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {profile.apps.length} Apps
                </h3>
                <button
                  onClick={() => setShowAddAppDialog(true)}
                  className="bg-black text-white px-3 py-1 rounded text-xs font-medium flex items-center space-x-1 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <span className="text-sm">+</span>
                  <span>Add New</span>
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {profile.apps.map((app) => (
                <div key={app.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {editingApp === app.id ? (
                            <input
                              type="text"
                              defaultValue={app.name}
                              className="text-lg font-medium text-gray-900 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                              onBlur={(e) => {
                                // Save the edited name here
                                console.log('Saving name:', e.target.value);
                                setEditingApp(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingApp(null);
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <h4 className="text-lg font-medium text-gray-900">{app.name}</h4>
                          )}
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium uppercase tracking-wide cursor-pointer ${
                            app.status === 'Required' 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="relative" ref={openMenuId === app.id ? menuRef : null}>
                          <button
                            onClick={() => setOpenMenuId(openMenuId === app.id ? null : app.id)}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openMenuId === app.id && (
                            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg z-10 min-w-24">
                              <button
                                onClick={() => {
                                  setEditingApp(app.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                              >
                                EDIT
                              </button>
                              <button
                                onClick={() => {
                                  setAppToRemove(app);
                                  setShowRemoveDialog(true);
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-50 cursor-pointer"
                              >
                                REMOVE
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {editingApp === app.id ? (
                        <textarea
                          defaultValue={app.description}
                          className="w-full text-sm text-gray-600 mb-3 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={2}
                          onBlur={(e) => {
                            // Save the edited description here
                            console.log('Saving description:', e.target.value);
                            setEditingApp(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              setEditingApp(null);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <p className="text-sm text-gray-600 mb-3">{app.description}</p>
                      )}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-xs text-gray-400 uppercase tracking-wide">Package</span>
                          <p className="text-gray-900 font-mono">{app.packageName}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 uppercase tracking-wide">Version</span>
                          <p className="text-gray-900">{app.version}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 uppercase tracking-wide">Size</span>
                          <p className="text-gray-900">{app.size}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-12">
            {/* Security Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
                Security Configuration
              </h3>
              <div className="grid gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-base font-medium text-gray-900 mb-4">Password Policy</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Minimum Length</span>
                      <p className="text-gray-900">{profile.settings.security.passwordPolicy.minLength} characters</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Max Failed Attempts</span>
                      <p className="text-gray-900">{profile.settings.security.passwordPolicy.maxAttempts}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Special Characters</span>
                      <p className="text-gray-900">{profile.settings.security.passwordPolicy.requireSpecialChars ? 'Required' : 'Optional'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Lockout Duration</span>
                      <p className="text-gray-900">{profile.settings.security.passwordPolicy.lockoutDuration} seconds</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-base font-medium text-gray-900 mb-4">Encryption</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Device Encryption</span>
                      <p className="text-gray-900">{profile.settings.security.encryption.deviceEncryption ? 'Enabled' : 'Disabled'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Storage Encryption</span>
                      <p className="text-gray-900">{profile.settings.security.encryption.storageEncryption ? 'Enabled' : 'Disabled'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Communication</span>
                      <p className="text-gray-900">{profile.settings.security.encryption.communicationEncryption ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
                Network Configuration
              </h3>
              <div className="grid gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-base font-medium text-gray-900 mb-4">WiFi Restrictions</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Public WiFi</span>
                      <p className="text-gray-900">{profile.settings.network.wifiRestrictions.allowPublicWifi ? 'Allowed' : 'Blocked'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Corporate Only</span>
                      <p className="text-gray-900">{profile.settings.network.wifiRestrictions.requireCorporateWifi ? 'Required' : 'Optional'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">VPN Always On</span>
                      <p className="text-gray-900">{profile.settings.network.wifiRestrictions.vpnAlwaysOn ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
                Device Restrictions
              </h3>
              <div className="grid gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-base font-medium text-gray-900 mb-4">Hardware Controls</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Camera</span>
                      <p className="text-gray-900">{profile.settings.device.hardware.cameraDisabled ? 'Disabled' : 'Enabled'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">USB Debugging</span>
                      <p className="text-gray-900">{profile.settings.device.hardware.usbDebuggingDisabled ? 'Disabled' : 'Enabled'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Screenshots</span>
                      <p className="text-gray-900">{profile.settings.device.hardware.screenshotDisabled ? 'Disabled' : 'Enabled'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Bluetooth</span>
                      <p className="text-gray-900">{profile.settings.device.hardware.bluetoothRestricted ? 'Restricted' : 'Unrestricted'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-base font-medium text-gray-900 mb-4">System Controls</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">System Updates</span>
                      <p className="text-gray-900">{profile.settings.device.system.systemUpdatesForced ? 'Forced' : 'Optional'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Root Detection</span>
                      <p className="text-gray-900">{profile.settings.device.system.rootDetectionEnabled ? 'Enabled' : 'Disabled'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Developer Options</span>
                      <p className="text-gray-900">{profile.settings.device.system.developerOptionsDisabled ? 'Disabled' : 'Enabled'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Factory Reset Protection</span>
                      <p className="text-gray-900">{profile.settings.device.system.factoryResetProtection ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remove App Dialog */}
        {showRemoveDialog && appToRemove && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => {
              setShowRemoveDialog(false);
              setAppToRemove(null);
            }}
          >
            <div 
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium text-red-600 uppercase tracking-wide mb-4">
                Confirm Remove
              </h3>
              <p className="text-sm text-gray-700 mb-6">
                Are you sure you want to remove{' '}
                <span className="font-medium text-black">{appToRemove.name}</span>{' '}
                from this profile? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    // Remove logic here
                    console.log('Removing app:', appToRemove);
                    setShowRemoveDialog(false);
                    setAppToRemove(null);
                  }}
                  className="flex-1 py-2 px-4 text-sm font-medium uppercase tracking-wide border border-red-600 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    setShowRemoveDialog(false);
                    setAppToRemove(null);
                  }}
                  className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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