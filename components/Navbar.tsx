import React, { useState, useEffect, useRef } from 'react';
import { NavItem, Language } from '../types';
import { SunIcon, MoonIcon, SynapseLogo } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { config } from '../data/config';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundFX';
import { ChevronDown, Sparkles, ExternalLink } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onNavigate: (view: 'home' | 'blog') => void;
  currentView: 'home' | 'blog' | 'article';
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme, onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (clickCount >= 3) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.1, x: 0.1 },
        colors: ['#0ea5e9', '#ec4899', '#f59e0b']
      });
      setClickCount(0);
    }
    
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const primaryNavItems: NavItem[] = [
    { label: t.nav.services || "Oferta", href: '#services', isExternal: false },
    { label: "Quantum Lab", href: '#quantum-lab', isExternal: false },
    { label: "Quiz Biznesowy", href: '#quiz', isExternal: false },
    { label: t.nav.ebooks || "E-booki", href: config.links.ebooks, isExternal: true },
    { label: t.nav.gifts || "Prezenty", href: '#gifts', isExternal: false },
    { 
      label: t.nav.blog || "Blog", 
      href: '#blog', 
      isExternal: false,
      action: () => onNavigate('blog') 
    },
  ];

  const secondaryNavItems: NavItem[] = [
    { label: "Wesoły Masaż", href: 'https://wesolymasaz.pl', isExternal: true },
    { label: t.nav.portfolio || "Portfolio prac", href: 'https://flic.kr/s/aHBqjCE6TV', isExternal: true },
    { label: t.nav.mentalHealth || "Zdrowie Psychiczne", href: config.links.mentalHealth, isExternal: true },
    { label: t.nav.health || "Zdrowie & Life", href: config.links.health, isExternal: true },
  ];

  const allNavItems = [...primaryNavItems, ...secondaryNavItems];

  const languages: { code: Language; flag: string; label: string }[] = [
    { code: 'pl', flag: '🇵🇱', label: 'Polski' },
    { code: 'en', flag: '🇬🇧', label: 'English' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    sound.playClick();
    if (item.action) {
      e.preventDefault();
      item.action();
      setIsOpen(false);
      setMoreOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!item.isExternal && item.href.startsWith('#')) {
      e.preventDefault();
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.getElementById(item.href.substring(1));
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(item.href.substring(1));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
      setMoreOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg transition-all duration-300 py-3">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Brand Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group select-none" 
            onClick={() => {
              onNavigate('home');
              setClickCount(prev => prev + 1);
            }}
          >
            <SynapseLogo className="w-9 h-9 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                Synapse <span className="text-cyan-400">Creative</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links - Clean, High Contrast & Legible */}
          <div className="hidden lg:flex items-center gap-2">
            
            {primaryNavItems.map((item) => {
              const isQuantum = item.href === '#quantum-lab';

              if (isQuantum) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/50 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all mx-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>{item.label}</span>
                  </a>
                );
              }

              return item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              );
            })}

            {/* "Więcej" Dropdown Menu */}
            <div className="relative ml-1" ref={dropdownRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <span>Więcej</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {moreOpen && (
                <div className="absolute right-0 mt-2 w-56 py-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
                  {secondaryNavItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!item.isExternal) handleNavClick(e, item);
                        else setMoreOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.isExternal && <ExternalLink className="w-3.5 h-3.5 text-slate-500" />}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Highlighted Partner Action */}
            <a
              href="https://wesolymasaz.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-300 bg-pink-950/50 border border-pink-500/40 hover:bg-pink-500/20 hover:border-pink-400 transition-all flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              <span>Wesoły Masaż</span>
            </a>
          </div>

          {/* Right Tools (Language + Theme + Mobile Burger) */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all">
                <span>{languages.find(l => l.code === language)?.flag}</span>
                <span className="uppercase text-[11px] font-mono">{language}</span>
              </button>
              <div className="absolute right-0 mt-1 w-32 py-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-2.5 w-full px-3 py-1.5 text-xs transition-colors ${
                      language === lang.code 
                        ? 'text-cyan-400 font-bold bg-cyan-500/10' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Przełącz motyw"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-yellow-400 hover:border-slate-700 transition-all active:scale-95"
            >
              {darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-all"
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-4 pt-3 pb-6 space-y-1 bg-slate-950 border-t border-slate-800/80 shadow-2xl">
          {allNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => !item.isExternal && handleNavClick(e, item)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-300 transition-all"
            >
              <span>{item.label}</span>
              {item.isExternal && <ExternalLink className="w-4 h-4 text-slate-500" />}
            </a>
          ))}

          <div className="flex gap-2 pt-4 border-t border-slate-800 mt-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  language === lang.code 
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300' 
                    : 'border-slate-800 text-slate-400 bg-slate-900'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
