import React, { useState } from 'react';
import { NavItem } from '../types';
import { SunIcon, MoonIcon, SynapseLogo } from './Icons';

const navItems: NavItem[] = [
  { label: 'E-booki', href: 'https://www.naffy.io/Synapse_Creative', isExternal: true },
  { label: 'Szkolenia', href: '#', isExternal: true },
  { label: 'E-kursy', href: '#', isExternal: true },
  { label: 'Zdrowie i Witaminy', href: 'https://pl4557135.e-naturessunshine.com/', isExternal: true },
  { label: 'Wellness', href: '#', isExternal: true },
];

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-synapse-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
             <SynapseLogo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-synapse-primary dark:from-white dark:to-synapse-primary">
               Synapse
             </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group px-4 py-2 rounded-full bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-semibold text-sm shadow-md shadow-synapse-primary/30 hover:shadow-xl hover:shadow-synapse-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 transform"
                  >
                    {item.label}
                    <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="relative group px-3 py-2 text-sm font-medium text-slate-600 dark:text-gray-300 transition-colors duration-300 hover:text-synapse-primary dark:hover:text-white hover:scale-105 transform"
                  >
                    {item.label}
                    {/* Animated Underline */}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-synapse-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                )
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-yellow-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-synapse-primary hover:scale-110 active:scale-95 transform"
              aria-label="Toggle Theme"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex gap-4 md:hidden">
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
        <div className="md:hidden bg-white dark:bg-synapse-dark border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : ""}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  item.isExternal 
                    ? "bg-gradient-to-r from-synapse-primary to-synapse-accent text-white my-1" 
                    : "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
