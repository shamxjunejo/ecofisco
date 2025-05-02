export interface Practice {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  documents: PracticeDocument[];
  notes: string;
  progress: number;
  estimatedCompletionDate?: string;
  lastUpdatedBy: string;
  paymentStatus: 'unpaid' | 'paid' | 'failed';
  paymentReminderSent: boolean;
  price?: number;
}

export interface PracticeDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  description?: string;
  optional?: boolean;
  uploaded?: boolean;
}

export interface PracticeUpdate {
  status?: Practice['status'];
  documents?: PracticeDocument[];
  notes?: string;
  progress?: number;
  estimatedCompletionDate?: string;
  lastUpdatedBy?: string;
  paymentStatus?: Practice['paymentStatus'];
  paymentReminderSent?: boolean;
} 