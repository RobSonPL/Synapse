import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Briefcase, Zap, Globe, MessageSquare } from 'lucide-react';
import { FadeIn } from './FadeIn';

type QuizStep = 'start' | 'q1' | 'q2' | 'result' | 'lead';

export const BusinessQuiz: React.FC = () => {
  const [step, setStep] = useState<QuizStep>('start');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (question: string, answer: string, nextStep: QuizStep) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
    setStep(nextStep);
  };

  const getRecommendation = () => {
    if (answers.q1 === 'time') return {
      title: 'Automatyzacje AI',
      desc: 'Twój biznes najbardziej skorzysta na automatyzacji powtarzalnych zadań. Zaprojektujemy boty, które oszczędzą Ci dziesiątki godzin miesięcznie.',
      icon: Zap
    };
    if (answers.q1 === 'sales' && answers.q2 === 'local') return {
      title: 'Nowoczesna Strona WWW',
      desc: 'Potrzebujesz platformy, która będzie zarabiać 24/7. Skupimy się na konwersji, designie i storytellingu, aby przyciągnąć lokalnych klientów.',
      icon: Globe
    };
    return {
      title: 'Audyt i Strategia',
      desc: 'Zalecamy kompleksowy audyt cyfrowy. Opracujemy strategię łączącą stronę WWW z odpowiednimi automatyzacjami obsługi klienta.',
      icon: Briefcase
    };
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_lead_submit', {
        'event_category': 'lead',
        'event_label': 'Business Quiz'
      });
    }

    setIsSubmitted(true);
  };

  return (
    <section id="quiz" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Nie wiesz od czego <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent">zacząć?</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-300">
              Odpowiedz na 2 proste pytania, a sztuczna inteligencja dobierze najlepsze rozwiązanie dla Twojej firmy.
            </p>
          </div>
        </FadeIn>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-6 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {step === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto bg-synapse-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-10 h-10 text-synapse-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Darmowy audyt potrzeb (30 sekund)</h3>
                <button
                  onClick={() => setStep('q1')}
                  className="px-8 py-4 bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl flex items-center gap-2 mx-auto"
                >
                  Rozpocznij quiz <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 'q1' && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-2xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                  1. Jaki jest obecnie największy problem w Twojej firmie?
                </h3>
                <div className="space-y-4">
                  <button onClick={() => handleAnswer('q1', 'time', 'q2')} className="w-full text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-synapse-primary dark:hover:border-synapse-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group">
                    <span className="font-medium text-slate-800 dark:text-gray-200">Brakuje mi czasu, utonęliśmy w rutynowych zadaniach</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-synapse-primary transition-colors" />
                  </button>
                  <button onClick={() => handleAnswer('q1', 'sales', 'q2')} className="w-full text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-synapse-primary dark:hover:border-synapse-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group">
                    <span className="font-medium text-slate-800 dark:text-gray-200">Zbyt mało nowych klientów / niska konwersja</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-synapse-primary transition-colors" />
                  </button>
                  <button onClick={() => handleAnswer('q1', 'brand', 'q2')} className="w-full text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-synapse-primary dark:hover:border-synapse-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group">
                    <span className="font-medium text-slate-800 dark:text-gray-200">Konkurencja wygląda lepiej, nasza strona jest przestarzała</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-synapse-primary transition-colors" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'q2' && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full max-w-2xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                  2. Jaki zasięg ma Twój biznes?
                </h3>
                <div className="space-y-4">
                  <button onClick={() => handleAnswer('q2', 'local', 'result')} className="w-full text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-synapse-primary dark:hover:border-synapse-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group">
                    <span className="font-medium text-slate-800 dark:text-gray-200">Działam lokalnie (miasto/region)</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-synapse-primary transition-colors" />
                  </button>
                  <button onClick={() => handleAnswer('q2', 'national', 'result')} className="w-full text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-synapse-primary dark:hover:border-synapse-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group">
                    <span className="font-medium text-slate-800 dark:text-gray-200">Działam na całą Polskę / online</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-synapse-primary transition-colors" />
                  </button>
                  <button onClick={() => handleAnswer('q2', 'global', 'result')} className="w-full text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-synapse-primary dark:hover:border-synapse-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group">
                    <span className="font-medium text-slate-800 dark:text-gray-200">Globalnie (sprzedaż zagraniczna)</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-synapse-primary transition-colors" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center w-full max-w-2xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
                  <CheckCircle2 className="w-4 h-4" /> Analiza zakończona
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-white/5 mb-8">
                  {(() => {
                    const rec = getRecommendation();
                    const Icon = rec.icon;
                    return (
                      <>
                        <Icon className="w-12 h-12 text-synapse-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{rec.title}</h3>
                        <p className="text-slate-600 dark:text-gray-300">{rec.desc}</p>
                      </>
                    );
                  })()}
                </div>

                <button
                  onClick={() => setStep('lead')}
                  className="px-8 py-4 bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl inline-block"
                >
                  Odbierz darmowy plan działania
                </button>
              </motion.div>
            )}

            {step === 'lead' && (
              <motion.div
                key="lead"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-md mx-auto text-center"
              >
                {isSubmitted ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Świetnie!</h3>
                    <p className="text-slate-600 dark:text-gray-300">
                      Wysłaliśmy na Twój e-mail wstępny plan działania. Nasz specjalista skontaktuje się z Tobą w ciągu 24 godzin.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Odbierz swój plan wdrożenia
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 mb-8">
                      Podaj e-mail, na który wyślemy Ci darmowy raport oraz rekomendowane kroki.
                    </p>
                    <form onSubmit={submitLead} className="space-y-4 text-left">
                      <div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Twój adres e-mail"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary outline-none transition-all text-center"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-8 py-4 bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all"
                      >
                        Wyślij mi plan
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          {step !== 'start' && !isSubmitted && (
             <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800">
               <div 
                 className="h-full bg-gradient-to-r from-synapse-primary to-synapse-accent transition-all duration-500 ease-out"
                 style={{ 
                   width: step === 'q1' ? '25%' : step === 'q2' ? '50%' : step === 'result' ? '75%' : '100%' 
                 }}
               ></div>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};
