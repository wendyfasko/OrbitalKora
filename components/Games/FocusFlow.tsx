
import React, { useState, useEffect, useRef } from 'react';
import { Target, X, Trophy, Sparkles, Brain, Zap } from 'lucide-react';

interface StarOrbit {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
}

const FocusFlow: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [stars, setStars] = useState<StarOrbit[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('focus_flow_highscore') || 0));
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  // Fix: Provided null as initial value for useRef to satisfy environment-specific strictness (expected 1 argument)
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Generate initial stars
    const initialStars = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() * 20 + 30,
      opacity: 1
    }));
    setStars(initialStars);

    const spawnInterval = setInterval(() => {
      if (!isGameOver) {
        setStars(prev => {
          if (prev.length > 6) return prev;
          return [...prev, {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: -10,
            speed: Math.random() * 0.5 + (0.2 * level),
            size: Math.random() * 20 + 30,
            opacity: 1
          }];
        });
      }
    }, 2000);

    return () => {
      clearInterval(spawnInterval);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [level, isGameOver]);

  const updateStars = () => {
    setStars(prev => prev.map(s => {
      const nextY = s.y + s.speed;
      if (nextY > 105) {
        // Star missed
        return { ...s, y: -20, x: Math.random() * 80 + 10 };
      }
      return { ...s, y: nextY };
    }));
    requestRef.current = requestAnimationFrame(updateStars);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateStars);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const catchStar = (id: number) => {
    setStars(prev => prev.filter(s => s.id !== id));
    setScore(s => {
      const newScore = s + 100;
      if (newScore > level * 1000) setLevel(l => l + 1);
      return newScore;
    });
    if (navigator.vibrate) navigator.vibrate(20);
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('focus_flow_highscore', score.toString());
    }
  }, [score, highScore]);

  return (
    <div className="fixed inset-0 z-[150] bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-1000">
      {/* HUD */}
      <header className="p-8 flex items-center justify-between relative z-20 bg-gradient-to-b from-slate-950 to-transparent">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/20 shadow-xl">
            <Brain className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Focus Flow</h2>
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Target Training</p>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Attention Score</p>
            <p className="text-3xl font-black text-white leading-none tracking-tighter tabular-nums">{score}</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mastery Rank</p>
            <p className="text-3xl font-black text-amber-400 leading-none tracking-tighter tabular-nums">{level}</p>
          </div>
        </div>

        <button onClick={onExit} className="p-4 bg-white/5 hover:bg-rose-500/20 rounded-full text-white border border-white/5 transition-all">
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Game Stage */}
      <div className="flex-1 relative">
        {stars.map(star => (
          <button
            key={star.id}
            onClick={() => catchStar(star.id)}
            className="absolute flex items-center justify-center transition-transform hover:scale-125 active:scale-90"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px` }}
          >
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-full h-full border-2 border-amber-400/50 rounded-full flex items-center justify-center bg-slate-900/40">
              <Zap className="w-1/2 h-1/2 text-amber-400" />
            </div>
          </button>
        ))}

        {/* Level Banner */}
        <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[1em] animate-pulse">Stay in the flow</p>
        </div>
      </div>

      {/* High Score Overlay if Game Over (Conceptual) */}
      {isGameOver && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
          <div className="w-24 h-24 bg-amber-500/20 rounded-[2rem] flex items-center justify-center mb-8 border border-amber-500/30">
            <Trophy className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-4xl font-black text-white mb-2 italic">Flow Complete</h3>
          <p className="text-slate-400 mb-8 font-medium">Your attention engine is charging. Return to orbit soon.</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Final Score</p>
              <p className="text-3xl font-black text-white">{score}</p>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">High Score</p>
              <p className="text-3xl font-black text-amber-400">{highScore}</p>
            </div>
          </div>
          <button 
            onClick={onExit}
            className="w-full max-w-sm py-6 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-600/30 active:scale-95 transition-all"
          >
            Stabilize Orbit
          </button>
        </div>
      )}
    </div>
  );
};

export default FocusFlow;
