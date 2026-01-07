
import React, { useState, useEffect } from 'react';
import { Flame, X, Trophy, Zap, Sparkles } from 'lucide-react';

interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  label: string;
}

const RAGE_THOUGHTS = ["Unfair!", "Why me?", "Noise!", "Overload!", "Frustrated!", "Ignored!"];

const RageRelease: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [score, setScore] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (asteroids.length < 5) {
        const newAst: Asteroid = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          size: Math.random() * 40 + 60,
          label: RAGE_THOUGHTS[Math.floor(Math.random() * RAGE_THOUGHTS.length)]
        };
        setAsteroids(prev => [...prev, newAst]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [asteroids]);

  const shatter = (id: number) => {
    setAsteroids(prev => prev.filter(a => a.id !== id));
    setScore(s => s + 50);
    // Vibrate if available
    if (navigator.vibrate) navigator.vibrate(50);
    
    if (score > 500 && !isEnding) {
      setIsEnding(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-slate-950 flex flex-col items-center justify-center overflow-hidden p-6 animate-in fade-in zoom-in duration-500">
      <div className="absolute inset-0 bg-rose-900/10 animate-pulse pointer-events-none" />
      
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rage Release</h2>
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Constructive Destruction</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Energy Released</p>
          <p className="text-2xl font-black text-white">{score}</p>
        </div>
        <button onClick={onExit} className="p-3 bg-white/5 hover:bg-rose-500/20 rounded-full text-white transition-all">
          <X className="w-6 h-6" />
        </button>
      </header>

      {isEnding ? (
        <div className="text-center space-y-8 animate-in zoom-in-95 duration-700 max-w-sm">
          <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto border border-rose-500/30">
            <Trophy className="w-12 h-12 text-rose-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-white tracking-tight">Intensity Level Lowered</h3>
            <p className="text-slate-400">You've successfully released that wave of energy. Take a deep orbit with Kora now.</p>
          </div>
          <button 
            onClick={onExit}
            className="w-full py-5 bg-rose-600 text-white rounded-2xl font-bold shadow-xl shadow-rose-600/30 hover:scale-105 transition-all"
          >
            Return to Sanctuary
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full max-w-4xl mx-auto">
          {asteroids.map(ast => (
            <button
              key={ast.id}
              onClick={() => shatter(ast.id)}
              className="absolute animate-in zoom-in-50 duration-300 flex items-center justify-center hover:scale-110 active:scale-90 transition-transform"
              style={{ left: `${ast.x}%`, top: `${ast.y}%`, width: `${ast.size}px`, height: `${ast.size}px` }}
            >
              <div className="absolute inset-0 bg-rose-600/20 border-2 border-rose-500/40 rounded-[2rem] rotate-45 group-hover:rotate-90 transition-all shadow-[0_0_20px_rgba(244,63,94,0.2)]" />
              <span className="relative z-10 text-[9px] font-black uppercase text-white tracking-widest pointer-events-none">{ast.label}</span>
            </button>
          ))}
          <p className="absolute bottom-12 left-0 right-0 text-center text-[10px] font-black text-rose-500/40 uppercase tracking-[0.5em] animate-pulse">Shatter the fragments</p>
        </div>
      )}

      {/* Background shards */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose-500/5 blur-[80px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-500/5 blur-[80px] rounded-full animate-pulse delay-1000" />
    </div>
  );
};

export default RageRelease;
