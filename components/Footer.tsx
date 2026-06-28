import React from 'react';
import { FadeIn } from './FadeIn';
import { SynapseLogo } from './Icons';
import { config } from '../data/config';
import { NewsletterSignup } from './NewsletterSignup';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer id="contact" className="bg-slate-50 dark:bg-synapse-dark pt-20 pb-10 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="flex flex-col items-center gap-8 mb-8">
            
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
            
            {/* Newsletter */}
            <NewsletterSignup />

            {/* Links & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl mx-auto mt-4 text-left md:text-center">
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold mb-6 text-sm uppercase tracking-wider md:text-center text-left">Menu</h4>
                <ul className="space-y-4 md:items-center flex flex-col items-start">
                  <li><a href="#about" className="text-slate-600 dark:text-gray-400 hover:text-synapse-primary transition-colors flex items-center gap-2">👋 O mnie</a></li>
                  <li><a href="#portfolio" className="text-slate-600 dark:text-gray-400 hover:text-synapse-primary transition-colors flex items-center gap-2">🎨 Projekty</a></li>
                  <li><a href="#services" className="text-slate-600 dark:text-gray-400 hover:text-synapse-primary transition-colors flex items-center gap-2">💡 Oferta</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold mb-6 text-sm uppercase tracking-wider md:text-center text-left">Kontakt</h4>
                <ul className="space-y-4 text-slate-600 dark:text-gray-400 flex flex-col md:items-center items-start">
                  <li className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-synapse-primary" />
                    <span>Brzeg, Polska</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-synapse-primary" />
                    <a href={`mailto:${config.contactEmail}`} className="text-synapse-primary hover:text-synapse-accent transition-colors font-medium">
                      {config.contactEmail}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-synapse-primary" />
                    <a href={`tel:${config.phone?.replace(/\s/g, '')}`} className="hover:text-synapse-accent transition-colors">
                      {config.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-8">
                 <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-synapse-primary hover:text-white flex items-center justify-center transition-all duration-300 group shadow-sm">
                    <span className="text-sm font-bold">IG</span>
                 </a>
                 <a href={config.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-synapse-primary hover:text-white flex items-center justify-center transition-all duration-300 group shadow-sm">
                    <span className="text-sm font-bold">LI</span>
                 </a>
                 <a href={config.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-synapse-primary hover:text-white flex items-center justify-center transition-all duration-300 group shadow-sm">
                    <span className="text-sm font-bold">FB</span>
                 </a>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex justify-center items-center px-4">
            <p className="text-slate-500 dark:text-gray-600 text-sm">
              <span 
                onClick={onOpenAdmin} 
                className="cursor-default hover:text-synapse-primary transition-colors select-none"
                title="Synapse Admin"
              >
                &copy;
              </span>
              {' '}{new Date().getFullYear()} Synapse Creative (Robert). Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};