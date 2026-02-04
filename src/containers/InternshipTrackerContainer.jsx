import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  CircularProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InternshipTable from "../components/internship/InternshipTable";
import InternshipCards from "../components/internship/InternshipCards";
import InternshipDialog from "../components/internship/InternshipDialog";
import api from "../services/api";

export default function InternshipTrackerContainer() {
  const isMobile = useMediaQuery("(max-width:900px)");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchInternships();
    }
  }, [userId]);

  const fetchInternships = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/internships/tracker", {
        params: { user_id: userId },
      });

      // console.log("FETCH RESPONSE:", res.data);

      const formatted = res.data.map((item) => ({
        id: item.id,
        company: item.company,
        role: item.role,
        internship_type: item.internship_type,
        start_date: item.start_date,
        end_date: item.end_date,
        applied_date: item.applied_date,
        status: item.status,
        mentor_feedback: item.mentor_feedback,
        student_learnings: item.student_learnings,
        description: item.description,
        notes: item.notes,
        duration: `${item.start_date} – ${item.end_date || "Present"}`,
      }));

      setInternships(formatted);
    } catch (error) {
      console.error(
        "Failed to fetch internships:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEditView = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await api.delete(`/api/internships/tracker/${itemToDelete}`);
        fetchInternships();
      } catch (error) {
        console.error(
          "Failed to delete internship:",
          error.response?.data || error.message,
        );
      }
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  const handleSave = async (payload) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const finalPayload = {
        ...payload,
        user_id: user.id,
      };

      if (selected?.id) {
        // EDIT
        await api.put(`/api/internships/tracker/${selected.id}`, finalPayload);
      } else {
        // ADD
        await api.post("/api/internships/tracker", finalPayload);
      }

      handleClose();
      fetchInternships();
    } catch (error) {
      console.error(
        "Failed to save internship:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2} color="black">
        <Typography variant="h5" fontWeight="bold" color="black">
          Internship Tracker
        </Typography>

        {isMobile ? (
          <Tooltip title="Add Internship" arrow placement="left">
            <IconButton
              onClick={handleAdd}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                width: 40,
                height: 40,
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Button variant="contained" onClick={handleAdd}>
            Add Internship
          </Button>
        )}
      </Box>

      {!internships.length ? (
        <Typography color="black">No internships found.</Typography>
      ) : isMobile ? (
        <InternshipCards
          data={internships}
          onEdit={handleEditView}
          onDelete={handleDelete}
        />
      ) : (
        <InternshipTable
          data={internships}
          onEdit={handleEditView}
          onDelete={handleDelete}
        />
      )}

      <InternshipDialog
        open={open}
        onClose={handleClose}
        data={selected}
        readOnly={selected?.status === "completed"}
        onSave={handleSave}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this internship?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
