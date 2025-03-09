      import { useState, useEffect } from 'react';
      import './textAnimation.css';
      import italy from "../assets/italy.png";
      import hero from "../assets/hero.jpg";
      import language from "../assets/language.png";
      import clock from "../assets/clock.png";
      import passport from "../assets/passport.png";
    
      


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
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Residence permit release</h3>
                    <p className="text-gray-600 mb-2">Start your life in Italy</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      We assist you in the first application for a residence permit, residence card and long-term residence permit.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Renewal of residence permit</h3>
                    <p className="text-gray-600 mb-2">Maintain the right to reside</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      If you have an expiring or expired permit, don't waste any more time, one of our immigration lawyers will follow you.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Residence permit conversion</h3>
                    <p className="text-gray-600 mb-2">Change your stay requirements</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      If you no longer meet the requirements to renew your residence permit or want to change it completely.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
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
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Italian citizenship by residence</h3>
                    <p className="text-gray-600 mb-2">Naturalization as an Italian citizen</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      After 10 years of residence you can apply for Italian citizenship with our immigration lawyer.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Italian citizenship by marriage</h3>
                    <p className="text-gray-600 mb-2">Get your spouse's rights</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      After 2 or 3 years of marriage with an Italian citizen, you acquire the right to Italian citizenship.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Italian citizenship by descent</h3>
                    <p className="text-gray-600 mb-2">Claim your blood right</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      If one of your ancestors who emigrated abroad was an Italian citizen, you may be entitled to become one too.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
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
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Family reunification</h3>
                    <p className="text-gray-600 mb-2">Reunite with your loved ones who remain abroad</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Get clearance for your family members to reunite abroad with our lawyer for foreigners.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Family cohesion</h3>
                    <p className="text-gray-600 mb-2">Reunite with your relatives already in Italy</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Obtain a residence permit for family reasons without having to go through the Prefecture's clearance.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
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
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Sending application for flow decree</h3>
                    <p className="text-gray-600 mb-2">Get a work visa</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Our agency for foreigners guarantees the success of the applications sent during the Decreto Flussi click days.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Certification of the flow decree</h3>
                    <p className="text-gray-600 mb-2">One of the most important documents</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      The certification of the flow decree is a crucial document for the hiring of foreign workers.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
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
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Request for non-EU personnel</h3>
                    <p className="text-gray-600 mb-2">Hire staff from abroad</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      If you want to hire foreign staff you may have to do so through the click day of the Flow Decree.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">EU Blue Card</h3>
                    <p className="text-gray-600 mb-2">Hire highly specialized staff</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Our agency for foreigners follows your company in hiring highly qualified personnel.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
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
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Sworn translation</h3>
                    <p className="text-gray-600 mb-2">Prepare everything you need</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Our agency for foreigners can provide you with certified translations of documents produced abroad.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Health insurance</h3>
                    <p className="text-gray-600 mb-2">Often required for visa</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Health insurance is required to apply for an entry visa and covers health risks.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Bank guarantee</h3>
                    <p className="text-gray-600 mb-2">Increase your chances of getting a visa</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      A bank guarantee that covers repatriation costs and increases the chances of receiving a visa for Italy.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
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
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Work Visa</h3>
                    <p className="text-gray-600 mb-2">Start your new career</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Get a visa for non-seasonal, domestic or seasonal work with our agency for foreigners.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Study Visa</h3>
                    <p className="text-gray-600 mb-2">Follow your dreams in Italy</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      The best choice to live in Italy as a university student, intern or to learn the Italian language.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
                    Find out more
                  </button>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-[40px] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Elective residence visa</h3>
                    <p className="text-gray-600 mb-2">Enjoy the Italian Dolce Vita</p>
                    <p className="text-gray-700 mb-4 font-poppins">
                      Take advantage of the advice of an immigration lawyer for this visa reserved for those who want to live in Italy without working.
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors mt-auto">
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
                  src={hero}
                  alt="Italian Immigration Experts"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 to-blue-800/30 rounded-xl">
                  <div className="p-4 sm:p-8 md:p-10 lg:p-12 max-w-3xl">

                 {/* Title */}
                    <h1 className="hidden md:block text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-8">
                      <span className="tracking-wider text-white glow-blue-600 px-3 py-1 rounded-lg">Welcome to</span>{" "}
                      <span className="animate-[pulse_3s_ease-in-out_infinite] bg-blue-800/50 text-white border border-white/50 px-1 rounded-lg" style={{WebkitTextStroke: '0.5px white'}}>E-Co FISCO</span>
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









            <div className="bg-transparent rounded-lg p-6 text-gray-700 mb-16">
              <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">Italy is 57th in terms of efficiency of Public Administration</h2>
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
            <div className="relative bg-blue-50 py-12 mb-12 rounded-[40px] mx-4">
              <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="h-16 w-full rounded-t-[40px]">
                  <path className="fill-white" d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z" />
                </svg>
              </div>

              <div className="relative z-10 max-w-[95%] mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-600 mb-4">
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
                      className={`px-4 py-2 rounded-full transition-colors border border-gray-400 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white border-transparent'
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
            <div className="bg-[#eff6ff] py-8 rounded-[40px] mb-12 mx-4">
              <div className="max-w-[95%] mx-auto flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                  
                  {/* Card 1 */}
                  <div className="p-4 rounded-[24px]">
                    <div className="flex flex-col items-center">
                      <img 
                        src={clock}
                        alt="Clock icon" 
                        className="w-8 h-8 mb-2 text-gray-700"
                      />
                      <h3 className="text-lg font-semibold text-gray-700 text-center mb-1">
                        Stress-free documents
                      </h3>
                      <p className="text-gray-700 mb-4 font-poppins text-center">
                        
                        Never-ending waits for your documents will be a thing of the past.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-[24px]">
                    <div className="flex flex-col items-center">
                      <img 
                        src={passport}
                        alt="Passport icon"
                        className="w-8 h-8 mb-2 text-gray-700"
                      />
                      <h3 className="text-lg font-semibold text-gray-700 text-center mb-1">
                        At your side with embassies</h3>
                      <p className="text-gray-700 mb-4 font-poppins text-center">
                        From the first steps at the Embassy to citizenship we are with you.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-[24px]">
                    <div className="flex flex-col items-center">
                      <img 
                        src={language}
                        alt="Languages icon"
                        className="w-8 h-8 mb-2 text-gray-700"
                      />
                      <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
                        Consulting in your language
                      </h3>
                      <p className="text-gray-700 mb-4 font-poppins text-center">
                        We communicate in multiple languages to ensure seamless support.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Native Speaking Lawyers Section */}
            <div className="bg-[#] py-16 rounded-[40px]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-blue-500 mb-4">
                    Native speaking immigration experts
                  </h2>
                  <p className="text-lg text-gray-600">
                    Say goodbye to language barriers, <strong>our immigration consultants speak your language</strong>, so we understand each other better and find the best solution in record time.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Spain</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="Spanish Lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">England</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="English Lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Pakistan</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="Pakistani Lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Morocco</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="Moroccan Lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Portugal</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="Portuguese Lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">India</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="Indian Lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">France</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="French lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">China</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}
                        alt="Chinese Lawyer in Italy"
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
                    </div>
                  </div>

                  <div className="text-center hidden md:block">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Bangladesh</h3>
                    <div className="rounded-[24px] overflow-hidden flex justify-center">
                      <img 
                        src={italy}                    
                        className="w-[35%] border border-gray-500 rounded-[100px]"
                      />
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
                    { name: "Akiko Tanaka", location: "Tokyo, Japan", initials: "AT", review: "E-Co-Fisco made my visa application process incredibly smooth. Their expertise and professional guidance helped me navigate through complex Italian bureaucracy with ease." },
                    { name: "Carlos Silva", location: "São Paulo, Brazil", initials: "CS", review: "Outstanding service! They helped me obtain my work visa in record time. Very professional and knowledgeable team." },
                    { name: "Maria Garcia", location: "Madrid, Spain", initials: "MG", review: "The team at E-Co-Fisco was incredibly helpful throughout my citizenship application process. Highly recommended!" },
                    { name: "John Smith", location: "London, UK", initials: "JS", review: "Excellent support for my residency permit application. Clear communication and great results." },
                    { name: "Sophie Martin", location: "Paris, France", initials: "SM", review: "Their expertise in Italian immigration law is unmatched. Made the whole process stress-free." },
                    { name: "Ahmed Hassan", location: "Cairo, Egypt", initials: "AH", review: "Very professional service. They handled my student visa application perfectly." },
                    { name: "Li Wei", location: "Beijing, China", initials: "LW", review: "Great experience working with E-Co-Fisco. They made the complex simple." },
                    { name: "Anna Kowalski", location: "Warsaw, Poland", initials: "AK", review: "Fantastic support throughout my visa application. Would definitely recommend." }
                  ].map((review, index) => (
                    <div key={index} className="bg-[#eff6ff] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow relative min-h-[300px]">
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

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-16 rounded-[40px]">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left max-w-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Choose the most loved immigration agency in Italy
                    </h2>
                    <p className="text-lg text-blue-100">
                      To avoid making fatal mistakes, find out how we can help you.
                    </p>
                  </div>
                  <div>
                    <a 
                      href="#contact-form"
                      className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors hover:transform hover:translate-y-[-2px]"
                    >
                      Contact us now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-transparent relative">
              <div className="absolute top-0 left-0 w-full overflow-hidden">
                
              </div>
              
              <div className="bg-transparent py-24">
                <div className="relative w-full overflow-hidden mb-16">
                  
                </div>

                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
                  {/* Why Not Choose Us */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Why You Should NOT Choose E-Co-Fisco Immigration Specialists</h3>
                    <p className="text-lg text-gray-600 mb-8">We can't help you if</p>
                    
                    <div className="space-y-4">
                      <details className="border border-gray-200 rounded-lg">
                        <summary className="cursor-pointer p-4 font-semibold flex justify-between items-center">
                          Looking for quick shortcuts?
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                        </summary>
                        <div className="p-4 pt-0">
                          <p>Our process is careful and meticulous, ensuring every detail is perfect. If you are looking for a quick and superficial solution, our agency for foreigners is not the right choice, because we offer a higher level of care and attention.</p>
                        </div>
                      </details>

                      <details className="border border-gray-200 rounded-lg">
                        <summary className="cursor-pointer p-4 font-semibold flex justify-between items-center">
                          You prefer a generic and impersonal service
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                        </summary>
                        <div className="p-4 pt-0">
                          <p>We take the time to understand your specific needs and tailor our approach to you. If you are looking for a standard solution that fits everyone, our law firm for foreigners may not be the right choice.</p>
                        </div>
                      </details>

                      <details className="border border-gray-200 rounded-lg">
                        <summary className="cursor-pointer p-4 font-semibold flex justify-between items-center">
                          You don't want to invest in quality and long-term results
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                        </summary>
                        <div className="p-4 pt-0">
                          <p>We don't offer the cheapest solutions, but we guarantee exceptional value and long-lasting results. If your goal is to reduce costs rather than to achieve the best possible outcome, our foreign law firm may not be the right choice for you.</p>
                        </div>
                      </details>
                    </div>
                  </div>

                  {/* Why Choose Us */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Why You Should Choose E-Co-Fisco Immigration Specialists</h3>
                    <p className="text-lg text-gray-600 mb-8">We will fight for you if</p>

                    <div className="space-y-4">
                      <details className="border border-gray-200 rounded-lg">
                        <summary className="cursor-pointer p-4 font-semibold flex justify-between items-center">
                          Do you want peace of mind by relying on experts?
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                        </summary>
                        <div className="p-4 pt-0">
                          <p>If you are looking for a smooth immigration process, handled with professionalism and attention to detail, our immigration lawyer allows you to focus on your personal and professional goals without unnecessary stress.</p>
                        </div>
                      </details>

                      <details className="border border-gray-200 rounded-lg">
                        <summary className="cursor-pointer p-4 font-semibold flex justify-between items-center">
                          You value your time and want to avoid costly mistakes
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                        </summary>
                        <div className="p-4 pt-0">
                          <p>The paperwork can be complex, but our experience streamlines the process, minimizing delays and errors, so you can get results faster and without unnecessary expense. Our lawyer for foreigners is at your side to guide you through every step.</p>
                        </div>
                      </details>

                      <details className="border border-gray-200 rounded-lg">
                        <summary className="cursor-pointer p-4 font-semibold flex justify-between items-center">
                          You seek precision and efficiency to achieve your goals
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                        </summary>
                        <div className="p-4 pt-0">
                          <p>Whether it's a visa, citizenship or other immigration needs, we offer a structured approach that gets you where you need to be with minimal disruption to your life or business. Our law firm for foreigners is ready to support you in every phase of the process.</p>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
      );};