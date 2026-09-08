import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { 
  generateEbookOutline, 
  EbookOutlineResult 
} from '../services/geminiService';
import { saveLead } from '../services/firebase';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Layers, 
  Palette, 
  Target, 
  ArrowRight,
  Bookmark,
  RefreshCw
} from 'lucide-react';

export const EbookOutlineGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EbookOutlineResult | null>(null);

  // Lead submission
  const [email, setEmail] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    sound.playClick();
    try {
      const outline = await generateEbookOutline(topic, audience);
      setResult(outline);
      sound.playSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToCRM = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !result) return;

    setIsSubmittingLead(true);
    sound.playClick();
    try {
      await saveLead({
        email,
        source: 'ebook_generator',
        status: 'new',
        message: `Zapytanie o projekt e-booka: "${result.title}" (Temat: ${topic})`,
        details: {
          topic,
          audience,
          outline: result
        }
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      setIsLeadSubmitted(true);
    } catch (err) {
      console.error('Error saving ebook lead:', err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <section id="ebook-generator" className="py-24 bg-slate-900/60 transition-colors duration-300 relative overflow-hidden border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI LEAD MAGNET GENERATOR</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Generator Konspektu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">E-booka B2B</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Wpisz temat swojej branży, a sztuczna inteligencja zaprojektuje strukturę 8 rozdziałów, styl wizualny okładki oraz hipnotyzujący hook sprzedażowy.
            </p>
          </div>
        </FadeIn>

        {/* Input Form Card */}
        <div className="max-w-3xl mx-auto mb-10">
          <HoloCard3D intensity={6}>
            <form onSubmit={handleGenerate} className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
                    Główny temat lub branża e-booka *
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="np. Automatyzacje AI w biurze nieruchomości"
                    className="w-full bg-slate-800/80 border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
                    Grupa docelowa (opcjonalnie)
                  </label>
                  <input
                    type="text"
                    value={audience}
                    onChange={e => setAudience(e.target.value)}
                    placeholder="np. Pośrednicy i deweloperzy premium"
                    className="w-full bg-slate-800/80 border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg transition flex items-center justify-center gap-2 transform hover:scale-[1.01] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Gemini projektuje architekturę e-booka...</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Wygeneruj Konspekt E-booka (AI)</span>
                  </>
                )}
              </button>
            </form>
          </HoloCard3D>
        </div>

        {/* Results Presentation */}
        {result && (
          <FadeIn>
            <div className="max-w-4xl mx-auto bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
              {/* Book Header */}
              <div className="border-b border-white/10 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
                    PROJEKT PUBLIKACJI
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                    {result.targetAudience}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {result.title}
                </h3>
                <p className="text-base text-purple-300 mt-1 font-medium">
                  {result.subtitle}
                </p>
              </div>

              {/* Hook & Cover Style Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>NARRACYJNY HOOK OTWARCIA</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    "{result.hook}"
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-2">
                    <Palette className="w-4 h-4 text-cyan-400" />
                    <span>KONCEPCJA WIZUALNA OKŁADKI</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.coverDescription}
                  </p>
                </div>
              </div>

              {/* Chapters List */}
              <div className="mb-8">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Struktura Rozdziałów ({result.chapters.length})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.chapters.map(ch => (
                    <div 
                      key={ch.number} 
                      className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-purple-500/40 transition"
                    >
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-purple-400">
                          #{ch.number}
                        </span>
                        <h5 className="text-xs font-bold text-white">
                          {ch.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                        {ch.takeaway}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus / Lead Magnet Idea */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-1">
                  <Bookmark className="w-4 h-4 text-cyan-400" />
                  <span>REKOMENDOWANY LEAD MAGNET W ŚRODKU KSIĄŻKI</span>
                </div>
                <p className="text-xs text-slate-300">{result.leadMagnetIdea}</p>
              </div>

              {/* Call To Action Box (Zapisz do CRM) */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-400/40 text-center">
                {isLeadSubmitted ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="font-bold text-white text-base">Konspekt został przesłany do Synapse Creative!</p>
                    <p className="text-xs text-purple-200 max-w-lg mx-auto">
                      Otrzymasz e-mail z pełną wyceną składu, redakcji i projektu okładki 3D dla Twojego e-booka.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSaveToCRM} className="max-w-md mx-auto space-y-3">
                    <h5 className="font-bold text-white text-sm">
                      Chcesz wydać ten e-book i pozyskiwać z niego klientów?
                    </h5>
                    <p className="text-xs text-slate-400">
                      Podaj e-mail, a nasz zespół przygotuje dla Ciebie propozycję kompleksowej realizacji (treść, skład DTP, okładka 3D i lejek sprzedaży):
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Twój adres e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="flex-1 bg-slate-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmittingLead ? 'Zapisuję...' : 'Zamów projekt'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
