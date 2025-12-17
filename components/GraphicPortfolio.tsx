import React, { useState, useRef } from 'react';
import { FadeIn } from './FadeIn';
import { XMarkIcon } from './Icons';
import { graphicsData, PortfolioGraphic } from '../data/graphicsData';

export const GraphicPortfolio: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [localGraphics, setLocalGraphics] = useState<PortfolioGraphic[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Fixed: Explicitly type 'file' as File to resolve the 'unknown' type error when calling readAsDataURL.
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newGraphic: PortfolioGraphic = {
          id: `local-${Date.now()}-${Math.random()}`,
          url: event.target?.result as string,
          title: 'Nowe Dzieło'
        };
        setLocalGraphics((prev) => [newGraphic, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const allGraphics = [...localGraphics, ...graphicsData];

  return (
    <section id="graphic-portfolio" className="py-24 bg-slate-50 dark:bg-synapse-dark/50 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Portfolio <span 
                className="text-synapse-primary cursor-pointer select-none active:opacity-70 transition-opacity"
                onClick={() => fileInputRef.current?.click()}
                title="Dodaj projekt"
              >
                Wizualne
              </span>
            </h2>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={handleFileChange} 
            />
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-primary to-synapse-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Moje autorskie projekty, fotomontaże i renowacje. Sztuka wspierana technologią.
            </p>
          </FadeIn>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {allGraphics.map((graphic, index) => (
            <FadeIn key={graphic.id} delay={index * 50}>
              <div 
                className="relative group overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800 cursor-zoom-in break-inside-avoid shadow-lg hover:shadow-synapse-primary/30 transition-all duration-500"
                onClick={() => setSelectedImg(graphic.url)}
              >
                <img 
                  src={graphic.url} 
                  alt={graphic.title} 
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                   <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{graphic.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div className="mt-16 text-center">
            <a 
              href="https://flic.kr/s/aHBqjCE6TV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold rounded-full shadow-lg hover:shadow-synapse-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Zobacz pełne portfolio na Flickr</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </FadeIn>

        {allGraphics.length === 0 && (
          <div className="text-center py-24 text-slate-400 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl animate-pulse">
             Sekcja gotowa na Twoje arcydzieła.
          </div>
        )}
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white p-3 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
            <XMarkIcon />
          </button>
          <img 
            src={selectedImg} 
            alt="Podgląd" 
            className="max-w-full max-h-full rounded-xl shadow-2xl object-contain animate-in zoom-in-95 duration-500" 
          />
        </div>
      )}
    </section>
  );
};