
import React, { useState } from 'react';
import { Brain, Smile, MessageCircle, Calendar, Sparkles, Send } from 'lucide-react';
import { getKoraResponse } from '../services/gemini';

const AutismSuite: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeconstruct = async () => {
    if (!scenario.trim() || isLoading) return;
    setIsLoading(true);
    const prompt = `Deconstruct the following social scenario for someone with autism. Explain the likely hidden social cues, the expected response, and why people might react this way:\n\n${scenario}`;
    const result = await getKoraResponse(prompt);
    setExplanation(result || "I'm having trouble analyzing this orbit. Let's try another situation.");
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
          <Brain className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Autism Support</h2>
          <p className="text-slate-400">Navigating social galaxies with clarity and confidence.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-300"><MessageCircle className="w-5 h-5"/> Social Deconstructor</h3>
            <p className="text-sm text-slate-400">Describe a confusing social interaction to understand the "unspoken" rules.</p>
            <textarea 
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              placeholder="Example: Someone said 'We should hang out sometime' but didn't pick a date..."
              className="w-full h-32 bg-slate-900 border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none"
            />
            <button 
              onClick={handleDeconstruct}
              disabled={isLoading || !scenario}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Analyzing Orbit...' : 'Deconstruct Scenario'}
            </button>
            {explanation && (
              <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl animate-in fade-in duration-500">
                <p className="text-sm text-indigo-100 leading-relaxed whitespace-pre-wrap">{explanation}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-300 mb-6"><Calendar className="w-5 h-5"/> Routine Plan</h3>
            <div className="space-y-3">
              <RoutineItem time="08:00" task="Sensory Grounding" completed={true} />
              <RoutineItem time="09:00" task="Deep Work Block" completed={false} />
              <RoutineItem time="12:00" task="Sensory Reset (Dark Room)" completed={false} />
              <RoutineItem time="18:00" task="Emotion Review" completed={false} />
            </div>
            <button className="w-full mt-6 py-3 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 rounded-2xl text-xs font-bold uppercase transition-all">Add Step</button>
          </div>

          <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-3xl">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2"><Smile className="w-4 h-4 text-amber-400"/> Emotion Check-in</h4>
            <p className="text-xs text-slate-400 mb-4">How is your sensory load right now?</p>
            <div className="flex justify-between gap-2">
              <EmojiBtn emoji="😌" label="Calm" />
              <EmojiBtn emoji="🫨" label="High Load" />
              <EmojiBtn emoji="😵‍💫" label="Overwhelm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoutineItem: React.FC<{time: string, task: string, completed: boolean}> = ({ time, task, completed }) => (
  <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
    <span className="text-[10px] font-mono text-indigo-400">{time}</span>
    <span className={`text-sm flex-1 ${completed ? 'text-slate-500 line-through' : 'text-white'}`}>{task}</span>
    <div className={`w-4 h-4 rounded-full border-2 ${completed ? 'bg-indigo-500 border-indigo-500' : 'border-white/20'}`} />
  </div>
);

const EmojiBtn: React.FC<{emoji: string, label: string}> = ({ emoji, label }) => (
  <button className="flex-1 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
    <span className="text-2xl block mb-1">{emoji}</span>
    <span className="text-[8px] uppercase font-bold text-slate-500">{label}</span>
  </button>
);

export default AutismSuite;
