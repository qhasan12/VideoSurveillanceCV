import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AnomalyChart from './anomalyChart';
const fetchAnomalies = async () => {
  try {
    const response = await fetch('./api/anomalies');
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return [{ error: `HTTP error! Status: ${response.status}` }];
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
    
    return parsedAnomalies.slice(-4); // Return only the last 4 anomalies
  } catch (error) {
    console.error("Error fetching anomalies:", error);
    return [{ error: "Error fetching data" }];
  }
};

function Alert() {
  const [anomalies, setAnomalies] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await fetchAnomalies();
    setAnomalies(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="border border-rounded-20x px-4 py-3">
      <h4 className="section-heading">Alerts</h4>
      {anomalies.length === 0 ? (
        <p>No anomalies found or error fetching data.</p>
      ) : (
        anomalies.map((anomaly, index) => (
          <div key={index} className="anomaly border-2 border-blue border-rounded-20x my-4 py-3">
            {anomaly.error ? (
              <p>{anomaly.error}</p>
            ) : (
              <>
                <div className="anomaly-title d-flex gap-2 align-items-center border-bottom pb-3 px-3">
                  <FontAwesomeIcon icon={faUser} /> {anomaly.anomaly_id}
                </div>
                <div className="anomaly-detail pt-2 px-3">
                  <div className="d-flex gap-4">
                    <div className="date">
                      <p className="m-0">Date:</p>
                      <b>{anomaly.datetime.toLocaleDateString()}</b>
                    </div>
                    <div className="time">
                      <p className="m-0">Time:</p>
                      <b>{anomaly.datetime.toLocaleTimeString()}</b>
                    </div>
                  </div>
                  <p className="m-0">{anomaly.anomalyDetails}</p>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Alert;
