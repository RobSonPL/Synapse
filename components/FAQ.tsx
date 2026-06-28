import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'W jaki sposób sztuczna inteligencja może pomóc mojemu biznesowi?',
    answer: 'AI może zautomatyzować powtarzalne procesy (np. obsługę zapytań klientów, kwalifikację leadów), analizować duże zbiory danych w poszukiwaniu trendów, a także personalizować komunikację z klientami, co pozwala zaoszczędzić czas i zwiększyć zyski.'
  },
  {
    question: 'Dlaczego storytelling jest tak ważny w marketingu?',
    answer: 'Opowiadanie historii buduje więź emocjonalną z odbiorcą. Zamiast tylko wymieniać cechy produktu, storytelling pokazuje, jak Twoja marka rozwiązuje realne problemy i zmienia życie klientów, co znacząco zwiększa konwersję i lojalność.'
  },
  {
    question: 'Czy wdrożenie AI jest drogie i skomplikowane?',
    answer: 'Koszty i czas wdrożenia zależą od skali projektu, ale nowoczesne rozwiązania AI są coraz bardziej przystępne. Często zaczynamy od prostych, wysokomarżowych automatyzacji, które szybko na siebie zarabiają (zobacz nasz Kalkulator ROI).'
  },
  {
    question: 'Jak wygląda proces tworzenia dedykowanej strony internetowej?',
    answer: 'Zaczynamy od warsztatów, podczas których poznajemy Twoją firmę i cele. Następnie tworzymy makiety UX, unikalny design (UI), a na końcu programujemy szybką, responsywną stronę. Na każdym etapie ściśle współpracujemy z Tobą.'
  },
  {
    question: 'Czy oferujecie wsparcie po zakończeniu projektu?',
    answer: 'Oczywiście! Oferujemy pakiety opieki technicznej, aktualizacji oraz optymalizacji wyników. Naszym celem jest długoterminowe partnerstwo w rozwoju Twojego cyfrowego biznesu.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Często Zadawane <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent">Pytania</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-300">
            Wszystko, co musisz wiedzieć o naszych usługach, sztucznej inteligencji i storytellingu.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/50"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-semibold text-lg text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-synapse-primary"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-slate-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
