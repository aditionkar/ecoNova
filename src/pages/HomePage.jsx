import React from 'react';
import Nav from "../components/Nav";
import Cards from '../components/Cards';


const HomePage = () => {
  return (
    <>
    <div className="font-ubuntu">
      
      <div className="screen bg-[#7BB547] h-[620px] w-[1250px] rounded-[20px] mx-auto mt-7 flex">
      <div className="left h-[600px] w-[650px] flex flex-col items-center justify-center">
        <h1 className="text-center mt-[150px] text-white font-bold text-[40px] mx-auto w-[500px]">
        Embrace the journey of building your own path, one step at a time
        </h1>
        <p className="text-white text-[30px] mt-[100px] text-center font-medium">
          For People and Planet
        </p>
      </div>
      <div className="right h-[600px] w-[590px] flex items-center justify-center">
        <img src="earth.png" alt="earth" className="mt-[80px] ml-[50px]" />
      </div>
    </div>
    </div>
    <div className="screen2">
      <img 
        src="grouped.png" 
        alt="Grouped" 
        className="mt-[80px] ml-[240px] h-[500px] w-[900px]" 
      />
    </div>
    
    <Cards/>
    </>
  );
};

export default HomePage;
