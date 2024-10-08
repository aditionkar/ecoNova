import React, { createContext, useState, useEffect } from 'react';

// Create context
export const FootprintContext = createContext();

// Provider component
export const FootprintProvider = ({ children }) => {
  const [homeFootprint, setHomeFootprint] = useState(0);
  const [privateTransportFootprint, setPrivateTransportFootprint] = useState(0);
  const [publicTransportFootprint, setPublicTransportFootprint] = useState(0);
  const [foodFootprint, setFoodFootprint] = useState(0);
  const [flightFootprint, setFlightFootprint] = useState(0);
  const [totalFootprint, setTotalFootprint] = useState(0);

  // Calculate total footprint
  const calculateTotalFootprint = () => {
    const total = 
      Number(homeFootprint) + 
      Number(privateTransportFootprint) + 
      Number(publicTransportFootprint) + 
      Number(flightFootprint) + 
      Number(foodFootprint);
      
    setTotalFootprint(total.toFixed(2));
  };

  // UseEffect to calculate total when individual footprints change
  useEffect(() => {
    calculateTotalFootprint();
  }, [homeFootprint, privateTransportFootprint, publicTransportFootprint, foodFootprint, flightFootprint]);

  // Save to local storage to persist across refreshes
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('footprintData'));
    if (storedData) {
      setHomeFootprint(storedData.homeFootprint);
      setPrivateTransportFootprint(storedData.privateTransportFootprint);
      setPublicTransportFootprint(storedData.publicTransportFootprint);
      setFoodFootprint(storedData.foodFootprint);
      setFlightFootprint(storedData.flightFootprint);
    }
  }, []);

  useEffect(() => {
    const footprintData = {
      homeFootprint,
      privateTransportFootprint,
      publicTransportFootprint,
      foodFootprint,
      flightFootprint,
      totalFootprint
    };
    localStorage.setItem('footprintData', JSON.stringify(footprintData));
  }, [homeFootprint, privateTransportFootprint, publicTransportFootprint, foodFootprint, flightFootprint, totalFootprint]);

  return (
    <FootprintContext.Provider
      value={{
        homeFootprint,
        setHomeFootprint,
        privateTransportFootprint,
        setPrivateTransportFootprint,
        publicTransportFootprint,
        setPublicTransportFootprint,
        foodFootprint,
        setFoodFootprint,
        flightFootprint,
        setFlightFootprint,
        totalFootprint
      }}
    >
      {children}
    </FootprintContext.Provider>
  );
};
