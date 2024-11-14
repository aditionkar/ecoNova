import React, { useState, useEffect } from "react";

const PrivateTransportCalculator = ({ setFootprint }) => {
  //Added

  const [privateTransportFootprint, setPrivateTransportFootprint] = useState(0); //Added

  const [car1, setCar1] = useState({
    size: "average",
    fuelType: "petrol",
    distance: "",
    unit: "km",
  });

  const [car2, setCar2] = useState({
    size: "average",
    fuelType: "petrol",
    distance: "",
    unit: "km",
  });

  const [motorcycle, setMotorcycle] = useState({
    size: "average",
    fuelType: "petrol",
    distance: "",
    unit: "km",
  });

  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [individualFootprints, setIndividualFootprints] = useState({});

  // Emission factors based on vehicle size and fuel type (in kg CO₂ per km or mile)
  const emissionFactors = {
    petrol: { small: 0.12, average: 0.17, big: 0.25 },
    diesel: { small: 0.15, average: 0.2, big: 0.3 },
    electric: { small: 0.05, average: 0.08, big: 0.12 },
    motorcycle: { small: 0.08, average: 0.1, big: 0.15 },
  };

  const convertToKm = (distance, unit) =>
    unit === "miles" ? distance * 1.60934 : distance;

  const calculateFootprint = () => {
    const vehicles = [
      { label: "Car 1", data: car1 },
      { label: "Car 2", data: car2 },
      { label: "Motorcycle", data: motorcycle },
    ];

    let totalFootprint = 0;
    const footprints = {};

    vehicles.forEach((vehicle) => {
      const { data, label } = vehicle;
      if (data.distance) {
        let factor;
        if (data === motorcycle) {
          factor = emissionFactors["motorcycle"][data.size];
        } else {
          factor = emissionFactors[data.fuelType][data.size];
        }
        const distanceInKm = convertToKm(Number(data.distance), data.unit);
        const footprint = distanceInKm * factor;
        totalFootprint += footprint;
        footprints[label] = footprint.toFixed(2);
      }
    });

    setIndividualFootprints(footprints);
    setCarbonFootprint(totalFootprint.toFixed(2));
    setPrivateTransportFootprint(totalFootprint.toFixed(2)); //Added
  };

  useEffect(() => {
    //Added
    setFootprint(privateTransportFootprint);
  }, [privateTransportFootprint, setFootprint]);

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFootprint();
  };

  const renderVehicleForm = (vehicle, setVehicle, label) => (
    <div className="mb-4">
      <div className="flex">
        <h3 className="text-base  mb-2 w-1/5">{label}</h3>
        <div className="inline">
          <label className="block mb-2">Vehicle Size:</label>
          <select
            value={vehicle.size}
            onChange={(e) => setVehicle({ ...vehicle, size: e.target.value })}
            className="border p-2 mb-2 rounded ml-1 bg-slate-100"
          >
            <option value="small">Small</option>
            <option value="average">Average</option>
            <option value="big">Big</option>
          </select>
        </div>

        <div className="inline ml-10">
          <label className="block mb-2 ml-2">Fuel Type:</label>
          <select
            value={vehicle.fuelType}
            onChange={(e) =>
              setVehicle({ ...vehicle, fuelType: e.target.value })
            }
            className="border p-2 mb-2 bg-slate-100 rounded"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="inline ml-10">
          <label className="block mb-2">Distance Traveled:</label>
          <input
            type="number"
            placeholder="Enter distance"
            value={vehicle.distance}
            onChange={(e) =>
              setVehicle({ ...vehicle, distance: e.target.value })
            }
            className="border p-2 mb-2 mr-2 bg-slate-100 rounded"
          />
          <select
            value={vehicle.unit}
            onChange={(e) => setVehicle({ ...vehicle, unit: e.target.value })}
            className="border p-2 bg-slate-100 rounded"
          >
            <option value="km">Kilometers</option>
            <option value="miles">Miles</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 bg-white w-[900px] rounded-lg mt-5">
      <h1 className="text-xl font-bold mb-4 text-center">Private Transport </h1>
      <form onSubmit={handleSubmit}>
        {renderVehicleForm(car1, setCar1, "Car 1")}
        {renderVehicleForm(car2, setCar2, "Car 2")}
        {renderVehicleForm(motorcycle, setMotorcycle, "Motorcycle")}

        <button
          type="submit"
          className="bg-lime-700 hover:bg-lime-600 text-white p-3 rounded-md w-full font-medium transition-all duration-150 ease-in-out shadow-sm focus:outline-none ring-2 ring-offset-2 ring-lime-500"
        >
          Calculate Carbon Footprint
        </button>
      </form>

      {carbonFootprint !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4 text-center">
            Carbon Footprint Breakdown
          </h2>
          <table className="table-auto mt-4 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Vehicle</th>
                <th className="px-4 py-2">Carbon Footprint (kg CO₂)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(individualFootprints).map(
                ([vehicle, footprint]) => (
                  <tr key={vehicle}>
                    <td className="border px-4 py-2 bg-slate-100">{vehicle}</td>
                    <td className="border px-4 py-2 bg-slate-100">
                      {footprint}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td className="border px-4 py-2 font-bold">Total</td>
                <td className="border px-4 py-2 font-bold">
                  {carbonFootprint} kg CO₂
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrivateTransportCalculator;
