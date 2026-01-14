import {
  Grid,
  Button,
  CircularProgress,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import ProjectsContainer from "../containers/ProjectsContainer";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectTable from "../components/projects/ProjectTable";
import ProjectFormDialog from "../components/projects/ProjectFormDialog";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    openDialog,
    setOpenDialog,
    editData,
    setEditData,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = ProjectsContainer();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [deleteId, setDeleteId] = useState(null);

  /* ---------- HANDLERS ---------- */

  const handleEdit = (data) => {
    setEditData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    await handleDelete(deleteId);
    setDeleteId(null);
  };

  return (
    <>
      {/* HEADER */}
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            setEditData(null);
            setOpenDialog(true);
          }}
        >
          Add Project
        </Button>
      </Box>

      {/* CONTENT */}
      {loading ? (
        <CircularProgress />
      ) : projects.length === 0 ? (
        /* EMPTY STATE */
        <Box
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            border: "1px dashed #ccc",
            borderRadius: 2,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No Projects Available
          </Typography>
          <Typography variant="body2">
            Click <b>Add Project</b> to showcase your work.
          </Typography>
        </Box>
      ) : isMobile ? (
        /* MOBILE VIEW */
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} key={project.id}>
              <ProjectCard
                project={project}
                onEdit={handleEdit}
                onDelete={() => handleDeleteClick(project.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* DESKTOP VIEW */
        <ProjectTable
          data={projects}
          onEdit={handleEdit}
          onDelete={(id) => handleDeleteClick(id)}
        />
      )}

      {/* ADD / EDIT DIALOG */}
      <ProjectFormDialog
        open={openDialog}
        initialData={editData}
        onClose={handleCloseDialog}
        onSubmit={(data) =>
          editData
            ? handleUpdate(editData.id, data)
            : handleCreate(data)
        }
      />

      {/* DELETE CONFIRMATION */}
      <ConfirmDeleteDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
      />
    </>
  );
}
