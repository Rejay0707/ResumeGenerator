import React from "react";

function FormInput({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        <strong>{label}</strong>
      </label>
      <br />
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}

export default FormInput;
