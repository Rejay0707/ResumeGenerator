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

export default function InternshipTable({ data, onEdit, onDelete, isAdmin }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Company</b>
            </TableCell>
            <TableCell>
              <b>Role</b>
            </TableCell>
            <TableCell>
              <b>Start Date</b>
            </TableCell>
            <TableCell>
              <b>End Date</b>
            </TableCell>
            <TableCell>
              <b>Mentor Feedback</b>
            </TableCell>
            <TableCell>
              <b>Student Learning</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Approval</b>
            </TableCell>
            <TableCell>
              <b>Admin Notes</b>
            </TableCell>
            <TableCell>
              <b>Applied Date</b>
            </TableCell>
            <TableCell>
              <b>Internship Type</b>
            </TableCell>
            <TableCell>
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={13} align="center">
                No internships found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={item.id}
                sx={item.approval_status === "rejected" ? { opacity: 0.6 } : {}}
              >
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.start_date || "N/A"}</TableCell>
                <TableCell>{item.end_date || "Present"}</TableCell>
                <TableCell>{item.mentor_feedback || "-"}</TableCell>
                <TableCell>{item.student_learnings || "-"}</TableCell>
                <TableCell>{item.description || "-"}</TableCell>

                {/* Internship Progress Status */}
                <TableCell>
                  <StatusChip status={item.status} />
                </TableCell>

                {/* Admin Approval Status */}
                <TableCell>
                  <StatusChip status={item.approval_status} />
                </TableCell>

                {/* Admin Notes */}
                <TableCell>
                  {item.approval_status === "pending"
                    ? "-"
                    : item.admin_notes || "-"}
                </TableCell>

                <TableCell>{item.applied_date || "N/A"}</TableCell>
                <TableCell>{item.internship_type || "N/A"}</TableCell>

                <TableCell>
                  <Box display="flex" gap={1}>
                    {!isAdmin && (
                      <>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onEdit(item)}
                        >
                          {item.approval_status === "pending" ? "Edit" : "View"}
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          disabled={item.approval_status !== "pending"}
                          onClick={() => onDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}

                    {isAdmin && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onEdit?.(item)}
                      >
                        View
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
