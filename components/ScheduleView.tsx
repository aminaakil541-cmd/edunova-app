
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_COURSES } from '../constants';
import { MapPin, User, Info, FileText } from 'lucide-react';
import { Role } from '../types';

interface ScheduleViewProps {
  role: Role;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ role }) => {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg">Lundi 24 Octobre</h3>
          <p className="text-xs text-slate-500">Planning de {role === 'student' ? 'l\'élève' : 'l\'enseignant'}</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-200 dark:bg-white/5 rounded-xl">
          <button 
            onClick={() => setViewMode('day')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'day' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-500' : 'text-slate-500'
            }`}
          >
            Aujourd'hui
          </button>
          <button 
            onClick={() => setViewMode('week')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'week' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500'
            }`}
          >
            Semaine
          </button>
        </div>
      </div>

      <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 before:dark:bg-white/10">
        {MOCK_COURSES.map((course, idx) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[25px] top-2 w-4 h-4 rounded-full border-4 border-slate-50 dark:border-slate-950 transition-colors ${idx === 0 ? 'bg-blue-500 animate-ping' : 'bg-slate-300 dark:bg-white/20'}`}></div>
            {idx === 0 && <div className="absolute -left-[25px] top-2 w-4 h-4 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-blue-500"></div>}

            <div className={`glass rounded-2xl p-5 border-l-4 transition-all hover:translate-x-1 ${course.color.replace('bg-', 'border-')}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{course.time}</span>
                  <h4 className="text-xl font-bold mt-1 group-hover:text-blue-500 transition-colors">{course.name}</h4>
                  <div className="flex gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={14} className="text-blue-500" /> Salle {course.room}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      {role === 'student' ? (
                        <><User size={14} className="text-blue-500" /> {course.teacher}</>
                      ) : (
                        <><User size={14} className="text-blue-500" /> 28 Élèves (3B)</>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-blue-500 hover:text-white transition-all group/btn">
                    <Info size={18} />
                    <span className="sr-only">Détails du cours</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-500 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <FileText size={14} />
                    {role === 'student' ? 'Supports' : 'Matériel'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleView;
