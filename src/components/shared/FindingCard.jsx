const SEVERITY_COLORS = {
  Critical: { bg: "#2a0a0a", border: "#cc2200", label: "#ff4422" },
  High:     { bg: "#2a1500", border: "#cc6600", label: "#ff8833" },
  Medium:   { bg: "#2a2200", border: "#ccaa00", label: "#ffcc00" },
  Low:      { bg: "#0a2a0a", border: "#226600", label: "#44aa22" },
};

export default function FindingCard({ severity, title, detail, fix }) {
  const colors = SEVERITY_COLORS[severity] || SEVERITY_COLORS.Low;
  return (
    <div style={{
      backgroundColor: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: 6,
      padding: "14px 18px",
      marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{
          fontSize: 10,
          fontWeight: "bold",
          letterSpacing: 1.5,
          color: colors.label,
          backgroundColor: colors.border + "33",
          padding: "2px 8px",
          borderRadius: 3,
        }}>
          {severity.toUpperCase()}
        </span>
        <span style={{ fontSize: 14, fontWeight: "bold", color: "#ffffff" }}>{title}</span>
      </div>
      {detail && <p style={{ margin: "0 0 8px", fontSize: 13, color: "#cccccc", lineHeight: 1.5 }}>{detail}</p>}
      {fix && (
        <p style={{ margin: 0, fontSize: 13, color: "#aaaaaa", lineHeight: 1.5 }}>
          <span style={{ color: "#7B2FBE", fontWeight: "bold" }}>Fix: </span>{fix}
        </p>
      )}
    </div>
  );
}
