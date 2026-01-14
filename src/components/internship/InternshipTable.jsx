import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import StatusChip from "./StatusChip";

export default function InternshipTable({ data, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Company</b></TableCell>
            <TableCell><b>Role</b></TableCell>
            <TableCell><b>Start Date</b></TableCell>
            <TableCell><b>End Date</b></TableCell>
            <TableCell><b>Mentor Feedback</b></TableCell>
            <TableCell><b>Student Learning</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Applied Date</b></TableCell>
            <TableCell><b>Internship Type</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>{item.start_date || "N/A"}</TableCell>
              <TableCell>{item.end_date || "Present"}</TableCell>
              <TableCell>{item.mentor_feedback || "Present"}</TableCell>
              <TableCell>{item.student_learnings || "Present"}</TableCell>
              <TableCell>{item.description || "Present"}</TableCell>
              <TableCell>
                <StatusChip status={item.status} />
              </TableCell>
              <TableCell>{item.applied_date || "N/A"}</TableCell>
              <TableCell>{item.internship_type || "N/A"}</TableCell>

              <TableCell>
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(item)}
                  >
                    {item.status === "completed" ? "View" : "Edit"}
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
