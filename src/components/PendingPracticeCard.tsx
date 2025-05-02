import { useState } from 'react';
import { Practice, PracticeDocument } from '../types/practice';
import { createCheckoutSession } from '../services/stripe';
import { stripePromise } from '../config/stripe';
import { toast } from 'react-hot-toast';
import { 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Download,
  Trash2,
  Plus
} from 'lucide-react';

interface PendingPracticeCardProps {
  practice: Practice;
  onPaymentSuccess: () => void;
}

export default function PendingPracticeCard({ practice, onPaymentSuccess }: PendingPracticeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<PracticeDocument | null>(null);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const { sessionId } = await createCheckoutSession({
        id: practice.serviceId,
        name: practice.serviceName,
        price: practice.price || 0,
        userId: practice.userId,
        practiceId: practice.id
      });

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          toast.error('Failed to initiate payment. Please try again.');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">{practice.serviceName}</h3>
            <p className="text-blue-100 mt-1">Added on {new Date(practice.createdAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-blue-100 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Payment Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                practice.paymentStatus === 'paid' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-700">Payment Status</p>
                <p className={`text-sm ${
                  practice.paymentStatus === 'paid' 
                    ? 'text-green-600' 
                    : 'text-yellow-600'
                }`}>
                  {practice.paymentStatus === 'paid' ? 'Payment Completed' : 'Payment Pending'}
                </p>
              </div>
            </div>
            {practice.paymentStatus !== 'paid' && (
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isProcessing 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Complete Payment
                  </>
                )}
              </button>
            )}
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">Required Documents</h4>
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Upload Document</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label>
            </div>

            <div className="space-y-3">
              {practice.documents?.map((doc, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      {doc.description && (
                        <p className="text-sm text-gray-500">{doc.description}</p>
                      )}
                      {doc.optional && (
                        <span className="text-xs text-blue-500">(Optional)</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.uploaded ? (
                      <>
                        {getStatusIcon(doc.status)}
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{practice.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${practice.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 