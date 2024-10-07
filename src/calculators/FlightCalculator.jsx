import React, { useState, useEffect } from 'react';

const FlightCalculator = ({ setFootprint }) => {  //Added

  const [flights, setFlights] = useState([{ distance: '', class: 'economy' }]);
  const [footprints, setFootprints] = useState([]);
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const [flightFootprint, setFlightFootprint] = useState(0);  //Added

  // Define emission factors (in kg CO₂ per km)
  const emissionFactors = {
    economy: 0.115,  // kg CO₂ per km
    business: 0.217,
    first: 0.280,
  };

  const handleFlightChange = (index, e) => {
    const newFlights = [...flights];
    newFlights[index][e.target.name] = e.target.value;
    setFlights(newFlights);
  };

  const addFlight = () => {
    setFlights([...flights, { distance: '', class: 'economy' }]);
  };

  const removeFlight = (index) => {
    setFlights(flights.filter((_, i) => i !== index));
  };

  const calculateFootprint = () => {
    let totalFootprint = 0;
    const newFootprints = [];

    flights.forEach((flight, index) => {
      const { distance, class: travelClass } = flight;
      const factor = emissionFactors[travelClass];
      const footprint = distance ? distance * factor : 0;
      newFootprints.push({ index: index + 1, footprint: footprint.toFixed(2) });
      totalFootprint += footprint;
    });

    setFootprints(newFootprints);
    setCarbonFootprint(totalFootprint.toFixed(2));
    setFlightFootprint(totalFootprint.toFixed(2));   //Added
  };

  useEffect(() => {        //Added
    setFootprint(flightFootprint);
  }, [flightFootprint, setFootprint]);

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFootprint();
  };

  return (
    <div className="container mx-auto p-4 bg-white w-[900px] rounded-lg mt-5">
      <h1 className="text-xl font-bold mb-4 text-center">In the air - Flight </h1>
      <form onSubmit={handleSubmit}>
        {flights.map((flight, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h2 className="text-lg font-semibold mb-2">Flight {index + 1}</h2>
            <div className="mb-4">
              <label className="block mb-2">Distance (km):</label>
              <input
                type="number"
                name="distance"
                placeholder="Distance"
                value={flight.distance}
                onChange={(e) => handleFlightChange(index, e)}
                className="border p-2 w-full bg-slate-50"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Class:</label>
              <select
                name="class"
                value={flight.class}
                onChange={(e) => handleFlightChange(index, e)}
                className="border p-2 w-full bg-slate-100"
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => removeFlight(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove Flight
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFlight}
          className="bg-green-600 text-white p-2 rounded mb-4"
        >
          Add Another Flight
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mx-auto block"
        >
          Calculate Carbon Footprint
        </button>
      </form>

      {carbonFootprint !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2 text-center">Carbon Footprint Details</h2>
          <table className="mx-auto bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Flight</th>
                <th className="border px-4 py-2">Footprint (kg CO₂)</th>
              </tr>
            </thead>
            <tbody>
              {footprints.map(({ index, footprint }) => (
                <tr key={index}>
                  <td className="border px-4 py-2">Flight {index}</td>
                  <td className="border px-4 py-2">{footprint}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td colSpan="1" className="border px-4 py-2 text-right">Total</td>
                <td className="border px-4 py-2">{carbonFootprint} kg CO₂</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightCalculator;