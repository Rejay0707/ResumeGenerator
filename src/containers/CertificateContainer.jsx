import React, { useEffect, useState } from "react";
import {
  uploadCertificate,
  getCertificates,
  deleteCertificate,
  editCertificate
} from "../services/certificateApi";

import CertificateUpload from "../components/certificates/CertificateUpload";
import CertificateCard from "../components/certificates/CertificateCard";
import {
  Box,
  Typography,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CertificateContainer() {
  const isMobile = useMediaQuery("(max-width:900px)");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [certificates, setCertificates] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const res = await getCertificates(userId);
    console.log(res)
    setCertificates(res.data);
  };

  // ✅ SINGLE RESPONSIBILITY: upload selected file
  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true); // ✅ START LOADING

      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.id);

      await uploadCertificate(formData);

      await fetchCertificates(); // wait properly
    } catch (error) {
      console.error(
        "Certificate upload failed:",
        error.response?.data || error.message,
      );
    } finally {
      setUploading(false); // ✅ STOP LOADING
    }
  };

  const handleEdit = async (certificateId, updatedData, newFile) => {
    console.log("EDIT CALLED", certificateId, updatedData, newFile);
    try {
      const formData = new FormData();
      formData.append("certificate_id", certificateId);
      formData.append("title", updatedData.title);
      formData.append("issuer", updatedData.issuer);
      formData.append("issue_date", updatedData.issue_date);
     formData.append("category", updatedData.category);

      if (newFile) {
        formData.append("file", newFile);
      }

      await editCertificate(certificateId, formData);
      await fetchCertificates();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete certificate?")) return;
    await deleteCertificate(id);
    await fetchCertificates();
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="black">
          Certificates
        </Typography>

        {isMobile && (
          <Tooltip title="Upload Certificate" arrow placement="left">
            <IconButton
              onClick={() =>
                document.getElementById("certificate-upload-input").click()
              }
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                width: 40,
                height: 40,
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <CertificateUpload
        uploading={uploading}
        onFileSelect={handleUpload} // ✅ DIRECT PASS
      />

      <Typography variant="h6" mb={2} color="black">
        Your Certificates
      </Typography>

      {certificates.length === 0 ? (
        <Box
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            border: "1px dashed #ccc",
            borderRadius: 2,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No Certificates Available
          </Typography>
          <Typography variant="body2">
            Click <b>Upload Certificate</b> to add your achievements.
          </Typography>
        </Box>
      ) : (
        certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </Box>
  );
}