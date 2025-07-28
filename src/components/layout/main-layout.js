'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden ml-48">
          {/* Content */}
          <main className="flex-1 overflow-y-auto px-12 pt-16">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}