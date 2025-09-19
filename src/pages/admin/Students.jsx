import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import useAdminManagement from "../../containers/AdminManagement";
import EntityList from "../../components/EntityList";
import EntityFormDialog from "../../components/EntityFormDialog";

export default function Students() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useAdminManagement("students");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAdd = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (id) => {
    const item = items.find((i) => i.id === id);
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      addItem(formData);
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, pt: 0, textAlign: "left" }}>
      <Typography variant="h4" gutterBottom>
        Manage Students
      </Typography>
      <EntityList
        items={items}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
      />
    </Box>
  );
}
