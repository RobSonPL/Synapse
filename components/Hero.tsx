import React, { useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { StatsCounter } from './StatsCounter';
import { Particles } from './Particles';
import Spline from '@splinetool/react-spline';
import { EventTicker } from './EventTicker';
import { Volume2, VolumeX } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [greeting, setGreeting] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 5) setGreeting('Dobry wieczór / Dobrej nocy');
    else if (hour < 12) setGreeting('Dzień dobry');
    else if (hour < 18) setGreeting('Dzień dobry / Witaj');
    else setGreeting('Dobry wieczór');
  }, []);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${greeting}. ${t.hero.titleStart} ${t.hero.titleEnd}. ${t.hero.subtitle}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pl-PL';
    
    utterance.onend = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };
  
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
      e.preventDefault();
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden transition-colors duration-300">
      
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 cursor-crosshair">
         <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <Particles />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-synapse-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-synapse-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <FadeIn>
          <div className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm gap-2">
            <span>👋 {greeting}! {t.hero.badge}</span>
            <button 
              onClick={handleSpeak}
              className="ml-2 p-1.5 bg-synapse-primary/10 hover:bg-synapse-primary/20 text-synapse-primary rounded-full transition-colors"
              title="Posłuchaj powitania"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
            {t.hero.titleStart} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent">
              {t.hero.titleEnd}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact-form"
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold text-lg shadow-lg hover:shadow-synapse-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {t.hero.ctaPrimary}
            </a>
            <a 
              href="#services" 
              onClick={scrollToServices}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
          
          <EventTicker />

          <StatsCounter />
        </FadeIn>
      </div>
    </section>
  );
};