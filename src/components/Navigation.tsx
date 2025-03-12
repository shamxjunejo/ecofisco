import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, BookOpen, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  setMobileMenuOpen?: (open: boolean) => void;
}

export default function Navigation({ setMobileMenuOpen }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/guide', label: 'Guides', icon: BookOpen },
    { path: '/about', label: 'About', icon: Users }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen?.(false); // Close mobile menu if the function is provided
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col md:flex-row md:items-center transition-all duration-300 ${scrolled ? 'md:py-2' : 'md:py-4'}`}>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`
              relative px-3 py-1.5 rounded-lg text-sm font-medium flex items-center 
              transition-all duration-300 ease-in-out group overflow-hidden
              md:mx-2
              ${currentPath === item.path
                ? 'text-white bg-blue-700 md:bg-blue-700 md:text-white shadow-md'
                : 'text-white hover:bg-blue-600/40'
              }
              ${scrolled ? 'my-1 md:my-0' : 'my-1 md:my-0'}
            `}
          >
            <span className="absolute inset-0 w-0 bg-blue-500/30 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            
            <item.icon className={`mr-2 transition-transform duration-300 group-hover:scale-110 ${currentPath === item.path ? 'text-white' : 'text-blue-200'}`} size={20} />
            
            <span className="relative z-10">{item.label}</span>
            
            {currentPath === item.path && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white transform origin-left"></span>
            )}
          </button>
        ))}

        {/* Contact Us button - only show on desktop */}
        <button 
          onClick={() => navigate('/contact')}
          className={`
            hidden md:inline-block px-5 py-1.5 bg-white text-blue-900 rounded-full text-base font-medium 
            hover:bg-blue-50 transition-all duration-300 ml-4
            hover:shadow-md hover:scale-105 active:scale-95
          `}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}