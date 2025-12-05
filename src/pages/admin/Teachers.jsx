import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import useAdminManagement from "../../containers/AdminManagement";
import EntityList from "../../components/EntityList";
import EntityFormDialog from "../../components/EntityFormDialog";

export default function Teachers() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useAdminManagement("teachers");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formError, setFormError] = useState("");  // For form-specific errors

  const handleAdd = () => {
    setEditingItem(null);
    setFormError("");  // Clear any previous errors
    setDialogOpen(true);
  };

  const handleEdit = (id) => {
    const item = items.find((i) => i.id === id);
    setEditingItem(item);
    setFormError("");  // Clear errors on edit
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);  // Assuming updateItem is async
      } else {
        await addItem(formData);  // Assuming addItem is async and throws on error
      }
      setDialogOpen(false);
      setFormError("");  // Clear on success
    } catch (err) {
      // Extract and format the error from the response
      const errorMessage = err?.response?.data?.errors
        ? Object.values(err.response.data.errors).join(", ")  // e.g., "Email already exists"
        : err?.message || "An error occurred while saving.";  // Fallback
      setFormError(errorMessage);
      // Don't close the dialog so user can fix and retry
    }
  };

  const admin = JSON.parse(localStorage.getItem("user"));
  const adminCollege = admin?.college;

  const filteredTeachers = items.filter(
    (t) => t.college === adminCollege
  );

  return (
    <Box
      sx={{
        // Base padding for smallest screens
        px: 2,
        pt: 0,
        textAlign: "left",
        

        // MUI breakpoints
        "@media (min-width:600px)": {
          px: 4, // sm and up
        },
        "@media (max-width:600px)": {
          px: 1,
        },
        "@media(max-width:360px)":{
          px:0.2
        }
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: {
            xs: "1.5rem", // extra small
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
            xl: "3.5rem",
          },
        }}
      >
        Manage Teachers
      </Typography>
      <EntityList
        items={filteredTeachers}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        entityType="teachers"
      />
      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
        entityType="teachers"
        error={formError}  // Pass the form error here
      />
    </Box>
  );
}