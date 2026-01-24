import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function CertificateUpload({ onFileSelect, uploading }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // open file picker
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);        // send file to parent
      e.target.value = "";       // allow re-selecting same file
    }
  };

  return (
    <Box mb={3}>
      <Typography variant="h6" mb={1}>
        Upload Certificate
      </Typography>

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={handleChange}
        disabled={uploading}
      />

      {/* Visible upload button */}
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
        disabled={uploading}
        sx={{ cursor: "pointer", textTransform: "none" }}
      >
        Choose File
      </Button>
    </Box>
  );
}
