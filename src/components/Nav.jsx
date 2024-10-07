import React from 'react';

function Nav() {
  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <div className='flex bg-white p-4'>
        <div className='w-32 h-32 bg-white text-white mr-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
          <img src="/homee.png" alt="Home" className="w-20 h-20" />
        </div>
        <div className='w-32 h-32 bg-white text-white mx-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
          <img src="/private.png" alt="Private transport" className="w-20 h-20" />
        </div>
        <div className='w-32 h-32 bg-white text-white mx-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
          <img src="/public.png" alt="Public transport" className="w-20 h-20" />
        </div>
        <div className='w-32 h-32 bg-white text-white mx-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
          <img src="/flight.png" alt="Flight" className="w-20 h-20" />
        </div>
        <div className='w-32 h-32 bg-white text-white ml-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
          <img src="/food.png" alt="Food consumption" className="w-20 h-20" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
