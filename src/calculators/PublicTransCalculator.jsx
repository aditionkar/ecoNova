import React, { useState, useEffect } from 'react';

const PublicTransportCalculator = ({ setFootprint }) => {  //Added

  const [publicTransportFootprint, setPublicTransportFootprint] = useState(0); //Added

  const [distances, setDistances] = useState({
    bus: { distance: '', unit: 'km' },
    train: { distance: '', unit: 'km' },
    taxi: { distance: '', unit: 'km' },
    autotaxi: { distance: '', unit: 'km' },
    localTrain: { distance: '', unit: 'km' },
    nationalTrain: { distance: '', unit: 'km' },
    metro: { distance: '', unit: 'km' },
  });

  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [individualFootprints, setIndividualFootprints] = useState({});

  // Emission factors (in kg CO₂ per km)
  const emissionFactors = {
    bus: 0.1,
    train: 0.05,
    taxi: 0.25,
    autotaxi: 0.2,
    localTrain: 0.07,
    nationalTrain: 0.06,
    metro: 0.08,
  };

  // Convert miles to kilometers
  const milesToKm = (miles) => miles * 1.60934;

  // Calculate footprint for each transport type
  const calculateFootprint = () => {
    let totalFootprint = 0;
    const footprints = {};

    Object.keys(distances).forEach((transport) => {
      const { distance, unit } = distances[transport];
      const distanceInKm = unit === 'miles' ? milesToKm(Number(distance)) : Number(distance);
      const factor = emissionFactors[transport];
      const footprint = distanceInKm * factor;

      if (!isNaN(footprint) && distanceInKm > 0) {
        footprints[transport] = footprint.toFixed(2);
        totalFootprint += footprint;
      }
    });

    setIndividualFootprints(footprints);
    setCarbonFootprint(totalFootprint.toFixed(2));
    setPublicTransportFootprint(totalFootprint.toFixed(2)); //Added
  };

  useEffect(() => {        //Added
    setFootprint(publicTransportFootprint);
  }, [publicTransportFootprint, setFootprint]);

  const handleChange = (e, transport) => {
    const { name, value } = e.target;
    setDistances({
      ...distances,
      [transport]: {
        ...distances[transport],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFootprint();
  };

  return (
    <div className="container mx-auto p-4 bg-white w-[900px] rounded-lg mt-5">
      <h1 className="text-xl font-bold mb-4 text-center">Public Transport </h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(distances).map((transport) => (
          <div key={transport} className="mb-4 flex">
            <label className="block mb-2 w-1/3">
              {transport.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^\w/, c => c.toUpperCase())}:
            </label>
            <input
              type="number"
              name="distance"
              placeholder="Distance"
              value={distances[transport].distance}
              onChange={(e) => handleChange(e, transport)}
              className="border p-2 mr-2 w-1/3 bg-slate-100 rounded"
            />
            <select
              name="unit"
              value={distances[transport].unit}
              onChange={(e) => handleChange(e, transport)}
              className="border p-2 mr-2 w-1/3 bg-slate-100 rounded"
            >
              <option value="km">km</option>
              <option value="miles">miles</option>
            </select>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-lime-700 hover:bg-lime-600 text-white p-3 rounded-md w-full font-medium transition-all duration-150 ease-in-out shadow-sm focus:outline-none ring-2 ring-offset-2 ring-lime-500"
        >
          Calculate Carbon Footprint
        </button>
      </form>

      {carbonFootprint !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4 text-center">Carbon Footprint Breakdown</h2>
          <table className="table-auto mx-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Transport</th>
                <th className="border px-4 py-2">Carbon Footprint (kg CO₂)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(individualFootprints).map(([transport, footprint]) => (
                <tr key={transport}>
                  <td className="border px-4 py-2 capitalize">{transport}</td>
                  <td className="border px-4 py-2">{footprint}</td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2 font-bold">Total</td>
                <td className="border px-4 py-2 font-bold">{carbonFootprint} kg CO₂</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PublicTransportCalculator;