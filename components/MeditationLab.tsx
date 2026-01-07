
import React, { useState, useEffect } from 'react';
import { Wind, Moon, Sun, CloudRain, Zap, Play, Square, Sparkles, Volume2, Info, Music, Search, Filter, Headphones, Waves, Bird, Mountain, Stars } from 'lucide-react';

const AUDIO_LIBRARY = [
  // NOISES
  { id: 'white', type: 'noise', label: 'Pure White', desc: 'Flat frequency mask', color: 'bg-slate-100' },
  { id: 'brown', type: 'noise', label: 'Deep Brown', desc: 'Rumbling waterfall', color: 'bg-amber-900' },
  { id: 'pink', type: 'noise', label: 'Soft Pink', desc: 'Steady rain profile', color: 'bg-rose-300' },
  { id: 'grey', type: 'noise', label: 'Balanced Grey', desc: 'Psychoacoustic level', color: 'bg-slate-500' },
  { id: 'green', type: 'noise', label: 'Forest Green', desc: 'Nature-optimized', color: 'bg-emerald-600' },
  { id: 'blue', type: 'noise', label: 'Shimmer Blue', desc: 'High-end masking', color: 'bg-blue-400' },
  { id: 'violet', type: 'noise', label: 'Crisp Violet', desc: 'Treble focus', color: 'bg-violet-400' },
  
  // NATURE
  { id: 'storm', type: 'nature', label: 'Pacific Storm', desc: 'Thunder & surf', color: 'bg-slate-800' },
  { id: 'rain-tin', type: 'nature', label: 'Tin Roof Rain', desc: 'Cozy rhythmic taps', color: 'bg-blue-900' },
  { id: 'forest-birds', type: 'nature', label: 'Morning Grove', desc: 'Dawn chorus', color: 'bg-emerald-900' },
  { id: 'creek', type: 'nature', label: 'Crystal Creek', desc: 'Bubbly water flow', color: 'bg-cyan-600' },
  { id: 'fire', type: 'nature', label: 'Cracking Hearth', desc: 'Warm fireplace', color: 'bg-orange-900' },
  { id: 'deep-sea', type: 'nature', label: 'Abyssal Echo', desc: 'Underwater drone', color: 'bg-indigo-900' },
  { id: 'summer-night', type: 'nature', label: 'Cicada Night', desc: 'Hot summer bugs', color: 'bg-slate-900' },

  // CLASSICAL SYMPHONY
  { id: 'debussy-clair', type: 'music', label: 'Clair de Lune', desc: 'Debussy (Rest)', color: 'bg-indigo-700' },
  { id: 'satie-gym', type: 'music', label: 'Gymnopédie No.1', desc: 'Satie (Chill)', color: 'bg-pink-800' },
  { id: 'bach-cello', type: 'music', label: 'Cello Suite No.1', desc: 'Bach (Grounding)', color: 'bg-amber-800' },
  { id: 'beethoven-moon', type: 'music', label: 'Moonlight Sonata', desc: 'Beethoven (Focus)', color: 'bg-slate-950' },
  { id: 'mozart-40', type: 'music', label: 'Symphony No. 40', desc: 'Mozart (IQ Flow)', color: 'bg-yellow-900' },
  { id: 'chopin-nocturne', type: 'music', label: 'Nocturne Op. 9', desc: 'Chopin (Sleep)', color: 'bg-purple-900' },
  { id: 'vivaldi-winter', type: 'music', label: 'Winter (Largo)', desc: 'Vivaldi (Cozy)', color: 'bg-blue-800' },
  { id: 'pachelbel', type: 'music', label: 'Canon in D', desc: 'Pachelbel (Unity)', color: 'bg-emerald-800' },
  
  // CELESTIAL
  { id: 'jupiter', type: 'celestial', label: 'Jovian Waves', desc: 'Radio emissions', color: 'bg-orange-800' },
  { id: 'saturn', type: 'celestial', label: 'Ring Whispers', desc: 'Dust vibrations', color: 'bg-yellow-700' },
  { id: 'pulsar-beat', type: 'celestial', label: 'Pulsar Rhythms', desc: 'Metronomic stars', color: 'bg-fuchsia-900' },
  { id: 'void', type: 'celestial', label: 'The Deep Void', desc: 'Total silence hum', color: 'bg-black' },
  { id: 'nebula-dust', type: 'celestial', label: 'Nebula Flow', desc: 'Ethereal synth', color: 'bg-pink-900' },
];

const MeditationLab: React.FC = () => {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathText, setBreathText] = useState('Wait...');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'noise' | 'nature' | 'music' | 'celestial'>('all');

  useEffect(() => {
    let timer: any;
    if (isBreathing) {
      let step = 0;
      const phases = [
        { text: 'Inhale...', duration: 4000 },
        { text: 'Hold...', duration: 2000 },
        { text: 'Exhale...', duration: 4000 },
        { text: 'Wait...', duration: 2000 }
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
          <div className="p-4 bg-violet-500/20 rounded-[1.5rem] text-violet-400 border border-violet-500/20 shadow-xl">
            <Headphones className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight">The Sonic Vault</h2>
            <p className="text-slate-400 font-medium tracking-wide">Universal audio orbits for every neural state.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Visual Breathing Engine */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-900/40 border border-white/10 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden min-h-[550px]">
            <div className={`absolute inset-0 bg-violet-600/5 transition-all duration-[4000ms] ${isBreathing && breathText === 'Inhale...' ? 'scale-150 opacity-20' : 'scale-100 opacity-0'}`} />
            
            <div className={`w-64 h-64 rounded-full border-2 border-violet-500/10 flex items-center justify-center relative`}>
              {/* Dynamic Aura */}
              <div className={`absolute inset-0 rounded-full border-4 border-violet-500/40 transition-all duration-[4000ms] ${isBreathing ? (breathText === 'Inhale...' ? 'scale-150 opacity-100' : 'scale-100 opacity-20') : 'scale-100 opacity-10'}`} />
              
              <div className="text-3xl font-black text-white tracking-widest uppercase z-10">{breathText}</div>
            </div>

            <div className="mt-16 space-y-6 w-full">
              <button 
                onClick={() => setIsBreathing(!isBreathing)} 
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl ${isBreathing ? 'bg-slate-800 text-slate-400 border border-white/5' : 'bg-violet-600 text-white hover:bg-violet-500 shadow-violet-600/30'}`}
              >
                {isBreathing ? 'Exit Flow' : 'Start Rhythmic Breath'}
              </button>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Box breathing: 4s inhale, 2s hold, 4s exhale, 2s rest.</p>
            </div>
          </div>
        </div>

        {/* Massive Library Explorer */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search frequencies (e.g. 'brown', 'rain', 'mozart')..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all shadow-inner"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar-hide">
              {['all', 'noise', 'nature', 'music', 'celestial'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border flex-shrink-0 ${filter === t ? 'bg-violet-600 border-violet-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:bg-white/10'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredLibrary.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveAudio(activeAudio === item.id ? null : item.id)}
                className={`flex items-center gap-4 p-5 border rounded-3xl transition-all group ${activeAudio === item.id ? 'bg-violet-600 border-violet-400 shadow-2xl shadow-violet-600/20' : 'bg-slate-950 border-white/5 hover:border-white/20'}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} shadow-inner flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-all`}>
                  {item.type === 'music' ? <Music className="w-6 h-6 text-white" /> : 
                   item.type === 'nature' ? <Waves className="w-6 h-6 text-white" /> :
                   item.type === 'celestial' ? <Stars className="w-6 h-6 text-white" /> :
                   <Volume2 className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <h4 className={`font-bold text-sm tracking-tight ${activeAudio === item.id ? 'text-white' : 'text-slate-200'}`}>{item.label}</h4>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.1em] ${activeAudio === item.id ? 'text-violet-200' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
                {activeAudio === item.id ? (
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Square className="w-3 h-3 text-white fill-white" />
                  </div>
                ) : (
                  <Play className="w-5 h-5 text-slate-800 opacity-40 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
            {filteredLibrary.length === 0 && (
              <div className="col-span-full py-20 text-center opacity-40">
                <Search className="w-12 h-12 mx-auto mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">Orbit not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationLab;
