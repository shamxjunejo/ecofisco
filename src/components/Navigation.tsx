import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, BookOpen, Users, User, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

interface NavigationProps {
  setMobileMenuOpen?: (open: boolean) => void;
}

export default function Navigation({ setMobileMenuOpen }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/guide', label: 'Guides', icon: BookOpen },
    { path: '/about', label: 'About', icon: Users }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen?.(false);
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

        <div className="hidden md:flex items-center ml-auto space-x-4">
          {/* Contact Us button */}
          <button 
            onClick={() => navigate('/contact')}
            className={`
              px-5 py-1.5 bg-white text-blue-900 rounded-full text-base font-medium 
              hover:bg-blue-50 transition-all duration-300
              hover:shadow-md hover:scale-105 active:scale-95
            `}
          >
            Contact Us
          </button>

          {/* User Profile button with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => user ? setShowDropdown(!showDropdown) : navigate('/login')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <User size={20} />
            </button>

            {/* Dropdown menu */}
            {user && showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/dashboard?screen=profile');
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
                >
                  <UserCircle size={16} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu user button */}
        <div className="md:hidden mt-4">
          <button
            onClick={() => navigate(user ? '/profile' : '/login')}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-white hover:bg-blue-600/40 rounded-lg transition-colors"
          >
            <User size={18} />
            <span>{user ? 'Profile' : 'Login'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}