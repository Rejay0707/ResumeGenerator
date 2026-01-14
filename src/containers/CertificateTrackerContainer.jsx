import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import CertificateTable from "../components/certificate/CertificateTable";
import CertificateCards from "../components/certificate/CertificateCards";
import CertificateDialog from "../components/certificate/CertificateDialog";
import api from "../services/api";

export default function CertificateTrackerContainer() {
  const isMobile = useMediaQuery("(max-width:900px)");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userId) fetchCertificates();
  }, [userId]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/certifications", {
        params: {
          user_id: userId,
          verified: true,
        },
      });

      const formatted = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        issuer: item.issuer,
        issueDate: item.year,
        description: item.description,
      }));

      setCertificates(formatted);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadSuccess = () => {
    fetchCertificates();
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2} color="black">
        <Typography variant="h5" fontWeight="bold" >
          Certificates
        </Typography>

        <Button variant="contained" onClick={handleAdd}>
          Upload Certificate
        </Button>
      </Box>

      {!certificates.length ? (
        <Typography color="black">No verified certificates found.</Typography>
      ) : isMobile ? (
        <CertificateCards data={certificates} />
      ) : (
        <CertificateTable data={certificates} />
      )}

      <CertificateDialog
        open={open}
        onClose={handleClose}
        onSuccess={handleUploadSuccess}
      />
    </Box>
  );
}
