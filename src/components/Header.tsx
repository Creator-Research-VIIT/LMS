import React, { useState } from 'react';
import { Search, User, Menu, X, ShoppingCart, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-purple-600">LearnHub</h1>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
              Explore
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
              Business
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
              Teach
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for anything"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
            </button>
            
            <button className="hidden md:inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
              Log in
            </button>
            
            <button className="hidden md:inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
              Sign up
            </button>

            <button className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
              <Globe className="h-6 w-6" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for anything"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600">
                Explore
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600">
                Categories
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600">
                Business
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600">
                Teach
              </a>
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Log in
                  </button>
                  <button className="flex-1 bg-purple-600 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;