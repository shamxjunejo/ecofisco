import guideImage from "../assets/guide.jpg";
import { useState } from 'react';

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: "All", href: "#" },
    { name: "Family Reunification", href: "#" },
    { name: "Residence Permits", href: "#" }, 
    { name: "Italian Citizenship", href: "#" },
    { name: "Entry Visas", href: "#" },
    { name: "Flows Decree", href: "#" },
    { name: "Sanatorium", href: "#" }
  ];

  const blogPosts = [
    {
      title: "Italian Citizenship 2024 – Official Updated Guide",
      category: "Italian Citizenship",
      image: guideImage,
      date: "03/10/2024",
      excerpt: "Everything you need to know about obtaining Italian citizenship in 2024, including requirements, procedures and common pitfalls to avoid.",
      href: "/blog/italian-citizenship-2024",
      author: "Marco Rossi"
    },
    {
      title: "Family Reunification Process Explained",
      category: "Family Reunification", 
      image: guideImage,
      date: "02/10/2024",
      excerpt: "A comprehensive guide to reuniting with your family in Italy - documents needed, timelines and step-by-step procedures.",
      href: "/blog/family-reunification",
      author: "Sofia Bianchi"
    },
    {
      title: "Flow Decree Certification: Updated Official Guide",
      category: "Flows Decree",
      image: guideImage,
      date: "02/03/2024",
      excerpt: "Latest updates on the Flow Decree certification process, including new requirements and deadlines for 2024.",
      href: "/blog/flow-decree-guide",
      author: "Giuseppe Verdi"
    },
    {
      title: "Wrong Flow Decree Nulla Osta: How to Correct it and Get a Visa Immediately",
      category: "Flows Decree",
      image: guideImage,
      date: "12/02/2024",
      excerpt: "Common mistakes in Nulla Osta applications and how to fix them quickly to avoid visa delays.",
      href: "/blog/nulla-osta-correction",
      author: "Anna Ferrari"
    },
    {
      title: "Residence Permit for Study – Official Guide 2023",
      category: "Residence Permits",
      image: guideImage,
      date: "11/07/2023",
      excerpt: "Complete guide for international students seeking to obtain and maintain their study permits in Italy.",
      href: "/blog/study-permit-guide",
      author: "Luca Romano"
    },
    {
      title: "International Protection in Italy 2023: Requirements, Procedure, Appeal",
      category: "Residence Permits",
      image: guideImage,
      date: "10/07/2023",
      excerpt: "Understanding the process of seeking international protection in Italy - from application to appeal.",
      href: "/blog/international-protection",
      author: "Elena Conti"
    }
  ];

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <img 
            src={guideImage} 
            alt="Immigration Blog" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Official Guides Immigration Law in Italy</h1>
            <h3 className="mt-3 text-xl text-white">Get expert advice from our agency for foreigners and stay informed with the latest updates</h3>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 border-gray-300 transition-colors
                ${activeCategory === category.name 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'text-gray-700 bg-gray-100 hover:bg-blue-500 hover:text-white hover:border-blue-500'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
              <a href={post.href} className="block">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <span className="text-sm text-gray-600">By {post.author}</span>
                    </div>
                    <span className="text-blue-600 hover:text-blue-700">Read More »</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}