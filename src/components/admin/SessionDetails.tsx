import React, { useState } from 'react';
import { QrCode, Download, Users } from 'lucide-react';
import { Session, storageService } from '../../utils/storage';
import { generateQRCode } from '../../utils/qrcode';

interface SessionDetailsProps {
  session: Session;
}

export function SessionDetails({ session }: SessionDetailsProps) {
  const [qrUrl] = useState(generateQRCode(session.id));
  const attendance = storageService.getAttendanceBySession(session.id);

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `${session.name}-qr.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{session.name}</h1>
        <p className="text-gray-600 mb-4">{session.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Date</p>
            <p className="text-lg font-semibold text-gray-900">{session.date}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Time</p>
            <p className="text-lg font-semibold text-gray-900">{session.time}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Location</p>
            <p className="text-lg font-semibold text-gray-900">{session.location}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-600 text-sm">Attendees</p>
            <p className="text-lg font-semibold text-blue-600">{attendance.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <QrCode size={24} />
            QR Code
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
            <img src={qrUrl} alt="Session QR Code" className="mb-4" />
            <button
              onClick={handleDownloadQR}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={16} />
              Download QR Code
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={24} />
            Attendance ({attendance.length})
          </h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {attendance.length > 0 ? (
              attendance.map(record => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{record.developerName}</p>
                    <p className="text-xs text-gray-600">{new Date(record.timestamp).toLocaleString()}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'present'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {record.status === 'present' ? 'Present' : 'Absent'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No attendance records yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
