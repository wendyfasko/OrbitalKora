
import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, UserPlus, LogIn, Copyright } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
      {/* Decorative cosmic elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-rose-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      
      <div className="max-w-2xl w-full space-y-12 relative z-10 text-center">
        {/* Brand Identity */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/40 rotate-12 hover:rotate-0 transition-transform duration-500">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Orbital<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Kora</span>
            </h1>
            <p className="text-sm md:text-base text-indigo-200/60 uppercase tracking-[0.4em] font-medium">
              The Inclusive Neuro-Wellness Platform
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          A radically inclusive ecosystem designed for <span className="text-white font-medium">every human experience</span>. Neurodivergence, mental health, and sensory care—all in one cosmic space.
        </p>

        {/* Mobile-First Action Buttons */}
        <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <button 
            onClick={onGetStarted}
            className="group flex items-center justify-center gap-3 bg-white text-slate-950 h-16 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
          >
            Create Your Orbit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onLogin}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white h-16 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all active:scale-95"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-12 animate-in fade-in duration-1000 delay-500">
          <FeatureBadge icon={<ShieldCheck className="w-4 h-4" />} text="E2E Encrypted" />
          <FeatureBadge icon={<Heart className="w-4 h-4" />} text="Free Access" />
          <FeatureBadge icon={<UserPlus className="w-4 h-4" />} text="Radically Inclusive" />
        </div>

        {/* Ownership Footer */}
        <div className="pt-16 pb-4 space-y-2 animate-in fade-in duration-1000 delay-700">
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <Copyright className="w-3 h-3" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Proprietary Technology of <span className="text-indigo-400">Wendy Fasko</span>
            </p>
          </div>
          <p className="text-[9px] text-slate-600 font-medium italic">
            Founded & Developed by Wendy Fasko • Powered by Advanced AI
          </p>
        </div>
      </div>

      {/* Background Star Texture */}
      <div className="star-field opacity-20" />
    </div>
  );
};

const FeatureBadge: React.FC<{icon: React.ReactNode, text: string}> = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
    <div className="text-indigo-400">{icon}</div>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{text}</span>
  </div>
);

export default LandingPage;
