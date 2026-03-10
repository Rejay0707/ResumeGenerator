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
} from "@mui/material";

export default function AdminInternshipTable({ data, onApprove, onReject }) {
  if (!data.length) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        No pending internships 🎉
      </Paper>
    );
  }

  return (
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
  );
}
