
import React, { useState, useEffect } from 'react';
import { AppView, UserProgress } from '../types';
import { 
  Zap, 
  Brain, 
  HeartPulse, 
  Wind, 
  Sparkles,
  Waves,
  Feather,
  Copyright,
  Trophy,
  Moon,
  Rocket,
  Crown,
  Map as MapIcon,
  Battery
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
  isPremium: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, isPremium }) => {
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

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <div className="flex justify-center gap-3 flex-wrap">
          <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{progress.starShards} Shards</span>
          </div>
          <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center gap-2">
            <Battery className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{progress.stabilityCharge}% Stability</span>
          </div>
          {isPremium && (
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Premium Orbit</span>
            </div>
          )}
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 italic">Cosmic Journey</span>
        </h2>
        
        {/* Billion Dollar "Ladder" CTA */}
        <button 
          onClick={() => onNavigate(AppView.JOURNEY_MAP)}
          className="group relative flex items-center justify-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-6 rounded-[2rem] mx-auto shadow-2xl shadow-indigo-500/40 hover:-translate-y-1 active:scale-95 transition-all"
        >
          <MapIcon className="w-6 h-6 text-white" />
          <div className="text-left">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] leading-none mb-1">Enter The Path</p>
            <p className="text-lg font-bold text-white leading-none">View Skill Map</p>
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-black animate-bounce">NEW LEVELS</div>
        </button>
      </section>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <ModuleCard 
          title="ADHD Focus" 
          description="Foundation training for your executive engine."
          icon={<Zap className="w-8 h-8 text-amber-400" />}
          color="amber"
          onClick={() => onNavigate(AppView.ADHD)}
          tag="Quests"
        />
        <ModuleCard 
          title="Autism Hub" 
          description="Decoding the social galaxy with AI."
          icon={<Brain className="w-8 h-8 text-indigo-400" />}
          color="indigo"
          onClick={() => onNavigate(AppView.AUTISM)}
          tag="Deconstruction"
        />
        <ModuleCard 
          title="Sensory Tuning" 
          description="Immediate relief and profile management."
          icon={<Waves className="w-8 h-8 text-cyan-400" />}
          color="cyan"
          onClick={() => onNavigate(AppView.SENSORY)}
          tag="Safety"
        />
        <ModuleCard 
          title="Wellness Lab" 
          description="Guided journeys and sound therapy."
          icon={<Wind className="w-8 h-8 text-violet-400" />}
          color="violet"
          onClick={() => onNavigate(AppView.MEDITATION)}
          tag="Rest"
        />
        <ModuleCard 
          title="Body Literacy" 
          description="Free cycle tracking & bio-insights."
          icon={<Sparkles className="w-8 h-8 text-pink-400" />}
          color="pink"
          onClick={() => onNavigate(AppView.WOMENS_HEALTH)}
          tag="Autonomy"
        />
        <ModuleCard 
          title="Kora Companion" 
          description="Talk to your AI guide for support."
          icon={<Sparkles className="w-8 h-8 text-white" />}
          color="indigo"
          onClick={() => onNavigate(AppView.AI_COMPANION)}
          tag="AI Insight"
        />
      </div>

      {/* Proprietary License Footer */}
      <div className="text-center py-12 space-y-4 border-t border-white/5 mt-12">
        <div className="flex items-center justify-center gap-2">
          <Copyright className="w-4 h-4 text-indigo-400" />
          <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-black">
            2024 OrbitalKora • Universal Wellness Infrastructure
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-white font-bold tracking-tight">
            Proprietary Technology Developed by Wendy Fasko
          </p>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.4em]">
            Founder & Lead Architect • Gamified Neuro-Wellness
          </p>
        </div>
      </div>
    </div>
  );
};

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  tag: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon, color, onClick, tag }) => {
  const colorMap: Record<string, string> = {
    amber: 'hover:border-amber-500/30 bg-amber-500/5',
    indigo: 'hover:border-indigo-500/30 bg-indigo-500/5',
    cyan: 'hover:border-cyan-500/30 bg-cyan-500/5',
    violet: 'hover:border-violet-500/30 bg-violet-500/5',
    pink: 'hover:border-pink-500/30 bg-pink-500/5',
  };

  return (
    <button 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-8 text-left transition-all duration-500 hover:-translate-y-2 active:scale-95 active:duration-75 ${colorMap[color]}`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="inline-flex p-4 rounded-3xl bg-slate-950 shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 border border-white/5 px-3 py-1 rounded-full">{tag}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed font-medium">{description}</p>
    </button>
  );
};

export default Dashboard;
