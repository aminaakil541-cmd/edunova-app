
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Role } from '../types';

interface AITutorViewProps {
  role: Role;
}

const AITutorView: React.FC<AITutorViewProps> = ({ role }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: role === 'student' 
      ? 'Bonjour Thomas ! Je suis ton tuteur EduNova AI. En quoi puis-je t\'aider pour tes cours ?' 
      : 'Bonjour M. Martin. Je suis votre assistant pédagogique EduNova AI. Comment puis-je vous aider dans la préparation de vos cours ?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const roleInstruction = role === 'student' 
        ? "Tu es un tuteur scolaire bienveillant. Aide l'élève Thomas." 
        : "Tu es un assistant pédagogique pour enseignants. Aide M. Martin à préparer ses cours, exercices ou évaluations.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Tu es EduNova AI, un expert premium. ${roleInstruction} Réponds de manière structurée et concise en français avec des émojis.`,
        }
      });

      const aiText = response.text || "Désolé, j'ai rencontré une erreur. Peux-tu reformuler ?";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Oups ! Connexion perdue." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="glass rounded-t-3xl p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">EduNova AI</h3>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> En ligne
            </span>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Sparkles size={18} />
           </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-black/20"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'glass dark:bg-white/5 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="glass p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                <span className="text-xs text-slate-500 italic">EduNova réfléchit...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 glass rounded-b-3xl border-t border-white/10">
        <div className="flex gap-2 relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={role === 'student' ? "Pose-moi une question sur tes cours..." : "Comment puis-je vous aider, M. Martin ?"}
            className="flex-1 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all pr-12"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center mt-3 text-slate-500">
          L'IA peut faire des erreurs. {role === 'teacher' ? "Utilisez-la comme assistant." : "Vérifiez vos sources."}
        </p>
      </div>
    </div>
  );
};

export default AITutorView;
