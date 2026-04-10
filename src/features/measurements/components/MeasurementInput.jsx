function MeasurementInput({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-28 text-sm text-right rounded-xl px-3 py-2 outline-none transition-colors"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "var(--border-light)"}
        onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
      />
    </div>
  );
}

export default MeasurementInput;