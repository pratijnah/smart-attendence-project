import React, { useState } from 'react';
import { LogOut, Home, Barcode, MessageSquare } from 'lucide-react';
import { DeveloperHome } from '../components/developer/DeveloperHome';
import { AttendanceScanner } from '../components/developer/AttendanceScanner';
import { FeedbackSubmit } from '../components/developer/FeedbackSubmit';

interface DeveloperPanelProps {
  onLogout: () => void;
}

export function DeveloperPanel({ onLogout }: DeveloperPanelProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'attendance' | 'feedback'>('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: Barcode },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Developer Portal</h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          <div className="flex gap-8 border-t border-gray-200">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-4 font-medium flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <DeveloperHome />}
        {activeTab === 'attendance' && <AttendanceScanner />}
        {activeTab === 'feedback' && <FeedbackSubmit />}
      </div>
    </div>
  );
}
