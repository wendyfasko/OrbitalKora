
import React, { useState, useEffect } from 'react';
// Fix: Added missing Sparkles import to fix 'Cannot find name Sparkles' error
import { Timer, CheckCircle2, ListTodo, Trophy, Rocket, RotateCcw, Plus, Trash2, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';

const ADHDSuite: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('orbital_kora_progress');
    return saved ? JSON.parse(saved) : { starShards: 0, focusMinutes: 0, cycleDay: 1, lastPeriodDate: '' };
  });
  
  const [quests, setQuests] = useState<{id: number, text: string, completed: boolean}[]>(() => {
    const saved = localStorage.getItem('orbital_kora_quests');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Open the app and check in", completed: true },
      { id: 2, text: "Drink a glass of water", completed: false },
      { id: 3, text: "Set a single priority task", completed: false }
    ];
  });

  const [newQuest, setNewQuest] = useState('');

  useEffect(() => {
    localStorage.setItem('orbital_kora_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('orbital_kora_quests', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setProgress(p => ({ ...p, starShards: p.starShards + 1, focusMinutes: p.focusMinutes + 25 }));
      new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleQuest = (id: number) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const addQuest = () => {
    if (!newQuest.trim()) return;
    setQuests(prev => [...prev, { id: Date.now(), text: newQuest, completed: false }]);
    setNewQuest('');
  };

  const removeQuest = (id: number) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
            <Rocket className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">ADHD Focus Orbit</h2>
            <p className="text-slate-400">Low friction, high reward mapping.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 bg-slate-900/60 rounded-2xl border border-white/5">
          <div className="text-right">
            <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Star Shards</p>
            <p className="text-xl font-bold text-white leading-none">{progress.starShards}</p>
          </div>
          <Sparkles className="text-amber-400 w-6 h-6 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-2xl">
          <div className="relative w-56 h-56 mb-10">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle cx="112" cy="112" r="100" className="stroke-slate-800 fill-none" strokeWidth="12" />
              <circle cx="112" cy="112" r="100" className="stroke-amber-500 fill-none transition-all duration-1000" strokeWidth="12" strokeDasharray={628.3} strokeDashoffset={628.3 * (1 - timeLeft / (25 * 60))} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center rotate-[90deg]">
              <span className="text-6xl font-mono font-bold text-white tracking-tighter">{formatTime(timeLeft)}</span>
              <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mt-2">Dopamine Orbit</span>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <button onClick={toggleTimer} className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${isActive ? 'bg-slate-800 text-white' : 'bg-amber-600 text-white hover:bg-amber-500 shadow-xl shadow-amber-600/20'}`}>
              {isActive ? 'Stabilize' : 'Launch Focus'}
            </button>
            <button onClick={resetTimer} className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all"><RotateCcw className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2"><ListTodo className="text-amber-400" /> Micro-Quests</h3>
            <span className="text-[10px] text-slate-500 font-bold">{quests.filter(q => q.completed).length}/{quests.length} Completed</span>
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              value={newQuest} 
              onChange={e => setNewQuest(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && addQuest()}
              placeholder="Add a tiny, manageable step..."
              className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ring-amber-500/50"
            />
            <button onClick={addQuest} className="p-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-all"><Plus className="w-5 h-5" /></button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {quests.map(q => (
              <div key={q.id} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                <button onClick={() => toggleQuest(q.id)} className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${q.completed ? 'bg-amber-500 border-amber-500' : 'border-white/10 hover:border-amber-500/40'}`}>
                  {q.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
                <span className={`text-sm flex-1 ${q.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{q.text}</span>
                <button onClick={() => removeQuest(q.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-rose-400 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADHDSuite;
