import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, TextField } from "@mui/material";

const PersonalInfoForm = ({ setPersonal }) => {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  // Update field locally + push to parent
  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setPersonal(updated); // <-- now parent gets updated values
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Personal Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              sx={{
                background: "white",
                borderRadius: "8px",
                "& .MuiInputBase-root": { minHeight: "45px" },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              sx={{
                background: "white",
                borderRadius: "8px",
                "& .MuiInputBase-root": { minHeight: "45px" },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              sx={{
                background: "white",
                borderRadius: "8px",
                "& .MuiInputBase-root": { minHeight: "45px" },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              sx={{
                background: "white",
                borderRadius: "8px",
                "& .MuiInputBase-root": { minHeight: "45px" },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
