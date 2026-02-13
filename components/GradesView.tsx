
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_GRADES } from '../constants';
import { Award, Target, BookOpen, PlusCircle, X, Check } from 'lucide-react';
import { Role } from '../types';

interface GradesViewProps {
  role: Role;
}

const GradesView: React.FC<GradesViewProps> = ({ role }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const highest = [...MOCK_GRADES].sort((a, b) => b.value - a.value)[0];
  const lowest = [...MOCK_GRADES].sort((a, b) => a.value - b.value)[0];

  return (
    <div className="space-y-8 relative">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-3xl p-6 border-b-4 border-emerald-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                {role === 'student' ? 'Meilleure Note' : 'Moyenne Top Élève'}
              </p>
              <p className="text-xl font-black">{highest.value}/20</p>
              <p className="text-xs text-slate-400">{highest.subject}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 border-b-4 border-blue-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
              <Target size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Objectif {role === 'student' ? 'Semestre' : 'Classe'}</p>
              <p className="text-xl font-black">17.5/20</p>
              <p className="text-xs text-slate-400">Progression 82%</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 border-b-4 border-orange-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-2xl">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">A {role === 'student' ? 'renforcer' : 'surveiller'}</p>
              <p className="text-xl font-black">{role === 'student' ? lowest.subject : 'Participation'}</p>
              <p className="text-xs text-slate-400">Note: {lowest.value}/20</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
        <h2 className="text-lg font-bold">Détails des résultats</h2>
        {role === 'teacher' && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <PlusCircle size={18} />
            Saisir une note
          </button>
        )}
      </div>

      {/* Detailed List */}
      <div className="glass rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-200/50 dark:bg-white/5">
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Matière</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Note / 20</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider hidden sm:table-cell">Coefficient</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Progression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_GRADES.map((grade, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={grade.subject} 
                  className="hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 font-semibold">{grade.subject}</td>
                  <td className="px-6 py-4 font-black text-lg">
                    <span className={grade.value >= 15 ? 'text-emerald-500' : grade.value >= 10 ? 'text-blue-500' : 'text-red-500'}>
                      {grade.value.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">x{grade.coefficient}</td>
                  <td className="px-6 py-4 min-w-[120px]">
                    <div className="w-full h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(grade.value / 20) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${
                          grade.value >= 15 ? 'bg-emerald-500' : grade.value >= 10 ? 'bg-blue-500' : 'bg-red-500'
                        }`}
                      ></motion.div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saisir une note Modal Form */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Nouvelle Évaluation</h3>
                <button onClick={() => setShowAddForm(false)} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Matière</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500">
                    <option className="bg-slate-900">Mathématiques</option>
                    <option className="bg-slate-900">Physique</option>
                    <option className="bg-slate-900">Français</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Note (/20)</label>
                  <input type="number" step="0.25" placeholder="15.5" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Élève</label>
                  <input type="text" placeholder="Thomas Martin" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                
                <div className="pt-4 flex gap-3">
                   <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3 glass hover:bg-white/10 rounded-xl font-bold transition-all">
                      Annuler
                   </button>
                   <button type="submit" className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                      <Check size={18} /> Enregistrer
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GradesView;
