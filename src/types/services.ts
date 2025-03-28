export interface Service {
  id: string;
  name: string;
  price: number; // in cents
  description: string;
  features: string[];
  image?: string;
  stripePriceId?: string;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface PaymentStatus {
  status: 'success' | 'error' | 'pending';
  message?: string;
} 