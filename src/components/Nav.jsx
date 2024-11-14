import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Nav() {
  return (
    <div className='flex justify-center items-center h-[30vh] mb-14'>
      <div className='flex  p-4'>
        
        {/* Home link */}
        <Link to="/AtHome">
          <div className='w-32 h-32 bg-[#8cf03b] border-black border-[2px] text-white mr-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
            <img src="/homee.png" alt="Home" className="w-20 h-20" />
          </div>
        </Link>

        {/* Private transport link */}
        <Link to="/PrivTrans">
          <div className='w-32 h-32 bg-[#8cf03b] border-black border-[2px] text-white mx-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
            <img src="/private.png" alt="Private transport" className="w-20 h-20" />
          </div>
        </Link>

        {/* Public transport link */}
        <Link to="/PublicTrans">
          <div className='w-32 h-32 bg-[#8cf03b] border-black border-[2px] text-white mx-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
            <img src="/public.png" alt="Public transport" className="w-20 h-20" />
          </div>
        </Link>

        {/* Flight link */}
        <Link to="/Flight">
          <div className='w-32 h-32 bg-[#8cf03b] border-black border-[2px] text-white mx-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
            <img src="/flight.png" alt="Flight" className="w-20 h-20" />
          </div>
        </Link>

        {/* Food consumption link */}
        <Link to="/Food">
          <div className='w-32 h-32 bg-[#8cf03b] border-black border-[2px] text-white ml-4 p-2 rounded shadow-lg shadow-green-700 hover:shadow-2xl hover:shadow-green-700 hover:scale-105 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center'>
            <img src="/food.png" alt="Food consumption" className="w-20 h-20" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
