import React, { useState, useContext } from 'react';
import { Navigate, Link } from "react-router-dom";
import { FootprintContext } from '../contexts/FootprintContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const { setUserInfo, setUsername: setContextUsername } = useContext(FootprintContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/footprints/users/' + username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userInfo = await response.json();
      if (userInfo.password !== password) {
        throw new Error('Invalid credentials');
      }
      setUserInfo(userInfo);
      setContextUsername(username); // Set the username in context
      setRedirect(true);
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="login mx-auto max-w-sm mt-28" onSubmit={handleSubmit}>
      <h1 className="text-center text-4xl font-bold text-[#1E5631] mt-8">Login</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-8" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline m-2">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => setError(null)}>
              &times;
            </button>
          </span>
        </div>
      )}

      <input
        type="text"
        className="block mb-4 w-full p-3 border-2 border-gray-300 rounded-md bg-white mt-6 focus:outline-none focus:border-[#4C9A2A] focus:ring-2 focus:ring-[#4C9A2A] transition duration-300 ease-in-out"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        className="block mb-4 w-full p-3 border-2 border-gray-300 rounded-md bg-white mt-6 focus:outline-none focus:border-[#4C9A2A] focus:ring-2 focus:ring-[#4C9A2A] transition duration-300 ease-in-out"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit" className="cursor-pointer w-full block bg-[#1E5631] text-white rounded-md p-3 mt-6 hover:bg-[#4C9A2A] transition-all duration-300 ease-in-out transform hover:scale-105">
        Login
      </button>
      <Link 
        to="/register"
        className="w-full mt-4 inline-block text-[#1E5631] hover:text-[#4C9A2A] font-semibold px-4 py-2 bg-[#F2F6E9] hover:bg-[#E6E8D0] border border-[#1E5631] rounded-md transition duration-300 ease-in-out transform hover:scale-105 text-center">
          Don’t have an account? Register Now!
      </Link>

    </form>
  );
}
