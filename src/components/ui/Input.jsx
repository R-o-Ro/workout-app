function Input({ className = "", ...props }) {
  return (
    <input
      className={`rounded-xl px-3 py-2 text-sm w-full outline-none transition-colors ${className}`}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
      }}
      onFocus={e => e.currentTarget.style.borderColor = "var(--border-light)"}
      onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
      {...props}
    />
  );
}

export default Input;