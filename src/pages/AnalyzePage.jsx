import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";
import { FootprintContext } from "../contexts/FootprintContext";
import { Link } from "react-router-dom";

// Register necessary controllers, scales, and elements for bar and pie charts
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyzePage = () => {
  const [footprintData, setFootprintData] = useState(null);
  const [highestCategory, setHighestCategory] = useState("");

  const barChartRef = useRef(null); // Reference to store the bar chart instance
  const pieChartRef = useRef(null); // Reference to store the pie chart instance
  const barChartInstance = useRef(null); 
  const pieChartInstance = useRef(null); 

  const { username } = useContext(FootprintContext);
  const [errormsg, setErrormsg] = useState('');

  const fetchFootprintData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/footprints/user/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          } 
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
       
      }

      const data = await response.json();
      const mostRecentItem = data[data.length - 1];
      setFootprintData(mostRecentItem);

      // Determine the highest category
      const categories = {
        home: mostRecentItem.homeFootprint || 0,
        privateTransport: mostRecentItem.privateTransportFootprint || 0,
        publicTransport: mostRecentItem.publicTransportFootprint || 0,
        food: mostRecentItem.foodFootprint || 0,
        flight: mostRecentItem.flightFootprint || 0,
      };

      const highest = Object.keys(categories).reduce((a, b) =>
        categories[a] > categories[b] ? a : b
      );
      setHighestCategory(highest);
    } catch (error) {
      console.error("Error fetching footprint data:", error);
      setErrormsg("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFootprintData();
  }, []);

  useEffect(() => {
    if (!footprintData) return;

    const categories = ['Home', 'Private Transport', 'Public Transport', 'Food', 'Flights'];
    const categoryData = [
      footprintData.homeFootprint || 0,
      footprintData.privateTransportFootprint || 0,
      footprintData.publicTransportFootprint || 0,
      footprintData.foodFootprint || 0,
      footprintData.flightFootprint || 0,
    ];

    const highestIndex = categoryData.indexOf(Math.max(...categoryData));
    setHighestCategory(categories[highestIndex]);

    if (barChartRef.current && pieChartRef.current) {
      const barCtx = barChartRef.current.getContext('2d');
      const pieCtx = pieChartRef.current.getContext('2d');

      // Destroy previous chart instances if they exist to avoid overlap
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      // Create new bar chart instance and save it in ref
      barChartInstance.current = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: categories,
          datasets: [
            {
              label: 'Carbon Footprint by Category',
              data: categoryData,
              backgroundColor: [
                '#606c38', // Home (Olive Green)
                '#283618', // Private Transport (Dark Olive)
                '#e8d4b3', // Public Transport (Dark Cream)
                '#dda15e', // Food (Soft Tan)
                '#bc6c25', // Flight (Brown)
              ],
              borderColor: [
                '#606c38', // Home
                '#283618', // Private Transport
                '#e8d4b3', // Public Transport
                '#dda15e', // Food
                '#bc6c25', // Flight
              ],
              borderWidth: 2, // Increased border width for a cleaner look
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                padding: 10, // Increase space between labels and bars
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false, // Hide horizontal grid lines
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#333', // Change legend text color
                font: {
                  size: 14, // Increase legend font size
                  family: 'Arial', // Change legend font family
                },
              },
            },
          },
        },
      });

      // Create new pie chart instance and save it in ref
      pieChartInstance.current = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: categories,
          datasets: [
            {
              label: 'Carbon Footprint by Category',
              data: categoryData,
              backgroundColor: [
                '#606c38', // Home (Olive Green)
                '#283618', // Private Transport (Dark Olive)
                '#e8d4b3', // Public Transport (Dark Cream)
                '#dda15e', // Food (Soft Tan)
                '#bc6c25', // Flight (Brown)
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#333', // Change legend text color
                font: {
                  size: 14, // Increase legend font size
                  family: 'Arial', // Change legend font family
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        },
      });
    }

    // Clean up charts when the component is unmounted
    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [footprintData]);

  return (
    <div className="p-8 mt-5 max-w-7xl mx-auto flex flex-col items-center bg-green-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-[#1E5631] mb-6">
        Analyze Your Data
      </h1>
      <p className="mb-8 text-lg text-gray-800 text-center">
        Take control of your environmental impact by understanding where your
        carbon emissions are highest. By identifying these key sources, you'll
        be empowered to make informed decisions and take effective steps towards
        reducing your environmental impact.
      </p>

      {errormsg ? (
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
      ) : (
        <>
          {/* Chart Container */}
          <div className="flex w-full h-[74vh] space-x-4">
            {/* Bar Chart Section */}
            <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Bar Chart Analysis
              </h2>
              <canvas ref={barChartRef} className="w-full h-full"></canvas>
            </div>

            {/* Pie Chart Section */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Pie Chart Breakdown
              </h2>
              <canvas ref={pieChartRef} className="w-full h-full"></canvas>
            </div>
          </div>

          {/* Suggestion Section */}
          {highestCategory && (
            <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">
                Focus on Reducing Your {highestCategory} Footprint
              </h2>
              <p>
                Your highest emission comes from <strong>{highestCategory}</strong>.
                Consider taking steps to reduce your environmental impact in
                this area.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyzePage;