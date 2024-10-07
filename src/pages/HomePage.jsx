import React from 'react';
import Nav from "../components/Nav";
import Cards from '../components/Cards';


const HomePage = () => {
  return (
    <>
    <div className="bg-white text-gray-200 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Left side - Quote and Description */}
        <div className="md:w-1/2 space-y-4 text-left">
          <h1 className="text-5xl font-bold text-green-400">
          How big is your environmental footprint?
          </h1>
          <p className="text-lg text-black">
            Embrace the journey of building your own path, one step at a time.
          </p>
        </div>

        {/* Right side - Image */}
        <div className="md:w-3/4">
          <img 
            src="/earth.jpeg" 
            alt="Inspiration" 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
    <Nav/>
    <Cards/>
    </>
  );
};

export default HomePage;
