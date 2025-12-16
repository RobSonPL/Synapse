import React from 'react';
import { BookIcon, GraphicIcon, PenIcon, CourseIcon } from './Icons';
import { FadeIn } from './FadeIn';

interface ServiceItem {
    id: string;
    name: string;
    price: string;
    category: 'web' | 'text' | 'publish';
}

const servicesData: ServiceItem[] = [
    // Web & Social Media
    { id: 'w1', name: 'Strona WEB (Wizytówka)', price: '499 zł', category: 'web' },
    { id: 'w2', name: 'Video (montaż/rolka)', price: '50 zł', category: 'web' },
    { id: 'w3', name: 'Viral (FB, Insta, TikTok)', price: 'od 30 zł', category: 'web' },
    { id: 'w5', name: 'Wirtualna Influencerka', price: '50 zł', category: 'web' },
    { id: 'w4', name: 'Obróbka Foto', price: '20 zł / szt', category: 'web' },
    // Text
    { id: 't1', name: 'Copywriting (A4, 14pkt)', price: '20 zł', category: 'text' },
    { id: 't2', name: 'Tłumaczenie tekstów (A4)', price: '5 zł', category: 'text' },
    { id: 't3', name: 'Pisanie tekstów', price: 'Indywidualnie', category: 'text' },
    // Publishing
    { id: 'p1', name: 'Stworzenie E-booka (do 40 str.)', price: '400 zł', category: 'publish' },
    { id: 'p2', name: 'Książka dla dzieci (txt+grafika, max 20 str.)', price: '100 zł', category: 'publish' },
    { id: 'p3', name: 'Komiks (20 stron)', price: '50 zł', category: 'publish' },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-synapse-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Oferta i Cennik</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-primary to-synapse-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Przejrzyste zasady, konkretne ceny. Wybierz rozwiązanie idealne dla siebie.
            </p>
          </div>
        </FadeIn>

        {/* Featured: E-books & Courses */}
        <FadeIn className="mb-20">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-synapse-dark to-slate-900 shadow-2xl border border-white/10 group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-synapse-primary/30 rounded-full blur-[80px] group-hover:bg-synapse-primary/40 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-synapse-accent/30 rounded-full blur-[80px] group-hover:bg-synapse-accent/40 transition-colors duration-700"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="p-8 md:p-12 md:w-2/3">
                <div className="inline-block px-4 py-1 rounded-full bg-synapse-primary/20 text-synapse-primary font-bold text-xs uppercase tracking-wider mb-4 border border-synapse-primary/20">
                  Centrum Wiedzy
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Rozwijaj się z Synapse
                </h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                  Dostęp do skondensowanej wiedzy w formie e-booków, profesjonalnych szkoleń oraz e-kursów. Wszystko w jednym miejscu.
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <a 
                      href="https://www.naffy.io/Synapse_Creative" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold shadow-lg hover:shadow-synapse-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 transform"
                    >
                      <BookIcon />
                      <span className="ml-2">E-booki</span>
                    </a>
                    
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 transform"
                    >
                      <CourseIcon />
                      <span className="ml-2">Szkolenia</span>
                    </a>

                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-bold border border-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 transform"
                    >
                      <span className="ml-2">E-kursy</span>
                    </a>
                </div>

              </div>
              <div className="w-full md:w-1/3 h-64 md:h-auto bg-slate-800/50 flex items-center justify-center border-l border-white/5 relative overflow-hidden">
                 {/* Decorative abstract shapes */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[float_10s_ease-in-out_infinite]">
                        <path fill="#0ea5e9" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.4C59.4,45.7,47.9,54.6,36,61.9C24.1,69.2,11.8,74.9,-1.2,77C-14.2,79.1,-29.6,77.6,-43.3,71.2C-57,64.8,-69.1,53.5,-77.3,40.1C-85.5,26.7,-89.9,11.2,-87.3,-3.1C-84.7,-17.4,-75.1,-30.5,-64.6,-41.4C-54.1,-52.3,-42.7,-61,-30.8,-69.5C-18.9,-78,-6.4,-86.3,4.9,-94.8L16.2,-103.3L44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                 </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Pricing Table (Static) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Column 1: Web & Social Media */}
            <FadeIn delay={100} className="h-full">
                <div className="h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-synapse-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                        <GraphicIcon />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Web & Social Media</h3>
                    <ul className="space-y-4 flex-grow">
                        {servicesData.filter(s => s.category === 'web').map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-3">
                                <span className="text-slate-600 dark:text-gray-300 text-sm font-medium">{item.name}</span>
                                <span className="font-bold text-synapse-primary text-sm whitespace-nowrap bg-synapse-primary/10 px-2 py-1 rounded">{item.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeIn>

            {/* Column 2: Content & Copy */}
            <FadeIn delay={200} className="h-full">
                <div className="h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-synapse-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                        <PenIcon />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Słowo & Tekst</h3>
                    <ul className="space-y-4 flex-grow">
                        {servicesData.filter(s => s.category === 'text').map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-3">
                                <span className="text-slate-600 dark:text-gray-300 text-sm font-medium">{item.name}</span>
                                <span className="font-bold text-synapse-primary text-sm whitespace-nowrap bg-synapse-primary/10 px-2 py-1 rounded">{item.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeIn>

            {/* Column 3: Publishing */}
            <FadeIn delay={300} className="h-full">
                <div className="h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-synapse-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                        <BookIcon />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Publikacje</h3>
                    <ul className="space-y-4 flex-grow">
                        {servicesData.filter(s => s.category === 'publish').map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-3">
                                <span className="text-slate-600 dark:text-gray-300 text-sm font-medium">{item.name}</span>
                                <span className="font-bold text-synapse-primary text-sm whitespace-nowrap bg-synapse-primary/10 px-2 py-1 rounded">{item.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeIn>

        </div>

      </div>
    </section>
  );
};
