import React from 'react';
import 'font-awesome/css/font-awesome.min.css';


const Footer = () => {
  return (
    <div className="mt-[150px] overflow-hidden ">
      <div className="bg-[#1E5631] py-[30px] font-play text-center h-[220px]">
        <div className="w-full my-1 py-[0.6%] text-[#e8d1f4] text-[25px]">
          <a href="#" className="text-[#e8d1f4] mx-3 transition duration-500 hover:text-white">
            <i className="fa fa-facebook text-2xl mx-1" />
          </a>
          <a href="#" className="text-[#e8d1f4] mx-3  transition duration-500 hover:text-white">
            <i className="fa fa-instagram text-2xl mx-1" />
          </a>
          <a href="#" className="text-[#e8d1f4] mx-3 transition duration-500 hover:text-white">
            <i className="fa fa-youtube text-2xl mx-1" />
          </a>
          <a href="#" className="text-[#e8d1f4] mx-3 transition duration-500 hover:text-white">
            <i className="fa fa-twitter text-2xl mx-1" />
          </a>
        </div>

        <div className="w-full my-4 text-sm">
          <ul className="flex justify-center">
            <li className="inline-block mx-[30px]">
              <a href="#" className="text-[#e8d1f4] transition duration-500 hover:text-white">
                Contact us
              </a>
            </li>
            <li className="inline-block mx-[30px]">
              <a href="#" className="text-[#e8d1f4] transition duration-500 hover:text-white">
                Our Services
              </a>
            </li>
            <li className="inline-block mx-[30px]">
              <a href="#" className="text-[#e8d1f4] transition duration-500 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li className="inline-block mx-[30px]">
              <a href="#" className="text-[#e8d1f4] transition duration-500 hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li className="inline-block mx-[30px]">
              <a href="#" className="text-[#e8d1f4] transition duration-500 hover:text-white">
                Career
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full my-1 py-[0.6%] text-[#e8d1f4] text-[0.8em]">
          ecoNova Copyright © 2024 ecoNova.All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
