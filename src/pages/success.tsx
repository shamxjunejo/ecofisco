import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { handlePaymentSuccess } from '../services/stripe';
import SEO from '../components/SEO';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      handlePaymentSuccess(session_id as string);
    }
  }, [session_id]);

  return (
    <>
      <SEO 
        title="Payment Successful"
        description="Your payment has been processed successfully. Thank you for choosing our services."
        keywords="payment success, successful payment, service payment confirmation"
      />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Payment Successful!
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Thank you for your purchase. We'll be in touch shortly with your service details.
          </p>
          <div className="mt-8">
            <button
              onClick={() => router.push('/services')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Services
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 