
import React from 'react';
import { View, Role } from '../types';
import { motion } from 'framer-motion';

interface HeaderProps {
  activeView: View;
  toggleTheme: () => void;
  isDarkMode: boolean;
  role: Role;
  toggleRole: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, toggleTheme, isDarkMode, role, toggleRole }) => {
  const titles: Record<View, string> = {
    dashboard: 'Tableau de bord',
    grades: role === 'student' ? 'Mes Notes' : 'Gestion des Notes',
    schedule: 'Emploi du temps',
    ai: 'EduNova AI'
  };

  return (
    <header className="px-6 py-4 flex items-center justify-between glass sticky top-0 z-30 border-b border-white/10">
      <div className="flex items-center gap-4">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
        >
          <span className="font-bold text-xl">E</span>
        </motion.div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{titles[activeView]}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {role === 'student' ? 'Bonjour, Thomas 👋' : 'Session Professeur : M. Martin 👋'}
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 focus:outline-none text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <button 
          onClick={toggleRole}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            role === 'student' 
            ? 'border-blue-500/30 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' 
            : 'border-purple-500/30 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20'
          } text-xs font-bold`}
        >
          {role === 'student' ? <UserIcon size={14} /> : <GraduationIcon size={14} />}
          <span className="hidden sm:inline">{role === 'student' ? 'Mode Élève' : 'Mode Maître'}</span>
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300 relative">
          <BellIcon size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-50 dark:border-slate-950"></span>
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/30 p-0.5 cursor-pointer hover:scale-105 transition-transform">
          <img src={`https://picsum.photos/seed/${role}/100/100`} alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>
    </header>
  );
};

// Simplified lucide icons (avoiding conflicts with main lib)
const Sun = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);
const Moon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
const BellIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const Search = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const UserIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const GraduationIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);

export default Header;
