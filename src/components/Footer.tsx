import it from "../assets/it.svg";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import whatsapp from "../assets/whatsapp.png";
import footer_l from "../assets/logo_f.png";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 mt-16 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Social */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img src={footer_l} alt="Logo" className="h-32 w-auto" />
            <div className="-mt-6 text-center md:text-left">
              <p className="text-gray-600 mt-0">Immigration & Tax Consultant</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-600 mb-3 font-medium">Follow us</p>
            <div className="flex space-x-5">
              <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors duration-200" aria-label="Facebook">
                <img src={facebook} alt="Facebook" className="w-6 h-6 hover:scale-110 transition-transform [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(98%)_saturate(1900%)_hue-rotate(206deg)_brightness(97%)_contrast(95%)]" />
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors duration-200" aria-label="X (Twitter)">
                <img src={twitter} alt="Twitter" className="w-6 h-6 hover:scale-110 transition-transform [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(98%)_saturate(1900%)_hue-rotate(206deg)_brightness(97%)_contrast(95%)]" />
              </a>
              <a href="#" className="text-blue-800 hover:text-blue-900 transition-colors duration-200" aria-label="LinkedIn">
                <img src={linkedin} alt="LinkedIn" className="w-6 h-6 hover:scale-110 transition-transform [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(98%)_saturate(1900%)_hue-rotate(206deg)_brightness(97%)_contrast(95%)]" />
              </a>
              <a href="https://wa.me/393516737374" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900 transition-colors duration-200" aria-label="WhatsApp">
                <img src={whatsapp} alt="WhatsApp" className="w-6 h-6 hover:scale-110 transition-transform [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(98%)_saturate(1900%)_hue-rotate(206deg)_brightness(97%)_contrast(95%)]" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="py-8 border-t border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-medium text-blue-800 mb-4">Contact Us</h4>
            <address className="not-italic text-gray-600 text-sm space-y-2">
              <p>Khadija Zouine</p>
              <p>Corso Giulio Cesare 118C</p>
              <p>Turin, 10154</p>
              <p>VAT: 12744510012</p>
            </address>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-medium text-blue-800 mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Privacy & Cookie Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Terms and Conditions</a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Contact</a>
            </nav>
          </div>
          
          {/* Language */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-medium text-blue-800 mb-4">Language</h4>
            <div className="flex space-x-3">
              <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors">
                <img src={it} className="h-5 w-7 shadow-sm" />
                
              </a>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="py-6 border-t border-blue-100">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            E-Co Fisco Immigration Specialists is an agency for foreigners specialized in administrative assistance and advice for immigration in Italy and, when necessary, puts you in touch with an immigration expert. The information provided on this website is for general informational purposes only and does not constitute legal advice. We recommend that you consult directly with an immigration attorney working with us for specific advice regarding your individual situation.
          </p>
        </div>
        
        {/* Copyright */}
        <div className="py-4 border-t border-blue-100 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} E-Co Fisco Immigration & Tax Consultant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}