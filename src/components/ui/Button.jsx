function Button({ children, variant = "primary", size = "md", loading = false, className = "", ...props }) {

  const base = "rounded-xl font-semibold transition-all duration-150 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed text-sm";

  const variants = {
    primary: "",
    secondary: "",
    ghost: "",
    danger: "",
  };

  const styles = {
    primary: { background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" },
    secondary: { background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    ghost: { background: "transparent", color: "var(--text-secondary)", border: "1px solid transparent" },
    danger: { background: "rgba(239,68,68,0.1)", color: "var(--red)", border: "1px solid rgba(239,68,68,0.2)" },
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5",
    lg: "px-5 py-3",
  };

  return (
    <button
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={styles[variant]}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;