import React, { useState } from 'react';
import { FadeIn } from './FadeIn';

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
    <section id="roi-calculator" className="py-24 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Kalkulator <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent">ROI z Automatyzacji AI</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
              Sprawdź, ile czasu i pieniędzy możesz zaoszczędzić, wdrażając inteligentne automatyzacje w swoim biznesie.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <FadeIn delay={100}>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-white/10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Twoje dane</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                    Szacowany budżet na AI (PLN)
                  </label>
                  <input 
                    type="number" 
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                    Obecna liczba klientów (miesięcznie)
                  </label>
                  <input 
                    type="number" 
                    value={clients}
                    onChange={(e) => setClients(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                    Średnia wartość klienta (PLN)
                  </label>
                  <input 
                    type="number" 
                    value={clientValue}
                    onChange={(e) => setClientValue(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-gradient-to-br from-synapse-primary to-synapse-accent p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-8 opacity-90">Szacowane roczne korzyści</h3>
              
              <div className="space-y-6">
                <div className="border-b border-white/20 pb-4">
                  <p className="text-sm opacity-80 mb-1">Założony roczny zwrot z inwestycji (ROI)</p>
                  <div className="text-4xl font-black">
                    {yearlyROI > 0 ? yearlyROI.toFixed(0) : 0}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Zaoczone godziny (rocznie)</p>
                    <div className="text-2xl font-bold">
                      {(clients * timeSavedPerClientHours * 12).toLocaleString()} h
                    </div>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 mb-1">Nowi klienci (rocznie)</p>
                    <div className="text-2xl font-bold">
                      {(Math.round(clients * conversionIncreasePercent) * 12).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-white/20">
                  <p className="text-sm opacity-80 mb-1">Potencjalny dodatkowy zysk (rocznie)</p>
                  <div className="text-3xl font-extrabold">
                    {yearlyBenefit.toLocaleString('pl-PL')} PLN
                  </div>
                </div>
              </div>
              
              <p className="text-xs opacity-60 mt-8 leading-tight">
                * Kalkulacja ma charakter poglądowy. Zakłada oszczędność 2 godzin pracy na klienta oraz wzrost konwersji o 20% dzięki szybszej obsłudze i lepszemu doświadczeniu użytkownika.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
