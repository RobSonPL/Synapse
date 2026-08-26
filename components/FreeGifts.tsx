import React from 'react';
import { FadeIn } from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { GiftItem } from '../types';
import { LazyImage } from './LazyImage';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { Download, Sparkles } from 'lucide-react';

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
    <section id="gifts" className="py-24 bg-slate-900/60 dark:bg-slate-950/80 transition-colors duration-300 relative overflow-hidden border-t border-cyan-500/10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DARMOWE PUBLIKACJE CYFROWE</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 transition-colors duration-300">
              {t.gifts.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg transition-colors duration-300">
              {t.gifts.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {gifts.map((gift, index) => (
            <FadeIn key={gift.id} delay={index * 50}>
              <HoloCard3D intensity={10}>
                <a 
                  href={gift.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="group block relative h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 transition-all duration-500 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(14,165,233,0.3)]"
                >
                  <LazyImage 
                    src={gift.thumbnailUrl} 
                    alt={gift.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-cyan-400 mb-1">
                      FREE DOWNLOAD
                    </span>
                    <h3 className="text-sm font-black text-white mb-2 tracking-tight line-clamp-2">
                      {gift.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold text-[9px] uppercase tracking-wider group-hover:text-white transition-colors">
                      <Download className="w-3 h-3 text-cyan-400" />
                      <span>POBIERZ TERAZ</span>
                    </div>
                  </div>
                </a>
              </HoloCard3D>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
