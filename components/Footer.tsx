import React from 'react';
import { FadeIn } from './FadeIn';
import { SynapseLogo } from './Icons';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer id="contact" className="bg-slate-50 dark:bg-synapse-dark pt-20 pb-10 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="flex flex-col items-center gap-8 mb-12">
            
            {/* Branding */}
            <div className="flex flex-col items-center gap-4">
              <SynapseLogo className="w-16 h-16" />
              <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    Synapse
                  </span>
                  <span className="text-sm font-semibold text-synapse-primary tracking-[0.3em] uppercase">
                    Creative
                  </span>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
              Łączymy kreatywność z technologią przyszłości. Twoje centrum nowoczesnych usług cyfrowych, gdzie technologia spotyka psychologię.
            </p>

            {/* Links & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-md mx-auto mt-4">
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">Menu</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-slate-600 dark:text-gray-400 hover:text-synapse-primary transition-colors">O mnie</a></li>
                  <li><a href="#portfolio" className="text-slate-600 dark:text-gray-400 hover:text-synapse-primary transition-colors">Projekty</a></li>
                  <li><a href="#services" className="text-slate-600 dark:text-gray-400 hover:text-synapse-primary transition-colors">Oferta</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kontakt</h4>
                <ul className="space-y-3 text-slate-600 dark:text-gray-400">
                  <li>Brzeg, Polska</li>
                  <li>
                    <a href="mailto:turobert@icloud.com" className="text-synapse-primary hover:text-synapse-accent transition-colors font-medium">
                      turobert@icloud.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-4">
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-synapse-primary hover:text-white flex items-center justify-center transition-all duration-300 group">
                    <span className="text-xs font-bold">IG</span>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-synapse-primary hover:text-white flex items-center justify-center transition-all duration-300 group">
                    <span className="text-xs font-bold">LI</span>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-synapse-primary hover:text-white flex items-center justify-center transition-all duration-300 group">
                    <span className="text-xs font-bold">FB</span>
                 </a>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex justify-center items-center px-4">
            <p className="text-slate-500 dark:text-gray-600 text-sm">
              &copy;
              {' '}{new Date().getFullYear()} Synapse Creative{' '}
              <span 
                onClick={onOpenAdmin} 
                className="cursor-pointer hover:text-synapse-primary transition-colors font-bold select-none"
                title="Panel Administratora"
              >
                (Robert)
              </span>.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};