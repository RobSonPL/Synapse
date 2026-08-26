import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { Calculator, TrendingUp, Sparkles, Clock, Users, Coins } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [budget, setBudget] = useState<number>(5000);
  const [clients, setClients] = useState<number>(50);
  const [clientValue, setClientValue] = useState<number>(1000);

  // Założenia do obliczeń (miesięcznie)
  const timeSavedPerClientHours = 2;
  const hourlyRate = 100; // PLN
  const conversionIncreasePercent = 0.20; // 20% więcej klientów dzięki szybszej obsłudze

  const monthlySavings = clients * timeSavedPerClientHours * hourlyRate;
  const monthlyExtraRevenue = Math.round(clients * conversionIncreasePercent) * clientValue;
  const totalMonthlyBenefit = monthlySavings + monthlyExtraRevenue;
  
  const yearlyBenefit = totalMonthlyBenefit * 12;
  const yearlyROI = budget > 0 ? ((yearlyBenefit - budget) / budget) * 100 : 0;

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
              Sprawdź kwantowy zysk i czas, jaki zaoszczędzisz wdrażając inteligentne automatyzacje i hipnotyzujący storytelling.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          <FadeIn delay={100}>
            <HoloCard3D intensity={10}>
              <div className="bg-slate-900/90 p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <span>Parametry Twojego Biznesu</span>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Budżet na wdrożenie AI (PLN)
                      </label>
                      <span className="text-cyan-400 font-mono font-bold text-sm">{budget.toLocaleString()} zł</span>
                    </div>
                    <input 
                      type="range"
                      min="1000"
                      max="30000"
                      step="500"
                      value={budget}
                      onChange={(e) => {
                        sound.playHover();
                        setBudget(Number(e.target.value));
                      }}
                      className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Liczba klientów / transakcji (mies.)
                      </label>
                      <span className="text-cyan-400 font-mono font-bold text-sm">{clients}</span>
                    </div>
                    <input 
                      type="range"
                      min="10"
                      max="500"
                      step="5"
                      value={clients}
                      onChange={(e) => {
                        sound.playHover();
                        setClients(Number(e.target.value));
                      }}
                      className="w-full accent-indigo-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Średnia wartość zamówienia (PLN)
                      </label>
                      <span className="text-cyan-400 font-mono font-bold text-sm">{clientValue.toLocaleString()} zł</span>
                    </div>
                    <input 
                      type="range"
                      min="100"
                      max="5000"
                      step="50"
                      value={clientValue}
                      onChange={(e) => {
                        sound.playHover();
                        setClientValue(Number(e.target.value));
                      }}
                      className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </HoloCard3D>
          </FadeIn>

          <FadeIn delay={200}>
            <HoloCard3D intensity={12}>
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-8 rounded-3xl shadow-[0_0_40px_rgba(14,165,233,0.25)] border border-cyan-400/50 text-white backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                    ESTYMACJA ZYSKÓW 2030
                  </span>
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-xs font-mono text-slate-400 mb-1">Szacowany roczny zwrot (ROI)</p>
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-300">
                      {yearlyROI > 0 ? `+${yearlyROI.toFixed(0)}%` : '0%'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-mono mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Zaoszczędzone rbg</span>
                      </div>
                      <div className="text-2xl font-black text-white">
                        {(clients * timeSavedPerClientHours * 12).toLocaleString()} h
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono mb-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>Nowi klienci</span>
                      </div>
                      <div className="text-2xl font-black text-white">
                        +{(Math.round(clients * conversionIncreasePercent) * 12).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-mono text-slate-400 mb-1">Roczny dodatkowy zysk netto</p>
                    <div className="text-3xl font-black text-cyan-400">
                      {yearlyBenefit.toLocaleString('pl-PL')} PLN
                    </div>
                  </div>

                  {/* Visualizer Bar */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                      <span>Inwestycja: {budget.toLocaleString()} zł</span>
                      <span className="text-cyan-400 font-bold">Zwrot: {yearlyBenefit.toLocaleString()} zł</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(0,245,255,0.7)]"
                        style={{ width: `${Math.min(100, Math.max(10, (yearlyBenefit / (budget * 10)) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </HoloCard3D>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
