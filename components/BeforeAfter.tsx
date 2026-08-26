import React, { useState, useRef, useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { HoloCard3D } from './HoloCard3D';
import { sound } from '../utils/soundFX';
import { Sparkles } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-28 bg-slate-900/70 border-y border-cyan-500/15 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KWANTOWA TRANSFORMACJA CYFROWA</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Zobacz <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">Różnicę 2030</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            Przed i po wdrożeniu naszych rozwiązań AI. Od powolnego, generycznego serwisu do futurystycznej, wysoko konwertującej platformy nowej ery.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <HoloCard3D intensity={6} className="max-w-4xl mx-auto">
            <div 
              ref={containerRef}
              className="relative w-full h-[340px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-cyan-500/30 select-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => {
                sound.playHover();
                setIsDragging(true);
              }}
              onTouchStart={() => {
                sound.playHover();
                setIsDragging(true);
              }}
            >
              {/* After (Bottom Layer - 2030 Synapse Optimized) */}
              <div className="absolute inset-0 bg-slate-950 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
                <div className="relative text-left w-full h-full flex flex-col justify-end">
                  <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/50 w-max shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">SYNAPSE 2030 OS</span>
                    <h3 className="text-white text-2xl font-black mb-3">Po (Architektura 2030)</h3>
                    <ul className="text-cyan-200/90 space-y-1.5 text-xs font-mono">
                      <li>⚡ Błyskawiczny czas reakcji: 0.4s</li>
                      <li>🚀 Wzrost konwersji: +180%</li>
                      <li>🤖 100% Autonomiczne procesy AI</li>
                      <li>🔮 Storytelling hipnotyzujący odbiorcę</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Before (Top Layer, Clipped) */}
              <div 
                className="absolute inset-0 bg-slate-800 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative text-left w-full h-full flex flex-col justify-end">
                  <div className="bg-slate-900/90 p-6 rounded-2xl border border-rose-500/40 w-max">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 block mb-1">LEGACY WEB</span>
                    <h3 className="text-white text-2xl font-bold mb-3">Przed (Przestarzałe)</h3>
                    <ul className="text-slate-300 space-y-1.5 text-xs font-mono">
                      <li>❌ Długi czas ładowania: 5.2s+</li>
                      <li>❌ Niska konwersja: &lt; 1%</li>
                      <li>❌ Brak automatyzacji & powtarzalna praca</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Slider Line */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-white to-purple-500 cursor-ew-resize shadow-[0_0_20px_rgba(0,245,255,0.9)] z-10"
                style={{ left: `calc(${sliderPosition}% - 1px)` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,245,255,0.8)] border-2 border-cyan-400 text-cyan-300">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 border-l-2 border-b-2 border-current transform rotate-45"></div>
                    <div className="w-1.5 h-1.5 border-r-2 border-t-2 border-current transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </HoloCard3D>
        </FadeIn>
      </div>
    </section>
  );
};
