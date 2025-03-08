export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Official Guides
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-gray-500 sm:text-lg">
          Comprehensive resources to help you get the most out of our services.
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {/* Guide 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900">Getting Started Guide</h3>
              <p className="mt-2 text-gray-500">
                Everything you need to know to get started with our services.
              </p>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Read more →
                </a>
              </div>
            </div>
          </div>

          {/* Guide 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900">Best Practices</h3>
              <p className="mt-2 text-gray-500">
                Learn about industry best practices and how to implement them effectively.
              </p>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Read more →
                </a>
              </div>
            </div>
          </div>

          {/* Guide 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900">API Documentation</h3>
              <p className="mt-2 text-gray-500">
                Detailed documentation for integrating with our APIs and services.
              </p>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Read more →
                </a>
              </div>
            </div>
          </div>

          {/* Guide 4 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900">Troubleshooting Guide</h3>
              <p className="mt-2 text-gray-500">
                Solutions to common issues and how to resolve them quickly.
              </p>
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Read more →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}