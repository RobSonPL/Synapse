import React from 'react';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
  
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden transition-colors duration-300">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-synapse-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-synapse-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <FadeIn>
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-synapse-primary/30 bg-white/50 dark:bg-synapse-primary/10 backdrop-blur-sm">
              <span className="text-synapse-primary font-semibold text-sm tracking-wide uppercase">
                  Wydawnictwo Cyfrowe & AI
              </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-slate-900 dark:text-white mb-2 transition-colors duration-300">Twoja wiedza zasługuje na</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-synapse-primary via-blue-500 to-synapse-accent">
              Profesjonalny E-book
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Pomagam ekspertom i twórcom przekuć pomysły w dochodowe produkty cyfrowe. Od redakcji tekstu, przez design okładki, aż po wsparcie AI w promocji.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={scrollToServices}
              className="px-8 py-4 rounded-full bg-synapse-dark text-white dark:bg-white dark:text-synapse-dark font-bold text-lg hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:scale-105 transform duration-200 cursor-pointer"
            >
              Stwórz E-booka
            </button>
            <a href="https://www.naffy.io/Synapse_Creative" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10 dark:text-white font-semibold text-lg transition-colors backdrop-blur-sm">
              Zobacz Moje Publikacje
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};