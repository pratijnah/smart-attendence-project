import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { storageService } from '../../utils/storage';

export function DeveloperHome() {
  const sessions = storageService.getSessions();
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>

      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sessions.map(session => {
            const attendance = storageService.getAttendanceBySession(session.id);
            const isExpanded = expandedSession === session.id;

            return (
              <div
                key={session.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer"
              >
                <div
                  onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                  className="p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{session.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span className="text-sm">{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users size={16} />
                      <span className="text-sm font-medium">{attendance.length} attendees</span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3">Session Details</h4>
                    <p className="text-sm text-gray-700 mb-4">{session.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Session ID</p>
                        <p className="text-sm font-mono text-gray-900 break-all">{session.id}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Created</p>
                        <p className="text-sm text-gray-900">
                          {new Date(session.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      Tip: Use the Attendance tab to scan the QR code and mark yourself present
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No sessions available yet</p>
        </div>
      )}
    </div>
  );
}
