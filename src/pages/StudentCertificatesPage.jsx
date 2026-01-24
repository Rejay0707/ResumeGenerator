import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import CertificateContainer from "../containers/CertificateContainer";

export default function StudentCertificatesPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>
          Certificates
        </Typography>

        <CertificateContainer />
      </Paper>
    </Box>
  );
}
