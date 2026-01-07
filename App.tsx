
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Settings, 
  Home, 
  MessageSquare,
  ShieldAlert,
  Menu,
  X,
  User,
  Globe,
  Copyright,
  Crown,
  Map as MapIcon,
  Eye
} from 'lucide-react';
import { AppView, UserSettings, ColorblindMode } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ADHDSuite from './components/ADHDSuite';
import DyslexiaSuite from './components/DyslexiaSuite';
import AutismSuite from './components/AutismSuite';
import MentalHealthSuite from './components/MentalHealthSuite';
import SensorySuite from './components/SensorySuite';
import MeditationLab from './components/MeditationLab';
import WomensHealth from './components/WomensHealth';
import AICompanion from './components/AICompanion';
import MembershipHub from './components/MembershipHub';
import JourneyMap from './components/JourneyMap';
import RageRelease from './components/Games/RageRelease';

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Italian', 'Korean', 'ASL (Text-Based)', 'Braille (Tactile-Optimized Text)'
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('orbital_kora_settings');
    return saved ? JSON.parse(saved) : {
      dyslexiaFont: false,
      highContrast: false,
      reducedMotion: false,
      textSize: 'medium',
      overwhelmMode: false,
      language: 'English',
      isPremium: false,
      colorblindMode: 'none'
    };
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('orbital_kora_settings', JSON.stringify(settings));
  }, [settings]);

  const getColorblindFilter = (mode: ColorblindMode) => {
    switch(mode) {
      case 'protanopia': return 'sepia(0.5) hue-rotate(-30deg) saturate(1.2)';
      case 'deuteranopia': return 'sepia(0.5) hue-rotate(30deg) saturate(1.2)';
      case 'tritanopia': return 'sepia(0.5) hue-rotate(180deg) saturate(1.2)';
      case 'achromatopsia': return 'grayscale(100%)';
      default: return 'none';
    }
  };

  const renderView = () => {
    if (settings.overwhelmMode) return <SensorySuite overwhelmActive={true} onExit={() => setSettings(s => ({...s, overwhelmMode: false}))} />;
    
    switch (currentView) {
      case AppView.LANDING: return <LandingPage onGetStarted={() => { setIsAuthenticated(true); setCurrentView(AppView.DASHBOARD); }} onLogin={() => { setIsAuthenticated(true); setCurrentView(AppView.DASHBOARD); }} />;
      case AppView.DASHBOARD: return <Dashboard onNavigate={setCurrentView} isPremium={settings.isPremium} />;
      case AppView.ADHD: return <ADHDSuite />;
      case AppView.DYSLEXIA: return <DyslexiaSuite />;
      case AppView.AUTISM: return <AutismSuite />;
      case AppView.MENTAL_HEALTH: return <MentalHealthSuite onPlayRage={() => setCurrentView(AppView.RAGE_GAME)} />;
      case AppView.SENSORY: return <SensorySuite overwhelmActive={false} onExit={() => {}} />;
      case AppView.MEDITATION: return <MeditationLab />;
      case AppView.WOMENS_HEALTH: return <WomensHealth />;
      case AppView.AI_COMPANION: return <AICompanion userLanguage={settings.language} />;
      case AppView.MEMBERSHIP: return <MembershipHub onUpgrade={() => setSettings(s => ({...s, isPremium: true}))} />;
      case AppView.JOURNEY_MAP: return <JourneyMap onNavigate={setCurrentView} />;
      case AppView.RAGE_GAME: return <RageRelease onExit={() => setCurrentView(AppView.MENTAL_HEALTH)} />;
      default: return <Dashboard onNavigate={setCurrentView} isPremium={settings.isPremium} />;
    }
  };

  return (
    <div 
      className={`min-h-screen cosmic-bg selection:bg-indigo-500/30 transition-all duration-700 ${settings.dyslexiaFont ? 'font-dyslexic' : 'font-[Space_Grotesk]'} ${settings.highContrast ? 'contrast-125 saturate-0' : ''}`}
      style={{ filter: getColorblindFilter(settings.colorblindMode) }}
    >
      <div className="star-field" />
      
      {isAuthenticated && currentView !== AppView.LANDING && currentView !== AppView.JOURNEY_MAP && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView(AppView.DASHBOARD)}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">OrbitalKora</h1>
              <p className="text-[9px] text-indigo-300/80 uppercase tracking-widest mt-0.5">{settings.language} Orbit</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <button onClick={() => setCurrentView(AppView.JOURNEY_MAP)} className="p-2.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
              <MapIcon className="w-5 h-5" />
            </button>
            <button onClick={() => setSettings(s => ({...s, overwhelmMode: !s.overwhelmMode}))} className="px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 inline mr-2" /> Relief
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>
      )}

      <main className={`${isAuthenticated && currentView !== AppView.LANDING && currentView !== AppView.JOURNEY_MAP ? 'pt-28 pb-12' : ''} px-6 max-w-7xl mx-auto relative z-10`}>
        {renderView()}
      </main>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 w-full max-w-sm h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-indigo-500/5">
              <h2 className="text-xl font-bold flex items-center gap-3"><Settings className="w-5 h-5 text-indigo-400" /> Space Control</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90"><X className="w-6 h-6"/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Visionary Inclusion Section */}
              <section className="space-y-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Eye className="w-3 h-3" /> Colorblind Calibration
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {(['none', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'] as ColorblindMode[]).map(mode => (
                    <button 
                      key={mode}
                      onClick={() => setSettings(s => ({...s, colorblindMode: mode}))}
                      className={`px-4 py-3 rounded-xl text-left text-xs font-bold capitalize transition-all border ${settings.colorblindMode === mode ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                      {mode.replace('none', 'Standard View')}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Universal Language</h3>
                <select 
                  value={settings.language}
                  onChange={(e) => setSettings(s => ({...s, language: e.target.value}))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none cursor-pointer"
                >
                  {LANGUAGES.map(lang => <option key={lang} value={lang} className="bg-slate-900">{lang}</option>)}
                </select>
              </section>

              <section className="space-y-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Accessibility</h3>
                <ToggleSetting label="Dyslexia Font" checked={settings.dyslexiaFont} onChange={() => setSettings(s => ({...s, dyslexiaFont: !s.dyslexiaFont}))} />
                <ToggleSetting label="High Contrast" checked={settings.highContrast} onChange={() => setSettings(s => ({...s, highContrast: !s.highContrast}))} />
              </section>
            </div>

            <div className="p-8 bg-slate-950/50 border-t border-white/5">
              <button onClick={() => { setIsAuthenticated(false); setCurrentView(AppView.LANDING); setIsMenuOpen(false); }} className="w-full py-4 text-rose-400 font-bold text-sm bg-rose-400/5 hover:bg-rose-400/10 rounded-2xl transition-all border border-rose-400/10">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ToggleSetting: React.FC<{label: string, checked: boolean, onChange: () => void}> = ({label, checked, onChange}) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
    <span className="font-bold text-white text-sm">{label}</span>
    <button onClick={onChange} className={`w-12 h-6 rounded-full relative transition-all ${checked ? 'bg-indigo-600' : 'bg-slate-700'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

export default App;
