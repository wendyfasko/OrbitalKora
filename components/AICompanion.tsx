
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, Loader2, Globe } from 'lucide-react';
import { getKoraResponse } from '../services/gemini';
import { Message } from '../types';

interface AICompanionProps {
  userLanguage: string;
}

const AICompanion: React.FC<AICompanionProps> = ({ userLanguage }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello friend. I'm Kora, your cosmic companion. I am currently optimized for ${userLanguage}. How can I help you navigate your journey today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getKoraResponse(input, userLanguage);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "The stars are quiet. Please try again." }]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-14rem)] flex flex-col bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md animate-in fade-in scale-95 duration-500 shadow-2xl shadow-black/40">
      <div className="px-8 py-5 bg-indigo-600/10 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Kora AI</h3>
            <p className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-black">Cosmic Wellness Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-bold text-white uppercase">{userLanguage}</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth bg-slate-950/20">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] px-6 py-4 rounded-[1.8rem] text-base leading-relaxed ${
              m.role === 'user' 
              ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-900/40 font-medium' 
              : 'bg-slate-800 text-indigo-50 rounded-tl-none border border-white/5 shadow-2xl shadow-black/20'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 px-6 py-4 rounded-[1.8rem] rounded-tl-none flex items-center gap-3 border border-white/5">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
              <span className="text-xs text-indigo-200 font-bold uppercase tracking-widest">Kora is reflecting...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-950/50 border-t border-white/10">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={`Message Kora in ${userLanguage}...`}
            className="w-full bg-slate-900 border border-white/10 rounded-[2rem] px-8 py-5 pr-16 text-base text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.4rem] transition-all disabled:opacity-30 disabled:scale-95 shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
