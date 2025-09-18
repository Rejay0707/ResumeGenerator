import React from "react";

export default function Button({ children, onClick, disabled, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        backgroundColor: disabled ? "#ccc" : "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "1rem",
      }}
    >
      {children}
    </button>
  );
}