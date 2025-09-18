import React from "react";

export default function TextInput({ label, name, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={name} style={{ fontWeight: "bold", display: "block", marginBottom: 4 }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}