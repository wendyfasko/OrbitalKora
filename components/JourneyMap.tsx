
import React, { useState } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  Star, 
  ArrowLeft, 
  Zap, 
  Brain, 
  HeartPulse, 
  Sparkles,
  Trophy,
  CloudRain,
  Flame,
  Moon,
  Battery,
  Wind,
  ShieldCheck,
  Eye,
  Activity
} from 'lucide-react';
import { AppView, SkillNode, UserProgress } from '../types';

const INITIAL_NODES: SkillNode[] = [
  // ADHD Path
  { id: 'adhd-1', level: 1, title: 'Focus Launch', description: '4-4-4 breathing foundation.', icon: 'wind', type: 'ADHD', status: 'available' },
  { id: 'adhd-2', level: 2, title: 'Task Fragging', description: 'Chunking complex goals.', icon: 'zap', type: 'ADHD', status: 'locked' },
  { id: 'adhd-3', level: 3, title: 'Attention Anchor', description: 'Visual mapping exercises.', icon: 'eye', type: 'ADHD', status: 'locked' },
  
  // Mental Health Path
  { id: 'anger-1', level: 4, title: 'Rage Ignition', description: 'Asteroid shattering exercise.', icon: 'flame', type: 'MENTAL_HEALTH', status: 'locked' },
  { id: 'shadow-1', level: 5, title: 'Shadow Orbit', description: 'Low-energy check-ins.', icon: 'moon', type: 'MENTAL_HEALTH', status: 'locked' },
  { id: 'mh-1', level: 6, title: 'Emotion Labelling', description: 'The 1-10 intensity scale.', icon: 'activity', type: 'MENTAL_HEALTH', status: 'locked' },
  
  // Autism Path
  { id: 'autism-1', level: 7, title: 'Social Cues 101', description: 'The "unspoken" rulebook.', icon: 'brain', type: 'AUTISM', status: 'locked' },
  { id: 'autism-2', level: 8, title: 'Sensory Tuning', description: 'Environmental sound audit.', icon: 'wind', type: 'AUTISM', status: 'locked' },
  
  // Health Path
  { id: 'health-1', level: 9, title: 'Bio Rhythm', description: 'Connecting mood to cycles.', icon: 'heart', type: 'HEALTH', status: 'locked' },
  { id: 'health-2', level: 10, title: 'Tarot Mirror', description: 'Archetypal self-reflection.', icon: 'star', type: 'HEALTH', status: 'locked' },

  // Mastery Path
  { id: 'mastery-1', level: 11, title: 'Cosmic Unity', description: 'Integrating all orbits.', icon: 'sparkles', type: 'SENSORY', status: 'locked' },
];

interface JourneyMapProps {
  onNavigate: (view: AppView) => void;
}

const JourneyMap: React.FC<JourneyMapProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('orbital_kora_progress');
    return saved ? JSON.parse(saved) : { 
      starShards: 0, 
      focusMinutes: 0, 
      cycleDay: 1, 
      lastPeriodDate: '', 
      completedNodeIds: [],
      stabilityCharge: 100 
    };
  });

  const completeNode = (id: string) => {
    if (progress.completedNodeIds.includes(id)) return;
    const newProgress = {
      ...progress,
      starShards: progress.starShards + 10,
      completedNodeIds: [...progress.completedNodeIds, id]
    };
    setProgress(newProgress);
    localStorage.setItem('orbital_kora_progress', JSON.stringify(newProgress));
  };

  const getIcon = (iconName: string, type: string) => {
    const colorClass = {
      ADHD: 'text-amber-400',
      AUTISM: 'text-indigo-400',
      MENTAL_HEALTH: 'text-rose-400',
      SENSORY: 'text-cyan-400',
      HEALTH: 'text-pink-400'
    }[type] || 'text-white';

    switch(iconName) {
      case 'wind': return <Wind className={`w-10 h-10 ${colorClass}`} />;
      case 'zap': return <Zap className={`w-10 h-10 ${colorClass}`} />;
      case 'flame': return <Flame className={`w-10 h-10 ${colorClass}`} />;
      case 'moon': return <Moon className={`w-10 h-10 ${colorClass}`} />;
      case 'brain': return <Brain className={`w-10 h-10 ${colorClass}`} />;
      case 'star': return <Sparkles className={`w-10 h-10 ${colorClass}`} />;
      case 'heart': return <HeartPulse className={`w-10 h-10 ${colorClass}`} />;
      case 'eye': return <Eye className={`w-10 h-10 ${colorClass}`} />;
      case 'activity': return <Activity className={`w-10 h-10 ${colorClass}`} />;
      default: return <Star className={`w-10 h-10 ${colorClass}`} />;
    }
  };

  return (
    <div className="min-h-screen pb-40 animate-in fade-in duration-700">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between bg-slate-950/80 backdrop-blur-2xl border-b border-white/10">
        <button onClick={() => onNavigate(AppView.DASHBOARD)} className="p-3 rounded-2xl hover:bg-white/5 transition-all">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 px-6 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-black text-white">{progress.starShards}</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <Battery className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-black text-white">{progress.stabilityCharge}%</span>
          </div>
        </div>
      </header>

      <div className="pt-32 max-w-xl mx-auto px-6 space-y-16">
        <section className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">The Cosmic Ladder</h2>
          <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-[0.4em] font-bold">Unlocking universal human health.</p>
        </section>

        <div className="flex flex-col items-center gap-16 relative">
          <div className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500/40 via-purple-500/40 to-transparent rounded-full" />

          {INITIAL_NODES.map((node, index) => {
            const isCompleted = progress.completedNodeIds.includes(node.id);
            const isPreviousCompleted = index === 0 || progress.completedNodeIds.includes(INITIAL_NODES[index-1].id);
            const isUnlocked = isCompleted || isPreviousCompleted;

            return (
              <div 
                key={node.id} 
                className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${isUnlocked ? 'scale-100' : 'scale-90 grayscale opacity-20'}`}
                style={{ marginLeft: index % 2 === 0 ? '-70px' : '70px' }}
              >
                <button 
                  disabled={!isUnlocked}
                  onClick={() => completeNode(node.id)}
                  className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center transition-all border-4 shadow-2xl relative group overflow-hidden ${
                    isCompleted 
                    ? 'bg-emerald-600 border-emerald-400' 
                    : isUnlocked 
                      ? 'bg-indigo-600 border-indigo-400 hover:scale-110 active:scale-95' 
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-14 h-14 text-white" /> : isUnlocked ? getIcon(node.icon, node.type) : <Lock className="w-10 h-10 text-slate-700" />}
                  
                  <div className="absolute bottom-full mb-6 opacity-0 group-hover:opacity-100 transition-all w-56 text-center pointer-events-none translate-y-2 group-hover:translate-y-0">
                    <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-3xl">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{node.type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">RANK {node.level}</span>
                      </div>
                      <p className="text-sm font-bold text-white mb-1">{node.title}</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed">{node.description}</p>
                    </div>
                  </div>
                </button>
                <div className="mt-4 text-center">
                  <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isUnlocked ? 'text-indigo-400' : 'text-slate-600'}`}>{node.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyMap;
