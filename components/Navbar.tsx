
import React from 'react';
import { View } from '../types';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard' as View, label: 'Accueil', icon: LayoutDashboard },
    { id: 'grades' as View, label: 'Notes', icon: GraduationCap },
    { id: 'schedule' as View, label: 'Agenda', icon: Calendar },
    { id: 'ai' as View, label: 'EduAI', icon: Bot },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-20 lg:w-64 glass border-r border-white/10 h-screen transition-all sticky top-0">
        <div className="p-8 hidden lg:block">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">EDUNOVA</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all relative group ${
                activeView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'hover:bg-slate-200 dark:hover:bg-white/5 text-slate-500'
              }`}
            >
              <item.icon size={24} />
              <span className="font-medium hidden lg:block">{item.label}</span>
              {activeView === item.id && (
                <motion.div 
                  layoutId="active-nav-pill"
                  className="absolute left-0 w-1 h-8 bg-white rounded-r-full hidden lg:block"
                />
              )}
            </button>
          ))}
        </div>

        <div className="p-4 mt-auto">
           <button className="flex items-center gap-4 p-4 w-full rounded-2xl hover:bg-slate-200 dark:hover:bg-white/5 text-slate-500 transition-all">
            <Settings size={24} />
            <span className="font-medium hidden lg:block">Paramètres</span>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-4 py-3 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeView === item.id ? 'text-blue-500' : 'text-slate-500'
            }`}
          >
            <item.icon size={24} className={activeView === item.id ? 'scale-110' : ''} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

// Simplified icons
const LayoutDashboard = ({ size, className }: any) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
const GraduationCap = ({ size, className }: any) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
const Calendar = ({ size, className }: any) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const Bot = ({ size, className }: any) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);
const Settings = ({ size, className }: any) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default Navbar;
