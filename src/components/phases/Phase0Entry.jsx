import { useState } from "react";
import FileUpload from "../shared/FileUpload";
import useHermesStore from "../../store/useHermesStore";
import { extractFromFile, extractFromText } from "../../services/extractionService";

export default function Phase0Entry({ onComplete }) {
  const { setEntryMode, setRawInput, setCareerInventory } = useHermesStore();
  const [mode, setMode] = useState(null); // "upload" | "paste" | "scratch"
  const [pasteText, setPasteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);

  async function handleFile(f) {
    setFile(f);
    setFileName(f.name);
  }

  async function handleContinue() {
    setLoading(true);
    try {
      let raw = "";
      if (mode === "upload" && file) {
        raw = await extractFromFile(file);
      } else if (mode === "paste") {
        raw = pasteText;
      } else if (mode === "scratch") {
        raw = "";
      }
      setEntryMode(mode);
      setRawInput(raw);
      const inventory = await extractFromText(raw, mode);
      setCareerInventory(inventory);
      onComplete();
    } finally {
      setLoading(false);
    }
  }

  const canContinue =
    (mode === "upload" && file) ||
    (mode === "paste" && pasteText.trim().length > 50) ||
    mode === "scratch";

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>Let's build your resume.</h1>
      <p style={{ color: "#aaaaaa", fontSize: 15, marginBottom: 40, lineHeight: 1.6 }}>
        Start with what you have. If you have a performance review or existing resume, upload it.
        If you're starting from scratch, that works too.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {[
          { key: "upload", label: "Upload a document", sub: "Performance review or existing resume" },
          { key: "paste", label: "Paste text", sub: "Copy from any document" },
          { key: "scratch", label: "Start from scratch", sub: "No existing material" },
        ].map(opt => (
          <button
            key={opt.key}
            onClick={() => setMode(opt.key)}
            style={{
              flex: 1,
              padding: "20px 16px",
              backgroundColor: mode === opt.key ? "#1a0a2e" : "#111111",
              border: `1px solid ${mode === opt.key ? "#7B2FBE" : "#2a2a2a"}`,
              borderRadius: 8,
              color: "#ffffff",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>{opt.label}</div>
            <div style={{ fontSize: 12, color: "#888888" }}>{opt.sub}</div>
          </button>
        ))}
      </div>

      {mode === "upload" && (
        <div style={{ marginBottom: 24 }}>
          <FileUpload
            label={fileName ? `Selected: ${fileName}` : "Upload your document"}
            onFile={handleFile}
          />
          <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
            Privacy note: remove colleague names and sensitive third-party content before uploading a performance document.
          </p>
        </div>
      )}

      {mode === "paste" && (
        <div style={{ marginBottom: 24 }}>
          <textarea
            value={pasteText}
            onChange={e => setPasteText(e.target.value)}
            placeholder="Paste your resume or performance review text here..."
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
              boxSizing: "border-box",
            }}
          />
        </div>
      )}

      {mode === "scratch" && (
        <div style={{
          backgroundColor: "#111111",
          border: "1px solid #2a2a2a",
          borderRadius: 8,
          padding: 20,
          marginBottom: 24,
          color: "#aaaaaa",
          fontSize: 14,
          lineHeight: 1.6,
        }}>
          We'll walk you through building your master resume from the ground up. Have your employment history, key accomplishments, and any credentials or certifications on hand.
        </div>
      )}

      {mode && (
        <button
          onClick={handleContinue}
          disabled={!canContinue || loading}
          style={{
            backgroundColor: canContinue && !loading ? "#7B2FBE" : "#2a2a2a",
            color: canContinue && !loading ? "#ffffff" : "#666",
            border: "none",
            borderRadius: 6,
            padding: "14px 32px",
            fontSize: 15,
            fontWeight: "bold",
            cursor: canContinue && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Processing..." : "Continue to Audit"}
        </button>
      )}
    </div>
  );
}
