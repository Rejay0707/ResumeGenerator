import {
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AdminInternshipTable from "../../components/AdminInternshipTable";

export default function AdminInternshipsPage({
  internships,
  loading,
  selected,
  actionType,
  notes,
  setNotes,
  onApprove,
  onReject,
  onCloseDialog,
  onConfirm,
}) {
  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Internship Approvals
      </Typography>

      <AdminInternshipTable
        data={internships}
        onApprove={onApprove}
        onReject={onReject}
      />

      <Dialog open={!!selected} onClose={onCloseDialog} fullWidth>
        <DialogTitle>
          {actionType === "approve"
            ? "Approve Internship"
            : "Reject Internship"}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Admin Notes"
            multiline
            rows={3}
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color={actionType === "approve" ? "success" : "error"}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}