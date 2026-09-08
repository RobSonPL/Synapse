// Offline Queue & Background Sync Manager
export interface OfflineLeadItem {
  id: string;
  data: Record<string, any>;
  timestamp: number;
}

const STORAGE_KEY = 'synapse_offline_leads_queue';

export function getOfflineLeads(): OfflineLeadItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function enqueueOfflineLead(leadData: Record<string, any>) {
  try {
    const queue = getOfflineLeads();
    const item: OfflineLeadItem = {
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      data: leadData,
      timestamp: Date.now()
    };
    queue.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    console.log('[OfflineSync] Lead queued for sync:', item.id);
  } catch (e) {
    console.error('[OfflineSync] Failed to queue offline lead:', e);
  }
}

export async function flushOfflineQueue(
  onSuccess?: (syncedCount: number) => void
): Promise<number> {
  const queue = getOfflineLeads();
  if (queue.length === 0) return 0;

  // Import Firestore dynamically to prevent cycle
  const { db } = await import('../services/firebase');
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

  let successCount = 0;
  const remaining: OfflineLeadItem[] = [];

  for (const item of queue) {
    try {
      await addDoc(collection(db, 'leads'), {
        ...item.data,
        syncedFromOffline: true,
        offlineCreatedAt: new Date(item.timestamp).toISOString(),
        serverTimestamp: serverTimestamp()
      });
      successCount++;
    } catch (err) {
      console.warn('[OfflineSync] Could not flush item, keeping in queue:', err);
      remaining.push(item);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));

  if (successCount > 0) {
    console.log(`[OfflineSync] Successfully synced ${successCount} offline leads.`);
    if (onSuccess) onSuccess(successCount);
    window.dispatchEvent(
      new CustomEvent('synapse:offline-synced', { detail: { count: successCount } })
    );
  }

  return successCount;
}

// Auto-sync listener on window 'online'
export function initOfflineSyncListener() {
  if (typeof window === 'undefined') return;

  const handleOnline = () => {
    console.log('[OfflineSync] Network restored, attempting sync...');
    flushOfflineQueue();
  };

  window.addEventListener('online', handleOnline);

  // Initial check on load if already online
  if (navigator.onLine) {
    setTimeout(() => flushOfflineQueue(), 2000);
  }

  return () => {
    window.removeEventListener('online', handleOnline);
  };
}

// Web Push / Notification Helper
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('Notifications not supported in this browser.');
    return 'denied';
  }
  return await Notification.requestPermission();
}

export function showPWAWelcomeNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Synapse Creative AI', {
      body: 'Dziękujemy! Otrzymasz powiadomienia o nowych case studies i automatyzacjach.',
      icon: '/pwa-192x192.png',
      badge: '/icon.svg'
    });
  }
}
