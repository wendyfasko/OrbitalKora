
import React, { useState, useEffect } from 'react';
import { Wind, ShieldAlert, X, Volume2, Cloud, Sparkles, Waves } from 'lucide-react';

interface SensorySuiteProps {
  overwhelmActive: boolean;
  onExit: () => void;
}

const SensorySuite: React.FC<SensorySuiteProps> = ({ overwhelmActive, onExit }) => {
  const [reliefType, setReliefType] = useState<'brown' | 'white' | 'visual'>('brown');

  if (overwhelmActive) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
        <div className="absolute inset-0 bg-indigo-900/10 animate-pulse" />
        <div className="relative z-10 max-w-lg space-y-12">
          <div className="w-32 h-32 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center animate-[ping_3s_infinite]">
            <Wind className="w-12 h-12 text-indigo-400" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white tracking-tight">Safe Orbit Engaged</h2>
            <p className="text-indigo-200/60 text-lg">Breathe with the light. You are safe. The world is waiting for you whenever you are ready.</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <button 
                onClick={() => setReliefType('brown')}
                className={`p-6 rounded-3xl border transition-all ${reliefType === 'brown' ? 'bg-indigo-600 border-indigo-400 scale-105' : 'bg-white/5 border-white/10'}`}
              >
                <Waves className="w-8 h-8 text-white mb-2 mx-auto" />
                <p className="text-[10px] uppercase font-bold text-white">Brown Noise</p>
              </button>
              <button 
                onClick={() => setReliefType('visual')}
                className={`p-6 rounded-3xl border transition-all ${reliefType === 'visual' ? 'bg-indigo-600 border-indigo-400 scale-105' : 'bg-white/5 border-white/10'}`}
              >
                <Sparkles className="w-8 h-8 text-white mb-2 mx-auto" />
                <p className="text-[10px] uppercase font-bold text-white">Stardust Flow</p>
              </button>
            </div>

            <button 
              onClick={onExit}
              className="mt-8 px-12 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all flex items-center gap-2 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Return to Orbit
            </button>
          </div>
        </div>

        {/* Floating breathing dots */}
        <div className="absolute bottom-12 flex gap-4">
          {[1,2,3,4,5].map(i => (
            <div 
              key={i} 
              className="w-3 h-3 rounded-full bg-indigo-400/30" 
              style={{ animation: `pulse 4s ease-in-out ${i * 0.5}s infinite` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="p-3 bg-cyan-500/20 rounded-2xl text-cyan-400">
          <Waves className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Sensory Lab</h2>
          <p className="text-slate-400">Tune your environment to your unique nervous system.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-300"><Volume2 className="w-5 h-5"/> Auditory Tuning</h3>
          <div className="space-y-4">
            <VolumeSlider label="High Frequency Filter" value={80} />
            <VolumeSlider label="Background Sharpness" value={40} />
            <VolumeSlider label="Voice Isolation" value={95} />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-300"><Cloud className="w-5 h-5"/> Visual Relief</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 bg-slate-950/50 border border-cyan-500/30 rounded-2xl hover:bg-cyan-500/10 transition-all text-center">
              <div className="w-4 h-4 rounded-full bg-amber-200 mx-auto mb-2 shadow-[0_0_10px_rgba(253,242,208,0.5)]" />
              <p className="text-xs font-bold text-white uppercase">Amber Filter</p>
            </button>
            <button className="p-6 bg-slate-950/50 border border-cyan-500/30 rounded-2xl hover:bg-cyan-500/10 transition-all text-center">
              <div className="w-4 h-4 rounded-full bg-slate-800 border border-white/20 mx-auto mb-2" />
              <p className="text-xs font-bold text-white uppercase">Dark Mode+</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VolumeSlider: React.FC<{label: string, value: number}> = ({ label, value }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default SensorySuite;
