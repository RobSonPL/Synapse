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
              Cześć, mam na imię <span className="text-synapse-primary">Robert</span>.
            </h2>
            
            <div className="space-y-4 text-slate-600 dark:text-gray-300 text-lg transition-colors duration-300 leading-relaxed">
              <p>
                W Synapse Creative łączę światy, które z pozoru do siebie nie pasują, a razem tworzą wybuchową mieszankę kreatywności.
              </p>
              
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-primary flex-shrink-0"></span>
                  <span><strong>Informatyk od 2006 roku.</strong> Technologia to mój naturalny język.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-primary flex-shrink-0"></span>
                  <span><strong>Przedsiębiorca z 24-letnim stażem.</strong> Prowadziłem własny biznes w branży gastronomicznej. Wiem, co to ciężka praca, zarządzanie i odpowiedzialność.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-accent flex-shrink-0"></span>
                  <span><strong>Student Psychologii (od 2021).</strong> Zgłębiam tajniki ludzkiego umysłu, by tworzyć treści, które naprawdę rezonują z odbiorcą.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-synapse-accent flex-shrink-0"></span>
                  <span><strong>Student Campus AI (od 2022).</strong> Jestem na bieżąco z rewolucją sztucznej inteligencji, wdrażając ją w praktyce.</span>
                </li>
              </ul>

              <p className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-700">
                Moje podejście? <strong>Motywacja i przyjaźń.</strong> Szanuję każdego człowieka i jego historię. Nie jestem tylko wykonawcą – jestem Twoim partnerem w cyfrowej podróży.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
