'use client';

import { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';

const usersData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    isAdmin: true,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    isAdmin: false,
  },
  {
    id: 3,  
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    isAdmin: true,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    isAdmin: false,
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    isAdmin: false,
  },
  {
    id: 6,
    name: 'Lisa Martinez',
    email: 'lisa.martinez@company.com',
    isAdmin: true,
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    isAdmin: false,
  },
  {
    id: 8,
    name: 'Jennifer Brown',
    email: 'jennifer.brown@company.com',
    isAdmin: false,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);
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

  const toggleAdminStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isAdmin: !user.isAdmin }
        : user
    ));
  };

  const handleUserAction = (action, user) => {
    console.log(`${action} user:`, user);
    setOpenMenuId(null);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="pb-4">
          <h1 className="text-xl font-medium text-black uppercase tracking-widest">USERS</h1>
        </div>

        {/* Users Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Name
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Email
                  </th>
                  <th className="text-left py-4 text-sm font-medium text-gray-900">
                    Admin
                  </th>
                  <th className="text-right py-4 text-sm font-medium text-gray-900 w-16">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white cursor-pointer border-t" style={{ borderTopColor: '#f2f2f2' }}>
                    <td className="py-4 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.isAdmin}
                          onChange={() => toggleAdminStatus(user.id)}
                          className="sr-only"
                        />
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          user.isAdmin ? 'bg-black' : 'bg-gray-200'
                        }`}>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              user.isAdmin ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </div>
                      </label>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <div className="flex justify-end">
                        <div className="relative" ref={openMenuId === user.id ? menuRef : null}>
                          <button
                            onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openMenuId === user.id && (
                            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg z-10 min-w-24">
                              <button
                                onClick={() => handleUserAction('edit', user)}
                                className="w-full text-left px-3 py-2 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                              >
                                EDIT
                              </button>
                              <button
                                onClick={() => handleUserAction('delete', user)}
                                className="w-full text-left px-3 py-2 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-50 cursor-pointer"
                              >
                                DELETE
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}