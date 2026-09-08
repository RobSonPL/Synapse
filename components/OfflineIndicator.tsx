import React, { useState, useEffect } from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { 
  WifiOff, 
  Wifi, 
  CheckCircle2, 
  Bell, 
  Download, 
  X,
  Sparkles
} from 'lucide-react';
import { 
  getOfflineLeads, 
  initOfflineSyncListener, 
  requestNotificationPermission, 
  showPWAWelcomeNotification 
} from '../utils/offlineSync';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [offlineCount, setOfflineCount] = useState(0);
  const [syncToast, setSyncToast] = useState<string | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [notificationsAllowed, setNotificationsAllowed] = useState(false);

  useEffect(() => {
    // Start background sync listener
    const cleanup = initOfflineSyncListener();

    // Check offline items count
    const updateQueueCount = () => {
      setOfflineCount(getOfflineLeads().length);
    };
    updateQueueCount();

    // Listen for sync event
    const handleSyncEvent = (e: any) => {
      const count = e.detail?.count || 1;
      setSyncToast(`Zsynchronizowano ${count} zaległe zgłoszenie(a) z bazą Firestore.`);
      updateQueueCount();
      setTimeout(() => setSyncToast(null), 5000);
    };

    window.addEventListener('synapse:offline-synced', handleSyncEvent);

    // PWA Install prompt capture
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Notification permission status check
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationsAllowed(Notification.permission === 'granted');
    }

    return () => {
      cleanup?.();
      window.removeEventListener('synapse:offline-synced', handleSyncEvent);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setInstallPrompt(null);
  };

  const handleEnablePush = async () => {
    const perm = await requestNotificationPermission();
    if (perm === 'granted') {
      setNotificationsAllowed(true);
      showPWAWelcomeNotification();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-auto">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div
          id="offline-banner"
          className="flex items-center gap-2.5 rounded-2xl bg-amber-500/95 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-2xl border border-amber-300/40"
        >
          <WifiOff className="w-4 h-4 text-slate-950 flex-shrink-0" />
          <div>
            <p>Tryb offline — PWA działa z pamięci podręcznej.</p>
            {offlineCount > 0 && (
              <p className="text-[11px] font-normal opacity-90">
                W kolejce lokalnej: {offlineCount} zgłoszeń do wysłania.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Sync Success Toast */}
      {syncToast && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-500/95 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white shadow-2xl border border-emerald-300/40 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="flex items-center gap-3 rounded-2xl bg-slate-900/95 backdrop-blur-md p-3 text-xs text-white shadow-2xl border border-cyan-500/40">
          <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-100">Zainstaluj Synapse AI</p>
            <p className="text-[11px] text-slate-400">Dostęp z pulpitu z pełną obsługą offline</p>
          </div>
          <button
            onClick={handleInstallClick}
            className="ml-2 px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition"
          >
            Zainstaluj
          </button>
          <button
            onClick={() => setShowInstallBanner(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Notification Opt-In Prompt (if supported and default) */}
      {'Notification' in window && !notificationsAllowed && Notification.permission === 'default' && (
        <div className="hidden sm:flex items-center gap-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md px-3.5 py-2 text-[11px] text-slate-300 shadow-xl border border-white/10 hover:border-cyan-400/40 transition">
          <Bell className="w-3.5 h-3.5 text-cyan-400" />
          <span>Powiadomienia o nowych case studies i wpisach:</span>
          <button
            onClick={handleEnablePush}
            className="font-bold text-cyan-400 hover:text-cyan-300 underline"
          >
            Włącz
          </button>
        </div>
      )}
    </div>
  );
};
