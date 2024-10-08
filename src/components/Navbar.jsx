import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-green-300 text-3xl font-bold">
              ecoNova
            </Link>
          </div>

          
          <div className="flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all duration-300">
              Home
            </Link>
            <Link
              to="/Calculate"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all duration-300">
              Calculate
            </Link>
            <Link
              to="/Credits"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all duration-300">
              Get Credits
            </Link>
            <Link
              to="/Analyze"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all duration-300">
              Analyze
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
