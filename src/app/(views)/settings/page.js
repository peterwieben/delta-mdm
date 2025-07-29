'use client';

import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return null; // Will be redirected by ProtectedRoute
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">SETTINGS</h1>
        </div>

        {/* User Settings Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md">
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Photo */}
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-xl font-medium text-white">{user.avatar}</span>
            </div>

            {/* User Info */}
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">{user.username}</h2>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
              <p className="text-sm text-gray-600 mt-1">{user.role}</p>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
              <button
                onClick={() => router.push('/settings/user-manual')}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
              >
                USER MANUAL
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}