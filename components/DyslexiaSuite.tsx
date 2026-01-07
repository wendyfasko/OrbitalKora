
import React, { useState } from 'react';
import { Feather, Type, MousePointer2, Volume2, Sparkles, Loader2, Globe, ArrowRight } from 'lucide-react';
import { simplifyText, translateText } from '../services/gemini';

const DyslexiaSuite: React.FC = () => {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'simplify' | 'translate'>('simplify');
  const [targetLang, setTargetLang] = useState('Spanish');

  const handleAction = async () => {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    let result = "";
    if (mode === 'simplify') {
      result = await simplifyText(text);
    } else {
      result = await translateText(text, targetLang);
    }
    setOutput(result || "The cosmic link failed. Try again.");
    setIsLoading(false);
  };

  const handleSpeech = () => {
    const speech = new SpeechSynthesisUtterance(output || text);
    speech.rate = 0.85;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500 pb-12">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
          <Feather className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Linguistic Orbit</h2>
          <p className="text-slate-400">Simplification and universal translation for clarity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl w-fit border border-white/5">
            <button onClick={() => setMode('simplify')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'simplify' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'}`}>Simplify</button>
            <button onClick={() => setMode('translate')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'translate' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'}`}>Translate</button>
          </div>

          {mode === 'translate' && (
            <div className="flex items-center gap-4 p-4 bg-slate-900 border border-white/5 rounded-2xl">
              <Globe className="w-5 h-5 text-emerald-400" />
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Target Language</p>
                <select 
                  value={targetLang} 
                  onChange={e => setTargetLang(e.target.value)}
                  className="bg-transparent text-white font-bold outline-none w-full cursor-pointer"
                >
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Arabic">Arabic</option>
                  <option value="ASL (Textual)">ASL Concepts</option>
                </select>
              </div>
            </div>
          )}

          <textarea 
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={mode === 'simplify' ? "Paste complex text to simplify..." : "Paste text to translate..."}
            className="w-full h-72 bg-slate-950/50 border border-white/10 rounded-3xl p-8 text-white text-base leading-relaxed focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none font-lexend"
          />
          <button 
            onClick={handleAction}
            disabled={isLoading || !text}
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : mode === 'simplify' ? <Sparkles className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
            {mode === 'simplify' ? 'Simplify with Kora' : `Translate to ${targetLang}`}
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-emerald-300">Clear Reflection</h3>
            <button onClick={handleSpeech} className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full hover:bg-emerald-500/20 transition-all"><Volume2 className="w-5 h-5" /></button>
          </div>
          <div className="w-full h-72 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 overflow-y-auto shadow-inner">
            {output ? (
              <p className="text-emerald-50 font-medium leading-relaxed font-lexend text-lg">{output}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-700">
                <MousePointer2 className="w-10 h-10 mb-4 opacity-10" />
                <p className="text-xs uppercase tracking-[0.3em] font-black">Waiting for Data Stream</p>
              </div>
            )}
          </div>
          <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
            <h4 className="text-[10px] text-emerald-500 font-bold uppercase mb-4 tracking-widest">Accessibility Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <StatItem label="Readability" val="Enhanced" />
              <StatItem label="Cognitive Load" val="Reduced" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({label, val}: {label: string, val: string}) => (
  <div className="p-4 bg-white/5 rounded-2xl">
    <p className="text-[10px] text-slate-500 font-bold mb-1">{label}</p>
    <p className="text-sm font-bold text-white">{val}</p>
  </div>
);

export default DyslexiaSuite;
