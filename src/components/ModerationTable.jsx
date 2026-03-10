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
} from "@mui/material";

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
