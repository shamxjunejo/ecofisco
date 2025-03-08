import { useState } from 'react';
import { Menu, X, Home, Briefcase, BookOpen, Users } from 'lucide-react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import GuidesPage from './pages/GuidesPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'guides':
        return <GuidesPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">E-Co-Fisco</span>
              </div>
            </div>
            <div className="hidden md:block">
              <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-blue-200 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === 'home'
                    ? 'bg-blue-700 text-white'
                    : 'text-white hover:bg-blue-500'
                } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                <Home className="inline-block mr-2" size={20} />
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('services');
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === 'services'
                    ? 'bg-blue-700 text-white'
                    : 'text-white hover:bg-blue-500'
                } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                <Briefcase className="inline-block mr-2" size={20} />
                Our Services
              </button>
              <button
                onClick={() => {
                  setCurrentPage('guides');
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === 'guides'
                    ? 'bg-blue-700 text-white'
                    : 'text-white hover:bg-blue-500'
                } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                <BookOpen className="inline-block mr-2" size={20} />
                Official Guides
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === 'about'
                    ? 'bg-blue-700 text-white'
                    : 'text-white hover:bg-blue-500'
                } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                <Users className="inline-block mr-2" size={20} />
                Who We Are
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-grow">{renderPage()}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;