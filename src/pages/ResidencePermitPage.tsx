import React, { useState } from 'react';
import guideImage from "../assets/guide.jpg";
import SEO from '../components/SEO';
import '../styles/flip-card.css';
import consult from "../assets/consult.svg";

export default function ResidencePermitPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <>
      <SEO 
        title="Residence Permit Application"
        description="Professional assistance with residence permit applications in Italy - document collection, verification, and submission services."
        keywords="residence permit Italy, permesso di soggiorno, Italian residence permit application, immigration services Italy"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Residence Permit Application Service
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Expert guidance through your Italian residence permit application process with professional support every step of the way.
              </p>
              <a 
                onClick={() => {
                  const servicesSection = document.querySelector('#services-section');
                  servicesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                Get Started
              </a>
            </div>
            <div className="md:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={guideImage} 
                  alt="Residence Permit Application" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Cards Section */}
      <div id="services-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Residence Permit Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive assistance throughout the entire process of obtaining your Italian residence permit.
            </p>
          </div>
          

          {/* Card 1 - Consultancy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden  border border-gray-200">
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Consultancy on Residence Permit Application
                </h3>
                <p className="text-gray-600">
                  Expert guidance through your Italian residence permit application process with professional legal support.
                </p>
              </div>
            </div>
            
            {/* Card 2 - Document Collection */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden  border border-gray-200">
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Document Collection
                </h3>
                <p className="text-gray-600">
                  Comprehensive assistance in collecting and verifying all necessary documents for your residence permit.
                </p>
              </div>
            </div>
            
            {/* Card 3 - Application Submission */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Application Submission
                </h3>
                <p className="text-gray-600">
                  Professional management of residence permit request submission and communication with authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    

      {/* Flip Cards Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Understanding Residence Permits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hover or tap on the cards below to learn more about residence permits in Italy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* What is a residence permit? */}
            <div className="h-[450px] group perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front */}
                <div className="card-face card-front absolute w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-sm p-8 flex items-center justify-center backface-hidden border border-blue-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      What is a residence permit?
                    </h3>
                    <p className="text-gray-600">Tap to learn more</p>
                  </div>
                </div>
                {/* Back */}
                <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-blue-500">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-6 text-center">Residence Permit</h3>
                    <div className="space-y-4">
                      <p className="text-white/90 leading-relaxed">
                        The residence permit is a title that is granted to a foreign citizen and that gives the right to reside in the entire national territory, for a specific duration or an unlimited period.
                      </p>
                      <p className="text-white/90 leading-relaxed">
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
                <div className="card-face card-front absolute w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-sm p-8 flex items-center justify-center backface-hidden border border-green-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Who is a foreign citizen according to Italian law?
                    </h3>
                    <p className="text-gray-600">Tap to learn more</p>
                  </div>
                </div>
                {/* Back */}
                <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-green-500">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-6 text-center">Foreign Citizen Definition</h3>
                    <div className="space-y-4">
                      <p className="text-white/90 leading-relaxed mb-2">
                        A foreigner is someone who does not have Italian citizenship and can be:
                      </p>
                      <ul className="space-y-2 text-white/90">
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
                <div className="card-face card-front absolute w-full h-full bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl shadow-sm p-8 flex items-center justify-center backface-hidden border border-purple-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Types of residence permit
                    </h3>
                    <p className="text-gray-600">Tap to learn more</p>
                  </div>
                </div>
                {/* Back */}
                <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-purple-600 to-violet-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-purple-500">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-center">Residence Permit Types</h3>
                    <div className="space-y-2">
                      <p className="text-white/90 leading-relaxed mb-2">
                        The main types of residence permits are:
                      </p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-white/90 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Subordinate work</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Self-employment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Family reasons</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Study reasons</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Religious reasons</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Sports activities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Medical treatment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Minor assistance</span>
                        </li>
                      </ul>
                      <p className="text-sm italic mt-4 text-white/80">
                        It is important to know that there are also residence permits that do not require an entry visa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Residence Permit Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We check all requirements for you to ensure a successful application.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Entry Visa Card */}
            <div className="h-[400px] group perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="card-face card-front absolute w-full h-full bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center backface-hidden border border-gray-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Possession of Entry Visa
                    </h3>
                    <p className="text-gray-600">Tap to learn more</p>
                  </div>
                </div>
                <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-amber-500">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-6 text-center">Entry Visa Requirement</h3>
                    <p className="text-white/90 leading-relaxed text-center">
                      When you first apply for a residence permit, you must prove that you entered with a visa and are legally residing in the territory.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Income Requirements Card */}
            <div className="h-[400px] group perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="card-face card-front absolute w-full h-full bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center backface-hidden border border-gray-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Income or Family Constraints
                    </h3>
                    <p className="text-gray-600">Tap to learn more</p>
                  </div>
                </div>
                <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-teal-500">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-center">Income Requirements</h3>
                    <div className="space-y-4">
                      <p className="text-white/90 leading-relaxed">
                        The main requirement for a residence permit for family reasons is to demonstrate your family relationship with someone who already has a residence permit or is an EU citizen.
                      </p>
                      <p className="text-white/90 leading-relaxed">
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
                <div className="card-face card-front absolute w-full h-full bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center backface-hidden border border-gray-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Suitable Accommodation
                    </h3>
                    <p className="text-gray-600">Tap to learn more</p>
                  </div>
                </div>
                <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-indigo-500">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-6 text-center">Accommodation Requirement</h3>
                    <p className="text-white/90 leading-relaxed text-center">
                      In any case, to obtain a residence permit you must demonstrate that you have a house available where you can live, for this you must present the declaration of hospitality or the certificate of residence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center md:flex-row md:items-start">
                  <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Attention! Some residence permits do not require an entry visa
                    </h4>
                    <p className="text-gray-700 mb-4">
                      These are particular types of residence permits that must be requested with particular attention:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>Residence permit for MINORS IN A STATE OF ABANDONMENT</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>Residence permit for SPECIAL PROTECTION</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>Residence permit for MINOR ASSISTANCE (Art.31)</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>Residence permit for MEDICAL TREATMENTS</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>Residence permit for JUSTICE REASONS</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>Residence permit for ASYLUM REQUEST</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span>Residence permit for PENDING CITIZENSHIP</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 py-6 px-8 text-center">
              <button
                onClick={() => {
                  const contactForm = document.querySelector('#contact-form');
                  contactForm?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1"
              >
                Call us now if you don't qualify
                <svg 
                  className="w-5 h-5 ml-2" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] shadow-sm overflow-hidden">
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
              
              <div className="relative p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Required Documents
                    </h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600">
                      Essential documentation for your residence permit application
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl">
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      The following documents are required for all residence permit applications. Additional specific documents may be needed based on your permit type.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Document Items */}
                      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">01</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">16 Euro Revenue Stamp</h3>
                            <p className="text-gray-600 mt-1">Required for administrative fees</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">02</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">Passport Copy</h3>
                            <p className="text-gray-600 mt-1">Including number, personal data and visa</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">03</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">Current Permit</h3>
                            <p className="text-gray-600 mt-1">For renewals or conversions</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">04</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">Passport Photos</h3>
                            <p className="text-gray-600 mt-1">4 photos + 4 per minor child</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">05</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">Tax Code</h3>
                            <p className="text-gray-600 mt-1">If already issued</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">06</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">Proof of Address</h3>
                            <p className="text-gray-600 mt-1">Residence certificate or hospitality declaration</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-white">
                  <h4 className="text-2xl md:text-3xl font-bold mb-4">
                    Contact us to request a residence permit for a brother of an Italian citizen
                  </h4>
                  <p className="text-white/80 text-lg mb-0 md:mb-4">
                    Our experts are ready to assist you with your specific situation
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => {
                      const contactForm = document.querySelector('#contact-form');
                      contactForm?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Call us now
                    <svg 
                      className="w-5 h-5 ml-2"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income Requirements Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
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
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4 font-bold text-lg">
                          1
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900">Applicant only</h4>
                      </div>
                      <p className="ml-14 text-gray-700">
                        Annual income requirement: <span className="font-bold text-blue-700">€6,947.33</span>
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4 font-bold text-lg">
                          2
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900">Applicant + 1 family member</h4>
                      </div>
                      <p className="ml-14 text-gray-700">
                        Annual income requirement: <span className="font-bold text-blue-700">€10,420.99</span>
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4 font-bold text-lg">
                          3
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900">Applicant + 2 family members</h4>
                      </div>
                      <p className="ml-14 text-gray-700">
                        Annual income requirement: <span className="font-bold text-blue-700">€13,849.65</span>
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4 font-bold text-lg">
                          4
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900">Applicant + 3 family members</h4>
                      </div>
                      <p className="ml-14 text-gray-700">
                        Annual income requirement: <span className="font-bold text-blue-700">€17,323.31</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <p className="text-gray-800 ml-3 font-medium">
                        It is important to know that, to demonstrate income, you can also use and add the incomes of your cohabiting family members.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                  Problems applying for a residence permit?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Notice Card */}
                  <div className="h-[400px] group perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                      <div className="card-face card-front absolute w-full h-full bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl shadow-md p-8 flex items-center justify-center backface-hidden border border-red-200">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Notice of rejection of residence permit application
                          </h3>
                          <p className="text-gray-600">Tap to learn more</p>
                        </div>
                      </div>
                      <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-red-500">
                        <div className="h-full flex flex-col justify-center">
                          <h3 className="text-2xl font-bold mb-6 text-center">Application Rejection</h3>
                          <p className="text-white/90 leading-relaxed text-center">
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
                      <div className="card-face card-front absolute w-full h-full bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl shadow-md p-8 flex items-center justify-center backface-hidden border border-yellow-200">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Refusal of residence permit
                          </h3>
                          <p className="text-gray-600">Tap to learn more</p>
                        </div>
                      </div>
                      <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-yellow-600 to-amber-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-yellow-500">
                        <div className="h-full flex flex-col justify-center">
                          <h3 className="text-2xl font-bold mb-6 text-center">Permit Application Status</h3>
                          <p className="text-white/90 leading-relaxed text-center">
                            If you see the message "residence permit in processing" you must wait, the process is ongoing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revocation Card */}
                  <div className="h-[400px] group perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                      <div className="card-face card-front absolute w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-md p-8 flex items-center justify-center backface-hidden border border-green-200">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Revocation of residence permit
                          </h3>
                          <p className="text-gray-600">Tap to learn more</p>
                        </div>
                      </div>
                      <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl shadow-lg p-8 backface-hidden rotate-y-180 border border-green-500">
                        <div className="h-full flex flex-col justify-center">
                          <h3 className="text-2xl font-bold mb-6 text-center">Ready for Collection</h3>
                          <p className="text-white/90 leading-relaxed text-center">
                            The residence permit is ready for delivery and can therefore be collected at the Police Headquarters.<br /><br />
                            Some Police Headquarters send a text message, others require booking an appointment for collection.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        Respond to the rejection notice
                      </h3>
                      <p className="text-white/80">
                        Get expert help to overturn rejection decisions and secure your residence permit
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => {
                          const contactForm = document.querySelector('#contact-form');
                          contactForm?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        Call us now
                        <svg 
                          className="w-5 h-5 ml-2" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Law Firm Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-sm overflow-hidden border border-blue-200">
            <div className="p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
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

      {/* Call to Action Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600/5 to-indigo-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-blue-100/50">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/5 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Get Expert Guidance - Book a Free Consultation
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have questions about residence permits or immigration services?<br />
                  Schedule a complimentary 30-minute consultation with our experts to discuss your specific needs.
                </p>
                <a
                  href="/book-appointment"
                  className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Schedule Your Free Consultation</span>
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
              <div className="md:w-2/5 bg-white  p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-6">
                    <img 
                      src={consult}
                      alt="Consultation" 
                      className="w-40 h-40 mx-auto object-contain [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(98%)_saturate(1900%)_hue-rotate(206deg)_brightness(97%)_contrast(95%)]"
                    />
                  </div>
                  <div className="bg-white/50   py-3 px-6   ">
                    <p className="text-blue-800 font-semibold text-lg">
                      30-Minute Free Consultation
                    </p>
                  </div>
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
                    <p className="text-gray-700">The application for the issue or renewal of a residence permit must be submitted at the post office. The competent Police Headquarters is identified with reference to the foreigner's place of residence. In certain circumstances, it is possible to submit the application directly at the Police Headquarters.</p>
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
                    <p className="text-gray-700">The application receipt constitutes, until the actual delivery of the residence permit, a document that certifies the regularity of the foreigner's stay in Italy. The latter is required to carefully keep the receipt and present it at the Police Headquarters when collecting the residence permit. To check the processing status of the application, the foreigner can consult the website www.portaleimmigrazione.it and, through the website http://questure.poliziadistato.it/stranieri/?mime=IT, can check the availability of the offices for collecting the residence permit.</p>
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
                    <p className="text-gray-700">Yes, with the postal receipt of issue or renewal of the residence permit you can work.</p>
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
                    <h3 className="text-lg font-semibold text-gray-800">Can I travel with a postal receipt?</h3>
                    <svg className="w-5 h-5 text-gray-500 transition-transform duration-200" viewBox="0 0 320 512">
                      <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="hidden p-4 bg-gray-50">
                    <p className="text-gray-700">Yes, those who are waiting for the renewal of their residence permit can leave Italy to go to their country with a direct flight and return by showing only the receipt from the Italian Post Office certifying the submission of the application for the residence permit or residence card.</p>
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
    </>
  );
}