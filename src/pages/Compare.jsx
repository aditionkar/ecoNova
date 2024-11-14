import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FootprintContext } from "../contexts/FootprintContext";
import { Link } from "react-router-dom";

const ComparePage = () => {
  const [footprintData, setFootprintData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { username } = useContext(FootprintContext);

  const fetchFootprintData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/footprints/user/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFootprintData(data); // Store all footprints, not just the most recent
    } catch (error) {
      console.error("Error fetching footprint data:", error);
      setErrorMsg("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFootprintData();
  }, []);

  const colors = [
    "#606c38", // Home (Olive Green)
    "#283618", // Private Transport (Dark Olive)
    "#e8d4b3", // Public Transport (Dark Cream)
    "#dda15e", // Food (Soft Tan)
    "#bc6c25", // Flight (Brown)
    "#a3b18c", // Sage Green
    "#b7c5b8", // Light Moss Green
    "#6b4226", // Walnut Brown
    "#9a8c98", // Lavender Gray
    "#f0e5d8", // Ivory
  ];

  const chartData = {
    labels: footprintData.map((_, index) => `Footprint ${index + 1}`),
    datasets: [
      {
        label: "Total Carbon Footprint",
        data: footprintData.map((item) => item.totalFootprint),
        backgroundColor: footprintData.map((_, index) => colors[index % colors.length]), // Apply colors dynamically
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines on x-axis
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Hide grid lines on y-axis
        },
      },
    },
  };

  return (
    <div className="p-8 mt-5 max-w-7xl mx-auto flex flex-col items-center bg-green-50 shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-[#1E5631] mb-6">
        Compare Your Carbon Footprint Over Time
      </h2>
      <p className="mb-8 text-lg text-gray-800 text-center">
        Gain insights into your environmental impact by comparing your carbon
        footprint across different categories. By tracking where your emissions
        are highest, you can identify areas that need attention and take
        actionable steps towards reducing your footprint. Empower yourself with
        the knowledge to make sustainable choices for a greener future.
      </p>

      {errorMsg && (
        <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-2">Login Required</h2>
          <p className="mb-4">
            Please log in before analyzing your data. By logging in, you'll be
            able to track your environmental impact and access personalized
            insights for reducing your carbon footprint.
          </p>
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Go to Login
          </Link>
        </div>
      )}

      {footprintData.length > 0 ? (
        <div className="w-full bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-4">Bar Chart Breakdown</h3>
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ComparePage;
