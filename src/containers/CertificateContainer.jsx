import React, { useEffect, useState } from "react";
import {
  uploadCertificate,
  getCertificates,
  deleteCertificate,
} from "../services/certificateApi";

import CertificateUpload from "../components/certificates/CertificateUpload";
import CertificateCard from "../components/certificates/CertificateCard";
import { Box, Typography } from "@mui/material";

export default function CertificateContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [certificates, setCertificates] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const res = await getCertificates(userId);
    setCertificates(res.data);
  };

  // ✅ SINGLE RESPONSIBILITY: upload selected file
  const handleUpload = async (file) => {
  if (!file) return;

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    formData.append("file", file);        // ✅ File object
    formData.append("user_id", user.id);  // ✅ Required

    await uploadCertificate(formData);
    fetchCertificates();
  } catch (error) {
    console.error(
      "Certificate upload failed:",
      error.response?.data || error.message
    );
  }
};



  const handleDelete = async (id) => {
    if (!window.confirm("Delete certificate?")) return;
    await deleteCertificate(id);
    fetchCertificates();
  };

  return (
    <Box>
      <CertificateUpload
        uploading={uploading}
        onFileSelect={handleUpload}   // ✅ DIRECT PASS
      />

      <Typography variant="h6" mb={2}>
        Your Certificates
      </Typography>

      {certificates.length === 0 ? (
        <Typography>No certificates uploaded</Typography>
      ) : (
        certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            onDelete={handleDelete}
          />
        ))
      )}
    </Box>
  );
}

