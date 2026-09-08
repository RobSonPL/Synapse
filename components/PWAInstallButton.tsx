import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-synapse-primary to-synapse-cyan text-slate-950 hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300 font-mono tracking-wide ${className}`}
        title="Zainstaluj aplikację na urządzeniu"
      >
        <Download className="w-3.5 h-3.5 animate-bounce" />
        <span>ZAINSTALUJ PWA</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-install-ios-btn"
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-synapse-primary/40 text-synapse-cyan bg-synapse-primary/10 hover:bg-synapse-primary/20 transition-all duration-300 font-mono tracking-wide ${className}`}
          title="Instalacja na iOS Safari"
        >
          <Smartphone className="w-3.5 h-3.5 text-synapse-cyan" />
          <span>INSTALUJ NA iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-synapse-cyan" />
                  Instalacja na iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-300 space-y-2 mb-5">
                <span className="block">1. Kliknij ikonę <strong>Udostępnij (Share)</strong> na pasku narzędzi Safari.</span>
                <span className="block">2. Przewiń listę w dół i wybierz <strong>Do ekranu początkowego</strong> (+).</span>
                <span className="block text-xs text-synapse-primary mt-2">Dzięki temu zyskasz natywne działanie w pełnym oknie i dostęp offline.</span>
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-sm font-medium text-white border border-slate-600 transition"
              >
                Rozumiem
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
