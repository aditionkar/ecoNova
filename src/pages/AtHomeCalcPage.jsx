import React, { useContext, useState } from 'react';
import AtHomeCalculator from '../calculators/AtHomeCalculator';
import { FootprintContext } from '../contexts/FootprintContext';
import axios from 'axios'; // Import axios
import Nav from '../components/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const AtHomeCalcPage = () => {
  const [errormsg, setErrormsg] = useState('');
  const {
    username,
    homeFootprint,
    setHomeFootprint,
    privateTransportFootprint,
    publicTransportFootprint,
    flightFootprint,
    foodFootprint,
    totalFootprint
  } = useContext(FootprintContext);

    // Function to save footprint data to the backend
    const saveFootprintData = () => {
      const footprintData = {
        homeFootprint: Number(homeFootprint),
        privateTransportFootprint: Number(privateTransportFootprint),
        publicTransportFootprint: Number(publicTransportFootprint),
        foodFootprint: Number(foodFootprint),
        flightFootprint: Number(flightFootprint),
        totalFootprint: Number(totalFootprint)
      };
  
      axios.post(`http://localhost:8080/api/footprints/save/${username}`, footprintData)
        .then(response => {
          console.log('Data saved successfully:', response.data);
          toast.success('Data saved successfully!', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'bg-white text-[#1E5631] text-lg font-bold rounded-lg shadow-md', // Vibrant styling
            progressClassName: 'bg-[#1E5631]', // Vibrant progress bar color
            bodyClassName: 'text-[#1E5631]', // Make the text white for contrast
          });
        })
        .catch(error => {
          console.error('Error saving data:', error.response ? error.response.data : error.message);
          setErrormsg(error);
        });
    };

  return (
    <div className="container mt-4 mx-auto p-6 md:p-10 bg-[#D3E4CD] rounded-xl shadow-xl">
      <Nav />
      {/*<h1 className="text-2xl font-bold mb-4">At Home Carbon Footprint Calculator</h1>*/}

      <div className="mb-8">
        <AtHomeCalculator setFootprint={setHomeFootprint} />
      </div>

      <div className="mt-4 p-6 bg-lime-100 border-l-4 border-lime-600 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-lime-700">Total Carbon Footprint:</h2>
        <p className="text-gray-800 text-lg mt-2">{totalFootprint} kg CO₂</p>
       </div>

      <button
      onClick={saveFootprintData}
      className="bg-lime-700 hover:bg-lime-600 text-white px-6 py-3 rounded-lg mt-4 font-semibold transition-all duration-200 ease-in-out shadow-lg">
        Save Footprint Data
      </button>
      
      {/* Toast Container to render the notification */}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {errormsg && (
        <>
        <div className="mt-4">
          <Link
            to="/login"
            className="text-red-600 font-medium hover:underline hover:text-red-800 transition duration-200 ease-in-out"
          >
            ⚠️ Error! Please login to save your footprint!
          </Link>
        </div>
      </>
      )}
    </div>
  );
};

export default AtHomeCalcPage;
