import React, { useState, useEffect } from 'react';
import { NavItem, Language } from '../types';
import { SunIcon, MoonIcon, SynapseLogo } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { config } from '../data/config';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onNavigate: (view: 'home' | 'blog') => void;
  currentView: 'home' | 'blog' | 'article';
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme, onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: t.nav.ebooks, href: config.links.ebooks, isExternal: true },
    { label: "OFERTA", href: '#services', isExternal: false },
    { label: "Portfolio", href: 'https://flic.kr/s/aHBqjCE6TV', isExternal: true },
    { label: t.nav.mentalHealth, href: config.links.mentalHealth, isExternal: true },
    { 
        label: t.nav.blog, 
        href: '#blog', 
        isExternal: false,
        action: () => onNavigate('blog') 
    },
    { label: "PREZENTY", href: '#gifts', isExternal: false },
    { label: t.nav.health, href: config.links.health, isExternal: true },
  ];

  const languages: { code: Language; flag: string }[] = [
    { code: 'pl', flag: '🇵🇱' },
    { code: 'en', flag: '🇬🇧' },
    { code: 'de', flag: '🇩🇪' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
  ];

  const isSpecialItem = (label: string) => {
    const l = label.toUpperCase();
    return l === 'OFERTA' || l === 'BLOG' || l === 'PORTFOLIO' || l === 'PREZENTY';
  };

  const getSpecialStyles = (label: string) => {
    const l = label.toUpperCase();
    const common = 'border-[1px] bg-white/5 dark:bg-white/5 backdrop-blur-md shadow-sm transition-all duration-500 hover:-translate-y-0.5 active:scale-95 transform flex items-center gap-2 overflow-hidden';
    
    if (l === 'PREZENTY') {
      return `${common} border-amber-500/40 text-amber-600 dark:text-amber-400 hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]`;
    }
    return `${common} border-synapse-primary/40 text-synapse-primary hover:border-synapse-primary hover:bg-synapse-primary/10 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]`;
  };

  const getSpecialDotColor = (label: string) => {
    return label.toUpperCase() === 'PREZENTY' ? 'bg-amber-500' : 'bg-synapse-primary';
  };

  const isHypnosisLink = (href: string) => href.includes('hipnozamonikasidorowska');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.action) {
        e.preventDefault();
        item.action();
        setIsOpen(false);
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
    }
  };

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
      scrolled 
        ? 'py-3 bg-white/80 dark:bg-synapse-dark/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 shadow-lg' 
        : 'py-5 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
             <SynapseLogo className="w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" />
             <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-synapse-primary to-synapse-accent dark:from-white dark:via-synapse-primary dark:to-synapse-accent tracking-tighter">
               Synapse
             </span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const isSpecial = isSpecialItem(item.label);
                
                if (isSpecial) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      onClick={(e) => !item.isExternal && handleNavClick(e, item)}
                      className={`relative group px-5 py-2.5 rounded-full font-semibold text-[10px] uppercase tracking-[0.25em] ${getSpecialStyles(item.label)}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform duration-300 animate-pulse ${getSpecialDotColor(item.label)}`}></span>
                      <span className="relative z-10">{item.label}</span>
                      {/* Premium Shimmer */}
                      <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[25deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out"></span>
                    </a>
                  );
                }

                return (
                  item.isExternal ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative group px-5 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-synapse-primary/40 transition-all duration-500 hover:-translate-y-1 active:scale-95 transform overflow-hidden ${
                        isHypnosisLink(item.href) 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                          : 'bg-gradient-to-r from-synapse-primary to-synapse-accent'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                    </a>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="relative group px-4 py-2 text-sm font-bold text-slate-600 dark:text-gray-300 hover:text-synapse-primary dark:hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center bg-synapse-primary"></span>
                    </a>
                  )
                );
              })}
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-white/10">
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-gray-400 hover:bg-synapse-primary/10 hover:text-synapse-primary transition-all">
                  <span>{languages.find(l => l.code === language)?.flag}</span>
                  <span>{language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-24 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex items-center gap-3 w-full px-4 py-2 text-sm font-bold transition-colors ${language === lang.code ? 'text-synapse-primary bg-synapse-primary/5' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                    >
                      <span>{lang.flag}</span>
                      <span className="uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all duration-500 shadow-sm hover:shadow-md"
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 transition-all active:scale-90"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-synapse-primary/10 text-synapse-primary hover:bg-synapse-primary hover:text-white transition-all duration-300"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2 bg-white dark:bg-synapse-dark border-t border-slate-100 dark:border-white/10 shadow-2xl">
          {navItems.map((item) => {
            const isSpecial = isSpecialItem(item.label);
            
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => !item.isExternal && handleNavClick(e, item)}
                className={`block px-5 py-4 rounded-2xl text-lg font-black transition-all ${
                  isSpecial
                    ? `${getSpecialStyles(item.label)} border-[1px] shadow-sm`
                    : item.isExternal 
                      ? "bg-gradient-to-r from-synapse-primary to-synapse-accent text-white shadow-lg"
                      : "text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
                {isSpecial && <span className={`ml-2 text-[10px] animate-pulse ${getSpecialDotColor(item.label).replace('bg-', 'text-')}`}>●</span>}
              </a>
            );
          })}
          <div className="grid grid-cols-5 gap-2 pt-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                className={`p-3 rounded-xl border text-xl flex items-center justify-center transition-all ${language === lang.code ? 'border-synapse-primary bg-synapse-primary/10' : 'border-slate-200 dark:border-white/10'}`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};