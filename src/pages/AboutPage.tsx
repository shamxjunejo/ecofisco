import { collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { addDoc } from "firebase/firestore";
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about E-Co Fisco, your trusted partner for immigration and tax services in Italy. Expert team dedicated to helping foreigners navigate Italian bureaucracy."
        keywords="about E-Co Fisco, Italian immigration experts, tax consultants Italy, immigration agency Italy, foreigner assistance Italy"
      />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700 sm:text-4xl">
            Meet Our Expert Team
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600 sm:text-lg">
            Specialists in Italian Immigration Law
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Us Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-justify leading-relaxed">
Growing up among many foreign kids, I was lucky enough to get to know cultures, thoughts, flavors and habits different from the Italian reality. But I also had the opportunity to see the absurd difficulties that a foreigner has to face to arrive in Italy and have the documents in order.
            </p>
            <p className="text-gray-600 text-justify leading-relaxed mt-4">
I can't stand injustice, so I decided to do my part to simplify the lives of foreigners who want to travel or move to Italy and those who are already here and fight every day with public administrations to avoid losing their right to residency.
            </p>
            <p className="text-gray-600 text-justify leading-relaxed mt-4">
Over the years I have had the pleasure of helping hundreds of people from all over the world and, thanks to the help of a team of prepared and courageous people, we have achieved great goals.
            </p>
            <p className="text-gray-600 text-justify leading-relaxed mt-4">
To accommodate our clients, the team has expanded to include lawyers for foreigners specialized in immigration law and native speakers of all major foreign languages, particularly experienced in this area.
            </p>
            <p className="text-gray-600 text-justify leading-relaxed mt-4">
Our goal is to see the smile and happiness of people when, after months of struggle and suffering, they finally manage to see their rights recognized and have their documents. Every day we work hard for this.
              </p>
            </div>

          {/* Values Section */}
          <div className="bg-gradient-to-l from-indigo-50 to-purple-50 rounded-2xl border border-gray-200 p-8 shadow-sm h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Values</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium text-gray-800">Integrity</h3>
                  <p className="mt-2 text-base text-gray-600">We uphold the highest ethical standards in all our dealings, ensuring transparency and honesty in every interaction.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium text-gray-800">Diversity</h3>
                  <p className="mt-2 text-base text-gray-600">We celebrate cultural differences and multilingual expertise, making our services accessible to clients from all backgrounds.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium text-gray-800">Efficiency</h3>
                  <p className="mt-2 text-base text-gray-600">We navigate complex bureaucracy with speed and precision, ensuring timely solutions for all immigration matters.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium text-gray-800">Tax & Immigration Expertise</h3>
                  <p className="mt-2 text-base text-gray-600">We provide comprehensive tax and immigration solutions, combining deep knowledge of Italian regulations with personalized guidance for each client.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium text-gray-800">Confidentiality</h3>
                  <p className="mt-2 text-base text-gray-600">We protect your personal information with the utmost care, maintaining strict privacy standards throughout our services.</p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-8">
              Our Leadership Team
            </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Team Member Card - Keeping the original design */}
            <div className="max-w-sm overflow-hidden border border-gray-300 rounded-lg shadow-md">
              {/* Blue Header Background */}
              <div className="bg-blue-500 h-24 relative">
                {/* Profile Image */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-white">
                    <img 
                      src="/path-to-profile-image.jpg" 
                      alt="Team Member" 
                    className="w-full h-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CBD5E0'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
                      }}
                  />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-12 pb-6 px-4 text-center">
                {/* Name and Title */}
                <h3 className="text-lg font-medium text-gray-700">Khadija Zouine</h3>
                <p className="text-sm text-gray-500">Immigration & Tax Consultant</p>
                
                {/* Social Media Icons */}
                <div className="flex justify-center mt-3 space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                    <span className="text-xs">f</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
                    <span className="text-xs">t</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
                    <span className="text-xs">in</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <span className="text-xs">wa</span>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition w-full">
                    Contact Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-transparent py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
              What our customers say
            </h2>

            <div className="flex justify-center items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-xl font-semibold text-gray-900">5.0</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Akiko Tanaka", location: "Tokyo, Japan", initials: "AT", review: "E-Co FISCO made my visa application process incredibly smooth. Their expertise and professional guidance helped me." },
                { name: "Carlos Silva", location: "São Paulo, Brazil", initials: "CS", review: "Outstanding service! They helped me obtain my work visa in record time. Very professional and knowledgeable team." },
                { name: "Maria Garcia", location: "Madrid, Spain", initials: "MG", review: "The team at E-Co FISCO was incredibly helpful throughout my citizenship application process. Highly recommended!" },
                { name: "John Smith", location: "London, UK", initials: "JS", review: "Excellent support for my residency permit application. Clear communication and great results." },
                { name: "Sophie Martin", location: "Paris, France", initials: "SM", review: "Their expertise in Italian immigration law is unmatched. Made the whole process stress-free." },
                { name: "Ahmed Hassan", location: "Cairo, Egypt", initials: "AH", review: "Very professional service. They handled my student visa application perfectly." },
                { name: "Li Wei", location: "Beijing, China", initials: "LW", review: "Great experience working with E-Co FISCO. They made the complex simple." },
                { name: "Anna Kowalski", location: "Warsaw, Poland", initials: "AK", review: "Fantastic support throughout my visa application. Would definitely recommend." }
              ].map((review, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-gray-200 relative min-h-[300px]">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-sm text-white font-semibold">{review.initials}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">{review.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 text-center">{review.location}</p>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm text-center pb-8">{review.review}</p>
                  <p className="text-sm text-gray-500 text-center absolute bottom-6 left-0 right-0">
                    {[
                      "3 months ago",
                      "9 months ago", 
                      "4 months ago",
                      "7 months ago",
                      "2 years ago",
                      "11 months ago",
                      "1 year ago",
                      "7 months ago"
                    ][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-blue-600 rounded-[40px] mx-4 mt-8 border border-gray-300 max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="bg-transparent p-8 rounded-[24px] contact-info-column text-center md:text-left flex flex-col items-start justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Contact a expert for foreigners</h2>
              <p className="text-sm sm:text-base text-white mb-6">Our agency for foreigners is at your disposal for the most daily practices up to the most complex cases.</p>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 md:rounded-tr-[39px] md:rounded-br-[39px] md:rounded-bl-[0px] rounded-br-[39px] rounded-bl-[39px]">

              <form className="space-y-4 p-8" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                try {
                  

                  await addDoc(collection(db, "contacts"), {
                    name: formData.get('name'),
                    surname: formData.get('surname'),
                    email: formData.get('email'),
                    location: formData.get('location'),
                    message: formData.get('message'),
                    date: new Date().toISOString(),
                    privacyAccepted: formData.get('privacy_accepted') === 'on'
                  });

                  const dialog = document.createElement('div');
                  dialog.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 max-w-sm w-full">
                <div class="flex justify-center mb-4">
                  <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-center mb-2">Message</h3>
                <p class="text-gray-600 text-center mb-6">Thanks for your submission!<br />We'll be in touch with you shortly.</p>
                <button class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  OK
                </button>
              </div>
            </div>
          `;
                  document.body.appendChild(dialog);
                  dialog.querySelector('button')!.onclick = () => {
                    dialog.remove();
                  };
                  form.reset();
                } catch (error) {
                  console.error("Error submitting form:", error);
                  const dialog = document.createElement('div');
                  dialog.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 max-w-sm w-full">
                <div class="flex justify-center mb-4">
                  <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-center mb-2">Message</h3>
                <p class="text-gray-600 text-center mb-6">Oops! There was a problem submitting your form</p>
                <button class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  OK
                </button>
              </div>
            </div>
          `;
                  document.body.appendChild(dialog);
                  dialog.querySelector('button')!.onclick = () => {
                    dialog.remove();
                  };
                }
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    required
                    className="p-3 border border-gray-300 rounded-[40px] w-full bg-gray-50 text-sm"
                  />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    required
                    className="p-3 border border-gray-300 rounded-[40px] w-full bg-gray-50 text-sm"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="E-mail*"
                  required
                  className="p-3 border border-gray-300 rounded-[40px] w-full bg-gray-50 text-sm"
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Where are you writing to us from?"
                  required
                  className="p-3 border border-gray-300 rounded-[40px] w-full bg-gray-50 text-sm"
                />

                <textarea
                  name="message"
                  placeholder="Message*"
                  required
                  rows={3}
                  className="p-3 border border-gray-300 rounded-[20px] w-full bg-gray-50 text-sm"
                ></textarea>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="privacy_accepted"
                    required
                    className="mt-1 mr-2"
                  />
                  <label className="text-xs sm:text-sm text-gray-600">
                    I confirm that I have read the <a href="#" className="text-blue-600 hover:underline">privacy policy</a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-[40px] hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
                >
                  SEND REQUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}