import { useState, useEffect } from "react";
import MeasurementCard from "../features/measurements/components/MeasurementCard";
import MeasurementHistory from "../features/measurements/components/MeasurementHistory";
import MeasurementChart from "../features/measurements/components/MeasurementChart";
import * as api from "../services/api";

function Measurements() {
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    api.fetchMeasurements()
      .then((data) => setMeasurements(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  function handleSaved() {
    api.fetchMeasurements()
      .then((data) => setMeasurements(Array.isArray(data) ? data : []))
      .catch(console.error);
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 gap-5 items-start">
        <MeasurementCard onSaved={handleSaved} />
        <div className="space-y-5">
          {measurements.length >= 2 && (
            <MeasurementChart measurements={measurements} />
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              History
            </p>
            <MeasurementHistory />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Measurements;