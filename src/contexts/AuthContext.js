'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('deltamdm_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('deltamdm_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Mock authentication - accept any non-empty username/password
    if (!username.trim() || !password.trim()) {
      throw new Error('Username and password are required');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create mock user object
    const mockUser = {
      id: 1,
      username: username.trim(),
      email: `${username.trim()}`,
      role: 'Administrator',
      avatar: username.trim().charAt(0).toUpperCase()
    };

    setUser(mockUser);
    localStorage.setItem('deltamdm_user', JSON.stringify(mockUser));
    
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('deltamdm_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}