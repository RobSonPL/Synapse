import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { GiftItem } from '../types';

const gifts: GiftItem[] = [
  {
    id: 'g1',
    title: 'Checklista: Twój Pierwszy E-book',
    description: '10 kroków, które musisz wykonać, zanim zaczniesz pisać. Uniknij podstawowych błędów.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456324504439-367cee13d643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: '#'
  },
  {
    id: 'g2',
    title: '50 Promtów do ChatuGPT dla Twórców',
    description: 'Gotowe formuły, które pomogą Ci wymyślić tytuł, spis treści i plan promocji.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: '#'
  }
];

export const FreeGifts: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="gifts" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-synapse-dark dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-synapse-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              {t.gifts.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-accent to-purple-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              {t.gifts.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {gifts.map((gift, index) => (
            <FadeIn key={gift.id} delay={index * 150}>
               <div className="flex flex-col md:flex-row bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                     <img 
                        src={gift.thumbnailUrl} 
                        alt={gift.title} 
                        className="w-full h-full object-cover absolute inset-0"
                     />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-t"></div>
                     <div className="absolute top-4 left-4 md:hidden text-white font-bold bg-synapse-accent px-3 py-1 rounded-full text-xs">FREE</div>
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                     <div>
                        <div className="hidden md:inline-block text-white font-bold bg-synapse-accent px-3 py-1 rounded-full text-xs mb-3">FREE</div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{gift.title}</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                          {gift.description}
                        </p>
                     </div>
                     <div className="flex gap-3">
                        <a 
                          href={gift.downloadUrl} 
                          className="flex-1 py-2 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-center font-bold text-sm hover:opacity-90 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t.gifts.download}
                        </a>
                     </div>
                  </div>
               </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};