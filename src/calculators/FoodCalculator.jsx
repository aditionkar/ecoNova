import React, { useState,useEffect } from 'react';

const FoodCalculator = ({ setFootprint }) => {     //Added

  const [foodFootprint, setFoodFootprint] = useState(0);  //Added

  const [foodConsumption, setFoodConsumption] = useState({
    beef: { amount: '', unit: 'kg' },
    pork: { amount: '', unit: 'kg' },
    chicken: { amount: '', unit: 'kg' },
    milk: { amount: '', unit: 'liters' },
    eggs: { amount: '', unit: 'dozen' },
    vegetables: { amount: '', unit: 'kg' },
    fruits: { amount: '', unit: 'kg' },
    rice: { amount: '', unit: 'kg' },
  });

  const [footprints, setFootprints] = useState({});
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  // Define emission factors (in kg CO₂ per unit)
  const emissionFactors = {
    beef: 27, // kg CO₂ per kg
    pork: 12,
    chicken: 6,
    milk: 1.1, // kg CO₂ per liter
    eggs: 4.8, // kg CO₂ per dozen
    vegetables: 0.5,
    fruits: 0.8,
    rice: 1.6,
  };

  // Convert liters to kg for milk if needed
  const litersToKg = (liters) => liters * 1.1; // Assuming 1 liter of milk weighs approximately 1.1 kg

  // Calculate footprint for each food item and total footprint
  const calculateFootprint = () => {
    let totalFootprint = 0;
    const newFootprints = {};

    Object.keys(foodConsumption).forEach((food) => {
      const { amount, unit } = foodConsumption[food];
      const factor = emissionFactors[food];
      let amountInKg = amount;

      if (food === 'milk') {
        amountInKg = unit === 'liters' ? litersToKg(amount) : amount;
      } else if (unit === 'dozen') {
        amountInKg = amount * 0.6; // Approximate weight of a dozen eggs in kg
      }

      const footprint = amountInKg * factor;
      if (footprint > 0) {  // Only include non-zero footprints
        newFootprints[food] = footprint.toFixed(2);
        totalFootprint += footprint;
      }
    });

    setFootprints(newFootprints);
    setCarbonFootprint(totalFootprint.toFixed(2));
    setFoodFootprint(totalFootprint.toFixed(2));   //Added
  };

  useEffect(() => {        //Added
    setFootprint(foodFootprint);
  }, [foodFootprint, setFootprint]);

  const handleChange = (e, food) => {
    const { name, value } = e.target;
    setFoodConsumption({
      ...foodConsumption,
      [food]: {
        ...foodConsumption[food],
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
      <h1 className="text-xl font-bold mb-4 text-center">Food Consumption</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(foodConsumption).map((food) => (
          <div key={food} className="mb-4 flex">
            <label className="block mb-2 w-1/3">
              {food.charAt(0).toUpperCase() + food.slice(1).replace(/([A-Z])/g, ' $1')}:
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={foodConsumption[food].amount}
              onChange={(e) => handleChange(e, food)}
              className="border p-2 mr-2 w-1/3 bg-slate-100 rounded"
            />
            <select
              name="unit"
              value={foodConsumption[food].unit}
              onChange={(e) => handleChange(e, food)}
              className="border p-2 w-1/3 bg-slate-100 rounded"
            >
              {food === 'milk' ? (
                <>
                  <option value="liters">liters</option>
                  <option value="kg">kg</option>
                </>
              ) : food === 'eggs' ? (
                <option value="dozen">dozen</option>
              ) : (
                <option value="kg">kg</option>
              )}
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
          <h2 className="text-lg font-bold mb-2 text-center">Carbon Footprint Details</h2>
          <table className="bg-white border border-gray-300 table-auto mx-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Food Item</th>
                <th className="border px-4 py-2">Footprint (kg CO₂)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(footprints).map((food) => (
                <tr key={food}>
                  <td className="border px-4 py-2 capitalize">{food}</td>
                  <td className="border px-4 py-2">{footprints[food]}</td>
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

export default FoodCalculator;