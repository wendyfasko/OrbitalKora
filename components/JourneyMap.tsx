
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
  Activity,
  Award,
  BookOpen,
  Anchor,
  Compass,
  Smile
} from 'lucide-react';
import { AppView, SkillNode, UserProgress } from '../types';

const INITIAL_NODES: SkillNode[] = [
  // --- ADHD / FOCUS PATH ---
  { id: 'adhd-1', level: 1, title: 'Focus Launch', description: '4-4-4 breathing foundation.', icon: 'wind', type: 'ADHD', status: 'available' },
  { id: 'adhd-2', level: 2, title: 'Task Fragging', description: 'Chunking complex goals.', icon: 'zap', type: 'ADHD', status: 'locked' },
  { id: 'adhd-3', level: 3, title: 'Focus Flow', description: 'Mastering attention orbits.', icon: 'compass', type: 'ADHD', status: 'locked' },
  { id: 'adhd-4', level: 4, title: 'Deep Concentration', description: 'Eliminating external noise.', icon: 'anchor', type: 'ADHD', status: 'locked' },

  // --- EMOTIONAL INTELLIGENCE / MENTAL HEALTH ---
  { id: 'anger-1', level: 5, title: 'Rage Release', description: 'Asteroid shattering exercise.', icon: 'flame', type: 'MENTAL_HEALTH', status: 'locked' },
  { id: 'shadow-1', level: 6, title: 'Shadow Walk', description: 'Low-energy care routines.', icon: 'moon', type: 'MENTAL_HEALTH', status: 'locked' },
  { id: 'mh-1', level: 7, title: 'Intensity Mapping', description: 'The 1-10 inner scale.', icon: 'activity', type: 'MENTAL_HEALTH', status: 'locked' },
  { id: 'mh-2', level: 8, title: 'Thought Reframing', description: 'Turning heavy orbits light.', icon: 'brain', type: 'MENTAL_HEALTH', status: 'locked' },
  { id: 'mh-3', level: 9, title: 'Anxiety Grounding', description: '5-4-3-2-1 sensory scan.', icon: 'cloud-rain', type: 'MENTAL_HEALTH', status: 'locked' },

  // --- SOCIAL / AUTISM PATH ---
  { id: 'autism-1', level: 10, title: 'Social Filter', description: 'Decoding hidden social cues.', icon: 'eye', type: 'AUTISM', status: 'locked' },
  { id: 'autism-2', level: 11, title: 'Tone Tuning', description: 'Understanding inflection.', icon: 'wind', type: 'AUTISM', status: 'locked' },
  { id: 'autism-3', level: 12, title: 'Social Scripting', description: 'Conversation templates.', icon: 'book-open', type: 'AUTISM', status: 'locked' },

  // --- SENSORY / WELLNESS PATH ---
  { id: 'sensory-1', level: 13, title: 'Sensory Profile', description: 'Mapping your triggers.', icon: 'activity', type: 'SENSORY', status: 'locked' },
  { id: 'sensory-2', level: 14, title: 'Environmental Shield', description: 'Auditory tuning skills.', icon: 'shield-check', type: 'SENSORY', status: 'locked' },
  { id: 'sensory-3', level: 15, title: 'Flow State', description: 'Consistent high-quality rest.', icon: 'sparkles', type: 'SENSORY', status: 'locked' },

  // --- HEALTH / BODY LITERACY ---
  { id: 'health-1', level: 16, title: 'Cycle Wisdom', description: 'Connecting mood to hormones.', icon: 'heart', type: 'HEALTH', status: 'locked' },
  { id: 'health-2', level: 17, title: 'Hormonal Flow', description: 'Optimizing work for phases.', icon: 'zap', type: 'HEALTH', status: 'locked' },
  { id: 'health-3', level: 18, title: 'Tarot Reflection', description: 'Archetypal inner mirrors.', icon: 'star', type: 'HEALTH', status: 'locked' },

  // --- MASTERY / ASCENSION ---
  { id: 'mastery-1', level: 19, title: 'Inner Compass', description: 'Stable self-regulation.', icon: 'compass', type: 'MASTERY', status: 'locked' },
  { id: 'mastery-2', level: 20, title: 'Cosmic Teacher', description: 'Helping other orbits heal.', icon: 'award', type: 'MASTERY', status: 'locked' },
  { id: 'mastery-3', level: 21, title: 'Universal Unity', description: 'Ultimate wellness integration.', icon: 'sparkles', type: 'MASTERY', status: 'locked' },
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
      starShards: progress.starShards + 25,
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
      HEALTH: 'text-pink-400',
      MASTERY: 'text-purple-400'
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
      case 'compass': return <Compass className={`w-10 h-10 ${colorClass}`} />;
      case 'anchor': return <Anchor className={`w-10 h-10 ${colorClass}`} />;
      case 'book-open': return <BookOpen className={`w-10 h-10 ${colorClass}`} />;
      case 'shield-check': return <ShieldCheck className={`w-10 h-10 ${colorClass}`} />;
      case 'award': return <Award className={`w-10 h-10 ${colorClass}`} />;
      case 'cloud-rain': return <CloudRain className={`w-10 h-10 ${colorClass}`} />;
      default: return <Star className={`w-10 h-10 ${colorClass}`} />;
    }
  };

  return (
    <div className="min-h-screen pb-40 animate-in fade-in duration-1000">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between bg-slate-950/80 backdrop-blur-3xl border-b border-white/10">
        <button onClick={() => onNavigate(AppView.DASHBOARD)} className="p-3 rounded-2xl hover:bg-white/5 transition-all active:scale-90">
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

      <div className="pt-32 max-w-2xl mx-auto px-6 space-y-20">
        <section className="text-center space-y-6">
          <div className="inline-flex px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Universal Human Progress</div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">Infinite <br/> <span className="text-indigo-500">Constellation</span></h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-medium">Climb the ladder of neural integration and collective healing. No one is left behind in the stars.</p>
        </section>

        <div className="flex flex-col items-center gap-20 relative">
          <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/40 via-purple-500/40 to-transparent rounded-full shadow-[0_0_20px_rgba(99,102,241,0.2)]" />

          {INITIAL_NODES.map((node, index) => {
            const isCompleted = progress.completedNodeIds.includes(node.id);
            const isPreviousCompleted = index === 0 || progress.completedNodeIds.includes(INITIAL_NODES[index-1].id);
            const isUnlocked = isCompleted || isPreviousCompleted;

            return (
              <div 
                key={node.id} 
                className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${isUnlocked ? 'scale-100' : 'scale-90 grayscale opacity-20'}`}
                style={{ marginLeft: index % 2 === 0 ? '-80px' : '80px' }}
              >
                <div className="absolute -top-12 text-[10px] font-black text-slate-600 uppercase tracking-widest">{node.type}</div>
                <button 
                  disabled={!isUnlocked}
                  onClick={() => completeNode(node.id)}
                  className={`w-36 h-36 rounded-[3rem] flex items-center justify-center transition-all border-4 shadow-2xl relative group overflow-hidden ${
                    isCompleted 
                    ? 'bg-emerald-600 border-emerald-400 shadow-emerald-500/40' 
                    : isUnlocked 
                      ? 'bg-indigo-600 border-indigo-400 hover:scale-110 active:scale-95 shadow-indigo-600/40' 
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-16 h-16 text-white" /> : isUnlocked ? getIcon(node.icon, node.type) : <Lock className="w-12 h-12 text-slate-800" />}
                  
                  {/* Expanded Hover Data */}
                  <div className="absolute bottom-full mb-8 opacity-0 group-hover:opacity-100 transition-all w-64 text-center pointer-events-none translate-y-4 group-hover:translate-y-0">
                    <div className="bg-slate-950/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">{node.type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">LVL {node.level}</span>
                      </div>
                      <p className="text-base font-bold text-white mb-2 leading-tight">{node.title}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{node.description}</p>
                      {!isCompleted && isUnlocked && (
                        <p className="mt-4 text-[9px] font-black text-indigo-300 uppercase animate-pulse">Touch to Master</p>
                      )}
                    </div>
                    <div className="w-4 h-4 bg-slate-950/90 border-r border-b border-white/10 rotate-45 mx-auto -mt-2 shadow-2xl" />
                  </div>
                </button>
                <div className="mt-6 text-center space-y-1">
                  <span className={`text-[11px] font-black uppercase tracking-[0.4em] block ${isUnlocked ? 'text-white' : 'text-slate-700'}`}>{node.title}</span>
                  {isCompleted && <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Orbit Mastered</span>}
                </div>
              </div>
            );
          })}
          
          <div className="pt-24 text-center max-w-sm mx-auto space-y-8">
            <div className="p-10 bg-indigo-500/5 border border-indigo-500/10 rounded-[3rem] shadow-3xl backdrop-blur-xl relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30 group-hover:rotate-12 transition-transform">
                <Smile className="w-10 h-10 text-amber-400" />
              </div>
              <h4 className="text-2xl font-black text-white mb-4 mt-4 tracking-tight">The Horizon Awaits</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium italic">"Every star you touch is a part of your healing constellation. Keep orbiting."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyMap;
