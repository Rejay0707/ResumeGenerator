import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../services/educationApi";
import EducationCard from "../components/EducationCard";
import EducationForm from "../components/EducationForm";

const emptyForm = {
  id: null,
  level: "college",
  institution: "",
  degree: "",
  field_of_study: "",
  board: "",
  grade: "",
  start_year: "",
  end_year: "",
};

export default function EducationContainer() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchEducation = async () => {
    const res = await getEducation(userId);
    setList(res.data || []);
  };

  useEffect(() => {
    if (userId) fetchEducation();
  }, [userId]);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setOpen(true);
  };

  const handleOpenEdit = (item) => {
    setForm({
      id: item.id || null,
      level: item.level || "college",
      institution: item.institution || "",
      degree: item.degree || "",
      field_of_study: item.field_of_study || "",
      board: item.board || "",
      grade: item.grade || "",
      start_year: item.start_year || "",
      end_year: item.end_year || "",
    });
    setOpen(true);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (form.id) {
      await updateEducation(form.id, form);
    } else {
      await addEducation({ ...form, user_id: userId });
    }
    setOpen(false);
    fetchEducation();
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteEducation(itemToDelete);
      fetchEducation();
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="black">
          Education
        </Typography>

        {isMobile ? (
          <Tooltip title="Add Education" arrow placement="left">
            <IconButton
              onClick={handleOpenAdd}
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
          <Button variant="contained" onClick={handleOpenAdd}>
            Add Education
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {list.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <EducationCard
              item={item}
              onEdit={handleOpenEdit}
              onDelete={() => {
                setItemToDelete(item.id);
                setDeleteDialogOpen(true);
              }}
            />
          </Grid>
        ))}
      </Grid>

      <EducationForm
        open={open}
        onClose={() => setOpen(false)}
        form={form}
        onChange={handleChange}
        onSave={handleSave}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this education entry?
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
