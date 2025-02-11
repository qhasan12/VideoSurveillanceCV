import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// Fetch anomalies data
const fetchAnomalies = async () => {
  try {
    const response = await fetch('./api/anomalies');
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return [];
    }
    const data = await response.text();
    const lines = data.split('\n').filter(line => line.trim() !== '');

    const parsedAnomalies = lines.map(line => {
      const parts = line.split(' - ');
      if (parts.length === 3) {
        const datetime = new Date(parts[0]);
        const anomaly_id = parts[1];
        const anomalyDetails = parts[2];
        return { datetime, anomaly_id, anomalyDetails };
      } else {
        console.error("Invalid format in line:", line);
        return { error: "Invalid data format" };
      }
    });

    return parsedAnomalies;
  } catch (error) {
    console.error("Error fetching anomalies:", error);
    return [];
  }
};

const AnomalyChart = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [lastAnomalyDate, setLastAnomalyDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAnomalies();
      setAnomalies(data);

      if (data.length > 0) {
        const latestDate = data.reduce((latest, anomaly) => 
          anomaly.datetime > latest ? anomaly.datetime : latest, 
          new Date(0)
        );
        setLastAnomalyDate(latestDate);
      }
    };
    
    fetchData();
  }, []);

  const formatData = () => {
    const counts = {};
    anomalies.forEach(anomaly => {
      const minute = Math.floor(anomaly.datetime.getTime() / 60000); // Minutes since epoch
      counts[minute] = (counts[minute] || 0) + 1;
    });

    const sortedMinutes = Object.keys(counts).sort((a, b) => a - b);
    const dataPoints = sortedMinutes.map(minute => counts[minute]);
    const labels = sortedMinutes.map(minute => new Date(minute * 60000).toLocaleTimeString());

    return { labels, dataPoints };
  };

  const { labels, dataPoints } = formatData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Anomalies',
        data: dataPoints,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="mt-5 border border-rounded-20x px-4 py-3">
      <div className="d-flex justify-content-between">
        <h4 className="section-heading">Detection Overview</h4>
        <div className="bg-blue rounded text-white py-2 px-3">
          <span>Created: {lastAnomalyDate ? lastAnomalyDate.toLocaleString() : 'N/A'}</span>
        </div>
      </div>
      <div className="detection-graph">
        <div className="chart-container">
          <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>
    </div>
  );
};

export default AnomalyChart;
