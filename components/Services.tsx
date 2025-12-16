import React from 'react';
import { BookIcon, GraphicIcon, PenIcon, PlusIcon, CheckIcon } from './Icons';
import { FadeIn } from './FadeIn';
import { servicesData } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServicesProps {
  cart: ServiceItem[];
  toggleCartItem: (item: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ cart, toggleCartItem }) => {
  
  const isInCart = (id: string) => cart.some(item => item.id === id);

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-synapse-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Oferta Wydawnicza</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-primary to-synapse-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Specjalizuję się w tworzeniu profesjonalnych e-booków. Kliknij <span className="inline-block align-middle text-synapse-primary"><PlusIcon /></span>, aby dodać usługę do zapytania.
            </p>
          </div>
        </FadeIn>

        {/* Featured: Publishing Focus */}
        <FadeIn className="mb-20">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-synapse-dark to-slate-900 shadow-2xl border border-white/10 group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-synapse-primary/30 rounded-full blur-[80px] group-hover:bg-synapse-primary/40 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-synapse-accent/30 rounded-full blur-[80px] group-hover:bg-synapse-accent/40 transition-colors duration-700"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="p-8 md:p-12 md:w-2/3">
                <div className="inline-block px-4 py-1 rounded-full bg-synapse-primary/20 text-synapse-primary font-bold text-xs uppercase tracking-wider mb-4 border border-synapse-primary/20">
                  Bestseller
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Masz wiedzę? Wydaj E-booka.
                </h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                  Nie musisz znać się na grafice, składzie tekstu czy marketingu. Ty dostarczasz treść (nawet w brudnopisie), a ja zamieniam to w piękny produkt gotowy do sprzedaży.
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <a 
                      href="#contact-form"
                      onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById('contact-form');
                          el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold shadow-lg hover:shadow-synapse-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 transform"
                    >
                      <BookIcon />
                      <span className="ml-2">Skonfiguruj zamówienie</span>
                    </a>
                </div>

              </div>
              <div className="w-full md:w-1/3 h-64 md:h-auto bg-slate-800/50 flex items-center justify-center border-l border-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <BookIcon /> 
                 </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Column 1: Publishing (Featured) */}
            <FadeIn delay={100} className="h-full">
                <div className="h-full bg-white dark:bg-white/10 border-2 border-synapse-primary/50 dark:border-synapse-primary/50 rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-synapse-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POLECANE</div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                        <BookIcon />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">E-booki i Publikacje</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">Kompleksowe przygotowanie produktu.</p>
                    <ul className="space-y-4 flex-grow">
                        {servicesData.filter(s => s.category === 'publish').map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-3 last:border-0 group/item">
                                <div className="flex items-center flex-1 gap-3">
                                    {item.imageUrl && (
                                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 group/img overflow-hidden rounded-md border border-slate-200 dark:border-white/10 w-16 h-12">
                                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300 bg-slate-200" />
                                      </a>
                                    )}
                                    <div className="flex-1">
                                      <span className="text-slate-700 dark:text-gray-200 text-sm font-medium block">{item.name}</span>
                                      <span className="text-xs text-synapse-primary font-bold">{item.price}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => toggleCartItem(item)}
                                    className={`ml-2 p-2 rounded-full transition-all duration-200 flex-shrink-0 ${
                                        isInCart(item.id) 
                                        ? 'bg-synapse-primary text-white hover:bg-red-500' 
                                        : 'bg-slate-100 dark:bg-white/10 text-slate-400 hover:bg-synapse-primary hover:text-white'
                                    }`}
                                >
                                    {isInCart(item.id) ? <CheckIcon /> : <PlusIcon />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeIn>

            {/* Column 2: Web & Promo */}
            <FadeIn delay={200} className="h-full">
                <div className="h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-synapse-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                        <GraphicIcon />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Promocja & Web</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">Narzędzia do sprzedaży Twojej wiedzy.</p>
                    <ul className="space-y-4 flex-grow">
                        {servicesData.filter(s => s.category === 'web').map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-3 last:border-0">
                                <div className="flex items-center flex-1 gap-3">
                                    {item.imageUrl && (
                                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 group/img overflow-hidden rounded-md border border-slate-200 dark:border-white/10 w-16 h-12">
                                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300 bg-slate-200" />
                                      </a>
                                    )}
                                    <div className="flex-1">
                                      <span className="text-slate-600 dark:text-gray-300 text-sm font-medium block">{item.name}</span>
                                      <span className="text-xs text-synapse-primary font-bold">{item.price}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => toggleCartItem(item)}
                                    className={`ml-2 p-2 rounded-full transition-all duration-200 flex-shrink-0 ${
                                        isInCart(item.id) 
                                        ? 'bg-synapse-primary text-white hover:bg-red-500' 
                                        : 'bg-slate-100 dark:bg-white/10 text-slate-400 hover:bg-synapse-primary hover:text-white'
                                    }`}
                                >
                                    {isInCart(item.id) ? <CheckIcon /> : <PlusIcon />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeIn>

            {/* Column 3: Text & Copy */}
            <FadeIn delay={300} className="h-full">
                <div className="h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-synapse-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                        <PenIcon />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Słowo & Korekta</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">Szlifowanie treści do perfekcji.</p>
                    <ul className="space-y-4 flex-grow">
                         {servicesData.filter(s => s.category === 'text').map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-3 last:border-0">
                                <div className="flex items-center flex-1 gap-3">
                                    {item.imageUrl && (
                                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 group/img overflow-hidden rounded-md border border-slate-200 dark:border-white/10 w-16 h-12">
                                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300 bg-slate-200" />
                                      </a>
                                    )}
                                    <div className="flex-1">
                                      <span className="text-slate-600 dark:text-gray-300 text-sm font-medium block">{item.name}</span>
                                      <span className="text-xs text-synapse-primary font-bold">{item.price}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => toggleCartItem(item)}
                                    className={`ml-2 p-2 rounded-full transition-all duration-200 flex-shrink-0 ${
                                        isInCart(item.id) 
                                        ? 'bg-synapse-primary text-white hover:bg-red-500' 
                                        : 'bg-slate-100 dark:bg-white/10 text-slate-400 hover:bg-synapse-primary hover:text-white'
                                    }`}
                                >
                                    {isInCart(item.id) ? <CheckIcon /> : <PlusIcon />}
                                </button>
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