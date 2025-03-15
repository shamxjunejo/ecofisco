import { useState } from 'react';
import guideImage from "../assets/guide.jpg";
import SEO from '../components/SEO';
import '../styles/flip-card.css';

export default function ResidencePermitPage() {
  return (
    <>
      <SEO 
        title="Residence Permit Application"
        description="Professional assistance with residence permit applications in Italy - document collection, verification, and submission services."
        keywords="residence permit Italy, permesso di soggiorno, Italian residence permit application, immigration services Italy"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <img 
              src={guideImage} 
              alt="Residence Permit Application" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Residence Permit Application Service</h1>
              <h3 className="mt-3 text-xl text-white">Expert guidance through your Italian residence permit application process</h3>
            </div>
          </div>

          {/* Service Cards Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 rounded-[40px] mb-12 border border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                
                {/* Card 1 - Consultancy */}
                <div className="p-4 rounded-[24px]">
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 mb-2 text-blue-400" viewBox="0 0 384 512" fill="currentColor">
                      <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-1">
                      Consultancy on residence permit application
                    </h3>
                    <p className="text-gray-700 mb-4 font-poppins text-center">
                      SH Immigration Specialists is much more than an immigration agency. We are a team of professionals, including experts and lawyers for foreigners at your disposal to find the best solution and obtain the residence permit that is right for you.
                    </p>
                  </div>
                </div>

                {/* Card 2 - Document Collection */}
                <div className="p-4 rounded-[24px]">
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 mb-2 text-blue-400" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M139.61 35.5a12 12 0 0 0-17 0L58.93 98.81l-22.7-22.12a12 12 0 0 0-17 0L3.53 92.41a12 12 0 0 0 0 17l47.59 47.4a12.78 12.78 0 0 0 17.61 0l15.59-15.62L156.52 69a12.09 12.09 0 0 0 .09-17zm0 159.19a12 12 0 0 0-17 0l-63.68 63.72-22.7-22.1a12 12 0 0 0-17 0L3.53 252a12 12 0 0 0 0 17L51 316.5a12.77 12.77 0 0 0 17.6 0l15.7-15.69 72.2-72.22a12 12 0 0 0 .09-16.9zM64 368c-26.49 0-48.59 21.5-48.59 48S37.53 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-1">
                      Collection of documents for residence permit application
                    </h3>
                    <p className="text-gray-700 mb-4 font-poppins text-center">
                      We help you collect documents and verify requirements to apply for your first residence permit.
                    </p>
                  </div>
                </div>

                {/* Card 3 - Application Submission */}
                <div className="p-4 rounded-[24px]">
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 mb-2 text-blue-400" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-1">
                      Sending a residence permit request
                    </h3>
                    <p className="text-gray-700 mb-4 font-poppins text-center">
                      We send the documents and manage the relationship with the Police Headquarters to get you the residence permit within the time frame required by law.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Request Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="
        
        bg-gradient-to-r from-blue-500 to-blue-700 rounded-[40px] overflow-hidden border border-gray-300">
          <div className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Request a consultation with us now
              </h2>
              <p className="text-lg text-blue-100 font-poppins">
                If you don't know how to apply for your first residence permit or are having difficulties with the Public Administration, we will help you find the best way.
              </p>
              <button
                onClick={() => {
                  const contactForm = document.querySelector('#contact-form');
                  contactForm?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors hover:transform hover:translate-y-[-2px] whitespace-nowrap"
              >Start here<svg className="w-5 h-5 ml-2 inline" viewBox="0 0 256 512" fill="currentColor"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" /></svg></button>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* What is a residence permit? */}
          <div className="h-[450px] group perspective-1000">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  What is a residence permit?
                </h3>
              </div>
              {/* Back */}
              <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="space-y-3">
                    <p className="text-[15px] leading-relaxed">
                      The residence permit is a title that is granted to a foreign citizen and that gives the right to reside in the entire national territory, for a specific duration or an unlimited period.
                    </p>
                    <p className="text-[15px] leading-relaxed">
                      It allows foreigners in Italy to carry out the activities permitted by law and related to the reason for which it is issued.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Who is a foreign citizen? */}
          <div className="h-[450px] group perspective-1000">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  Who is a foreign citizen according to Italian law?
                </h3>
              </div>
              {/* Back */}
              <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="space-y-3">
                    <p className="text-[15px] leading-relaxed mb-2">
                      A foreigner is someone who does not have Italian citizenship and can be:
                    </p>
                    <ul className="space-y-2 text-[15px]">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>A Community citizen: when he or she has the citizenship of one of the member states of the European Union.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>A third-country citizen, or non-EU citizen, when he or she has the citizenship of a state that does not belong to the European Union.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Types of residence permit */}
          <div className="h-[450px] group perspective-1000">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  Types of residence permit
                </h3>
              </div>
              {/* Back */}
              <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                <div className="flex flex-col justify-center h-full">
                  <div className="space-y-2">
                    <p className="text-[15px] leading-relaxed mb-2">
                      The main types of residence permits are:
                    </p>
                    <ul className="space-y-1 text-[14px]">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for subordinate work</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for self-employment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for family reasons</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for study reasons</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for religious reasons</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for sports activities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for medical treatment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Residence permit for assistance to minors or art. 31</span>
                      </li>
                    </ul>
                    <p className="text-[13px] italic mt-2">
                      It is important to know that there are also residence permits that do not require an entry visa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 rounded-[40px] border border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Residence permit application requirements: we check them for you
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Entry Visa Card */}
              <div className="h-[400px] group perspective-1000">
                <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                  <div className="card-face card-front absolute w-full h-full bg-white rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                    <h3 className="text-2xl font-semibold text-gray-800 text-center">
                      Possession of entry visa
                    </h3>
                  </div>
                  <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-[15px] leading-relaxed text-center">
                        When you first apply for a residence permit, you must prove that you entered with a visa and are legally residing in the territory.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            {/* Income Requirements Card */}
            <div className="h-[400px] group perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="card-face card-front absolute w-full h-full bg-white rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                  <h3 className="text-2xl font-semibold text-gray-800 text-center">
                    Income or family constraints
                  </h3>
                </div>
                <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="space-y-4">
                      <p className="text-[15px] leading-relaxed text-center">
                        The main requirement for a residence permit for family reasons is to demonstrate your family relationship with someone who already has a residence permit or is an EU citizen (spouse, children, parents, siblings).
                      </p>
                      <p className="text-[15px] leading-relaxed text-center">
                        The residence permit for work reasons requires a minimum annual income that depends on the people who are dependent on you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accommodation Card */}
            <div className="h-[400px] group perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="card-face card-front absolute w-full h-full bg-white rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                  <h3 className="text-2xl font-semibold text-gray-800 text-center">
                    Suitable accommodation
                  </h3>
                </div>
                <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-[15px] leading-relaxed text-center">
                      In any case, to obtain a residence permit you must demonstrate that you have a house available where you can live, for this you must present the declaration of hospitality or the certificate of residence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[24px] p-8 border border-gray-300">
              <p className="text-lg text-gray-700 mb-4">
                Attention! Some residence permits do not require an entry visa, these are particular types of residence permits that must be requested with particular attention:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Residence permit for MINORS IN A STATE OF ABANDONMENT</li>
                <li>Residence permit for SPECIAL PROTECTION</li>
                <li>Residence permit for MINOR ASSISTANCE (Art.31)</li>
                <li>Residence permit for MEDICAL TREATMENTS</li>
                <li>Residence permit for JUSTICE REASONS</li>
                <li>Residence permit for ASYLUM REQUEST and POLITICAL ASYLUM</li>
                <li>Residence permit for PENDING CITIZENSHIP</li>
              </ul>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  const contactForm = document.querySelector('#contact-form');
                  contactForm?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Call us now if you don't qualify
                <svg 
                  className="w-5 h-5 ml-2" 
                  viewBox="0 0 256 512" 
                  fill="currentColor"
                >
                  <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-white rounded-[40px] border border-gray-300 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Residence permit application documents: we help you collect them
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  To issue or renew a residence permit, some general documents are required and then, for each type of residence permit, specific documents will be needed.
                </p>
                <p className="text-lg">
                  The general documents for the residence permit, or those necessary for all requests, are the following:
                </p>
                
                <ol className="list-decimal pl-6 space-y-4 text-lg">
                  <li className="pl-2">
                    <span className="font-normal">16 EURO STAMP (For the necessary rights)</span>
                  </li>
                  <li className="pl-2">
                    <span className="font-normal">PHOTOCOPY OF YOUR PASSPORT (Where the number, personal data and entry visa are visible)</span>
                  </li>
                  <li className="pl-2">
                    <span className="font-normal">RESIDENCE PERMIT (if it is a renewal, update or conversion)</span>
                  </li>
                  <li className="pl-2">
                    <span className="font-normal">4 PASSPORT PHOTOS + 4 photos of any minor children to be included in the residence permit (minor children must be present on the day of the call)</span>
                  </li>
                  <li className="pl-2">
                    <span className="font-normal">TAX CODE (if available)</span>
                  </li>
                  <li className="pl-2">
                    <span className="font-normal">CERTIFICATION ATTENTING CURRENT ACCOMMODATION (certificate of residence, or declaration of hospitality/transfer of building)</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[40px] border border-gray-300 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900">
                  Contact us to request a residence permit for a brother of an Italian citizen
                </h4>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => {
                    const contactForm = document.querySelector('#contact-form');
                    contactForm?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Call us now
                  <svg 
                    className="w-5 h-5 ml-2" 
                    viewBox="0 0 256 512" 
                    fill="currentColor"
                  >
                    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income Requirements Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-white rounded-[40px] border border-gray-300 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Do you have the income to apply for a residence permit?
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  The income for the residence permit is a requirement that mainly concerns the residence permit for reasons of subordinate employment and for reasons of self-employment. 
                </p>
                <p className="text-lg">
                  In these two cases, it is necessary to demonstrate that you have sufficient income to be able to obtain a residence permit for work reasons.
                </p>
                <p className="text-lg">
                  In any case, this data can also vary based on the family unit, how many people you have in your care and what type of permit you are requesting.
                </p>
                
                <ul className="list-none space-y-4 text-lg pl-4">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Applicant only: <strong>€6,947.33</strong> per year</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Applicant + 1 family member (even if under 14 years of age): <strong>€10,420.99</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Applicant + 2 family members: <strong>€13,849.65</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>Applicant + 3 family members: <strong>€17,323.31</strong></span>
                  </li>
                </ul>

                <p className="text-lg mt-8">
                  It is important to know that, to demonstrate income, you can also use and add the incomes of your cohabiting family members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-white rounded-[40px] border border-gray-300 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Problems applying for a residence permit?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Notice Card */}
                <div className="h-[400px] group perspective-1000">
                  <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                    <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                      <h3 className="text-2xl font-semibold text-gray-800 text-center">
                        Notice of rejection of residence permit application
                      </h3>
                    </div>
                    <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                      <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-[15px] leading-relaxed text-center">
                          If you see this message, it may be that your application for a residence permit has been suspended, archived or rejected.<br /><br />
                          But it could also be a technical error, so it is always a good idea to check.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refusal Card */}
                <div className="h-[400px] group perspective-1000">
                  <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                    <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                      <h3 className="text-2xl font-semibold text-gray-800 text-center">
                        Refusal of residence permit
                      </h3>
                    </div>
                    <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                      <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-[15px] leading-relaxed text-center">
                          If you see the message "residence permit in processing" you must wait, the process is ongoing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revocation Card */}
                <div className="h-[400px] group perspective-1000">
                  <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                    <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                      <h3 className="text-2xl font-semibold text-gray-800 text-center">
                        Revocation of residence permit
                      </h3>
                    </div>
                    <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                      <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-[15px] leading-relaxed text-center">
                          The residence permit is ready for delivery and can therefore be collected at the Police Headquarters.<br /><br />
                          Some Police Headquarters send a text message, others require booking an appointment for collection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] p-8 border border-gray-300">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Respond to the rejection notice and get your residence permit immediately
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => {
                        const contactForm = document.querySelector('#contact-form');
                        contactForm?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Call us now
                      <svg 
                        className="w-5 h-5 ml-2" 
                        viewBox="0 0 256 512" 
                        fill="currentColor"
                      >
                        <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Law Firm Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-white rounded-[40px] border border-gray-300 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                Are you looking for a lawyer to apply for a residence permit?
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
                SH Immigration Specialists is much more than an agency for foreigners
              </h3>

              <div className="space-y-8 text-gray-700">
                <div className="space-y-4">
                  <p className="text-lg">We do one thing, but we do it better than anyone else.</p>
                  <p className="text-lg">We offer immigration services and provide you with a lawyer to apply for a residence permit.</p>
                  <p className="text-lg">If you rely on our agency for foreigners <strong>you just have to relax and wait for your first residence permit.</strong></p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Who we are</h3>
                  <p className="text-lg">SH Immigration Specialists is much more than an immigration agency.</p>
                  <p className="text-lg">We are a law firm specializing in immigration law that provides you with an <strong>experienced immigration lawyer.</strong></p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Where we operate</h3>
                  <p className="text-lg">We offer our immigration and residence permit application consultancy services throughout Italy online and in our offices in Bologna, Milan, Turin, Genoa, Rome and Naples.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">How we work</h3>
                  <p className="text-lg">SH Immigration Specialists has established itself as a leader among agencies for foreigners because, with its lawyers for foreigners, it offers complete 360° immigration services.</p>
                  <p className="text-lg">We help you collect documents and send the request, and we follow you from until you obtain your first residence permit and, in the future, Italian citizenship.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Law Firm Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Agency Card */}
          <div className="h-[400px] group perspective-1000">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  Agency for foreigners: what it does
                </h3>
              </div>
              <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-[15px] leading-relaxed text-center">
                    A simple immigration agency fills out the documents, often with serious errors.<br /><br />
                    SH Immigration Specialists is much more: a law firm for foreigners that can get you the documents in record time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lawyer Card */}
          <div className="h-[400px] group perspective-1000">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  Lawyer for foreigners: who is he?
                </h3>
              </div>
              <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-[15px] leading-relaxed text-center">
                    The immigration lawyer specializes in the procedures for immigrating to Italy and staying legally in our country, without any problems with documents.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Card */}
          <div className="h-[400px] group perspective-1000">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  Immigration Lawyer: How Much Does It Cost?
                </h3>
              </div>
              <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-[15px] leading-relaxed text-center">
                    The cost of a lawyer for foreigners depends on each case. Call or write to us to explain your problem and get a quote.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Card */}
          <div className="h-[400px] group perspective-1000">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="card-face card-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] border border-gray-300 p-6 flex items-center justify-center backface-hidden">
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  Residence permit application consultancy: how it works
                </h3>
              </div>
              <div className="card-face card-back absolute w-full h-full bg-blue-600 text-white rounded-[24px] p-6 backface-hidden rotate-y-180">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-[15px] leading-relaxed text-center">
                    If you want to get your first residence permit and need advice, contact us.<br /><br />
                    We will set a date and time for our meeting, in your language, online or in our office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-white rounded-[40px] border border-gray-300 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                FAQ - Residence permit request
              </h2>

              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="border border-gray-200 rounded-lg">
                  <button 
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('svg');
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                      }
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">What is a residence permit?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">The residence permit is the administrative document that allows the foreign citizen to reside in Italy and is used to certify their legal presence in the country. It is mandatory that the foreign citizen with an expired visa always has the permit or the receipt of their request with them.</p>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="border border-gray-200 rounded-lg">
                  <button 
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('svg');
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                      }
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">How long does it take to apply for a residence permit?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">Anyone coming from abroad and wishing to remain in Italian territory is required to submit the application for a residence permit within a maximum period of 8 working days from arrival.</p>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="border border-gray-200 rounded-lg">
                  <button 
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('svg');
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                      }
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">Where do you apply for a residence permit?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">The application for issuing or renewing the residence permit must be submitted at the post office. The competent Police Headquarters is identified with reference to the foreigner's place of residence. In certain circumstances, it is possible to submit the application directly to the Police Headquarters.</p>
                  </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="border border-gray-200 rounded-lg">
                  <button 
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('svg');
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                      }
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">What is the postal receipt for the residence permit application for?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">The application receipt constitutes, until the actual delivery of the residence permit, a document that certifies the regularity of the foreigner's stay in Italy. The latter must carefully keep the receipt and present it at the Police Headquarters when collecting the residence permit. To check the status of the application, foreigners can visit www.portaleimmigrazione.it and check the availability of offices for collecting the residence permit through questure.poliziadistato.it/stranieri.</p>
                  </div>
                </div>

                {/* FAQ Item 5 */}
                <div className="border border-gray-200 rounded-lg">
                  <button 
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('svg');
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                      }
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">Can I work with the postal receipt of the request or renewal of the residence permit?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">Yes, you can work with the postal receipt for issuing or renewing the residence permit.</p>
                  </div>
                </div>

                {/* FAQ Item 6 */}
                <div className="border border-gray-200 rounded-lg">
                  <button 
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('svg');
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                      }
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">Can I travel with the postal receipt?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">Yes, those waiting for their residence permit renewal can leave Italy to go to their country with a direct flight and return by showing only the Italian Post Office receipt that certifies the submission of the residence permit or residence card application.</p>
                  </div>
                </div>

                {/* FAQ Item 7 */}
                <div className="border border-gray-200 rounded-lg">
                  <button 
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      const icon = e.currentTarget.querySelector('svg');
                      if (content && icon) {
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                      }
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">Can I apply for family reunification with the postal receipt?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">Yes, it is possible to request family reunification using the postal receipt, provided that all the conditions set out in Article 28 and following of the Immigration Consolidated Act are met.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
} 