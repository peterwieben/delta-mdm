'use client';

import { useEffect } from 'react';

export default function DeviceDetailsShelf({ device, isOpen, onClose }) {
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
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Device Number</label>
                    <p className="text-sm text-gray-900 font-medium">{device.deviceNumber}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Build</label>
                    <p className="text-sm text-gray-900">{device.build}</p>
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
                className="flex-1 py-2 px-4 text-sm font-medium uppercase tracking-wide transition-colors"
                style={{ border: '1px solid #dc2626', color: '#dc2626' }}
              >
                Wipe
              </button>
              <button 
                className="flex-1 py-2 px-4 text-sm font-medium uppercase tracking-wide transition-colors"
                style={{ border: '1px solid #2563eb', color: '#2563eb' }}
              >
                Update
              </button>
              <button 
                className="flex-1 py-2 px-4 text-sm font-medium uppercase tracking-wide transition-colors"
                style={{ border: '1px solid #16a34a', color: '#16a34a' }}
              >
                Track
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}