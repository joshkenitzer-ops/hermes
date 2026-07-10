import { useEffect, useState } from "react";
import FindingCard from "../shared/FindingCard";
import DownloadButton from "../shared/DownloadButton";
import useHermesStore from "../../store/useHermesStore";
import { runThreeTierReview } from "../../services/reviewService";
import { generateDocx } from "../../services/docxService";

const TIERS = ["Critical", "Pedantic", "Team Lead"];

export default function Phase6Review({ onBack }) {
  const { tailoredResume, reviewFindings, setReviewFindings } = useHermesStore();
  const [loading, setLoading] = useState(!reviewFindings.length);
  const [currentTier, setCurrentTier] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [verdict, setVerdict] = useState(null);

  useEffect(() => {
    if (!reviewFindings.length) {
      runThreeTierReview(tailoredResume, (tier, findings, v) => {
        setCurrentTier(tier);
        setReviewFindings(prev => [...prev, ...findings]);
        if (v) setVerdict(v);
      }).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const critical = reviewFindings.filter(f => f.severity === "Critical");
  const canDownload = critical.length === 0;

  async function handleDownload() {
    setDownloading(true);
    try {
      await generateDocx(tailoredResume);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>Final Review</h1>
      <p style={{ color: "#aaaaaa", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
        Three-tier verification: Critical, Pedantic, and Team Lead passes.
        Critical findings must be resolved before download.
      </p>

      {loading && (
        <div style={{ color: "#7B2FBE", fontSize: 14, marginBottom: 24 }}>
          Running {TIERS[currentTier]} pass...
        </div>
      )}

      {reviewFindings.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          {["Critical", "High", "Medium", "Low"].map(sev => {
            const group = reviewFindings.filter(f => f.severity === sev);
            return group.length > 0 ? (
              <div key={sev} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "#666", marginBottom: 10 }}>
                  {sev.toUpperCase()} ({group.length})
                </div>
                {group.map((f, i) => (
                  <FindingCard key={i} severity={f.severity} title={f.title} detail={f.detail} fix={f.fix} />
                ))}
              </div>
            ) : null;
          })}
        </div>
      )}

      {!loading && verdict && (
        <div style={{
          backgroundColor: "#111111",
          border: "1px solid #2a2a2a",
          borderRadius: 8,
          padding: 20,
          marginBottom: 32,
          fontSize: 14,
          color: "#cccccc",
          lineHeight: 1.6,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#666", marginBottom: 8 }}>TEAM LEAD VERDICT</div>
          {verdict}
        </div>
      )}

      {!loading && !canDownload && (
        <div style={{
          backgroundColor: "#2a0a0a",
          border: "1px solid #cc2200",
          borderRadius: 8,
          padding: 16,
          marginBottom: 24,
          fontSize: 13,
          color: "#ff4422",
        }}>
          {critical.length} Critical finding{critical.length > 1 ? "s" : ""} must be resolved before download.
          Go back to the master build or tailoring phase to address them.
        </div>
      )}

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
        <DownloadButton
          onDownload={handleDownload}
          disabled={!canDownload || downloading}
          label={downloading ? "Generating..." : "Download Resume"}
        />
      </div>
    </div>
  );
}
