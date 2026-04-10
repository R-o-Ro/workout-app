export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border ${className}`} style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-6 py-4 border-b ${className}`} style={{ borderColor: "var(--border)" }}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`px-6 py-5 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`px-6 py-4 border-t ${className}`} style={{ borderColor: "var(--border)" }}>
      {children}
    </div>
  );
}