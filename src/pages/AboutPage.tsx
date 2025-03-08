export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Who We Are
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-gray-500 sm:text-lg">
          Learn about our mission, values, and the team behind our success.
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-gray-500">
              We strive to deliver innovative solutions that empower businesses to thrive
              in the digital age. Our commitment to excellence and customer satisfaction
              drives everything we do.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
            <ul className="mt-4 space-y-4 text-gray-500">
              <li>• Innovation - We embrace new technologies and ideas</li>
              <li>• Integrity - We operate with honesty and transparency</li>
              <li>• Excellence - We strive for the highest quality in everything we do</li>
              <li>• Collaboration - We work together to achieve common goals</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">John Doe</h3>
              <p className="text-gray-500">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="CTO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Jane Smith</h3>
              <p className="text-gray-500">CTO</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="COO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Michael Johnson</h3>
              <p className="text-gray-500">COO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}