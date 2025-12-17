import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { GiftItem } from '../types';

const gifts: GiftItem[] = [
  {
    id: 'g1',
    title: 'Postaw wirtualną kawę',
    description: 'Podoba Ci się to co robię? Możesz mnie wesprzeć stawiając wirtualną małą czarną.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/postaw-kawe-qbg'
  },
  {
    id: 'g2',
    title: 'Bajka: Odkrywca',
    description: 'Fascynująca bajka dla najmłodszych.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/przygody-malego-odkrywcy-bajka-YIt'
  },
  {
    id: 'g3',
    title: 'Obiad ogarnij!',
    description: 'Gotowy plan posiłków na dwa tygodnie.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/matko-obiad-ogarnij-na-14-dni-lsI'
  },
  {
    id: 'g4',
    title: 'Niewyspani',
    description: 'Praktyczny poradnik spokojnego snu.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/witaj-w-klubie-niewyspanych-ale-nie-martw-sie-wlasnie-znalazlas-wyjscie-beZ'
  },
  {
    id: 'g5',
    title: 'Kaizen',
    description: 'Japońska filozofia ciągłego doskonalenia.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/kaizen-sposob-na-zycie-SHp'
  },
  {
    id: 'g6',
    title: 'Planer 2026',
    description: 'Przygotuj się na nadchodzący rok.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/planer-celow-na-2026-pkd'
  }
];

export const FreeGifts: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="gifts" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-synapse-dark dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-synapse-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {gifts.map((gift, index) => (
            <FadeIn key={gift.id} delay={index * 50}>
               <a 
                  href={gift.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative h-[220px] overflow-hidden rounded-xl shadow-sm border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 transition-all duration-500 hover:shadow-lg active:scale-[0.98]"
               >
                  <img 
                    src={gift.thumbnailUrl} 
                    alt={gift.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className="text-sm font-black text-white mb-1 tracking-tight truncate">
                      {gift.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white font-black text-[8px] uppercase tracking-widest">
                       <span>Pobierz</span>
                    </div>
                  </div>
               </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};