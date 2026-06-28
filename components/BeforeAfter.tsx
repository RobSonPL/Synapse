import React, { useState, useRef, useEffect } from 'react';
import { FadeIn } from './FadeIn';

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
    <section className="py-24 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Zobacz <span className="text-transparent bg-clip-text bg-gradient-to-r from-synapse-primary to-synapse-accent">Różnicę</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Przed i po wdrożeniu naszych rozwiązań. Od przestarzałego designu do nowoczesnej, wysoko konwertującej platformy.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div 
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize shadow-2xl select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* After (Bottom Layer) */}
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-synapse-primary/80 to-slate-900/40"></div>
              <div className="relative text-left w-full h-full flex flex-col justify-end">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-max">
                  <h3 className="text-white text-2xl font-bold mb-2">Po (Zoptymalizowane)</h3>
                  <ul className="text-white/90 space-y-2 text-sm">
                    <li>✓ Szybkość ładowania 0.8s</li>
                    <li>✓ Konwersja +140%</li>
                    <li>✓ Automatyczna obsługa</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Before (Top Layer, Clipped) */}
            <div 
              className="absolute inset-0 bg-slate-200 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative text-left w-full h-full flex flex-col justify-end">
                <div className="bg-white/90 p-6 rounded-2xl border border-slate-300 w-max">
                  <h3 className="text-slate-900 text-2xl font-bold mb-2">Przed</h3>
                  <ul className="text-slate-600 space-y-2 text-sm">
                    <li>❌ Długi czas ładowania (5s+)</li>
                    <li>❌ Niska konwersja (1%)</li>
                    <li>❌ Przestarzały design</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-synapse-primary text-synapse-primary">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 border-l-2 border-b-2 border-current transform rotate-45"></div>
                  <div className="w-1.5 h-1.5 border-r-2 border-t-2 border-current transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
