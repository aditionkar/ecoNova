import React from "react";
import Nav from "../components/Nav";

function CalculatorsNavPage() {
  return (
    <>
      <div className="bg-gradient-to-r from-green-100 to-white min-h-screen flex flex-col items-center py-20">
        <h1 className="text-center text-4xl font-bold text-[#1E5631] mb-4">
          Discover Your Carbon Footprint
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Calculate and understand your impact on the environment.
        </p>

        <Nav className="shadow-lg rounded-lg" />
      </div>
    </>
  );
}

export default CalculatorsNavPage;
