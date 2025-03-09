import { Home, Briefcase, BookOpen, Users } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentPage('home')}
          className={`${
            currentPage === 'home'
              ? 'bg-blue-700 text-white'
              : 'text-white hover:bg-blue-500'
          } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
        >
          <Home className="mr-2" size={20} />
          Home
        </button>
        <button
          onClick={() => setCurrentPage('services')}
          className={`${
            currentPage === 'services'
              ? 'bg-blue-700 text-white'
              : 'text-white hover:bg-blue-500'
          } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
        >
          <Briefcase className="mr-2" size={20} />
          Our Services
        </button>
        <button
          onClick={() => setCurrentPage('guides')}
          className={`${
            currentPage === 'guides'
              ? 'bg-blue-700 text-white'
              : 'text-white hover:bg-blue-500'
          } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
        >
          <BookOpen className="mr-2" size={20} />
          Official Guides
        </button>
        <button
          onClick={() => setCurrentPage('about')}
          className={`${
            currentPage === 'about'
              ? 'bg-blue-700 text-white'
              : 'text-white hover:bg-blue-500'
          } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
        >
          <Users className="mr-2" size={20} />
          Who We Are
        </button>
        <button 
          onClick={() => {
          }}
          className="px-6 py-2 bg-white text-blue-900 rounded-full text-base font-normal hover:bg-blue-50 transition-colors"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}