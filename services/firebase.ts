import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { enqueueOfflineLead } from '../utils/offlineSync';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId if provided
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Lead interface for CRM
export interface LeadRecord {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  source: 'contact_form' | 'quiz' | 'roi_calculator' | 'ebook_generator' | 'audit' | 'newsletter';
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  message?: string;
  selectedServices?: string;
  details?: Record<string, any> | string;
  createdAt: string;
  updatedAt?: string;
}

// Test connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is in offline mode.');
    }
  }
}
testFirestoreConnection();

/**
 * Save lead with automatic fallback to offline queue if client is offline or network fails
 */
export async function saveLead(leadData: Omit<LeadRecord, 'createdAt' | 'status'> & { status?: LeadRecord['status'] }): Promise<{ success: boolean; id?: string; offline?: boolean }> {
  const record: Omit<LeadRecord, 'id'> = {
    ...leadData,
    status: leadData.status || 'new',
    createdAt: new Date().toISOString(),
    details: typeof leadData.details === 'object' ? JSON.stringify(leadData.details) : leadData.details
  };

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    enqueueOfflineLead(record);
    return { success: true, offline: true };
  }

  try {
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, {
      ...record,
      serverTimestamp: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn('Direct Firestore save failed, saving to offline sync queue:', error);
    enqueueOfflineLead(record);
    return { success: true, offline: true };
  }
}

/**
 * Fetch all leads for the admin CRM dashboard
 */
export async function fetchAllLeads(): Promise<LeadRecord[]> {
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('createdAt', 'desc'), limit(100));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<LeadRecord, 'id'>)
    }));
  } catch (error) {
    console.error('Failed to fetch leads from Firestore:', error);
    return [];
  }
}

/**
 * Update lead status in CRM
 */
export async function updateLeadStatus(id: string, status: LeadRecord['status']): Promise<boolean> {
  try {
    const docRef = doc(db, 'leads', id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating lead status:', error);
    return false;
  }
}

/**
 * Delete lead from CRM
 */
export async function deleteLeadRecord(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'leads', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
}
