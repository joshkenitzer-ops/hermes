import { useState } from "react";
import FindingCard from "../shared/FindingCard";
import useHermesStore from "../../store/useHermesStore";
import { tailorResume, checkSlop } from "../../services/tailorService";

export default function Phase5Tailoring({ onComplete, onBack }) {
  const { masterResume, jdText, setJdText, setTailoredResume } = useHermesStore();
  const [jd, setJd] = useState(jdText || "");
  const [tailored, setTailored] = useState("");
  const [slopFindings, setSlopFindings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleTailor() {
    setLoading(true);
    try {
      setJdText(jd);
      const result = await tailorResume(masterResume, jd);
      setTailored(result);
      const findings = await checkSlop(result);
      setSlopFindings(findings);
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  function handleConfirm() {
    setTailoredResume(tailored);
    onComplete();
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>Tailoring</h1>
      <p style={{ color: "#aaaaaa", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
        Paste the job description. Hermes will map your master to the role, mirror the JD language,
        and reorder your experience so the strongest match leads.
      </p>

      {!done ? (
        <>
          <textarea
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="Paste the full job description here..."
            style={{
              width: "100%",
              minHeight: 240,
              backgroundColor: "#111111",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              color: "#ffffff",
              fontSize: 13,
              padding: 16,
              fontFamily: "Arial, sans-serif",
              resize: "vertical",
              marginBottom: 24,
              boxSizing: "border-box",
            }}
          />
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
              onClick={handleTailor}
              disabled={jd.trim().length < 50 || loading}
              style={{
                backgroundColor: jd.trim().length >= 50 && !loading ? "#7B2FBE" : "#2a2a2a",
                color: jd.trim().length >= 50 && !loading ? "#ffffff" : "#666",
                border: "none",
                borderRadius: 6,
                padding: "12px 32px",
                fontSize: 14,
                fontWeight: "bold",
                cursor: jd.trim().length >= 50 && !loading ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "Tailoring..." : "Tailor Resume"}
            </button>
          </div>
        </>
      ) : (
        <>
          <textarea
            value={tailored}
            onChange={e => setTailored(e.target.value)}
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
              onClick={() => setDone(false)}
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
              Continue to Final Review
            </button>
          </div>
        </>
      )}
    </div>
  );
}
