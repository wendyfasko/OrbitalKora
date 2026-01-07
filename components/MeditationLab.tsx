
import React, { useState, useEffect } from 'react';
import { Wind, Moon, Sun, CloudRain, Zap, Play, Square, Sparkles, Volume2, Info, Music, Search, Filter } from 'lucide-react';

const AUDIO_LIBRARY = [
  { id: 'white', type: 'noise', label: 'White Noise', desc: 'Static shield', color: 'bg-slate-200' },
  { id: 'brown', type: 'noise', label: 'Brown Noise', desc: 'Deep bass roar', color: 'bg-amber-900' },
  { id: 'pink', type: 'noise', label: 'Pink Noise', desc: 'Natural wind', color: 'bg-rose-400' },
  { id: 'blue', type: 'noise', label: 'Blue Noise', desc: 'High frequency', color: 'bg-blue-400' },
  { id: 'violet', type: 'noise', label: 'Violet Noise', desc: 'Upper treble', color: 'bg-violet-400' },
  
  { id: 'rain', type: 'nature', label: 'Storm Cells', desc: 'Heavy thunder', color: 'bg-slate-600' },
  { id: 'forest', type: 'nature', label: 'Dusk Forest', desc: 'Night cicadas', color: 'bg-emerald-800' },
  { id: 'ocean', type: 'nature', label: 'Deep Trench', desc: 'Submerged echo', color: 'bg-cyan-800' },
  { id: 'wind-peaks', type: 'nature', label: 'Alpine Peak', desc: 'Howling gusts', color: 'bg-indigo-300' },
  { id: 'crickets', type: 'nature', label: 'Summer Night', desc: 'Peaceful garden', color: 'bg-green-900' },

  { id: 'debussy', type: 'music', label: 'Clair de Lune', desc: 'Debussy (Focus)', color: 'bg-indigo-900' },
  { id: 'satie', type: 'music', label: 'Gymnopédie No.1', desc: 'Erik Satie (Rest)', color: 'bg-rose-900' },
  { id: 'mozart', type: 'music', label: 'Piano Sonata 16', desc: 'Mozart (IQ Boost)', color: 'bg-amber-800' },
  { id: 'beethoven', type: 'music', label: 'Moonlight 1st', desc: 'Beethoven (Flow)', color: 'bg-slate-900' },
  { id: 'vivaldi', type: 'music', label: 'Winter (Largo)', desc: 'Vivaldi (Chill)', color: 'bg-blue-900' },
  
  { id: 'black-hole', type: 'celestial', label: 'Singularity', desc: 'Gravity hum', color: 'bg-black' },
  { id: 'pulsar', type: 'celestial', label: 'Neutron Star', desc: 'Rapid pulse', color: 'bg-purple-900' },
  { id: 'nebula', type: 'celestial', label: 'Gas Giant', desc: 'Whirling vortex', color: 'bg-pink-900' },
];

const MeditationLab: React.FC = () => {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathText, setBreathText] = useState('Prepare...');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'noise' | 'nature' | 'music' | 'celestial'>('all');

  useEffect(() => {
    let timer: any;
    if (isBreathing) {
      let step = 0;
      const phases = [
        { text: 'Inhale...', duration: 4000 },
        { text: 'Hold...', duration: 4000 },
        { text: 'Exhale...', duration: 4000 },
        { text: 'Wait...', duration: 4000 }
      ];
      const cycle = () => {
        setBreathText(phases[step].text);
        timer = setTimeout(() => {
          step = (step + 1) % phases.length;
          cycle();
        }, phases[step].duration);
      };
      cycle();
    } else {
      setBreathText('Breathe');
    }
    return () => clearTimeout(timer);
  }, [isBreathing]);

  const filteredLibrary = AUDIO_LIBRARY.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-violet-500/20 rounded-[1.5rem] text-violet-400">
            <Wind className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Sonic Sanctuary</h2>
            <p className="text-slate-400 font-medium">Massive library of cognitive shielding and rest.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Breathing Module */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden min-h-[500px]">
            <div className={`absolute inset-0 bg-violet-500/5 transition-all duration-[4000ms] ${isBreathing && breathText === 'Inhale...' ? 'scale-150 opacity-20' : 'scale-100 opacity-0'}`} />
            <div className={`w-64 h-64 rounded-full border-4 border-violet-500/20 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${isBreathing ? (breathText === 'Inhale...' ? 'scale-150 bg-violet-500/10' : breathText === 'Exhale...' ? 'scale-90 bg-transparent' : 'scale-125') : ''}`}>
              <div className="text-3xl font-bold text-white tracking-widest uppercase">{breathText}</div>
            </div>
            <button onClick={() => setIsBreathing(!isBreathing)} className={`mt-16 px-12 py-4 rounded-full font-bold transition-all shadow-xl ${isBreathing ? 'bg-slate-800 text-white' : 'bg-violet-600 text-white hover:bg-violet-500'}`}>
              {isBreathing ? 'Finish Session' : 'Start Box Breathing'}
            </button>
          </div>
        </div>

        {/* Audio Vault */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search audio orbits..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:ring-2 focus:ring-violet-500/50 outline-none"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scroll-hide">
              {['all', 'noise', 'nature', 'music', 'celestial'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${filter === t ? 'bg-violet-600 border-violet-400 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {filteredLibrary.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveAudio(activeAudio === item.id ? null : item.id)}
                className={`flex items-center gap-4 p-5 border rounded-3xl transition-all group ${activeAudio === item.id ? 'bg-violet-600 border-violet-400' : 'bg-slate-950 border-white/5 hover:border-white/10'}`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} shadow-inner flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {item.type === 'music' ? <Music className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <h4 className={`font-bold text-sm ${activeAudio === item.id ? 'text-white' : 'text-slate-200'}`}>{item.label}</h4>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${activeAudio === item.id ? 'text-violet-200' : 'text-slate-500'}`}>{item.desc}</p>
                </div>
                {activeAudio === item.id ? <Square className="w-4 h-4 text-white fill-white" /> : <Play className="w-4 h-4 text-slate-700" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationLab;
