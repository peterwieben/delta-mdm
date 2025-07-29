'use client';

import { useState, useEffect } from 'react';

export default function WipeDialog({ device, isOpen, onClose }) {
  const [wipeState, setWipeState] = useState('confirm'); // 'confirm', 'wiping', 'complete'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setWipeState('confirm');
      setProgress(0);
    }
  }, [isOpen]);

  const handleWipe = () => {
    setWipeState('wiping');
    setProgress(0);
    
    // Simulate wipe progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setWipeState('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDone = () => {
    onClose();
  };

  if (!isOpen || !device) return null;

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center z-60"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        {wipeState === 'confirm' && (
          <>
            <h3 className="text-lg font-medium text-red-600 uppercase tracking-wide mb-4">
              Confirm Wipe
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure? This will permanently wipe device{' '}
              <span className="font-medium text-black">{device.deviceNumber}</span>.
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleWipe}
                className="flex-1 py-2 px-4 text-sm font-medium uppercase tracking-wide transition-colors"
                style={{ border: '1px solid #dc2626', color: '#dc2626', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Wipe
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 text-sm font-medium uppercase tracking-wide border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {wipeState === 'wiping' && (
          <>
            <h3 className="text-lg font-medium text-red-600 uppercase tracking-wide mb-4">
              Wiping Device
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Wiping <span className="font-medium text-black">{device.deviceNumber}</span>...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-center">{progress}% complete</p>
          </>
        )}

        {wipeState === 'complete' && (
          <>
            <h3 className="text-lg font-medium text-red-600 uppercase tracking-wide mb-4">
              Device Wiped
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Device <span className="font-medium text-black">{device.deviceNumber}</span> has been successfully wiped.
            </p>
            <button
              onClick={handleDone}
              className="w-full py-2 px-4 text-sm font-medium uppercase tracking-wide transition-colors"
              style={{ border: '1px solid #dc2626', color: '#dc2626', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}