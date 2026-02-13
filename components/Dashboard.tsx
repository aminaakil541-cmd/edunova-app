
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_GRADES, MOCK_COURSES, MOCK_NOTIFICATIONS } from '../constants';
import { TrendingUp, Clock, Bell, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Role, View } from '../types';

interface DashboardProps {
  role: Role;
  setActiveView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, setActiveView }) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const average = MOCK_GRADES.reduce((acc, g) => acc + g.value, 0) / MOCK_GRADES.length;
  const nextCourse = MOCK_COURSES[0];

  const handleClearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="md:col-span-2 glass rounded-3xl p-8 relative overflow-hidden group shadow-2xl shadow-blue-500/10"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <TrendingUp size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-slate-500 dark:text-slate-400 font-medium mb-1">
            {role === 'student' ? 'Moyenne Générale' : 'Moyenne de la Classe (3ème B)'}
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-blue-600 dark:text-blue-400">
              {role === 'student' ? average.toFixed(1) : (average - 1.2).toFixed(1)}
            </span>
            <span className="text-xl font-bold text-slate-400">/20</span>
          </div>
          <p className="mt-4 text-sm text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp size={16} /> 
            {role === 'student' ? '+0.4 points depuis le mois dernier' : '+1.2 points sur ce trimestre'}
          </p>
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => setActiveView('grades')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              {role === 'student' ? 'Voir le bulletin' : 'Gérer les notes'}
            </button>
            <button 
               onClick={() => setActiveView('schedule')}
               className="px-6 py-2.5 glass border border-white/10 hover:bg-white/10 rounded-xl font-medium transition-colors"
            >
              Planning
            </button>
          </div>
        </div>
      </motion.div>

      {/* Next Class Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass rounded-3xl p-6 border-l-4 border-blue-500"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
            <Clock size={24} />
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-blue-500/20 text-blue-500 rounded-md uppercase tracking-wider">Bientôt</span>
        </div>
        <h3 className="text-slate-400 text-sm font-medium">
          {role === 'student' ? 'Prochain cours' : 'Votre prochain cours'}
        </h3>
        <p className="text-xl font-bold mt-1">{nextCourse.name}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-500">
          <p className="flex items-center gap-2">📍 Salle {nextCourse.room}</p>
          <p className="flex items-center gap-2">🕒 {nextCourse.time}</p>
          <p className="flex items-center gap-2">
            {role === 'student' ? `👤 ${nextCourse.teacher}` : `👥 28 élèves inscrits`}
          </p>
        </div>
        <button 
          onClick={() => setActiveView('schedule')}
          className="w-full mt-6 py-3 bg-slate-200/50 dark:bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all"
        >
          Détails du cours
        </button>
      </motion.div>

      {/* Notifications */}
      <div className="md:col-span-1 glass rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold flex items-center gap-2">
            <Bell size={18} className="text-orange-500" /> Notifications
          </h3>
          <button 
            onClick={handleClearNotifications}
            className="text-xs text-blue-500 font-medium hover:underline"
          >
            Tout marquer
          </button>
        </div>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-3 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10 relative">
              <div className="flex justify-between items-start mb-1">
                <span className={`font-semibold text-sm ${notif.isRead ? 'text-slate-500' : ''}`}>
                  {notif.title}
                </span>
                <span className="text-[10px] text-slate-500">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{notif.message}</p>
              {!notif.isRead && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
          ))}
          {notifications.filter(n => !n.isRead).length === 0 && (
            <div className="text-center py-8">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2 opacity-50" />
              <p className="text-xs text-slate-400 italic">Tout est à jour</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Schedule Recap */}
      <div className="md:col-span-2 glass rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Aperçu de la journée</h3>
            <button onClick={() => setActiveView('schedule')} className="text-xs text-blue-500 hover:underline">Voir tout</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_COURSES.slice(1, 3).map((course) => (
            <div 
              key={course.id} 
              onClick={() => setActiveView('schedule')}
              className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 flex gap-4 items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all group"
            >
              <div className={`w-1 h-10 rounded-full ${course.color}`}></div>
              <div>
                <p className="font-bold text-sm">{course.name}</p>
                <p className="text-xs text-slate-500">{course.time}</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
