// components/DownloadButton.jsx
import React from "react";

export default function DownloadButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        backgroundColor: disabled ? "#ccc" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "16px",
      }}
      aria-label="Download Resume"
      title="Download Resume"
    >
      {/* Simple download icon (Unicode) */}
      <span>⬇️</span> Download Resume
    </button>
  );
}