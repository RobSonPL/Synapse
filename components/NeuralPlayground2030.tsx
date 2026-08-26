import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { Cpu, Zap, Activity, ShieldCheck, Sparkles, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AIModule {
  id: string;
  name: string;
  category: string;
  latency: string;
  throughput: string;
  desc: string;
  features: string[];
  metrics: { label: string; value: string };
}

const aiModules: AIModule[] = [
  {
    id: 'ebook-synth',
    name: 'Neural E-Book Synthesis 2030',
    category: 'DIGITAL PUBLISHING',
    latency: '0.4s',
    throughput: '128k t/s',
    desc: 'Błyskawiczne generowanie kompletnych publikacji, e-booków i konspektów z zachowaniem unikalnego głosu autora i głębokiej psychologii sprzedaży.',
    features: ['Generowanie struktury 10 rozdziałów', 'Integracja psychologii perswazji', 'Automatyczny skład DTP & Typografia 2030'],
    metrics: { label: 'Czas przygotowania publikacji', value: '48h zamiast 3 miesięcy' },
  },
  {
    id: 'story-ai',
    name: 'Quantum Storytelling Engine',
    category: 'MARKETING & PSYCHOLOGY',
    latency: '0.2s',
    throughput: '256k t/s',
    desc: 'Architektura narracyjna budująca magnetyczne historie marek, które hipnotyzują odbiorcę i zwielokrotniają zaangażowanie.',
    features: ['Storytelling oparty na archetypach', 'Wielokanałowy copywriting', 'Optymalizacja pod kątem konwersji +180%'],
    metrics: { label: 'Średni wzrost zaangażowania', value: '+320% ROI' },
  },
  {
    id: 'agent-web',
    name: 'Autonomous Web 3D Experience',
    category: 'SPATIAL WEB ARCHITECTURE',
    latency: '0.1s',
    throughput: '1M t/s',
    desc: 'Strony www nowej ery z trójwymiarową przestrzenią, reaktywnym dźwiękiem proceduralnym i płynną interakcją w czasie rzeczywistym.',
    features: ['3D WebGL / Three.js Canvas', 'Adaptacyjny design 2030', 'Superszybki czas ładowania < 0.8s'],
    metrics: { label: 'Współczynnik natychmiastowego WOW', value: '10/10' },
  },
  {
    id: 'neuro-agent',
    name: 'Cognitive Business Synapse',
    category: 'AUTONOMOUS WORKFLOWS',
    latency: '0.3s',
    throughput: '512k t/s',
    desc: 'Automatyzacja procesów biznesowych od zapytań ofertowych, przez onboarding klienta, aż po inteligentną analitykę sprzedaży.',
    features: ['Autonomiczne agenty AI', 'Integracja z CRM i bazami danych', 'Automatyczna redukcja kosztów operacyjnych'],
    metrics: { label: 'Oszczędność czasu zespołu', value: '25+ h/tydzień' },
  },
];

export const NeuralPlayground2030: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<AIModule>(aiModules[0]);
  const [acceleration, setAcceleration] = useState<number>(45);
  const [fidelity, setFidelity] = useState<number>(98);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [synapseLog, setSynapseLog] = useState<string[]>([
    '⚡ [2030-INIT] Quantum core synchronized.',
    '🧠 [SYNAPSE-v4] Neural weights loaded into WebGL memory.',
    '🌐 [SPATIAL-HUD] Ready for quantum task dispatch.'
  ]);

  const handleSelectModule = (mod: AIModule) => {
    sound.playClick();
    setSelectedModule(mod);
    setSynapseLog(prev => [
      `🔄 [SWITCH] Active pipeline: ${mod.name}`,
      `⚙️ [THROUGHPUT] Calibrated at ${mod.throughput} | Latency: ${mod.latency}`,
      ...prev.slice(0, 3)
    ]);
  };

  const handleRunSimulation = () => {
    sound.playQuantum();
    setIsProcessing(true);
    setSynapseLog(prev => [
      `🚀 [DISPATCH] Executing ${selectedModule.name} at ${acceleration}x acceleration...`,
      `🧬 [COMPUTE] Fidelity: ${fidelity}% | Synaptic paths activated: 1,024`,
      ...prev.slice(0, 3)
    ]);

    setTimeout(() => {
      setIsProcessing(false);
      setSynapseLog(prev => [
        `✅ [SUCCESS] Output synthesized in ${(0.3 / (acceleration / 20)).toFixed(2)}s with 99.9% accuracy!`,
        ...prev.slice(0, 3)
      ]);
    }, 900);
  };

  return (
    <section id="quantum-lab" className="py-28 relative overflow-hidden bg-slate-900/90 text-white border-y border-cyan-500/20">
      {/* Background glowing plasma orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Futuristic Section Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Synapse Quantum Lab 2030</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Architektura AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                Przyszłości Już Dziś
              </span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              Przetestuj interaktywnie możliwości naszych silników nowej generacji. Połączyliśmy zaawansowaną sztuczną inteligencję z psychologią i designem 3D.
            </p>
          </div>
        </FadeIn>

        {/* 2030 Interactive Matrix Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Module Selector (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Wybierz Moduł Kwantowy</span>
            </div>

            {aiModules.map((mod) => {
              const isSelected = selectedModule.id === mod.id;
              return (
                <HoloCard3D key={mod.id} intensity={8}>
                  <div
                    onClick={() => handleSelectModule(mod)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-xl ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-500/20 via-slate-800 to-indigo-950/40 border-cyan-400 shadow-[0_0_30px_rgba(14,165,233,0.3)]'
                        : 'bg-slate-800/40 border-white/10 hover:border-cyan-500/40 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                        {mod.category}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <span>⚡ {mod.latency}</span>
                        <span>•</span>
                        <span>{mod.throughput}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-white mb-2">{mod.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{mod.desc}</p>
                  </div>
                </HoloCard3D>
              );
            })}
          </div>

          {/* Module Control Station (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <HoloCard3D intensity={6}>
              <div className="p-8 rounded-3xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                
                {/* Holographic Header Bar */}
                <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block mb-1">
                      AKTYWNY SILNIK SYNAPTYCZNY
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                      {selectedModule.name}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-pulse text-cyan-400" />
                    <span>STATUS: 2030 READY</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {selectedModule.desc}
                </p>

                {/* Key Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {selectedModule.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Sliders */}
                <div className="space-y-6 mb-8 p-6 rounded-2xl bg-slate-900/60 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Przyspieszenie AI (Multiplier)
                    </span>
                    <span className="font-bold text-white text-sm">{acceleration}x</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={acceleration}
                    onChange={(e) => setAcceleration(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                    <span className="flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      Wierność Neurologiczna (Fidelity)
                    </span>
                    <span className="font-bold text-white text-sm">{fidelity}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="100"
                    value={fidelity}
                    onChange={(e) => setFidelity(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Real-time Metric Highlight */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/40 mb-8 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block">
                      {selectedModule.metrics.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-black text-white">
                      {selectedModule.metrics.value}
                    </span>
                  </div>

                  <button
                    onClick={handleRunSimulation}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(14,165,233,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin" />
                        <span>Kwantowanie...</span>
                      </>
                    ) : (
                      <>
                        <span>Uruchom Silnik</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Real-time Cyber Console Output */}
                <div className="p-4 rounded-xl bg-black/80 border border-cyan-500/20 font-mono text-[11px] text-cyan-300/90 space-y-1.5">
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 pb-1 border-b border-white/10 flex items-center justify-between">
                    <span>LIVE QUANTUM TELEMETRY STREAM</span>
                    <span className="text-emerald-400">● ACTIVE</span>
                  </div>
                  {synapseLog.map((log, i) => (
                    <div key={i} className="leading-tight truncate">
                      {log}
                    </div>
                  ))}
                </div>

              </div>
            </HoloCard3D>
          </div>

        </div>

      </div>
    </section>
  );
};
