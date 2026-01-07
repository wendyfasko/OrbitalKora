
import React from 'react';
import { HeartPulse, ShieldAlert, Sparkles, Wind, ArrowRight, PenLine, Flame, CloudRain, Moon, Gamepad2 } from 'lucide-react';
import JournalModule from './JournalModule';

interface MentalHealthSuiteProps {
  onPlayRage: () => void;
}

const MentalHealthSuite: React.FC<MentalHealthSuiteProps> = ({ onPlayRage }) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-top-4 duration-500 pb-20">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400">
          <HeartPulse className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Mental Wellness</h2>
          <p className="text-slate-400">Compassionate pathways for every state of mind.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-rose-300">Grounding Paths</h3>
          <div className="grid gap-4">
            <button 
              onClick={onPlayRage}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-rose-900/40 to-slate-900/40 border border-rose-500/20 rounded-3xl hover:bg-rose-900/60 transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-500/20 rounded-xl"><Flame className="w-6 h-6 text-rose-500" /></div>
                <div>
                  <h4 className="font-bold text-white mb-1 flex items-center gap-2">Rage Release <Gamepad2 className="w-4 h-4 text-rose-400 animate-pulse" /></h4>
                  <p className="text-xs text-rose-200/60 leading-relaxed">Shatter asteroids to safely release intensity.</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
            <PathCard title="Shadow Orbit" desc="Low-energy care for depression and fatigue." icon={<Moon className="w-5 h-5 text-indigo-400" />} />
            <PathCard title="High Sensitivity" desc="Grounding for BPD and high-intensity moods." icon={<CloudRain className="w-5 h-5 text-cyan-400" />} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-rose-300"><PenLine className="w-5 h-5"/> Thought Reframing</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-[10px] text-rose-500 font-bold uppercase mb-2">Heavy Thought</p>
                <p className="text-sm text-slate-300 italic">"I'm failing at everything today."</p>
              </div>
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                <p className="text-[10px] text-rose-400 font-bold uppercase mb-2">Cosmic Perspective</p>
                <p className="text-sm text-white font-medium">"My energy is low, which is a signal to rest. One orbit is not the whole galaxy."</p>
              </div>
            </div>
          </div>
          <button className="w-full p-6 bg-rose-600 hover:bg-rose-500 text-white rounded-3xl font-bold shadow-lg shadow-rose-500/20 flex items-center justify-center gap-3 transition-all group">
            <ShieldAlert className="w-6 h-6 group-hover:animate-pulse" /> Immediate Crisis Support
          </button>
        </div>
      </div>
      <JournalModule />
    </div>
  );
};

const PathCard = ({title, desc, icon}: any) => (
  <button className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group text-left">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
      <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
    <ArrowRight className="w-4 h-4 text-white" />
  </button>
);

export default MentalHealthSuite;
