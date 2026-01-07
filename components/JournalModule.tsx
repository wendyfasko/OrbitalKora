
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  PenLine, 
  Mic, 
  Eraser, 
  Save, 
  Trash2, 
  Play, 
  Palette, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  RotateCcw,
  Loader2,
  Volume2,
  Filter,
  Search,
  History
} from 'lucide-react';
import { JournalEntry } from '../types';
import { getJournalReflection } from '../services/gemini';

const JournalModule: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [mode, setMode] = useState<'text' | 'voice' | 'drawing'>('text');
  const [filter, setFilter] = useState<'all' | 'text' | 'voice' | 'drawing'>('all');
  const [textContent, setTextContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reflection, setReflection] = useState<string | null>(null);
  const [isReflecting, setIsReflecting] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Load entries from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('orbital_kora_journal');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load journal", e);
      }
    }
  }, []);

  // Sync entries to LocalStorage
  useEffect(() => {
    localStorage.setItem('orbital_kora_journal', JSON.stringify(entries));
  }, [entries]);

  // Canvas context setup
  useEffect(() => {
    if (mode === 'drawing' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 3;
      }
    }
  }, [mode]);

  const filteredEntries = useMemo(() => {
    if (filter === 'all') return entries;
    return entries.filter(e => e.type === filter);
  }, [entries, filter]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64 = reader.result as string;
          saveEntry('voice', base64);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const saveEntry = (type: 'text' | 'voice' | 'drawing', contentOverride?: string) => {
    let content = contentOverride;
    
    if (type === 'text') {
      if (!textContent.trim()) return;
      content = textContent;
      setTextContent('');
      setReflection(null);
    } else if (type === 'drawing') {
      content = canvasRef.current?.toDataURL();
      clearCanvas();
    }

    if (!content) return;

    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type,
      content
    };

    setEntries(prev => [newEntry, ...prev]);
  };

  const handleReflection = async () => {
    if (!textContent.trim()) return;
    setIsReflecting(true);
    const result = await getJournalReflection(textContent);
    setReflection(result || "Kora is taking a quiet breath. Try again soon.");
    setIsReflecting(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const playVoiceNote = (base64: string) => {
    const audio = new Audio(base64);
    audio.play();
  };

  return (
    <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-2xl shadow-slate-950/80">
      {/* Header Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-10 py-8 flex items-center justify-between hover:bg-white/5 transition-all group"
      >
        <div className="flex items-center gap-5">
          <div className="p-4 bg-gradient-to-br from-rose-500/20 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/5">
            <PenLine className="w-7 h-7 text-rose-400" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">Private Cosmic Journal</h3>
            <p className="text-sm text-slate-400 font-medium">Capture your inner reflections in safety.</p>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-white/5 transition-all ${isExpanded ? 'rotate-180 bg-rose-500/10' : ''}`}>
          <ChevronDown className={`w-6 h-6 ${isExpanded ? 'text-rose-400' : 'text-slate-500'}`} />
        </div>
      </button>

      {isExpanded && (
        <div className="p-10 pt-0 space-y-12 animate-in fade-in slide-in-from-top-6 duration-700">
          
          {/* Creation Section */}
          <section className="space-y-8">
            <div className="flex flex-wrap gap-4 p-1.5 bg-slate-950/40 rounded-2xl w-fit border border-white/5">
              <CreationTab active={mode === 'text'} onClick={() => setMode('text')} icon={<PenLine className="w-4 h-4" />} label="Text Orbit" />
              <CreationTab active={mode === 'voice'} onClick={() => setMode('voice')} icon={<Mic className="w-4 h-4" />} label="Voice Echo" />
              <CreationTab active={mode === 'drawing'} onClick={() => setMode('drawing')} icon={<Palette className="w-4 h-4" />} label="Visual Sketch" />
            </div>

            <div className="min-h-[260px] bg-slate-950/30 rounded-[2rem] border border-white/5 p-8 shadow-inner backdrop-blur-sm">
              {mode === 'text' && (
                <div className="space-y-6">
                  <textarea 
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Describe your current state of mind..."
                    className="w-full h-44 bg-transparent text-white placeholder:text-slate-600 resize-none outline-none text-lg leading-relaxed font-lexend transition-all"
                  />
                  
                  {reflection && (
                    <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl animate-in zoom-in-95 duration-500 shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Kora's Cosmic Reflection</span>
                      </div>
                      <p className="text-sm text-indigo-50 leading-relaxed italic font-lexend">"{reflection}"</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button 
                      onClick={handleReflection}
                      disabled={isReflecting || !textContent.trim()}
                      className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 disabled:opacity-30 transition-all hover:translate-x-1"
                    >
                      {isReflecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Reflect with Kora
                    </button>
                    <button 
                      onClick={() => saveEntry('text')} 
                      className="px-10 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-xl shadow-rose-600/20 hover:-translate-y-0.5"
                    >
                      <Save className="w-4 h-4" /> Save Thought
                    </button>
                  </div>
                </div>
              )}

              {mode === 'voice' && (
                <div className="h-44 flex flex-col items-center justify-center space-y-8">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-1000 ${isRecording ? 'bg-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.3)] scale-110' : 'bg-slate-800'}`}>
                    <Mic className={`w-12 h-12 text-white ${isRecording ? 'animate-pulse' : ''}`} />
                  </div>
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`px-12 py-4 rounded-full font-bold text-sm transition-all ${isRecording ? 'bg-slate-700 text-white' : 'bg-rose-600 text-white hover:bg-rose-500 shadow-xl shadow-rose-600/30'}`}
                  >
                    {isRecording ? 'Complete Recording' : 'Launch Voice Capture'}
                  </button>
                </div>
              )}

              {mode === 'drawing' && (
                <div className="space-y-6">
                  <div className="relative group">
                    <canvas 
                      ref={canvasRef}
                      width={900}
                      height={450}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-[450px] bg-slate-900/50 rounded-2xl cursor-crosshair touch-none border border-white/5 shadow-inner"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={clearCanvas} className="p-3 bg-slate-950/80 text-slate-400 hover:text-rose-400 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button onClick={clearCanvas} className="p-3 bg-slate-950/80 text-slate-400 hover:text-indigo-400 rounded-xl transition-all">
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => saveEntry('drawing')} className="px-10 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-xl shadow-rose-600/20">
                      <Save className="w-4 h-4" /> Save Sketch
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* History Gallery */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/5 pt-12">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-rose-400/60" />
                <h4 className="text-xl font-bold text-white">Your Personal History</h4>
              </div>
              
              <div className="flex items-center gap-2 bg-slate-950/40 p-1.5 rounded-xl border border-white/5">
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label="All" />
                <FilterButton active={filter === 'text'} onClick={() => setFilter('text')} label="Text" />
                <FilterButton active={filter === 'voice'} onClick={() => setFilter('voice')} label="Voice" />
                <FilterButton active={filter === 'drawing'} onClick={() => setFilter('drawing')} label="Visual" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntries.length === 0 ? (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/2">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <History className="w-10 h-10 text-slate-700" />
                  </div>
                  <p className="text-slate-400 font-medium">No {filter !== 'all' ? filter : ''} orbits found in this sector yet.</p>
                </div>
              ) : (
                filteredEntries.map(entry => (
                  <div 
                    key={entry.id} 
                    className="group bg-slate-900/60 border border-white/5 rounded-[2rem] p-6 hover:bg-slate-800/80 hover:border-white/20 transition-all hover:-translate-y-1 shadow-lg hover:shadow-black/40 animate-in fade-in zoom-in-95 duration-500"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5">
                        <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                          {new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <button 
                        onClick={() => deleteEntry(entry.id)} 
                        className="p-2 opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="min-h-[100px]">
                      {entry.type === 'text' && (
                        <p className="text-sm text-slate-200 leading-relaxed font-lexend italic line-clamp-5">
                          "{entry.content}"
                        </p>
                      )}
                      
                      {entry.type === 'voice' && (
                        <div className="flex items-center gap-4 p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                          <button 
                            onClick={() => playVoiceNote(entry.content)}
                            className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-500 transition-all shadow-lg"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                          <div className="flex-1 space-y-2">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest block">Voice Note</span>
                            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="w-full h-full bg-rose-500 opacity-20" />
                            </div>
                          </div>
                        </div>
                      )}

                      {entry.type === 'drawing' && (
                        <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-inner group-hover:ring-2 ring-rose-500/20 transition-all">
                          <img src={entry.content} alt="Journal Sketch" className="w-full h-full object-contain p-2" />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const CreationTab: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold transition-all ${active ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
  >
    {icon}
    {label}
  </button>
);

const FilterButton: React.FC<{active: boolean, onClick: () => void, label: string}> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}
  >
    {label}
  </button>
);

export default JournalModule;
