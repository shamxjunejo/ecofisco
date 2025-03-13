import SEO from '../components/SEO';

export default function ServicesPage() {
  return (
    <>
      <SEO 
        title="Our Services"
        description="Comprehensive immigration and tax services for foreigners in Italy. Expert assistance with visas, permits, citizenship, and tax consulting."
        keywords="immigration services Italy, tax services Italy, visa assistance, residence permit Italy, citizenship application, tax consultant foreigners"
      />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-600 sm:text-4xl">
            Our Services
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-gray-500 sm:text-lg">
            Comprehensive professional services to support your business and personal needs.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* VAT Management */}
            <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
                  alt="VAT Management"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">VAT Management</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Opening, modification & closure assistance for traders, artisans, and freelancers.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Tax Declarations */}
            <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
                  alt="Tax Declarations"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tax Declarations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Expert assistance with Single Model PF and 730 Tax Declarations.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Immigration Services */}
            <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=800"
                  alt="Immigration Services"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Immigration Services</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Complete support for residence permits, citizenship, and family reunification.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* INAIL Services */}
            <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
                  alt="INAIL Services"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">INAIL Services</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Complete management of work insurance and safety compliance.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* INPS Services */}
            <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
                  alt="INPS Services"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">INPS Services</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive social security and benefits management.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Digital Identity */}
            <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
                  alt="Digital Identity"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Identity</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Setup and management of PEC and SPID digital identity services.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}