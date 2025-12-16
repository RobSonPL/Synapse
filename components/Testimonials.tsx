import React from 'react';
import { FadeIn } from './FadeIn';
import { QuoteIcon } from './Icons';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Współpraca z Synapse Creative to czysta przyjemność. Profesjonalne podejście do tematu AI oszczędziło nam setki godzin pracy.",
    author: "Marek Kowalski",
    role: "CEO, TechStart",
    initials: "MK"
  },
  {
    id: 2,
    content: "Nareszcie e-booki, które nie tylko niosą wartość merytoryczną, ale wyglądają obłędnie. Sprzedaż wzrosła o 40%.",
    author: "Anna Nowak",
    role: "Marketing Manager",
    initials: "AN"
  },
  {
    id: 3,
    content: "Cenię sobie ludzkie podejście. To nie jest zwykła agencja, to partner, który naprawdę słucha. Polecam każdemu.",
    author: "Karolina Wiśniewska",
    role: "Blogerka",
    initials: "KW"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-synapse-dark relative transition-colors duration-300 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              Zaufali mi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-synapse-primary to-synapse-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Dobre relacje to podstawa. Zobacz, co mówią osoby, z którymi miałem przyjemność pracować.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <FadeIn key={item.id} delay={index * 150} className="h-full">
              <div className="h-full flex flex-col justify-between bg-white dark:bg-white/5 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-white/10 relative transition-colors duration-300 hover:shadow-xl group">
                
                <div className="absolute top-6 right-6 text-slate-200 dark:text-white/5 group-hover:text-synapse-primary/20 transition-colors">
                  <QuoteIcon />
                </div>

                <div className="relative z-10">
                  <p className="text-slate-600 dark:text-gray-300 italic mb-8 leading-relaxed">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-synapse-primary to-synapse-accent flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm transition-colors duration-300">
                      {item.author}
                    </h4>
                    <p className="text-xs text-synapse-primary font-medium">
                      {item.role}
                    </p>
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
