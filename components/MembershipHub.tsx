
import React from 'react';
import { Crown, CheckCircle2, Star, Zap, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface MembershipHubProps {
  onUpgrade: () => void;
}

// Fix: Corrected typo in the props interface name from MembershipHubHubProps to MembershipHubProps
const MembershipHub: React.FC<MembershipHubProps> = ({ onUpgrade }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 max-w-4xl mx-auto">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-amber-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/20 border border-amber-500/30">
          <Crown className="w-10 h-10 text-amber-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 italic">Orbit</span></h2>
          <p className="text-lg text-slate-400 font-light">Ethical, inclusive support for deep personal growth.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-10 flex flex-col space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Free Core</h3>
            <p className="text-slate-500 text-sm">Fundamental accessibility and wellness for all. Dignity is non-negotiable.</p>
          </div>
          <div className="text-4xl font-bold text-white">$0 <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">/ Always</span></div>
          
          <div className="space-y-4 flex-1">
            <FeatureItem text="All Accessibility Suites" />
            <FeatureItem text="Mental Health Grounding" />
            <FeatureItem text="Basic Kora AI Support" />
            <FeatureItem text="Private Cosmic Journal" />
            <FeatureItem text="Body Literacy (Free Always)" />
          </div>

          <button disabled className="w-full py-4 bg-white/5 text-slate-500 rounded-2xl font-bold text-sm border border-white/5 uppercase tracking-widest">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-amber-500/30 rounded-[2.5rem] p-10 flex flex-col space-y-8 relative overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 pointer-events-none">
            <Crown className="w-32 h-32 text-amber-400" />
          </div>
          
          <div>
            <div className="inline-flex px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-widest mb-4">Most Empowering</div>
            <h3 className="text-2xl font-bold text-white mb-2">Orbital Premium</h3>
            <p className="text-indigo-200/60 text-sm">Deep personalization and advanced AI insights to truly thrive.</p>
          </div>
          
          <div className="text-4xl font-bold text-white">$4.99 <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">/ Monthly</span></div>
          
          <div className="space-y-4 flex-1">
            <FeatureItem text="Advanced Kora AI Reasoning" highlighted />
            <FeatureItem text="Deep Pattern Insights" highlighted />
            <FeatureItem text="Expanded Meditation Library" highlighted />
            <FeatureItem text="Custom Sensory Profiles" highlighted />
            <FeatureItem text="Priority Support Access" highlighted />
            <FeatureItem text="Cloud Sync (Encrypted)" highlighted />
          </div>

          <button 
            onClick={onUpgrade}
            className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl font-bold text-lg shadow-xl shadow-amber-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Upgrade Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl max-w-2xl mx-auto text-center space-y-4">
        <div className="flex justify-center gap-6">
          <TrustIcon icon={<ShieldCheck className="w-5 h-5" />} label="No Data Selling" />
          <TrustIcon icon={<Zap className="w-5 h-5" />} label="Cancel Anytime" />
          <TrustIcon icon={<Heart className="w-5 h-5" />} label="Supporting Humans" />
        </div>
        <p className="text-[10px] text-indigo-300/40 uppercase tracking-[0.2em] font-medium leading-relaxed">
          Your subscription supports continued free access for those in need. Radical inclusion is built into our revenue model.
        </p>
      </div>
    </div>
  );
};

const FeatureItem = ({text, highlighted}: {text: string, highlighted?: boolean}) => (
  <div className="flex items-center gap-3">
    <CheckCircle2 className={`w-4 h-4 ${highlighted ? 'text-amber-400' : 'text-slate-600'}`} />
    <span className={`text-sm ${highlighted ? 'text-white' : 'text-slate-400'}`}>{text}</span>
  </div>
);

const TrustIcon = ({icon, label}: {icon: React.ReactNode, label: string}) => (
  <div className="flex items-center gap-2">
    <div className="text-indigo-400">{icon}</div>
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

export default MembershipHub;
