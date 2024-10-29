import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8080/api/footprints/users/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      setSuccess('User registered successfully!'); // Set success message
      console.log('User registered:', data);
    } catch (error) {
      setError(error.message); // Set error message
      console.error('Error:', error);
    }
  };

  return (
    <form className="register mx-auto max-w-sm mt-28" onSubmit={handleSubmit}>
      <h1 className="text-center text-4xl font-bold text-[#1E5631] mt-8">
        Register
      </h1>


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
      {success && (
  <div className="flex items-center justify-center mt-6">
    <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md max-w-md w-full">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-green-500 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-12a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1zm1 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <p className="font-semibold">{success}</p>
          <Link to="/Login" className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium">
            Login to your account!
          </Link>
        </div>
      </div>
    </div>
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
  className="block mb-4 w-full p-3 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:border-[#4C9A2A] focus:ring-2 focus:ring-[#4C9A2A] transition duration-300 ease-in-out"
  placeholder="Password"
  value={password}
  onChange={(ev) => setPassword(ev.target.value)}
/>

<button
  type="submit"
  className="cursor-pointer w-full block bg-[#1E5631] text-white rounded-md p-3 mt-6 hover:bg-[#4C9A2A] transition-all duration-300 ease-in-out transform hover:scale-105"
>
  Register
</button>

      <Link 
        to="/register"
        className="w-full mt-4 inline-block text-[#1E5631] hover:text-[#4C9A2A] font-semibold px-4 py-2 bg-[#F2F6E9] hover:bg-[#E6E8D0] border border-[#1E5631] rounded-md transition duration-300 ease-in-out transform hover:scale-105 text-center">
          Already have an account? Login Now!
      </Link>
    </form>
  );
}

export default RegisterPage;
