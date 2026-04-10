import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  CircularProgress,
  Box,
  IconButton, // ADD THIS
  Tooltip, // ADD THIS
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload"; // ADD THIS
import * as XLSX from "xlsx";

export default function ModerationTable({
  data = [],
  loading,
  onApprove,
  onReject,
}) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data.length) {
    return (
      <Typography sx={{ mt: 3 }} color="text.secondary">
        No submissions found.
      </Typography>
    );
  }

  // ADD THIS FUNCTION
  const handleDownloadCSV = () => {
    try {
      const fileName = `moderation-${data[0]?.status || "all"}.csv`;
      const columns = ["Student", "Title", "Status", "Date"];

      const csvData = [
        columns,
        ...data.map((item) => [
          item.student_name || "-",
          item.title || "-",
          item.status || "pending",
          item.created_at || "-",
        ]),
      ];

      const ws = XLSX.utils.aoa_to_sheet(csvData);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("CSV generation failed:", err);
      alert("Failed to generate CSV.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title="Download CSV">
          <IconButton onClick={handleDownloadCSV} color="primary">
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <strong>Student</strong>
            </TableCell>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Status</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              hover
              sx={{
                transition: "background 0.2s",
              }}
            >
              <TableCell>{item.student_name}</TableCell>
              <TableCell>{item.title}</TableCell>

              <TableCell>
                <Chip
                  label={item.status}
                  color={getStatusColor(item.status)}
                  size="small"
                />
              </TableCell>

              <TableCell>{item.created_at}</TableCell>

              <TableCell align="center">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => onApprove(item)}
                >
                  Approve
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onReject(item)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
