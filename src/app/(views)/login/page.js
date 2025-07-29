'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!showTwoFactor) {
        // First step: validate username/password
        if (!username.trim() || !password.trim()) {
          throw new Error('Username and password are required');
        }
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setShowTwoFactor(true);
      } else {
        // Second step: validate 2FA code
        const code = twoFactorCode.join('');
        if (code.length !== 6) {
          throw new Error('Please enter all 6 digits');
        }
        // For demo, accept any 6-digit code
        await login(username, password);
        router.push('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`twofa-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleTwoFactorKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !twoFactorCode[index] && index > 0) {
      const prevInput = document.getElementById(`twofa-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleBackToLogin = () => {
    setShowTwoFactor(false);
    setTwoFactorCode(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Logo */}
      <div className="w-1/2 bg-[#f2f2f2] flex items-center justify-center">
        <Image
          src="/delta-mdm-text.svg"
          alt="Delta MDM"
          width={120}
          height={20}
          className="w-auto h-auto"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-xl font-medium text-black uppercase tracking-widest">FULL SPECTRUM CONTROL</h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!showTwoFactor ? (
              // Username/Password Step
              <>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900"
                    placeholder="Enter username"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm text-gray-900"
                    placeholder="Enter password"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'VERIFYING...' : 'CONTINUE'}
                </button>

                <div className="text-xs text-gray-500">
                  <p>Demo credentials: any username and password will work</p>
                </div>
              </>
            ) : (
              // Two-Factor Authentication Step
              <>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Authentication Code</label>
                  <p className="text-sm text-gray-600 mt-1 mb-3">Enter the 6-digit code from your authenticator app</p>
                  <div className="flex space-x-2">
                    {twoFactorCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`twofa-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleTwoFactorChange(index, e.target.value)}
                        onKeyDown={(e) => handleTwoFactorKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    disabled={isLoading}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'SIGNING IN...' : 'VERIFY'}
                  </button>
                </div>

                <div className="text-xs text-gray-500">
                  <p>Demo: any 6-digit code will work</p>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}