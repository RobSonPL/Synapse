import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { GiftItem } from '../types';

const gifts: GiftItem[] = [
  {
    id: 'g1',
    title: 'Postaw wirtualną kawę',
    description: 'Podoba Ci się to co robię? Możesz mnie wesprzeć stawiając wirtualną małą czarną. Dzięki temu mam energię do dalszego tworzenia i dzielenia się wiedzą!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/postaw-kawe-qbg'
  },
  {
    id: 'g2',
    title: 'Bajka: Przygody Małego Odkrywcy',
    description: 'Fascynująca bajka dla najmłodszych, która rozbudza ciekawość świata i uczy poprzez zabawę. Idealna lektura na dobranoc dla Twojego dziecka.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/przygody-malego-odkrywcy-bajka-YIt'
  },
  {
    id: 'g3',
    title: 'Matko, obiad ogarnij! (14 dni)',
    description: 'Gotowy plan posiłków na dwa tygodnie. Oszczędź czas, pieniądze i nerwy, wiedząc dokładnie co ugotować każdego dnia. Proste i szybkie przepisy.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/matko-obiad-ogarnij-na-14-dni-lsI'
  },
  {
    id: 'g4',
    title: 'Witaj w klubie niewyspanych',
    description: 'Masz dość nieprzespanych nocy? Praktyczny poradnik, który pomoże Tobie i Twojemu dziecku odzyskać spokojny sen. Znajdź wyjście z tunelu zmęczenia.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/witaj-w-klubie-niewyspanych-ale-nie-martw-sie-wlasnie-znalazlas-wyjscie-beZ'
  },
  {
    id: 'g5',
    title: 'Kaizen: Sposób na życie',
    description: 'Odkryj japońską filozofię ciągłego doskonalenia. Metoda małych kroków, która pozwoli Ci osiągnąć wielkie cele bez stresu i wypalenia.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/kaizen-sposob-na-zycie-SHp'
  },
  {
    id: 'g6',
    title: 'Planer Celów na 2026',
    description: 'Przygotuj się na nadchodzący rok już teraz. Ustrukturyzowany planer, który pomoże Ci zdefiniować i zrealizować marzenia krok po kroku.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    downloadUrl: 'https://www.naffy.io/Synapse_Creative/planer-celow-na-2026-pkd'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {gifts.map((gift, index) => (
            <FadeIn key={gift.id} delay={index * 100}>
               <div className="flex flex-col h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                  <div className="w-full h-48 relative overflow-hidden group">
                     <img 
                        src={gift.thumbnailUrl} 
                        alt={gift.title} 
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 text-white font-bold bg-synapse-accent px-3 py-1 rounded-full text-xs shadow-md">
                        POBIERZ
                     </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">{gift.title}</h3>
                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                          {gift.description}
                        </p>
                     </div>
                     <a 
                        href={gift.downloadUrl} 
                        className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-center font-bold text-sm hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{t.gifts.open}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                  </div>
               </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};