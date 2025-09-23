import React, { useState, useEffect, useMemo } from "react"; // Added useMemo
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function EntityFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  entityType = "default",
}) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  // Memoize fields to prevent new array on every render (fixes useEffect loop)
  const fields = useMemo(() => {
    if (entityType === "students") {
      return [
        { key: "admissionNo", label: "Admission No", type: "text", required: true },
        { key: "name", label: "Name", type: "text", required: true },
        { key: "fatherName", label: "Father Name", type: "text", required: true },
        { key: "dob", label: "Date of Birth (YYYY-MM-DD)", type: "text", required: true },
        { key: "classSec", label: "Class/Section", type: "text", required: true },
        { key: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
        { key: "phone", label: "Phone", type: "tel", required: false },
        { key: "email", label: "Email", type: "email", required: true },
      ];
    } else if (entityType === "parents") {
      return [
        { key: "name", label: "Name", type: "text", required: true },
        { key: "email", label: "Email", type: "email", required: true },
      ];
    }
    // Fallback
    return [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
    ];
  }, [entityType]); // Only re-compute if entityType changes

  useEffect(() => {
    if (open) {
      if (initialData) {
        // Edit: Pre-fill all fields as strings
        const prefilledForm = {};
        fields.forEach((field) => {
          prefilledForm[field.key] = String(initialData[field.key] || ""); // Ensure string
        });
        setForm(prefilledForm);
      } else {
        // Add: Empty all fields as strings
        const emptyForm = {};
        fields.forEach((field) => {
          emptyForm[field.key] = "";
        });
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [open, initialData, fields]); // fields is now stable (memoized)

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: String(value) })); // Ensure string update
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const fieldValue = form[field.key];
      if (field.required && !fieldValue?.toString().trim()) {
        newErrors[field.key] = `${field.label} is required`;
      } else if (field.type === "email" && fieldValue && !/\S+@\S+\.\S+/.test(fieldValue)) {
        newErrors[field.key] = "Invalid email";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
      onClose();
    } else {
      console.log("Submit blocked by validation");
    }
  };

  const isEditing = !!initialData;
  const title = isEditing 
    ? `Edit ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}` 
    : `Add ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`;



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {field.type === "select" ? (
              <FormControl fullWidth error={!!errors[field.key]} required={field.required}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={form[field.key] || ""} // Ensure string
                  label={field.label}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <TextField // Helper for error (like TextField's helperText)
                  variant="standard"
                  value={errors[field.key] || ""}
                  error={!!errors[field.key]}
                  helperText={errors[field.key]}
                  style={{ minHeight: 20, marginTop: 4 }} // Mimic helperText style
                  InputProps={{ disableUnderline: true }}
                />
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                value={form[field.key] || ""} // Controlled by form state
                onChange={(e) => handleChange(field.key, e.target.value)}
                required={field.required}
                error={!!errors[field.key]}
                helperText={errors[field.key] || (field.key === "dob" ? "YYYY-MM-DD" : "")}
                margin="normal"
                inputProps={
                  field.key === "phone"
                    ? { maxLength: 15 }
                    : field.key === "dob"
                    ? { placeholder: "YYYY-MM-DD" }
                    : {}
                }
              />
            )}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}