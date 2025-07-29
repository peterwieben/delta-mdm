'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'DEVICES', href: '/devices' },
  { name: 'APPS', href: '/apps' },
  { name: 'PROFILES', href: '/profiles' },
  { name: 'WORKFLOWS', href: '/workflows' },
  { name: 'USERS', href: '/users' },
];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const { user } = useAuth();

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
                      className={`block py-2 text-xs tracking-wider font-medium transition-colors ${
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
              className="block pt-2 px-6 text-xs font-medium text-gray-500 hover:text-black transition-colors truncate"
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
    </div>
  );
}