import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { uploadCertificate } from "../../services/certificates.api";

export default function CertificateDialog({ open, onClose, onSuccess }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    issuer: "",
    year: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", form.name);
    formData.append("issuer", form.issuer);
    formData.append("year", form.year);
    formData.append("file", form.file);

    try {
      await uploadCertificate(formData);
      onSuccess(); // refresh list
      onClose();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload certificate");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload Certificate</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <TextField
          label="Certificate Name"
          name="name"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Issuer"
          name="issuer"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Year"
          name="year"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />

        <Button component="label" sx={{ mt: 2 }}>
          Upload File
          <input
            type="file"
            hidden
            name="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleChange}
          />
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
