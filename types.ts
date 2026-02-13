
export interface Grade {
  subject: string;
  value: number;
  coefficient: number;
  date: string;
}

export interface Course {
  id: string;
  name: string;
  time: string;
  room: string;
  teacher: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'grade' | 'info' | 'reminder';
}

export type View = 'dashboard' | 'grades' | 'schedule' | 'ai';
export type Role = 'student' | 'teacher';
