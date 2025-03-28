import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Service prices in cents
export const SERVICE_PRICES = {
  VAT_MANAGEMENT: 9900, // €99.00
  TAX_DECLARATIONS: 14900, // €149.00
  IMMIGRATION_SERVICES: 19900, // €199.00
  INAIL_SERVICES: 7900, // €79.00
  INPS_SERVICES: 8900, // €89.00
  DIGITAL_IDENTITY: 6900, // €69.00
};

// Format price from cents to euros
export const formatPrice = (cents: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}; 