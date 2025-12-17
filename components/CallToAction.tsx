import React from 'react';
import { FadeIn } from './FadeIn';
import { SparkleIcon } from './Icons';

export const CallToAction: React.FC = () => {
  const scrollToSpark = () => {
    const element = document.getElementById('creative-spark');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-synapse-primary to-synapse-accent opacity-90 dark:opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
            Twoja kreatywność potrzebuje paliwa?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Nie czekaj na wenę, bo może nigdy nie nadejść. Sprawdź, jak sztuczna inteligencja potrafi odblokować Twój potencjał w kilka sekund.
          </p>
          
          <button 
            onClick={scrollToSpark}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-synapse-accent font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <SparkleIcon />
            <span>Uruchom Synapse AI</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </FadeIn>
      </div>
    </section>
  );
};