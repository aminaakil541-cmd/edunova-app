
import React, { useState, useEffect } from 'react';
import { View, Role } from './types';
import Dashboard from './components/Dashboard';
import GradesView from './components/GradesView';
import ScheduleView from './components/ScheduleView';
import AITutorView from './components/AITutorView';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [role, setRole] = useState<Role>('student');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleRole = () => setRole(prev => prev === 'student' ? 'teacher' : 'student');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row overflow-hidden">
      {/* Dynamic Animated Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-emerald-500/5 dark:bg-emerald-600/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header 
          activeView={activeView} 
          toggleTheme={toggleTheme} 
          isDarkMode={darkMode} 
          role={role} 
          toggleRole={toggleRole} 
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeView}-${role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto w-full h-full"
            >
              {activeView === 'dashboard' && <Dashboard role={role} setActiveView={setActiveView} />}
              {activeView === 'grades' && <GradesView role={role} />}
              {activeView === 'schedule' && <ScheduleView role={role} />}
              {activeView === 'ai' && <AITutorView role={role} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
