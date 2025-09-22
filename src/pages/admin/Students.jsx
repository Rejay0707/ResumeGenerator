import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useAdminManagement from "../../containers/AdminManagement";
import EntityList from "../../components/EntityList";
import EntityFormDialog from "../../components/EntityFormDialog";

export default function Students() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useAdminManagement("students");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");  // New state for search

  // Filter items based on search term (by name, case-insensitive)
  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (id) => {
    const item = items.find((i) => i.id === id);  // Use full items for edit (not filtered)
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

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
        Manage Students
      </Typography>

      {/* Search Section - Professional Header */}
      <Paper
        elevation={1}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,  // Margin below to separate from EntityList
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Search Input */}
          <Box sx={{ flexGrow: 1, maxWidth: { xs: "100%", md: 400 } }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search students by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear search"
                      onClick={handleClearSearch}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "background.default",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              }}
            />
          </Box>

          {/* Results Counter */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: { xs: 1, sm: 0 }, textAlign: { xs: "center", sm: "right" } }}
          >
            {filteredItems.length} of {items.length} students
          </Typography>
        </Box>
      </Paper>

      {/* No Results Alert (if searching and no matches) */}
      {searchTerm && filteredItems.length === 0 && !loading && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No students found matching "{searchTerm}".
        </Alert>
      )}

      {/* Existing EntityList with Filtered Items */}
      <EntityList
        items={filteredItems}  // Pass filtered items here
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Existing Dialog */}
      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
      />
    </Box>
  );
}

