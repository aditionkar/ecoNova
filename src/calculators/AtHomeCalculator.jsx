import React, { useState } from 'react';

const AtHomeCalculator = ({ setFootprint }) => {
  const [electricity, setElectricity] = useState({ amount: '', unit: 'kWh', renewables: false });
  const [naturalGas, setNaturalGas] = useState({ amount: '', unit: 'kWh', renewables: false });
  const [biomass, setBiomass] = useState({ amount: '', unit: 'kWh' });
  const [coal, setCoal] = useState({ amount: '', unit: 'kWh' });
  const [heatingOil, setHeatingOil] = useState({ amount: '', unit: 'kWh' });
  const [lpg, setLPG] = useState({ amount: '', unit: 'kWh' });

  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [individualFootprints, setIndividualFootprints] = useState({});
  const [showTable, setShowTable] = useState(false); // added

  const emissionFactors = {
    electricity: 0.233,
    naturalGas: {
      kWh: 0.185,
      kg: 2.11,
      m3: 2.14,
    },
    biomass: {
      kWh: 0.12,
      kg: 0.08,
    },
    coal: {
      kWh: 0.3,
      kg: 0.37,
    },
    heatingOil: {
      kWh: 0.266,
      kg: 0.28,
      litres: 2.5,
    },
    lpg: {
      kWh: 0.24,
      kg: 1.7,
      litres: 1.7,
    },
  };

  const calculateFootprint = () => {
    let totalFootprint = 0;
    const footprints = {};

    if (electricity.amount) {
      const electricityFootprint = electricity.amount * emissionFactors.electricity;
      totalFootprint += electricityFootprint;
      footprints.electricity = electricityFootprint.toFixed(2);
    }

    if (naturalGas.amount) {
      const factor = emissionFactors.naturalGas[naturalGas.unit];
      const naturalGasFootprint = naturalGas.amount * factor;
      totalFootprint += naturalGasFootprint;
      footprints.naturalGas = naturalGasFootprint.toFixed(2);
    }

    if (biomass.amount) {
      const factor = emissionFactors.biomass[biomass.unit];
      const biomassFootprint = biomass.amount * factor;
      totalFootprint += biomassFootprint;
      footprints.biomass = biomassFootprint.toFixed(2);
    }

    if (coal.amount) {
      const factor = emissionFactors.coal[coal.unit];
      const coalFootprint = coal.amount * factor;
      totalFootprint += coalFootprint;
      footprints.coal = coalFootprint.toFixed(2);
    }

    if (heatingOil.amount) {
      const factor = emissionFactors.heatingOil[heatingOil.unit];
      const heatingOilFootprint = heatingOil.amount * factor;
      totalFootprint += heatingOilFootprint;
      footprints.heatingOil = heatingOilFootprint.toFixed(2);
    }

    if (lpg.amount) {
      const factor = emissionFactors.lpg[lpg.unit];
      const lpgFootprint = lpg.amount * factor;
      totalFootprint += lpgFootprint;
      footprints.lpg = lpgFootprint.toFixed(2);
    }

    setIndividualFootprints(footprints);
    setCarbonFootprint(totalFootprint.toFixed(2));
    setFootprint(totalFootprint.toFixed(2));
    setShowTable(true); // Show table after calculation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFootprint();
  };

  return (
    <div className="container mx-auto p-4 bg-white w-[900px] rounded-lg mt-5">
      <h1 className="text-xl font-bold mb-4 text-center">At Home</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <label className="block mb-2 w-1/3 text-lg">Electricity:</label>
          <input
            type="number"
            placeholder="Amount"
            value={electricity.amount}
            onChange={(e) => setElectricity({ ...electricity, amount: e.target.value })}
            className="border p-2 mr-4 rounded w-1/3 bg-slate-100"
          />
          <select
            value={electricity.unit}
            onChange={(e) => setElectricity({ ...electricity, unit: e.target.value })}
            className="border p-2 rounded w-1/3 bg-slate-100"
          >
            <option value="kWh">kWh</option>
            <option value="MWh">MWh</option>
          </select>
        </div>
        
          
        <div className="mb-4 flex items-center">
          <label className="block mb-2 w-1/3 text-lg">Natural Gas:</label>
          <input
            type="number"
            placeholder="Amount"
            value={naturalGas.amount}
            onChange={(e) => setNaturalGas({ ...naturalGas, amount: e.target.value })}
            className="border p-2 mr-4 rounded w-1/3 bg-slate-100"
          />
          <select
            value={naturalGas.unit}
            onChange={(e) => setNaturalGas({ ...naturalGas, unit: e.target.value })}
            className="border p-2 rounded w-1/3 bg-slate-100"
          >
            <option value="kWh">kWh</option>
            <option value="kg">kg</option>
            <option value="m^3">m³</option>
          </select>
        </div>
  
        <div className="mb-4 flex items-center">
          <label className="block mb-2 w-1/3 text-lg">Biomass:</label>
          <input
            type="number"
            placeholder="Amount"
            value={biomass.amount}
            onChange={(e) => setBiomass({ ...biomass, amount: e.target.value })}
            className="border p-2 mr-4 rounded w-1/3 bg-slate-100"
          />
          <select
            value={biomass.unit}
            onChange={(e) => setBiomass({ ...biomass, unit: e.target.value })}
            className="border p-2 rounded w-1/3 bg-slate-100"
          >
            <option value="kWh">kWh</option>
            <option value="kg">kg</option>
          </select>
        </div>
  
        <div className="mb-4 flex items-center">
          <label className="block mb-2 w-1/3 text-lg">Coal:</label>
          <input
            type="number"
            placeholder="Amount"
            value={coal.amount}
            onChange={(e) => setCoal({ ...coal, amount: e.target.value })}
            className="border p-2 mr-4 rounded w-1/3 bg-slate-100"
          />
          <select
            value={coal.unit}
            onChange={(e) => setCoal({ ...coal, unit: e.target.value })}
            className="border p-2 rounded w-1/3 bg-slate-100"
          >
            <option value="kWh">kWh</option>
            <option value="kg">kg</option>
          </select>
        </div>
  
        <div className="mb-4 flex items-center">
          <label className="block mb-2 w-1/3 text-lg">Heating Oil:</label>
          <input
            type="number"
            placeholder="Amount"
            value={heatingOil.amount}
            onChange={(e) => setHeatingOil({ ...heatingOil, amount: e.target.value })}
            className="border p-2 mr-4 rounded w-1/3 bg-slate-100"
          />
          <select
            value={heatingOil.unit}
            onChange={(e) => setHeatingOil({ ...heatingOil, unit: e.target.value })}
            className="border p-2 rounded w-1/3 bg-slate-100"
          >
            <option value="kWh">kWh</option>
            <option value="kg">kg</option>
            <option value="litres">litres</option>
          </select>
        </div>
  
        <div className="mb-4 flex items-center">
          <label className="block mb-2 w-1/3 text-lg">LPG:</label>
          <input
            type="number"
            placeholder="Amount"
            value={lpg.amount}
            onChange={(e) => setLPG({ ...lpg, amount: e.target.value })}
            className="border p-2 mr-4 rounded w-1/3 bg-slate-100"
          />
          <select
            value={lpg.unit}
            onChange={(e) => setLPG({ ...lpg, unit: e.target.value })}
            className="border p-2 rounded w-1/3 bg-slate-100"
          >
            <option value="kWh">kWh</option>
            <option value="kg">kg</option>
            <option value="litres">litres</option>
          </select>
        </div>

        <div className="flex justify-center mb-4">
          <button type="submit" className="bg-lime-700 hover:bg-lime-600 text-white p-3 rounded-md w-full font-medium transition-all duration-150 ease-in-out shadow-sm focus:outline-none ring-2 ring-offset-2 ring-lime-500">
            Calculate Carbon Footprint
          </button>
        </div>
      </form>

      {showTable && carbonFootprint !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-bold text-center">Carbon Footprint Breakdown</h2>
          <table className="table-auto mt-4 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Fuel Type</th>
                <th className="px-4 py-2">Carbon Footprint (kg CO₂)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(individualFootprints).map(([fuelType, footprint]) => (
                <tr key={fuelType}>
                  <td className="border px-4 py-2 bg-slate-100">{fuelType}</td>
                  <td className="border px-4 py-2 bg-slate-100">{footprint}</td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2 font-bold">Total</td>
                <td className="border px-4 py-2 font-bold">{carbonFootprint}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AtHomeCalculator;
