export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  image?: string;
  userId?: string;
  practiceId?: string;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface PaymentStatus {
  status: 'success' | 'error' | 'pending';
  message?: string;
}

export interface ServiceStatus {
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
} 