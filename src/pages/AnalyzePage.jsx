import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';
import { Chart as ChartJS } from 'chart.js';

// Register necessary controllers, scales, and elements for bar and pie charts
Chart.register(CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement, Tooltip, Legend);

const AnalyzePage = () => {
  const [footprintData, setFootprintData] = useState(null);
  const [highestCategory, setHighestCategory] = useState('');

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
      
      const highest = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);
      setHighestCategory(highest);

    } catch (error) {
      console.error('Error fetching footprint data:', error);
    }
  };

  useEffect(() => {
    fetchFootprintData();
  }, []);

  useEffect(() => {
    if (!footprintData) return;

    const ctxBar = document.getElementById('barChart').getContext('2d');
    const ctxPie = document.getElementById('pieChart').getContext('2d');

    new ChartJS(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Home', 'Private Transport', 'Public Transport', 'Food', 'Flight'],
        datasets: [{
          label: 'Carbon Footprint by Category',
          data: [
            footprintData.homeFootprint || 0,
            footprintData.privateTransportFootprint || 0,
            footprintData.publicTransportFootprint || 0,
            footprintData.foodFootprint || 0,
            footprintData.flightFootprint || 0
          ],
          backgroundColor: [
            'rgba(0, 255, 0, 0.5)', // Home (Green)
            'rgba(0, 200, 0, 0.5)', // Private Transport (Lighter Green)
            'rgba(255, 255, 0, 0.5)', // Public Transport (Yellow)
            'rgba(255, 165, 0, 0.5)', // Food (Orange)
            'rgba(255, 0, 0, 0.5)' // Flight (Red)
          ],
          borderColor: [
            'rgba(0, 255, 0, 1)', // Home (Green)
            'rgba(0, 200, 0, 1)', // Private Transport (Lighter Green)
            'rgba(255, 255, 0, 1)', // Public Transport (Yellow)
            'rgba(255, 165, 0, 1)', // Food (Orange)
            'rgba(255, 0, 0, 1)' // Flight (Red)
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

    new ChartJS(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Home', 'Private Transport', 'Public Transport', 'Food', 'Flight'],
        datasets: [{
          label: 'Carbon Footprint by Category',
          data: [
            footprintData.homeFootprint || 0,
            footprintData.privateTransportFootprint || 0,
            footprintData.publicTransportFootprint || 0,
            footprintData.foodFootprint || 0,
            footprintData.flightFootprint || 0
          ],
          backgroundColor: [
            'rgba(0, 255, 0, 0.5)', // Home (Green)
            'rgba(0, 200, 0, 0.5)', // Private Transport (Lighter Green)
            'rgba(255, 255, 0, 0.5)', // Public Transport (Yellow)
            'rgba(255, 165, 0, 0.5)', // Food (Orange)
            'rgba(255, 0, 0, 0.5)' // Flight (Red)
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });

  }, [footprintData]);

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Analyze Your Data</h1>
      <p className="mb-4 text-lg">Check out which area you should work on to reduce your footprint.</p>
      <div className="flex w-full h-[70vh]">
        <div className="w-3/4 pr-2">
          <canvas id="barChart" className="w-full h-full"></canvas>
        </div>
        <div className="w-1/4 pl-2">
          <canvas id="pieChart" className="w-full h-full"></canvas>
        </div>
      </div>
      {footprintData && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">The highest footprint is in {highestCategory.charAt(0).toUpperCase() + highestCategory.slice(1)}. Consider reducing that part.</p>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;
