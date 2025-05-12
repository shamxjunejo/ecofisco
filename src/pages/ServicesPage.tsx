import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import SEO from '../components/SEO';
import { Service } from '../types/services';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { createPractice } from '../services/practice';
import { toast } from 'react-hot-toast';

export default function ServicesPage() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [expandedServices, setExpandedServices] = useState<{ [key: string]: boolean }>({});
  const VISIBLE_FEATURES = 3;

  const handleAddService = async (service: Service) => {
    try {
      // Check if user is authenticated
      if (!user) {
        // Store the service ID in session storage to redirect back after signup
        sessionStorage.setItem('pendingService', service.id);
        navigate('/register', { state: { message: 'Please sign up to add this service.' } });
        return;
      }

      setLoadingStates(prev => ({ ...prev, [service.id]: true }));

      const now = new Date().toISOString();
      
      // Create practice with all required fields
      const practiceId = await createPractice({
        userId: user.uid,
        serviceId: service.id,
        serviceName: service.name,
        status: 'pending',
        documents: [],
        paymentStatus: 'unpaid',
        paymentReminderSent: false,
        progress: 0,
        lastUpdatedBy: user.uid,
        createdAt: now,
        updatedAt: now
      });
      
      console.log('Practice created with ID:', practiceId);

      toast.success('Service added to your dashboard!');
      navigate('/dashboard?tab=pending');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service. Please try again.');
      setLoadingStates(prev => ({ ...prev, [service.id]: false }));
    }
  };

  const toggleFeatures = (serviceId: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const services: Service[] = [
    {
      id: 'vat_management',
      name: 'VAT Management',
      description: 'Opening, modification & closure assistance for traders, artisans, and freelancers.',
      features: [
        'VAT number registration',
        'VAT compliance',
        'VAT returns filing',
        'VAT number modification',
        'VAT number closure'
      ],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'tax_declarations',
      name: 'Tax Declarations',
      description: 'Expert assistance with Single Model PF and 730 Tax Declarations.',
      features: [
        'Single Model PF preparation',
        '730 Tax Declaration',
        'Tax optimization',
        'Document review',
        'Filing assistance'
      ],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'immigration_services',
      name: 'Immigration Services',
      description: 'Complete support for residence permits, citizenship, and family reunification.',
      features: [
        'Residence permit applications',
        'Citizenship applications',
        'Family reunification',
        'Document translation',
        'Legal consultation'
      ],
      image: 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'inail_services',
      name: 'INAIL Services',
      description: 'Complete management of work insurance and safety compliance.',
      features: [
        'Work insurance registration',
        'Safety compliance',
        'Risk assessment',
        'Insurance claims',
        'Compliance monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'inps_services',
      name: 'INPS Services',
      description: 'Comprehensive social security and benefits management.',
      features: [
        'Social security registration',
        'Benefits calculation',
        'Pension planning',
        'Document management',
        'Claims assistance'
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'digital_identity',
      name: 'Digital Identity',
      description: 'Setup and management of PEC and SPID digital identity services.',
      features: [
        'PEC setup',
        'SPID registration',
        'Digital signature',
        'Identity verification',
        'Technical support'
      ],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <>
      <SEO 
        title="Our Services"
        description="Comprehensive immigration and tax services for foreigners in Italy. Expert assistance with visas, permits, citizenship, and tax consulting."
        keywords="immigration services Italy, tax services Italy, visa assistance, residence permit Italy, citizenship application, tax consultant foreigners"
      />
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-600 sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive professional services to support your business and personal needs in Italy.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-300 hover:shadow-xl transition-all duration-300"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      hoveredService === service.id 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-700' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                      <p className="text-white/90 text-sm max-w-xs">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {service.features.slice(0, expandedServices[service.id] ? undefined : VISIBLE_FEATURES).map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > VISIBLE_FEATURES && (
                        <button
                          onClick={() => toggleFeatures(service.id)}
                          className="flex items-center text-blue-600 text-sm hover:text-blue-800 transition-colors"
                        >
                          {expandedServices[service.id] ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              +{service.features.length - VISIBLE_FEATURES} more features
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddService(service)}
                      disabled={loadingStates[service.id]}
                      className={`w-full bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 ${
                        loadingStates[service.id] ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loadingStates[service.id] ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Add to Dashboard'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}