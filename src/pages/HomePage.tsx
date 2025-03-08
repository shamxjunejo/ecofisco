      import { useState, useEffect } from 'react';
      import './textAnimation.css';

      const ElementorHeadline = () => {
        const phrases = [
          'consulates',
          'visas', 
          'dual citizenship',
          'citizenship by marriage'
        ];
        
        const [currentPhrase, setCurrentPhrase] = useState(0);
        const [isAnimating, setIsAnimating] = useState(false);
        
        useEffect(() => {
          const interval = setInterval(() => {
            setIsAnimating(true);
            
            setTimeout(() => {
              setCurrentPhrase((prev) => (prev + 1) % phrases.length);
              setIsAnimating(false);
            }, 600);
            
          }, 3000);
          
          return () => clearInterval(interval);
        }, []);
        
        const letters = phrases[currentPhrase].split('');
        
        return (
          <span 
            className="elementor-headline-dynamic-wrapper text-white text-5xl" 
            style={{ display: 'inline-block', minWidth: '280px' }}
          >
            {letters.map((letter, index) => (
              <span 
                key={`${currentPhrase}-${index}`}
                className={`elementor-headline-dynamic-letter ${
                  isAnimating ? 'elementor-headline-animation-out' : 'elementor-headline-animation-in'
                }`}
                style={{ 
                  animationDelay: `${isAnimating ? 0 : index * 0.10}s`,
                  display: letter === ' ' ? 'inline-block' : 'inline-block',
                  width: letter === ' ' ? '0.3em' : 'auto'
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        );
      };

      interface TabContent {
        id: string;
        title: string;
        content: React.ReactNode;
      }

      export default function HomePage() {
        const [activeTab, setActiveTab] = useState('residence');
        
        const tabs: TabContent[] = [
          {
            id: 'residence',
            title: 'Residence permit',
            content: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Residence permit release</h3>
                  <p className="text-gray-600 mb-2">Start your life in Italy</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    We assist you in the first application for a residence permit, residence card and long-term residence permit.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Renewal of residence permit</h3>
                  <p className="text-gray-600 mb-2">Maintain the right to reside</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    If you have an expiring or expired permit, don't waste any more time, one of our immigration lawyers will follow you.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Residence permit conversion</h3>
                  <p className="text-gray-600 mb-2">Change your stay requirements</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    If you no longer meet the requirements to renew your residence permit or want to change it completely.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
              </div>
            )
          },
          {
            id: 'citizenship',
            title: 'Italian citizenship',
            content: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Italian citizenship by residence</h3>
                  <p className="text-gray-600 mb-2">Naturalization as an Italian citizen</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    After 10 years of residence you can apply for Italian citizenship with our immigration lawyer.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Italian citizenship by marriage</h3>
                  <p className="text-gray-600 mb-2">Get your spouse's rights</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    After 2 or 3 years of marriage with an Italian citizen, you acquire the right to Italian citizenship.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Italian citizenship by descent</h3>
                  <p className="text-gray-600 mb-2">Claim your blood right</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    If one of your ancestors who emigrated abroad was an Italian citizen, you may be entitled to become one too.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
              </div>
            )
          },
          {
            id: 'family',
            title: 'Family reunification',
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Family reunification</h3>
                  <p className="text-gray-600 mb-2">Reunite with your loved ones who remain abroad</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Get clearance for your family members to reunite abroad with our lawyer for foreigners.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Family cohesion</h3>
                  <p className="text-gray-600 mb-2">Reunite with your relatives already in Italy</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Obtain a residence permit for family reasons without having to go through the Prefecture's clearance.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
              </div>
            )
          },
          {
            id: 'flows',
            title: 'Flows decree',
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Sending application for flow decree</h3>
                  <p className="text-gray-600 mb-2">Get a work visa</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Our agency for foreigners guarantees the success of the applications sent during the Decreto Flussi click days.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Certification of the flow decree</h3>
                  <p className="text-gray-600 mb-2">One of the most important documents</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    The certification of the flow decree is a crucial document for the hiring of foreign workers.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
              </div>
            )
          },
          {
            id: 'companies',
            title: 'Companies and employers',
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Request for non-EU personnel</h3>
                  <p className="text-gray-600 mb-2">Hire staff from abroad</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    If you want to hire foreign staff you may have to do so through the click day of the Flow Decree.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">EU Blue Card</h3>
                  <p className="text-gray-600 mb-2">Hire highly specialized staff</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Our agency for foreigners follows your company in hiring highly qualified personnel.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
              </div>
            )
          },
          {
            id: 'translation',
            title: 'Translation, policies and surety',
            content: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Sworn translation</h3>
                  <p className="text-gray-600 mb-2">Prepare everything you need</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Our agency for foreigners can provide you with certified translations of documents produced abroad.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Health insurance</h3>
                  <p className="text-gray-600 mb-2">Often required for visa</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Health insurance is required to apply for an entry visa and covers health risks.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Bank guarantee</h3>
                  <p className="text-gray-600 mb-2">Increase your chances of getting a visa</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    A bank guarantee that covers repatriation costs and increases the chances of receiving a visa for Italy.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
              </div>
            )
          },
          {
            id: 'documents',
            title: 'Documents for visa',
            content: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Work Visa</h3>
                  <p className="text-gray-600 mb-2">Start your new career</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Get a visa for non-seasonal, domestic or seasonal work with our agency for foreigners.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Study Visa</h3>
                  <p className="text-gray-600 mb-2">Follow your dreams in Italy</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    The best choice to live in Italy as a university student, intern or to learn the Italian language.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Elective residence visa</h3>
                  <p className="text-gray-600 mb-2">Enjoy the Italian Dolce Vita</p>
                  <p className="text-gray-700 mb-4 font-poppins">
                    Take advantage of the advice of an immigration lawyer for this visa reserved for those who want to live in Italy without working.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                    Find out more
                  </button>
                </div>
              </div>
            )
          }
        ];



        

        return (
          <div className="max-w-7xl mx-auto py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 lg:px-8">
            <div className="relative rounded-xl overflow-hidden mb-8 sm:mb-12">
              <div className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                  src="/src/images/hero.jpg"
                  alt="Italian Immigration Experts"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-blue-800/30 rounded-xl">
                  <div className="p-4 sm:p-8 md:p-10 lg:p-12 max-w-3xl">
                    <h1 className="hidden md:block text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-8">
                      <span className="tracking-wider text-white glow-blue-600">Welcome to</span> <span className="text-blue-600" style={{WebkitTextStroke: '0.8px white'}}>ECOFISCO</span>
                    </h1>
                    
                    <div className="mb-4 sm:mb-8">
                      <p className="text-xl sm:text-2xl text-white font-light leading-relaxed">
                        Struggling with Italian bureaucracy?
                        <span className="block mt-2 text-lg sm:text-xl">
                          As Italian immigration experts, we understand.
                        </span>
                      </p>
                    </div>

                    <div className="mb-6 sm:mb-10">
                      <span className="block text-xl sm:text-2xl md:text-3xl font-medium text-white mb-2 sm:mb-4">
                        Never again problems with Italian
                      </span>
                      <ElementorHeadline />
                    </div>

                    <div className="absolute bottom-8 left-8">
                      <button 
                        onClick={() => {
                          const element = document.querySelector('.relative.z-10');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block px-4 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Start Here
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>









            <div className="bg-white shadow-lg rounded-lg p-6 text-blue-900 mb-16">
              <h2 className="text-2xl font-bold text-center">Italy is 57th in terms of efficiency of Public Administration</h2>
              <h3 className="text-xl font-semibold text-center mt-4">Why is it so difficult to communicate with public offices?</h3>
              <p className="text-lg mt-4">
                Foreigners often encounter great difficulties when dealing with Italian immigration procedures due to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Language and cultural barriers.</li>
                <li>Very long waiting times.</li>
                <li>Ever-changing rules.</li>
                <li>Need to interact with different offices, each with its own procedures.</li>
                <li>A redundant amount of necessary documents.</li>
              </ul>
              <div className="flex justify-center mt-6">
                <svg className="w-10 h-10 text-blue-600 animate-bounce" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z" />
                </svg>
              </div>
            </div>

            {/* Tab Section */}
            <div className="relative bg-gradient-to-b from-blue-50 to-transparent py-16 mb-16">
              <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="h-16 w-full">
                  <path className="fill-white" d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z" />
                </svg>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                  Our Immigration Services
                </h2>
                <h3 className="text-xl text-center text-gray-700 mb-12">
                  How our agency for foreigners can help you
                </h3>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  {tabs.find(tab => tab.id === activeTab)?.content}
                </div>
              </div>
            </div>

            {/* Card Section */}
            <div className="bg-[#eff6ff] py-16 rounded-[40px] mb-24">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Card 1 */}
                  <div className="p-6 rounded-[24px]">
                    <div className="flex flex-col items-center">
                      <img 
                        src="src/images/clock.png"
                        alt="Clock icon" 
                        className="w-10 h-10 mb-4 text-gray-700"
                      />
                      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                        Stress-free documents
                      </h3>
                      <p className="text-gray-600 text-center">
                        Never-ending waits for your documents will be a thing of the past.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-[24px]">
                    <div className="flex flex-col items-center">
                      <img 
                        src="src/images/passport.png"
                        alt="Passport icon"
                        className="w-10 h-10 mb-4 text-gray-700"
                      />
                      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                        At your side with embassies, prefectures and police headquarters
                      </h3>
                      <p className="text-gray-600 text-center">
                        From the first steps at the Embassy to citizenship we are with you.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-[24px]">
                    <div className="flex flex-col items-center">
                      <img 
                        src="src/images/language.png"
                        alt="Languages icon"
                        className="w-10 h-10 mb-4 text-gray-700"
                      />
                      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                        Consulting in your language
                      </h3>
                      <p className="text-gray-600 text-center">
                        In our offices we speak English, French, Spanish, Urdu, Hindi, Arabic, Russian, Turkish and Filipino.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Native Speaking Lawyers Section */}
            <div className="bg-[#eff6ff] py-16 rounded-[40px]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-semibold text-black mb-2">
                    An agency for foreigners that breaks down barriers
                  </h3>
                  <h2 className="text-3xl font-bold text-black mb-4">
                    Native speaking immigration experts
                  </h2>
                  <p className="text-lg text-black">
                    Say goodbye to language barriers, <strong>our immigration consultants speak your language</strong>, so we understand each other better and find the best solution in record time.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Spain</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="src/images/italy.png"
                        alt="Spanish Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">England</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="public/images/italy.png"
                        alt="English Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Pakistan</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="src/images/italy.png"
                        alt="Pakistani Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Morocco</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="src/images/italy.png"
                        alt="Moroccan Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Portugal</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="src/images/italy.png"
                        alt="Portuguese Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">India</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="src/images/italy.png"
                        alt="Indian Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">France</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="src/images/italy.png"
                        alt="French lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">China</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="public/images/italy.png"
                        alt="Chinese Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Bangladesh</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src="src/images/italy.png"
                        alt="Bangladesh Lawyer in Italy"
                        className="w-[35%] border border-blue-600 rounded-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <a 
                    href="#contact-form"
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold"
                  >
                    Contact us for free
                  </a>
                </div>
              </div>
            </div>

          </div>
        );
      }