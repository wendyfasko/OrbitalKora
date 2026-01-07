
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Activity, ShieldCheck, Calendar, Info, Plus, ChevronRight, Loader2, Wand2, Moon, Sun, Star as StarIcon } from 'lucide-react';
import { getKoraResponse, getTarotReading, getCycleAffirmation } from '../services/gemini';

const SYMPTOMS = ["Cramps", "Fatigue", "Mood Swings", "Headache", "Brain Fog", "High Energy", "Anxiety"];
const TAROT_CARDS = ["The Star", "The Moon", "The Sun", "The Empress", "The High Priestess", "Strength", "The World"];

const WomensHealth: React.FC = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('orbital_kora_progress');
    return saved ? JSON.parse(saved) : { starShards: 0, focusMinutes: 0, cycleDay: 1, lastPeriodDate: new Date().toISOString() };
  });
  
  const [logs, setLogs] = useState<string[]>([]);
  const [affirmation, setAffirmation] = useState('');
  const [tarotReading, setTarotReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTarotLoading, setIsTarotLoading] = useState(false);

  useEffect(() => {
    const lastDate = new Date(progress.lastPeriodDate);
    const diff = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentDay = (diff % 28) + 1;
    if (currentDay !== progress.cycleDay) {
      setProgress(p => ({ ...p, cycleDay: currentDay }));
    }
    fetchAffirmation(currentDay);
  }, []);

  const fetchAffirmation = async (day: number) => {
    const phase = getPhase(day).name;
    const result = await getCycleAffirmation(day, phase);
    setAffirmation(result || "Your orbit is bright today.");
  };

  const getPhase = (day: number) => {
    if (day <= 5) return { name: "Menstrual Orbit", desc: "Energy is low. Prioritize rest and intuitive movement." };
    if (day <= 13) return { name: "Follicular Orbit", desc: "Energy is rising. Great for complex problem solving." };
    if (day <= 15) return { name: "Ovulatory Peak", desc: "Maximum verbal and social energy." };
    return { name: "Luteal Descent", desc: "Sensory sensitivity may increase. Focus on grounding." };
  };

  const phase = getPhase(progress.cycleDay);

  const drawTarot = async () => {
    setIsTarotLoading(true);
    const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    const mood = logs.length > 0 ? logs.join(', ') : 'peaceful';
    const result = await getTarotReading(card, mood);
    setTarotReading(`**You drew ${card}**\n\n${result}`);
    setIsTarotLoading(false);
  };

  const toggleSymptom = (s: string) => {
    setLogs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-right-8 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-pink-500/20 rounded-[1.5rem] text-pink-400 shadow-lg shadow-pink-500/10">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Body Literacy Sanctuary</h2>
            <p className="text-slate-400 font-medium">100% Free • Private • Empowerment-First</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-8 py-4 bg-pink-500/10 rounded-3xl border border-pink-500/20 text-center min-w-[140px]">
            <p className="text-[10px] text-pink-400 font-black uppercase tracking-[0.2em] mb-1">Cycle Orbit</p>
            <p className="text-3xl font-bold text-white leading-none">Day {progress.cycleDay}</p>
          </div>
        </div>
      </div>

      {/* Daily Affirmation Banner */}
      <section className="relative group overflow-hidden bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-pink-900/40 rounded-[2.5rem] border border-white/10 p-10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
          <Sparkles className="w-32 h-32 text-pink-400" />
        </div>
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 text-pink-400 text-[10px] font-black rounded-full uppercase tracking-widest">Daily Cosmic Affirmation</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white italic leading-relaxed">
            {affirmation ? `"${affirmation}"` : "Gathering the stars for your day..."}
          </h3>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phase Info & Symptoms */}
        <div className="space-y-8">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-2xl font-bold text-pink-300 flex items-center gap-3"><Activity className="w-6 h-6" /> Symptom Mapping</h3>
            <div className="grid grid-cols-2 gap-3">
              {SYMPTOMS.map(s => (
                <button 
                  key={s} 
                  onClick={() => toggleSymptom(s)}
                  className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left flex items-center justify-between group ${logs.includes(s) ? 'bg-pink-600 border-pink-400 text-white shadow-lg' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                  {s}
                  {logs.includes(s) && <Sparkles className="w-4 h-4" />}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-black text-center pt-4">Your data stays in your orbit (local storage only).</p>
          </div>

          <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] space-y-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-white text-lg">{phase.name} Insights</h4>
            </div>
            <p className="text-indigo-100/70 leading-relaxed font-medium">{phase.desc}</p>
          </div>
        </div>

        {/* Tarot Section */}
        <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
          
          <div className="w-20 h-20 bg-indigo-500/20 rounded-[2rem] flex items-center justify-center text-indigo-400 shadow-xl border border-indigo-500/20">
            <Wand2 className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-white tracking-tight">Cosmic Tarot</h3>
            <p className="text-slate-400 max-w-sm mx-auto">Use the stars as a mirror. Draw a card for psychological reflection based on your current state.</p>
          </div>

          <div className="min-h-[200px] w-full flex flex-col items-center justify-center">
            {tarotReading ? (
              <div className="bg-slate-950/50 border border-white/10 rounded-3xl p-8 animate-in zoom-in-95 duration-500 text-left space-y-4 shadow-inner">
                <p className="text-white text-base leading-relaxed whitespace-pre-wrap">{tarotReading}</p>
                <button onClick={() => setTarotReading('')} className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Shuffle Deck</button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 opacity-40">
                <div className="aspect-[2/3] w-20 bg-slate-800 rounded-xl border-2 border-slate-700 border-dashed" />
                <div className="aspect-[2/3] w-24 bg-indigo-900/20 rounded-xl border-2 border-indigo-500/30 flex items-center justify-center">
                  <Moon className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="aspect-[2/3] w-20 bg-slate-800 rounded-xl border-2 border-slate-700 border-dashed" />
              </div>
            )}
          </div>

          {!tarotReading && (
            <button 
              onClick={drawTarot}
              disabled={isTarotLoading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              {isTarotLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Wand2 className="w-6 h-6" />}
              Draw Reflection Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WomensHealth;
