import React from 'react';
import { BookIcon, GraphicIcon, PenIcon, PlusIcon, CheckIcon } from './Icons';
import { FadeIn } from './FadeIn';
import { ServiceItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { LazyImage } from './LazyImage';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  cart: ServiceItem[];
  toggleCartItem: (item: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ cart, toggleCartItem }) => {
  const { t } = useLanguage();
  const { services } = useData();
  
  const isInCart = (id: string) => cart.some(item => item.id === id);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleToggle = (item: ServiceItem) => {
    sound.playClick();
    toggleCartItem(item);
  };

  return (
    <section id="services" className="py-28 bg-slate-950/90 relative transition-colors duration-300 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PAKIETY USŁUG I PRODUKTÓW 2030</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 transition-colors duration-300">
              {t.services.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg transition-colors duration-300">
              {t.services.subtitle}
            </p>
          </div>

          {/* Interactive Table of Contents */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['publish', 'web', 'text'].map((cat) => (
              <button 
                key={cat}
                onClick={() => scrollToSection(`service-${cat}`)}
                className="px-6 py-2.5 rounded-full bg-slate-900/80 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] active:scale-95"
              >
                {cat === 'publish' ? t.services.toc_publish : cat === 'web' ? t.services.toc_web : t.services.toc_text}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Featured: Publishing Focus with HoloCard3D */}
        <FadeIn className="mb-20">
          <HoloCard3D intensity={8}>
            <div id="service-featured" className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-cyan-500/40 shadow-2xl group transition-all duration-500 hover:shadow-[0_0_40px_rgba(14,165,233,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-70"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center">
                <div className="p-8 md:p-14 md:w-2/3">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border border-cyan-500/30">
                    {t.services.featured_badge}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                    {t.services.featured_title}
                  </h3>
                  <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-xl">
                    {t.services.featured_desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                      <a 
                        href="#contact-form"
                        onClick={(e) => {
                            e.preventDefault();
                            sound.playClick();
                            const el = document.getElementById('contact-form');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black uppercase tracking-widest text-xs shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-300/30"
                      >
                        <span className="mr-2"><BookIcon /></span>
                        {t.services.configure}
                      </a>
                  </div>
                </div>
                <div className="w-full md:w-1/3 h-64 md:h-auto self-stretch bg-slate-900/50 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/10 overflow-hidden">
                   <div className="relative transform group-hover:scale-110 transition-transform duration-700">
                      <BookIcon className="w-32 h-32 text-cyan-400/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-cyan-400/30 rounded-full blur-2xl animate-pulse"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </HoloCard3D>
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'publish', icon: <BookIcon />, title: t.services.toc_publish, color: 'cyan', isTop: true },
              { id: 'web', icon: <GraphicIcon />, title: t.services.toc_web, color: 'indigo', isTop: false },
              { id: 'text', icon: <PenIcon />, title: t.services.toc_text, color: 'purple', isTop: false }
            ].map((cat, idx) => (
              <FadeIn key={cat.id} delay={idx * 150} className="h-full">
                <HoloCard3D intensity={10} className="h-full">
                  <div 
                    id={`service-${cat.id}`} 
                    className={`h-full bg-slate-900/80 border ${cat.isTop ? 'border-cyan-400/60 ring-2 ring-cyan-500/20 shadow-[0_0_30px_rgba(14,165,233,0.2)]' : 'border-white/10'} rounded-3xl p-8 transition-all duration-500 flex flex-col relative overflow-hidden group scroll-mt-24 backdrop-blur-xl`}
                  >
                    {cat.isTop && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[9px] font-mono font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-lg border-b border-l border-cyan-300/30">
                        BESTSELLER 2030
                      </div>
                    )}
                    
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {cat.icon}
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-8 tracking-tight">{cat.title}</h3>
                    
                    <ul className="space-y-4 flex-grow">
                        {services.filter(s => s.category === cat.id).map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 group/item">
                                <div className="flex items-center flex-1 gap-3">
                                    {item.imageUrl && (
                                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 group/img overflow-hidden rounded-lg border border-white/10 w-10 h-8 shadow-sm">
                                         <LazyImage src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover/img:scale-125 transition-transform duration-700 bg-slate-800" />
                                      </a>
                                    )}
                                    <div className="flex-1">
                                      <span className="text-slate-200 text-[13px] font-bold block mb-0.5 line-clamp-1 group-hover/item:text-cyan-300 transition-colors">{item.name}</span>
                                      <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">{item.price}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleToggle(item)}
                                    className={`ml-2 p-2 rounded-xl transition-all duration-300 flex-shrink-0 shadow-sm ${
                                        isInCart(item.id) 
                                        ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]' 
                                        : 'bg-white/5 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 border border-white/5'
                                    }`}
                                >
                                    {isInCart(item.id) ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                  </div>
                </HoloCard3D>
              </FadeIn>
            ))}
        </div>

      </div>
    </section>
  );
};
