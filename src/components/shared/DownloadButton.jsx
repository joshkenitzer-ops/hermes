export default function DownloadButton({ onDownload, label = "Download", disabled = false }) {
  return (
    <button
      onClick={onDownload}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#2a2a2a" : "#7B2FBE",
        color: disabled ? "#666" : "#ffffff",
        border: "none",
        borderRadius: 6,
        padding: "12px 24px",
        fontSize: 14,
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "pointer",
        letterSpacing: 0.5,
      }}
    >
      {label}
    </button>
  );
}
