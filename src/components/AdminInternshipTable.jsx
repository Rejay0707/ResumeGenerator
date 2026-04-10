import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Box,
  Chip,
  IconButton, // ADD THIS
  Tooltip,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";

export default function AdminInternshipTable({ data, onApprove, onReject }) {
  if (!data.length) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        No pending internships 🎉
      </Paper>
    );
  }

  // ADD THIS FUNCTION inside AdminInternshipTable component
  const handleDownloadCSV = () => {
    try {
      const fileName = "internships-pending.csv";
      const columns = [
        "Student",
        "Company",
        "Role",
        "Description",
        "Duration",
        "Status",
      ];

      const csvData = [
        columns,
        ...data.map((item) => [
          item.student_name || "-",
          item.company || "-",
          item.role || "-",
          item.description || "-",
          item.duration || "-",
          item.approval_status || "pending",
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

  return (
    <div>
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title="Download CSV">
          <IconButton onClick={handleDownloadCSV} color="primary">
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Student</b>
              </TableCell>
              <TableCell>
                <b>Company</b>
              </TableCell>
              <TableCell>
                <b>Role</b>
              </TableCell>
              <TableCell>
                <b>Descrition</b>
              </TableCell>
              <TableCell>
                <b>Duration</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.student_name}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.description || "Present"}</TableCell>
                <TableCell>{item.duration || "Present"}</TableCell>
                <TableCell>
                  {item.approval_status === "approved" && (
                    <Chip label="Approved" color="success" />
                  )}

                  {item.approval_status === "rejected" && (
                    <Chip label="Rejected" color="error" />
                  )}

                  {(!item.approval_status ||
                    item.approval_status === "pending") && (
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => onApprove(item)}
                      >
                        Approve
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => onReject(item)}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
