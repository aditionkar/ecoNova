import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import "tailwindcss/tailwind.css";
import { useContext } from "react";
import { FootprintContext } from "../contexts/FootprintContext";
import { Link } from "react-router-dom";


// Register necessary scales, controller, and elements for bar charts
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const CarbonCredits = () => {
  const [showFootprint, setShowFootprint] = useState(false);
  const chartRef = useRef(null);
  const myChartRef = useRef(null); 
  const [totalFootprint, setTotalFootprint] = useState(null);
  const [level, setLevel] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const { username } = useContext(FootprintContext);

  // Function to fetch the footprint data from backend
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
        setErrormsg(response.status);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // For debugging

      // Get the most recent totalFootprint (last item in the array)
      const mostRecentItem = data[data.length - 1];
      const total = mostRecentItem.totalFootprint || 0; // Adjust field name if needed

      setTotalFootprint(total);

      // Categorize the totalFootprint into levels
      let footprintLevel = "";
      if (total <= 200) {
        footprintLevel = "Level 1: Very low emissions, eco-friendly lifestyle";
      } else if (total <= 400) {
        footprintLevel = "LLevel 1: Very low emissions, eco-friendly lifestyle";
      } else if (total <= 600) {
        footprintLevel = "Level 3: Moderate emissions, room for improvement";
      } else if (total <= 800) {
        footprintLevel = "Level 4: High emissions, significant changes needed";
      } else {
        footprintLevel = "Level 5: Very high emissions, urgent action required";
      }

      setLevel(footprintLevel);
    } catch (error) {
      console.error("Error fetching footprint data:", error);
    }
  };

  useEffect(() => {
    fetchFootprintData();
  }, []); // Empty array ensures this effect runs only once (on component mount)

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    if (ctx) {
      // Create a fixed chart instance with predefined data
      myChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
          datasets: [
            {
              label: "Carbon Footprint Levels",
              data: [20, 40, 60, 80, 100], // Fixed values for demonstration
              backgroundColor: [
                "rgba(34, 197, 94, 0.8)", // Level 1 (Soft Green)
                "rgba(52, 211, 153, 0.8)", // Level 2 (Light Green)
                "rgba(234, 179, 8, 0.8)", // Level 3 (Soft Yellow)
                "rgba(249, 115, 22, 0.8)", // Level 4 (Soft Orange)
                "rgba(239, 68, 68, 0.8)", // Level 5 (Soft Red)
              ],
              borderColor: [
                "rgba(34, 197, 94, 1)", // Level 1 (Green)
                "rgba(16, 185, 129, 1)", // Level 2 (Greenish)
                "rgba(234, 179, 8, 1)", // Level 3 (Yellow)
                "rgba(249, 115, 22, 1)", // Level 4 (Orange)
                "rgba(239, 68, 68, 1)", // Level 5 (Red)
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false, // Hide horizontal grid lines
              },
            },
          },
        },
      });
    }

    // Clean up the chart when the component unmounts
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [totalFootprint]); // Re-run this effect when totalFootprint changes

  return (
    <>
      <div className="h-screen bg-green-50">
        <div className=" flex justify-center pt-3">
          <div className="p-6 w-full max-w-[1300px] bg-green-50 ">
            <h1 className="text-4xl font-bold text-center text-[#1E5631] mb-12">
              Get Your Level
            </h1>

            {/* Main content container */}
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* Chart Section on the Left */}
              <div className="lg:w-1/2">
                <canvas
                  ref={chartRef}
                  className="w-full h-[400px] bg-white rounded-lg shadow-lg"
                ></canvas>
              </div>

              {/* Explanation Section on the Right */}
              <div className="lg:w-1/2 flex flex-col justify-center pl-6">
                <p className="text-xl font-semibold text-gray-800 mb-6">
                  Understanding your carbon footprint can help you identify
                  areas where you can reduce your environmental impact. Each
                  level corresponds to a different range of carbon emissions,
                  with Level 1 being the most eco-friendly and Level 5 being the
                  least.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 text-lg">
                  <li>Level 1: Very low emissions, eco-friendly lifestyle.</li>
                  <li>
                    Level 2: Low emissions, still environmentally conscious.
                  </li>
                  <li>Level 3: Moderate emissions, room for improvement.</li>
                  <li>Level 4: High emissions, significant changes needed.</li>
                  <li>Level 5: Very high emissions, urgent action required.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Button to display the most recent footprint */}
        <div className="text-center lg:text-left mt-9 ml-12">
          {totalFootprint !== null && (
            <>
              <button
                onClick={() => setShowFootprint(true)}
                className="bg-[#1E5631] hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition-all duration-200 ease-in-out"
              >
                Check Your Emission Level
              </button>
              {/* Display the total footprint and level */}
              {showFootprint && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-l-4 border-green-700 shadow-lg w-[1250px]">
                  <p className="text-2xl font-semibold text-[#1E5631] mt-2">{`${level}`}</p>
                  <p className="text-xl mt-2 font-semibold text-gray-800">{`Total Footprint: ${totalFootprint} kg CO₂`}</p>
                </div>
              )}
            </>
          )}
          {totalFootprint == null && (
            <Link
              to="/login"
              className="w-[400px] text-[#1E5631] font-semibold text-lg hover:bg-[#e8d1f4] hover:text-green-700 hover:underline transition-all duration-200 ease-in-out p-2 rounded flex items-center"
            >
              <span className="mr-2 text-xl">⚠️</span> {/* Alert symbol */}
              Log in to check your emission level
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CarbonCredits;
