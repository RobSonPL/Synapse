import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { 
  generateBusinessAudit, 
  BusinessAuditResult 
} from '../services/geminiService';
import { saveLead } from '../services/firebase';
import confetti from 'canvas-confetti';
import { 
  SearchCheck, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Cpu, 
  Clock, 
  RefreshCw,
  Award
} from 'lucide-react';

const COMMON_CHALLENGES = [
  'Czasochłonne odpisywanie na maile i oferty',
  'Brak automatycznego lejka i bazy CRM',
  'Niski współczynnik konwersji ze strony',
  'Chaotyczne tworzenie treści i social media',
  'Ręczne wystawianie i wysyłanie dokumentów'
];

export const BusinessAuditor: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([COMMON_CHALLENGES[0], COMMON_CHALLENGES[1]]);
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<BusinessAuditResult | null>(null);

  // Lead capture
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);

  const toggleChallenge = (item: string) => {
    sound.playHover();
    if (selectedChallenges.includes(item)) {
      setSelectedChallenges(selectedChallenges.filter(c => c !== item));
    } else {
      setSelectedChallenges([...selectedChallenges, item]);
    }
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    setIsLoading(true);
    sound.playClick();

    try {
      const res = await generateBusinessAudit(businessName, selectedChallenges);
      setAuditResult(res);
      sound.playSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAuditLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !auditResult) return;

    setIsSubmittingLead(true);
    sound.playClick();

    try {
      await saveLead({
        email,
        phone,
        source: 'audit',
        status: 'new',
        message: `Audyt AI dla "${businessName}". Wynik: ${auditResult.healthScore}/100. Wyzwania: ${selectedChallenges.join(', ')}`,
        details: {
          businessName,
          selectedChallenges,
          auditResult
        }
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsLeadSubmitted(true);
    } catch (err) {
      console.error('Error saving audit lead:', err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <section id="ai-audit" className="py-24 bg-slate-950 transition-colors duration-300 relative overflow-hidden border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI EFFICIENCY SCANNER</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Ekspresowy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Audyt AI Twojej Firmy</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Wskaż nazwę firmy lub adres strony oraz kluczowe wąskie gardła. Model Gemini natychmiast zidentyfikuje quick-wins i plan redukcji manualnych prac.
            </p>
          </div>
        </FadeIn>

        {/* Input Card */}
        <div className="max-w-3xl mx-auto mb-10">
          <HoloCard3D intensity={6}>
            <form onSubmit={handleRunAudit} className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-xl space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
                  Nazwa firmy lub adres strony www *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder="np. MojaFirma.pl lub Kancelaria Adwokacka Kowalski"
                  className="w-full bg-slate-800/80 border border-slate-700 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-3">
                  Wybierz główne wąskie gardła w obecnym procesie:
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_CHALLENGES.map(item => {
                    const isSelected = selectedChallenges.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleChallenge(item)}
                        className={`text-xs px-3.5 py-2 rounded-xl transition border font-medium ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !businessName.trim()}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg transition flex items-center justify-center gap-2 transform hover:scale-[1.01] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Gemini analizuje wektory usprawnień procesowych...</span>
                  </>
                ) : (
                  <>
                    <SearchCheck className="w-4 h-4" />
                    <span>Uruchom Natychmiastowy Audyt AI</span>
                  </>
                )}
              </button>
            </form>
          </HoloCard3D>
        </div>

        {/* Results Card */}
        {auditResult && (
          <FadeIn>
            <div className="max-w-4xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
              {/* Header with Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                    RAPORT DIAGNOSTYCZNY
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    {businessName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    {auditResult.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 self-start sm:self-auto">
                  <Award className="w-8 h-8 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Potencjał Skalowania</span>
                    <div className="text-2xl font-black text-emerald-400">
                      {auditResult.healthScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Wins (Szybkie zyski 48h) */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Natychmiastowe Quick-Wins (do wdrożenia w 48h)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {auditResult.quickWins.map((win, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200">
                      <span className="font-mono text-emerald-400 font-bold mr-1">0{idx + 1}.</span>
                      {win}
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Steps */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>Rekomendowane Wdrożenia Automatyzacji i Agentów</span>
                </h4>
                <div className="space-y-2.5">
                  {auditResult.automationSteps.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h5 className="text-sm font-bold text-white">{step.title}</h5>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">Technologia: {step.tech}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full self-start sm:self-auto">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{step.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storytelling tip */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 mb-8 text-xs text-indigo-200">
                <span className="font-mono font-bold text-indigo-300 block mb-1">Rekomendacja Narracyjna (Copywriting & UX):</span>
                {auditResult.storytellingAdvice}
              </div>

              {/* Lead capture */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-400/40 text-center">
                {isLeadSubmitted ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="font-bold text-white text-base">Zgłoszenie audytowe zostało zarejestrowane!</p>
                    <p className="text-xs text-emerald-200 max-w-lg mx-auto">
                      Skontaktujemy się z Tobą, aby bezpłatnie omówić mapę wdrożenia tych automatyzacji w Twoim zespole.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSaveAuditLead} className="max-w-md mx-auto space-y-3">
                    <h5 className="font-bold text-white text-sm">
                      Chcesz wdrożyć te usprawnienia z gwarancją rezultatu?
                    </h5>
                    <p className="text-xs text-slate-400">
                      Zamów bezpłatną, 20-minutową sesję strategiczną z zespołem Synapse Creative:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Twój adres e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="flex-1 bg-slate-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="tel"
                        placeholder="Telefon (opcjonalnie)"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full sm:w-36 bg-slate-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmittingLead ? 'Wysyłam...' : 'Umów bezpłatną konsultację tego audytu'}</span>
                    </button>
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
