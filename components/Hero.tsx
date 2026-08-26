import React, { useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { StatsCounter } from './StatsCounter';
import { EventTicker } from './EventTicker';
import { Scene3D, SceneMode } from './Scene3D';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { Volume2, VolumeX, Sparkles, ArrowRight, Zap, Radio, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [greeting, setGreeting] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [active3dMode, setActive3dMode] = useState<SceneMode>('neural');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 5) setGreeting('Dobry wieczór / Dobrej nocy');
    else if (hour < 12) setGreeting('Dzień dobry');
    else if (hour < 18) setGreeting('Dzień dobry / Witaj');
    else setGreeting('Dobry wieczór');
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    sound.playQuantum();
    const textToSpeak = `${greeting}. ${t.hero.titleStart} ${t.hero.titleEnd}. ${t.hero.subtitle}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pl-PL';
    utterance.rate = 1.05;
    
    utterance.onend = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };
  
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLab = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playQuantum();
    const element = document.getElementById('quantum-lab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden transition-colors duration-300">
      
      {/* 3D WebGL Neural Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D onModeChange={(mode) => setActive3dMode(mode)} />
      </div>

      {/* Cyber Grid Lighting & Depth Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/90 pointer-events-none z-1" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <FadeIn>
          
          {/* Top HUD Badges Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/80 backdrop-blur-xl text-xs font-mono font-semibold text-cyan-300 shadow-[0_0_20px_rgba(14,165,233,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>2030 NEURAL OS // ACTIVE</span>
            </div>

            {/* Greeting & Voice synthesis button */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 backdrop-blur-xl text-xs font-medium text-slate-300 shadow-sm">
              <span>👋 {greeting}! {t.hero.badge}</span>
              <button 
                onClick={handleSpeak}
                className="ml-1 p-1 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded-full transition-colors"
                title="Posłuchaj syntezy głosu AI"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Audio Synthesis FX Toggle */}
            <button
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                soundEnabled
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>AUDIO FX: {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
          
          {/* Main 2030 Holographic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-2xl">
            {t.hero.titleStart}{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 filter drop-shadow-[0_0_35px_rgba(14,165,233,0.5)]">
              {t.hero.titleEnd}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal drop-shadow-md">
            {t.hero.subtitle}
          </p>

          {/* Futuristic CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#contact-form"
              onClick={scrollToContact}
              onMouseEnter={() => sound.playHover()}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(14,165,233,0.45)] hover:shadow-[0_0_45px_rgba(14,165,233,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-300/30"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>{t.hero.ctaPrimary}</span>
            </a>

            <a 
              href="#quantum-lab" 
              onClick={scrollToLab}
              onMouseEnter={() => sound.playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-black text-sm uppercase tracking-widest hover:border-cyan-400 transition-all duration-300 backdrop-blur-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <Terminal className="w-4 h-4" />
              <span>Odkryj Quantum Lab</span>
            </a>

            <a 
              href="#services" 
              onClick={scrollToServices}
              onMouseEnter={() => sound.playHover()}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-sm tracking-wider transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95"
            >
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* 3 Floating 3D Holographic Key Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 text-left">
            {[
              {
                icon: '⚡',
                title: 'Ultraszybka Generacja AI',
                stat: '< 0.4s',
                desc: 'Kompletne e-booki, storytelling i kampanie projektowane z neuro-precyzją.',
                color: 'cyan',
              },
              {
                icon: '🔮',
                title: 'Psychologia & Storytelling',
                stat: '+180% Konwersji',
                desc: 'Treści, które angażują podświadomość i budują magnetyczną więź z marką.',
                color: 'purple',
              },
              {
                icon: '🪐',
                title: 'Autonomiczne Ekosystemy',
                stat: '100% Digital',
                desc: 'Automatyzacja procesów, sklepów naffy oraz interaktywne platformy 3D.',
                color: 'indigo',
              },
            ].map((card, i) => (
              <HoloCard3D key={i} intensity={12}>
                <div className="p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-2xl shadow-xl hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{card.icon}</span>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs">
                      {card.stat}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              </HoloCard3D>
            ))}
          </div>
          
          <EventTicker />

          <StatsCounter />
        </FadeIn>
      </div>
    </section>
  );
};
