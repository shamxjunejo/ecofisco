import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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

export const updatePractice = async (practiceId: string, updates: PracticeUpdate): Promise<void> => {
  const practiceRef = doc(db, 'practices', practiceId);
  await updateDoc(practiceRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

export const createPractice = async (userId: string, serviceId: string): Promise<string> => {
  try {
    const service = SERVICE_REQUIREMENTS[serviceId];
    if (!service) {
      throw new Error('Invalid service ID');
    }

    const practiceData = {
      userId,
      serviceId,
      serviceName: service.title,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      documents: [],
      notes: '',
      progress: 0,
      lastUpdatedBy: userId,
      paymentStatus: 'unpaid',
      paymentReminderSent: false
    };

    const docRef = await addDoc(collection(db, 'practices'), practiceData);
    return docRef.id;
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