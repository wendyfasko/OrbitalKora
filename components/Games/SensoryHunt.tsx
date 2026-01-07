
import React, { useState, useEffect } from 'react';
// Fix: Added Gamepad2 to the imports from lucide-react
import { Sparkles, X, Trophy, Stars, Moon, Sun, Wind, CloudRain, Heart, Gamepad2 } from 'lucide-react';

interface Artifact {
  id: number;
  type: 'sparkle' | 'moon' | 'sun' | 'wind' | 'rain' | 'heart';
  x: number;
  y: number;
  size: number;
  found: boolean;
}

const ARTIFACT_TYPES = [
  { type: 'sparkle', icon: <Sparkles className="w-1/2 h-1/2" />, label: 'Glowing Stardust' },
  { type: 'moon', icon: <Moon className="w-1/2 h-1/2" />, label: 'Silent Crescent' },
  { type: 'sun', icon: <Sun className="w-1/2 h-1/2" />, label: 'Warm Core' },
  { type: 'wind', icon: <Wind className="w-1/2 h-1/2" />, label: 'Gentle Breeze' },
  { type: 'rain', icon: <CloudRain className="w-1/2 h-1/2" />, label: 'Soft Tap' },
  { type: 'heart', icon: <Heart className="w-1/2 h-1/2" />, label: 'Calm Pulse' },
];

const SensoryHunt: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Generate random artifacts in the sector
    const generated = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      type: ARTIFACT_TYPES[Math.floor(Math.random() * ARTIFACT_TYPES.length)].type as any,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      size: Math.random() * 20 + 40,
      found: false
    }));
    setArtifacts(generated);
    setTargetIndex(Math.floor(Math.random() * ARTIFACT_TYPES.length));
  }, []);

  const currentTarget = ARTIFACT_TYPES[targetIndex];

  const handleArtifactClick = (art: Artifact) => {
    if (art.type === currentTarget.type) {
      setArtifacts(prev => prev.map(a => a.id === art.id ? { ...a, found: true } : a));
      setScore(s => s + 100);
      if (navigator.vibrate) navigator.vibrate(30);
      
      // Select new target
      setTimeout(() => {
        setTargetIndex(Math.floor(Math.random() * ARTIFACT_TYPES.length));
        if (score > 1000) setIsFinished(true);
      }, 500);
    } else {
      // Gentle incorrect feedback (visual only)
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
      
      <header className="p-8 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-indigo-500/20 rounded-2xl border border-indigo-500/20">
            <Gamepad2 className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Sensory Hunt</h2>
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Identify the Target Artifact</p>
          </div>
        </div>

        <div className="flex gap-12">
          <div className="text-center bg-white/5 px-8 py-3 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target Object</p>
            <div className="flex items-center gap-2 text-white font-bold">
              {currentTarget.icon}
              <span>{currentTarget.label}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Insight Score</p>
            <p className="text-3xl font-black text-white leading-none tracking-tighter">{score}</p>
          </div>
        </div>

        <button onClick={onExit} className="p-4 bg-white/5 hover:bg-rose-500/20 rounded-full text-white border border-white/5 transition-all">
          <X className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 relative">
        {artifacts.map(art => {
          const artTypeData = ARTIFACT_TYPES.find(t => t.type === art.type);
          if (art.found) return null;
          
          return (
            <button
              key={art.id}
              onClick={() => handleArtifactClick(art)}
              className="absolute animate-in zoom-in-50 duration-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
              style={{ left: `${art.x}%`, top: `${art.y}%`, width: `${art.size}px`, height: `${art.size}px` }}
            >
              <div className="absolute inset-0 bg-white/5 rounded-full border border-white/5 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all blur-[2px]" />
              <div className="relative text-indigo-300/60 group-hover:text-white transition-colors">
                {artTypeData?.icon}
              </div>
            </button>
          );
        })}

        <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.8em] animate-pulse">Scan the nebula for artifacts</p>
        </div>
      </div>

      {isFinished && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl z-[200] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
          <div className="w-24 h-24 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center mb-8 border border-indigo-500/30">
            <Trophy className="w-12 h-12 text-indigo-400" />
          </div>
          <h3 className="text-4xl font-black text-white mb-2 italic">Sector Cleared</h3>
          <p className="text-slate-400 mb-8 font-medium">Your sensory awareness is stabilizing. Return to orbit whenever you're ready.</p>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 w-full max-w-sm mb-12">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Shards Gained</p>
            <p className="text-4xl font-black text-indigo-400">+{Math.floor(score / 10)}</p>
          </div>
          <button 
            onClick={onExit}
            className="w-full max-w-sm py-6 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 transition-all active:scale-95"
          >
            Stabilize Orbit
          </button>
        </div>
      )}
    </div>
  );
};

export default SensoryHunt;
