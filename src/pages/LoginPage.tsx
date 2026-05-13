import React, { useState } from 'react';
import { LogIn, Shield, Code2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'developer') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'developer'>('admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Manager</h1>
            <p className="text-gray-600">Session & Attendance Tracking</p>
          </div>

          <div className="space-y-4 mb-8">
            <button
              onClick={() => setSelectedRole('admin')}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'admin'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Shield size={24} className={selectedRole === 'admin' ? 'text-blue-600' : 'text-gray-400'} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Admin</p>
                  <p className="text-sm text-gray-600">Manage sessions & view analytics</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('developer')}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'developer'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Code2 size={24} className={selectedRole === 'developer' ? 'text-blue-600' : 'text-gray-400'} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Developer</p>
                  <p className="text-sm text-gray-600">Mark attendance & submit feedback</p>
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={() => onLogin(selectedRole)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Login as {selectedRole === 'admin' ? 'Admin' : 'Developer'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Demo Mode • No password required
          </p>
        </div>
      </div>
    </div>
  );
}
