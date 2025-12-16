import React, { useState } from 'react';
import { generateCreativeSpark } from '../services/geminiService';
import { SparkleIcon } from './Icons';
import { GeminiStatus } from '../types';
import { FadeIn } from './FadeIn';

export const CreativeSpark: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);

  const handleSpark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setStatus(GeminiStatus.LOADING);
    setResponse('');
    
    const result = await generateCreativeSpark(topic);
    
    setResponse(result);
    setStatus(GeminiStatus.SUCCESS);
  };

  return (
    <section id="creative-spark" className="py-24 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-synapse-dark dark:to-slate-900 transition-colors duration-300"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-synapse-primary/30 shadow-2xl dark:shadow-synapse-primary/20 backdrop-blur-md transition-all duration-300">
            
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-synapse-primary/10 dark:bg-synapse-primary/20 rounded-full animate-pulse text-synapse-primary">
                  <SparkleIcon />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Synapse AI: Iskra Kreatywności</h2>
            <p className="text-slate-600 dark:text-gray-300 mb-8 transition-colors duration-300">
              Zobacz jak działają moi Agenci AI. Wpisz temat, nad którym myślisz, a ja dam Ci motywacyjnego kopa i kreatywny pomysł.
            </p>

            <form onSubmit={handleSpark} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input 
                type="text" 
                placeholder="Np. rozwój osobisty, marketing kawy, nauka języków..." 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-synapse-primary transition-all"
              />
              <button 
                type="submit" 
                disabled={status === GeminiStatus.LOADING || !topic}
                className="bg-gradient-to-r from-synapse-primary to-synapse-accent text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-synapse-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                {status === GeminiStatus.LOADING ? (
                   <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Łączenie synaps...
                   </>
                ) : (
                  <>Generuj Iskrę</>
                )}
              </button>
            </form>

            {response && (
              <div className="mt-8 text-left bg-slate-50 dark:bg-black/30 p-6 rounded-xl border border-slate-200 dark:border-white/10 animate-[float_4s_ease-in-out_infinite] shadow-inner transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-synapse-accent flex items-center justify-center text-xs font-bold text-white">AI</div>
                  <div>
                    <p className="text-lg text-slate-700 dark:text-gray-200 leading-relaxed italic transition-colors duration-300">
                      "{response}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-6 text-xs text-slate-400 dark:text-gray-500 transition-colors duration-300">
              Powered by Gemini API. To tylko próbka możliwości, jakie możemy wdrożyć w Twoim biznesie.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};