import { useState } from "react";
import { Card } from "../../../components/ui/Card";
import MeasurementInput from "./MeasurementInput";
import * as api from "../../../services/api";

function MeasurementCard({ onSaved }) {
  const [weight, setWeight]       = useState("");
  const [neck, setNeck]           = useState("");
  const [shoulders, setShoulders] = useState("");
  const [chest, setChest]         = useState("");
  const [arms, setArms]           = useState("");
  const [waist, setWaist]         = useState("");
  const [quads, setQuads]         = useState("");
  const [calves, setCalves]       = useState("");

  async function saveMeasurements() {
    const entry = { date: new Date().toISOString(), weight, neck, shoulders, chest, arms, waist, quads, calves };
    try {
      await api.saveMeasurement(entry);
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Failed to save measurement:", err);
      alert("Failed to save. Is the backend running?");
    }
    setWeight(""); setNeck(""); setShoulders("");
    setChest(""); setArms(""); setWaist("");
    setQuads(""); setCalves("");
  }

  const fields = [
    { label: "Body Weight", unit: "kg", value: weight, set: setWeight },
    { label: "Neck", unit: "cm", value: neck, set: setNeck },
    { label: "Shoulders", unit: "cm", value: shoulders, set: setShoulders },
    { label: "Chest", unit: "cm", value: chest, set: setChest },
    { label: "Arms", unit: "cm", value: arms, set: setArms },
    { label: "Waist", unit: "cm", value: waist, set: setWaist },
    { label: "Quads", unit: "cm", value: quads, set: setQuads },
    { label: "Calves", unit: "cm", value: calves, set: setCalves },
  ];

  return (
    <Card>
      <div className="px-6 py-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
          Log Measurements
        </p>
        <div className="space-y-1">
          {fields.map((f, i) => (
            <div key={f.label} style={{ borderBottom: i < fields.length - 1 ? "1px solid var(--border)" : "none", paddingBottom: "10px", paddingTop: i > 0 ? "10px" : "0" }}>
              <MeasurementInput
                label={`${f.label} (${f.unit})`}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="pt-4">
          <button
            onClick={saveMeasurements}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--purple-dim-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--purple-dim)"}
          >
            Save Measurements
          </button>
        </div>
      </div>
    </Card>
  );
}

export default MeasurementCard;