export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Contacts
        </h1>
        <h2 className="mt-3 text-2xl font-semibold text-gray-800">
          Looking for assistance for foreigners?
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-gray-600 text-lg">
          We are experts in immigration and Tax consultant.
        </p>
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
          
            <form action="https://formspree.io/f/mldjenqp" method="POST" className="space-y-4 p-8" onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                  'Accept': 'application/json'
                }
              }).then(response => {
                if (response.ok) {
                  const dialog = document.createElement('div');
                  dialog.innerHTML = `
                    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
                        <div class="flex justify-center mb-4">
                          <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-bold text-center mb-2">Massage</h3>
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
                } else {
                  const dialog = document.createElement('div');
                  dialog.innerHTML = `
                    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
                        <div class="flex justify-center mb-4">
                          <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-bold text-center mb-2">Massage</h3>
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
              }).catch(_error => {
                const dialog = document.createElement('div');
                dialog.innerHTML = `
                  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
                      <div class="flex justify-center mb-4">
                        <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold text-center mb-2">Massage</h3>
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
              });
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

      {/* WhatsApp Section */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <h3 className="text-xl font-medium text-gray-900 mb-6">
          Or write to us on Whatsapp
        </h3>
        <a
          href="https://wa.me/393516737374"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-200"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </a>
      </div>
      </div>
  )}