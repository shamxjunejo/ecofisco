import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, BookOpen, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col md:flex-row md:space-x-1 transition-all duration-300 ${scrolled ? 'md:py-2' : 'md:py-4'}`}>
        {[
          { path: '/', label: 'Home', icon: Home },
          { path: '/services', label: 'Our Services', icon: Briefcase },
          { path: '/guide', label: 'Official Guides', icon: BookOpen },
          { path: '/about', label: 'Who We Are', icon: Users }
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`
              relative px-3 py-1.5 rounded-lg text-sm font-medium flex items-center 
              transition-all duration-300 ease-in-out group overflow-hidden
              ${currentPath === item.path
                ? 'bg-blue-700 text-white shadow-md'
                : 'text-white hover:bg-blue-600/40'
              }
              ${scrolled ? 'my-0.5 md:my-0' : 'my-0.5 md:my-0'}
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

        <button 
          onClick={() => navigate('/contact')}
          className={`
            inline-block px-5 py-1.5 bg-white text-blue-900 rounded-full text-base font-medium 
            hover:bg-blue-50 transition-all duration-300 md:ml-1 w-fit mx-auto md:mx-0
            hover:shadow-md hover:scale-105 active:scale-95
            ${scrolled ? 'my-0.5 md:my-0' : 'my-0.5 md:my-0'}
          `}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}