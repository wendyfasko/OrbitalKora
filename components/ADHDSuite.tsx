
import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle2, ListTodo, Trophy, Rocket, RotateCcw, Plus, Trash2, Sparkles, Gamepad2, Battery } from 'lucide-react';
import { UserProgress } from '../types';

interface ADHDSuiteProps {
  onPlayFocus?: () => void;
}

const ADHDSuite: React.FC<ADHDSuiteProps> = ({ onPlayFocus }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('orbital_kora_progress');
    return saved ? JSON.parse(saved) : { starShards: 0, focusMinutes: 0, cycleDay: 1, lastPeriodDate: '', completedNodeIds: [], stabilityCharge: 100 };
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
      setProgress(p => ({ ...p, starShards: p.starShards + 10, focusMinutes: p.focusMinutes + 25 }));
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

  const progressPercentage = (timeLeft / (25 * 60)) * 100;

  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-amber-500/20 rounded-[1.5rem] text-amber-400 shadow-xl border border-amber-500/20">
            <Rocket className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">ADHD Focus Hub</h2>
            <p className="text-slate-400 font-medium tracking-wide">Vertical time mapping for better spatial awareness.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-8 py-4 bg-slate-900/60 rounded-[1.5rem] border border-white/5 shadow-2xl">
          <div className="text-right">
            <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Shards Collected</p>
            <p className="text-3xl font-black text-white leading-none tracking-tighter">{progress.starShards}</p>
          </div>
          <Trophy className="text-amber-400 w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Vertical Focus Pillar */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-64 h-64 text-amber-500" />
          </div>

          <div className="flex flex-row items-end gap-12 w-full justify-center py-4">
            {/* The Pillar */}
            <div className="relative w-24 h-[400px] bg-slate-950 rounded-full border border-white/10 shadow-inner p-1 overflow-hidden">
              <div 
                className="absolute bottom-1 left-1 right-1 rounded-full bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 transition-all duration-1000 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                style={{ height: `calc(${progressPercentage}% - 8px)` }}
              >
                <div className="absolute top-0 left-0 right-0 h-8 bg-white/20 blur-sm rounded-t-full" />
              </div>
              
              {/* Scale Ticks */}
              <div className="absolute inset-0 flex flex-col justify-between py-10 px-2 opacity-20 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-white" />
                ))}
              </div>
            </div>

            {/* Time Display & Label */}
            <div className="flex flex-col items-start gap-4 pb-8">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-500 uppercase tracking-[0.3em] font-black">Active Orbit</span>
                <h3 className="text-7xl font-black text-white tracking-tighter tabular-nums leading-none">
                  {formatTime(timeLeft)}
                </h3>
              </div>
              
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={toggleTimer} 
                  className={`w-full py-5 px-8 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl ${isActive ? 'bg-slate-800 text-slate-400 border border-white/5' : 'bg-amber-600 text-white hover:bg-amber-500 shadow-amber-600/30'}`}
                >
                  {isActive ? 'Pause Orbit' : 'Ignite Focus'}
                </button>
                <button 
                  onClick={resetTimer} 
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Stream
                </button>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-[9px] text-slate-500 uppercase tracking-widest font-black max-w-[200px] text-center">
            "Vertical time mapping reduces cognitive load by visualizing duration as space."
          </p>
        </div>

        {/* Quests and Games */}
        <div className="lg:col-span-7 space-y-8">
          {/* Game Callout */}
          <button 
            onClick={onPlayFocus}
            className="w-full p-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-[2.5rem] flex items-center justify-between group shadow-2xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Gamepad2 className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-xl font-bold text-white tracking-tight">Focus Flow Game</h4>
                <p className="text-amber-100/60 text-xs font-medium">Interactive training for your executive focus muscles.</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </button>

          <div className="bg-slate-900/40 border border-white/10 rounded-[3rem] p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-3"><ListTodo className="text-amber-400 w-5 h-5" /> Executive Quests</h3>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{quests.filter(q => q.completed).length}/{quests.length} Done</span>
            </div>

            <div className="flex gap-3">
              <input 
                type="text" 
                value={newQuest} 
                onChange={e => setNewQuest(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && addQuest()}
                placeholder="One tiny step..."
                className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-sm text-white focus:ring-2 focus:ring-amber-500/50 outline-none shadow-inner"
              />
              <button onClick={addQuest} className="p-5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl transition-all shadow-xl shadow-amber-600/20"><Plus className="w-6 h-6" /></button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {quests.map(q => (
                <div key={q.id} className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <button onClick={() => toggleQuest(q.id)} className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all ${q.completed ? 'bg-amber-500 border-amber-500 shadow-lg' : 'border-white/10 hover:border-amber-500/40'}`}>
                    {q.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                  <span className={`text-base flex-1 font-medium transition-all ${q.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{q.text}</span>
                  <button onClick={() => removeQuest(q.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-700 hover:text-rose-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADHDSuite;
