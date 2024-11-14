import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FootprintContext } from "../contexts/FootprintContext";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(FootprintContext);

  useEffect(() => {
    if (!userInfo) {
      // Only fetch user info if it is not set yet
      fetch("http://localhost:8080/api/footprints/profile", {
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to fetch user profile");
        })
        .then((data) => {
          setUserInfo(data);
        })
        .catch((err) => console.error(err));
    }
  }, []); // Only run this effect once, when the component mounts

  const logout = () => {
    {
      /*} fetch('http://localhost:8080/api/footprints/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(response => {
      if (response.ok) {
        setUserInfo(null); // Clear user info on successful logout
      } else {
        console.error('Logout failed');
      }
    });*/
    }
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <nav className="navbar bg-[#1E5631] w-full font-ubuntu">
      <div className="nav-content max-w-[1200px] flex items-center justify-between h-20 px-8">
        <div className="logo">
          <Link to="/" className="text-[#f3f3f3] text-[35px] font-[700]">
            ecoNova
          </Link>
        </div>
        <ul className="nav-links flex space-x-6 ml-auto">
          {!username ? (
            <>
              <li className="list-none">
                <Link
                  to="/login"
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
                  Login
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/register"
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="list-none">
                <Link
                  to="/"
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
                  Home
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/calculate"
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
                  Calculate
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/credits"
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
                  Credit
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/analyze"
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
                  Analyze
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/compare"
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
                  Compare
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/login"
                  onClick={logout}
                  className="text-[#ffffff] text-[18px] font-medium transition-all duration-200 ease-in-out hover:text-[#d1d5db]"
                >
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
