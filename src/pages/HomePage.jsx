import React from 'react';
import Nav from "../components/Nav";
import Cards from '../components/Cards';


const HomePage = () => {
  return (
    <>
<div className="relative h-[50vh] bg-[url('/hero.jpg')] bg-[position:60px_0px] bg-center bg-no-repeat bg-[length:1000px_500px]">
  
  <div className="absolute inset-0 opacity-80"></div>

  <div className="relative z-10 flex row">
     <div className="top flex flex-row justify-end w-full">
      <div className="cntnt text-[80px]  text-black flex-col flex  mt-12 mr-20">
      <p className=' font-black mr-10 '>How big is your </p>
      <p className=' font-black ml-36 '> environmental </p>
      <p className=' font-black ml-64 '> footprint ?</p>
      </div>
        
        
     </div>
  </div>
  <p className='text-center mt-20 font-bold text-[#32CD32] text-3xl'> Embrace the journey of building your own path, one step at a time</p>
  <Nav/>
</div>

    
    <Cards/>
    </>
  );
};

export default HomePage;
