import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { FootprintContext } from '../contexts/FootprintContext';

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(FootprintContext);

  useEffect(() => {
    if (!userInfo) { // Only fetch user info if it is not set yet
      fetch('http://localhost:8080/api/footprints/profile', {
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to fetch user profile');
        })
        .then(data => {
          setUserInfo(data);
        })
        .catch(err => console.error(err));
    }
  }, []); // Only run this effect once, when the component mounts

  const logout = () => {
   {/*} fetch('http://localhost:8080/api/footprints/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(response => {
      if (response.ok) {
        setUserInfo(null); // Clear user info on successful logout
      } else {
        console.error('Logout failed');
      }
    });*/}
    setUserInfo(null); 

  };

  const username = userInfo?.username;

  return (
    <nav className="navbar bg-[#1E5631] w-full font-ubuntu">
      <div className="nav-content max-w-[1200px]  flex items-center justify-between h-20 pl-5">
        <div className="logo">
          <Link to="/" className="text-[#f3f3f3] text-[35px] font-[700] pl-[50px] ml-12 ">
            ecoNova
          </Link>
        </div>
        <ul className="nav-links flex ml-10">
        {!username ? ( 
            <>
          <li className="list-none mx-[8px]">
            <Link to="/login" className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Login
            </Link>
          </li>
          <li className="list-none mx-[8px]">
            <Link to="/register" className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Register
            </Link>
          </li>
            </>
          ) : ( 
            <>
            <li className="list-none mx-[8px]">
            <Link to="/" className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Home
            </Link>
          </li>
          <li className="list-none mx-[8px]">
            <Link to="/calculate" className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Calculate
            </Link>
          </li>
          <li className="list-none mx-[8px]">
            <Link to="/credits" className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Credit
            </Link>
          </li>
          <li className="list-none mx-[8px]">
            <Link to="/analyze" className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Analyze
            </Link>
          </li>
          <li className="list-none ">
            <Link to="/compare" className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Compare
            </Link>
          </li>
          <li className="list-none ">
            <Link to="/login" onClick={logout} className="text-[#ffffff] text-[18px] font-medium py-[10px] px-[4px] transition-all duration-200 ease-in-out hover:text-[#d1d5db] hover:text-[17px]">
              Logout
            </Link>
          </li>
            </>
          )}
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
