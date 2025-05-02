import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import GuidesPage from './pages/GuidesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ResidencePermitPage from './pages/ResidencePermitPage';
import AppointmentBooking from './pages/AppointmentBooking';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import logo from "./assets/logo.svg";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Check if we're on a dashboard page
  const isDashboardPage = location.pathname.startsWith('/dashboard') || 
                         location.pathname.startsWith('/profile') || 
                         location.pathname.startsWith('/notifications') || 
                         location.pathname.startsWith('/documents') || 
                         location.pathname.startsWith('/assistance') || 
                         location.pathname.startsWith('/report');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation - Only show if not on dashboard */}
      {!isDashboardPage && (
        <nav className={`${scrolled ? 'bg-blue-600/40' : 'bg-blue-600'} backdrop-blur-sm md:sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0 md:flex-shrink basis-1/3 md:basis-auto">
                <a href="/" className="flex items-center">
                  <img 
                    src={logo} 
                    alt="E-Co Fisco" 
                    className="h-12 w-auto transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Navigation setMobileMenuOpen={setMobileMenuOpen} />
              </div>

              {/* Mobile Navigation */}
              <div className="flex md:hidden items-center justify-between basis-2/3">
                <div className="flex justify-center w-full">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white hover:text-blue-200 focus:outline-none"
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
                <div className="flex justify-end w-full">
                  <button 
                    onClick={() => navigate('/contact')}
                    className="inline-block px-4 py-1.5 bg-white text-blue-900 rounded-full text-sm font-medium hover:bg-blue-50 transition-all duration-300"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-blue-700">
              <Navigation setMobileMenuOpen={setMobileMenuOpen} />
            </div>
          )}
        </nav>
      )}

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={renderPage()} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/guide" element={<GuidesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/residence-permit-request" element={<ResidencePermitPage />} />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/notifications" element={<Dashboard />} />
          <Route path="/documents" element={<Dashboard />} />
          <Route path="/assistance" element={<Dashboard />} />
          <Route path="/report" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer - Only show if not on dashboard */}
      {!isDashboardPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;