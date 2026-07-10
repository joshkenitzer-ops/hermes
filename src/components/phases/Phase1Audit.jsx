import { useEffect, useState } from "react";
import FindingCard from "../shared/FindingCard";
import useHermesStore from "../../store/useHermesStore";
import { runAudit } from "../../services/auditService";

export default function Phase1Audit({ onComplete, onBack }) {
  const { careerInventory, auditFindings, setAuditFindings } = useHermesStore();
  const [loading, setLoading] = useState(!auditFindings.length);

  useEffect(() => {
    if (!auditFindings.length) {
      runAudit(careerInventory).then(findings => {
        setAuditFindings(findings);
        setLoading(false);
      });
    }
  }, []);

  const grouped = {
    Critical: auditFindings.filter(f => f.severity === "Critical"),
    High: auditFindings.filter(f => f.severity === "High"),
    Medium: auditFindings.filter(f => f.severity === "Medium"),
    Low: auditFindings.filter(f => f.severity === "Low"),
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>Audit</h1>
      <p style={{ color: "#aaaaaa", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
        Hermes reviewed your material. These findings carry forward as a working checklist through the build.
        You don't need to act on all of them now.
      </p>

      {loading ? (
        <div style={{ color: "#7B2FBE", fontSize: 14, padding: 40, textAlign: "center" }}>
          Running audit...
        </div>
      ) : (
        <>
          {auditFindings.length === 0 && (
            <div style={{ color: "#aaaaaa", fontSize: 14, padding: 24 }}>No findings. Material looks clean.</div>
          )}

          {["Critical", "High", "Medium", "Low"].map(sev =>
            grouped[sev].length > 0 && (
              <div key={sev} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#666", marginBottom: 10 }}>
                  {sev.toUpperCase()} ({grouped[sev].length})
                </div>
                {grouped[sev].map((f, i) => (
                  <FindingCard key={i} severity={f.severity} title={f.title} detail={f.detail} fix={f.fix} />
                ))}
              </div>
            )
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <button
              onClick={onBack}
              style={{
                backgroundColor: "transparent",
                color: "#aaaaaa",
                border: "1px solid #2a2a2a",
                borderRadius: 6,
                padding: "12px 24px",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Back
            </button>
            <button
              onClick={onComplete}
              style={{
                backgroundColor: "#7B2FBE",
                color: "#ffffff",
                border: "none",
                borderRadius: 6,
                padding: "12px 32px",
                fontSize: 14,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Continue to Master Build
            </button>
          </div>
        </>
      )}
    </div>
  );
}
