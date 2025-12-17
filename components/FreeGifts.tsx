import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { GiftItem } from '../types';

const gifts: GiftItem[] = [
  {
    id: 'g1',
    title: 'Postaw wirtualną kawę',
    description: 'Podoba Ci się to co robię? Możesz mnie wesprzeć stawiając wirtualną małą czarną. Dzięki temu mam energię do dalszego tworzenia i dzielenia się wiedzą!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/postaw-kawe-qbg'
  },
  {
    id: 'g2',
    title: 'Bajka: Przygody Małego Odkrywcy',
    description: 'Fascynująca bajka dla najmłodszych, która rozbudza ciekawość świata i uczy poprzez zabawę. Idealna lektura na dobranoc dla Twojego dziecka.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/przygody-malego-odkrywcy-bajka-YIt'
  },
  {
    id: 'g3',
    title: 'Matko, obiad ogarnij! (14 dni)',
    description: 'Gotowy plan posiłków na dwa tygodnie. Oszczędź czas, pieniądze i nerwy, wiedząc dokładnie co ugotować każdego dnia. Proste i szybkie przepisy.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/matko-obiad-ogarnij-na-14-dni-lsI'
  },
  {
    id: 'g4',
    title: 'Witaj w klubie niewyspanych',
    description: 'Masz dość nieprzespanych nocy? Praktyczny poradnik, który pomoże Tobie i Twojemu dziecku odzyskać spokojny sen. Znajdź wyjście z tunelu zmęczenia.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/witaj-w-klubie-niewyspanych-ale-nie-martw-sie-wlasnie-znalazlas-wyjscie-beZ'
  },
  {
    id: 'g5',
    title: 'Kaizen: Sposób na życie',
    description: 'Odkryj japońską filozofię ciągłego doskonalenia. Metoda małych kroków, która pozwoli Ci osiągnąć wielkie cele bez stresu i wypalenia.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/kaizen-sposob-na-zycie-SHp'
  },
  {
    id: 'g6',
    title: 'Planer Celów na 2026',
    description: 'Przygotuj się na nadchodzący rok już teraz. Ustrukturyzowany planer, który pomoże Ci zdefiniować i zrealizować marzenia krok po kroku.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/planer-celow-na-2026-pkd'
  }
];

export const FreeGifts: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="gifts" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-synapse-dark dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {gifts.map((gift, index) => (
            <FadeIn key={gift.id} delay={index * 100}>
               <a 
                  href={gift.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative h-[400px] overflow-hidden rounded-3xl shadow-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-synapse-accent/20 active:scale-[0.98]"
               >
                  {/* Image with zoom effect */}
                  <img 
                    src={gift.thumbnailUrl} 
                    alt={gift.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black text-white bg-synapse-accent/80 backdrop-blur-md shadow-lg uppercase tracking-widest border border-white/20">
                      Free Gift
                    </span>
                  </div>

                  {/* Content revealed/styled on hover */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                        {gift.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                        {gift.description}
                      </p>
                      
                      <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest group-hover:gap-5 transition-all duration-300">
                        <span className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </span>
                        <span>{t.gifts.open}</span>
                      </div>
                    </div>
                  </div>

                  {/* Glass reflection effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};