export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-700 sm:text-4xl">
        Meet our expert for foreigners
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-gray-500 sm:text-lg">
        Meet the Immigration Law Specialist
        </p>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          {/* Mission */}
          <p className="mt-4 text-gray-500 text-center">
            Growing up among many foreign kids, I was lucky enough to get to know cultures, thoughts, flavors and habits different from the Italian reality. But I also had the opportunity to see the absurd difficulties that a foreigner has to face to arrive in Italy and have the documents in order.

I can't stand injustice, so I decided to do my part to simplify the lives of foreigners who want to travel or move to Italy and those who are already here and fight every day with public administrations to avoid losing their right to residency.

Over the years I have had the pleasure of helping hundreds of people from all over the world and, thanks to the help of a team of prepared and courageous people, we have achieved great goals.

To accommodate our clients, the team has expanded to include lawyers for foreigners specialized in immigration law and native speakers of all major foreign languages, particularly experienced in this area.

Our goal is to see the smile and happiness of people when, after months of struggle and suffering, they finally manage to see their rights recognized and have their documents. Every day we work hard for this.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Leadership Team
          </h2>
          <div className="flex justify-center ">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-sm ">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <svg className="h-24 w-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Khadija Zouine</h3>
              <p className="text-gray-500">Immigration & Tax Consultant</p>
            </div>
          </div>
        </div>
      </div>
    
  );
}