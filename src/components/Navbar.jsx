import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#32CD32] sticky top-[40px] mt-10 mx-32 z-50 rounded-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="text-black text-3xl font-bold">
              ecoNova
            </Link>
          </div>

          
          <div className="flex space-x-8 items-center">
            <Link
              to="/"
              className="text-black hover:font-bold px-3 py-2 rounded-md text-xl font-normal ">
              Home
            </Link>
            <Link
              to="/Calculate"
              className="text-black hover:font-bold px-3 py-2 rounded-md text-xl font-normal ">
              Calculate
            </Link>
            <Link
              to="/Credits"
              className="text-black hover:font-bold px-3 py-2 rounded-md text-xl ffont-normal ">
              Get Credits
            </Link>
            <Link
              to="/Analyze"
              className="text-black hover:font-bold px-3 py-2 rounded-md text-xl font-normal ">
              Analyze
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
