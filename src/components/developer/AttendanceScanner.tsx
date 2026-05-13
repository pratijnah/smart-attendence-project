import React, { useState } from 'react';
import { QrCode, CheckCircle, AlertCircle } from 'lucide-react';
import { storageService } from '../../utils/storage';

export function AttendanceScanner() {
  const [sessionId, setSessionId] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [marked, setMarked] = useState(false);
  const [error, setError] = useState('');
  const sessions = storageService.getSessions();

  const handleMarkAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sessionId || !developerName) {
      setError('Please fill in all fields');
      return;
    }

    const session = storageService.getSessionById(sessionId);
    if (!session) {
      setError('Session not found');
      return;
    }

    const existing = storageService
      .getAttendanceBySession(sessionId)
      .find(a => a.developerName === developerName);

    if (existing) {
      setError('You have already marked attendance for this session');
      return;
    }

    storageService.addAttendance({
      sessionId,
      developerId: `dev_${Date.now()}`,
      developerName,
      timestamp: new Date().toISOString(),
      status: 'present',
    });

    setMarked(true);
    setSessionId('');
    setDeveloperName('');
    setTimeout(() => setMarked(false), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mark Attendance</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <QrCode size={24} />
            Session Scanner
          </h3>

          <form onSubmit={handleMarkAttendance} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session
              </label>
              <select
                value={sessionId}
                onChange={e => setSessionId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a session...</option>
                {sessions.map(session => (
                  <option key={session.id} value={session.id}>
                    {session.name} - {session.date}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Scan or select the QR code session</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={developerName}
                onChange={e => setDeveloperName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {marked && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">Attendance marked successfully!</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Mark Attendance
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works</h3>
          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                1
              </span>
              <span>Select the session from the dropdown list</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </span>
              <span>Enter your name</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </span>
              <span>Click "Mark Attendance" to confirm</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </span>
              <span>Your attendance will be recorded</span>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Admin can download QR codes from Session Management to generate attendance links for QR scanning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
