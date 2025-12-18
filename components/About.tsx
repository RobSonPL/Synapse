import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { AwardIcon, XMarkIcon, SearchIcon } from './Icons';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [certError, setCertError] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Link do Twojego certyfikatu Me+AI (CampusAI) - zaktualizowany na link online
  const certUrl = "https://elearning-courses.ams3.digitaloceanspaces.com/c/cert_68acc43a160b105f6039a37f_68a6157ff3be51df1dd62819.png"; 
  
  // Link do Twojego zdjęcia profilowego
  const profileUrl = "https://drive.google.com/thumbnail?id=1d4yAeltqegM_hIAJ_uUsKmERdUSg8G_C&sz=w1000";
  const fallbackProfileUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          
          <FadeIn className="w-full md:w-1/2">
             <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-synapse-primary to-synapse-accent rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <img 
                      src={imgError ? fallbackProfileUrl : profileUrl}
                      alt="Robert Hałas - Synapse Creative" 
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full object-cover aspect-[3/4] transition-all duration-700 hover:scale-105"
                    />
                </div>
             </div>
          </FadeIn>

          <FadeIn className="w-full md:w-1/2" delay={200}>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
              Cześć, tu <span className="text-synapse-primary">Robert</span>.
            </h2>
            <h3 className="text-xl font-medium text-slate-700 dark:text-gray-200 mb-4">
              Twórca e-booków, pasjonat technologii i psychologii.
            </h3>
            
            <div className="space-y-4 text-slate-600 dark:text-gray-300 text-lg transition-colors duration-300 leading-relaxed">
              <p>
                W Synapse Creative łączę kompetencje twarde (IT, DTP, AI) z miękkimi (Psychologia, Storytelling), aby tworzyć produkty cyfrowe, które realnie rozwiązują problemy.
              </p>
              
              <ul className="space-y-3 mt-4">
                 <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-primary flex-shrink-0"></span>
                  <span><strong>Wydawnictwo nowej generacji.</strong> Pomagam przenieść Twoją unikalną wiedzę na "papier" cyfrowy, wykorzystując najnowocześniejsze narzędzia AI.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-primary flex-shrink-0"></span>
                  <span><strong>Optymalizacja procesów.</strong> Dzięki technologii to, co kiedyś zajmowało tygodnie, teraz realizujemy w dni, zachowując najwyższą jakość.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-accent flex-shrink-0"></span>
                  <span><strong>Ekspercka wiedza.</strong> Nieustannie szkolę się u liderów branży, aby dostarczać rozwiązania wyprzedzające rynek.</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Sekcja Certyfikatów */}
        <FadeIn delay={300}>
          <div className="border-t border-slate-100 dark:border-white/5 pt-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-synapse-primary/10 rounded-2xl text-synapse-primary">
                <AwardIcon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Certyfikaty i Osiągnięcia</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Karta Certyfikatu Me+AI */}
              <div 
                className="group relative bg-slate-50 dark:bg-white/5 rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:border-synapse-primary/50 transition-all duration-500 cursor-zoom-in overflow-hidden shadow-sm hover:shadow-xl"
                onClick={() => setSelectedCert(certUrl)}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                  <div className="w-full md:w-56 aspect-[1.414/1] bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 shrink-0">
                    <img 
                      src={certUrl} 
                      alt="Me+AI Certificate - CampusAI" 
                      onError={() => setCertError(true)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-synapse-primary/10 text-synapse-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      CampusAI Professional
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight">Me+AI Program at CampusAI</h4>
                    
                    <div className="relative mb-6">
                      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed italic">
                        "W krótkim czasie, w zasadzie w pół roku, ta wiedza spowodowała, że zostałem ekspertem w kolaboracji człowiek-AI, co całkowicie przedefiniowało mój workflow."
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                       {['Prompt Engineering', 'AI Workflow', 'GenAI Expertise'].map(tag => (
                         <span key={tag} className="px-2 py-1 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/5 rounded-md text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">{tag}</span>
                       ))}
                    </div>
                  </div>
                </div>
                {/* Lupa Overlay */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-synapse-primary text-white p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0">
                  <SearchIcon className="h-5 w-5" />
                </div>
              </div>

              {/* Drugi slot na certyfikat / Zapowiedź */}
              <div className="bg-slate-50/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-70 group hover:opacity-100 transition-opacity">
                 <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 text-slate-300 group-hover:text-synapse-primary transition-colors duration-500">
                    <AwardIcon className="w-8 h-8" />
                 </div>
                 <h4 className="text-xl font-bold text-slate-700 dark:text-gray-300 mb-2">Ciągły Rozwój</h4>
                 <p className="text-sm text-slate-500 dark:text-gray-500 max-w-xs mx-auto leading-relaxed">
                   Świat AI zmienia się z dnia na dzień. Inwestuję czas w naukę, aby Twoje e-booki zawsze były o krok przed konkurencją.
                 </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Lightbox dla Certyfikatów */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500"
          onClick={() => setSelectedCert(null)}
        >
          <button className="absolute top-8 right-8 text-white p-4 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
            <XMarkIcon className="w-10 h-10" />
          </button>
          <img 
            src={selectedCert} 
            alt="Podgląd Certyfikatu" 
            className="max-w-full max-h-full rounded-sm shadow-2xl object-contain animate-in zoom-in-95 duration-500 border-[12px] border-white" 
          />
        </div>
      )}
    </section>
  );
};
