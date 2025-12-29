import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import useAdminManagement from "../../containers/AdminManagement";
import EntityList from "../../components/EntityList";
import EntityFormDialog from "../../components/EntityFormDialog";

export default function TimetablePage() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useAdminManagement("timetables");
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

   const admin = JSON.parse(localStorage.getItem("user"));
  const adminCollege = admin?.college;

  const filteredTimeTable = items.filter(
    (timTa) => timTa.college === adminCollege
  );

  return (
    <Box
      sx={{
        px: 2,
        pt: 0,
        textAlign: "left",
        "@media (min-width:600px)": { px: 4 },
        "@media (max-width:600px)": { px: 1 },
        "@media (max-width:360px)": { px: 0.2 },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
            xl: "3.5rem",
          },
        }}
      >
        Manage Timetables
      </Typography>
      <EntityList
        items={filteredTimeTable}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        entityType="timetables"
      />
      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
        entityType="timetables"
        defaultValues={{
          college: adminCollege,
        }}
      />
    </Box>
  );
}
