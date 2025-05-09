import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Practice, PracticeUpdate } from '../types/practice';
import { SERVICE_REQUIREMENTS } from '../config/serviceRequirements';

export const getPractices = async (userId: string): Promise<Practice[]> => {
  const practicesRef = collection(db, 'practices');
  const q = query(practicesRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Practice[];
};

export const getPractice = async (practiceId: string): Promise<Practice | null> => {
  const practiceRef = doc(db, 'practices', practiceId);
  const practiceSnap = await getDoc(practiceRef);
  
  if (practiceSnap.exists()) {
    return {
      id: practiceSnap.id,
      ...practiceSnap.data()
    } as Practice;
  }
  return null;
};

export const updatePractice = async (practiceId: string, updates: Partial<Practice>): Promise<void> => {
  try {
    const practiceRef = doc(db, 'practices', practiceId);
    await updateDoc(practiceRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating practice:', error);
    throw error;
  }
};

export const createPractice = async (practice: Omit<Practice, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const practiceRef = doc(collection(db, 'practices'));
    const newPractice: Practice = {
      ...practice,
      id: practiceRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
      progress: 0
    };
    await setDoc(practiceRef, newPractice);
    return practiceRef.id;
  } catch (error) {
    console.error('Error creating practice:', error);
    throw error;
  }
};

export const deletePractice = async (practiceId: string): Promise<void> => {
  const practiceRef = doc(db, 'practices', practiceId);
  await deleteDoc(practiceRef);
};

export const updatePracticePaymentStatus = async (practiceId: string, status: 'paid' | 'unpaid' | 'failed'): Promise<void> => {
  try {
    const practiceRef = doc(db, 'practices', practiceId);
    const updates: any = {
      paymentStatus: status,
      updatedAt: serverTimestamp()
    };

    // If payment is successful, move practice to ongoing status
    if (status === 'paid') {
      updates.status = 'ongoing';
    }

    await updateDoc(practiceRef, updates);
  } catch (error) {
    console.error('Error updating practice payment status:', error);
    throw error;
  }
};

export const sendPaymentReminder = async (practiceId: string): Promise<void> => {
  try {
    const practiceRef = doc(db, 'practices', practiceId);
    await updateDoc(practiceRef, {
      paymentReminderSent: true,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error sending payment reminder:', error);
    throw error;
  }
};

export const addDocumentToPractice = async (practiceId: string, document: any): Promise<void> => {
  try {
    const practiceRef = doc(db, 'practices', practiceId);
    await updateDoc(practiceRef, {
      documents: [...document],
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding document to practice:', error);
    throw error;
  }
}; 