import { useRef } from "react";

export default function FileUpload({ onFile, accept = ".pdf,.docx", label = "Upload file" }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) onFile(file);
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      style={{
        border: "1px dashed #7B2FBE",
        borderRadius: 8,
        padding: "32px 24px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#0f0f1a",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#a050e0"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#7B2FBE"}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <div style={{ fontSize: 28, marginBottom: 10 }}>↑</div>
      <div style={{ fontSize: 14, color: "#cccccc", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#666666" }}>PDF or DOCX</div>
    </div>
  );
}
