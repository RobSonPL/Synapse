import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { 
  Calculator, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Users, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveLead } from '../services/firebase';

export const ROICalculator: React.FC = () => {
  // Parametry biznesowe
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(80);
  const [budget, setBudget] = useState<number>(6000);

  // Formularz leada z kalkulatora
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Założenia automatyzacji AI (redukcja 70% czasu rutynowych zadań)
  const automationEfficiency = 0.70;
  
  // Obliczenia
  const weeklyHoursSaved = teamSize * hoursPerWeek * automationEfficiency;
  const monthlyHoursSaved = Math.round(weeklyHoursSaved * 4.33);
  const yearlyHoursSaved = monthlyHoursSaved * 12;

  const monthlySavingsPLN = Math.round(monthlyHoursSaved * hourlyRate);
  const yearlySavingsPLN = monthlySavingsPLN * 12;

  const netAnnualBenefit = yearlySavingsPLN - budget;
  const yearlyROI = budget > 0 ? ((netAnnualBenefit) / budget) * 100 : 0;
  const paybackMonths = monthlySavingsPLN > 0 ? (budget / monthlySavingsPLN).toFixed(1) : '0';

  const handleSendROILead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;

    setIsSubmitting(true);
    sound.playClick();

    try {
      await saveLead({
        email: leadEmail,
        phone: leadPhone,
        source: 'roi_calculator',
        status: 'new',
        message: `Kalkulacja ROI: Zespół ${teamSize} os., ${hoursPerWeek}h/tydz., ${hourlyRate} zł/h, budżet ${budget} zł. Szacowane oszczędności: ${yearlySavingsPLN.toLocaleString()} PLN/rok, ROI +${yearlyROI.toFixed(0)}%.`,
        details: {
          teamSize,
          hoursPerWeek,
          hourlyRate,
          budget,
          monthlyHoursSaved,
          yearlyHoursSaved,
          monthlySavingsPLN,
          yearlySavingsPLN,
          yearlyROI: Math.round(yearlyROI),
          paybackMonths
        }
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving ROI lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="roi-calculator" className="py-28 bg-slate-950/80 transition-colors duration-300 relative overflow-hidden border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SYMULATOR ZYSKU 2030</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Kalkulator <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">ROI z Automatyzacji AI</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Sprawdź, ile roboczogodzin i kosztów operacyjnych zaoszczędzi Twoja firma dzięki wdrożeniu agentów AI, botów procesowych i nowoczesnych stron.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Kolumna lewa: Suwaki parametrów */}
          <FadeIn delay={100}>
            <HoloCard3D intensity={10} className="h-full">
              <div className="bg-slate-900/90 p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-cyan-400" />
                    <span>Parametry Twojego Zespołu</span>
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Wielkość zespołu */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Liczba pracowników wykonujących zadania</span>
                        </label>
                        <span className="text-cyan-400 font-mono font-bold text-sm">{teamSize} {teamSize === 1 ? 'osoba' : 'osób'}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="30" 
                        step="1" 
                        value={teamSize} 
                        onChange={(e) => {
                          sound.playHover();
                          setTeamSize(Number(e.target.value));
                        }}
                        className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                    </div>
                    
                    {/* Czas na powtarzalne czynności */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Czas na manualne procesy (godz./osobę/tydz.)</span>
                        </label>
                        <span className="text-indigo-400 font-mono font-bold text-sm">{hoursPerWeek} h / tydz.</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="30" 
                        step="1" 
                        value={hoursPerWeek} 
                        onChange={(e) => {
                          sound.playHover();
                          setHoursPerWeek(Number(e.target.value));
                        }}
                        className="w-full accent-indigo-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">Fakturowanie, odpowiedzi na powtarzalne maile, raportowanie, CRM.</p>
                    </div>

                    {/* Średnia stawka za godzinę */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                          <span>Średni koszt roboczogodziny (PLN/h)</span>
                        </label>
                        <span className="text-purple-400 font-mono font-bold text-sm">{hourlyRate} PLN / h</span>
                      </div>
                      <input 
                        type="range" 
                        min="40" 
                        max="250" 
                        step="5" 
                        value={hourlyRate} 
                        onChange={(e) => {
                          sound.playHover();
                          setHourlyRate(Number(e.target.value));
                        }}
                        className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                    </div>

                    {/* Planowany budżet wdrożenia */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-mono font-bold text-slate-300">
                          Szacowany budżet wdrożenia AI (PLN)
                        </label>
                        <span className="text-cyan-400 font-mono font-bold text-sm">{budget.toLocaleString()} zł</span>
                      </div>
                      <input 
                        type="range" 
                        min="2000" 
                        max="25000" 
                        step="500" 
                        value={budget} 
                        onChange={(e) => {
                          sound.playHover();
                          setBudget(Number(e.target.value));
                        }}
                        className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Kalkulacja uwzględnia 70% automatyzacji rutynowych zadań operacyjnych.</span>
                </div>
              </div>
            </HoloCard3D>
          </FadeIn>

          {/* Kolumna prawa: Wyniki & Szybki CTA do CRM */}
          <FadeIn delay={200}>
            <HoloCard3D intensity={12} className="h-full">
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-8 rounded-3xl shadow-[0_0_40px_rgba(14,165,233,0.25)] border border-cyan-400/50 text-white backdrop-blur-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                      PROGNOZA ZWROTU (ESTYMACJA)
                    </span>
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <p className="text-xs font-mono text-slate-400 mb-1">Szacowany roczny zwrot (ROI)</p>
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-300">
                        {yearlyROI > 0 ? `+${yearlyROI.toFixed(0)}%` : '0%'}
                      </div>
                      <p className="text-xs text-emerald-400 mt-1 font-mono">
                        Amortyzacja kosztu wdrożenia w ok. <span className="font-bold">{paybackMonths} mies.</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-mono mb-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Zaoszczędzone rbg</span>
                        </div>
                        <div className="text-2xl font-black text-white">
                          {yearlyHoursSaved.toLocaleString()} h
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">~{monthlyHoursSaved} h/mies.</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-mono mb-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Oszczędność netto</span>
                        </div>
                        <div className="text-2xl font-black text-emerald-400">
                          {yearlySavingsPLN.toLocaleString('pl-PL')} zł
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">~{monthlySavingsPLN.toLocaleString()} zł/mies.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Szybki formularz wysłania do bezpłatnej wyceny */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  {isSubmitted ? (
                    <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="font-bold text-white text-sm">Twoja kalkulacja została zapisana!</p>
                      <p className="text-xs text-emerald-200 mt-1">
                        Skontaktujemy się z dedykowanym planem wdrożenia dopasowanym do parametrów Twojego zespołu.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendROILead} className="space-y-3">
                      <p className="text-xs font-semibold text-slate-200">
                        Chcesz zrealizować te oszczędności? Prześlij estymację do darmowej weryfikacji:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          required
                          placeholder="Twój adres e-mail"
                          value={leadEmail}
                          onChange={e => setLeadEmail(e.target.value)}
                          className="flex-1 bg-slate-900/90 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                        />
                        <input
                          type="tel"
                          placeholder="Telefon (opcjonalnie)"
                          value={leadPhone}
                          onChange={e => setLeadPhone(e.target.value)}
                          className="w-full sm:w-36 bg-slate-900/90 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition transform hover:scale-[1.02]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Wysyłam kalkulację...' : 'Zamów bezpłatną konsultację tego ROI'}</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </HoloCard3D>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
