import React from "react";
import { Box, Paper, Typography, IconButton, Chip, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CertificateCard({ certificate, onDelete }) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">{certificate.title}</Typography>

        <IconButton onClick={() => onDelete(certificate.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Typography variant="body2">Issuer: {certificate.issuer}</Typography>

      <Typography variant="body2">Category: {certificate.category}</Typography>

      <Typography variant="body2">
        Issue Date: {certificate.issue_date}
      </Typography>

      <Box mt={1} display="flex" gap={1} flexWrap="wrap">
        {certificate.skills?.map((skill, idx) => (
          <Chip key={idx} label={skill} size="small" />
        ))}
      </Box>

      <Box mt={1}>
        <Link
          href={certificate.file_url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontWeight: 500 }}
        >
          View Certificate
        </Link>
      </Box>
    </Paper>
  );
}
