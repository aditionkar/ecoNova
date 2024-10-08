import React, { useContext } from 'react';  // Add useContext hook
import axios from 'axios'; // or use fetch
import Nav from '../components/Nav';
import FlightCalculator from '../calculators/FlightCalculator'; // Ensure this path is correct
import { FootprintContext } from '../contexts/FootprintContext'; // Import context

const FlightCalcPage = () => {
  // Use the context to get the footprints and setter functions
  const { 
    homeFootprint, 
    privateTransportFootprint, 
    publicTransportFootprint,  
    foodFootprint, 
    flightFootprint,
    setFlightFootprint, 
    totalFootprint 
  } = useContext(FootprintContext); // Make sure to use the context here

  // Function to save footprint data to the backend
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

  return (
    <div className="container mx-auto p-4">
      <Nav/>
      {/*<h1 className="text-2xl font-bold mb-4">Flight Carbon Footprint Calculator</h1> */}

      <div className="mb-8">
        {/* Flight footprint input component */}
        <FlightCalculator setFootprint={setFlightFootprint} />
      </div>

      {/* Display the total footprint */}
      <div className="mt-4 p-4 bg-green-100">
        <h2 className="text-lg font-bold">Total Carbon Footprint:</h2>
        <p>{totalFootprint} kg CO₂</p>
      </div>

      {/* Save button to store footprint data in the database */}
      <button onClick={saveFootprintData} className="bg-blue-500 text-white px-4 py-2">
        Save Footprint Data
      </button>

    </div>
  );
};

export default FlightCalcPage;
