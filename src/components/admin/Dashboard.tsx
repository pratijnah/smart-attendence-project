import React from 'react';
import { Users, Briefcase, MessageSquare, TrendingUp } from 'lucide-react';
import { storageService } from '../../utils/storage';

export function Dashboard() {
  const sessions = storageService.getSessions();
  const attendance = storageService.getAttendance();
  const feedback = storageService.getFeedback();

  const totalSessionAttendance = attendance.length;
  const totalFeedback = feedback.length;
  const avgRating =
    feedback.length > 0
      ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
      : 0;

  const stats = [
    {
      label: 'Total Sessions',
      value: sessions.length,
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Attendances Recorded',
      value: totalSessionAttendance,
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Feedback Received',
      value: totalFeedback,
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Avg Rating',
      value: avgRating,
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {sessions.slice(-5).reverse().map(session => (
              <div key={session.id} className="flex items-between justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.name}</p>
                  <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">
                    {storageService.getAttendanceBySession(session.id).length} attendees
                  </p>
                </div>
              </div>
            ))}
            {sessions.length === 0 && (
              <p className="text-center text-gray-500 py-8">No sessions yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Summary</h3>
          <div className="space-y-3">
            {feedback.slice(-5).reverse().map(item => (
              <div key={item.id} className="flex items-between justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.developerName}</p>
                  <p className="text-sm text-gray-600 truncate">{item.comment}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < item.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {feedback.length === 0 && (
              <p className="text-center text-gray-500 py-8">No feedback yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
