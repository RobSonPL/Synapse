import React, { useState } from 'react';
import { NavItem, Language } from '../types';
import { SunIcon, MoonIcon, SynapseLogo } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems: NavItem[] = [
    { label: t.nav.ebooks, href: 'https://www.naffy.io/Synapse_Creative', isExternal: true },
    { label: t.nav.courses, href: '#', isExternal: true },
    { label: t.nav.blog, href: '#blog', isExternal: false },
    { label: t.nav.gifts, href: '#gifts', isExternal: false },
    { label: t.nav.health, href: 'https://pl4557135.e-naturessunshine.com/', isExternal: true },
  ];

  const languages: { code: Language; flag: string }[] = [
    { code: 'pl', flag: '🇵🇱' },
    { code: 'en', flag: '🇬🇧' },
    { code: 'de', flag: '🇩🇪' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
  ];

  // Helper to determine if an item should be yellow
  const isYellowItem = (href: string) => href === '#blog' || href === '#gifts';

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-synapse-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
             <SynapseLogo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 animate-[pulse_3s_ease-in-out_infinite]" />
             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-synapse-primary dark:from-white dark:to-synapse-primary">
               Synapse
             </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-4">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group px-4 py-2 rounded-full bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-semibold text-sm shadow-md shadow-synapse-primary/30 hover:shadow-xl hover:shadow-synapse-primary/50 transition-all duration-300 hover:scale-110 active:scale-95 transform overflow-hidden"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <span className="absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative group px-3 py-2 text-sm font-bold transition-all duration-300 hover:scale-110 transform ${
                      isYellowItem(item.href) 
                        ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300' 
                        : 'text-slate-600 dark:text-gray-300 hover:text-synapse-primary dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    {/* Animated Underline */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                       isYellowItem(item.href) ? 'bg-yellow-500' : 'bg-synapse-primary'
                    }`}></span>
                  </a>
                )
              ))}
            </div>

            <div className="h-6 w-px bg-slate-300 dark:bg-white/20 mx-2"></div>

            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-synapse-primary transition-all duration-300 hover:scale-105">
                <span className="text-lg shadow-sm">{languages.find(l => l.code === language)?.flag}</span>
                <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-16 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`block w-full text-left px-3 py-2 text-sm transition-colors ${language === lang.code ? 'bg-synapse-primary/10 text-synapse-primary' : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                  >
                    {lang.flag} <span className="uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-yellow-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-synapse-primary hover:scale-110 active:scale-95 transform shadow-sm hover:shadow-md"
              aria-label="Toggle Theme"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex gap-4 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-yellow-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-all duration-200 focus:outline-none"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-synapse-dark border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : ""}
                className={`block px-3 py-2 rounded-md text-base font-bold ${
                  item.isExternal 
                    ? "bg-gradient-to-r from-synapse-primary to-synapse-accent text-white my-1 shadow-md" 
                    : isYellowItem(item.href)
                      ? "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                      : "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="flex gap-2 px-3 py-2 border-t border-slate-100 dark:border-white/5 mt-2">
              {languages.map((lang) => (
                 <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded text-sm ${language === lang.code ? 'bg-synapse-primary text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-300'}`}
                  >
                    {lang.flag}
                  </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};