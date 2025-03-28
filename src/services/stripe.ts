import { Service, CheckoutSession } from '../types/services';

export const createCheckoutSession = async (service: Service): Promise<CheckoutSession> => {
  try {
    const response = await fetch('http://localhost:3000/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId: service.id,
        price: service.price,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const handlePaymentSuccess = async (sessionId: string): Promise<void> => {
  try {
    await fetch('http://localhost:3000/api/payment-success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}; 