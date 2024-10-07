import React, { useState } from 'react';

const Goal = () => {
  const [homeRange, setHomeRange] = useState([0, 100]);
  const [transportRange, setTransportRange] = useState([0, 100]);
  const [publicTransportRange, setPublicTransportRange] = useState([0, 100]);
  const [foodRange, setFoodRange] = useState([0, 100]);
  const [flightRange, setFlightRange] = useState([0, 100]);
  const [overallLevel, setOverallLevel] = useState('');

  const handleRangeChange = (type, range) => {
    switch (type) {
      case 'home':
        setHomeRange(range);
        break;
      case 'transport':
        setTransportRange(range);
        break;
      case 'publicTransport':
        setPublicTransportRange(range);
        break;
      case 'food':
        setFoodRange(range);
        break;
      case 'flight':
        setFlightRange(range);
        break;
      default:
        break;
    }
  };

  const calculateOverallLevel = () => {
    const ranges = [homeRange, transportRange, publicTransportRange, foodRange, flightRange];
    const maxRange = ranges.reduce((max, range) => Math.max(max, range[1]), 0);
    
    let level = '';
    if (maxRange <= 100) {
      level = 'Level 1 (Most Eco-Friendly)';
    } else if (maxRange <= 200) {
      level = 'Level 2';
    } else if (maxRange <= 300) {
      level = 'Level 3';
    } else if (maxRange <= 400) {
      level = 'Level 4';
    } else {
      level = 'Level 5 (Least Eco-Friendly)';
    }

    setOverallLevel(level);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-green-100 border border-green-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Choose Your Goals</h1>
      <p className="mb-4">
        Set your goals for carbon emissions for the next month. If you achieve your goal, you'll earn credits!
      </p>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Home Footprint:</label>
        <input
          type="range"
          min="0"
          max="500"
          value={homeRange[1]}
          onChange={(e) => handleRangeChange('home', [0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm">{`Range: 0 - ${homeRange[1]}`}</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Private Transport Footprint:</label>
        <input
          type="range"
          min="0"
          max="500"
          value={transportRange[1]}
          onChange={(e) => handleRangeChange('transport', [0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm">{`Range: 0 - ${transportRange[1]}`}</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Public Transport Footprint:</label>
        <input
          type="range"
          min="0"
          max="500"
          value={publicTransportRange[1]}
          onChange={(e) => handleRangeChange('publicTransport', [0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm">{`Range: 0 - ${publicTransportRange[1]}`}</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Food Footprint:</label>
        <input
          type="range"
          min="0"
          max="500"
          value={foodRange[1]}
          onChange={(e) => handleRangeChange('food', [0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm">{`Range: 0 - ${foodRange[1]}`}</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Flight Footprint:</label>
        <input
          type="range"
          min="0"
          max="500"
          value={flightRange[1]}
          onChange={(e) => handleRangeChange('flight', [0, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm">{`Range: 0 - ${flightRange[1]}`}</p>
      </div>
      <button
        onClick={calculateOverallLevel}
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        Calculate Overall Level
      </button>
      {overallLevel && (
        <p className="mt-4 text-lg font-semibold">{`Overall Level: ${overallLevel}`}</p>
      )}
    </div>
  );
};

export default Goal;
