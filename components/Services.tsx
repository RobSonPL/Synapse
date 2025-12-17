import React from 'react';
import { BookIcon, GraphicIcon, PenIcon, PlusIcon, CheckIcon } from './Icons';
import { FadeIn } from './FadeIn';
import { servicesData } from '../data/servicesData';
import { ServiceItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ServicesProps {
  cart: ServiceItem[];
  toggleCartItem: (item: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ cart, toggleCartItem }) => {
  const { t } = useLanguage();
  
  const isInCart = (id: string) => cart.some(item => item.id === id);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-synapse-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              {t.services.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-primary to-synapse-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              {t.services.subtitle}
            </p>
          </div>

          {/* Interactive Table of Contents */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['publish', 'web', 'text'].map((cat) => (
              <button 
                key={cat}
                onClick={() => scrollToSection(`service-${cat}`)}
                className="px-6 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 text-xs font-black uppercase tracking-widest hover:border-synapse-primary hover:text-synapse-primary transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
              >
                {cat === 'publish' ? t.services.toc_publish : cat === 'web' ? t.services.toc_web : t.services.toc_text}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Featured: Publishing Focus - Styled like a premium Portfolio card but larger */}
        <FadeIn className="mb-20">
          <div id="service-featured" className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl group transition-all duration-500 hover:shadow-synapse-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-synapse-primary/5 to-synapse-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="p-8 md:p-16 md:w-2/3">
                <div className="inline-block px-4 py-1.5 rounded-full bg-synapse-primary/10 text-synapse-primary font-black text-[10px] uppercase tracking-[0.2em] mb-6 border border-synapse-primary/20">
                  {t.services.featured_badge}
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                  {t.services.featured_title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-xl mb-10 leading-relaxed max-w-xl">
                  {t.services.featured_desc}
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <a 
                      href="#contact-form"
                      onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById('contact-form');
                          el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-synapse-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      <span className="mr-2"><BookIcon /></span>
                      {t.services.configure}
                    </a>
                </div>
              </div>
              <div className="w-full md:w-1/3 h-64 md:h-auto self-stretch bg-slate-200/30 dark:bg-white/5 flex items-center justify-center border-l border-slate-200 dark:border-white/10 overflow-hidden">
                 <div className="relative transform group-hover:scale-110 transition-transform duration-1000">
                    <BookIcon className="w-32 h-32 text-synapse-primary/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-synapse-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Pricing Cards - Reworked to match Portfolio grid style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'publish', icon: <BookIcon />, title: t.services.toc_publish, color: 'emerald', isTop: true },
              { id: 'web', icon: <GraphicIcon />, title: t.services.toc_web, color: 'blue', isTop: false },
              { id: 'text', icon: <PenIcon />, title: t.services.toc_text, color: 'purple', isTop: false }
            ].map((cat, idx) => (
              <FadeIn key={cat.id} delay={idx * 150} className="h-full">
                <div 
                  id={`service-${cat.id}`} 
                  className={`h-full bg-white dark:bg-white/5 border ${cat.isTop ? 'border-synapse-primary/50 ring-2 ring-synapse-primary/10' : 'border-slate-200 dark:border-white/10'} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden group scroll-mt-24`}
                >
                  {cat.isTop && <div className="absolute top-0 right-0 bg-synapse-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-lg">Bestseller</div>}
                  
                  <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-100 dark:bg-${cat.color}-900/30 text-${cat.color}-600 dark:text-${cat.color}-400 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      {cat.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">{cat.title}</h3>
                  
                  <ul className="space-y-5 flex-grow">
                      {servicesData.filter(s => s.category === cat.id).map(item => (
                          <li key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-4 last:border-0 group/item">
                              <div className="flex items-center flex-1 gap-4">
                                  {item.imageUrl && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 group/img overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 w-20 h-14 shadow-sm">
                                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover/img:scale-125 transition-transform duration-700 bg-slate-100" />
                                    </a>
                                  )}
                                  <div className="flex-1">
                                    <span className="text-slate-700 dark:text-gray-200 text-sm font-bold block mb-0.5 line-clamp-1 group-hover/item:text-synapse-primary transition-colors">{item.name}</span>
                                    <span className="text-xs text-synapse-primary font-black uppercase tracking-wider">{item.price}</span>
                                  </div>
                              </div>
                              <button 
                                  onClick={() => toggleCartItem(item)}
                                  className={`ml-3 p-2.5 rounded-xl transition-all duration-300 flex-shrink-0 shadow-sm ${
                                      isInCart(item.id) 
                                      ? 'bg-synapse-primary text-white hover:bg-red-500 hover:rotate-12' 
                                      : 'bg-slate-100 dark:bg-white/10 text-slate-400 hover:bg-synapse-primary hover:text-white hover:-rotate-12'
                                  }`}
                              >
                                  {isInCart(item.id) ? <CheckIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                              </button>
                          </li>
                      ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black text-center">Dodaj do zapytania powyżej</p>
                  </div>
                </div>
              </FadeIn>
            ))}
        </div>
      </div>
    </section>
  );
};