import React from 'react';
import { Link } from 'react-router-dom';

const Cards = () => {
  return (
    <div className="flex justify-center items-center gap-4 p-4 bg-white h-screen">
      <div className="w-80 bg-lime-200 text-black rounded-lg shadow-lg p-6 flex-shrink-0">
        <div className="flex items-center justify-center mb-4">
          <img src="/logo-calculate.png" alt="Calculate" className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Calculate</h2>
        <p className="mb-4">Use this tool to calculate your carbon footprint and understand your impact.</p>
        <button className="bg-black text-lime-200 py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300">
        <Link to='/Calculate'>Get Started</Link>
        </button>
      </div>

      <div className="w-80 bg-lime-200 text-black rounded-lg shadow-lg p-6 flex-shrink-0">
        <div className="flex items-center justify-center mb-4">
          <img src="/logo-credits.png" alt="Get Credits" className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Get Credits</h2>
        <p className="mb-4">Earn credits by participating in eco-friendly activities and track your progress.</p>
        <button className="bg-black text-lime-200 py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300">
        <Link to="/Credits">Learn More</Link>
        </button>
      </div>

      <div className="w-80 bg-lime-200 text-black rounded-lg shadow-lg p-6 flex-shrink-0">
        <div className="flex items-center justify-center mb-4">
          <img src="/logo-ask.png" alt="Ask" className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Ask</h2>
        <p className="mb-4">Have questions? Reach out for more information and get expert advice.</p>
        <button className="bg-black text-lime-200 py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Cards;
