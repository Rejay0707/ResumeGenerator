import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

export default function MyApplicationsPage({ applications = [] }) {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        My Applications
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        {/* ✅ Scroll wrapper */}
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Internship</strong></TableCell>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No applications yet
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app) => (
                  <TableRow key={app.application_id} hover>
                    <TableCell>{app.internship_title}</TableCell>
                    <TableCell>{app.company}</TableCell>
                    <TableCell>
                      <Chip
                        label={app.status}
                        color={
                          app.status === "approved"
                            ? "success"
                            : app.status === "rejected"
                            ? "error"
                            : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}