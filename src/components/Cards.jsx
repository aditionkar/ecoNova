import React from 'react';
import { Link } from 'react-router-dom';

const Cards = () => {
  return (
    <div className="flex mt-20 ml-32 font-ubuntu">
        <div className="flex flex-col h-full w-[630px]">
          <Link to="/calculate" className="bg-[#1E5631] h-36 w-full mt-10 ml-10 flex flex-col justify-center pl-6 rounded-xl transition-transform duration-200 hover:scale-105 hover:border-2 border-[#0c301d]  border-2  transform">
            <span className="text-4xl font-semibold text-[#F2F6E9]">Calculate</span>
            <h4 className="text-[#f5f8cc] text-lg mt-4 pr-5">Use this tool to calculate your carbon footprint and understand your impact.</h4>
          </Link>
          <Link to="/credits" className="bg-[#4C9A2A] h-36 w-full mt-12 ml-10 flex flex-col justify-center pl-6 rounded-xl transition-transform duration-200 hover:scale-105 hover:border-2 border-[#3B7A22]  border-2  transform">
            <span className="text-4xl font-semibold text-[#f3fcdd]">Get Credits</span>
            <h4 className="text-[#f6fabc] text-lg mt-4">Earn credits by participating in eco-friendly activities and track your progress.</h4>
          </Link>
          <Link to="/analyze" className="bg-[#7cc220] h-36 w-full mt-12 ml-10 flex flex-col justify-center pl-6 rounded-xl transition-transform duration-200 hover:scale-105 hover:border-2 border-[#548B12] border-2 transform">
            <span className="text-4xl font-semibold text-[#eafac5]">Analyze your data</span>
            <h4 className="text-white text-lg mt-4">Check out which area you should work on to reduce your footprint.</h4>
          </Link>
        </div>
        <div className="h-full w-[500px] flex items-center justify-center">
          <img src="howbig.png" alt="How big is your Carbon Footprint?" className="h-[600px] w-[400px]" />
        </div>
      </div>
  );
};

export default Cards;
