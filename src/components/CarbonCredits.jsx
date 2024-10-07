import React, { useEffect, useRef, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import 'tailwindcss/tailwind.css';

// Register necessary scales, controller, and elements for bar charts
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const CarbonCredits = () => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null); // Ref to store the chart instance
  const [totalFootprint, setTotalFootprint] = useState(null);
  const [level, setLevel] = useState('');

  // Function to fetch the footprint data from backend
  const fetchFootprintData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/footprints/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data); // For debugging

      // Get the most recent totalFootprint (last item in the array)
      const mostRecentItem = data[data.length - 1];
      const total = mostRecentItem.totalFootprint || 0; // Adjust field name if needed

      setTotalFootprint(total);

      // Categorize the totalFootprint into levels
      let footprintLevel = '';
      if (total <= 100) {
        footprintLevel = 'Level 1 (Least Emissions)';
      } else if (total <= 200) {
        footprintLevel = 'Level 2';
      } else if (total <= 300) {
        footprintLevel = 'Level 3';
      } else if (total <= 400) {
        footprintLevel = 'Level 4';
      } else {
        footprintLevel = 'Level 5 (Most Emissions)';
      }

      setLevel(footprintLevel);
    } catch (error) {
      console.error('Error fetching footprint data:', error);
    }
  };

  useEffect(() => {
    fetchFootprintData();
  }, []); // Empty array ensures this effect runs only once (on component mount)

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    if (ctx) {
      // Create a fixed chart instance with predefined data
      myChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
          datasets: [{
            label: 'Carbon Footprint Levels',
            data: [20, 40, 60, 80, 100], // Fixed values for demonstration
            backgroundColor: [
              'rgba(0, 255, 0, 0.5)', // Level 1 (Green)
              'rgba(0, 200, 0, 0.5)', // Level 2 (Lighter Green)
              'rgba(255, 255, 0, 0.5)', // Level 3 (Yellow)
              'rgba(255, 165, 0, 0.5)', // Level 4 (Orange)
              'rgba(255, 0, 0, 0.5)' // Level 5 (Red)
            ],
            borderColor: [
              'rgba(0, 255, 0, 1)', // Level 1 (Green)
              'rgba(0, 200, 0, 1)', // Level 2 (Lighter Green)
              'rgba(255, 255, 0, 1)', // Level 3 (Yellow)
              'rgba(255, 165, 0, 1)', // Level 4 (Orange)
              'rgba(255, 0, 0, 1)' // Level 5 (Red)
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false, // Hide horizontal grid lines
              }
            }
          }
        }
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
    
    <div className="p-4 max-w-lg mx-auto">
    <h1 className="text-5xl font-bold  mb-4">Get Your Level</h1>
    <p className="mb-4 text-lg font-semibold ">
      Check out which level your carbon footprint lies into.
    </p>
    
      <canvas ref={chartRef} className="w-full h-96"></canvas>
      <div className="mt-4 text-center">
        {totalFootprint !== null && (
          <>
            <button
              onClick={() => alert(`Total Footprint: ${totalFootprint}\n${level}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Show Most Recent Total Footprint
            </button>
            <p className="mt-2 text-lg font-semibold">{`Current Level: ${level}`}</p>
          </>
        )}
      </div>
    </div>
    </>
    
  );
};

export default CarbonCredits;