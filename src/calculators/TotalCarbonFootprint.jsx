import React, { useState, useEffect } from 'react';
import AtHomeCalculator from './AtHomeCalculator';
import PrivateTransportCalculator from './PrivateTransCalculator';
import PublicTransportCalculator from './PublicTransCalculator';
import FoodCalculator from './FoodCalculator';
import FlightCalculator from './FlightCalculator';
import axios from 'axios'; // or use fetch

const TotalCarbonFootprint = () => {
  const [homeFootprint, setHomeFootprint] = useState(0);
  const [privateTransportFootprint, setPrivateTransportFootprint] = useState(0);
  const [publicTransportFootprint, setPublicTransportFootprint] = useState(0);
  const [foodFootprint, setFoodFootprint] = useState(0);
  const [flightFootprint, setFlightFootprint] = useState(0);
  const [totalFootprint, setTotalFootprint] = useState(0);

  // Function to calculate total footprint
  const calculateTotalFootprint = () => {
    const total = 
      Number(homeFootprint) + 
      Number(privateTransportFootprint) + 
      Number(publicTransportFootprint) + 
      Number(flightFootprint) + 
      Number(foodFootprint);
      
    setTotalFootprint(total.toFixed(2));
  };

  // Function to save footprint data
  const saveFootprintData = () => {
    const footprintData = {
      homeFootprint: Number(homeFootprint),
      privateTransportFootprint: Number(privateTransportFootprint),
      publicTransportFootprint: Number(publicTransportFootprint),
      foodFootprint: Number(foodFootprint),
      flightFootprint: Number(flightFootprint),
      totalFootprint: Number(totalFootprint)
    };
  
    axios.post('http://localhost:8080/api/footprints/save', footprintData)
      .then(response => {
        console.log('Data saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving data:', error.response ? error.response.data : error.message);
      });
  };
  

  // Update total footprint whenever individual footprints change
  useEffect(() => {
    calculateTotalFootprint();
  }, [homeFootprint, privateTransportFootprint, publicTransportFootprint, foodFootprint, flightFootprint]);

  // Save data when total footprint is calculated
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Total Carbon Footprint Calculator</h1>

      <div className="mb-8">
      
      
        <AtHomeCalculator setFootprint={setHomeFootprint} />
        <PrivateTransportCalculator setFootprint={setPrivateTransportFootprint} />
        <PublicTransportCalculator setFootprint={setPublicTransportFootprint} />
        <FoodCalculator setFootprint={setFoodFootprint} />
        <FlightCalculator setFootprint={setFlightFootprint} />
        
      </div>

      <div className="mt-4 p-4 bg-green-100">
        <h2 className="text-lg font-bold">Total Carbon Footprint:</h2>
        <p>{totalFootprint} kg CO₂</p>
      </div>

      <button onClick={saveFootprintData} className="bg-blue-500 text-white px-4 py-2">
        Save Footprint Data
      </button>

    </div>
  );
};

export default TotalCarbonFootprint;
