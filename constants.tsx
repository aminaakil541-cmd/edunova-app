
import { Grade, Course, Notification } from './types';

export const MOCK_GRADES: Grade[] = [
  { subject: 'Mathématiques', value: 18.5, coefficient: 5, date: '2023-10-12' },
  { subject: 'Physique', value: 16.0, coefficient: 4, date: '2023-10-15' },
  { subject: 'Français', value: 14.5, coefficient: 3, date: '2023-10-18' },
  { subject: 'Anglais', value: 19.0, coefficient: 3, date: '2023-10-20' },
  { subject: 'Histoire', value: 12.0, coefficient: 2, date: '2023-10-22' },
  { subject: 'Philosophie', value: 13.5, coefficient: 3, date: '2023-10-25' },
  { subject: 'Sport', value: 20.0, coefficient: 2, date: '2023-10-28' },
];

export const MOCK_COURSES: Course[] = [
  { id: '1', name: 'Mathématiques', time: '08:30 - 10:30', room: 'B12', teacher: 'M. Dupont', color: 'bg-blue-500' },
  { id: '2', name: 'Physique-Chimie', time: '10:45 - 12:45', room: 'Labo 2', teacher: 'Mme. Curie', color: 'bg-purple-500' },
  { id: '3', name: 'Anglais', time: '14:00 - 15:30', room: 'C05', teacher: 'Mrs. Smith', color: 'bg-green-500' },
  { id: '4', name: 'Histoire-Géo', time: '15:45 - 17:15', room: 'A03', teacher: 'M. Herodot', color: 'bg-orange-500' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Nouvelle note', message: 'Votre note de Mathématiques est disponible.', time: 'Il y a 2h', isRead: false, type: 'grade' },
  { id: '2', title: 'Cours annulé', message: 'Le cours de Sport est annulé cet après-midi.', time: 'Il y a 5h', isRead: true, type: 'info' },
  { id: '3', title: 'Rappel Devoir', message: 'Rendre le projet de Physique demain.', time: 'Il y a 1j', isRead: false, type: 'reminder' },
];
