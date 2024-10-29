import React, { useState } from "react";

const Goal = () => {
  const [homeRange, setHomeRange] = useState([0, 100]);
  const [transportRange, setTransportRange] = useState([0, 100]);
  const [publicTransportRange, setPublicTransportRange] = useState([0, 100]);
  const [foodRange, setFoodRange] = useState([0, 100]);
  const [flightRange, setFlightRange] = useState([0, 100]);
  const [overallLevel, setOverallLevel] = useState("");

  const handleRangeChange = (type, range) => {
    switch (type) {
      case "home":
        setHomeRange(range);
        break;
      case "transport":
        setTransportRange(range);
        break;
      case "publicTransport":
        setPublicTransportRange(range);
        break;
      case "food":
        setFoodRange(range);
        break;
      case "flight":
        setFlightRange(range);
        break;
      default:
        break;
    }
  };

  const calculateOverallLevel = () => {
    const ranges = [
      homeRange,
      transportRange,
      publicTransportRange,
      foodRange,
      flightRange,
    ];
    const maxRange = ranges.reduce((max, range) => Math.max(max, range[1]), 0);

    let level = "";
    if (maxRange <= 100) {
      level = "Level 1 ";
    } else if (maxRange <= 200) {
      level = "Level 2";
    } else if (maxRange <= 300) {
      level = "Level 3";
    } else if (maxRange <= 400) {
      level = "Level 4";
    } else {
      level = "Level 5 ";
    }

    setOverallLevel(level);
  };

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white border border-green-300 rounded-lg shadow-2xl transition-shadow duration-200 mt-40">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Set Your Carbon Goals
      </h1>
      <p className="mb-8 text-gray-700 text-center">
        Define your carbon emissions goals for the upcoming month. Achieve your
        targets to earn rewards!
      </p>

      {/* Range Inputs with Enhanced Styling */}
      {[
        {
          label: "Home Footprint",
          value: homeRange[1],
          handler: (e) =>
            handleRangeChange("home", [0, Number(e.target.value)]),
        },
        {
          label: "Private Transport Footprint",
          value: transportRange[1],
          handler: (e) =>
            handleRangeChange("transport", [0, Number(e.target.value)]),
        },
        {
          label: "Public Transport Footprint",
          value: publicTransportRange[1],
          handler: (e) =>
            handleRangeChange("publicTransport", [0, Number(e.target.value)]),
        },
        {
          label: "Food Footprint",
          value: foodRange[1],
          handler: (e) =>
            handleRangeChange("food", [0, Number(e.target.value)]),
        },
        {
          label: "Flight Footprint",
          value: flightRange[1],
          handler: (e) =>
            handleRangeChange("flight", [0, Number(e.target.value)]),
        },
      ].map(({ label, value, handler }) => (
        <div className="mb-6" key={label}>
          <label className="block mb-2 text-lg font-semibold text-green-700">
            {label}:
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={value}
            onChange={handler}
            className="w-full appearance-none h-2 rounded-lg bg-green-200 accent-green-600" // Background for the track
            style={{
              background: `linear-gradient(to right, #38a169 0%, #38a169 ${
                value / 5
              }%, #e2e8f0 ${value / 5}%, #e2e8f0 100%)`, // Custom gradient
            }}
          />
          <p className="text-sm text-gray-500">{`Current Range: 0 - ${value}`}</p>
        </div>
      ))}

      {/* Call to Action Button */}
      <button
        onClick={calculateOverallLevel}
        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
      >
        Calculate Overall Level
      </button>

      {/* Display Overall Level */}
      {overallLevel && (
        <p className="mt-6 text-xl font-semibold text-green-800 text-center">{`Overall Level: ${overallLevel}`}</p>
      )}
    </div>
  );
};

export default Goal;
