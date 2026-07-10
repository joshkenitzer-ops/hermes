const PHASE_LABELS = {
  0: "Starting Point",
  1: "Audit",
  2: "Master Build",
  5: "Tailoring",
  6: "Final Review",
};

const PHASE_ORDER = [0, 1, 2, 5, 6];

export default function LoreHeader({ currentPhase }) {
  return (
    <header style={{
      borderBottom: "1px solid #2a2a2a",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#0a0a0a",
    }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#7B2FBE", fontWeight: "bold", marginBottom: 2 }}>LORE</div>
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff", letterSpacing: 1 }}>HERMES</div>
      </div>

      <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {PHASE_ORDER.map((phase, idx) => {
          const isActive = phase === currentPhase;
          const isPast = PHASE_ORDER.indexOf(currentPhase) > idx;
          return (
            <div key={phase} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {idx > 0 && (
                <div style={{ width: 24, height: 1, backgroundColor: isPast ? "#7B2FBE" : "#333" }} />
              )}
              <div style={{
                fontSize: 11,
                color: isActive ? "#7B2FBE" : isPast ? "#888" : "#444",
                fontWeight: isActive ? "bold" : "normal",
                whiteSpace: "nowrap",
              }}>
                {PHASE_LABELS[phase]}
              </div>
            </div>
          );
        })}
      </nav>
    </header>
  );
}
