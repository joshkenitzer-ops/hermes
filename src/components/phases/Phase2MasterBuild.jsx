import { useState } from "react";
import FindingCard from "../shared/FindingCard";
import useHermesStore from "../../store/useHermesStore";
import { buildMaster, checkSlop } from "../../services/buildService";

export default function Phase2MasterBuild({ onComplete, onBack }) {
  const { careerInventory, auditFindings, masterResume, setMasterResume } = useHermesStore();
  const [draft, setDraft] = useState(masterResume || "");
  const [slopFindings, setSlopFindings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [built, setBuilt] = useState(!!masterResume);

  async function handleBuild() {
    setLoading(true);
    try {
      const result = await buildMaster(careerInventory, auditFindings);
      setDraft(result);
      setBuilt(true);
      const findings = await checkSlop(result);
      setSlopFindings(findings);
    } finally {
      setLoading(false);
    }
  }

  async function handleDraftChange(e) {
    const text = e.target.value;
    setDraft(text);
    if (text.length > 100) {
      const findings = await checkSlop(text);
      setSlopFindings(findings);
    }
  }

  function handleConfirm() {
    setMasterResume(draft);
    onComplete();
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>Master Resume</h1>
      <p style={{ color: "#aaaaaa", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
        This is your source document. Every tailored application comes from here.
        Review each section and confirm before moving on.
      </p>

      {!built ? (
        <button
          onClick={handleBuild}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#2a2a2a" : "#7B2FBE",
            color: loading ? "#666" : "#ffffff",
            border: "none",
            borderRadius: 6,
            padding: "14px 32px",
            fontSize: 15,
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 32,
          }}
        >
          {loading ? "Building..." : "Build Master Resume"}
        </button>
      ) : (
        <>
          <textarea
            value={draft}
            onChange={handleDraftChange}
            style={{
              width: "100%",
              minHeight: 400,
              backgroundColor: "#111111",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              color: "#ffffff",
              fontSize: 13,
              padding: 16,
              fontFamily: "Arial, sans-serif",
              resize: "vertical",
              lineHeight: 1.7,
              boxSizing: "border-box",
              marginBottom: 24,
            }}
          />

          {slopFindings.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#666", marginBottom: 10 }}>
                SLOP AND FORMATTING ({slopFindings.length})
              </div>
              {slopFindings.map((f, i) => (
                <FindingCard key={i} severity={f.severity} title={f.title} detail={f.detail} fix={f.fix} />
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
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
              onClick={handleConfirm}
              disabled={!draft.trim()}
              style={{
                backgroundColor: draft.trim() ? "#7B2FBE" : "#2a2a2a",
                color: draft.trim() ? "#ffffff" : "#666",
                border: "none",
                borderRadius: 6,
                padding: "12px 32px",
                fontSize: 14,
                fontWeight: "bold",
                cursor: draft.trim() ? "pointer" : "not-allowed",
              }}
            >
              Confirm Master and Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
