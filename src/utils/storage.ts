export interface Session {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  sessionId: string;
  developerId: string;
  developerName: string;
  timestamp: string;
  status: 'present' | 'absent';
}

export interface Feedback {
  id: string;
  sessionId: string;
  developerId: string;
  developerName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const STORAGE_KEYS = {
  SESSIONS: 'sessions',
  ATTENDANCE: 'attendance',
  FEEDBACK: 'feedback',
};

export const storageService = {
  // Session operations
  getSessions: (): Session[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  },

  addSession: (session: Omit<Session, 'id' | 'createdAt'>) => {
    const sessions = storageService.getSessions();
    const newSession: Session = {
      ...session,
      id: `session_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    sessions.push(newSession);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    return newSession;
  },

  updateSession: (id: string, updates: Partial<Session>) => {
    const sessions = storageService.getSessions();
    const index = sessions.findIndex(s => s.id === id);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    }
  },

  deleteSession: (id: string) => {
    const sessions = storageService.getSessions();
    const filtered = sessions.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
  },

  getSessionById: (id: string): Session | undefined => {
    return storageService.getSessions().find(s => s.id === id);
  },

  // Attendance operations
  getAttendance: (): Attendance[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return data ? JSON.parse(data) : [];
  },

  addAttendance: (attendance: Omit<Attendance, 'id'>) => {
    const records = storageService.getAttendance();
    const newRecord: Attendance = {
      ...attendance,
      id: `attendance_${Date.now()}`,
    };
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(records));
    return newRecord;
  },

  getAttendanceBySession: (sessionId: string): Attendance[] => {
    return storageService.getAttendance().filter(a => a.sessionId === sessionId);
  },

  // Feedback operations
  getFeedback: (): Feedback[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    return data ? JSON.parse(data) : [];
  },

  addFeedback: (feedback: Omit<Feedback, 'id'>) => {
    const records = storageService.getFeedback();
    const newRecord: Feedback = {
      ...feedback,
      id: `feedback_${Date.now()}`,
    };
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(records));
    return newRecord;
  },

  getFeedbackBySession: (sessionId: string): Feedback[] => {
    return storageService.getFeedback().filter(f => f.sessionId === sessionId);
  },
};
