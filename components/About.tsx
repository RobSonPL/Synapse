import React, { useState } from 'react';
import { FadeIn } from './FadeIn';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <FadeIn className="w-full md:w-1/2">
             <div className="relative group">
                {/* Brand gradient glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-synapse-primary to-synapse-accent rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500"></div>
                <img 
                  src={imgError 
                    ? "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    : "https://drive.google.com/thumbnail?id=1d4yAeltqegM_hIAJ_uUsKmERdUSg8G_C&sz=w1000"
                  }
                  alt="Robert - Synapse Creative" 
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4] transition-all duration-500 hover:scale-[1.02]"
                />
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
                W Synapse Creative łączę kompetencje twarde (IT, DTP, AI) z miękkimi (Psychologia, Storytelling), aby tworzyć produkty, które sprzedają się same.
              </p>
              
              <ul className="space-y-3 mt-4">
                 <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-primary flex-shrink-0"></span>
                  <span><strong>Twój Osobisty Wydawca.</strong> Pomagam przelać Twoją wiedzę na "papier" cyfrowy. Od struktury spisu treści po finalny plik PDF.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-primary flex-shrink-0"></span>
                  <span><strong>Technologia w służbie treści.</strong> Wykorzystuję AI do generowania okładek, korekty tekstów i tworzenia materiałów promocyjnych.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-accent flex-shrink-0"></span>
                  <span><strong>Przedsiębiorca & Informatyk.</strong> Wiem, jak stworzyć produkt, ale też jak go technicznie wdrożyć do sprzedaży (sklepy, landing page).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-accent flex-shrink-0"></span>
                  <span><strong>Student Psychologii.</strong> Projektuję treści tak, aby rezonowały z emocjami Twoich odbiorców.</span>
                </li>
              </ul>

              <p className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-700 font-medium">
                Masz pomysł na e-booka, ale nie wiesz jak zacząć? Napisz do mnie. Razem stworzymy coś wyjątkowego.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};