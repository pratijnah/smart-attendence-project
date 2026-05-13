import React, { useState } from 'react';
import { MessageSquare, Filter } from 'lucide-react';
import { storageService } from '../../utils/storage';

export function FeedbackView() {
  const [filterSession, setFilterSession] = useState<string>('all');
  const feedback = storageService.getFeedback();
  const sessions = storageService.getSessions();

  const filtered =
    filterSession === 'all' ? feedback : feedback.filter(f => f.sessionId === filterSession);

  const avgRating =
    filtered.length > 0
      ? (filtered.reduce((sum, f) => sum + f.rating, 0) / filtered.length).toFixed(1)
      : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Feedback</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{feedback.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Average Rating</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{avgRating}/5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Sessions</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{sessions.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <label className="font-semibold text-gray-900">Filter by Session:</label>
        </div>
        <select
          value={filterSession}
          onChange={e => setFilterSession(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Sessions</option>
          {sessions.map(session => (
            <option key={session.id} value={session.id}>
              {session.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{item.developerName}</p>
                  <p className="text-sm text-gray-600">
                    Session: {sessions.find(s => s.id === item.sessionId)?.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{item.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No feedback available for this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
