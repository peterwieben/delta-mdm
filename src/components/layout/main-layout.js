'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'DEVICES', href: '/devices' },
  { name: 'APPS', href: '/apps' },
  { name: 'PROFILES', href: '/profiles' },
  { name: 'WORKFLOWS', href: '/workflows' },
];

const secondaryNavigation = [
  { name: 'USERS', href: '/users' },
  { name: 'HISTORY', href: '/history' },
];

// Sample alerts data
const alertsData = [
  {
    id: 1,
    type: 'software-update',
    title: 'Chrome Update Available',
    description: 'Chrome v131.0.6778.86 is available for deployment',
    date: '2025-07-29',
    severity: 'info'
  },
  {
    id: 2,
    type: 'security',
    title: 'CVE-2025-1234 Detected',
    description: 'Critical vulnerability found in OpenSSL library',
    date: '2025-07-28',
    severity: 'critical'
  },
  {
    id: 3,
    type: 'compliance',
    title: 'Policy Violation',
    description: '5 devices missing required security certificates',
    date: '2025-07-27',
    severity: 'warning'
  }
];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [showAlertsSheet, setShowAlertsSheet] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to right, #fff, #f2f2f2)" }}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-40 bg-transparent flex flex-col border-r border-[rgba(0,0,0,0.1)] fixed h-full px-6">
          {/* Header with Logo */}
          <div className="flex items-center h-12">
            <Image
              src="/delta-mdm-text.svg"
              alt="Delta MDM"
              width={90}
              height={10}
              className="w-auto h-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block py-2 text-xs tracking-wider font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            {/* Secondary Navigation */}
            <ul className="space-y-2 mt-16">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block py-2 text-xs tracking-wider font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Profile Section */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-black/10" style={{ marginBottom: '10px' }}>
            <Link
              href="/settings"
              className="block pt-2 px-6 text-xs font-medium text-gray-500 hover:text-black transition-colors truncate cursor-pointer"
            >
              {user?.username || 'user001'}
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden ml-40">
          {/* Content */}
          <main className="flex-1 overflow-y-auto px-12 pt-16">
            {children}
          </main>
        </div>
      </div>

      {/* Fixed Alerts Button - Lower Right */}
      <button
        onClick={() => setShowAlertsSheet(true)}
        className="fixed bottom-1 right-1 text-red-600 border border-red-600 rounded-sm px-3 py-1 transition-colors duration-200 z-40 backdrop-blur-sm leading-none cursor-pointer"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
      >
        <span className="text-xs font-medium">{alertsData.length} ALERTS</span>
      </button>

      {/* Alerts Sheet - Bottom Right */}
      {showAlertsSheet && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            onClick={() => setShowAlertsSheet(false)}
          />
          
          {/* Sheet */}
          <div className="fixed bottom-0 right-0 w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out border-l border-t border-gray-200 rounded-tl-lg shadow-xl h-[700px] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  System Alerts
                </h3>
                <button
                  onClick={() => setShowAlertsSheet(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto" style={{height: 'calc(700px - 73px)'}}>
              <div className="p-4 space-y-3">
                {alertsData.map((alert) => (
                  <div key={alert.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'critical' ? 'bg-red-500' :
                        alert.severity === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                          <span className="text-xs text-gray-500">{alert.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                        <span className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${
                          alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.type.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}