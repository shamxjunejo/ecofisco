import type { NextApiRequest, NextApiResponse } from 'next/types';
import { buffer } from 'micro';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature']!;
  const buf = await buffer(req);

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful payment
        await handleSuccessfulPayment(session);
        break;
      case 'payment_intent.payment_failed':
        // Handle failed payment
        await handleFailedPayment(event.data.object as Stripe.PaymentIntent);
        break;
    }

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  // Here you would typically:
  // 1. Update your database with the payment information
  // 2. Send confirmation emails
  // 3. Update order status
  console.log('Payment successful:', session.id);
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  // Here you would typically:
  // 1. Update your database with the failed payment
  // 2. Send notification to the customer
  // 3. Update order status
  console.log('Payment failed:', paymentIntent.id);
} 